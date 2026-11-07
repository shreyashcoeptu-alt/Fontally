// Server-owned catalog, Gemini candidate shortlist, and language annotations.
import { profiles as PROFILE_CATALOG } from '../../shared/profiles.js'
import { normalizeProfiles } from '../gemini-recommendation.mjs'
import { rankProfiles } from '../../shared/local-matcher.js'
import { detectScript, scriptSupport, primaryFamily } from '../../shared/pairing.js'

// Gemini sees the real Google Fonts families (not editorial/commercial labels),
// so its rationale names the fonts the user actually gets.
export const SERVER_PROFILES = normalizeProfiles(PROFILE_CATALOG.map((p) => ({
  ...p,
  name: primaryFamily(p.headingFallback, p.name),
  pair: primaryFamily(p.bodyFallback, p.pair)
})))
export const SERVER_PROFILE_IDS = new Set(SERVER_PROFILES.map((p) => p.id))
const RAW_BY_ID = new Map(PROFILE_CATALOG.map((p) => [p.id, p]))

/**
 * How many profiles to send Gemini. 0 = the whole catalog.
 * Decided by `npm run eval` (see docs/RECOMMENDATION_ENGINE.md); override with
 * RECOMMEND_CANDIDATES. A shortlist only kicks in when keyword retrieval is
 * confident; abstract briefs ("make it feel expensive") always get the full catalog.
 */
// 2026-11-08 eval: a 20-profile shortlist matched or beat the full catalog on
// quality (3.5-flash-lite paraphrase top-1 87.5% -> 100%; keyword unchanged) while
// cutting input tokens ~7.1k -> ~3.8k on average, which matters most for the free tier's
// per-minute token limit. Abstract briefs still get the whole catalog.
export const DEFAULT_CANDIDATE_LIMIT = 20

function candidateLimit(env = process.env) {
  const n = Number(env.RECOMMEND_CANDIDATES)
  return Number.isFinite(n) && n >= 0 ? Math.floor(n) : DEFAULT_CANDIDATE_LIMIT
}

/**
 * Returns { profiles, allowedIds, script } for one brief.
 *  - script: the brief's non-Latin writing system, if any. Each profile then
 *    carries `lang` ("heading+body" | "heading" | "body" | "none") and the
 *    prompt tells Gemini to prefer fonts that can render the brief.
 *  - shortlist: when RECOMMEND_CANDIDATES > 0 and enough profiles match the
 *    brief's keywords, only the top N go to Gemini (fewer tokens, lower latency).
 */
export function selectCandidates(prompt, { limit = candidateLimit() } = {}) {
  const script = detectScript(prompt)
  let chosen = SERVER_PROFILES

  if (limit > 0) {
    const ranked = rankProfiles(prompt, SERVER_PROFILES)
    // A score of 8+ means a whole-word keyword hit (substring hits like "it" in
    // "digital" score less). Only trust retrieval with several strong hits.
    const strong = ranked.filter((r) => r.score >= 8)
    if (strong.length >= 3) {
      const ids = new Set(ranked.slice(0, limit).map((r) => r.profile.id))
      // Never drop profiles that can render a non-Latin brief
      if (script) {
        for (const p of SERVER_PROFILES) {
          const s = scriptSupport(RAW_BY_ID.get(p.id), script)
          if (s.heading || s.body) ids.add(p.id)
        }
      }
      chosen = SERVER_PROFILES.filter((p) => ids.has(p.id))
    }
  }

  if (script) {
    chosen = chosen.map((p) => {
      const s = scriptSupport(RAW_BY_ID.get(p.id), script)
      return { ...p, lang: s.heading && s.body ? 'heading+body' : s.heading ? 'heading' : s.body ? 'body' : 'none' }
    })
  }

  return { profiles: chosen, allowedIds: new Set(chosen.map((p) => p.id)), script }
}

/** Adds { script } to the result and { scriptSupport } to each pick. */
export function annotateScriptSupport(prompt, result, script = detectScript(prompt)) {
  if (!script) return result
  return {
    ...result,
    script: { id: script.id, label: script.label },
    picks: result.picks.map((pick) => {
      const raw = RAW_BY_ID.get(pick.profileId)
      return raw ? { ...pick, scriptSupport: scriptSupport(raw, script) } : pick
    })
  }
}
