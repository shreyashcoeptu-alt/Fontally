// Language-aware pairing helpers shared by the API and the browser.
//  - detectScript: which writing system a brief uses (Devanagari, Japanese, ...)
//  - scriptSupport: do a profile's heading/body fonts have those glyphs?
//  - suggestBodyFonts: on-demand body pairings for a heading, by explicit rules
import { FONT_METADATA } from './font-metadata.js'
import { BODY_FONT_CANDIDATES, BODY_FONT_TRAITS, TRAIT_SIGNALS } from './body-fonts.js'

export { BODY_FONT_CANDIDATES }

// Unicode script -> Google Fonts subsets that cover it, and a readable label
const SCRIPTS = [
  { id: 'japanese', label: 'Japanese', test: /[\p{Script=Hiragana}\p{Script=Katakana}]/u, subsets: ['japanese'] },
  { id: 'korean', label: 'Korean', test: /\p{Script=Hangul}/u, subsets: ['korean'] },
  // Han without kana: Chinese (or kanji-only Japanese)
  { id: 'chinese', label: 'Chinese', test: /\p{Script=Han}/u, subsets: ['chinese-simplified', 'chinese-traditional', 'chinese-hongkong', 'japanese'] },
  { id: 'devanagari', label: 'Devanagari', test: /\p{Script=Devanagari}/u, subsets: ['devanagari'] },
  { id: 'bengali', label: 'Bengali', test: /\p{Script=Bengali}/u, subsets: ['bengali'] },
  { id: 'tamil', label: 'Tamil', test: /\p{Script=Tamil}/u, subsets: ['tamil'] },
  { id: 'telugu', label: 'Telugu', test: /\p{Script=Telugu}/u, subsets: ['telugu'] },
  { id: 'gujarati', label: 'Gujarati', test: /\p{Script=Gujarati}/u, subsets: ['gujarati'] },
  { id: 'gurmukhi', label: 'Gurmukhi', test: /\p{Script=Gurmukhi}/u, subsets: ['gurmukhi'] },
  { id: 'kannada', label: 'Kannada', test: /\p{Script=Kannada}/u, subsets: ['kannada'] },
  { id: 'malayalam', label: 'Malayalam', test: /\p{Script=Malayalam}/u, subsets: ['malayalam'] },
  { id: 'arabic', label: 'Arabic', test: /\p{Script=Arabic}/u, subsets: ['arabic'] },
  { id: 'hebrew', label: 'Hebrew', test: /\p{Script=Hebrew}/u, subsets: ['hebrew'] },
  { id: 'thai', label: 'Thai', test: /\p{Script=Thai}/u, subsets: ['thai'] },
  { id: 'cyrillic', label: 'Cyrillic', test: /\p{Script=Cyrillic}/u, subsets: ['cyrillic'] },
  { id: 'greek', label: 'Greek', test: /\p{Script=Greek}/u, subsets: ['greek'] }
]

const NON_LATIN_BODY = new Set(BODY_FONT_CANDIDATES.filter((f) => /^Noto (Sans|Serif|Naskh) (?!$)|^Mukta$|^Hind$/.test(f) && !['Noto Sans', 'Noto Serif'].includes(f)))

