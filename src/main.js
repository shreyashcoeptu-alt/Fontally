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
const analyse = $('#analyse')
const toast = $('#toast')

// Specimen & Type Lab Handles
const testerPreview = $('#testerPreview')
const activeFontBadge = $('#activeFontBadge')
const specimenTextInput = $('#specimenTextInput')
const fontSizeSlider = $('#fontSizeSlider')
const fontSizeVal = $('#fontSizeVal')
const toggleCase = $('#toggleCase')
const toggleItalic = $('#toggleItalic')
const toggleBold = $('#toggleBold')
const specimenColorPicker = $('#specimenColorPicker')
const customColorPreview = $('#customColorPreview')
const customColorWrapper = $('.custom-color-wrapper')
const clearSpecimenText = $('#clearSpecimenText')
const colorSwatches = document.querySelectorAll('.color-swatch')
const specimenPresetChips = document.querySelectorAll('.specimen-preset-chip')

// Export Handles
const copyCssBtn = $('#copyCssBtn')
const copyTailwindBtn = $('#copyTailwindBtn')
const copyGoogleFontsBtn = $('#copyGoogleFontsBtn')
const shareBtn = $("#shareBtn")
const recommendationStatus = $("#recommendationStatus")

// Google Fonts Explorer Handles
const fontSearchInput = $('#fontSearchInput')
const clearFontSearch = $('#clearFontSearch')
const fontSearchDropdown = $('#fontSearchDropdown')
const fontResultsCount = $('#fontResultsCount')
const fontResultsList = $('#fontResultsList')
const categoryFilterBtns = document.querySelectorAll('.category-filter-btn')



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
    headingFallback: "'Plus Jakarta Sans', sans-serif",
    bodyFallback: "'Playfair Display', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;700&family=Playfair+Display:ital,wght@0,600;1,400&display=swap'
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
    headingFallback: "'Inter', sans-serif",
    bodyFallback: "'Newsreader', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap'
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
    headingFallback: "'Newsreader', serif",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,400&family=DM+Sans:wght@400;500&display=swap'
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
    headingFallback: "'Bodoni Moda', serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;1,6..96,400&family=Plus+Jakarta+Sans:wght@400;500&display=swap'
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
    headingFallback: "'Geist Mono', 'DM Mono', monospace",
    bodyFallback: "'Inter', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;700&family=Inter:wght@400;600&display=swap'
  },
  {
    id: 'cyberpunk',
    words: ['cyberpunk', 'gaming', 'rpg', 'neo', 'dystopian', 'retro', 'arcade', 'synth', 'glitch', 'future', 'pixel', 'vr', 'scifi', 'cyber'],
    name: 'PP Neue Bit',
    sample: 'PP Neue<br/><i>Bit</i>',
    meta: 'PIXEL / DISPLAY',
    pair: 'Syne',
    pairMeta: 'GEOMETRIC / 16PX',
    rationale: 'Raw pixelated nostalgia colliding with extreme geometric wide typography. Reads like neon rain bouncing off chrome armor.',
    archetype: 'THE SYNTH CONSTRUCTOR',
    headingFallback: "'Silkscreen', monospace",
    bodyFallback: "'Syne', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Syne:wght@700;800&display=swap'
  },
  {
    id: 'luxury',
    words: ['luxury', 'skincare', 'perfume', 'jewelry', 'parfum', 'chic', 'elegance', 'haute', 'boutique', 'premium', 'highend', 'gold'],
    name: 'Cormorant Garamond',
    sample: 'Cormorant<br/><i>Garamond</i>',
    meta: 'SERIF / ELEGANT',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'SANS / 14PX',
    rationale: 'Uncompromising grace and high contrast serifs that emanate quiet opulence without needing to raise its voice.',
    archetype: 'THE HIGH COUTURIER',
    headingFallback: "'Cormorant Garamond', serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;600&display=swap'
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
    headingFallback: "'Unbounded', sans-serif",
    bodyFallback: "'Space Grotesk', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Space+Grotesk:wght@400;600&display=swap'
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
    headingFallback: "'Tenor Sans', sans-serif",
    bodyFallback: "'Outfit', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Tenor+Sans&family=Outfit:wght@400;600&display=swap'
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
    headingFallback: "'Instrument Serif', serif",
    bodyFallback: "'DM Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@400;500&display=swap'
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
    headingFallback: "'Lora', serif",
    bodyFallback: "'Work Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,600;1,400&family=Work+Sans:wght@400;600&display=swap'
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
    headingFallback: "'Montserrat', sans-serif",
    bodyFallback: "'Open Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Open+Sans:wght@400;600&display=swap'
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
    headingFallback: "'Orbitron', sans-serif",
    bodyFallback: "'Rajdhani', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Orbitron:wght@700;900&family=Rajdhani:wght@500;700&display=swap'
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
    headingFallback: "'Fraunces', serif",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,600;1,9..144,400&family=DM+Sans:wght@400;500&display=swap'
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
    headingFallback: "'Oswald', sans-serif",
    bodyFallback: "'Lato', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Lato:wght@400;700&display=swap'
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
    headingFallback: "'Anton', sans-serif",
    bodyFallback: "'Montserrat', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Anton&family=Montserrat:wght@400;700&display=swap'
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
    headingFallback: "'Fredoka', sans-serif",
    bodyFallback: "'Quicksand', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Fredoka:wght@600;700&family=Quicksand:wght@500;700&display=swap'
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
    headingFallback: "'Public Sans', sans-serif",
    bodyFallback: "'Inter', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Public+Sans:wght@600;700&family=Inter:wght@400;500&display=swap'
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
    headingFallback: "'Libre Baskerville', serif",
    bodyFallback: "'Source Sans 3', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,700;1,400&family=Source+Sans+3:wght@400;600&display=swap'
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
    headingFallback: "'JetBrains Mono', monospace",
    bodyFallback: "'Inter', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;700&family=Inter:wght@400;600&display=swap'
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
    headingFallback: "'Permanent Marker', cursive",
    bodyFallback: "'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Fira+Code:wght@400;600&display=swap'
  },
  {
    id: 'gourmet_dining',
    words: ['dining', 'gourmet', 'bistro', 'wine', 'chef', 'menu', 'steak', 'michelin', 'culinary', 'taste', 'restaurant', 'upscale'],
    name: 'Cinzel Fine Dining',
    sample: 'Cinzel<br/><i>Gourmet</i>',
    meta: 'CLASSICAL MONUMENTAL SERIF',
    pair: 'Lato',
    pairMeta: 'CLEAN SANS / 14PX',
    rationale: 'Inspired by classical Roman inscriptions, casting an aura of timeless culinary mastery over fine dining menus.',
    archetype: 'THE MICHELIN MAESTRO',
    headingFallback: "'Cinzel', serif",
    bodyFallback: "'Lato', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800&family=Lato:wght@400;700&display=swap'
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
    headingFallback: "'Abril Fatface', serif",
    bodyFallback: "'Raleway', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Raleway:wght@400;600&display=swap'
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
    headingFallback: "'Cabin', sans-serif",
    bodyFallback: "'Merriweather', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cabin:wght@600;700&family=Merriweather:ital,wght@0,400;1,300&display=swap'
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
    headingFallback: "'Russo One', sans-serif",
    bodyFallback: "'Exo 2', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Russo+One&family=Exo+2:wght@500;700&display=swap'
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
    headingFallback: "'Bricolage Grotesque', sans-serif",
    bodyFallback: "'Space Grotesk', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Space+Grotesk:wght@400;600&display=swap'
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
    headingFallback: "'Rubik Mono One', sans-serif",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Rubik+Mono+One&family=DM+Sans:wght@400;500&display=swap'
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
    headingFallback: "'Pacifico', cursive",
    bodyFallback: "'Quicksand', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;600&display=swap'
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
    headingFallback: "'Press Start 2P', monospace",
    bodyFallback: "'Space Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Space+Mono:wght@400;700&display=swap'
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
    headingFallback: "'Manrope', sans-serif",
    bodyFallback: "'Open Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Manrope:wght@600;800&family=Open+Sans:wght@400;600&display=swap'
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
    headingFallback: "'Marcellus', serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Marcellus&family=Plus+Jakarta+Sans:wght@400;600&display=swap'
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
    headingFallback: "'Syncopate', sans-serif",
    bodyFallback: "'Rajdhani', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Syncopate:wght@700&family=Rajdhani:wght@500;700&display=swap'
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
    headingFallback: "'Bebas Neue', sans-serif",
    bodyFallback: "'Roboto', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:wght@400;500&display=swap'
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
    headingFallback: "'Poppins', sans-serif",
    bodyFallback: "'Lora', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Poppins:wght@600;700&family=Lora:ital,wght@0,400;1,400&display=swap'
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
    headingFallback: "'Spectral', serif",
    bodyFallback: "'Fira Code', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Spectral:ital,wght@0,600;1,400&family=Fira+Code:wght@400;500&display=swap'
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
    headingFallback: "'Cormorant Infant', serif",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Infant:ital,wght@0,600;1,400&family=DM+Sans:wght@400;500&display=swap'
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
    headingFallback: "'Great Vibes', cursive",
    bodyFallback: "'Playfair Display', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Great+Vibes&family=Playfair+Display:ital,wght@0,400;1,400&display=swap'
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
    headingFallback: "'Teko', sans-serif",
    bodyFallback: "'Montserrat', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Teko:wght@600;700&family=Montserrat:wght@400;600&display=swap'
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
    headingFallback: "'Sniglet', cursive",
    bodyFallback: "'Quicksand', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Sniglet:wght@800&family=Quicksand:wght@400;600&display=swap'
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
    headingFallback: "'Righteous', sans-serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Righteous&family=Plus+Jakarta+Sans:wght@400;600&display=swap'
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
    headingFallback: "'Red Hat Display', sans-serif",
    bodyFallback: "'Inter', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Red+Hat+Display:wght@700;900&family=Inter:wght@400;500&display=swap'
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
    headingFallback: "'VT323', monospace",
    bodyFallback: "'DM Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=VT323&family=DM+Mono:wght@400;500&display=swap'
  },
  {
    id: 'eco_sustainability',
    words: ['eco', 'sustainability', 'recycle', 'climate', 'green', 'solar', 'wind', 'planet', 'zerowaste', 'cleanenergy'],
    name: 'Josefin Eco',
    sample: 'Josefin<br/><i>Sans</i>',
    meta: 'GEOMETRIC HUMANIST',
    pair: 'Lora',
    pairMeta: 'ORGANIC SERIF / 15PX',
    rationale: 'Inspired by 1930s Scandinavian geometric design, conveying clean energy and planet-first values.',
    archetype: 'THE SUSTAINABLE PIONEER',
    headingFallback: "'Josefin Sans', sans-serif",
    bodyFallback: "'Lora', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@600;700&family=Lora:ital,wght@0,400;1,400&display=swap'
  },
  {
    id: 'japanese_zen',
    words: ['japan', 'japanese', 'tokyo', 'kyoto', 'zen', 'matcha', 'tea', 'minimal', 'harmony', 'wabi', 'sabi', 'calm', 'ceramics', 'peace'],
    name: 'Zen Kaku Gothic',
    sample: 'Zen Kaku<br/><i>Gothic</i>',
    meta: 'HUMANIST JAPANESE GROTESK',
    pair: 'Noto Serif',
    pairMeta: 'CLASSIC SERIF / 15PX',
    rationale: 'Refined optical proportions and deep spatial harmony echoing Japanese architectural minimalism and quiet contemplation.',
    archetype: 'THE ZEN CONTEMPLATOR',
    headingFallback: "'Zen Kaku Gothic New', sans-serif",
    bodyFallback: "'Noto Serif', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@500;700;900&family=Noto+Serif:ital,wght@0,400;1,400&display=swap'
  },
  {
    id: 'dark_academia',
    words: ['dark', 'academia', 'oxford', 'manuscript', 'vintage', 'library', 'secret', 'history', 'literature', 'antique', 'latin', 'gothic', 'alchemy'],
    name: 'EB Garamond Scholar',
    sample: 'EB Garamond<br/><i>Scholar</i>',
    meta: 'CLASSICAL HUMANIST SERIF',
    pair: 'Cinzel',
    pairMeta: 'INSCRIPTIONAL / 14PX',
    rationale: 'Heavy historical ink weight and calligraphic grace evoking candlelit mahogany reading halls, leatherbound tomes, and centuries of scholarship.',
    archetype: 'THE CLOISTERED SCHOLAR',
    headingFallback: "'EB Garamond', serif",
    bodyFallback: "'Cinzel', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,600;0,800;1,400;1,600&family=Cinzel:wght@500;700&display=swap'
  },
  {
    id: 'y2k_bubbly',
    words: ['y2k', '2000s', 'bubble', 'cute', 'candy', 'pop', 'glitter', 'sparkle', 'teen', 'retro', 'kawaii', 'nostalgia', 'glossy', 'fun'],
    name: 'DynaPuff Pop',
    sample: 'DynaPuff<br/><i>Pop</i>',
    meta: 'PUFFY BUBBLE DISPLAY',
    pair: 'Nunito',
    pairMeta: 'ROUNDED SANS / 15PX',
    rationale: 'Inflatable bubbly energy and joyful optimism straight from 2002 flip phones, pop CD covers, and arcade dance mats.',
    archetype: 'THE Y2K POPSTAR',
    headingFallback: "'DynaPuff', cursive",
    bodyFallback: "'Nunito', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DynaPuff:wght@600;700&family=Nunito:wght@400;600;700&display=swap'
  },
  {
    id: 'scandinavian_sauna',
    words: ['scandinavian', 'nordic', 'sauna', 'spa', 'hygge', 'wood', 'pine', 'minimalist', 'clean', 'sweden', 'denmark', 'norway', 'rest'],
    name: 'Outfit Nordic',
    sample: 'Outfit<br/><i>Nordic</i>',
    meta: 'GEOMETRIC SANS',
    pair: 'Cormorant Garamond',
    pairMeta: 'DELICATE SERIF / 15PX',
    rationale: 'Spacious geometric letterforms bathed in pale sunlight, paired with high-contrast serifs for an ethereal Scandinavian retreat feeling.',
    archetype: 'THE NORDIC MINIMALIST',
    headingFallback: "'Outfit', sans-serif",
    bodyFallback: "'Cormorant Garamond', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap'
  },
  {
    id: 'french_patisserie',
    words: ['french', 'patisserie', 'croissant', 'paris', 'bistro', 'cafe', 'butter', 'sweet', 'bakery', 'dessert', 'chocolatier', 'delicate'],
    name: 'Playfair Patisserie',
    sample: 'Playfair<br/><i>Patisserie</i>',
    meta: 'TRANSITIONAL DIDONE SERIF',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'MODERN SANS / 14PX',
    rationale: 'Aristocratic high-contrast letterforms with delicate flourishes, redolent of gilded Parisian tea salons and morning brioche.',
    archetype: 'THE PARISIAN PASTRY CHEF',
    headingFallback: "'Playfair Display', serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,800;1,400&family=Plus+Jakarta+Sans:wght@400;600&display=swap'
  },
  {
    id: 'cyber_security',
    words: ['security', 'cyber', 'defense', 'soc', 'firewall', 'encryption', 'zero-trust', 'threat', 'pentest', 'hacker', 'protocol', 'infosec'],
    name: 'Share Tech Security',
    sample: 'Share Tech<br/><i>Defense</i>',
    meta: 'TACTICAL MATRIX SANS',
    pair: 'Chivo',
    pairMeta: 'NEO-GROTESK / 14PX',
    rationale: 'Angular, tactical letterforms built for cyber defense SOC dashboards, packet inspection logs, and zero-trust protocol interfaces.',
    archetype: 'THE CYBER DEFENDER',
    headingFallback: "'Share Tech Mono', monospace",
    bodyFallback: "'Chivo', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Share+Tech+Mono&family=Chivo:wght@400;600;700&display=swap'
  },
  {
    id: 'space_nasa',
    words: ['space', 'nasa', 'spacecraft', 'orbit', 'rocket', 'mars', 'satellite', 'mission', 'cosmos', 'astronaut', 'telemetry', 'astronomy'],
    name: 'Space Grotesk Mission',
    sample: 'Space<br/><i>Mission</i>',
    meta: 'TECHNICAL MONOSPACE-INSPIRED SANS',
    pair: 'Space Mono',
    pairMeta: 'MONOSPACE / 14PX',
    rationale: 'Aerospace trajectory engineering converted into typography. Rigorous proportions designed for telemetry mission control screens.',
    archetype: 'THE ORBITAL NAVIGATOR',
    headingFallback: "'Space Grotesk', sans-serif",
    bodyFallback: "'Space Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;700&family=Space+Mono:wght@400;700&display=swap'
  },
  {
    id: 'psychedelic_70s',
    words: ['70s', 'psychedelic', 'funk', 'groovy', 'disco', 'hippie', 'vinyl', 'retro', 'festival', 'rock', 'vintage', 'colorful', 'soul'],
    name: 'Shrikhand Groovy',
    sample: 'Shrikhand<br/><i>Groovy</i>',
    meta: 'ORGANIC RETRO DISPLAY',
    pair: 'DM Sans',
    pairMeta: 'CLEAN SANS / 15PX',
    rationale: 'Warm, expansive curves and groovy soul reminiscent of 1974 vinyl album covers and colorful silkscreen concert posters.',
    archetype: 'THE PSYCHEDELIC VISIONARY',
    headingFallback: "'Shrikhand', cursive",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Shrikhand&family=DM+Sans:wght@400;500;700&display=swap'
  },
  {
    id: 'bauhaus_swiss',
    words: ['bauhaus', 'swiss', 'grid', 'modernist', 'helvetica', 'international', 'functional', 'minimal', 'poster', 'graphic', 'design', 'clean'],
    name: 'Inter Tight Swiss',
    sample: 'Inter Tight<br/><i>Modernist</i>',
    meta: 'SWISS NEO-GROTESK',
    pair: 'Newsreader',
    pairMeta: 'LITERARY SERIF / 15PX',
    rationale: 'Pure modernist objectivity and rigid structural grid hierarchy where form strictly follows purpose without ornamental distraction.',
    archetype: 'THE MODERNIST TYPOGRAPHER',
    headingFallback: "'Inter Tight', sans-serif",
    bodyFallback: "'Newsreader', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter+Tight:wght@600;800;900&family=Newsreader:ital,opsz,wght@0,6..72,400;1,6..72,400&display=swap'
  },
  {
    id: 'art_deco',
    words: ['deco', 'artdeco', 'gatsby', '1920s', 'luxury', 'brass', 'glamour', 'vintage', 'cocktail', 'speakeasy', 'hotel', 'geometric'],
    name: 'Poiret Deco',
    sample: 'Poiret<br/><i>Deco</i>',
    meta: 'GEOMETRIC ART DECO',
    pair: 'Montserrat',
    pairMeta: 'GEOMETRIC SANS / 14PX',
    rationale: 'Slender, geometric curves and vintage brass elegance echoing 1925 roaring twenties architecture and speakeasy cocktail menus.',
    archetype: 'THE JAZZ AGE ARISTOCRAT',
    headingFallback: "'Poiret One', cursive",
    bodyFallback: "'Montserrat', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Poiret+One&family=Montserrat:wght@400;600;700&display=swap'
  },
  {
    id: 'comic_popart',
    words: ['comic', 'cartoon', 'popart', 'hero', 'superhero', 'manga', 'action', 'punch', 'vibrant', 'fun', 'graphic', 'novel'],
    name: 'Bangers Pop',
    sample: 'Bangers<br/><i>Pop!</i>',
    meta: 'COMIC BOOK DISPLAY',
    pair: 'Open Sans',
    pairMeta: 'READABLE SANS / 14PX',
    rationale: 'Dynamic comic book title titling with punchy sound-effect energy built for graphic novel covers and bold pop-art posters.',
    archetype: 'THE POP ARTIST',
    headingFallback: "'Bangers', cursive",
    bodyFallback: "'Open Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Bangers&family=Open+Sans:wght@400;600;700&display=swap'
  },
  {
    id: 'cozy_cottagecore',
    words: ['cottage', 'cottagecore', 'cozy', 'flower', 'garden', 'tea', 'wildflower', 'knitting', 'cabin', 'rustic', 'warm', 'fairytale', 'autumn'],
    name: 'Alice Fairytale',
    sample: 'Alice<br/><i>Fairytale</i>',
    meta: 'VICTORIAN STORYBOOK SERIF',
    pair: 'Quicksand',
    pairMeta: 'ROUNDED SANS / 15PX',
    rationale: 'Delicate single-storey curves and old-world Victorian tenderness reminiscent of illustrated storybooks and wildflower gardens.',
    archetype: 'THE COTTAGE STORYTELLER',
    headingFallback: "'Alice', serif",
    bodyFallback: "'Quicksand', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Alice&family=Quicksand:wght@400;600&display=swap'
  },
  {
    id: 'techno_industrial',
    words: ['techno', 'berlin', 'industrial', 'rave', 'warehouse', 'concrete', 'underground', 'electronic', 'club', 'dark', 'bass', 'strobe'],
    name: 'Chakra Techno',
    sample: 'Chakra<br/><i>Industrial</i>',
    meta: 'HARD-EDGED TECHNO GROTESK',
    pair: 'Geist Mono',
    pairMeta: 'TERMINAL MONO / 14PX',
    rationale: 'Sharp 45-degree corner angles and heavy concrete weight engineered for underground techno flyers and brutalist industrial club nights.',
    archetype: 'THE INDUSTRIAL PRODUCER',
    headingFallback: "'Chakra Petch', sans-serif",
    bodyFallback: "'Geist Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@600;700;800&family=Geist+Mono:wght@400;600&display=swap'
  },
  {
    id: 'luxury_hospitality',
    words: ['hotel', 'resort', 'concierge', 'hospitality', 'suites', 'vacation', 'five-star', 'villas', 'palace', 'luxury', 'service'],
    name: 'Bodoni Hospitality',
    sample: 'Bodoni<br/><i>Suites</i>',
    meta: 'HIGH-CONTRAST LUXURY SERIF',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'MODERN SANS / 14PX',
    rationale: 'Statuesque vertical contrast and sharp unbracketed serifs that immediately evoke marble lobbies, luggage carts, and presidential suites.',
    archetype: 'THE GRAND CONCIERGE',
    headingFallback: "'Bodoni Moda', serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,600;0,6..96,800;1,6..96,400&family=Plus+Jakarta+Sans:wght@400;600&display=swap'
  },
  {
    id: 'ai_copilot',
    words: ['ai', 'agent', 'copilot', 'autonomous', 'llm', 'intelligence', 'prompt', 'fast', 'model', 'neural', 'assistant', 'speed', 'coding'],
    name: 'Syne Autonomous AI',
    sample: 'Syne<br/><i>Autonomous</i>',
    meta: 'GEOMETRIC EXTRA-WIDE DISPLAY',
    pair: 'Geist Mono',
    pairMeta: 'DEV MONOSPACE / 14PX',
    rationale: 'Hyper-wide geometric headline architecture paired with terminal-fast monospace typography for next-generation autonomous AI interfaces.',
    archetype: 'THE AUTONOMOUS INTELLIGENCE',
    headingFallback: "'Syne', sans-serif",
    bodyFallback: "'Geist Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=Geist+Mono:wght@400;600&display=swap'
  },
  {
    id: 'unbounded_future',
    words: ['unbounded', 'bold', 'metaverse', 'vr', 'future', 'hyper', 'nextgen', 'creative', 'cutting-edge', 'disruptive', 'hype'],
    name: 'Unbounded Future',
    sample: 'Unbounded<br/><i>Future</i>',
    meta: 'RADICAL WIDE GEOMETRIC',
    pair: 'Space Grotesk',
    pairMeta: 'NEO-GROTESK / 15PX',
    rationale: 'Extreme horizontal letterform expansion designed to break boundary lines on high-visibility launch stages and spatial interfaces.',
    archetype: 'THE BOUNDLESS INNOVATOR',
    headingFallback: "'Unbounded', sans-serif",
    bodyFallback: "'Space Grotesk', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@700;900&family=Space+Grotesk:wght@400;600&display=swap'
  },
  {
    id: 'korean_minimalism',
    words: ['korean', 'seoul', 'kbeauty', 'skincare', 'kpop', 'minimal', 'clean', 'gangnam', 'serum', 'aesthetic', 'calm'],
    name: 'Gothic A1 Seoul',
    sample: 'Gothic A1<br/><i>Seoul</i>',
    meta: 'CONTEMPORARY KOREAN SANS',
    pair: 'Nanum Myeongjo',
    pairMeta: 'ELEGANT SERIF / 15PX',
    rationale: 'Pristine architectural clarity and spacious tracking inspired by Seoul concept stores and contemporary Korean editorial magazines.',
    archetype: 'THE SEOUL MINIMALIST',
    headingFallback: "'Gothic A1', sans-serif",
    bodyFallback: "'Nanum Myeongjo', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Gothic+A1:wght@500;700;900&family=Nanum+Myeongjo:wght@400;700&display=swap'
  },
  {
    id: 'synthwave_84',
    words: ['synthwave', '80s', 'neon', 'miami', 'outrun', 'arcade', 'retro', 'laser', 'sunset', 'cyber', 'vibrant', 'nostalgia'],
    name: 'Monoton Synthwave',
    sample: 'Monoton<br/><i>Outrun</i>',
    meta: 'PARALLEL MULTI-LINE DISPLAY',
    pair: 'Rajdhani',
    pairMeta: 'CONDENSED SANS / 15PX',
    rationale: 'Hypnotic multi-line parallel strokes echoing glowing 1984 neon boulevards, analog synthesizers, and midnight test drives.',
    archetype: 'THE SYNTHWAVE RACER',
    headingFallback: "'Monoton', cursive",
    bodyFallback: "'Rajdhani', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Monoton&family=Rajdhani:wght@500;700&display=swap'
  },
  {
    id: 'black_metal_gothic',
    words: ['blackmetal', 'metal', 'doom', 'occult', 'gothic', 'nordic', 'heavy', 'dark', 'underground', 'band', 'mystic', 'ritual'],
    name: 'Pirata Gothic Metal',
    sample: 'Pirata<br/><i>Occult</i>',
    meta: 'ROMANTIC GOTHIC BLACKLETTER',
    pair: 'Crimson Pro',
    pairMeta: 'LITERARY SERIF / 15PX',
    rationale: 'Dramatic condensed blackletter strokes delivering visceral underground authority for atmospheric vinyl releases and dark fantasy branding.',
    archetype: 'THE OCCULT ARCHIVIST',
    headingFallback: "'Pirata One', cursive",
    bodyFallback: "'Crimson Pro', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Pirata+One&family=Crimson+Pro:ital,wght@0,400;1,400;1,600&display=swap'
  },
  {
    id: 'california_surf',
    words: ['surf', 'california', 'beach', 'ocean', 'waves', 'coastal', 'sun', 'skate', 'board', 'pacific', 'summer', 'shack'],
    name: 'Bowlby Surf Coastal',
    sample: 'Bowlby<br/><i>Coastal</i>',
    meta: 'HEAVY SUN-BLEACHED DISPLAY',
    pair: 'Montserrat',
    pairMeta: 'GEOMETRIC SANS / 15PX',
    rationale: 'Chunky, bold woodblock letterforms with coastal grit tailored for surfboard shapers, beachside taco shacks, and sun-soaked apparel.',
    archetype: 'THE PACIFIC SURFER',
    headingFallback: "'Bowlby One SC', cursive",
    bodyFallback: "'Montserrat', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Bowlby+One+SC&family=Montserrat:wght@400;600;700&display=swap'
  },
  {
    id: 'italian_gelato',
    words: ['gelato', 'icecream', 'dessert', 'italy', 'sweet', 'summer', 'riviera', 'pistachio', 'vacation', 'charming', 'artisan'],
    name: 'Satisfy Gelato Riviera',
    sample: 'Satisfy<br/><i>Riviera</i>',
    meta: 'TIMELESS BRUSH SCRIPT',
    pair: 'Lato',
    pairMeta: 'CLEAN SANS / 14PX',
    rationale: 'Fluid, charismatic cursive brushstrokes invoking Italian seaside boardwalks, artisanal pistachio gelato, and sunlit nostalgia.',
    archetype: 'THE RIVIERA CONFECTIONER',
    headingFallback: "'Satisfy', cursive",
    bodyFallback: "'Lato', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Satisfy&family=Lato:wght@400;700&display=swap'
  },
  {
    id: 'tokyo_pixel_signage',
    words: ['shinjuku', 'tokyo', 'dot', 'pixel', 'signage', 'subway', 'japan', 'neon', 'arcade', 'retro', 'cyber', 'matrix'],
    name: 'DotGothic Shinjuku',
    sample: 'DotGothic<br/><i>Shinjuku</i>',
    meta: '16-BIT JAPANESE PIXEL DISPLAY',
    pair: 'Geist Mono',
    pairMeta: 'TERMINAL MONO / 14PX',
    rationale: 'Authentic 16-dot matrix typography straight from Tokyo subway departure boards and 1990s Japanese computing terminals.',
    archetype: 'THE METROPOLITAN NAVIGATOR',
    headingFallback: "'DotGothic16', sans-serif",
    bodyFallback: "'Geist Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=DotGothic16&family=Geist+Mono:wght@400;600&display=swap'
  },
  {
    id: 'natural_wine_bistro',
    words: ['wine', 'petnat', 'sommelier', 'vineyard', 'organic', 'sourdough', 'fermentation', 'bistro', 'cork', 'cellar', 'harvest'],
    name: 'Cormorant Upright Cellar',
    sample: 'Cormorant<br/><i>Cellar</i>',
    meta: 'UPRIGHT CALLIGRAPHIC SERIF',
    pair: 'DM Sans',
    pairMeta: 'EARTHY SANS / 15PX',
    rationale: 'Uniquely upright calligraphic serif terminals crafted for wild-ferment wine labels, natural pet-nat menus, and candlelit tasting rooms.',
    archetype: 'THE NATURAL SOMMELIER',
    headingFallback: "'Cormorant Upright', serif",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cormorant+Upright:wght@500;700&family=DM+Sans:wght@400;500&display=swap'
  },
  {
    id: 'swiss_horology',
    words: ['watch', 'horology', 'geneva', 'luxury', 'chrono', 'timepiece', 'titanium', 'precision', 'swiss', 'craftsmanship', 'dial'],
    name: 'Cinzel Horology Geneva',
    sample: 'Cinzel<br/><i>Horology</i>',
    meta: 'MONUMENTAL ENGRAVED SERIF',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'PRECISION SANS / 14PX',
    rationale: 'Inscriptional monumentality reflecting hand-engraved Geneva movements, tourbillon complications, and master watchmaking heritage.',
    archetype: 'THE MASTER HOROLOGIST',
    headingFallback: "'Cinzel Decorative', serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Plus+Jakarta+Sans:wght@400;600&display=swap'
  },
  {
    id: 'vintage_herbarium',
    words: ['botanical', 'herb', 'plant', 'apothecary', 'tincture', 'garden', 'greenhouse', 'flower', 'vintage', 'natural', 'remedy'],
    name: 'Castoro Herbarium',
    sample: 'Castoro<br/><i>Herbarium</i>',
    meta: 'CLASSIC ITALICIZED BOOK SERIF',
    pair: 'DM Sans',
    pairMeta: 'ORGANIC SANS / 15PX',
    rationale: 'Subtle calligraphic warmth designed for pressed botanical field guides, apothecary elixir bottles, and herbal remedy packaging.',
    archetype: 'THE APOTHECARY BOTANIST',
    headingFallback: "'Castoro', serif",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Castoro:ital@0;1&family=DM+Sans:wght@400;500&display=swap'
  },
  {
    id: 'heritage_leathercraft',
    words: ['leather', 'boots', 'craft', 'workshop', 'tannery', 'heritage', 'handmade', 'rivet', 'rugged', 'denim', 'wood'],
    name: 'Alfa Slab Heritage',
    sample: 'Alfa Slab<br/><i>Heritage</i>',
    meta: 'HEAVY SLAB SERIF DISPLAY',
    pair: 'Merriweather',
    pairMeta: 'STURDY SERIF / 15PX',
    rationale: 'Thick, uncompromising slab serifs built for full-grain leather stamping, heritage workwear labels, and timeless workbench tools.',
    archetype: 'THE HERITAGE TANNER',
    headingFallback: "'Alfa Slab One', cursive",
    bodyFallback: "'Merriweather', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Alfa+Slab+One&family=Merriweather:ital,wght@0,400;1,300&display=swap'
  },
  {
    id: 'retro_pixel_rpg',
    words: ['game', 'rpg', 'quest', 'dungeon', 'pixel', '16bit', '8bit', 'inventory', 'loot', 'nintendo', 'retro', 'gamer'],
    name: 'Silkscreen Dungeon Quest',
    sample: 'Silkscreen<br/><i>Quest</i>',
    meta: 'CLEAN PIXEL DISPLAY',
    pair: 'Press Start 2P',
    pairMeta: '8-BIT MONOSPACE / 13PX',
    rationale: 'Pixel-perfect grid proportions engineered for indie RPG dialogue boxes, dungeon exploration menus, and retro game cover titles.',
    archetype: 'THE 16-BIT ADVENTURER',
    headingFallback: "'Silkscreen', monospace",
    bodyFallback: "'Press Start 2P', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Silkscreen:wght@400;700&family=Press+Start+2P&display=swap'
  },
  {
    id: 'architectural_pavilion',
    words: ['pavilion', 'architecture', 'space', 'concrete', 'glass', 'museum', 'monolith', 'minimal', 'exhibition', 'structure'],
    name: 'Epilogue Modern Pavilion',
    sample: 'Epilogue<br/><i>Pavilion</i>',
    meta: 'CONTEMPORARY ARCHITECTURAL GROTESK',
    pair: 'Instrument Serif',
    pairMeta: 'POETIC SERIF / 16PX',
    rationale: 'Clean geometric proportions colliding with delicate high-contrast italics to reflect contemporary glass and concrete pavilions.',
    archetype: 'THE PAVILION ARCHITECT',
    headingFallback: "'Epilogue', sans-serif",
    bodyFallback: "'Instrument Serif', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Epilogue:wght@600;800;900&family=Instrument+Serif:ital@0;1&display=swap'
  },
  {
    id: 'luxury_perfumery',
    words: ['perfume', 'parfum', 'fragrance', 'scent', 'luxury', 'rose', 'flacon', 'elixir', 'beauty', 'couture', 'sensual'],
    name: 'Alex Brush Haute Perfume',
    sample: 'Alex Brush<br/><i>Parfum</i>',
    meta: 'ELEGANT FLOWING SCRIPT',
    pair: 'Cormorant Garamond',
    pairMeta: 'HAUTE SERIF / 15PX',
    rationale: 'Weightless calligraphic curves that drape like liquid silk across crystal fragrance flacons and bespoke beauty packaging.',
    archetype: 'THE HAUTE NOSE',
    headingFallback: "'Alex Brush', cursive",
    bodyFallback: "'Cormorant Garamond', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cormorant+Garamond:ital,wght@0,400;1,400&display=swap'
  },
  {
    id: 'crypto_liquidity_terminal',
    words: ['crypto', 'trading', 'liquidity', 'swap', 'orderbook', 'exchange', 'market', 'depth', 'chart', 'defi', 'yield', 'terminal'],
    name: 'Space Mono Trading',
    sample: 'Space<br/><i>Liquidity</i>',
    meta: 'MATHEMATICAL MONOSPACE SANS',
    pair: 'Inter Tight',
    pairMeta: 'SWISS GROTESK / 14PX',
    rationale: 'Zero-ambiguity monospaced geometry optimized for rapid orderbook execution, slippage tolerances, and live price feeds.',
    archetype: 'THE QUANTUM MARKET MAKER',
    headingFallback: "'Space Mono', monospace",
    bodyFallback: "'Inter Tight', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Inter+Tight:wght@500;700&display=swap'
  },
  {
    id: 'montessori_preschool',
    words: ['montessori', 'preschool', 'kids', 'toddler', 'learning', 'toy', 'kindergarten', 'happy', 'fun', 'colorful', 'early'],
    name: 'Boogaloo Montessori',
    sample: 'Boogaloo<br/><i>Learn</i>',
    meta: 'WHIMSICAL GROOVY ROUNDED',
    pair: 'Quicksand',
    pairMeta: 'SOFT SANS / 15PX',
    rationale: 'Bouncy, joyful curves reminiscent of primary colored wooden blocks and organic early childhood exploration toys.',
    archetype: 'THE MONTESSORI EDUCATOR',
    headingFallback: "'Boogaloo', cursive",
    bodyFallback: "'Quicksand', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Boogaloo&family=Quicksand:wght@500;700&display=swap'
  },
  {
    id: 'aerodynamic_superbike',
    words: ['motorcycle', 'superbike', 'racing', 'carbon', 'torque', 'speed', 'velocity', 'titanium', 'aero', 'track', 'supercar'],
    name: 'Michroma Velocity Superbike',
    sample: 'Michroma<br/><i>Velocity</i>',
    meta: 'WIDE AERODYNAMIC GEOMETRIC',
    pair: 'Exo 2',
    pairMeta: 'FUTURISTIC SANS / 15PX',
    rationale: 'Wind-tunnel tested horizontal width and sharp stance engineered for telemetry readouts on 200mph track day superbikes.',
    archetype: 'THE APEX RACER',
    headingFallback: "'Michroma', sans-serif",
    bodyFallback: "'Exo 2', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Michroma&family=Exo+2:wght@500;700&display=swap'
  },
  {
    id: 'vinyl_jazz_lounge',
    words: ['jazz', 'vinyl', 'sax', 'lounge', 'whiskey', 'smoky', 'record', 'analog', 'acoustic', 'club', 'noir', 'moody'],
    name: 'Prata Vinyl Jazz',
    sample: 'Prata<br/><i>Blue Note</i>',
    meta: 'HIGH-CONTRAST DIDONE SERIF',
    pair: 'DM Mono',
    pairMeta: 'ANALOG MONO / 14PX',
    rationale: 'Elegant high-contrast teardrop terminals echoing legendary 1960s jazz album typography, smoky cocktail bars, and warm analog tape.',
    archetype: 'THE BLUE NOTE AUDIOPHILE',
    headingFallback: "'Prata', serif",
    bodyFallback: "'DM Mono', monospace",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Prata&family=DM+Mono:wght@400;500&display=swap'
  },
  {
    id: 'kyoto_ceremonial_matcha',
    words: ['matcha', 'kyoto', 'tea', 'ceremony', 'chasen', 'bamboo', 'mindful', 'zen', 'green', 'japanese', 'tranquility', 'ritual'],
    name: 'Shippori Matcha Ceremony',
    sample: 'Shippori<br/><i>Ceremony</i>',
    meta: 'TRADITIONAL JAPANESE MINCHO SERIF',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'CLEAN SANS / 14PX',
    rationale: 'Graceful brushed strokes and serene pacing reflecting centuries-old Kyoto tea ceremonies, bamboo whisks, and tranquil stone gardens.',
    archetype: 'THE MATCHA MASTER',
    headingFallback: "'Shippori Mincho', serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&family=Plus+Jakarta+Sans:wght@400;600&display=swap'
  },
  {
    id: 'risograph_zine_art',
    words: ['risograph', 'zine', 'diy', 'photocopy', 'glitch', 'punk', 'poster', 'printmaking', 'ink', 'anarchy', 'fanzine'],
    name: 'Rubik Glitch Zine',
    sample: 'Rubik<br/><i>Glitch</i>',
    meta: 'CORRUPTED DIGITAL DISPLAY',
    pair: 'Space Grotesk',
    pairMeta: 'RAW GROTESK / 15PX',
    rationale: 'Deliberate digital artifacts and printhead degradation celebrating underground DIY zines, photocopier distortion, and rebel art.',
    archetype: 'THE RISOGRAPH REBEL',
    headingFallback: "'Rubik Glitch', system-ui",
    bodyFallback: "'Space Grotesk', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Rubik+Glitch&family=Space+Grotesk:wght@400;600&display=swap'
  },
  {
    id: 'scandinavian_interior',
    words: ['interior', 'furniture', 'nordic', 'scandinavian', 'chair', 'table', 'design', 'home', 'decor', 'oak', 'lighting', 'minimal'],
    name: 'Sora Nordic Living',
    sample: 'Sora<br/><i>Interior</i>',
    meta: 'WARM GEOMETRIC GROTESK',
    pair: 'Lora',
    pairMeta: 'LITERARY SERIF / 15PX',
    rationale: 'Generous optical proportions and natural curved joints echoing pale oak furniture, paper cord dining chairs, and warm Scandinavian living.',
    archetype: 'THE NORDIC INTERIORIST',
    headingFallback: "'Sora', sans-serif",
    bodyFallback: "'Lora', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Sora:wght@600;700;800&family=Lora:ital,wght@0,400;1,400&display=swap'
  },
  {
    id: 'sound_meditation_app',
    words: ['meditation', 'sound', 'frequency', 'breathe', 'app', 'calm', 'sleep', 'mindful', 'zen', 'relax', 'sanctuary', 'peace'],
    name: 'Urbanist Frequency App',
    sample: 'Urbanist<br/><i>Frequency</i>',
    meta: 'SERENE GEOMETRIC SANS',
    pair: 'Tenor Sans',
    pairMeta: 'FLARED SANS / 15PX',
    rationale: 'Pure geometric balance and soothing rhythm engineered for digital mindfulness sanctuaries, sound baths, and breathwork timers.',
    archetype: 'THE SOUND HEALER',
    headingFallback: "'Urbanist', sans-serif",
    bodyFallback: "'Tenor Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Urbanist:wght@500;700&family=Tenor+Sans&display=swap'
  },
  {
    id: 'artisan_chocolatier',
    words: ['chocolate', 'cacao', 'truffle', 'artisan', 'gourmet', 'bonbon', 'luxury', 'sweet', 'chocolatier', 'bean', 'gold'],
    name: 'Playfair SC Chocolatier',
    sample: 'Playfair<br/><i>Cacao</i>',
    meta: 'ROYAL SMALL-CAPS DIDONE',
    pair: 'Outfit',
    pairMeta: 'MODERN SANS / 14PX',
    rationale: 'Rich small-caps engraved titling tailored for single-origin bean-to-bar dark chocolate wrappers and gold-foil confection boxes.',
    archetype: 'THE MASTER CHOCOLATIER',
    headingFallback: "'Playfair Display SC', serif",
    bodyFallback: "'Outfit', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Playfair+Display+SC:wght@700;900&family=Outfit:wght@400;600&display=swap'
  },
  {
    id: 'deep_space_probe',
    words: ['space', 'probe', 'voyager', 'cosmos', 'satellite', 'propulsion', 'telemetry', 'deepspace', 'stellar', 'galaxy'],
    name: 'Chakra Petch Deep Space',
    sample: 'Chakra<br/><i>Deep Space</i>',
    meta: 'TECHNICAL TELEMETRY SANS',
    pair: 'Rajdhani',
    pairMeta: 'MISSION SANS / 15PX',
    rationale: 'Hard-edged precision telemetry typography engineered for interstellar communication arrays and automated satellite telemetry.',
    archetype: 'THE DEEP SPACE PIONEER',
    headingFallback: "'Chakra Petch', sans-serif",
    bodyFallback: "'Rajdhani', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@700;800&family=Rajdhani:wght@500;700&display=swap'
  },
  {
    id: 'neighborhood_chalkboard_cafe',
    words: ['cafe', 'coffee', 'chalkboard', 'cappuccino', 'latte', 'cozy', 'breakfast', 'neighborhood', 'pastry', 'friendly', 'morning'],
    name: 'Sacramento Chalkboard Cafe',
    sample: 'Sacramento<br/><i>Espresso</i>',
    meta: 'CASUAL MONOLINE SCRIPT',
    pair: 'DM Sans',
    pairMeta: 'WARM SANS / 15PX',
    rationale: 'Friendly hand-lettered monoline script reminiscent of morning chalkboard menus and the welcoming hum of your favorite local cafe.',
    archetype: 'THE NEIGHBORHOOD BARISTA',
    headingFallback: "'Sacramento', cursive",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Sacramento&family=DM+Sans:wght@400;500&display=swap'
  },
  {
    id: 'gothic_novel_mystery',
    words: ['novel', 'gothic', 'mystery', 'thriller', 'manor', 'shadow', 'story', 'author', 'fiction', 'curse', 'manuscript'],
    name: 'Almendra Manor Mystery',
    sample: 'Almendra<br/><i>Mystery</i>',
    meta: 'MYSTICAL CHANCERY SERIF',
    pair: 'Crimson Pro',
    pairMeta: 'WARM SERIF / 15PX',
    rationale: 'Chancery calligraphic hooks and medieval mystery engineered for gothic novel book jackets, fantasy sagas, and mysterious manor lore.',
    archetype: 'THE GOTHIC NOVELIST',
    headingFallback: "'Almendra Display', serif",
    bodyFallback: "'Crimson Pro', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Almendra+Display&family=Crimson+Pro:ital,wght@0,400;1,400&display=swap'
  },
  {
    id: 'skate_streetwear_bold',
    words: ['skate', 'streetwear', 'stencil', 'military', 'urban', 'rebel', 'heavy', 'graffiti', 'apparel', 'drop', 'hoodie'],
    name: 'Black Ops Heavy Stencil',
    sample: 'Black Ops<br/><i>Street</i>',
    meta: 'HEAVY MILITARY STENCIL',
    pair: 'Space Grotesk',
    pairMeta: 'URBAN GROTESK / 15PX',
    rationale: 'Brutal industrial stencil cutouts delivering instant subcultural power on skateboards, drop apparel, and high-impact poster runs.',
    archetype: 'THE SUBVERSIVE SKATER',
    headingFallback: "'Black Ops One', system-ui",
    bodyFallback: "'Space Grotesk', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Black+Ops+One&family=Space+Grotesk:wght@400;600&display=swap'
  },
  {
    id: 'organic_olive_oil',
    words: ['olive', 'oil', 'tuscany', 'harvest', 'mediterranean', 'organic', 'estate', 'farm', 'gourmet', 'culinary', 'extra-virgin'],
    name: 'Italiana Tuscan Olive',
    sample: 'Italiana<br/><i>Tuscan</i>',
    meta: 'MEDITERRANEAN DIDONE',
    pair: 'DM Sans',
    pairMeta: 'CLEAN SANS / 15PX',
    rationale: 'Sunlit Mediterranean elegance inspired by Italian estate bottling, rolling Tuscan olive groves, and extra-virgin culinary traditions.',
    archetype: 'THE TUSCAN ESTATE',
    headingFallback: "'Italiana', serif",
    bodyFallback: "'DM Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Italiana&family=DM+Sans:wght@400;500&display=swap'
  },
  {
    id: 'indie_record_label',
    words: ['indie', 'label', 'record', 'experimental', 'underground', 'synth', 'cassette', 'tape', 'artist', 'avant-garde', 'sound'],
    name: 'Major Mono Experimental',
    sample: 'Major Mono<br/><i>Experimental</i>',
    meta: 'AVANT-GARDE GEOMETRIC MONOSPACE',
    pair: 'Inter',
    pairMeta: 'CLEAN SANS / 14PX',
    rationale: 'Asymmetrical uppercase and lowercase glyph collisions designed for underground cassette sleeves, synth labels, and sound art catalogs.',
    archetype: 'THE AVANT-GARDE PRODUCER',
    headingFallback: "'Major Mono Display', monospace",
    bodyFallback: "'Inter', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Major+Mono+Display&family=Inter:wght@400;600&display=swap'
  },
  {
    id: 'vintage_florist_botanical',
    words: ['florist', 'flower', 'bouquet', 'botanical', 'wedding', 'petal', 'rose', 'peony', 'bloom', 'fragrant', 'romantic'],
    name: 'Pinyon Script Florist',
    sample: 'Pinyon<br/><i>Botanical</i>',
    meta: 'FLOURISHED VICTORIAN SCRIPT',
    pair: 'Playfair Display',
    pairMeta: 'ROMANTIC SERIF / 15PX',
    rationale: 'Sweeping French-calligraphy flourishes crafted for high-end boutique florists, wedding floral arrangements, and botanical packaging.',
    archetype: 'THE BOTANICAL FLORIST',
    headingFallback: "'Pinyon Script', cursive",
    bodyFallback: "'Playfair Display', serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Playfair+Display:ital,wght@0,400;1,400&display=swap'
  }
]

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

