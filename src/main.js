import './style.css'

const $ = (selector) => document.querySelector(selector)

// UI Element Handles
const brief = $('#brief')
const displayName = $('#displayName')
const displaySample = $('#displaySample')
const displayMeta = $('#displayMeta')
const pairName = $('#pairName')
const pairMeta = $('#pairMeta')
const rationale = $('#rationale')
const archetype = $('#archetype')
const confidence = $('#confidence')
const analyse = $('#analyse')
const profileIndex = $('#profileIndex')
const toast = $('#toast')

// Specimen Control Handles
const specimenTextInput = $('#specimenTextInput')
const fontSizeSlider = $('#fontSizeSlider')
const fontSizeVal = $('#fontSizeVal')
const toggleCase = $('#toggleCase')
const toggleItalic = $('#toggleItalic')

// Export Handles
const copyCssBtn = $('#copyCssBtn')
const copyTailwindBtn = $('#copyTailwindBtn')
const copyGoogleFontsBtn = $('#copyGoogleFontsBtn')

// DNA Bar Handles
const barEditorial = $('#barEditorial')
const barDisruptive = $('#barDisruptive')
const barWarmth = $('#barWarmth')
const barUtility = $('#barUtility')
const valEditorial = $('#valEditorial')
const valDisruptive = $('#valDisruptive')
const valWarmth = $('#valWarmth')
const valUtility = $('#valUtility')