export const primaryFamily = (stack, fallback = '') =>
  String(stack || '').split(',')[0].replace(/['"]/g, '').trim() || fallback

/** Returns { id, label, subsets } for the first non-Latin script found, or null. */
export function detectScript(text) {
  const s = String(text || '')
  // Kana beats Han: "日本の茶道" is Japanese, "茶道" alone is ambiguous
  for (const script of SCRIPTS) {
    if (script.test.test(s)) return { id: script.id, label: script.label, subsets: script.subsets }
  }
  return null
}

export function fontMeta(family) {
  return FONT_METADATA[family] || null
}

export function fontSupportsScript(family, script) {
  if (!script) return true
  const meta = fontMeta(family)
  if (!meta) return false
  return script.subsets.some((subset) => meta.subsets.includes(subset))
}

/** { heading: bool, body: bool } for a profile and a detected script. */
export function scriptSupport(profile, script) {
  return {
    heading: fontSupportsScript(primaryFamily(profile.headingFallback, profile.name), script),
    body: fontSupportsScript(primaryFamily(profile.bodyFallback, profile.pair), script)
  }
}

const GENERIC = { serif: 'serif', 'sans-serif': 'sans-serif', monospace: 'monospace', display: 'sans-serif', handwriting: 'cursive' }

export function cssStack(family) {
  const category = fontMeta(family)?.category || 'sans-serif'
  return `'${family}', ${GENERIC[category] || 'sans-serif'}`
}

/** Google Fonts CSS2 URL requesting only weights the family actually has. */
export function googleFontsCssUrl(family, wanted = [400, 600, 700]) {
  const meta = fontMeta(family)
  const name = encodeURIComponent(family).replace(/%20/g, '+')
  const wght = meta?.axes?.find((a) => a.tag === 'wght')
  const weights = wght
    ? wanted.filter((w) => w >= wght.min && w <= wght.max)
    : wanted.filter((w) => meta?.weights?.includes(w))
  const spec = weights.length ? `:wght@${weights.join(';')}` : ''
  return `https://fonts.googleapis.com/css2?family=${name}${spec}&display=swap`
}

const TECH_WORDS = /tech|code|developer|terminal|data|crypto|cyber|saas|api|hacker/

/**
 * Suggest body fonts for a profile's heading, by explicit typographic rules:
 *  1. Readable at 16px: only curated text faces (BODY_FONT_CANDIDATES) with a
 *     regular and a bold weight.
 *  2. Contrast: a serif heading gets a sans body and vice versa; display and
 *     script headings get a quiet sans; monospace bodies only for technical briefs.
 *  3. Language: must have glyphs for the brief's script, if it isn't Latin.
 *  4. Mood: prefer text faces whose personality matches the brief (warm, technical...).
 *  5. Familiarity: a small bonus for popular faces; the three picks span styles.
 * Returns [{ family, category, reason }].
 */
function traitsFor(text) {
  const words = new Set(String(text || '').toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean))
  const traits = new Set()
  for (const [trait, signals] of Object.entries(TRAIT_SIGNALS)) {
    if (signals.some((w) => words.has(w))) traits.add(trait)
  }
  return traits
}

export function suggestBodyFonts(profile, { script = null, limit = 3, brief = '' } = {}) {
  const wanted = traitsFor(`${brief} ${profile.id.replace(/_/g, ' ')} ${(profile.words || []).join(' ')} ${profile.meta || ''}`)
  const heading = primaryFamily(profile.headingFallback, profile.name)
  const currentBody = primaryFamily(profile.bodyFallback, profile.pair)
  const headingCategory = fontMeta(heading)?.category || 'sans-serif'
  const technical = headingCategory === 'monospace' || TECH_WORDS.test(`${profile.id} ${(profile.words || []).join(' ')}`)

  const scored = []
  for (const family of BODY_FONT_CANDIDATES) {
    if (family === heading || family === currentBody) continue
    const meta = fontMeta(family)
    if (!meta) continue
    const hasWeights = meta.axes.some((a) => a.tag === 'wght' && a.min <= 400 && a.max >= 700) ||
      (meta.weights.includes(400) && meta.weights.includes(700))
    if (!hasWeights) continue
    if (script) {
      if (!fontSupportsScript(family, script)) continue
    } else if (NON_LATIN_BODY.has(family)) {
      continue
    }
    if (meta.category === 'monospace' && !technical) continue
    if (!['sans-serif', 'serif', 'monospace'].includes(meta.category)) continue

    let score = 0
    let why
    if (headingCategory === 'serif') {
      score += meta.category === 'sans-serif' ? 3 : 0
      why = meta.category === 'sans-serif' ? 'Sans body contrasts the serif heading' : 'Serif-on-serif, tonal match'
    } else if (headingCategory === 'monospace') {
      score += meta.category === 'sans-serif' ? 3 : meta.category === 'monospace' ? 1 : 0
      why = meta.category === 'monospace' ? 'All-mono, terminal feel' : 'Clean sans keeps mono headings legible'
    } else if (headingCategory === 'display' || headingCategory === 'handwriting') {
      score += meta.category === 'sans-serif' ? 3 : meta.category === 'serif' ? 1 : 0
      why = 'Quiet text face lets the expressive heading lead'
    } else {
      score += meta.category === 'serif' ? 2.5 : meta.category === 'sans-serif' ? 1 : 0.5
      why = meta.category === 'serif' ? 'Serif body adds warmth under a sans heading' : 'Neutral sans, easy long-form reading'
    }
    const matched = (BODY_FONT_TRAITS[family] || []).filter((t) => wanted.has(t))
    score += 1.5 * Math.min(matched.length, 2)
    // Popularity rank 1..~2000 -> 0..1 bonus; familiar faces read faster
    if (meta.popularity) score += 1 - Math.min(meta.popularity, 1000) / 1000
    if (technical && meta.category === 'monospace') score += 0.5

    const parts = [why]
    if (matched.length) parts.push(`${matched.slice(0, 2).join(', ')} feel`)
    if (script) parts.push(`has ${script.label} glyphs`)
    scored.push({ family, category: meta.category, reason: parts.join(' · '), score })
  }

  // Greedy pick with a penalty for repeating a category, so the options differ
  scored.sort((a, b) => b.score - a.score || a.family.localeCompare(b.family))
  const picked = []
  const pool = [...scored]
  while (picked.length < limit && pool.length) {
    let bestIndex = 0
    let bestScore = -Infinity
    pool.forEach((c, i) => {
      const repeats = picked.filter((p) => p.category === c.category).length
      const adjusted = c.score - 1.2 * repeats
      if (adjusted > bestScore) { bestScore = adjusted; bestIndex = i }
    })
    picked.push(pool.splice(bestIndex, 1)[0])
  }
  return picked.map(({ family, category, reason }) => ({ family, category, reason }))
}