// Data Profile Builder (Reduces duplication)
function buildProfile(p) {
  const cssImport = `@import url('${p.googleFontsUrl}');`
  const cssVars = `:root {\n  --font-heading: '${p.name}', ${p.headingFallback};\n  --font-body: '${p.pair}', ${p.bodyFallback};\n}`

  // Tailwind expects each family as a quoted string. Generics (serif, sans-serif,
  // monospace, cursive, system-ui, etc.) are CSS keywords and stay unquoted.
  const GENERICS = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace'])
  const toTailwindFamily = (raw) => {
    const s = raw.trim().replace(/^['"]|['"]$/g, '')
    if (GENERICS.has(s.toLowerCase())) return s  // CSS generic keywords stay unquoted
    return `'${JSON.stringify(s).slice(1, -1)}'` // named fonts wrap in single quotes
  }
  const tailwindFamilies = (fallback) => fallback.split(',').map(toTailwindFamily).join(', ')

  const tailwind = `fontFamily: {\n  heading: [${tailwindFamilies(p.name)}, ${tailwindFamilies(p.headingFallback)}],\n  body: [${tailwindFamilies(p.pair)}, ${tailwindFamilies(p.bodyFallback)}]\n}`

  return { ...p, cssImport, cssVars, tailwind }
}

// Client-Side Intelligent Semantic Vibe Matcher Engine (Fallback & Instant Analysis)
function matchProfileLocally(promptText) {
  const stopWords = new Set([
    'a', 'an', 'the', 'and', 'or', 'for', 'with', 'in', 'on', 'at', 'to', 'of', 'by',
    'from', 'my', 'your', 'our', 'is', 'are', 'was', 'be', 'brand', 'app', 'website',
    'design', 'project', 'platform', 'company', 'startup', 'theme', 'look', 'style', 'like',
    'font', 'fonts', 'typography', 'type'
  ])

  const rawTokens = promptText
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((token) => token.length > 1 && !stopWords.has(token))

  let bestProfile = profiles[0]
  let maxScore = -1

  for (const p of profiles) {
    let score = 0
    const pWords = p.words || []
    const pId = p.id.toLowerCase()
    const pName = p.name.toLowerCase()
    const pMeta = (p.meta || '').toLowerCase()
    const pArchetype = (p.archetype || '').toLowerCase()
    const pRationale = (p.rationale || '').toLowerCase()

    for (const token of rawTokens) {
      if (pWords.includes(token)) score += 6
      else if (pWords.some((w) => w.includes(token) || token.includes(w))) score += 3
      if (pId.includes(token)) score += 5
      if (pArchetype.includes(token)) score += 4
      if (pMeta.includes(token)) score += 3
      if (pName.includes(token)) score += 2
      if (pRationale.includes(token)) score += 1
    }

    if (score > maxScore) {
      maxScore = score
      bestProfile = p
    }
  }

  const confidence = maxScore > 0 ? Math.min(0.98, Math.max(0.68, 0.6 + maxScore * 0.04)) : 0.75
  const tags = rawTokens.slice(0, 4).map((t) => t.toUpperCase())
  if (!tags.length && bestProfile.words?.length) {
    tags.push(...bestProfile.words.slice(0, 3).map((w) => w.toUpperCase()))
  }

  return {
    profile: bestProfile,
    confidence,
    tags
  }
}

// Client-side Memory Cache for Instant <1ms repeated lookups
const clientRecommendationCache = new Map()

// Gemini recommendation client with Resilient Local Semantic Fallback & Instant Cache
const RECOMMENDATION_ENDPOINT = '/api/recommend'

async function recommendProfile(promptText) {
  const cacheKey = promptText.trim().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ')
  if (clientRecommendationCache.has(cacheKey)) {
    return clientRecommendationCache.get(cacheKey)
  }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)
    const response = await fetch(RECOMMENDATION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: promptText.trim().slice(0, 1500),
        profiles: profiles.map(({ id, name, meta, archetype, rationale, words }) => ({ id, name, meta, archetype, rationale, words }))
      }),
      signal: controller.signal
    }).finally(() => clearTimeout(timeout))

    const payload = await response.json().catch(() => ({}))
    if (response.ok && payload.profileId) {
      const profile = profiles.find((candidate) => candidate.id === payload.profileId)
      if (profile) {
        const result = { profile, aiResult: payload }
        clientRecommendationCache.set(cacheKey, result)
        return result
      }
    }
    console.warn('Gemini API response unfulfilled, activating local semantic vibe engine:', payload?.error)
  } catch (err) {
    console.warn('Gemini network/endpoint fallback triggered:', err?.message || err)
  }

  // Graceful Local Semantic Engine Fallback
  const fallbackMatch = matchProfileLocally(promptText)
  const result = {
    profile: fallbackMatch.profile,
    aiResult: {
      profileId: fallbackMatch.profile.id,
      confidence: fallbackMatch.confidence,
      rationale: fallbackMatch.profile.rationale,
      tags: fallbackMatch.tags
    }
  }
  clientRecommendationCache.set(cacheKey, result)
  return result
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

