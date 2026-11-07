import { Hono } from 'hono'
import {
  buildGeminiRequestBody,
  extractGeminiText,
  normalizeProfiles,
  parseRecommendation,
  isGibberishPrompt
} from '../gemini-recommendation.mjs'
import {
  getRecommendationCache,
  setRecommendationCache,
  saveUserHistory
} from '../db/supabase.mjs'
import { profiles as PROFILE_CATALOG } from '../../shared/profiles.js'

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const DEFAULT_MODEL = 'gemini-2.5-flash'
const MAX_PROMPT_CHARS = 1_500
const MAX_REQUESTS_PER_WINDOW = 40
const RATE_LIMIT_WINDOW_MS = 60_000
const GEMINI_TIMEOUT_MS = 10_000

// The server owns the catalog. Accepting it from the client let anyone inject
// arbitrary "profiles" into the prompt and made cached answers inconsistent.
const primaryFamily = (stack, fallback) => String(stack || '').split(',')[0].replace(/['"]/g, '').trim() || fallback
// Give Gemini the real Google Fonts families (not editorial/commercial labels), so its
// rationale names the fonts the user actually gets.
const SERVER_PROFILES = normalizeProfiles(PROFILE_CATALOG.map((p) => ({
  ...p,
  name: primaryFamily(p.headingFallback, p.name),
  pair: primaryFamily(p.bodyFallback, p.pair)
})))
const SERVER_PROFILE_IDS = new Set(SERVER_PROFILES.map((p) => p.id))

const requestTimestamps = new Map()
let lastRateLimitSweep = 0

function isRateLimited(ip) {
  const now = Date.now()
  // Periodically drop idle IPs so the map cannot grow without bound
  if (now - lastRateLimitSweep > RATE_LIMIT_WINDOW_MS) {
    lastRateLimitSweep = now
    for (const [key, stamps] of requestTimestamps) {
      if (!stamps.length || now - stamps[stamps.length - 1] >= RATE_LIMIT_WINDOW_MS) requestTimestamps.delete(key)
    }
  }
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
  const profiles = SERVER_PROFILES
  const sessionId = c.req.header('x-session-id') || body.sessionId

  if (!prompt) {
    return c.json({ error: 'A design brief is required.' }, 400)
  }
  if (isGibberishPrompt(prompt)) {
    return c.json({
      error: 'The provided brief appears to be random characters or gibberish. Please describe your project, brand, or desired aesthetic vibe (e.g., "cyberpunk gaming studio", "warm artisan bakery").'
    }, 400)
  }
  // v2: responses carry top-3 picks; older single-pick cache rows are ignored
  const cacheKey = `v2:${normalizeCacheKey(prompt)}`

  // 1. Check persistent / in-memory cache
  const cachedRow = await getRecommendationCache(cacheKey)
  // Drop cached picks that point at profiles which no longer exist
  const cachedPicks = (cachedRow?.picks || []).filter((pick) => SERVER_PROFILE_IDS.has(pick?.profileId))
  const cached = cachedPicks.length
    ? { ...cachedPicks[0], brandName: cachedRow.brandName || '', picks: cachedPicks }
    : null
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
  const timeout = setTimeout(() => controller.abort(), GEMINI_TIMEOUT_MS)

  try {
    const geminiResponse = await fetch(`${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': apiKey
      },
      body: JSON.stringify(buildGeminiRequestBody(prompt, profiles, model)),
      signal: controller.signal
    })

    const responsePayload = await geminiResponse.json().catch(() => ({}))
    if (!geminiResponse.ok) {
      console.error('Gemini request failed:', geminiResponse.status, responsePayload?.error?.message || 'unknown error')
      return c.json({ error: 'Gemini could not complete the recommendation.' }, geminiResponse.status === 429 ? 429 : 502)
    }

    const result = parseRecommendation(
      extractGeminiText(responsePayload),
      SERVER_PROFILE_IDS
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
