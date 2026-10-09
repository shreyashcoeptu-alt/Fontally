/**
 * @vitest-environment node
 */
import { describe, expect, it } from 'vitest'
import app from '../server/app.mjs'

describe('Fontally Hono Backend API', () => {
  it('GET /api/health returns system status', async () => {
    const res = await app.request('/api/health')
    expect(res.status).toBe(200)
    const data = await res.json()
    expect(data.status).toBe('healthy')
    expect(data.features).toBeDefined()
    expect(data.features.fuzzySearchSupported).toBe(true)
  })

  describe('GET /api/fonts catalogue search', () => {
    it('returns font catalog with metadata', async () => {
      const res = await app.request('/api/fonts')
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.total).toBeGreaterThan(0)
      expect(Array.isArray(data.fonts)).toBe(true)
      const inter = data.fonts.find((f) => f.family === 'Inter')
      expect(inter).toBeDefined()
      expect(inter.is_variable).toBe(true)
      expect(inter.mood_tags).toContain('clean')
    })

    it('filters by category', async () => {
      const res = await app.request('/api/fonts?category=serif')
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.fonts.length).toBeGreaterThan(0)
      for (const font of data.fonts) {
        expect(font.category.toLowerCase()).toBe('serif')
      }
    })

    it('filters by variable font support', async () => {
      const res = await app.request('/api/fonts?variable=true')
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.fonts.length).toBeGreaterThan(0)
      for (const font of data.fonts) {
        expect(font.is_variable).toBe(true)
      }
    })

    it('handles typo-tolerant fuzzy search with Fuse.js', async () => {
      // Searching 'playfar' should fuzzy-match 'Playfair Display'
      const res = await app.request('/api/fonts?q=playfar')
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.searchMode).toBe('fuzzy')
      expect(data.fonts.length).toBeGreaterThan(0)
      expect(data.fonts[0].family).toBe('Playfair Display')
    })

    it('handles mood tag searches via fuzzy index', async () => {
      const res = await app.request('/api/fonts?q=cyberpunk')
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.fonts.length).toBeGreaterThan(0)
      const families = data.fonts.map((f) => f.family)
      expect(families).toContain('Orbitron')
    })
  })

  describe('GET /api/fonts/similar/:family', () => {
    it('finds similar fonts for a given family', async () => {
      const res = await app.request('/api/fonts/similar/Playfair%20Display')
      expect(res.status).toBe(200)
      const data = await res.json()
      expect(data.targetFont).toBe('Playfair Display')
      expect(data.similar.length).toBeGreaterThan(0)
      // Similar fonts should share serif category and visual traits
      expect(data.similar.some((f) => f.category === 'serif')).toBe(true)
    })

    it('returns 404 for nonexistent font', async () => {
      const res = await app.request('/api/fonts/similar/NonExistentFontXYZ')
      expect(res.status).toBe(404)
    })
  })

  describe('User History API', () => {
    it('saves and retrieves brief search history by session ID', async () => {
      const sessionId = 'test-session-' + Date.now()

      // 1. Post new history item
      const postRes = await app.request('/api/history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId
        },
        body: JSON.stringify({
          brief: 'A warm bakery brand with nostalgic 70s typography.',
          profileId: 'pastry-shop',
          rationale: 'Fluid retro curves evoke handcrafted dough.',
          tags: ['WARM', 'RETRO']
        })
      })
      expect(postRes.status).toBe(201)

      // 2. Fetch history for this session
      const getRes = await app.request('/api/history', {
        headers: { 'x-session-id': sessionId }
      })
      expect(getRes.status).toBe(200)
      const data = await getRes.json()
      expect(data.history.length).toBe(1)
      expect(data.history[0].profileId || data.history[0].profile_id).toBe('pastry-shop')
    })
  })

  describe('User Favourites API', () => {
    it('saves, retrieves, and deletes favourite pairings', async () => {
      const sessionId = 'test-fav-session-' + Date.now()

      // 1. Save favourite
      const postRes = await app.request('/api/favourites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-session-id': sessionId
        },
        body: JSON.stringify({
          headingFont: 'Playfair Display',
          bodyFont: 'Plus Jakarta Sans',
          label: 'Editorial Luxury'
        })
      })
      expect(postRes.status).toBe(201)
      const postData = await postRes.json()
      const favId = postData.favourite.id

      // 2. Retrieve favourites
      const getRes = await app.request('/api/favourites', {
        headers: { 'x-session-id': sessionId }
      })
      expect(getRes.status).toBe(200)
      const getData = await getRes.json()
      expect(getData.favourites.length).toBe(1)
      expect(getData.favourites[0].heading_font || getData.favourites[0].headingFont).toBe('Playfair Display')

      // 3. Delete favourite
      const delRes = await app.request(`/api/favourites/${favId}`, {
        method: 'DELETE',
        headers: { 'x-session-id': sessionId }
      })
      expect(delRes.status).toBe(200)

      // 4. Verify deletion
      const verifyRes = await app.request('/api/favourites', {
        headers: { 'x-session-id': sessionId }
      })
      const verifyData = await verifyRes.json()
      expect(verifyData.favourites.length).toBe(0)
    })
  })
})
