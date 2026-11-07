/**
 * @vitest-environment node
 *
 * Offline recommendation eval: runs the keyword matcher over tests/eval/briefs.json.
 * Floors sit at the measured baseline so a scoring or catalog change that makes
 * recommendations worse fails CI. For the live Gemini numbers run `npm run eval`.
 */
import { describe, expect, it } from 'vitest'
import { profiles } from '../shared/profiles.js'
import { matchProfilesLocally } from '../shared/local-matcher.js'
import { isGibberishPrompt } from '../shared/gibberish.js'
import { loadBriefs, scoreResults, pct } from './eval/scoring.js'

// Baselines measured 2026-11-08 after whole-word matching:
//   keyword briefs (50, used for tuning): top-1 98.0%, top-3 100%
//   paraphrase briefs (16, held out):     top-3 56.3%  <- the honest number
const KEYWORD_TOP1_FLOOR = 0.96
const KEYWORD_TOP3_FLOOR = 0.98
const PARAPHRASE_TOP3_FLOOR = 0.5

const briefs = loadBriefs()

describe('Recommendation eval set (offline matcher)', () => {
  it('only references profile ids that exist', () => {
    const ids = new Set(profiles.map((p) => p.id))
    const unknown = briefs.flatMap((b) => b.acceptable).filter((id) => !ids.has(id))
    expect(unknown).toEqual([])
  })

  it('meets the hit-rate floors', () => {
    const results = briefs.map((entry) => {
      if (isGibberishPrompt(entry.brief)) return { entry, pickedIds: null, rejected: true }
      const match = matchProfilesLocally(entry.brief, profiles)
      return { entry, pickedIds: match.picks ? match.picks.map((p) => p.profile.id) : [], rejected: false }
    })
    const keyword = scoreResults(results.filter((r) => r.entry.kind !== 'paraphrase'))
    const paraphrase = scoreResults(results.filter((r) => r.entry.kind === 'paraphrase'))

    console.info(`[eval:offline] keyword top-1 ${pct(keyword.top1Rate)} · top-3 ${pct(keyword.top3Rate)} · paraphrase top-3 ${pct(paraphrase.top3Rate)} · rejects ${keyword.rejectsCorrect}/${keyword.rejectsTotal}`)

    expect(keyword.rejectsCorrect).toBe(keyword.rejectsTotal)
    expect(keyword.top1Rate).toBeGreaterThanOrEqual(KEYWORD_TOP1_FLOOR)
    expect(keyword.top3Rate).toBeGreaterThanOrEqual(KEYWORD_TOP3_FLOOR)
    expect(paraphrase.top3Rate).toBeGreaterThanOrEqual(PARAPHRASE_TOP3_FLOOR)
  })

  it('returns up to 3 distinct picks per brief', () => {
    for (const entry of briefs.filter((b) => b.kind !== 'reject')) {
      const match = matchProfilesLocally(entry.brief, profiles)
      if (!match.picks) continue
      const ids = match.picks.map((p) => p.profile.id)
      expect(ids.length).toBeLessThanOrEqual(3)
      expect(new Set(ids).size).toBe(ids.length)
    }
  })
})
