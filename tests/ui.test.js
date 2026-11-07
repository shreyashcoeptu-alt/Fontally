/**
 * @vitest-environment jsdom
 *
 * UI smoke test: loads the real index.html + src/main.js with a mocked API and
 * checks the top-3 cards, the "in your words" preview, and swapping picks.
 */
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

vi.mock('@vercel/analytics', () => ({ inject: () => {} }))

const html = readFileSync(resolve(__dirname, '../index.html'), 'utf8')
const body = html.slice(html.indexOf('<body'), html.lastIndexOf('</body>')).replace(/^<body[^>]*>/, '').replace(/<script[\s\S]*?<\/script>/g, '')

const apiResponse = {
  profileId: 'coffee',
  confidence: 0.9,
  rationale: 'Warm serif for a neighbourhood bakery.',
  tags: ['warm'],
  brandName: 'Crumb & Co',
  picks: [
    { profileId: 'coffee', confidence: 0.9, rationale: 'Warm serif for a neighbourhood bakery.', tags: ['warm'] },
    { profileId: 'wonky_craft_artisan', confidence: 0.8, rationale: 'Wonky, handmade character.', tags: ['craft'] },
    { profileId: 'french_patisserie', confidence: 0.7, rationale: 'Parisian elegance.', tags: ['paris'] }
  ]
}

const $ = (sel) => document.querySelector(sel)
const sentRequests = []
const flush = () => new Promise((r) => setTimeout(r, 0))

async function ask(brief) {
  $('#brief').value = brief
  $('#analyse').click()
  for (let i = 0; i < 10 && $('#analyse').disabled; i++) await flush()
  await flush()
}

beforeAll(async () => {
  document.body.innerHTML = body
  window.scrollTo = () => {}
  Element.prototype.scrollIntoView = () => {}
  globalThis.fetch = vi.fn(async (url, options = {}) => {
    sentRequests.push({ url: String(url), method: options.method || 'GET', headers: options.headers || {}, body: options.body ? JSON.parse(options.body) : null })
    if (String(url).startsWith('/api/favourites')) return new Response(JSON.stringify({ favourites: [] }), { status: 200 })
    if (String(url).startsWith('/api/feedback')) return new Response('{"ok":true}', { status: 202 })
    const { prompt } = JSON.parse(options.body)
    let payload = apiResponse
    if (prompt.includes('<b>')) payload = { ...apiResponse, brandName: '<b>Acme</b>' }
    if (prompt.includes('茶道')) {
      payload = {
        ...apiResponse,
        brandName: '',
        script: { id: 'japanese', label: 'Japanese' },
        picks: [
          { profileId: 'kyoto_ceremonial_matcha', confidence: 0.9, rationale: 'Mincho for tea.', tags: [], scriptSupport: { heading: true, body: false } },
          { profileId: 'japanese_zen', confidence: 0.8, rationale: 'Zen.', tags: [], scriptSupport: { heading: true, body: true } }
        ]
      }
      payload.profileId = payload.picks[0].profileId
    }
    return new Response(JSON.stringify({ ...payload, briefKey: prompt.toLowerCase() }), { status: 200 })
  })
  await import('../src/main.js')
})

describe('Top-3 recommendation UI', () => {
  it('hides alternates and the brief preview before any brief is asked', () => {
    expect($('#alternates').hidden).toBe(true)
    expect($('#briefPreview').hidden).toBe(true)
  })

  it('shows pick #1, its rationale, the brand preview and two alternates', async () => {
    await ask('Crumb & Co, a warm sourdough bakery in Lisbon')

    expect(new URL(window.location.href).searchParams.get('vibe')).toBe('coffee')
    expect($('#displayName').textContent).toBe('Newsreader')
    expect($('#aiRationale').textContent).toBe('Warm serif for a neighbourhood bakery.')
    expect($('#aiRationale').hidden).toBe(false)

    expect($('#displaySample').textContent).toBe('Crumb & Co')
    expect($('#briefPreview').hidden).toBe(false)
    expect($('#previewBrand').textContent).toBe('Crumb & Co')
    expect($('#previewBody').textContent).toBe('Crumb & Co, a warm sourdough bakery in Lisbon')
    expect($('#previewBody').style.fontFamily).toContain('DM Sans')

    const cards = [...document.querySelectorAll('.alternate-card')]
    expect(cards).toHaveLength(2)
    expect(cards[0].textContent).toContain('Fraunces + DM Sans')
    expect(cards[0].textContent).toContain('Wonky, handmade character.')
  })

  it('swaps an alternate into the main card and keeps the old main as an alternate', async () => {
    document.querySelector('.alternate-card').click()
    await flush()

    expect(new URL(window.location.href).searchParams.get('vibe')).toBe('wonky_craft_artisan')
    expect($('#displayName').textContent).toBe('Fraunces')
    expect($('#aiRationale').textContent).toBe('Wonky, handmade character.')
    const families = [...document.querySelectorAll('.alternate-families')].map((el) => el.textContent)
    expect(families).toEqual(['Newsreader + DM Sans', 'Playfair Display + Plus Jakarta Sans'])
  })

  it('keeps the edited brand name in sync across previews', async () => {
    const brand = $('#previewBrand')
    brand.textContent = 'Crumb Bakery'
    brand.dispatchEvent(new Event('input'))
    expect($('#displaySample').textContent).toBe('Crumb Bakery')
    expect(document.querySelector('.alternate-sample').textContent).toBe('Crumb Bakery')
  })

  it('renders user-supplied brand text as text, never HTML', async () => {
    await ask('<b>Acme</b> studio for bold posters')
    expect($('#displaySample').querySelector('b')).toBeNull()
    expect($('#displaySample').textContent).toBe('<b>Acme</b>')
  })

  it('clears the alternates when a shelf profile is picked', async () => {
    document.querySelector('.shelf-item').click()
    await flush()
    expect($('#alternates').hidden).toBe(true)
    expect($('#briefPreview').hidden).toBe(true)
    expect($('#aiRationale').hidden).toBe(true)
  })

  it('falls back to 3 offline picks when the API is down', async () => {
    globalThis.fetch.mockImplementationOnce(async () => new Response('{}', { status: 503 }))
    await ask('cozy cottagecore tea room with wildflowers')
    expect(document.querySelectorAll('.alternate-card').length).toBe(2)
    expect($('#recommendationStatus').textContent).toContain('offline matcher')
  })

  it('sends an anonymous session id with API calls', () => {
    const rec = sentRequests.find((r) => r.url === '/api/recommend')
    expect(rec.headers['x-session-id']).toMatch(/.{8,}/)
  })
})