// Componentized State
const state = {
  activeProfile: null,
  listeners: [],
  setActiveProfile(profile, { updateUrl = true, aiResult = null } = {}) {
    this.activeProfile = { ...buildProfile(profile), aiResult };
    this.notify();
    
    // URL Persistence
    const url = new URL(window.location);
    const currentVibe = url.searchParams.get('vibe');
    url.searchParams.set('vibe', profile.id);
    if (updateUrl && currentVibe !== profile.id) window.history.pushState({}, '', url);
  },
  subscribe(listener) {
    this.listeners.push(listener);
  },
  notify() {
    this.listeners.forEach(listener => listener(this.activeProfile));
  }
};

function getShareUrl() {
  const url = new URL(window.location.href)
  if (state.activeProfile) url.searchParams.set("vibe", state.activeProfile.id)
  return url.toString()
}
shareBtn.addEventListener("click", (event) => {
  copyToClipboard(getShareUrl(), event.currentTarget)
})
window.addEventListener("popstate", () => {
  const vibeId = new URLSearchParams(window.location.search).get("vibe")
  const profile = profiles.find((candidate) => candidate.id === vibeId)
  if (profile && state.activeProfile?.id !== profile.id) state.setActiveProfile(profile, { updateUrl: false })
})
// Interactive Specimen State for Type Lab
const specimenState = {
  text: 'The quick brown fox jumps over the lazy dog',
  fontSize: 56,
  isBold: false,
  isItalic: false,
  isUppercase: false,
  color: '#121212'
}

