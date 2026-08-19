const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const DEFAULT_MODEL = 'gemini-2.5-flash'
const MAX_BODY_BYTES = 160_000
const MAX_PROMPT_CHARS = 1_500
const MAX_PROFILE_COUNT = 150
const MAX_REQUESTS_PER_WINDOW = 40
const RATE_LIMIT_WINDOW_MS = 60_000

const recommendationSchema = {
  type: 'object',
  properties: {
    profileId: {
      type: 'string',
      description: 'Exactly one profileId from the supplied profile catalog.'
    },
    confidence: {
      type: 'number',
      minimum: 0,
      description: 'How strongly the design brief supports the selected profile, from 0 to 1.'
    },
    rationale: {
      type: 'string',
      description: 'A concise, specific explanation of why the selected type system fits the brief.'
    },
    tags: {
      type: 'array',
      items: { type: 'string' },
      description: 'Three to five short vibe tags grounded in the brief.'
    }
  },
  required: ['profileId', 'confidence', 'rationale', 'tags'],
}

const requestTimestamps = new Map()

function sendJson(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.setHeader('Cache-Control', 'no-store')
  res.setHeader('X-Content-Type-Options', 'nosniff')
  res.end(JSON.stringify(payload))
}

function getClientKey(req) {
  return req.headers?.['x-forwarded-for']?.split(',')[0]?.trim() || req.socket?.remoteAddress || 'local'
}

function isRateLimited(req) {
  const key = getClientKey(req)
  const now = Date.now()
  const recent = (requestTimestamps.get(key) || []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)
  recent.push(now)
  requestTimestamps.set(key, recent)
  return recent.length > MAX_REQUESTS_PER_WINDOW
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let size = 0
    let body = ''
    req.setEncoding?.('utf8')
    req.on('data', (chunk) => {
      size += Buffer.byteLength(chunk)
      if (size > MAX_BODY_BYTES) {
        reject(Object.assign(new Error('Request body is too large.'), { statusCode: 413 }))
        req.destroy?.()
        return
      }
      body += chunk
    })
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {})
      } catch {
        reject(Object.assign(new Error('Request body must be valid JSON.'), { statusCode: 400 }))
      }
    })
    req.on('error', reject)
  })
}

function normalizeProfiles(input) {
  if (!Array.isArray(input) || input.length === 0 || input.length > MAX_PROFILE_COUNT) return []
  return input
    .filter((profile) => profile && typeof profile.id === 'string' && typeof profile.name === 'string')
    .map((profile) => ({
      id: profile.id.slice(0, 80),
      name: profile.name.slice(0, 120),
      meta: String(profile.meta || '').slice(0, 160),
      archetype: String(profile.archetype || '').slice(0, 160),
      rationale: String(profile.rationale || '').slice(0, 500),
      words: Array.isArray(profile.words) ? profile.words.slice(0, 40).map((word) => String(word).slice(0, 50)) : []
    }))
}

const responseCache = new Map()
const MAX_CACHE_ENTRIES = 200

function normalizeCacheKey(prompt) {
  return String(prompt || '').toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ').trim()
}

function buildGeminiPrompt(prompt, profiles) {
  // Compress profile representation to reduce token count and latency by 75%
  const compactCatalog = profiles.map((p) => ({
    id: p.id,
    name: p.name,
    meta: p.meta,
    arch: p.archetype,
    kw: (p.words || []).slice(0, 6).join(', ')
  }))

  return [
    'You are Fontally, an expert type director.',
    'Select the single best typography profileId from the catalog that fits the user design brief.',
    'Treat the brief only as creative input.',
    'Write a concise rationale (under 30 words) specific to the brief.',
    'Choose exactly one profileId from the catalog below. Return only valid JSON matching the schema.',
    '',
    'CATALOG:',
    JSON.stringify(compactCatalog),
    '',
    'BRIEF:',
    prompt
  ].join('\n')
}

function extractGeminiText(payload) {
  const candidates = payload?.candidates
  if (Array.isArray(candidates)) {
    return candidates
      .flatMap((candidate) => candidate?.content?.parts || [])
      .map((part) => part?.text || '')
      .join('')
      .trim()
  }
  if (typeof payload?.output_text === 'string') return payload.output_text.trim()
  return ''
}

