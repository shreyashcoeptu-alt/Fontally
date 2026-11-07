/**
 * @vitest-environment node
 *
 * Recommendation engine pieces: cache keys, candidate selection, language
 * support, body pairing rules, and learning from feedback.
 */
import { afterEach, describe, expect, it, vi } from 'vitest'
import app from '../server/app.mjs'
import { normalizeBriefKey } from '../shared/brief-key.js'
import { selectCandidates } from '../server/lib/candidates.mjs'
import { detectScript, scriptSupport, suggestBodyFonts, googleFontsCssUrl } from '../shared/pairing.js'
import { profiles } from '../shared/profiles.js'
import { resetGeminiCooldowns } from '../server/lib/gemini-client.mjs'

const P = (id) => profiles.find((p) => p.id === id)

describe('Brief keys', () => {
  it('keeps non-Latin briefs distinct (they used to collapse to "")', () => {
    const a = normalizeBriefKey('日本の茶道')
    const b = normalizeBriefKey('हिंदी पत्रिका')
    expect(a).not.toBe('')
    expect(a).not.toBe(b)
  })
  it('ignores case, punctuation and spacing', () => {
    expect(normalizeBriefKey('  Warm, BAKERY!! ')).toBe(normalizeBriefKey('warm bakery'))
  })
})

describe('Candidate selection', () => {
  it('sends the whole catalog by default', () => {
    expect(selectCandidates('warm sourdough bakery', { limit: 0 }).profiles.length).toBe(profiles.length)
  })
  it('shortlists only when keyword retrieval is confident', () => {
    expect(selectCandidates('warm sourdough bakery', { limit: 20 }).profiles.length).toBe(20)
    // Abstract brief: no strong keyword hits, so Gemini sees everything
    expect(selectCandidates('make it feel expensive', { limit: 20 }).profiles.length).toBe(profiles.length)
  })
  it('marks language support for non-Latin briefs and keeps capable profiles in a shortlist', () => {
    const { profiles: chosen, script } = selectCandidates('日本の茶道 tea ceremony brand', { limit: 5 })
    expect(script.id).toBe('japanese')
    const kyoto = chosen.find((p) => p.id === 'kyoto_ceremonial_matcha')
    expect(kyoto.lang).toBe('heading')
    expect(chosen.find((p) => p.id === 'tokyo_pixel_signage')).toBeDefined()
  })
})

describe('Language support', () => {
  it('detects scripts, preferring kana over Han', () => {
    expect(detectScript('日本の茶道').id).toBe('japanese')
    expect(detectScript('茶道').id).toBe('chinese')
    expect(detectScript('हिंदी').id).toBe('devanagari')
    expect(detectScript('café')).toBeNull()
  })
  it('knows which fonts carry which glyphs', () => {
    const hindi = detectScript('हिंदी')
    expect(scriptSupport(P('nonprofit_cause'), hindi).heading).toBe(true) // Poppins
    expect(scriptSupport(P('coffee'), hindi).heading).toBe(false) // Newsreader
  })
})

describe('On-demand body pairing', () => {
  it('pairs a serif heading with a sans body first, and offers different styles', () => {
    const options = suggestBodyFonts(P('coffee'), { brief: 'warm sourdough bakery' })
    expect(options).toHaveLength(3)
    expect(options[0].category).toBe('sans-serif')
    expect(new Set(options.map((o) => o.category)).size).toBeGreaterThan(1)
    expect(options.map((o) => o.family)).not.toContain('DM Sans') // already the curated pair
  })
  it('only offers fonts with the brief\'s glyphs', () => {
    const options = suggestBodyFonts(P('coffee'), { script: detectScript('हिंदी') })
    expect(options.length).toBeGreaterThan(0)
    for (const o of options) expect(['Noto Sans', 'Mukta', 'Hind', 'Noto Sans Devanagari', 'Poppins']).toContain(o.family)
  })
  it('never offers monospace bodies for non-technical briefs', () => {
    expect(suggestBodyFonts(P('wedding_invitation')).every((o) => o.category !== 'monospace')).toBe(true)
  })
  it('requests only weights a static font actually has', () => {
    expect(googleFontsCssUrl('Lato')).toContain('wght@400;700') // Lato has no 600
  })
})

describe('Learning from feedback', () => {
  const originalKey = process.env.GEMINI_API_KEY
  afterEach(() => {
    vi.unstubAllGlobals()
    process.env.GEMINI_API_KEY = originalKey
    resetGeminiCooldowns()
  })

  const recommend = (prompt) => app.request('/api/recommend', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-forwarded-for': `ip-${Math.random()}` },
    body: JSON.stringify({ prompt })
  }).then((r) => r.json())

  const vote = (briefKey, profileId, session) => app.request('/api/feedback', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'x-session-id': session, 'x-forwarded-for': `ip-${Math.random()}` },
    body: JSON.stringify({ briefKey, profileId, event: 'choose_alternate' })
  })

  it('validates feedback events', async () => {
    const bad = await app.request('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ briefKey: 'x', profileId: 'not-a-profile', event: 'copy_css' })
    })
    expect(bad.status).toBe(400)
  })

  it('promotes an alternate after 3 different visitors choose it', async () => {
    process.env.GEMINI_API_KEY = 'test-key'
    vi.stubGlobal('fetch', async () => new Response(JSON.stringify({
      candidates: [{ content: { parts: [{ text: JSON.stringify({
        brandName: '',
        picks: [
          { profileId: 'coffee', confidence: 0.9, rationale: 'a', tags: [] },
          { profileId: 'vintage_bakery', confidence: 0.8, rationale: 'b', tags: [] },
          { profileId: 'wonky_craft_artisan', confidence: 0.7, rationale: 'c', tags: [] }
        ]
      }) }] } }]
    }), { status: 200 }))

    const brief = `feedback test bakery ${Math.random()}`
    const first = await recommend(brief)
    expect(first.picks.map((p) => p.profileId)).toEqual(['coffee', 'vintage_bakery', 'wonky_craft_artisan'])

    // One visitor voting many times counts once
    for (let i = 0; i < 5; i++) await vote(first.briefKey, 'wonky_craft_artisan', 'same-visitor')
    expect((await recommend(brief)).picks[0].profileId).toBe('coffee')

    await vote(first.briefKey, 'wonky_craft_artisan', 'visitor-2')
    await vote(first.briefKey, 'wonky_craft_artisan', 'visitor-3')
    const learned = await recommend(brief)
    expect(learned.cached).toBe(true)
    expect(learned.picks[0].profileId).toBe('wonky_craft_artisan')
    expect(learned.profileId).toBe('wonky_craft_artisan')
  })
})
