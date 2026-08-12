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

// Specimen Control Handles
const specimenTextInput = $('#specimenTextInput')
const fontSizeSlider = $('#fontSizeSlider')
const fontSizeVal = $('#fontSizeVal')
const toggleCase = $('#toggleCase')
const toggleItalic = $('#toggleItalic')

const toggleBold = $('#toggleBold')
// Export Handles
const copyCssBtn = $('#copyCssBtn')
const copyTailwindBtn = $('#copyTailwindBtn')
const copyGoogleFontsBtn = $('#copyGoogleFontsBtn')
const shareBtn = $("#shareBtn")
const recommendationStatus = $("#recommendationStatus")
const aiMatchMeta = $("#aiMatchMeta")


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
    id: 'modern_fashion',
    words: ['haute', 'couture', 'glamour', 'runway', 'vogue', 'italiana', 'paris', 'milan', 'couture'],
    name: 'Italiana Couture',
    sample: 'Italiana<br/><i>Couture</i>',
    meta: 'HIGH-CONTRAST DIDONE',
    pair: 'Plus Jakarta Sans',
    pairMeta: 'CLEAN SANS / 15PX',
    rationale: 'Graceful calligraphic proportions inspired by Italian newspaper typography, radiating high-fashion luxury.',
    archetype: 'THE MILAN STYLIST',
    headingFallback: "'Italiana', serif",
    bodyFallback: "'Plus Jakarta Sans', sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Italiana&family=Plus+Jakarta+Sans:wght@400;600&display=swap'
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

// Gemini recommendation client
const RECOMMENDATION_ENDPOINT = '/api/recommend'

async function recommendProfile(promptText) {
  const response = await fetch(RECOMMENDATION_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: promptText.trim().slice(0, 1200),
      profiles: profiles.map(({ id, name, meta, archetype, rationale, words }) => ({ id, name, meta, archetype, rationale, words }))
    })
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) throw new Error(payload.error || 'Gemini could not complete the recommendation.')
  const profile = profiles.find((candidate) => candidate.id === payload.profileId)
  if (!profile) throw new Error('Gemini returned an unknown recommendation.')
  return { profile, aiResult: payload }
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
// Render DOM on State Change
state.subscribe((profile) => {
  const aiResult = profile.aiResult
  loadGoogleFont(profile.googleFontsUrl)
  displayName.textContent = profile.name
  displaySample.innerHTML = profile.sample
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
  if (aiResult) {
    const confidence = Math.round((aiResult.confidence || 0) * 100)
    aiMatchMeta.textContent = `GEMINI MATCH ${confidence}%${aiResult.tags?.length ? ` · ${aiResult.tags.join(' / ').toUpperCase()}` : ''}`
    aiMatchMeta.style.display = 'block'
  } else {
    aiMatchMeta.textContent = ''
    aiMatchMeta.style.display = 'none'
  }

  // Font licensing disclaimer verification
  const disclaimer = document.getElementById('licenseDisclaimer')
  const fallbackFamily = profile.headingFallback.split(',')[0].replace(/['"]/g, '').trim()
  if (profile.name.toLowerCase() !== fallbackFamily.toLowerCase()) {
    disclaimer.textContent = `Preview rendered using free fallback: ${fallbackFamily}`
    disclaimer.style.display = 'block'
  } else {
    disclaimer.style.display = 'none'
  }
  if (profile.headingFallback) {
    displaySample.style.fontFamily = profile.headingFallback
    displayName.style.fontFamily = profile.headingFallback
    specimenTextInput.style.fontFamily = profile.headingFallback
  }
  if (profile.bodyFallback) pairName.style.fontFamily = profile.bodyFallback
  specimenTextInput.value = profile.sample.replaceAll('<br/>', ' ').replaceAll('<br>', ' ').replace(/<[^>]+>/g, '')
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
    await new Promise((resolve) => setTimeout(resolve, 480))
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

// Specimen Customizer Handlers
specimenTextInput.addEventListener('input', (e) => {
  const val = e.target.value.trim()
  if (val) {
    displaySample.textContent = val
  } else {
    displaySample.innerHTML = state.activeProfile.sample
  }
})

fontSizeSlider.addEventListener('input', (e) => {
  const size = e.target.value
  fontSizeVal.textContent = `${size}px`
  displaySample.style.fontSize = `${size}px`
})
toggleCase.addEventListener('click', () => {
  const isActive = toggleCase.classList.toggle('active')
  const transform = isActive ? 'uppercase' : 'none'
  displaySample.style.textTransform = transform
  specimenTextInput.style.textTransform = transform
  toggleCase.setAttribute('aria-pressed', String(isActive))
})

toggleItalic.addEventListener('click', () => {
  const isActive = toggleItalic.classList.toggle('active')
  const style = isActive ? 'italic' : 'normal'
  displaySample.style.fontStyle = style
  specimenTextInput.style.fontStyle = style
  toggleItalic.setAttribute('aria-pressed', String(isActive))
})

toggleBold.addEventListener('click', () => {
  const isActive = toggleBold.classList.toggle('active')
  const weight = isActive ? '700' : '400'
  displaySample.style.fontWeight = weight
  specimenTextInput.style.fontWeight = weight
  toggleBold.setAttribute('aria-pressed', String(isActive))
})

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

init();
export { profiles, buildProfile };