function renderSpecimenContent() {
  const content = specimenState.text.trim() || 'Type something to preview...'
  if (testerPreview) {
    testerPreview.textContent = content
  }
}

function applySpecimenStyles() {
  if (testerPreview) {
    testerPreview.style.fontSize = `${specimenState.fontSize}px`
    testerPreview.style.fontWeight = specimenState.isBold ? '700' : '400'
    testerPreview.style.fontStyle = specimenState.isItalic ? 'italic' : 'normal'
    testerPreview.style.textTransform = specimenState.isUppercase ? 'uppercase' : 'none'
    testerPreview.style.color = specimenState.color
    testerPreview.style.setProperty('--specimen-color', specimenState.color)
  }
}

function setSpecimenColor(color, isCustom = false) {
  specimenState.color = color
  applySpecimenStyles()

  colorSwatches.forEach(swatch => {
    const match = !isCustom && swatch.dataset.color.toLowerCase() === color.toLowerCase()
    swatch.classList.toggle('active', match)
    swatch.setAttribute('aria-checked', String(match))
  })

  if (customColorWrapper) {
    customColorWrapper.classList.toggle('active', isCustom)
  }
  if (customColorPreview) {
    customColorPreview.style.backgroundColor = color
  }
  if (specimenColorPicker && specimenColorPicker.value !== color) {
    specimenColorPicker.value = color
  }
}