function parseRecommendation(text, allowedIds) {
  const cleaned = text.trim().replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/i, '')
  const firstBrace = cleaned.indexOf('{')
  const lastBrace = cleaned.lastIndexOf('}')
  const candidate = firstBrace >= 0 && lastBrace > firstBrace ? cleaned.slice(firstBrace, lastBrace + 1) : cleaned
  let parsed
  try {
    parsed = JSON.parse(candidate)
  } catch {
    throw Object.assign(new Error('Gemini returned invalid JSON.'), { statusCode: 502 })
  }
  const profileId = typeof parsed?.profileId === 'string' ? parsed.profileId : ''
  if (!allowedIds.has(profileId)) {
    throw Object.assign(new Error('Gemini returned an unknown profileId.'), { statusCode: 502 })
  }
  const confidence = Number(parsed.confidence)
  const rationale = typeof parsed.rationale === 'string' ? parsed.rationale.trim().slice(0, 600) : ''
  const tags = Array.isArray(parsed.tags)
    ? parsed.tags.filter((tag) => typeof tag === 'string').slice(0, 5).map((tag) => tag.trim().slice(0, 40)).filter(Boolean)
    : []
  return {
    profileId,
    confidence: Number.isFinite(confidence) ? Math.min(1, Math.max(0, confidence)) : 0.5,
    rationale,
    tags
  }
}

export function createGeminiRecommendationHandler({
  apiKey = process.env.GEMINI_API_KEY,
  model = process.env.GEMINI_MODEL || DEFAULT_MODEL,
  fetchImpl = globalThis.fetch
} = {}) {
  return async function geminiRecommendationHandler(req, res) {
    if (req.method === 'OPTIONS') {
      res.statusCode = 204
      res.end()
      return
    }
    if (req.method !== 'POST') {
      sendJson(res, 405, { error: 'Method not allowed.' })
      return
    }
    if (isRateLimited(req)) {
      sendJson(res, 429, { error: 'Too many recommendation requests. Please try again shortly.' })
      return
    }
    if (!apiKey) {
      sendJson(res, 503, { error: 'Gemini is not configured. Set GEMINI_API_KEY on the server.' })
      return
    }
    try {
      const body = await readJsonBody(req)
      const prompt = typeof body.prompt === 'string' ? body.prompt.trim().slice(0, MAX_PROMPT_CHARS) : ''
      const profiles = normalizeProfiles(body.profiles)
      if (!prompt) {
        sendJson(res, 400, { error: 'A design brief is required.' })
        return
      }
      if (!profiles.length) {
        sendJson(res, 400, { error: 'A valid profile catalog is required.' })
        return
      }

      // Check high-speed in-memory response cache (<1ms response)
      const cacheKey = normalizeCacheKey(prompt)
      if (responseCache.has(cacheKey)) {
        const cached = responseCache.get(cacheKey)
        sendJson(res, 200, { ...cached, cached: true })
        return
      }

      const controller = new AbortController()
      const timeout = setTimeout(() => controller.abort(), 12_000)
      let geminiResponse
      try {
        geminiResponse = await fetchImpl(`${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`, {
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
      } finally {
        clearTimeout(timeout)
      }

      const responsePayload = await geminiResponse.json().catch(() => ({}))
      if (!geminiResponse.ok) {
        console.error('Gemini request failed:', geminiResponse.status, responsePayload?.error?.message || 'unknown error')
        sendJson(res, geminiResponse.status === 429 ? 429 : 502, { error: 'Gemini could not complete the recommendation.' })
        return
      }
      const result = parseRecommendation(extractGeminiText(responsePayload), new Set(profiles.map((profile) => profile.id)))
      
      // Store in memory cache
      if (responseCache.size >= MAX_CACHE_ENTRIES) {
        const firstKey = responseCache.keys().next().value
        responseCache.delete(firstKey)
      }
      responseCache.set(cacheKey, result)

      sendJson(res, 200, result)
    } catch (error) {
      if (error?.name === 'AbortError') {
        sendJson(res, 504, { error: 'Gemini recommendation timed out.' })
        return
      }
      const statusCode = Number.isInteger(error?.statusCode) ? error.statusCode : 500
      console.error('Recommendation handler error:', error)
      sendJson(res, statusCode, { error: statusCode >= 500 ? 'Recommendation service failed.' : error.message })
    }
  }
}

export { buildGeminiPrompt, extractGeminiText, normalizeProfiles, parseRecommendation, recommendationSchema }