// Curated Google Fonts Profiles Database (50 Distinct Vibe Archetypes)
const profiles = [
  {
    id: 'fintech',
    words: ['fintech', 'wealth', 'bank', 'finance', 'money', 'invest', 'crypto', 'asset', 'fund', 'trading', 'payment', 'capital'],
    name: 'PP Neue Montreal',
    sample: 'PP Neue<br/><i>Montreal</i>',
    meta: 'GROTESK / VARIABLE',
    pair: 'ABC Arizona Flare',
    pairMeta: 'SERIF / 20PX',
    rationale: 'A calm, precision-first grotesk that feels incredibly fluent on a balance sheet, then lets the serif bring just enough human risk.',
    archetype: 'THE OPTIMISTIC OPERATOR',
    dna: { editorial: 64, disruptive: 48, warmth: 55, utility: 92 },
    headingFontFamily: "'Plus Jakarta Sans', sans-serif",
    pairFontFamily: "'Playfair Display', serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'PP Neue Montreal', 'Plus Jakarta Sans', sans-serif;\n  --font-body: 'ABC Arizona Flare', 'Playfair Display', serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"PP Neue Montreal"', '"Plus Jakarta Sans"', 'sans-serif'],\n  body: ['"ABC Arizona Flare"', '"Playfair Display"', 'serif']\n}`
  },
  {
    id: 'architect',
    words: ['architect', 'brutal', 'portfolio', 'building', 'structure', 'monolith', 'concrete', 'studio', 'design', 'space', 'minimal'],
    name: 'Helvetica Now Display',
    sample: 'Helvetica<br/><i>Now</i>',
    meta: 'GROTESK / DISPLAY',
    pair: 'Times New Roman',
    pairMeta: 'SERIF / 16PX',
    rationale: 'An overfamiliar classic used without apology. The tension with Times makes the whole system feel like it was found on a construction hoarding.',
    archetype: 'THE BEAUTIFUL MENACE',
    dna: { editorial: 82, disruptive: 91, warmth: 32, utility: 78 },
    headingFontFamily: "'Inter', sans-serif",
    pairFontFamily: "'Newsreader', serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Helvetica Now Display', 'Inter', sans-serif;\n  --font-body: 'Times New Roman', 'Newsreader', serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Helvetica Now Display"', '"Inter"', 'sans-serif'],\n  body: ['"Times New Roman"', '"Newsreader"', 'serif']\n}`
  },
  {
    id: 'coffee',
    words: ['coffee', 'quiet', 'ceramic', 'restaurant', 'food', 'bakery', 'cafe', 'roastery', 'artisan', 'warm', 'cozy', 'tea', 'bread'],
    name: 'Reckless Neue',
    sample: 'Reckless<br/><i>Neue</i>',
    meta: 'SERIF / VARIABLE',
    pair: 'Söhne',
    pairMeta: 'GROTESK / 15PX',
    rationale: 'Soft and slightly eccentric, with just enough old-world materiality to make a twelve-dollar filter coffee feel spiritually necessary.',
    archetype: 'THE TENDER MAXIMALIST',
    dna: { editorial: 88, disruptive: 42, warmth: 94, utility: 60 },
    headingFontFamily: "'Newsreader', serif",
    pairFontFamily: "'DM Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,400&family=DM+Sans:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,400&family=DM+Sans:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Reckless Neue', 'Newsreader', serif;\n  --font-body: 'Söhne', 'DM Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Reckless Neue"', '"Newsreader"', 'serif'],\n  body: ['"Söhne"', '"DM Sans"', 'sans-serif']\n}`
  },
  {
    id: 'fashion',
    words: ['fashion', 'skin', 'beauty', 'art', 'brand', 'editorial', 'vogue', 'model', 'runway', 'sensory', 'style', 'dress', 'apparel'],
    name: 'Spezia Variable',
    sample: 'Spezia<br/><i>Variable</i>',
    meta: 'SERIF / VARIABLE',
    pair: 'Neue Montreal',
    pairMeta: 'GROTESK / 18PX',
    rationale: 'It has the kind of expensive weirdness that makes a product page feel like an editorial you want to keep reading.',
    archetype: 'THE SENSORY EDITOR',
    dna: { editorial: 95, disruptive: 74, warmth: 61, utility: 42 },
    headingFontFamily: "'Bodoni Moda', serif",
    pairFontFamily: "'Plus Jakarta Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;1,6..96,400&family=Plus+Jakarta+Sans:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;1,6..96,400&family=Plus+Jakarta+Sans:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Spezia Variable', 'Bodoni Moda', serif;\n  --font-body: 'Neue Montreal', 'Plus Jakarta Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Spezia Variable"', '"Bodoni Moda"', 'serif'],\n  body: ['"Neue Montreal"', '"Plus Jakarta Sans"', 'sans-serif']\n}`
  },
  {
    id: 'tech',
    words: ['tech', 'saas', 'ai', 'developer', 'code', 'api', 'platform', 'cloud', 'data', 'speed', 'cli', 'software', 'backend', 'system'],
    name: 'Geist Mono',
    sample: 'Geist<br/><i>Mono</i>',
    meta: 'MONOSPACE',
    pair: 'Inter Display',
    pairMeta: 'SANS / 14PX',
    rationale: 'Hyper-focused engineering precision. The razor-sharp monospaced letterforms project raw execution velocity and zero fluff.',
    archetype: 'THE SYSTEM ARCHITECT',
    dna: { editorial: 35, disruptive: 80, warmth: 28, utility: 99 },
    headingFontFamily: "'Geist Mono', 'DM Mono', monospace",
    pairFontFamily: "'Inter', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&family=Inter:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&family=Inter:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Geist Mono', monospace;\n  --font-body: 'Inter Display', 'Inter', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Geist Mono"', 'monospace'],\n  body: ['"Inter Display"', '"Inter"', 'sans-serif']\n}`
  },
  {
    id: 'cyberpunk',
    words: ['cyberpunk', 'gaming', 'rpg', 'neo', 'dystopian', 'retro', 'arcade', 'synth', 'glitch', 'future', 'pixel', 'vr', 'sci-fi', 'cyber'],
    name: 'PP Neue Bit',
    sample: 'PP Neue<br/><i>Bit</i>',
    meta: 'PIXEL / DISPLAY',
    pair: 'Syne',
    pairMeta: 'GEOMETRIC / 16PX',
    rationale: 'Raw pixelated nostalgia colliding with extreme geometric wide typography. Reads like neon rain bouncing off chrome armor.',
    archetype: 'THE SYNTH CONSTRUCTOR',
    dna: { editorial: 40, disruptive: 98, warmth: 50, utility: 65 },
    headingFontFamily: "'Silkscreen', monospace",
    pairFontFamily: "'Syne', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Syne:wght@700;800&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Syne:wght@700;800&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'PP Neue Bit', 'Silkscreen', monospace;\n  --font-body: 'Syne', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"PP Neue Bit"', '"Silkscreen"', 'monospace'],\n  body: ['"Syne"', 'sans-serif']\n}`
  },
  {
    id: 'luxury',
    words: ['luxury', 'skincare', 'perfume', 'jewelry', 'parfum', 'chic', 'elegance', 'haute', 'boutique', 'premium', 'high-end', 'gold'],
    name: 'Cormorant Garamond',
    sample: 'Cormorant<br/><i>Garamond</i>',
    meta: 'SERIF / ELEGANT',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'SANS / 14PX',
    rationale: 'Uncompromising grace and high contrast serifs that emanate quiet opulence without needing to raise its voice.',
    archetype: 'THE HIGH COUTURIER',
    dna: { editorial: 96, disruptive: 35, warmth: 82, utility: 54 },
    headingFontFamily: "'Cormorant Garamond', serif",
    pairFontFamily: "'Plus Jakarta Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Cormorant Garamond', serif;\n  --font-body: 'Plus Jakarta Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Cormorant Garamond"', 'serif'],\n  body: ['"Plus Jakarta Sans"', 'sans-serif']\n}`
  },
  {
    id: 'streetwear',
    words: ['streetwear', 'sneakers', 'hype', 'hiphop', 'music', 'skate', 'youth', 'bold', 'drop', 'urban', 'clothing', 'oversized'],
    name: 'Clash Display',
    sample: 'Clash<br/><i>Display</i>',
    meta: 'NEO-GROTESK',
    pair: 'Space Grotesk',
    pairMeta: 'MONOSPACE SANS / 16PX',
    rationale: 'Heavy, unexpected counters and defiant letterform proportions engineered for high-visibility poster drops and billboards.',
    archetype: 'THE CULTURAL MENACE',
    dna: { editorial: 50, disruptive: 95, warmth: 40, utility: 72 },
    headingFontFamily: "'Unbounded', sans-serif",
    pairFontFamily: "'Space Grotesk', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Space+Grotesk:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Space+Grotesk:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Clash Display', 'Unbounded', sans-serif;\n  --font-body: 'Space Grotesk', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Clash Display"', '"Unbounded"', 'sans-serif'],\n  body: ['"Space Grotesk"', 'sans-serif']\n}`
  },
  {
    id: 'wellness',
    words: ['wellness', 'yoga', 'mind', 'organic', 'clean', 'spa', 'natural', 'herbal', 'calm', 'holistic', 'meditation', 'balance', 'zen'],
    name: 'Tenor Sans',
    sample: 'Tenor<br/><i>Sans</i>',
    meta: 'HUMANIST / SANS',
    pair: 'Outfit',
    pairMeta: 'GEOMETRIC / 15PX',
    rationale: 'Subtle flared stems and spacious tracking instill immediate breathing room and organic equilibrium into the layout.',
    archetype: 'THE HARMONIC SANCTUARY',
    dna: { editorial: 70, disruptive: 25, warmth: 98, utility: 84 },
    headingFontFamily: "'Tenor Sans', sans-serif",
    pairFontFamily: "'Outfit', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Outfit:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Outfit:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Tenor Sans', sans-serif;\n  --font-body: 'Outfit', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Tenor Sans"', 'sans-serif'],\n  body: ['"Outfit"', 'sans-serif']\n}`
  },
  {
    id: 'retro',
    words: ['retro', '90s', '80s', 'vintage', 'zines', 'cassette', 'analog', 'nostalgia', 'indie', 'vinyl', 'album', 'poster', 'print'],
    name: 'Instrument Serif',
    sample: 'Instrument<br/><i>Serif</i>',
    meta: 'SERIF / ITALIC',
    pair: 'DM Mono',
    pairMeta: 'MONO / 14PX',
    rationale: 'Delicate high-contrast italic strokes paired with strict mechanical monospaced grid structure. Feels like a 1994 indie zine.',
    archetype: 'THE ANALOG CURATOR',
    dna: { editorial: 92, disruptive: 76, warmth: 80, utility: 65 },
    headingFontFamily: "'Instrument Serif', serif",
    pairFontFamily: "'DM Mono', monospace",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Instrument Serif', serif;\n  --font-body: 'DM Mono', monospace;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Instrument Serif"', 'serif'],\n  body: ['"DM Mono"', 'monospace']\n}`
  },
  {
    id: 'editorial_news',
    words: ['news', 'journalism', 'magazine', 'article', 'editorial', 'newspaper', 'publishing', 'author', 'essay', 'literature'],
    name: 'Lora Editorial',
    sample: 'Lora<br/><i>Editorial</i>',
    meta: 'SERIF / PUBLISHING',
    pair: 'Work Sans',
    pairMeta: 'SANS / 15PX',
    rationale: 'Calligraphic curves built for long-form readability, paired with a sturdy, neutral grotesk for dense data callouts.',
    archetype: 'THE CRITICAL CHRONICLER',
    dna: { editorial: 94, disruptive: 30, warmth: 70, utility: 88 },
    headingFontFamily: "'Lora', serif",
    pairFontFamily: "'Work Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400&family=Work+Sans:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400&family=Work+Sans:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Lora', serif;\n  --font-body: 'Work Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Lora"', 'serif'],\n  body: ['"Work Sans"', 'sans-serif']\n}`
  },
  {
    id: 'modern_startup',
    words: ['startup', 'modern', 'app', 'product', 'landing', 'hero', 'clean', 'simple', 'saas', 'workflow', 'team', 'company'],
    name: 'Montserrat Display',
    sample: 'Montserrat<br/><i>Display</i>',
    meta: 'GEOMETRIC SANS',
    pair: 'Open Sans',
    pairMeta: 'HUMANIST / 14PX',
    rationale: 'Bold geometric weight that commands immediate attention on hero headers, paired with Open Sans for crisp UI utility.',
    archetype: 'THE VENTURE LAUNCHER',
    dna: { editorial: 45, disruptive: 60, warmth: 50, utility: 95 },
    headingFontFamily: "'Montserrat', sans-serif",
    pairFontFamily: "'Open Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Montserrat', sans-serif;\n  --font-body: 'Open Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Montserrat"', 'sans-serif'],\n  body: ['"Open Sans"', 'sans-serif']\n}`
  },
  {
    id: 'futuristic_ai',
    words: ['futuristic', 'future', 'robot', 'ai', 'neural', 'quantum', 'space', 'galaxy', 'orbit', 'cyber', 'laser', 'alien', 'tech'],
    name: 'Orbitron Quantum',
    sample: 'Orbitron<br/><i>Quantum</i>',
    meta: 'DISPLAY / GEOMETRIC MONO',
    pair: 'Rajdhani',
    pairMeta: 'CONDENSED SANS / 16PX',
    rationale: 'Angular, square proportions engineered for telemetry displays and next-generation human-machine interfaces.',
    archetype: 'THE SYNTHETIC MATRIX',
    dna: { editorial: 20, disruptive: 96, warmth: 15, utility: 80 },
    headingFontFamily: "'Orbitron', sans-serif",
    pairFontFamily: "'Rajdhani', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;700&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;700&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Orbitron', sans-serif;\n  --font-body: 'Rajdhani', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Orbitron"', 'sans-serif'],\n  body: ['"Rajdhani"', 'sans-serif']\n}`
  },
  {
    id: 'organic_farm',
    words: ['farm', 'garden', 'earth', 'plant', 'nature', 'green', 'eco', 'sustainable', 'harvest', 'soil', 'fresh', 'raw', 'craft'],
    name: 'Fraunces Earth',
    sample: 'Fraunces<br/><i>Earth</i>',
    meta: 'WONKY SERIF',
    pair: 'DM Sans',
    pairMeta: 'NEUTRAL SANS / 15PX',
    rationale: 'Expressive variable optical sizes with soft organic curves that celebrate natural imperfections and handcrafted warmth.',
    archetype: 'THE EARTHEN BOTANIST',
    dna: { editorial: 85, disruptive: 55, warmth: 99, utility: 70 },
    headingFontFamily: "'Fraunces', serif",
    pairFontFamily: "'DM Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,400&family=DM+Sans:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,400&family=DM+Sans:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Fraunces', serif;\n  --font-body: 'DM Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Fraunces"', 'serif'],\n  body: ['"DM Sans"', 'sans-serif']\n}`
  },
  {
    id: 'bold_ecommerce',
    words: ['shop', 'store', 'cart', 'sale', 'deal', 'discount', 'fashion', 'commerce', 'buy', 'retail', 'product', 'bold'],
    name: 'Oswald Impact',
    sample: 'Oswald<br/><i>Impact</i>',
    meta: 'CONDENSED SANS',
    pair: 'Lato',
    pairMeta: 'HUMANIST SANS / 14PX',
    rationale: 'Tight vertical condensation built for punchy promo banners, sale callouts, and high-conversion e-commerce hero text.',
    archetype: 'THE HIGH-CONVERSION ENGINE',
    dna: { editorial: 30, disruptive: 85, warmth: 40, utility: 96 },
    headingFontFamily: "'Oswald', sans-serif",
    pairFontFamily: "'Lato', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Lato:wght@400;700&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Lato:wght@400;700&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Oswald', sans-serif;\n  --font-body: 'Lato', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Oswald"', 'sans-serif'],\n  body: ['"Lato"', 'sans-serif']\n}`
  },
  {
    id: 'sports_fitness',
    words: ['sport', 'fitness', 'gym', 'workout', 'training', 'power', 'athlete', 'runner', 'muscle', 'speed', 'energy', 'crossfit'],
    name: 'Anton Heavy',
    sample: 'Anton<br/><i>Heavy</i>',
    meta: 'HEAVY DISPLAY SANS',
    pair: 'Montserrat',
    pairMeta: 'GEOMETRIC SANS / 16PX',
    rationale: 'Massive, unyielding letterform density designed to communicate raw muscular power and unrelenting momentum.',
    archetype: 'THE KINETIC ATHLETE',
    dna: { editorial: 15, disruptive: 92, warmth: 35, utility: 90 },
    headingFontFamily: "'Anton', sans-serif",
    pairFontFamily: "'Montserrat', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;700&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;700&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Anton', sans-serif;\n  --font-body: 'Montserrat', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Anton"', 'sans-serif'],\n  body: ['"Montserrat"', 'sans-serif']\n}`
  },
  {
    id: 'playful_kids',
    words: ['kids', 'child', 'toy', 'play', 'fun', 'game', 'cartoon', 'smile', 'happy', 'magic', 'baby', 'sweet', 'cute'],
    name: 'Fredoka Rounded',
    sample: 'Fredoka<br/><i>Rounded</i>',
    meta: 'ROUNDED DISPLAY SANS',
    pair: 'Quicksand',
    pairMeta: 'ROUNDED SANS / 15PX',
    rationale: 'Super-soft rounded corners and friendly letterforms that radiate joy, playfulness, and immediate approachability.',
    archetype: 'THE JOYFUL EXPLORER',
    dna: { editorial: 25, disruptive: 65, warmth: 100, utility: 80 },
    headingFontFamily: "'Fredoka', sans-serif",
    pairFontFamily: "'Quicksand', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Quicksand:wght@500;700&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Quicksand:wght@500;700&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Fredoka', sans-serif;\n  --font-body: 'Quicksand', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Fredoka"', 'sans-serif'],\n  body: ['"Quicksand"', 'sans-serif']\n}`
  },
  {
    id: 'medical_health',
    words: ['health', 'medical', 'doctor', 'clinic', 'hospital', 'care', 'pharma', 'medicine', 'dental', 'wellness', 'life', 'science'],
    name: 'Public Sans Clean',
    sample: 'Public<br/><i>Sans</i>',
    meta: 'GOVERNMENT / HUMANIST SANS',
    pair: 'Inter',
    pairMeta: 'NEUTRAL SANS / 14PX',
    rationale: 'Open aperture letterforms and clinical legibility designed to instill trust, safety, and calm authority.',
    archetype: 'THE TRUSTED CLINICIAN',
    dna: { editorial: 40, disruptive: 15, warmth: 75, utility: 98 },
    headingFontFamily: "'Public Sans', sans-serif",
    pairFontFamily: "'Inter', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@600;700&family=Inter:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Public+Sans:wght@600;700&family=Inter:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Public Sans', sans-serif;\n  --font-body: 'Inter', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Public Sans"', 'sans-serif'],\n  body: ['"Inter"', 'sans-serif']\n}`
  },
  {
    id: 'legal_corporate',
    words: ['law', 'legal', 'attorney', 'court', 'firm', 'consulting', 'corporate', 'advisor', 'trust', 'tax', 'audit', 'compliance'],
    name: 'Libre Baskerville',
    sample: 'Libre<br/><i>Baskerville</i>',
    meta: 'TRANSITIONAL SERIF',
    pair: 'Source Sans 3',
    pairMeta: 'CORPORATE SANS / 15PX',
    rationale: 'Traditional legal weight and historical gravitas paired with Source Sans 3 for impeccable contractual clarity.',
    archetype: 'THE CONSTANT COUNSEL',
    dna: { editorial: 90, disruptive: 20, warmth: 60, utility: 92 },
    headingFontFamily: "'Libre Baskerville', serif",
    pairFontFamily: "'Source Sans 3', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700;1,400&family=Source+Sans+3:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700;1,400&family=Source+Sans+3:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Libre Baskerville', serif;\n  --font-body: 'Source Sans 3', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Libre Baskerville"', 'serif'],\n  body: ['"Source Sans 3"', 'sans-serif']\n}`
  },
  {
    id: 'saas_analytics',
    words: ['analytics', 'metrics', 'dashboard', 'charts', 'data', 'bi', 'saas', 'reports', 'log', 'terminal', 'monitoring', 'infra'],
    name: 'JetBrains Mono Analytics',
    sample: 'JetBrains<br/><i>Mono</i>',
    meta: 'CODE & METRICS MONO',
    pair: 'Inter',
    pairMeta: 'SYSTEM SANS / 14PX',
    rationale: 'Increased letter height and distinct ligature design optimized for data tables, metrics dashboards, and live code feeds.',
    archetype: 'THE TELEMETRY ENGINE',
    dna: { editorial: 30, disruptive: 70, warmth: 30, utility: 100 },
    headingFontFamily: "'JetBrains Mono', monospace",
    pairFontFamily: "'Inter', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Inter:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Inter:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'JetBrains Mono', monospace;\n  --font-body: 'Inter', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"JetBrains Mono"', 'monospace'],\n  body: ['"Inter"', 'sans-serif']\n}`
  },
  {
    id: 'indie_music',
    words: ['music', 'band', 'rock', 'indie', 'punk', 'gig', 'concert', 'vinyl', 'album', 'fest', 'artist', 'song', 'stage'],
    name: 'Permanent Marker',
    sample: 'Permanent<br/><i>Marker</i>',
    meta: 'HANDWRITTEN BRUSH',
    pair: 'Fira Code',
    pairMeta: 'MONOSPACE / 14PX',
    rationale: 'Raw felt-tip marker strokes colliding with technical monospaced tracklists. Captures the DIY ethos of garage band tour posters.',
    archetype: 'THE UNDERGROUND SOUND',
    dna: { editorial: 75, disruptive: 98, warmth: 85, utility: 45 },
    headingFontFamily: "'Permanent Marker', cursive",
    pairFontFamily: "'Fira Code', monospace",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Fira+Code:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Fira+Code:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Permanent Marker', cursive;\n  --font-body: 'Fira Code', monospace;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Permanent Marker"', 'cursive'],\n  body: ['"Fira Code"', 'monospace']\n}`
  },
  {
    id: 'gourmet_dining',
    words: ['dining', 'gourmet', 'bistro', 'wine', 'chef', 'menu', 'steak', 'michelin', 'culinary', 'taste', 'restaurant', 'luxury food'],
    name: 'Cinzel Fine Dining',
    sample: 'Cinzel<br/><i>Gourmet</i>',
    meta: 'CLASSICAL MONUMENTAL SERIF',
    pair: 'Lato',
    pairMeta: 'CLEAN SANS / 14PX',
    rationale: 'Inspired by classical Roman inscriptions, casting an aura of timeless culinary mastery over fine dining menus.',
    archetype: 'THE MICHELIN MAESTRO',
    dna: { editorial: 95, disruptive: 40, warmth: 75, utility: 60 },
    headingFontFamily: "'Cinzel', serif",
    pairFontFamily: "'Lato', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Lato:wght@400;700&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Lato:wght@400;700&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Cinzel', serif;\n  --font-body: 'Lato', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Cinzel"', 'serif'],\n  body: ['"Lato"', 'sans-serif']\n}`
  },
  {
    id: 'cinema_film',
    words: ['film', 'movie', 'cinema', 'director', 'screen', 'actor', 'theater', 'drama', 'hollywood', 'festival', 'trailer', 'production'],
    name: 'Abril Fatface',
    sample: 'Abril<br/><i>Fatface</i>',
    meta: 'DIDONE DISPLAY SERIF',
    pair: 'Raleway',
    pairMeta: 'ELEGANT SANS / 15PX',
    rationale: 'High-contrast 19th century poster serif that turns every movie title into a dramatic cinematic event.',
    archetype: 'THE DRAMATIC AUTEUR',
    dna: { editorial: 98, disruptive: 80, warmth: 60, utility: 50 },
    headingFontFamily: "'Abril Fatface', serif",
    pairFontFamily: "'Raleway', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Raleway:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Raleway:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Abril Fatface', serif;\n  --font-body: 'Raleway', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Abril Fatface"', 'serif'],\n  body: ['"Raleway"', 'sans-serif']\n}`
  },
  {
    id: 'nature_outdoor',
    words: ['outdoor', 'hike', 'camp', 'adventure', 'mountain', 'trail', 'forest', 'travel', 'nature', 'explore', 'gear', 'expedition'],
    name: 'Cabin Expedition',
    sample: 'Cabin<br/><i>Expedition</i>',
    meta: 'HUMANIST SANS',
    pair: 'Merriweather',
    pairMeta: 'STURDY SERIF / 15PX',
    rationale: 'Inspired by traditional typewriter proportions with a rugged modern warmth made for field guides and adventure gear.',
    archetype: 'THE WILD VOYAGER',
    dna: { editorial: 60, disruptive: 45, warmth: 92, utility: 88 },
    headingFontFamily: "'Cabin', sans-serif",
    pairFontFamily: "'Merriweather', serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Cabin:wght@600;700&family=Merriweather:ital,wght@0,400;1,300&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Cabin:wght@600;700&family=Merriweather:ital,wght@0,400;1,300&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Cabin', sans-serif;\n  --font-body: 'Merriweather', serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Cabin"', 'sans-serif'],\n  body: ['"Merriweather"', 'serif']\n}`
  },
  {
    id: 'gaming_esports',
    words: ['esports', 'twitch', 'streamer', 'tournament', 'clan', 'pvp', 'arena', 'gamer', 'playstation', 'xbox', 'nintendo', 'match'],
    name: 'Russo One Esports',
    sample: 'Russo<br/><i>Esports</i>',
    meta: 'BLOCKY DISPLAY SANS',
    pair: 'Exo 2',
    pairMeta: 'FUTURISTIC SANS / 15PX',
    rationale: 'Chunky, low-contrast headline strokes that project raw competitive dominance on esports leaderboards and streams.',
    archetype: 'THE ARENA CHAMPION',
    dna: { editorial: 15, disruptive: 95, warmth: 30, utility: 85 },
    headingFontFamily: "'Russo One', sans-serif",
    pairFontFamily: "'Exo 2', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Russo+One&family=Exo+2:wght@500;700&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Russo+One&family=Exo+2:wght@500;700&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Russo One', sans-serif;\n  --font-body: 'Exo 2', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Russo One"', 'sans-serif'],\n  body: ['"Exo 2"', 'sans-serif']\n}`
  },
  {
    id: 'brutalist_poster',
    words: ['poster', 'exhibition', 'gallery', 'raw', 'brutalist', 'experimental', 'heavy', 'graphic', 'zine', 'stark'],
    name: 'Bricolage Display',
    sample: 'Bricolage<br/><i>Display</i>',
    meta: 'EXPERIMENTAL GROTESK',
    pair: 'Space Grotesk',
    pairMeta: 'MONOSPACE SANS / 16PX',
    rationale: 'Unapologetic historical quirks and flared terminals that transform poster typography into provocative graphic art.',
    archetype: 'THE BRUTALIST EXHIBITOR',
    dna: { editorial: 75, disruptive: 99, warmth: 40, utility: 65 },
    headingFontFamily: "'Bricolage Grotesque', sans-serif",
    pairFontFamily: "'Space Grotesk', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Space+Grotesk:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Space+Grotesk:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Bricolage Grotesque', sans-serif;\n  --font-body: 'Space Grotesk', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Bricolage Grotesque"', 'sans-serif'],\n  body: ['"Space Grotesk"', 'sans-serif']\n}`
  },
  {
    id: 'craft_beer',
    words: ['beer', 'brewery', 'pub', 'ale', 'craft', 'bar', 'bottle', 'tap', 'cider', 'distillery', 'booze'],
    name: 'Rubik Craft',
    sample: 'Rubik<br/><i>Craft</i>',
    meta: 'HEAVY BLOCK DISPLAY',
    pair: 'DM Sans',
    pairMeta: 'NEUTRAL SANS / 15PX',
    rationale: 'Bold industrial block weight reminiscent of woodblock printing press stamps on artisan IPA cans.',
    archetype: 'THE ARTISAN BREWER',
    dna: { editorial: 45, disruptive: 85, warmth: 88, utility: 70 },
    headingFontFamily: "'Rubik Mono One', sans-serif",
    pairFontFamily: "'DM Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=DM+Sans:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=DM+Sans:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Rubik Mono One', sans-serif;\n  --font-body: 'DM Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Rubik Mono One"', 'sans-serif'],\n  body: ['"DM Sans"', 'sans-serif']\n}`
  },
  {
    id: 'vintage_bakery',
    words: ['bakery', 'bread', 'pastry', 'cake', 'cookie', 'sweet', 'baker', 'pie', 'flour', 'dough', 'homemade'],
    name: 'Pacifico Bakery',
    sample: 'Pacifico<br/><i>Bakery</i>',
    meta: 'VINTAGE BRUSH SCRIPT',
    pair: 'Quicksand',
    pairMeta: 'ROUNDED SANS / 15PX',
    rationale: 'Fluid retro script letterforms that invoke the comforting warmth of freshly baked morning pastries.',
    archetype: 'THE HOMETOWN BAKER',
    dna: { editorial: 70, disruptive: 50, warmth: 100, utility: 55 },
    headingFontFamily: "'Pacifico', cursive",
    pairFontFamily: "'Quicksand', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Pacifico', cursive;\n  --font-body: 'Quicksand', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Pacifico"', 'cursive'],\n  body: ['"Quicksand"', 'sans-serif']\n}`
  },
  {
    id: 'crypto_web3',
    words: ['crypto', 'web3', 'blockchain', 'nft', 'token', 'ethereum', 'bitcoin', 'dao', 'solana', 'wallet', 'mint'],
    name: 'Press Start Web3',
    sample: 'Press Start<br/><i>Web3</i>',
    meta: '8-BIT PIXEL DISPLAY',
    pair: 'Space Mono',
    pairMeta: 'MONOSPACE / 14PX',
    rationale: 'Direct 8-bit retro arcade aesthetic colliding with modern smart contract code for decentralized web applications.',
    archetype: 'THE DECENTRALIZED REBEL',
    dna: { editorial: 20, disruptive: 100, warmth: 35, utility: 75 },
    headingFontFamily: "'Press Start 2P', monospace",
    pairFontFamily: "'Space Mono', monospace",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:wght@400;700&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:wght@400;700&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Press Start 2P', monospace;\n  --font-body: 'Space Mono', monospace;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Press Start 2P"', 'monospace'],\n  body: ['"Space Mono"', 'monospace']\n}`
  },
  {
    id: 'modern_realestate',
    words: ['realestate', 'realty', 'property', 'villa', 'home', 'apartment', 'house', 'estate', 'interior', 'broker', 'mortgage'],
    name: 'Manrope Living',
    sample: 'Manrope<br/><i>Living</i>',
    meta: 'MODERN GEOMETRIC SANS',
    pair: 'Open Sans',
    pairMeta: 'HUMANIST SANS / 14PX',
    rationale: 'Clean geometric proportions and open counters tailored for modern architectural listings and luxury home brochures.',
    archetype: 'THE ARCHITECTURAL BROKER',
    dna: { editorial: 55, disruptive: 35, warmth: 75, utility: 95 },
    headingFontFamily: "'Manrope', sans-serif",
    pairFontFamily: "'Open Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Manrope:wght@600;800&family=Open+Sans:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@600;800&family=Open+Sans:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Manrope', sans-serif;\n  --font-body: 'Open Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Manrope"', 'sans-serif'],\n  body: ['"Open Sans"', 'sans-serif']\n}`
  },
  {
    id: 'beauty_cosmetics',
    words: ['beauty', 'cosmetics', 'makeup', 'skin', 'glow', 'serum', 'lotion', 'salon', 'spa', 'fragrance', 'chic'],
    name: 'Marcellus Chic',
    sample: 'Marcellus<br/><i>Chic</i>',
    meta: 'FLARED DISPLAY SERIF',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'CLEAN SANS / 15PX',
    rationale: 'Delicate flared serif terminals inspired by ancient Roman titling, delivering effortless radiance for skincare packaging.',
    archetype: 'THE RADIANT ALCHEMIST',
    dna: { editorial: 92, disruptive: 30, warmth: 85, utility: 65 },
    headingFontFamily: "'Marcellus', serif",
    pairFontFamily: "'Plus Jakarta Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Marcellus&family=Plus+Jakarta+Sans:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Plus+Jakarta+Sans:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Marcellus', serif;\n  --font-body: 'Plus Jakarta Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Marcellus"', 'serif'],\n  body: ['"Plus Jakarta Sans"', 'sans-serif']\n}`
  },
  {
    id: 'automotive_cars',
    words: ['car', 'auto', 'motor', 'vehicle', 'speed', 'racing', 'drive', 'engine', 'supercar', 'torque', 'garage'],
    name: 'Syncopate Velocity',
    sample: 'Syncopate<br/><i>Velocity</i>',
    meta: 'EXTENDED WIDE SANS',
    pair: 'Rajdhani',
    pairMeta: 'TECHNICAL SANS / 16PX',
    rationale: 'Extreme wide tracking and geometric stance engineered for high-performance automotive dashboards and carbon fiber aesthetics.',
    archetype: 'THE HIGH-OCTANE PILOT',
    dna: { editorial: 25, disruptive: 90, warmth: 20, utility: 85 },
    headingFontFamily: "'Syncopate', sans-serif",
    pairFontFamily: "'Rajdhani', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Rajdhani:wght@500;700&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Rajdhani:wght@500;700&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Syncopate', sans-serif;\n  --font-body: 'Rajdhani', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Syncopate"', 'sans-serif'],\n  body: ['"Rajdhani"', 'sans-serif']\n}`
  },
  {
    id: 'podcast_media',
    words: ['podcast', 'show', 'audio', 'radio', 'episode', 'talk', 'stream', 'broadcast', 'host', 'interview', 'media'],
    name: 'Bebas Media',
    sample: 'Bebas<br/><i>Media</i>',
    meta: 'TALL CONDENSED SANS',
    pair: 'Roboto',
    pairMeta: 'SYSTEM SANS / 14PX',
    rationale: 'Tall, punchy vertical capital letters that dominate podcast cover art and thumbnail graphics.',
    archetype: 'THE BROADCAST HOST',
    dna: { editorial: 40, disruptive: 75, warmth: 50, utility: 90 },
    headingFontFamily: "'Bebas Neue', sans-serif",
    pairFontFamily: "'Roboto', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Bebas Neue', sans-serif;\n  --font-body: 'Roboto', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Bebas Neue"', 'sans-serif'],\n  body: ['"Roboto"', 'sans-serif']\n}`
  },
  {
    id: 'nonprofit_cause',
    words: ['nonprofit', 'charity', 'donate', 'hope', 'change', 'foundation', 'ocean', 'peace', 'impact', 'community', 'earth'],
    name: 'Poppins Impact',
    sample: 'Poppins<br/><i>Impact</i>',
    meta: 'GEOMETRIC HUMANIST SANS',
    pair: 'Lora',
    pairMeta: 'WARM SERIF / 15PX',
    rationale: 'Friendly geometric circularity paired with a warm literary serif to convey heartfelt humanitarian purpose.',
    archetype: 'THE HUMANE ADVOCATE',
    dna: { editorial: 70, disruptive: 30, warmth: 95, utility: 85 },
    headingFontFamily: "'Poppins', sans-serif",
    pairFontFamily: "'Lora', serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Lora:ital,wght@0,400;1,400&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Lora:ital,wght@0,400;1,400&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Poppins', sans-serif;\n  --font-body: 'Lora', serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Poppins"', 'sans-serif'],\n  body: ['"Lora"', 'serif']\n}`
  },
  {
    id: 'science_research',
    words: ['science', 'research', 'lab', 'paper', 'physics', 'biology', 'math', 'study', 'academic', 'journal', 'thesis'],
    name: 'Spectral Academic',
    sample: 'Spectral<br/><i>Academic</i>',
    meta: 'EDITORIAL SCREEN SERIF',
    pair: 'Fira Code',
    pairMeta: 'CODE MONO / 14PX',
    rationale: 'Specifically optimized for dense digital research papers and mathematical formulas alongside technical code blocks.',
    archetype: 'THE SCHOLARLY INQUIRER',
    dna: { editorial: 95, disruptive: 25, warmth: 45, utility: 95 },
    headingFontFamily: "'Spectral', serif",
    pairFontFamily: "'Fira Code', monospace",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,600;1,400&family=Fira+Code:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,600;1,400&family=Fira+Code:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Spectral', serif;\n  --font-body: 'Fira Code', monospace;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Spectral"', 'serif'],\n  body: ['"Fira Code"', 'monospace']\n}`
  },
  {
    id: 'cozy_bookstore',
    words: ['book', 'store', 'library', 'read', 'novel', 'author', 'fiction', 'paperback', 'coffee', 'cozy', 'story'],
    name: 'Cormorant Infant',
    sample: 'Cormorant<br/><i>Infant</i>',
    meta: 'DELICATE LITERARY SERIF',
    pair: 'DM Sans',
    pairMeta: 'WARM SANS / 15PX',
    rationale: 'Soft single-storey letterforms reminiscent of classic 19th-century children’s storybooks and vintage paperbacks.',
    archetype: 'THE STORYBOOK CURATOR',
    dna: { editorial: 96, disruptive: 35, warmth: 92, utility: 60 },
    headingFontFamily: "'Cormorant Infant', serif",
    pairFontFamily: "'DM Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,600;1,400&family=DM+Sans:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,600;1,400&family=DM+Sans:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Cormorant Infant', serif;\n  --font-body: 'DM Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Cormorant Infant"', 'serif'],\n  body: ['"DM Sans"', 'sans-serif']\n}`
  },
  {
    id: 'wedding_invitation',
    words: ['wedding', 'love', 'marriage', 'bride', 'groom', 'invitation', 'romantic', 'couple', 'floral', 'ceremony', 'forever'],
    name: 'Great Vibes Romance',
    sample: 'Great Vibes<br/><i>Romance</i>',
    meta: 'CALLIGRAPHIC SCRIPT',
    pair: 'Playfair Display',
    pairMeta: 'ROMANTIC SERIF / 16PX',
    rationale: 'Flowing cursive penmanship designed for luxury wedding invitations, place cards, and romantic stationery.',
    archetype: 'THE ROMANTIC POET',
    dna: { editorial: 98, disruptive: 40, warmth: 95, utility: 35 },
    headingFontFamily: "'Great Vibes', cursive",
    pairFontFamily: "'Playfair Display', serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;1,400&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;1,400&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Great Vibes', cursive;\n  --font-body: 'Playfair Display', serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Great Vibes"', 'cursive'],\n  body: ['"Playfair Display"', 'serif']\n}`
  },
  {
    id: 'fitness_gym',
    words: ['gym', 'crossfit', 'lift', 'powerlifting', 'trainer', 'stamina', 'cardio', 'iron', 'beast', 'workout'],
    name: 'Teko Iron',
    sample: 'Teko<br/><i>Iron</i>',
    meta: 'CONDENSED SQUARE SANS',
    pair: 'Montserrat',
    pairMeta: 'GEOMETRIC SANS / 15PX',
    rationale: 'Square condensed proportions that mirror heavy barbell plates and high-intensity workout timer displays.',
    archetype: 'THE IRON ATHLETE',
    dna: { editorial: 10, disruptive: 90, warmth: 25, utility: 95 },
    headingFontFamily: "'Teko', sans-serif",
    pairFontFamily: "'Montserrat', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Teko:wght@600;700&family=Montserrat:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Teko:wght@600;700&family=Montserrat:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Teko', sans-serif;\n  --font-body: 'Montserrat', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Teko"', 'sans-serif'],\n  body: ['"Montserrat"', 'sans-serif']\n}`
  },
  {
    id: 'pet_care',
    words: ['pet', 'dog', 'cat', 'puppy', 'vet', 'animal', 'grooming', 'paws', 'rescue', 'adoption', 'shelter'],
    name: 'Sniglet Paws',
    sample: 'Sniglet<br/><i>Paws</i>',
    meta: 'ROUNDED DISPLAY',
    pair: 'Quicksand',
    pairMeta: 'ROUNDED SANS / 15PX',
    rationale: 'Whimsical rounded shapes that bring instant warmth and playful energy to pet care brands and veterinary clinics.',
    archetype: 'THE COMPANION GUARDIAN',
    dna: { editorial: 20, disruptive: 60, warmth: 100, utility: 75 },
    headingFontFamily: "'Sniglet', cursive",
    pairFontFamily: "'Quicksand', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Sniglet:wght@800&family=Quicksand:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Sniglet:wght@800&family=Quicksand:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Sniglet', cursive;\n  --font-body: 'Quicksand', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Sniglet"', 'cursive'],\n  body: ['"Quicksand"', 'sans-serif']\n}`
  },
  {
    id: 'event_festival',
    words: ['festival', 'party', 'dj', 'club', 'night', 'event', 'rave', 'stage', 'electronic', 'vibes', 'dance'],
    name: 'Righteous Festival',
    sample: 'Righteous<br/><i>Festival</i>',
    meta: 'RETRO FUTURISTIC DISPLAY',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'SANS / 15PX',
    rationale: 'Inspired by Art Deco posters and 1980s synth-wave album art, delivering high-impact festival energy.',
    archetype: 'THE ELECTRIC HOST',
    dna: { editorial: 35, disruptive: 95, warmth: 70, utility: 65 },
    headingFontFamily: "'Righteous', sans-serif",
    pairFontFamily: "'Plus Jakarta Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Righteous&family=Plus+Jakarta+Sans:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Righteous&family=Plus+Jakarta+Sans:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Righteous', sans-serif;\n  --font-body: 'Plus Jakarta Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Righteous"', 'sans-serif'],\n  body: ['"Plus Jakarta Sans"', 'sans-serif']\n}`
  },
  {
    id: 'fintech_bank',
    words: ['neobank', 'banking', 'savings', 'credit', 'card', 'checkout', 'stripe', 'fintech', 'vault'],
    name: 'Red Hat Bank',
    sample: 'Red Hat<br/><i>Display</i>',
    meta: 'GEOMETRIC CORPORATE SANS',
    pair: 'Inter',
    pairMeta: 'NEUTRAL SANS / 14PX',
    rationale: 'Fresh, geometric clarity engineered for modern neo-banks, digital wallets, and financial mobile dashboards.',
    archetype: 'THE DIGITAL TRUSTEE',
    dna: { editorial: 35, disruptive: 45, warmth: 60, utility: 98 },
    headingFontFamily: "'Red Hat Display', sans-serif",
    pairFontFamily: "'Inter', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@700;900&family=Inter:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@700;900&family=Inter:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Red Hat Display', sans-serif;\n  --font-body: 'Inter', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Red Hat Display"', 'sans-serif'],\n  body: ['"Inter"', 'sans-serif']\n}`
  },
  {
    id: 'retro_arcade',
    words: ['retro', 'vt323', 'crt', 'console', 'n64', 'snes', 'gameboy', 'emulator', 'pixel', '8bit'],
    name: 'VT323 Arcade',
    sample: 'VT323<br/><i>Arcade</i>',
    meta: 'MONOCHROME TERMINAL',
    pair: 'DM Mono',
    pairMeta: 'SYSTEM MONO / 14PX',
    rationale: 'Direct glowing phosphor CRT monitor typography that takes you straight back to 1987 arcade machines.',
    archetype: 'THE RETRO TERMINAL',
    dna: { editorial: 30, disruptive: 98, warmth: 50, utility: 70 },
    headingFontFamily: "'VT323', monospace",
    pairFontFamily: "'DM Mono', monospace",
    googleFonts: 'https://fonts.googleapis.com/css2?family=VT323&family=DM+Mono:wght@400;500&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=VT323&family=DM+Mono:wght@400;500&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'VT323', monospace;\n  --font-body: 'DM Mono', monospace;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"VT323"', 'monospace'],\n  body: ['"DM Mono"', 'monospace']\n}`
  },
  {
    id: 'eco_sustainability',
    words: ['eco', 'sustainability', 'recycle', 'climate', 'green', 'solar', 'wind', 'planet', 'zero waste', 'clean energy'],
    name: 'Josefin Eco',
    sample: 'Josefin<br/><i>Sans</i>',
    meta: 'GEOMETRIC HUMANIST',
    pair: 'Lora',
    pairMeta: 'ORGANIC SERIF / 15PX',
    rationale: 'Inspired by 1930s Scandinavian geometric design, conveying clean energy and planet-first values.',
    archetype: 'THE SUSTAINABLE PIONEER',
    dna: { editorial: 75, disruptive: 40, warmth: 90, utility: 80 },
    headingFontFamily: "'Josefin Sans', sans-serif",
    pairFontFamily: "'Lora', serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&family=Lora:ital,wght@0,400;1,400&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&family=Lora:ital,wght@0,400;1,400&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Josefin Sans', sans-serif;\n  --font-body: 'Lora', serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Josefin Sans"', 'sans-serif'],\n  body: ['"Lora"', 'serif']\n}`
  },
  {
    id: 'modern_fashion',
    words: ['haute', 'couture', 'glamour', 'runway', 'vogue', 'italiana', 'luxury fashion', 'paris', 'milan'],
    name: 'Italiana Couture',
    sample: 'Italiana<br/><i>Couture</i>',
    meta: 'HIGH-CONTRAST DIDONE',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'CLEAN SANS / 15PX',
    rationale: 'Graceful calligraphic proportions inspired by Italian newspaper typography, radiating high-fashion luxury.',
    archetype: 'THE MILAN STYLIST',
    dna: { editorial: 99, disruptive: 50, warmth: 70, utility: 45 },
    headingFontFamily: "'Italiana', serif",
    pairFontFamily: "'Plus Jakarta Sans', sans-serif",
    googleFonts: 'https://fonts.googleapis.com/css2?family=Italiana&family=Plus+Jakarta+Sans:wght@400;600&display=swap',
    cssImport: `@import url('https://fonts.googleapis.com/css2?family=Italiana&family=Plus+Jakarta+Sans:wght@400;600&display=swap');`,
    cssVars: `:root {\n  --font-heading: 'Italiana', serif;\n  --font-body: 'Plus Jakarta Sans', sans-serif;\n}`,
    tailwind: `fontFamily: {\n  heading: ['"Italiana"', 'serif'],\n  body: ['"Plus Jakarta Sans"', 'sans-serif']\n}`
  }
]

