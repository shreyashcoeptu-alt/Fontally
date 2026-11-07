// Gemini generateContent client with a model fallback chain.
//
// Why: each Gemini model has its own quota (5 requests/min on the free tier) and
// newer models regularly return 503 "high demand". Trying the next model in the
// chain instead of failing keeps Fontally on Gemini instead of the offline matcher.
import { buildGeminiRequestBody, extractGeminiText, parseRecommendation } from '../gemini-recommendation.mjs'

const GEMINI_API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'

// Chosen by `npm run eval` (see docs/RECOMMENDATION_ENGINE.md). Override with
// GEMINI_MODEL (primary) and GEMINI_FALLBACK_MODELS (comma-separated).
// 2026-11-08 eval (70 briefs): 3.1-flash-lite was the only model at 100% top-1 on
// the held-out paraphrase briefs, with 0 errors on the free tier. 3.5-flash-lite
// is next (100% top-3, fastest). 2.5-flash is a last resort from another model
// family, so one provider-side incident is unlikely to take out every model.
export const DEFAULT_MODEL_CHAIN = ['gemini-3.1-flash-lite', 'gemini-3.5-flash-lite', 'gemini-2.5-flash']

// model -> { until, reason }: skip the model until `until` (after a 429/503/404)
const cooldowns = new Map()

export function getModelChain(env = process.env) {
  const primary = env.GEMINI_MODEL?.trim()
  const fallbacks = env.GEMINI_FALLBACK_MODELS
    ? env.GEMINI_FALLBACK_MODELS.split(',').map((m) => m.trim()).filter(Boolean)
    : DEFAULT_MODEL_CHAIN
  return [...new Set([primary, ...fallbacks].filter(Boolean))]
}

function retryAfterMs(payload, fallbackMs) {
  const seconds = Number(/retry in ([\d.]+)s/i.exec(payload?.error?.message || '')?.[1])
  return Number.isFinite(seconds) ? Math.ceil(seconds * 1000) : fallbackMs
}

/**
 * Ask Gemini for top-3 picks, walking the model chain within a total time budget.
 * Resolves to { result, model, attempts } or throws an Error with
 * `.statusCode` (429 when every model is out of quota, 502/504 otherwise).
 */
export async function recommendWithGemini({
  prompt,
  profiles,
  allowedIds,
  apiKey,
  models = getModelChain(),
  totalBudgetMs = 12_000,
  perModelTimeoutMs = 8_000,
  fetchImpl = globalThis.fetch,
  now = Date.now
}) {
  const deadline = now() + totalBudgetMs
  const attempts = []
  let sawQuota = false

  for (const model of models) {
    const remaining = deadline - now()
    if (remaining < 1_500) break
    const cooldown = cooldowns.get(model)
    if (cooldown && cooldown.until > now()) {
      attempts.push({ model, outcome: 'cooldown' })
      if (cooldown.reason === 'quota') sawQuota = true
      continue
    }

    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), Math.min(perModelTimeoutMs, remaining))
    try {
      const res = await fetchImpl(`${GEMINI_API_BASE}/${encodeURIComponent(model)}:generateContent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
        body: JSON.stringify(buildGeminiRequestBody(prompt, profiles, model)),
        signal: controller.signal
      })
      const payload = await res.json().catch(() => ({}))

      if (!res.ok) {
        attempts.push({ model, outcome: `http_${res.status}` })
        if (res.status === 429) {
          sawQuota = true
          cooldowns.set(model, { until: now() + retryAfterMs(payload, 60_000), reason: 'quota' })
        } else if (res.status === 503) {
          cooldowns.set(model, { until: now() + 20_000, reason: 'overloaded' })
        } else if (res.status === 404) {
          // Model retired or not available to this key: stop trying it for a while
          cooldowns.set(model, { until: now() + 10 * 60_000, reason: 'unavailable' })
        }
        console.warn(`Gemini ${model} failed: ${res.status} ${(payload?.error?.message || '').split('\n')[0].slice(0, 160)}`)
        continue
      }

      const result = parseRecommendation(extractGeminiText(payload), allowedIds)
      attempts.push({ model, outcome: 'ok' })
      return { result, model, attempts }
    } catch (err) {
      attempts.push({ model, outcome: err?.name === 'AbortError' ? 'timeout' : 'invalid_response' })
      console.warn(`Gemini ${model} error:`, err?.name === 'AbortError' ? 'timed out' : err?.message)
    } finally {
      clearTimeout(timer)
    }
  }

  const allQuota = sawQuota && attempts.every((a) => a.outcome === 'http_429' || a.outcome === 'cooldown')
  throw Object.assign(
    new Error(allQuota ? 'Gemini quota is exhausted for now.' : 'Gemini could not complete the recommendation.'),
    { statusCode: allQuota ? 429 : attempts.some((a) => a.outcome === 'timeout') ? 504 : 502, attempts }
  )
}

// Test helper
export function resetGeminiCooldowns() {
  cooldowns.clear()
}
