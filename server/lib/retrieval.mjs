// Embedding-based profile retrieval: the fast path that picks fonts for any brief,
// including words the catalog never lists ("solarpunk", "hygge", Hindi briefs),
// because the embedding model already knows what they mean.
//
//   semantic: cosine(brief, each profile's vectors), max over a profile's vectors
//   keyword:  rankProfiles() from the offline matcher (wins on exact font names)
//   fused:    Reciprocal Rank Fusion of the two lists
//
// Pure functions over vectors you pass in, so the eval can run offline on
// precomputed query vectors (tests/eval/brief-vectors.json).
import { readFileSync } from 'node:fs'
import { profiles as PROFILE_CATALOG } from '../../shared/profiles.js'
import { rankProfiles } from '../../shared/local-matcher.js'
import { primaryFamily } from '../../shared/pairing.js'
import { decodeVector, dot } from './vector-codec.mjs'

const INDEX_URL = new URL('../data/profile-vectors.json', import.meta.url)
const RRF_K = 60

let cachedIndex = null

/** { model, dims, vectors: Map<profileId, Float32Array[]> } or null when the index hasn't been built. */
export function loadProfileIndex(raw) {
  if (!raw && cachedIndex) return cachedIndex
  let data = raw
  if (!data) {
    try {
      data = JSON.parse(readFileSync(INDEX_URL, 'utf8'))
    } catch {
      return null
    }
  }
  const vectors = new Map(Object.entries(data.profiles || {}).map(([id, list]) => [id, list.map(decodeVector)]))
  const index = { model: data.model, dims: data.dims, vectors }
  if (!raw) cachedIndex = index
  return index
}

/** Profiles ranked by semantic similarity: [{ id, sim }], best first. */
export function semanticRank(queryVec, index) {
  const out = []
  for (const [id, vecs] of index.vectors) {
    let best = -1
    for (const v of vecs) best = Math.max(best, dot(queryVec, v))
    out.push({ id, sim: best })
  }
  return out.sort((a, b) => b.sim - a.sim)
}

/**
 * Hybrid ranking for one brief.
 * Returns { ranked: [{ profile, score, sim, keyword }], confidence: { topSim, margin } }.
 * `queryVec` may be null (embedding unavailable): keyword ranking only.
 */
export function retrieveProfiles(prompt, queryVec, {
  index = loadProfileIndex(),
  profiles = PROFILE_CATALOG,
  keywordWeight = 1
} = {}) {
  const byId = new Map(profiles.map((p) => [p.id, p]))
  const keyword = rankProfiles(prompt, profiles)
  const keywordScore = new Map(keyword.map((k) => [k.profile.id, k.score]))

  const fused = new Map()
  const add = (id, contribution) => fused.set(id, (fused.get(id) || 0) + contribution)

  let semantic = []
  if (queryVec && index) {
    semantic = semanticRank(queryVec, index).filter((s) => byId.has(s.id))
    semantic.forEach((s, rank) => add(s.id, 1 / (RRF_K + rank + 1)))
  }
  // Only profiles with a real keyword signal take part; zero-score ties carry no information
  keyword.filter((k) => k.score > 0).forEach((k, rank) => add(k.profile.id, keywordWeight / (RRF_K + rank + 1)))

  const simById = new Map(semantic.map((s) => [s.id, s.sim]))
  const ranked = [...fused.entries()]
    .map(([id, score]) => ({ profile: byId.get(id), score, sim: simById.get(id) ?? null, keyword: keywordScore.get(id) || 0 }))
    .sort((a, b) => b.score - a.score)

  const topSim = semantic[0]?.sim ?? 0
  const margin = semantic.length > 1 ? semantic[0].sim - semantic[1].sim : 0
  return { ranked, confidence: { topSim, margin } }
}

/** Top `n` picks with distinct heading fonts, so the three cards look different. */
export function pickDistinct(ranked, n = 3) {
  const picks = []
  const seenHeadings = new Set()
  for (const entry of ranked) {
    const heading = primaryFamily(entry.profile.headingFallback, entry.profile.name)
    if (seenHeadings.has(heading)) continue
    seenHeadings.add(heading)
    picks.push(entry)
    if (picks.length === n) break
  }
  return picks
}