// Render DOM on State Change
state.subscribe((profile) => {
  const aiResult = profile.aiResult
  loadGoogleFont(profile.googleFontsUrl)
  displayName.textContent = profile.name
  displaySample.innerHTML = profile.sample

  if (activeFontBadge) {
    activeFontBadge.textContent = profile.name
  }
  
  if (profile.headingFallback) {
    displaySample.style.fontFamily = profile.headingFallback
    displayName.style.fontFamily = profile.headingFallback
    if (testerPreview) testerPreview.style.fontFamily = profile.headingFallback
  }
  if (profile.bodyFallback) pairName.style.fontFamily = profile.bodyFallback

  renderSpecimenContent()
  applySpecimenStyles()

  displayMeta.textContent = aiResult?.tags?.length
    ? `${profile.meta} · ${aiResult.tags.join(' · ').toUpperCase()}`
    : profile.meta
  pairName.textContent = profile.pair
  pairMeta.textContent = profile.pairMeta
  rationale.textContent = aiResult?.rationale || profile.rationale
  archetype.textContent = profile.archetype
  recommendationStatus.textContent = aiResult
    ? `${profile.name} selected by Gemini. ${aiResult.rationale}`
    : `${profile.name} selected. ${profile.rationale}`

  // Font licensing disclaimer verification
  const disclaimer = document.getElementById('licenseDisclaimer')
  const fallbackFamily = profile.headingFallback.split(',')[0].replace(/['"]/g, '').trim()
  if (profile.name.toLowerCase() !== fallbackFamily.toLowerCase()) {
    disclaimer.textContent = `Preview rendered using free fallback: ${fallbackFamily}`
    disclaimer.style.display = 'block'
  } else {
    disclaimer.style.display = 'none'
  }
})
// Initialization
function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const vibeId = urlParams.get('vibe');
  const targetProfile = profiles.find(p => p.id === vibeId) || profiles[Math.floor(Math.random() * profiles.length)];
  state.setActiveProfile(targetProfile);
}

async function updateRecommendation() {
  const prompt = brief.value.trim()
  if (!prompt) {
    showToast('Describe your project first.')
    brief.focus()
    return
  }
  analyse.disabled = true
  analyse.classList.add('loading')
  analyse.innerHTML = 'ASKING GEMINI <span>◌</span>'
  try {
    const recommendation = await recommendProfile(prompt)
    state.setActiveProfile(recommendation.profile, { aiResult: recommendation.aiResult })
    document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (error) {
    console.error('Gemini recommendation failed:', error)
    recommendationStatus.textContent = `Gemini recommendation failed. ${error.message}`
    showToast(error.message || 'Gemini recommendation failed.')
  } finally {
    analyse.disabled = false
    analyse.classList.remove('loading')
    analyse.innerHTML = 'ANALYSE <span>→</span>'
  }
}

brief.addEventListener('input', () => {
  brief.style.height = 'auto'
  brief.style.height = brief.scrollHeight + 'px'
})

brief.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault()
    updateRecommendation()
  }
})

