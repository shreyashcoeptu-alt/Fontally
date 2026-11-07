/**
 * @vitest-environment node
 */
import { beforeEach, describe, expect, it } from 'vitest'
import { parseRecommendation, isGibberishPrompt } from '../server/gemini-recommendation.mjs'
import { recommendWithGemini, getModelChain, resetGeminiCooldowns } from '../server/lib/gemini-client.mjs'

describe('Gemini recommendation parsing', () => {
  it('validates profile IDs and clamps confidence', () => {
    const result = parseRecommendation(
      JSON.stringify({ profileId: 'architect', confidence: 1.4, rationale: 'Strong fit.', tags: ['brutalist'] }),
      new Set(['architect', 'fintech'])
    )
    expect(result.profileId).toBe('architect')
    expect(result.confidence).toBe(1)
    expect(result.tags).toEqual(['brutalist'])
  })

  it('parses top-3 picks, dropping unknown and duplicate ids and clamping each confidence', () => {
    const result = parseRecommendation(
      JSON.stringify({
        brandName: '  Crumb & Co  ',
        picks: [
          { profileId: 'fintech', confidence: 1.7, rationale: 'Calm precision.', tags: ['calm'] },
          { profileId: 'invented', confidence: 0.9, rationale: 'Nope.', tags: [] },
          { profileId: 'fintech', confidence: 0.5, rationale: 'Duplicate.', tags: [] },
          { profileId: 'architect', confidence: -2, rationale: 'Tension.', tags: ['raw'] }
        ]
      }),
      new Set(['architect', 'fintech'])
    )
    expect(result.picks.map((p) => p.profileId)).toEqual(['fintech', 'architect'])
    expect(result.picks.map((p) => p.confidence)).toEqual([1, 0])
    expect(result.profileId).toBe('fintech')
    expect(result.rationale).toBe('Calm precision.')
    expect(result.brandName).toBe('Crumb & Co')
  })

  it('rejects picks when every id is unknown', () => {
    expect(() => parseRecommendation(
      JSON.stringify({ brandName: '', picks: [{ profileId: 'nope', confidence: 1, rationale: '', tags: [] }] }),
      new Set(['architect'])
    )).toThrow('unknown profileId')
  })

  it('rejects a model response that invents a profile ID', () => {
    expect(() => parseRecommendation(
      JSON.stringify({ profileId: 'invented', confidence: 0.8, rationale: 'No.', tags: [] }),
      new Set(['architect', 'fintech'])
    )).toThrow('unknown profileId')
  })

  it('does not falsely flag valid design terms or acronyms as gibberish', () => {
    const terms = ['ui', 'ux', 'ai', 'ibm', '3d', 'y2k', '80s', 'y2k cyberpunk', '80s retro synth']
    for (const term of terms) {
      expect(isGibberishPrompt(term)).toBe(false)
    }
  })
})

const profiles = [
  { id: 'architect', name: 'Inter', meta: 'GROTESK', archetype: 'THE BEAUTIFUL MENACE', rationale: 'Editorial tension.', words: ['architect'] },
  { id: 'fintech', name: 'Plus Jakarta Sans', meta: 'GROTESK', archetype: 'THE OPTIMISTIC OPERATOR', rationale: 'Calm precision.', words: ['finance'] }
]
const allowedIds = new Set(['architect', 'fintech'])

const okPayload = (profileId = 'architect') => ({
  candidates: [{ content: { parts: [{ text: JSON.stringify({
    brandName: '',
    picks: [{ profileId, confidence: 0.9, rationale: 'Fits.', tags: ['raw'] }]
  }) }] } }]
})
const reply = (status, body) => new Response(JSON.stringify(body), { status })

describe('Gemini model fallback chain', () => {
  beforeEach(() => resetGeminiCooldowns())

  it('answers from the first model and sends the key in a header', async () => {
    const calls = []
    const { result, model } = await recommendWithGemini({
      prompt: 'brutalist portfolio', profiles, allowedIds, apiKey: 'k', models: ['m-a', 'm-b'],
      fetchImpl: async (url, opts) => { calls.push({ url, opts }); return reply(200, okPayload()) }
    })
    expect(model).toBe('m-a')
    expect(result.picks[0].profileId).toBe('architect')
    expect(calls).toHaveLength(1)
    expect(calls[0].url).toContain('/models/m-a:generateContent')
    expect(calls[0].opts.headers['x-goog-api-key']).toBe('k')
  })

  it('falls through 429, 503 and invalid answers to the next model', async () => {
    const seq = [
      reply(429, { error: { message: 'Quota exceeded. Please retry in 30s.' } }),
      reply(503, { error: { message: 'high demand' } }),
      reply(200, { candidates: [{ content: { parts: [{ text: 'not json' }] } }] }),
      reply(200, okPayload('fintech'))
    ]
    const { result, model, attempts } = await recommendWithGemini({
      prompt: 'bank', profiles, allowedIds, apiKey: 'k', models: ['a', 'b', 'c', 'd'],
      fetchImpl: async () => seq.shift()
    })
    expect(model).toBe('d')
    expect(result.profileId).toBe('fintech')
    expect(attempts.map((a) => a.outcome)).toEqual(['http_429', 'http_503', 'invalid_response', 'ok'])
  })

  it('skips a model that recently ran out of quota', async () => {
    let calls = 0
    const quota = async () => { calls++; return reply(429, { error: { message: 'retry in 60s' } }) }
    await expect(recommendWithGemini({ prompt: 'x', profiles, allowedIds, apiKey: 'k', models: ['q'], fetchImpl: quota }))
      .rejects.toMatchObject({ statusCode: 429 })
    await expect(recommendWithGemini({ prompt: 'x', profiles, allowedIds, apiKey: 'k', models: ['q'], fetchImpl: quota }))
      .rejects.toMatchObject({ statusCode: 429 })
    expect(calls).toBe(1) // second request never hit the API
  })

  it('reports a timeout as 504', async () => {
    const hang = (_url, { signal }) => new Promise((_, reject) => signal.addEventListener('abort', () => reject(Object.assign(new Error('aborted'), { name: 'AbortError' }))))
    await expect(recommendWithGemini({
      prompt: 'x', profiles, allowedIds, apiKey: 'k', models: ['slow'], fetchImpl: hang, perModelTimeoutMs: 50, totalBudgetMs: 2_000
    })).rejects.toMatchObject({ statusCode: 504 })
  })

  it('builds the chain from GEMINI_MODEL then GEMINI_FALLBACK_MODELS, without duplicates', () => {
    expect(getModelChain({ GEMINI_MODEL: 'x', GEMINI_FALLBACK_MODELS: 'y, x ,z' })).toEqual(['x', 'y', 'z'])
    expect(getModelChain({}).length).toBeGreaterThan(1)
  })
})
