/**
 * Live Gemini recommendation eval.
 *   npm run eval              (needs GEMINI_API_KEY in .env)
 *   GEMINI_MODEL=gemini-x npm run eval
 *   EVAL_RPM=60 npm run eval  (requests per minute; default 5 = Gemini free tier)
 *   EVAL_KIND=paraphrase npm run eval   (only one kind of brief)
 *   RECOMMEND_CANDIDATES=20 npm run eval (send Gemini a 20-profile shortlist)
 *
 * Calls Gemini directly (bypassing the API's rate limiter and cache) with the exact
 * request the app sends, scores it against tests/eval/briefs.json, and writes a
 * JSON report to eval-results/. Costs ~50 Gemini calls per run, so not part of CI.
 */
import 'dotenv/config'
import { mkdirSync, writeFileSync } from 'node:fs'
import { profiles as PROFILE_CATALOG } from '../shared/profiles.js'
import { isGibberishPrompt } from '../shared/gibberish.js'
import {
  buildGeminiRequestBody,
  extractGeminiText,
  parseRecommendation
} from '../server/gemini-recommendation.mjs'
import { selectCandidates } from '../server/lib/candidates.mjs'
import { loadBriefs, scoreResults, pct } from '../tests/eval/scoring.js'

const API_BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const apiKey = process.env.GEMINI_API_KEY
const model = process.env.GEMINI_MODEL || 'gemini-2.5-flash'
// Pace requests to the key's quota. The free tier allows 5 requests/minute.
const RPM = Math.max(1, Number(process.env.EVAL_RPM) || 5)
const CONCURRENCY = Math.min(4, RPM)
const MIN_GAP_MS = Math.ceil(60_000 / RPM)
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

if (!apiKey) {
  console.error('GEMINI_API_KEY is not set. Add it to .env to run the live eval.')
  process.exit(1)
}

