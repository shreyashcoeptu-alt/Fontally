import { createClient } from '@supabase/supabase-js'

let supabaseClient = null

// In-memory fallback caches when Supabase is not configured or during offline dev
const inMemoryCache = new Map()
const inMemoryHistory = []
const inMemoryFavourites = []

// Circuit breaker. An unreachable Supabase (paused project, DNS failure) used to
// add ~7s to every request while each call failed. Now each call is capped at
// 2.5s, and after a network failure Supabase is skipped for 60s and every
// function below uses its in-memory fallback instead.
const SUPABASE_TIMEOUT_MS = 2_500
const SUPABASE_COOLDOWN_MS = 60_000
let supabaseDownUntil = 0

export function isSupabaseAvailable() {
  return Date.now() >= supabaseDownUntil
}

async function guardedFetch(input, init = {}) {
  if (!isSupabaseAvailable()) {
    throw new Error('Supabase temporarily skipped after a network failure')
  }
  const timeout = AbortSignal.timeout(SUPABASE_TIMEOUT_MS)
  const signal = init.signal ? AbortSignal.any([init.signal, timeout]) : timeout
  try {
    return await fetch(input, { ...init, signal })
  } catch (err) {
    // Network-level failure or timeout (HTTP errors resolve normally and don't trip it)
    if (isSupabaseAvailable()) {
      console.warn(`Supabase unreachable (${err?.cause?.code || err?.name || err?.message}); using in-memory storage for ${SUPABASE_COOLDOWN_MS / 1000}s`)
    }
    supabaseDownUntil = Date.now() + SUPABASE_COOLDOWN_MS
    throw err
  }
}

export function getSupabaseClient() {
  if (process.env.NODE_ENV === 'test') return null
  if (!isSupabaseAvailable()) return null
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false },
        // supabase-js retries failed reads 3x with 1s/2s/4s backoff (7s). Every
        // caller here has an in-memory fallback, so fail fast instead.
        db: { retry: false },
        global: { fetch: guardedFetch }
      })
    } catch (err) {
      console.warn('Failed to initialize Supabase client:', err.message)
    }
  }

  return supabaseClient
}

export function isSupabaseConfigured() {
  return Boolean(process.env.SUPABASE_URL && (process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY))
}

// -------------------------------------------------------------
// Recommendation Cache Layer
// -------------------------------------------------------------

export async function getRecommendationCache(cacheKey) {
  const client = getSupabaseClient()
  if (!client) {
    return inMemoryCache.get(cacheKey) || null
  }

  try {
    const { data, error } = await client
      .from('recommendation_cache')
      .select('profile_id, confidence, rationale, tags, picks, brand_name, hit_count')
      .eq('cache_key', cacheKey)
      .maybeSingle()

    if (error || !data) return inMemoryCache.get(cacheKey) || null

    // Increment hit counter asynchronously
    client
      .from('recommendation_cache')
      .update({ hit_count: (data.hit_count || 1) + 1, last_hit_at: new Date().toISOString() })
      .eq('cache_key', cacheKey)
      .then(() => {})
      .catch(() => {})

    return {
      profileId: data.profile_id,
      confidence: data.confidence,
      rationale: data.rationale,
      tags: data.tags || [],
      brandName: data.brand_name || '',
      picks: Array.isArray(data.picks) ? data.picks : []
    }
  } catch (err) {
    console.warn('Supabase cache lookup error:', err.message)
    return inMemoryCache.get(cacheKey) || null
  }
}

export async function setRecommendationCache(cacheKey, { profileId, confidence, rationale, tags, brandName = '', picks = [] }) {
  // Always write to in-memory cache as immediate layer
  inMemoryCache.set(cacheKey, { profileId, confidence, rationale, tags, brandName, picks })

  const client = getSupabaseClient()
  if (!client) return

  try {
    await client
      .from('recommendation_cache')
      .upsert({
        cache_key: cacheKey,
        profile_id: profileId,
        confidence,
        rationale,
        tags: tags || [],
        picks,
        brand_name: brandName,
        hit_count: 1,
        last_hit_at: new Date().toISOString()
      }, { onConflict: 'cache_key' })
  } catch (err) {
    console.warn('Supabase cache write error:', err.message)
  }
}

// -------------------------------------------------------------
// Font Vector Similarity Query
// -------------------------------------------------------------

export async function searchFontsWithVector(embedding, {
  category = null,
  isVariable = null,
  limit = 20,
  threshold = 0.35
} = {}) {
  const client = getSupabaseClient()
  if (!client) return null

  try {
    const { data, error } = await client.rpc('match_fonts', {
      query_embedding: embedding,
      match_threshold: threshold,
      match_count: limit,
      filter_category: category && category !== 'all' ? category : null,
      filter_variable: typeof isVariable === 'boolean' ? isVariable : null
    })

    if (error) {
      console.warn('match_fonts RPC error:', error.message)
      return null
    }

    return data
  } catch (err) {
    console.warn('Supabase vector query error:', err.message)
    return null
  }
}

// -------------------------------------------------------------
// User History (Session-based)
// -------------------------------------------------------------