analyse.addEventListener('click', updateRecommendation)

// Specimen Customizer Handlers in Type Lab
if (specimenTextInput) {
  specimenTextInput.addEventListener('input', (e) => {
    specimenState.text = e.target.value
    renderSpecimenContent()
  })
}

if (clearSpecimenText) {
  clearSpecimenText.addEventListener('click', () => {
    specimenState.text = ''
    if (specimenTextInput) specimenTextInput.value = ''
    renderSpecimenContent()
    if (specimenTextInput) specimenTextInput.focus()
  })
}

const dummyPresets = {
  pangram: 'The quick brown fox jumps over the lazy dog',
  headline: 'Design with intention, build with character.',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789 — $1,999.00 (50% OFF) & #@?!',
  paragraph: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.'
}

specimenPresetChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const presetKey = chip.dataset.preset
    if (dummyPresets[presetKey]) {
      specimenState.text = dummyPresets[presetKey]
      if (specimenTextInput) specimenTextInput.value = dummyPresets[presetKey]
      renderSpecimenContent()
    }
  })
})

if (fontSizeSlider) {
  fontSizeSlider.addEventListener('input', (e) => {
    specimenState.fontSize = Number(e.target.value)
    if (fontSizeVal) fontSizeVal.textContent = `${specimenState.fontSize}px`
    applySpecimenStyles()
  })
}