// Exactly what production sends: same catalog, shortlist and language hints
const primaryFamily = (stack, fallback) => String(stack || '').split(',')[0].replace(/['"]/g, '').trim() || fallback

async function recommend(brief) {
  const { profiles, allowedIds } = selectCandidates(brief)
  const started = Date.now()
  const res = await fetch(`${API_BASE}/${encodeURIComponent(model)}:generateContent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-goog-api-key': apiKey },
    body: JSON.stringify(buildGeminiRequestBody(brief, profiles, model)),
    signal: AbortSignal.timeout(20_000)
  })
  const payload = await res.json().catch(() => ({}))
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}: ${(payload?.error?.message || 'unknown error').split('\n')[0]}`)
    err.status = res.status
    // Gemini says how long to wait, e.g. "Please retry in 59.6s."
    const wait = Number(/retry in ([\d.]+)s/i.exec(payload?.error?.message || '')?.[1])
    err.retryAfterMs = Number.isFinite(wait) ? Math.ceil(wait * 1000) + 500 : 60_000
    throw err
  }
  const result = parseRecommendation(extractGeminiText(payload), allowedIds)
  return { result, ms: Date.now() - started, usage: payload.usageMetadata || {} }
}

async function runOne(entry) {
  if (isGibberishPrompt(entry.brief)) return { entry, pickedIds: null, rejected: true, ms: 0 }
  let retries = 0
  for (let attempt = 1; ; attempt++) {
    try {
      const { result, ms, usage } = await recommend(entry.brief)
      return {
        entry,
        pickedIds: result.picks.map((p) => p.profileId),
        brandName: result.brandName,
        rejected: false,
        ms,
        retries,
        tokens: { in: usage.promptTokenCount || 0, out: usage.candidatesTokenCount || 0, think: usage.thoughtsTokenCount || 0 }
      }
    } catch (err) {
      // 429 = quota, 503 = model overloaded, TimeoutError = no answer in 20s
      const transient = err.status === 429 || err.status === 503 || err.name === 'TimeoutError'
      if (transient && attempt < 4) {
        retries++
        process.stdout.write('~')
        await sleep(err.status === 429 ? err.retryAfterMs : 10_000 * attempt)
        continue
      }
      return { entry, pickedIds: [], rejected: false, ms: 0, retries, error: err.message }
    }
  }
}

async function main() {
  const kind = process.env.EVAL_KIND
  const briefs = loadBriefs().filter((b) => !kind || b.kind === kind)
  const calls = briefs.filter((b) => !isGibberishPrompt(b.brief)).length
  console.log(`Running ${briefs.length} briefs against ${model} at ${RPM} req/min (~${Math.ceil(calls / RPM)} min)...\n`)

  const results = new Array(briefs.length)
  let next = 0
  let nextSlot = Date.now()
  await Promise.all(Array.from({ length: CONCURRENCY }, async () => {
    while (next < briefs.length) {
      const i = next++
      if (!isGibberishPrompt(briefs[i].brief)) {
        // Reserve the next request slot so workers never exceed RPM together
        const slot = Math.max(nextSlot, Date.now())
        nextSlot = slot + MIN_GAP_MS
        await sleep(slot - Date.now())
      }
      results[i] = await runOne(briefs[i])
      process.stdout.write(results[i].error ? 'x' : '.')
    }
  }))

  const score = scoreResults(results)
  const timed = results.filter((r) => r.ms > 0)
  const avgMs = timed.length ? Math.round(timed.reduce((sum, r) => sum + r.ms, 0) / timed.length) : 0
  const errors = results.filter((r) => r.error)
  const retries = results.reduce((sum, r) => sum + (r.retries || 0), 0)
  const sorted = timed.map((r) => r.ms).sort((a, b) => a - b)
  const p90Ms = sorted.length ? sorted[Math.min(sorted.length - 1, Math.floor(sorted.length * 0.9))] : 0
  const avgThink = timed.length ? Math.round(timed.reduce((sum, r) => sum + (r.tokens?.think || 0), 0) / timed.length) : 0
  // Diversity: how often the 3 picks are 3 distinct "families" of look (distinct heading fonts)
  const headingOf = new Map(PROFILE_CATALOG.map((p) => [p.id, primaryFamily(p.headingFallback, p.name)]))
  const graded = results.filter((r) => r.pickedIds?.length === 3)
  const diverse = graded.filter((r) => new Set(r.pickedIds.map((id) => headingOf.get(id))).size === 3).length

  console.log(`\n\nModel:    ${model}`)
  console.log(`Catalog:  ${process.env.RECOMMEND_CANDIDATES ? `shortlist of ${process.env.RECOMMEND_CANDIDATES}` : 'full'}${kind ? ` · kind=${kind}` : ''}`)
  console.log(`Top-1:    ${pct(score.top1Rate)}`)
  console.log(`Top-3:    ${pct(score.top3Rate)}`)
  console.log(`Rejects:  ${score.rejectsCorrect}/${score.rejectsTotal}`)
  console.log(`Latency:  ${avgMs} ms average · p90 ${p90Ms} ms`)
  console.log(`Errors:   ${errors.length} (after ${retries} retries)`)
  console.log(`Thinking: ${avgThink} tokens/request`)
  console.log(`Distinct: ${diverse}/${graded.length} answers had 3 different heading fonts`)
  for (const [kind, k] of Object.entries(score.byKind)) console.log(`  ${kind.padEnd(13)} top-3 ${k.top3}/${k.total}`)
  if (score.misses.length) {
    console.log('\nMisses:')
    for (const m of score.misses) console.log(`  [${m.kind}] ${m.brief}\n      got ${m.got.join(', ') || 'none'} · expected one of ${m.expected.join(', ')}`)
  }
  for (const e of errors) console.log(`  ERROR ${e.entry.brief}: ${e.error}`)

  mkdirSync('eval-results', { recursive: true })
  const file = `eval-results/${model}-${process.env.RECOMMEND_CANDIDATES ? `c${process.env.RECOMMEND_CANDIDATES}-` : ''}${kind ? `${kind}-` : ''}${new Date().toISOString().replace(/[:.]/g, '-')}.json`
  writeFileSync(file, JSON.stringify({
    model, candidates: process.env.RECOMMEND_CANDIDATES || 'full', kind: kind || 'all', ranAt: new Date().toISOString(), avgMs, p90Ms, retries, errors: errors.length, avgThink,
    diversity: { diverse, total: graded.length }, score, results
  }, null, 2))
  console.log(`\nReport written to ${file}`)
}

main().catch((err) => {
  console.error('Eval failed:', err)
  process.exit(1)
})