const getRandomProfile = () => profiles[Math.floor(Math.random() * profiles.length)]
let activeProfile = getRandomProfile()

// Dynamic Google Font Loader via standard Google Fonts Web API
function loadGoogleFont(url) {
  if (!url) return
  let link = document.getElementById('dynamicFontLink')
  if (!link) {
    link = document.createElement('link')
    link.id = 'dynamicFontLink'
    link.rel = 'stylesheet'
    document.head.appendChild(link)
  }
  link.href = url
}

// Enhanced AI Recommendation Matcher Algorithm (Weighted Token Matching & Score Calculation)
function chooseProfile(promptText) {
  if (!promptText || !promptText.trim()) return getRandomProfile()
  
  const queryWords = promptText.toLowerCase().replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(Boolean)
  if (queryWords.length === 0) return getRandomProfile()

  let bestScore = -1
  let bestProfile = profiles[0]

  profiles.forEach((profile) => {
    let score = 0
    
    // Check direct word matches and partial substring overlaps
    profile.words.forEach((targetWord) => {
      queryWords.forEach((userWord) => {
        if (userWord === targetWord) {
          score += 4.0 // Exact match bonus
        } else if (targetWord.includes(userWord) || userWord.includes(targetWord)) {
          if (userWord.length > 2) score += 2.0 // Partial match
        }
      })
    })

    // Check archetype & meta keyword hits
    const metaLower = profile.meta.toLowerCase()
    const archetypeLower = profile.archetype.toLowerCase()
    queryWords.forEach((userWord) => {
      if (userWord.length > 2 && (metaLower.includes(userWord) || archetypeLower.includes(userWord))) {
        score += 3.0
      }
    })

    if (score > bestScore) {
      bestScore = score
      bestProfile = profile
    }
  })

  // Fallback to random if no keyword score matched
  if (bestScore <= 0) {
    return getRandomProfile()
  }

  return bestProfile
}

