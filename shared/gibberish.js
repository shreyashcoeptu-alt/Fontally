// Shared gibberish / low-information prompt detector.
// Used by both the browser (instant feedback) and the API (authoritative check),
// so the two can never drift apart.

// Common valid creative/short design terms, acronyms, and font abbreviations
const VALID_TERMS = new Set([
  'ai', 'ui', 'ux', '3d', '2d', '4d', 'vr', 'ar', 'xr', 'mr',
  'b2b', 'b2c', 'd2c', 'dtc', 'p2p', 'web3', 'y2k',
  'it', 'os', 'ip', 'pr', 'hr', 'hq', 'ad', 'id', 'io', 'fx',
  'ibm', 'rpg', 'mmo', 'fps', 'dev', 'app', 'cli', 'sdk', 'api',
  'bbq', 'crm', 'cms', 'nft', 'bmx', 'mma', 'sql', 'seo', 'mvp', 'kpi',
  'hvac', 'nyc', 'dj', 'tv', 'pc', 'ugc', 'cpg', 'fmcg', 'llm', 'gpt',
  '80s', '90s', '70s', '60s', '50s', '00s',
  'pt', 'dm', 'pp'
])

const KEYBOARD_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm', '1234567890']
const VOWELS = new Set(['a', 'e', 'i', 'o', 'u', 'y'])
const LATIN_ONLY = /^[a-z0-9]+$/

export function isGibberishPrompt(prompt) {
  if (!prompt || typeof prompt !== 'string') return true
  const trimmed = prompt.trim()
  if (trimmed.length < 2) return true

  // Strip punctuation but keep letters from every script (é, 日本, हिंदी, Ελληνικά...)
  const clean = trimmed.replace(/[^\p{L}\p{M}\p{N}\s]/gu, ' ').trim()
  if (!clean) return true

  const words = clean.split(/\s+/).filter(Boolean)
  if (!words.length) return true

  // Reject pure numbers
  if (/^\d+$/.test(clean.replace(/\s+/g, ''))) return true

  // Keyboard row walks: "asdf", "qwerty", "fghj dfgh"
  const normalizedLower = clean.toLowerCase().replace(/\s+/g, '')
  for (const row of KEYBOARD_ROWS) {
    if (normalizedLower.length >= 4 && row.includes(normalizedLower)) return true
  }

  // Repeated characters: "aaaaa", "zzzzz"
  if (/^(.)\1{3,}$/u.test(normalizedLower)) return true

  let recognizedWordCount = 0
  let suspiciousWordCount = 0

  for (const word of words) {
    const lower = word.toLowerCase()

    if (VALID_TERMS.has(lower) || /^\d{2,4}s$/.test(lower)) {
      recognizedWordCount++
      continue
    }

    // Short ALL-CAPS tokens are almost always acronyms (CRM, BMX, NASA)
    if (/^[A-Z]{2,5}$/.test(word)) {
      recognizedWordCount++
      continue
    }

    // The vowel heuristics below only make sense for plain Latin words.
    // Accented and non-Latin words are treated as real language.
    if (!LATIN_ONLY.test(lower)) {
      recognizedWordCount++
      continue
    }

    // Numbers interleaved in letters (e.g. afrvq1r1)
    if (/[a-z]+\d+[a-z]+|\d+[a-z]+\d+/.test(lower)) {
      suspiciousWordCount++
      continue
    }

    // Single non-vowel consonant (e.g. 'q', 'z', 'x')
    if (lower.length === 1 && /[a-z]/.test(lower) && !VOWELS.has(lower)) {
      suspiciousWordCount++
      continue
    }

    const letters = lower.replace(/[^a-z]/g, '')
    if (letters.length >= 3) {
      let vowelCount = 0
      for (const char of letters) {
        if (VOWELS.has(char)) vowelCount++
      }

      if (vowelCount === 0) {
        suspiciousWordCount++
        continue
      }

      if (vowelCount / letters.length < 0.16 && letters.length >= 6) {
        suspiciousWordCount++
        continue
      }

      // Impossible consonant clusters
      if (/[bcdfghjklmnpqrstvwxz]{5,}/.test(letters) || /vq|qx|zx|qj|xk|vj|dxj|frvq/.test(letters)) {
        suspiciousWordCount++
        continue
      }
    }

    recognizedWordCount++
  }

  return recognizedWordCount === 0 && suspiciousWordCount > 0
}
