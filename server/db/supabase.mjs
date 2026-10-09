import { createClient } from '@supabase/supabase-js'

let supabaseClient = null

// In-memory fallback caches when Supabase is not configured or during offline dev
const inMemoryCache = new Map()
const inMemoryHistory = []
const inMemoryFavourites = []

export function getSupabaseClient() {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY

  if (supabaseUrl && supabaseKey) {
    try {
      supabaseClient = createClient(supabaseUrl, supabaseKey, {
        auth: { persistSession: false }
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
      .select('profile_id, confidence, rationale, tags, hit_count')
      .eq('cache_key', cacheKey)
      .maybeSingle()

    if (error || !data) return null

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
      tags: data.tags || []
    }
  } catch (err) {
    console.warn('Supabase cache lookup error:', err.message)
    return inMemoryCache.get(cacheKey) || null
  }
}

export async function setRecommendationCache(cacheKey, { profileId, confidence, rationale, tags }) {
  // Always write to in-memory cache as immediate layer
  inMemoryCache.set(cacheKey, { profileId, confidence, rationale, tags })

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