// Dynamic DNA Bars Renderer
function animateDNABars(dna) {
  barEditorial.style.width = dna.editorial + '%'
  barDisruptive.style.width = dna.disruptive + '%'
  barWarmth.style.width = dna.warmth + '%'
  barUtility.style.width = dna.utility + '%'

  valEditorial.textContent = dna.editorial
  valDisruptive.textContent = dna.disruptive
  valWarmth.textContent = dna.warmth
  valUtility.textContent = dna.utility
}

// Toast Alert
function showToast(message) {
  toast.textContent = message
  toast.classList.add('show')
  setTimeout(() => toast.classList.remove('show'), 2600)
}

// Robust Async & Fallback Clipboard Copy Helper
async function copyToClipboard(text, button) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
    } else {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      document.execCommand('copy')
      textArea.remove()
    }
    showToast('✓ Copied to clipboard!')
    if (button) {
      const originalText = button.textContent
      button.textContent = 'COPIED! ✓'
      button.style.backgroundColor = 'var(--acid)'
      button.style.color = '#111'
      button.style.borderColor = 'var(--acid)'
      setTimeout(() => {
        button.textContent = originalText
        button.style.backgroundColor = ''
        button.style.color = ''
        button.style.borderColor = ''
      }, 1600)
    }
  } catch (err) {
    console.error('Copying failed:', err)
    showToast('Copy failed. Please copy manually.')
  }
}

