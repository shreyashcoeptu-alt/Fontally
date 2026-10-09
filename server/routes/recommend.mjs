import { Hono } from 'hono'
import {
  buildGeminiPrompt,
  extractGeminiText,
  normalizeProfiles,
  parseRecommendation,
  recommendationSchema
} from '../gemini-recommendation.mjs'
import {
  getRecommendationCache,
  setRecommendationCache,
  saveUserHistory
} from '../db/supabase.mjs'

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const DEFAULT_MODEL = 'gemini-2.5-flash'
const MAX_PROMPT_CHARS = 1_500
const MAX_REQUESTS_PER_WINDOW = 40
const RATE_LIMIT_WINDOW_MS = 60_000

const requestTimestamps = new Map()

function isRateLimited(ip) {
  const now = Date.now()
  const recent = (requestTimestamps.get(ip) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  requestTimestamps.set(ip, recent)
  return recent.length > MAX_REQUESTS_PER_WINDOW
}

function normalizeCacheKey(prompt) {
  return String(prompt || '').toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim()
}

export const recommendRoute = new Hono()

recommendRoute.post('/', async (c) => {
  const ip = c.req.header('x-forwarded-for')?.split(',')[0]?.trim() || 'local'
  if (isRateLimited(ip)) {
    return c.json({ error: 'Too many recommendation requests. Please try again shortly.' }, 429)
  }

  const apiKey = process.env.GEMINI_API_KEY
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL

  if (!apiKey) {
    return c.json({ error: 'Gemini is not configured. Set GEMINI_API_KEY on the server.' }, 503)
  }

  let body
  try {
    body = await c.req.json()
  } catch {
    return c.json({ error: 'Request body must be valid JSON.' }, 400)
  }

  const prompt = typeof body.prompt === 'string' ? body.prompt.trim().slice(0, MAX_PROMPT_CHARS) : ''
  const profiles = normalizeProfiles(body.profiles)
  const sessionId = c.req.header('x-session-id') || body.sessionId

  if (!prompt) {
    return c.json({ error: 'A design brief is required.' }, 400)
  }
  if (!profiles.length) {
    return c.json({ error: 'A valid profile catalog is required.' }, 400)
  }

  const cacheKey = normalizeCacheKey(prompt)

  // 1. Check persistent / in-memory cache
  const cached = await getRecommendationCache(cacheKey)
  if (cached) {
    // Optionally record to session history
    if (sessionId) {
      saveUserHistory({
        sessionId,
        brief: prompt,
        profileId: cached.profileId,
        rationale: cached.rationale,
        tags: cached.tags
      }).catch(() => {})
    }
    return c.json({ ...cached, cached: true })
  }

  // 2. Call Gemini
  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 12_000)

  try {
    const geminiResponse = await fetch(`${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: 'Respond only with valid JSON matching the supplied schema.' }]
        },
        contents: [{
          role: 'user',
          parts: [{ text: buildGeminiPrompt(prompt, profiles) }]
        }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 256,
          responseMimeType: 'application/json',
          responseSchema: recommendationSchema
        }
      }),
      signal: controller.signal
    })

    const responsePayload = await geminiResponse.json().catch(() => ({}))
    if (!geminiResponse.ok) {
      console.error('Gemini request failed:', geminiResponse.status, responsePayload?.error?.message || 'unknown error')
      return c.json({ error: 'Gemini could not complete the recommendation.' }, geminiResponse.status === 429 ? 429 : 502)
    }

    const result = parseRecommendation(
      extractGeminiText(responsePayload),
      new Set(profiles.map((p) => p.id))
    )

    // 3. Save to persistent cache (async)
    await setRecommendationCache(cacheKey, result)

    // 4. Record to user history if session provided
    if (sessionId) {
      saveUserHistory({
        sessionId,
        brief: prompt,
        profileId: result.profileId,
        rationale: result.rationale,
        tags: result.tags
      }).catch(() => {})
    }

    return c.json(result)
  } catch (error) {
    if (error?.name === 'AbortError') {
      return c.json({ error: 'Gemini recommendation timed out.' }, 504)
    }
    const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500
    console.error('Recommendation route error:', error)
    return c.json({ error: statusCode >= 500 ? 'Recommendation service failed.' : error.message }, statusCode)
  } finally {
    clearTimeout(timeout)
  }
})