describe('Body pairing, saving, feedback and language support', () => {
  it('offers rule-based body fonts and swaps the body everywhere, including the CSS export', async () => {
    await ask('Crumb & Co, a warm sourdough bakery in Lisbon')
    const chips = [...document.querySelectorAll('.body-option')]
    expect(chips.length).toBeGreaterThanOrEqual(3)
    expect(chips[0].textContent).toBe('DM Sans') // curated pair comes first
    expect(chips[0].getAttribute('aria-pressed')).toBe('true')

    const alt = chips[1]
    const family = alt.textContent
    alt.click()
    await flush()
    expect($('#pairName').textContent).toBe(family)
    expect($('#previewBody').style.fontFamily).toContain(family)
    expect([...document.querySelectorAll('.body-option')].find((c) => c.textContent === family).getAttribute('aria-pressed')).toBe('true')

    let copied = ''
    Object.defineProperty(window, 'isSecureContext', { value: true, configurable: true })
    Object.defineProperty(navigator, 'clipboard', { value: { writeText: async (t) => { copied = t } }, configurable: true })
    $('#copyCssBtn').click()
    await flush()
    expect(copied).toContain(`--font-body: '${family}'`)
    expect(copied).toContain(`family=${family.replace(/ /g, '+')}`)
  })

  it('records which pick was used, keyed by the brief', async () => {
    const feedback = sentRequests.filter((r) => r.url === '/api/feedback')
    expect(feedback.at(-1).body).toMatchObject({ event: 'copy_css', profileId: 'coffee' })
    expect(feedback.at(-1).body.briefKey).toContain('crumb')
  })

  it('saves a pairing locally and lists it, plus the recent brief', async () => {
    $('#savePairingBtn').click()
    for (let i = 0; i < 5; i++) await flush()
    expect($('#savePairingBtn').textContent).toBe('SAVED ✓')
    expect($('#savedSection').hidden).toBe(false)
    expect($('#savedList').textContent).toContain('Newsreader +')
    expect($('#recentList').textContent).toContain('Crumb & Co, a warm sourdough bakery in Lisbon')
    expect(sentRequests.some((r) => r.url === '/api/favourites' && r.method === 'POST')).toBe(true)
  })

  it('warns when a font cannot render the brief language', async () => {
    await ask('日本の茶道 tea ceremony brand')
    expect($('#scriptNote').hidden).toBe(false)
    expect($('#scriptNote').textContent).toContain('Japanese')
    expect($('#scriptNote').classList.contains('is-warning')).toBe(true)
    // Body suggestions only offer fonts with Japanese glyphs
    const offered = [...document.querySelectorAll('.body-option')].slice(1).map((c) => c.textContent)
    expect(offered.every((f) => /JP$/.test(f))).toBe(true)
  })

  it('tells the user when Gemini is out of quota and shows offline picks', async () => {
    globalThis.fetch.mockImplementationOnce(async () => new Response(JSON.stringify({
      error: 'Gemini is busy right now (free-tier quota). Showing offline picks instead.', reason: 'quota'
    }), { status: 429 }))
    await ask('retro arcade bar with pinball')
    expect($('#toast').textContent).toContain('busy')
    expect($('#recommendationStatus').textContent).toContain('offline matcher')
  })
})