// Update Active Recommendation
function applyProfile(profile) {
  activeProfile = profile
  loadGoogleFont(profile.googleFonts)

  const index = profiles.findIndex((p) => p.id === profile.id) + 1
  if (profileIndex) profileIndex.textContent = `${index < 10 ? '0' + index : index} / ${profiles.length}`

  displayName.textContent = profile.name
  displaySample.innerHTML = profile.sample
  displayMeta.textContent = profile.meta
  pairName.textContent = profile.pair
  pairMeta.textContent = profile.pairMeta
  rationale.textContent = profile.rationale
  archetype.textContent = profile.archetype
  
  // Apply dynamic font families so headings, live specimen, input, and pairs render in their font styles!
  if (profile.headingFontFamily) {
    displaySample.style.fontFamily = profile.headingFontFamily
    displayName.style.fontFamily = profile.headingFontFamily
    specimenTextInput.style.fontFamily = profile.headingFontFamily
  }
  if (profile.pairFontFamily) {
    pairName.style.fontFamily = profile.pairFontFamily
  }

  // Specimen text input reset to font name
  specimenTextInput.value = profile.name.replace('<br/>', ' ')

  // Animate Design DNA
  animateDNABars(profile.dna)
}

// Initial Load
applyProfile(activeProfile)

function updateRecommendation() {
  const p = chooseProfile(brief.value)
  analyse.classList.add('loading')
  analyse.innerHTML = 'READING <span>◌</span>'
  
  setTimeout(() => {
    applyProfile(p)
    $('#results').scrollIntoView({ behavior: 'smooth', block: 'start' })
    analyse.classList.remove('loading')
    analyse.innerHTML = 'ANALYSE <span>→</span>'
  }, 480)
}