if (toggleCase) {
  toggleCase.addEventListener('click', () => {
    specimenState.isUppercase = !specimenState.isUppercase
    toggleCase.classList.toggle('active', specimenState.isUppercase)
    toggleCase.setAttribute('aria-pressed', String(specimenState.isUppercase))
    applySpecimenStyles()
  })
}

if (toggleItalic) {
  toggleItalic.addEventListener('click', () => {
    specimenState.isItalic = !specimenState.isItalic
    toggleItalic.classList.toggle('active', specimenState.isItalic)
    toggleItalic.setAttribute('aria-pressed', String(specimenState.isItalic))
    applySpecimenStyles()
  })
}

if (toggleBold) {
  toggleBold.addEventListener('click', () => {
    specimenState.isBold = !specimenState.isBold
    toggleBold.classList.toggle('active', specimenState.isBold)
    toggleBold.setAttribute('aria-pressed', String(specimenState.isBold))
    applySpecimenStyles()
  })
}

// Color Selector Handlers
colorSwatches.forEach(swatch => {
  swatch.addEventListener('click', () => {
    const color = swatch.dataset.color
    if (color) setSpecimenColor(color, false)
  })
})

if (specimenColorPicker) {
  specimenColorPicker.addEventListener('input', (e) => {
    setSpecimenColor(e.target.value, true)
  })
}

