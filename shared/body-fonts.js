// Proven text faces that stay readable at 16px, used for on-demand body pairing.
// Chosen for long-form readability (open apertures, moderate contrast, full
// weight range), plus Noto/Indic/CJK families so non-Latin briefs get a body
// font that actually has their glyphs. Metadata comes from shared/font-metadata.js.
export const BODY_FONT_CANDIDATES = [
  // Sans
  'Inter', 'Source Sans 3', 'DM Sans', 'Work Sans', 'IBM Plex Sans', 'Lato', 'Open Sans',
  'Nunito Sans', 'Figtree', 'Manrope', 'Plus Jakarta Sans', 'Public Sans', 'Karla',
  'Rubik', 'Noto Sans', 'Atkinson Hyperlegible', 'Albert Sans', 'Instrument Sans',
  // Serif
  'Lora', 'Merriweather', 'Source Serif 4', 'Newsreader', 'Literata', 'Crimson Pro',
  'EB Garamond', 'Libre Baskerville', 'Spectral', 'PT Serif', 'Vollkorn', 'Noto Serif',
  // Mono (only offered for technical headings)
  'IBM Plex Mono', 'JetBrains Mono', 'DM Mono',
  // Non-Latin coverage
  'Noto Sans JP', 'Noto Serif JP', 'Noto Sans KR', 'Noto Serif KR', 'Noto Sans SC',
  'Noto Sans TC', 'Noto Sans Devanagari', 'Mukta', 'Hind', 'Noto Sans Arabic',
  'Noto Naskh Arabic', 'Noto Sans Hebrew', 'Noto Sans Thai', 'Noto Sans Bengali', 'Noto Sans Tamil'
]

// Personality of each Latin body face, matched against the brief's mood so a
// bakery gets a warm text face and a dashboard gets a neutral, technical one.
export const BODY_FONT_TRAITS = {
  'Inter': ['neutral', 'tech', 'ui', 'modern'],
  'Source Sans 3': ['neutral', 'corporate', 'accessible'],
  'DM Sans': ['modern', 'friendly', 'geometric'],
  'Work Sans': ['modern', 'editorial', 'neutral'],
  'IBM Plex Sans': ['tech', 'corporate', 'neutral'],
  'Lato': ['friendly', 'warm', 'corporate'],
  'Open Sans': ['neutral', 'accessible', 'friendly'],
  'Nunito Sans': ['friendly', 'rounded', 'playful'],
  'Figtree': ['friendly', 'modern', 'geometric'],
  'Manrope': ['modern', 'tech', 'geometric'],
  'Plus Jakarta Sans': ['modern', 'luxury', 'geometric'],
  'Public Sans': ['neutral', 'accessible', 'corporate'],
  'Karla': ['quirky', 'friendly', 'retro'],
  'Rubik': ['rounded', 'playful', 'bold'],
  'Noto Sans': ['neutral', 'accessible'],
  'Atkinson Hyperlegible': ['accessible', 'neutral'],
  'Albert Sans': ['modern', 'neutral', 'geometric'],
  'Instrument Sans': ['modern', 'editorial', 'tech'],
  'Lora': ['warm', 'literary', 'editorial'],
  'Merriweather': ['classic', 'editorial', 'accessible'],
  'Source Serif 4': ['editorial', 'classic', 'academic'],
  'Newsreader': ['editorial', 'literary', 'warm'],
  'Literata': ['literary', 'warm', 'accessible'],
  'Crimson Pro': ['literary', 'classic', 'elegant'],
  'EB Garamond': ['classic', 'elegant', 'academic', 'luxury'],
  'Libre Baskerville': ['classic', 'corporate', 'academic'],
  'Spectral': ['elegant', 'editorial', 'luxury'],
  'PT Serif': ['classic', 'neutral'],
  'Vollkorn': ['warm', 'literary', 'classic'],
  'Noto Serif': ['classic', 'neutral'],
  'IBM Plex Mono': ['tech', 'retro'],
  'JetBrains Mono': ['tech'],
  'DM Mono': ['tech', 'retro', 'modern']
}

// Brief/profile words that signal each trait
export const TRAIT_SIGNALS = {
  tech: ['tech', 'saas', 'developer', 'code', 'ai', 'data', 'crypto', 'cyber', 'dashboard', 'api', 'startup', 'fintech', 'analytics', 'web3', 'terminal', 'app'],
  warm: ['warm', 'cozy', 'bakery', 'coffee', 'cafe', 'food', 'organic', 'craft', 'artisan', 'farm', 'tea', 'home', 'bread', 'kitchen'],
  editorial: ['editorial', 'news', 'magazine', 'journalism', 'publishing', 'article', 'blog', 'zine', 'essay'],
  literary: ['book', 'novel', 'library', 'literature', 'poetry', 'author', 'reading', 'story'],
  luxury: ['luxury', 'fashion', 'perfume', 'jewelry', 'hotel', 'couture', 'premium', 'boutique', 'beauty', 'watch'],
  elegant: ['elegant', 'wedding', 'romantic', 'chic', 'refined', 'gallery'],
  classic: ['classic', 'heritage', 'law', 'legal', 'classical', 'history', 'tradition', 'vintage'],
  academic: ['academic', 'scholar', 'research', 'science', 'university', 'lab', 'paper'],
  accessible: ['accessible', 'education', 'learning', 'school', 'dyslexia', 'health', 'medical', 'clinic', 'government', 'nonprofit'],
  friendly: ['friendly', 'community', 'pet', 'family', 'kids', 'care', 'social'],
  playful: ['playful', 'fun', 'kids', 'toy', 'cute', 'y2k', 'bubble', 'game', 'candy'],
  rounded: ['rounded', 'soft', 'kids', 'bubble', 'cute'],
  corporate: ['corporate', 'finance', 'bank', 'consulting', 'enterprise', 'insurance', 'b2b'],
  modern: ['modern', 'minimal', 'clean', 'startup', 'product', 'scandinavian', 'nordic'],
  geometric: ['geometric', 'bauhaus', 'architecture', 'swiss'],
  retro: ['retro', 'vintage', '70s', '80s', '90s', 'analog', 'cassette'],
  quirky: ['quirky', 'indie', 'diy', 'weird', 'wonky'],
  bold: ['bold', 'loud', 'sport', 'gym', 'streetwear'],
  neutral: []
}
