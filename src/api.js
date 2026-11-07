// Browser-side API helpers: anonymous session id, feedback events, and the
// saved-pairings / recent-briefs endpoints.
//
// Saved pairings and recent briefs are mirrored in localStorage, so they survive
// even when the server has no database (Supabase down = in-memory only, lost on
// every cold start). The server copy is used to sync across devices when it works.

const SESSION_KEY = 'fontally:session'
const SAVED_KEY = 'fontally:saved'
const RECENT_KEY = 'fontally:recent'
const MAX_RECENT = 8

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // Private mode / storage blocked: features still work for this page view
  }
}

let memorySessionId = null
export function getSessionId() {
  let id = null
  try {
    id = localStorage.getItem(SESSION_KEY)
  } catch { /* storage blocked */ }
  if (!id) {
    id = memorySessionId || (globalThis.crypto?.randomUUID?.() ?? `s-${Date.now()}-${Math.random().toString(36).slice(2)}`)
    memorySessionId = id
    try { localStorage.setItem(SESSION_KEY, id) } catch { /* storage blocked */ }
  }
  return id
}

export function apiFetch(path, options = {}) {
  return fetch(path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-session-id': getSessionId(),
      ...(options.headers || {})
    }
  })
}

/** Fire-and-forget: tells the server which pick the visitor actually used. */
export function sendFeedback({ briefKey, profileId, event }) {
  if (!briefKey || !profileId) return
  apiFetch('/api/feedback', {
    method: 'POST',
    body: JSON.stringify({ briefKey, profileId, event }),
    keepalive: true
  }).catch(() => {})
}

// ---- Saved pairings ---------------------------------------------------------

const pairKey = (f) => `${f.heading_font}|${f.body_font}`

export function getLocalSaved() {
  return readJson(SAVED_KEY, [])
}

export async function loadSaved() {
  const local = getLocalSaved()
  try {
    const res = await apiFetch('/api/favourites')
    if (!res.ok) return local
    const { favourites = [] } = await res.json()
    const merged = new Map(local.map((f) => [pairKey(f), f]))
    for (const f of favourites) if (!merged.has(pairKey(f))) merged.set(pairKey(f), f)
    const list = [...merged.values()]
    writeJson(SAVED_KEY, list)
    return list
  } catch {
    return local
  }
}

export async function savePairing({ profileId, headingFont, bodyFont, label }) {
  const entry = {
    id: `local-${Date.now()}`,
    profile_id: profileId,
    heading_font: headingFont,
    body_font: bodyFont,
    label: label || null,
    created_at: new Date().toISOString()
  }
  const list = getLocalSaved().filter((f) => pairKey(f) !== pairKey(entry))
  list.unshift(entry)
  writeJson(SAVED_KEY, list)
  apiFetch('/api/favourites', {
    method: 'POST',
    body: JSON.stringify({ profileId, headingFont, bodyFont, label })
  }).catch(() => {})
  return list
}

export async function removePairing(entry) {
  const list = getLocalSaved().filter((f) => pairKey(f) !== pairKey(entry))
  writeJson(SAVED_KEY, list)
  if (entry.id && !String(entry.id).startsWith('local-')) {
    apiFetch(`/api/favourites/${encodeURIComponent(entry.id)}`, { method: 'DELETE' }).catch(() => {})
  }
  return list
}

// ---- Recent briefs ----------------------------------------------------------

export function getRecentBriefs() {
  return readJson(RECENT_KEY, [])
}

export function rememberBrief(brief, profileId) {
  const list = getRecentBriefs().filter((r) => r.brief.toLowerCase() !== brief.toLowerCase())
  list.unshift({ brief, profileId, at: new Date().toISOString() })
  writeJson(RECENT_KEY, list.slice(0, MAX_RECENT))
  return list.slice(0, MAX_RECENT)
}