brief.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    updateRecommendation()
  }
})

analyse.addEventListener('click', updateRecommendation)

// Specimen Customizer Handlers
specimenTextInput.addEventListener('input', (e) => {
  const val = e.target.value.trim()
  if (val) {
    displaySample.textContent = val
  } else {
    displaySample.innerHTML = activeProfile.sample
  }
})

fontSizeSlider.addEventListener('input', (e) => {
  const size = e.target.value
  fontSizeVal.textContent = `${size}px`
  displaySample.style.fontSize = `${size}px`
})

toggleCase.addEventListener('click', () => {
  toggleCase.classList.toggle('active')
  displaySample.style.textTransform = toggleCase.classList.contains('active') ? 'uppercase' : 'none'
})

toggleItalic.addEventListener('click', () => {
  toggleItalic.classList.toggle('active')
  displaySample.style.fontStyle = toggleItalic.classList.contains('active') ? 'italic' : 'normal'
})

// Developer Code Exporter Handlers
copyCssBtn.addEventListener('click', (e) => {
  copyToClipboard(activeProfile.cssImport + '\n\n' + activeProfile.cssVars, e.currentTarget)
})

copyTailwindBtn.addEventListener('click', (e) => {
  copyToClipboard(activeProfile.tailwind, e.currentTarget)
})

