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
import { createGoogleFontsHandler } from '../server/google-fonts.mjs'

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

describe('Google Fonts API service', () => {
  it('returns default catalog with category and query filtering', async () => {
    const handler = createGoogleFontsHandler()
    const req = { method: 'GET', url: '/api/fonts?query=inter&category=sans-serif' }
    const res = makeResponse()

    await handler(req, res)

    expect(res.statusCode).toBe(200)
    const body = JSON.parse(res.body)
    expect(body.fonts.length).toBeGreaterThan(0)
    expect(body.fonts.some((f) => f.family.toLowerCase().includes('inter'))).toBe(true)
  })

  it('fetches from live Google Fonts API if API key is provided', async () => {
    let requestedUrl
    const handler = createGoogleFontsHandler({
      apiKey: 'test-gfonts-key',
      fetchImpl: async (url) => {
        requestedUrl = url
        return new Response(JSON.stringify({
          items: [
            { family: 'Custom Test Sans', category: 'sans-serif', variants: ['400'] },
            { family: 'Custom Test Serif', category: 'serif', variants: ['400'] }
          ]
        }), { status: 200, headers: { 'content-type': 'application/json' } })
      }
    })

    const req = { method: 'GET', url: '/api/fonts?category=serif' }
    const res = makeResponse()

    await handler(req, res)

    expect(res.statusCode).toBe(200)
    expect(requestedUrl).toContain('key=test-gfonts-key')
    const body = JSON.parse(res.body)
    expect(body.fonts).toEqual([{ family: 'Custom Test Serif', category: 'serif', variants: ['400'] }])
  })
})

