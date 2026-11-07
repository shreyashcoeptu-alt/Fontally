import { Hono } from 'hono'
import { isGibberishPrompt } from '../gemini-recommendation.mjs'
import {
  getRecommendationCache,
  setRecommendationCache,
  saveUserHistory,
  getPickPreferences
} from '../db/supabase.mjs'
import { recommendWithGemini, getModelChain } from '../lib/gemini-client.mjs'
import { clientIp, createRateLimiter } from '../lib/rate-limit.mjs'
import { SERVER_PROFILE_IDS, selectCandidates, annotateScriptSupport } from '../lib/candidates.mjs'
import { normalizeBriefKey } from '../../shared/brief-key.js'

const MAX_PROMPT_CHARS = 1_500
const isRateLimited = createRateLimiter({ limit: 20, windowMs: 60_000 })

// Learned preference: if visitors who got the same brief keep choosing an
// alternate, promote it. Needs a few choices before it overrides Gemini's order.
const MIN_CHOICES_TO_REORDER = 3

function applyPreferences(picks, preferences) {
  if (!preferences || !picks.length) return picks
  const total = Object.values(preferences).reduce((sum, n) => sum + n, 0)
  if (total < MIN_CHOICES_TO_REORDER) return picks
  return picks
    .map((pick, index) => ({ pick, index, votes: preferences[pick.profileId] || 0 }))
    .sort((a, b) => b.votes - a.votes || a.index - b.index)
    .map(({ pick }) => pick)
}

function respond(c, result, extra = {}) {
  return c.json({ ...result.picks[0], ...result, ...extra })
}

export const recommendRoute = new Hono()

recommendRoute.post('/', async (c) => {
  if (isRateLimited(clientIp(c))) {
    return c.json({ error: 'Too many recommendation requests. Please try again shortly.' }, 429)
  }

  const apiKey = process.env.GEMINI_API_KEY
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
  const briefKey = normalizeBriefKey(prompt)
  const cacheKey = `v2:${briefKey}`
  const recordHistory = (result) => {
    if (!sessionId) return
    saveUserHistory({
      sessionId,
      brief: prompt,
      profileId: result.picks[0].profileId,
      rationale: result.picks[0].rationale,
      tags: result.picks[0].tags
    }).catch(() => {})
  }

  // 1. Cache (Supabase, or in-memory when Supabase is unavailable)
  const [cachedRow, preferences] = await Promise.all([
    getRecommendationCache(cacheKey),
    getPickPreferences(briefKey)
  ])
  const cachedPicks = (cachedRow?.picks || []).filter((pick) => SERVER_PROFILE_IDS.has(pick?.profileId))
  if (cachedPicks.length) {
    const result = annotateScriptSupport(prompt, {
      brandName: cachedRow.brandName || '',
      picks: applyPreferences(cachedPicks, preferences)
    })
    recordHistory(result)
    return respond(c, result, { briefKey, cached: true })
  }

  // 2. Gemini, walking the model fallback chain
  const { profiles, allowedIds, script } = selectCandidates(prompt)
  try {
    const { result: raw, model } = await recommendWithGemini({
      prompt,
      profiles,
      allowedIds,
      apiKey,
      models: getModelChain()
    })
    const result = annotateScriptSupport(prompt, {
      brandName: raw.brandName,
      picks: applyPreferences(raw.picks, preferences)
    }, script)

    await setRecommendationCache(cacheKey, { ...result.picks[0], ...result })
    recordHistory(result)
    return respond(c, result, { briefKey, model })
  } catch (error) {
    const status = Number.isInteger(error?.statusCode) ? error.statusCode : 502
    console.error('Recommendation failed:', error?.message, JSON.stringify(error?.attempts || []))
    const message = status === 429
      ? 'Gemini is busy right now (free-tier quota). Showing offline picks instead.'
      : status === 504
        ? 'Gemini recommendation timed out.'
        : 'Gemini could not complete the recommendation.'
    return c.json({ error: message, reason: status === 429 ? 'quota' : 'unavailable' }, status)
  }
})