copyGoogleFontsBtn.addEventListener('click', (e) => {
  copyToClipboard(activeProfile.googleFonts, e.currentTarget)
})

// Interactive Preset Prompt Chips
document.querySelectorAll('.chips button').forEach((chip) => {
  chip.addEventListener('click', () => {
    const promptText = chip.dataset.prompt
    if (promptText) {
      brief.value = promptText
      updateRecommendation()
    }
  })
})

// Interactive Typography Sculpture Controller
(function initTypographySculpture() {
  const sculptureSpans = document.querySelectorAll('.sculpture-row span')
  if (!sculptureSpans.length) return

  const fontChoices = [
    "'Syne', sans-serif",
    "'Unbounded', sans-serif",
    "'Outfit', sans-serif",
    "'Montserrat', sans-serif",
    "'Space Grotesk', sans-serif",
    "'Bricolage Grotesque', sans-serif",
    "'Instrument Serif', serif",
    "'Playfair Display', serif"
  ]

  // On page load & click, randomize letter fonts & subtle rotations for fresh artisanal feel
  sculptureSpans.forEach((span) => {
    span.style.fontFamily = fontChoices[Math.floor(Math.random() * fontChoices.length)]
    
    span.addEventListener('click', () => {
      span.style.fontFamily = fontChoices[Math.floor(Math.random() * fontChoices.length)]
      const rot = (Math.random() * 14 - 7).toFixed(1)
      span.style.transform = `scale(1.25) rotate(${rot}deg)`
      setTimeout(() => {
        span.style.transform = `rotate(${rot}deg)`
      }, 250)
    })
  })
})()

