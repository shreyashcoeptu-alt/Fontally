// Shared scoring for the recommendation eval (offline test + live Gemini script).
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

export function loadBriefs() {
  const file = fileURLToPath(new URL('./briefs.json', import.meta.url))
  return JSON.parse(readFileSync(file, 'utf8')).briefs
}

/**
 * results: [{ entry, pickedIds: string[] | null, rejected: boolean }]
 * Returns hit rates over the non-reject briefs and the list of misses.
 */
export function scoreResults(results) {
  const graded = results.filter((r) => r.entry.kind !== 'reject')
  let top1 = 0
  let top3 = 0
  const misses = []
  for (const r of graded) {
    const ids = r.pickedIds || []
    const ok = new Set(r.entry.acceptable)
    const hit1 = ids.length > 0 && ok.has(ids[0])
    const hit3 = ids.slice(0, 3).some((id) => ok.has(id))
    if (hit1) top1++
    if (hit3) top3++
    if (!hit3) misses.push({ brief: r.entry.brief, kind: r.entry.kind, got: ids, expected: r.entry.acceptable })
  }
  const byKind = {}
  for (const r of graded) {
    const k = (byKind[r.entry.kind] ||= { total: 0, top3: 0 })
    k.total++
    if ((r.pickedIds || []).slice(0, 3).some((id) => r.entry.acceptable.includes(id))) k.top3++
  }
  const rejects = results.filter((r) => r.entry.kind === 'reject')
  return {
    total: graded.length,
    top1Rate: graded.length ? top1 / graded.length : 0,
    top3Rate: graded.length ? top3 / graded.length : 0,
    byKind,
    rejectsCorrect: rejects.filter((r) => r.rejected).length,
    rejectsTotal: rejects.length,
    misses
  }
}

export const pct = (x) => `${(x * 100).toFixed(1)}%`