// Developer Code Exporter Handlers
copyCssBtn.addEventListener('click', (e) => {
  copyToClipboard(state.activeProfile.cssImport + '\n\n' + state.activeProfile.cssVars, e.currentTarget)
})

copyTailwindBtn.addEventListener('click', (e) => {
  copyToClipboard(state.activeProfile.tailwind, e.currentTarget)
})

copyGoogleFontsBtn.addEventListener('click', (e) => {
  copyToClipboard(state.activeProfile.googleFontsUrl, e.currentTarget)
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

// Font Shelf wiring
document.querySelectorAll('.shelf-item').forEach((item) => {
  const handler = () => {
    const pid = item.dataset.profileId;
    const p = profiles.find(p => p.id === pid);
    if (p) {
      state.setActiveProfile(p);
      document.getElementById('results').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
  item.addEventListener('click', handler);
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handler();
    }
  });
});

// Interactive Typography Sculpture Controller
(function initTypographySculpture() {
  const sculptureSpans = document.querySelectorAll('.sculpture-row span')
  if (!sculptureSpans.length) return

  const fontChoices = [
    "'Anybody', sans-serif",
    "'Bricolage Grotesque', sans-serif",
    "'Fraunces', serif",
    "'Instrument Serif', serif",
    "'Space Grotesk', sans-serif",
    "'Syne', sans-serif",
    "'Unbounded', sans-serif"
  ]

  sculptureSpans.forEach((span) => {
    span.setAttribute('role', 'button')
    span.setAttribute('tabindex', '0')
    span.setAttribute('aria-label', `Randomize ${span.textContent} type preview`)
    span.style.fontFamily = fontChoices[Math.floor(Math.random() * fontChoices.length)]
    
    const handleActivate = () => {
      span.style.fontFamily = fontChoices[Math.floor(Math.random() * fontChoices.length)]
      const rot = (Math.random() * 14 - 7).toFixed(1)
      span.style.transform = `scale(1.25) rotate(${rot}deg)`
      setTimeout(() => {
        span.style.transform = `rotate(${rot}deg)`
      }, 250)
    }
    span.addEventListener('click', handleActivate)
    span.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        handleActivate()
      }
    })
  })
})()

// Google Fonts Live Explorer Controller
let currentSearchCategory = 'all'
let searchDebounceTimer = null
let currentFontResults = []
let activeDropdownIndex = -1

async function searchGoogleFonts(query = '', category = 'all') {
  try {
    const params = new URLSearchParams()
    if (query) params.set('query', query)
    if (category && category !== 'all') params.set('category', category)
    params.set('limit', '250')

    const res = await fetch(`/api/fonts?${params.toString()}`)
    if (!res.ok) throw new Error('Failed to query fonts')
    const data = await res.json()
    return data.fonts || []
  } catch (err) {
    console.warn('Error fetching fonts from API:', err)
    return []
  }
}

function renderFontSearchResults(fonts) {
  currentFontResults = fonts
  activeDropdownIndex = -1
  if (!fontResultsList) return
  fontResultsList.innerHTML = ''

  if (!fonts.length) {
    fontResultsCount.textContent = 'No matching Google Fonts found'
    fontSearchDropdown.style.display = 'block'
    return
  }

  fontResultsCount.textContent = `${fonts.length} Google Font${fonts.length > 1 ? 's' : ''} available`

  fonts.forEach((font, idx) => {
    const li = document.createElement('li')
    li.className = 'font-result-item'
    li.dataset.index = idx
    li.dataset.family = font.family
    li.dataset.category = font.category

    li.innerHTML = `
      <div class="font-result-info">
        <span class="font-result-name" style="font-family: '${font.family}', sans-serif;">${font.family}</span>
        <span class="font-result-category">${font.category}</span>
      </div>
      <span class="font-result-badge">PREVIEW →</span>
    `

    li.addEventListener('click', () => {
      selectGoogleFont(font)
    })

    fontResultsList.appendChild(li)
  })

  fontSearchDropdown.style.display = 'block'
}

function selectGoogleFont(font) {
  const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(font.family).replace(/%20/g, '+')}:ital,wght@0,400;0,600;0,700;1,400&display=swap`
  loadGoogleFont(fontUrl)

  const fallback = font.category === 'serif' ? 'serif' : font.category === 'monospace' ? 'monospace' : font.category === 'handwriting' ? 'cursive' : 'sans-serif'

  // Create a customized profile for state
  const dynamicProfile = {
    id: `gfont_${font.family.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
    name: font.family,
    sample: `${font.family}<br/><i>Specimen</i>`,
    meta: `${font.category.toUpperCase()} / GOOGLE FONT`,
    pair: font.category === 'serif' ? 'Inter' : 'Newsreader',
    pairMeta: font.category === 'serif' ? 'SANS / 14PX' : 'SERIF / 15PX',
    rationale: `Directly loaded from the live Google Fonts catalog (${font.category}). Excellent typographical balance with versatile weights.`,
    archetype: `GOOGLE FONT EXPLORER: ${font.family.toUpperCase()}`,
    headingFallback: `'${font.family}', ${fallback}`,
    bodyFallback: font.category === 'serif' ? "'Inter', sans-serif" : "'Newsreader', serif",
    googleFontsUrl: fontUrl
  }

  state.setActiveProfile(dynamicProfile, { updateUrl: false })
  if (fontSearchDropdown) fontSearchDropdown.style.display = 'none'
  if (fontSearchInput) fontSearchInput.value = font.family
  if (clearFontSearch) clearFontSearch.style.display = 'inline-flex'
  showToast(`✓ Loaded Google Font: ${font.family}`)
}

if (fontSearchInput) {
  const triggerSearch = () => {
    const q = fontSearchInput.value.trim()
    if (clearFontSearch) clearFontSearch.style.display = q ? 'inline-flex' : 'none'
    clearTimeout(searchDebounceTimer)
    searchDebounceTimer = setTimeout(async () => {
      const fonts = await searchGoogleFonts(q, currentSearchCategory)
      renderFontSearchResults(fonts)
    }, 150)
  }

  fontSearchInput.addEventListener('input', triggerSearch)
  fontSearchInput.addEventListener('focus', triggerSearch)

  fontSearchInput.addEventListener('keydown', (e) => {
    if (!fontSearchDropdown || fontSearchDropdown.style.display === 'none') return

    const items = fontResultsList.querySelectorAll('.font-result-item')
    if (!items.length) return

    if (e.key === 'ArrowDown') {
      e.preventDefault()
      activeDropdownIndex = Math.min(items.length - 1, activeDropdownIndex + 1)
      items.forEach((item, i) => item.classList.toggle('selected', i === activeDropdownIndex))
      if (items[activeDropdownIndex]) items[activeDropdownIndex].scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      activeDropdownIndex = Math.max(0, activeDropdownIndex - 1)
      items.forEach((item, i) => item.classList.toggle('selected', i === activeDropdownIndex))
      if (items[activeDropdownIndex]) items[activeDropdownIndex].scrollIntoView({ block: 'nearest' })
    } else if (e.key === 'Enter') {
      if (activeDropdownIndex >= 0 && currentFontResults[activeDropdownIndex]) {
        e.preventDefault()
        selectGoogleFont(currentFontResults[activeDropdownIndex])
      }
    } else if (e.key === 'Escape') {
      fontSearchDropdown.style.display = 'none'
    }
  })
}

if (clearFontSearch) {
  clearFontSearch.addEventListener('click', () => {
    fontSearchInput.value = ''
    clearFontSearch.style.display = 'none'
    if (fontSearchDropdown) fontSearchDropdown.style.display = 'none'
    fontSearchInput.focus()
  })
}

categoryFilterBtns.forEach((btn) => {
  btn.addEventListener('click', async () => {
    categoryFilterBtns.forEach((b) => {
      b.classList.remove('active')
      b.setAttribute('aria-checked', 'false')
    })
    btn.classList.add('active')
    btn.setAttribute('aria-checked', 'true')
    currentSearchCategory = btn.dataset.category || 'all'
    const q = fontSearchInput ? fontSearchInput.value.trim() : ''
    const fonts = await searchGoogleFonts(q, currentSearchCategory)
    renderFontSearchResults(fonts)
  })
})

// Close dropdown on outside click
document.addEventListener('click', (e) => {
  const explorer = document.querySelector('.font-explorer-section')
  if (explorer && !explorer.contains(e.target)) {
    if (fontSearchDropdown) fontSearchDropdown.style.display = 'none'
  }
})

init();
export { profiles, buildProfile };

