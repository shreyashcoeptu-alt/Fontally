/**
 * @vitest-environment node
 *
 * Latency, quota and parameter fixes: non-blocking cache writes, the shared
 * embedding budget and 429 cooldown, limit parsing, and weight filters in
 * semantic search.
 */
import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../server/lib/gemini-client.mjs', async (importOriginal) => ({
  ...(await importOriginal()),
  recommendWithGemini: vi.fn()
}))
vi.mock('../server/db/supabase.mjs', async (importOriginal) => ({
  ...(await importOriginal()),
  setRecommendationCache: vi.fn(),
  searchFontsWithVector: vi.fn()
}))
vi.mock('../server/lib/embeddings.mjs', async (importOriginal) => ({
  ...(await importOriginal()),
  getGeminiEmbedding: vi.fn()
}))

const { default: app } = await import('../server/app.mjs')
const { recommendWithGemini } = await import('../server/lib/gemini-client.mjs')
const supabase = await import('../server/db/supabase.mjs')
const embeddings = await import('../server/lib/embeddings.mjs')
const { parseLimit } = await import('../server/lib/params.mjs')
const { runInBackground } = await import('../server/lib/background.mjs')
const { getGeminiEmbedding: realGetEmbedding, resetEmbeddingState } =
  await vi.importActual('../server/lib/embeddings.mjs')

beforeEach(() => {
  vi.unstubAllEnvs()
  vi.clearAllMocks()
  resetEmbeddingState()
  supabase.resetEmbedQuota()
})

describe('parseLimit', () => {
  it('falls back on missing or non-numeric input and clamps to range', () => {
    expect(parseLimit(undefined, { fallback: 20, max: 100 })).toBe(20)
    expect(parseLimit('abc', { fallback: 20, max: 100 })).toBe(20)
    expect(parseLimit('0', { fallback: 20, max: 100 })).toBe(1)
    expect(parseLimit('9999', { fallback: 20, max: 100 })).toBe(100)
    expect(parseLimit('7', { fallback: 20, max: 100 })).toBe(7)
  })

  it('GET /api/fonts?limit=abc returns results instead of an empty list', async () => {
    const data = await (await app.request('/api/fonts?limit=abc')).json()
    expect(data.fonts.length).toBe(Math.min(250, data.total))
    expect(data.fonts.length).toBeGreaterThan(0)
  })
})

describe('POST /api/recommend', () => {
  it('responds without waiting for the cache write', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'k')
    recommendWithGemini.mockResolvedValue({
      model: 'test-model',
      result: { brandName: '', picks: [{ profileId: 'coffee', confidence: 0.9, rationale: 'r', tags: [] }] }
    })
    // A cache write that never settles (e.g. Supabase hanging) must not block the response
    supabase.setRecommendationCache.mockReturnValue(new Promise(() => {}))

    const res = await app.request('/api/recommend', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: `warm neighbourhood coffee roastery ${Date.now()}` })
    })
    expect(res.status).toBe(200)
    expect((await res.json()).profileId).toBe('coffee')
    expect(supabase.setRecommendationCache).toHaveBeenCalledOnce()
  })
})

describe('semantic font search', () => {
  it('applies weight filters to vector results', async () => {
    vi.stubEnv('GEMINI_API_KEY', 'k')
    embeddings.getGeminiEmbedding.mockResolvedValue([1, 0])
    supabase.searchFontsWithVector.mockResolvedValue([
      { family: 'Inter', similarity: 0.9 },          // 100-900: passes min_weight=800
      { family: 'Lora', similarity: 0.8 },           // 400-700: filtered out
      { family: 'Playfair Display', similarity: 0.7 } // 400-900: passes
    ])
    const res = await app.request('/api/fonts?q=bold+heavy+headline&mode=semantic&min_weight=800', {
      headers: { 'x-forwarded-for': `10.0.0.${Math.floor(Math.random() * 250)}` }
    })
    const data = await res.json()
    expect(data.searchMode).toBe('vector_pgvector')
    expect(data.fonts.map((f) => f.family)).toEqual(['Inter', 'Playfair Display'])
  })
})

describe('getGeminiEmbedding', () => {
  const ok = () => ({ ok: true, json: async () => ({ embedding: { values: [3, 4] } }) })

  it('skips the API after a 429 until the retry delay passes', async () => {
    let t = 1_000
    const fetchImpl = vi.fn(async () => ({
      ok: false, status: 429, json: async () => ({ error: { message: 'Please retry in 30s.' } })
    }))
    const opts = { apiKey: 'k', fetchImpl, now: () => t }
    expect(await realGetEmbedding('first query', opts)).toBeNull()
    expect(await realGetEmbedding('second query', opts)).toBeNull()
    expect(fetchImpl).toHaveBeenCalledTimes(1)

    t += 31_000
    fetchImpl.mockImplementation(async () => ok())
    expect(await realGetEmbedding('second query', opts)).toEqual([0.6, 0.8])
    expect(fetchImpl).toHaveBeenCalledTimes(2)
  })

  it('charges the budget only for real API calls', async () => {
    const fetchImpl = vi.fn(async () => ok())
    const beforeRequest = vi.fn(async () => true)
    await realGetEmbedding('cached query', { apiKey: 'k', fetchImpl, beforeRequest })
    await realGetEmbedding('cached query', { apiKey: 'k', fetchImpl, beforeRequest })
    expect(beforeRequest).toHaveBeenCalledTimes(1)
    expect(fetchImpl).toHaveBeenCalledTimes(1)
  })

  it('does not call the API when the budget is spent', async () => {
    const fetchImpl = vi.fn(async () => ok())
    expect(await realGetEmbedding('q', { apiKey: 'k', fetchImpl, beforeRequest: async () => false })).toBeNull()
    expect(fetchImpl).not.toHaveBeenCalled()
  })
})

describe('consumeEmbedQuota (in-memory fallback)', () => {
  it('allows exactly maxPerDay calls', async () => {
    const results = []
    for (let i = 0; i < 3; i++) results.push(await supabase.consumeEmbedQuota(2))
    expect(results).toEqual([true, true, false])
    expect(await supabase.consumeEmbedQuota(0)).toBe(false)
  })
})

describe('runInBackground', () => {
  it('swallows rejections outside Vercel', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    await expect(runInBackground(Promise.reject(new Error('boom')))).resolves.toBeUndefined()
    warn.mockRestore()
  })
})
