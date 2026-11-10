/**
 * @vitest-environment node
 *
 * Offline eval of embedding retrieval: scores tests/eval/briefs.json using the
 * precomputed query vectors in tests/eval/brief-vectors.json against the profile
 * index in server/data/profile-vectors.json. No API key needed.
 * Rebuild both with `npm run build-index` after changing profiles or briefs.
 */
import { describe, expect, it } from 'vitest'
import { existsSync, readFileSync } from 'node:fs'
import { profiles } from '../shared/profiles.js'
import { isGibberishPrompt } from '../shared/gibberish.js'
import { decodeVector, encodeVector, dot } from '../server/lib/vector-codec.mjs'
import { loadProfileIndex, retrieveProfiles, pickDistinct } from '../server/lib/retrieval.mjs'
import { loadBriefs, scoreResults, pct } from './eval/scoring.js'
import { HYBRID_FLOORS } from './eval/retrieval-floors.js'

const BRIEF_VECTORS_URL = new URL('./eval/brief-vectors.json', import.meta.url)
// Until `npm run build-index` has produced both files, the retrieval eval is skipped
const built = existsSync(BRIEF_VECTORS_URL) && loadProfileIndex() !== null
const briefVectors = built ? JSON.parse(readFileSync(BRIEF_VECTORS_URL, 'utf8')) : null
const index = built ? loadProfileIndex() : null
const briefs = loadBriefs()

function run({ useKeywords }) {
  return briefs.map((entry) => {
    if (isGibberishPrompt(entry.brief)) return { entry, pickedIds: null, rejected: true }
    const vec = decodeVector(briefVectors.briefs[entry.brief])
    const { ranked } = retrieveProfiles(entry.brief, vec, { index, keywordWeight: useKeywords ? 1 : 0 })
    return { entry, pickedIds: pickDistinct(ranked).map((r) => r.profile.id), rejected: false }
  })
}

describe('Vector codec', () => {
  it('round-trips with negligible error', () => {
    const v = Array.from({ length: 768 }, (_, i) => Math.sin(i * 0.37))
    const decoded = decodeVector(encodeVector(v))
    const norm = Math.sqrt(v.reduce((s, x) => s + x * x, 0))
    expect(dot(decoded, v.map((x) => x / norm))).toBeGreaterThan(0.999)
  })
})

describe.skipIf(!built)('Profile index', () => {
  it('covers every profile, and the eval vectors match its model and size', () => {
    expect(index).not.toBeNull()
    expect(profiles.filter((p) => !index.vectors.has(p.id)).map((p) => p.id)).toEqual([])
    expect(briefVectors.model).toBe(index.model)
    expect(briefVectors.dims).toBe(index.dims)
    for (const b of briefs) expect(briefVectors.briefs[b.brief], b.brief).toBeTruthy()
  })
})

describe.skipIf(!built)('Retrieval eval (offline, precomputed embeddings)', () => {
  it('hybrid retrieval meets the hit-rate floors', () => {
    const hybrid = run({ useKeywords: true })
    const semantic = run({ useKeywords: false })
    const report = (label, results) => {
      const keyword = scoreResults(results.filter((r) => r.entry.kind !== 'paraphrase'))
      const paraphrase = scoreResults(results.filter((r) => r.entry.kind === 'paraphrase'))
      console.info(`[eval:${label}] keyword top-1 ${pct(keyword.top1Rate)} · top-3 ${pct(keyword.top3Rate)} · paraphrase top-1 ${pct(paraphrase.top1Rate)} · top-3 ${pct(paraphrase.top3Rate)}`)
      return { keyword, paraphrase }
    }
    report('semantic', semantic)
    const { keyword, paraphrase } = report('hybrid', hybrid)

    expect(keyword.top1Rate).toBeGreaterThanOrEqual(HYBRID_FLOORS.keywordTop1)
    expect(keyword.top3Rate).toBeGreaterThanOrEqual(HYBRID_FLOORS.keywordTop3)
    expect(paraphrase.top1Rate).toBeGreaterThanOrEqual(HYBRID_FLOORS.paraphraseTop1)
    expect(paraphrase.top3Rate).toBeGreaterThanOrEqual(HYBRID_FLOORS.paraphraseTop3)
  })

  it('returns 3 picks with distinct heading fonts', () => {
    for (const r of run({ useKeywords: true }).filter((r) => r.pickedIds)) {
      expect(r.pickedIds).toHaveLength(3)
      const headings = r.pickedIds.map((id) => profiles.find((p) => p.id === id).headingFallback.split(',')[0])
      expect(new Set(headings).size).toBe(3)
    }
  })
})
