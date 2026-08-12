/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'
import { Readable } from 'node:stream'
import {
  createGeminiRecommendationHandler,
  parseRecommendation,
  recommendationSchema
} from '../server/gemini-recommendation.mjs'

function makeRequest(body, remoteAddress = `test-${Math.random()}`) {
  const request = Readable.from([JSON.stringify(body)])
  request.method = 'POST'
  request.headers = { 'content-type': 'application/json' }
  request.socket = { remoteAddress }
  return request
}

function makeResponse() {
  return {
    statusCode: 200,
    headers: {},
    body: '',
    setHeader(name, value) {
      this.headers[name] = value
    },
    end(body = '') {
      this.body = body
    }
  }
}

const profiles = [
  {
    id: 'architect',
    name: 'Helvetica Now Display',
    meta: 'GROTESK / DISPLAY',
    archetype: 'THE BEAUTIFUL MENACE',
    rationale: 'An architectural grotesk with editorial tension.',
    words: ['architect', 'brutal', 'portfolio']
  },
  {
    id: 'fintech',
    name: 'PP Neue Montreal',
    meta: 'GROTESK / VARIABLE',
    archetype: 'THE OPTIMISTIC OPERATOR',
    rationale: 'A calm precision-first system for finance.',
    words: ['fintech', 'wealth', 'finance']
  }
]

describe('Gemini recommendation service', () => {
  it('validates profile IDs and clamps confidence', () => {
    const result = parseRecommendation(
      JSON.stringify({ profileId: 'architect', confidence: 1.4, rationale: 'Strong fit.', tags: ['brutalist'] }),
      new Set(['architect', 'fintech'])
    )
    expect(result.profileId).toBe('architect')
    expect(result.confidence).toBe(1)
    expect(result.tags).toEqual(['brutalist'])
  })

  it('rejects a model response that invents a profile ID', () => {
    expect(() => parseRecommendation(
      JSON.stringify({ profileId: 'invented', confidence: 0.8, rationale: 'No.', tags: [] }),
      new Set(['architect', 'fintech'])
    )).toThrow('unknown profileId')
  })

  it('sends the catalog to Gemini and returns the validated recommendation', async () => {
    let captured
    const handler = createGeminiRecommendationHandler({
      apiKey: 'test-secret',
      model: 'gemini-test',
      fetchImpl: async (url, options) => {
        captured = { url, options }
        return new Response(JSON.stringify({
          candidates: [{
            content: {
              parts: [{ text: JSON.stringify({
                profileId: 'architect',
                confidence: 0.91,
                rationale: 'The brief calls for brutalist editorial tension.',
                tags: ['brutalist', 'editorial']
              }) }]
            }
          }]
        }), { status: 200, headers: { 'content-type': 'application/json' } })
      }
    })
    const request = makeRequest({ prompt: 'A brutalist architecture portfolio.', profiles })
    const response = makeResponse()

    await handler(request, response)

    expect(response.statusCode).toBe(200)
    expect(JSON.parse(response.body).profileId).toBe('architect')
    expect(captured.url).toContain('/models/gemini-test:generateContent')
    expect(captured.options.headers['x-goog-api-key']).toBe('test-secret')
    expect(JSON.parse(captured.options.body).generationConfig.responseMimeType).toBe('application/json')
    expect(JSON.parse(captured.options.body).generationConfig.responseSchema).toEqual(recommendationSchema)
  })

  it('returns a configuration error without an API key', async () => {
    const handler = createGeminiRecommendationHandler({ apiKey: '' })
    const response = makeResponse()
    await handler(makeRequest({ prompt: 'A quiet editorial coffee brand.', profiles }), response)
    expect(response.statusCode).toBe(503)
    expect(JSON.parse(response.body).error).toMatch(/GEMINI_API_KEY/)
  })
})