export async function getUserHistory(sessionId, limit = 20) {
  if (!sessionId) return []
  const client = getSupabaseClient()
  if (!client) {
    return inMemoryHistory
      .filter((h) => h.sessionId === sessionId)
      .slice(-limit)
      .reverse()
  }

  try {
    const { data, error } = await client
      .from('user_history')
      .select('id, brief, profile_id, rationale, tags, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })
      .limit(limit)

    if (error) throw error
    return data || []
  } catch (err) {
    console.warn('Error reading user history from Supabase:', err.message)
    return inMemoryHistory.filter((h) => h.sessionId === sessionId).slice(-limit).reverse()
  }
}

export async function saveUserHistory({ sessionId, brief, profileId, rationale, tags }) {
  if (!sessionId || !brief || !profileId) return null
  const entry = {
    id: `mem-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sessionId,
    brief,
    profileId,
    rationale,
    tags: tags || [],
    created_at: new Date().toISOString()
  }
  inMemoryHistory.push(entry)
  if (inMemoryHistory.length > 200) inMemoryHistory.shift()

  const client = getSupabaseClient()
  if (!client) return entry

  try {
    const { data, error } = await client
      .from('user_history')
      .insert({
        session_id: sessionId,
        brief,
        profile_id: profileId,
        rationale,
        tags: tags || []
      })
      .select()
      .maybeSingle()

    if (error) throw error
    return data
  } catch (err) {
    console.warn('Error saving user history to Supabase:', err.message)
    return entry
  }
}

// -------------------------------------------------------------
// User Favourites (Session-based)
// -------------------------------------------------------------

export async function getUserFavourites(sessionId) {
  if (!sessionId) return []
  const client = getSupabaseClient()
  if (!client) {
    return inMemoryFavourites.filter((f) => f.sessionId === sessionId)
  }

  try {
    const { data, error } = await client
      .from('user_favourites')
      .select('id, profile_id, heading_font, body_font, label, created_at')
      .eq('session_id', sessionId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data || []
  } catch (err) {
    console.warn('Error reading user favourites from Supabase:', err.message)
    return inMemoryFavourites.filter((f) => f.sessionId === sessionId)
  }
}

export async function saveUserFavourite({ sessionId, profileId, headingFont, bodyFont, label }) {
  if (!sessionId || !headingFont || !bodyFont) return null
  const entry = {
    id: `mem-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    sessionId,
    profile_id: profileId || null,
    heading_font: headingFont,
    body_font: bodyFont,
    label: label || null,
    created_at: new Date().toISOString()
  }

  const existingIdx = inMemoryFavourites.findIndex(
    (f) => f.sessionId === sessionId && f.heading_font === headingFont && f.body_font === bodyFont
  )
  if (existingIdx >= 0) inMemoryFavourites[existingIdx] = entry
  else inMemoryFavourites.push(entry)

  const client = getSupabaseClient()
  if (!client) return entry

  try {
    const { data, error } = await client
      .from('user_favourites')
      .upsert({
        session_id: sessionId,
        profile_id: profileId || null,
        heading_font: headingFont,
        body_font: bodyFont,
        label: label || null
      }, { onConflict: 'session_id,heading_font,body_font' })
      .select()
      .maybeSingle()

    if (error) throw error
    return data
  } catch (err) {
    console.warn('Error saving favourite to Supabase:', err.message)
    return entry
  }
}

export async function deleteUserFavourite(sessionId, id) {
  if (!sessionId || !id) return false
  const idx = inMemoryFavourites.findIndex((f) => f.sessionId === sessionId && f.id === id)
  if (idx >= 0) inMemoryFavourites.splice(idx, 1)

  const client = getSupabaseClient()
  if (!client) return true

  try {
    const { error } = await client
      .from('user_favourites')
      .delete()
      .eq('session_id', sessionId)
      .eq('id', id)

    if (error) throw error
    return true
  } catch (err) {
    console.warn('Error deleting favourite from Supabase:', err.message)
    return false
  }
}

// -------------------------------------------------------------
// Recommendation Feedback (learning which pick people actually use)
// -------------------------------------------------------------

// Events that mean "this pairing was the one I wanted"
export const CHOICE_EVENTS = new Set(['choose_alternate', 'copy_css', 'save', 'open_google_fonts'])
const inMemoryFeedback = []

export async function recordFeedback({ sessionId, briefKey, profileId, event }) {
  if (!briefKey || !profileId || !CHOICE_EVENTS.has(event)) return false
  inMemoryFeedback.push({ sessionId, briefKey, profileId, event, created_at: Date.now() })
  if (inMemoryFeedback.length > 2000) inMemoryFeedback.shift()

  const client = getSupabaseClient()
  if (!client) return true
  try {
    const { error } = await client.from('feedback_events').insert({
      session_id: sessionId || null,
      brief_key: briefKey,
      profile_id: profileId,
      event
    })
    if (error) throw error
    return true
  } catch (err) {
    console.warn('Error saving feedback to Supabase:', err.message)
    return true
  }
}

/**
 * { profileId: votes } for a brief. One vote per session per profile, so a
 * single visitor clicking "copy" ten times cannot reorder results for everyone.
 */
export async function getPickPreferences(briefKey) {
  if (!briefKey) return null
  const tally = (rows) => {
    const seen = new Set()
    const votes = {}
    for (const row of rows) {
      const voter = `${row.session_id || row.sessionId || 'anon'}|${row.profile_id || row.profileId}`
      if (seen.has(voter)) continue
      seen.add(voter)
      const id = row.profile_id || row.profileId
      votes[id] = (votes[id] || 0) + 1
    }
    return votes
  }

  const client = getSupabaseClient()
  if (!client) return tally(inMemoryFeedback.filter((f) => f.briefKey === briefKey))
  try {
    const { data, error } = await client
      .from('feedback_events')
      .select('session_id, profile_id')
      .eq('brief_key', briefKey)
      .limit(500)
    if (error) throw error
    return tally(data || [])
  } catch (err) {
    console.warn('Error reading feedback from Supabase:', err.message)
    return tally(inMemoryFeedback.filter((f) => f.briefKey === briefKey))
  }
}
