import './style.css'
import { inject } from '@vercel/analytics'
import { profiles } from '../shared/profiles.js'
import { isGibberishPrompt } from '../shared/gibberish.js'

inject()

const $ = (selector) => document.querySelector(selector)

// UI Element Handles
const brief = $('#brief')
const displayName = $('#displayName')
const displaySample = $('#displaySample')
const displayMeta = $('#displayMeta')
const pairName = $('#pairName')
const pairMeta = $('#pairMeta')
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
const openGoogleFontsBtn = $('#openGoogleFontsBtn')
const recommendationStatus = $("#recommendationStatus")


// Dynamic Google Font Loader: one <link> per stylesheet URL.
// (Re-pointing a single shared <link> unloads the previous fonts, which made
// revisited profiles silently render in the system fallback font.)
const loadedFontUrls = new Set()
function loadGoogleFont(url) {
  if (!url || loadedFontUrls.has(url)) return
  const link = document.createElement('link')
  link.rel = 'stylesheet'
  link.href = url
  link.dataset.fontally = 'profile-font'
  document.head.appendChild(link)
  loadedFontUrls.add(url)
}

// First family in a CSS font-family stack, unquoted: "'Inter', sans-serif" -> "Inter"
function primaryFamily(stack, fallback) {
  const first = String(stack || '').split(',')[0].replace(/['"]/g, '').trim()
  return first || fallback
}

// Data Profile Builder (Reduces duplication)
function buildProfile(p) {
  // `name`/`pair` are editorial labels (some are commercial or invented names).
  // Everything the user copies must reference the real, free Google Fonts families.
  const headingFamily = primaryFamily(p.headingFallback, p.name)
  const bodyFamily = primaryFamily(p.bodyFallback, p.pair)
  const cssImport = `@import url('${p.googleFontsUrl}');`
  const cssVars = `:root {\n  --font-heading: ${p.headingFallback};\n  --font-body: ${p.bodyFallback};\n}`

  // Tailwind expects each family as a quoted string. Generics (serif, sans-serif,
  // monospace, cursive, system-ui, etc.) are CSS keywords and stay unquoted.
  const GENERICS = new Set(['serif', 'sans-serif', 'monospace', 'cursive', 'fantasy', 'system-ui', 'ui-serif', 'ui-sans-serif', 'ui-monospace'])
  const toTailwindFamily = (raw) => {
    const s = raw.trim().replace(/^['"]|['"]$/g, '')
    if (GENERICS.has(s.toLowerCase())) return s  // CSS generic keywords stay unquoted
    return `'${JSON.stringify(s).slice(1, -1)}'` // named fonts wrap in single quotes
  }
  const tailwindFamilies = (fallback) => fallback.split(',').map(toTailwindFamily).join(', ')

  const tailwind = `fontFamily: {\n  heading: [${tailwindFamilies(p.headingFallback)}],\n  body: [${tailwindFamilies(p.bodyFallback)}]\n}`

  return { ...p, headingFamily, bodyFamily, cssImport, cssVars, tailwind }
}

// Client-Side Intelligent Semantic Vibe Matcher Engine (Fallback & Instant Analysis)
function matchProfileLocally(promptText) {
  if (isGibberishPrompt(promptText)) {
    return { error: 'The input appears to be random characters or gibberish. Please describe your project, brand, or desired aesthetic vibe (e.g., "cyberpunk gaming studio", "warm artisan bakery").' }
  }

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

  if (!rawTokens.length) {
    return { error: 'Please enter a more descriptive design brief.' }
  }

  let bestProfile = null
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
      // Direct font name exact match bonus (+25)
      if (pName.includes(token)) score += 25
      if (pWords.includes(token)) score += 8
      else if (pWords.some((w) => w.includes(token) || token.includes(w))) score += 4
      if (pId.includes(token)) score += 6
      if (pArchetype.includes(token)) score += 5
      if (pMeta.includes(token)) score += 4
      if (pRationale.includes(token)) score += 2
    }

    if (score > maxScore) {
      maxScore = score
      bestProfile = p
    }
  }

  // If absolutely no tokens matched any profile, return an error rather than random guess
  if (maxScore <= 0 || !bestProfile) {
    return {
      error: `No matching typography vibe found for "${promptText.slice(0, 40)}". Try describing your project with more descriptive style or mood words (e.g. "quiet luxury", "brutalist architecture", "retro diner").`
    }
  }

  const confidence = Math.min(0.98, Math.max(0.72, 0.65 + maxScore * 0.03))
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
let recommendationAbortController = null
let isAnalyzing = false

async function recommendProfile(promptText) {
  if (isGibberishPrompt(promptText)) {
    throw new Error('The input appears to be random characters or gibberish. Please describe your project, brand, or desired aesthetic vibe (e.g., "cyberpunk gaming studio", "warm artisan bakery").')
  }

  const cacheKey = promptText.trim().toLowerCase().replace(/[^\w\s]/g, '').replace(/\s+/g, ' ')
  if (clientRecommendationCache.has(cacheKey)) {
    return clientRecommendationCache.get(cacheKey)
  }

  // Cancel any previous in-flight recommendation request
  if (recommendationAbortController) {
    recommendationAbortController.abort()
  }
  recommendationAbortController = new AbortController()
  const controller = recommendationAbortController
  // Must be longer than the server's Gemini timeout (10s), otherwise the browser gives up
  // on requests the server would have answered and silently uses the offline matcher.
  const timeout = setTimeout(() => controller.abort(), 14000)

  try {
    // The server owns the profile catalog (shared/profiles.js); only the brief is sent.
    const response = await fetch(RECOMMENDATION_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt: promptText.trim().slice(0, 1500)
      }),
      signal: controller.signal
    }).finally(() => clearTimeout(timeout))

    const payload = await response.json().catch(() => ({}))

    // If server specifically returned 400 with validation error, do not silence it!
    if (!response.ok && response.status === 400 && payload?.error) {
      throw new Error(payload.error)
    }

    if (response.ok && payload.profileId) {
      const profile = profiles.find((candidate) => candidate.id === payload.profileId)
      if (profile) {
        const result = { profile, aiResult: { ...payload, source: 'gemini' } }
        clientRecommendationCache.set(cacheKey, result)
        return result
      }
    }
    console.warn('Gemini API response unfulfilled, activating local semantic vibe engine:', payload?.error)
  } catch (err) {
    if (err.name === 'AbortError' && recommendationAbortController !== controller) {
      throw err
    }
    // Re-throw our explicit validation errors (e.g., gibberish rejection)
    if (err.message && (err.message.includes('gibberish') || err.message.includes('random characters') || err.message.includes('design brief is required'))) {
      throw err
    }
    console.warn('Gemini network/endpoint fallback triggered:', err?.message || err)
  }

  // Graceful Local Semantic Engine Fallback
  const fallbackMatch = matchProfileLocally(promptText)
  if (fallbackMatch.error) {
    throw new Error(fallbackMatch.error)
  }

  const result = {
    profile: fallbackMatch.profile,
    aiResult: {
      profileId: fallbackMatch.profile.id,
      confidence: fallbackMatch.confidence,
      rationale: fallbackMatch.profile.rationale,
      tags: fallbackMatch.tags,
      source: 'local'
    }
  }
  // Offline matches are not cached, so the next attempt can still reach Gemini.
  return result
}

// Toast Alert
function triggerTerminalError() {
  const terminalEl = document.querySelector('.terminal')
  if (terminalEl) {
    terminalEl.classList.remove('has-error')
    void terminalEl.offsetWidth
    terminalEl.classList.add('has-error')
    setTimeout(() => terminalEl.classList.remove('has-error'), 1800)
  }
}

function showToast(message, isError = false) {
  if (!toast) return
  toast.textContent = message
  if (isError) {
    toast.classList.add('toast-error')
  } else {
    toast.classList.remove('toast-error')
  }
  toast.classList.add('show')
  setTimeout(() => {
    toast?.classList.remove('show')
    toast?.classList.remove('toast-error')
  }, 3600)
}

// Robust Async & Fallback Clipboard Copy Helper
async function copyToClipboard(text, button, successMessage = '✓ Copied to clipboard!') {
  let copied = false
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text)
      copied = true
    } else {
      throw new Error('Clipboard API unavailable')
    }
  } catch {
    // Fallback using textarea + execCommand
    try {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      textArea.setAttribute('readonly', '')
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      copied = document.execCommand('copy')
      textArea.remove()
    } catch (fallbackErr) {
      console.warn('Fallback copy error:', fallbackErr)
      copied = false
    }
  }

  if (copied) {
    showToast(successMessage)
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
  } else {
    showToast('Copy failed. Please copy manually.', true)
  }
}

// Componentized State
const state = {
  activeProfile: null,
  listeners: [],
  // updateUrl: 'push' adds a history entry, 'replace' rewrites the current one, false leaves the URL alone
  setActiveProfile(profile, { updateUrl = 'push', aiResult = null } = {}) {
    this.activeProfile = { ...buildProfile(profile), aiResult };
    this.notify();

    // URL Persistence
    const url = new URL(window.location);
    const currentVibe = url.searchParams.get('vibe');
    url.searchParams.set('vibe', profile.id);
    if (!updateUrl || currentVibe === profile.id) return;
    if (updateUrl === 'replace') window.history.replaceState({}, '', url);
    else window.history.pushState({}, '', url);
  },
  subscribe(listener) {
    this.listeners.push(listener);
  },
  notify() {
    this.listeners.forEach(listener => listener(this.activeProfile));
  }
};

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
  if (testerPreview && document.activeElement !== testerPreview) {
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
  // Show the real Google Fonts family the user will actually get and export.
  if (displayName) displayName.textContent = profile.headingFamily
  if (displaySample) displaySample.innerHTML = profile.sample

  if (activeFontBadge) {
    activeFontBadge.textContent = profile.headingFamily
  }
  
  if (profile.headingFallback) {
    if (displaySample) displaySample.style.fontFamily = profile.headingFallback
    if (displayName) displayName.style.fontFamily = profile.headingFallback
    if (testerPreview) testerPreview.style.fontFamily = profile.headingFallback
  }
  if (profile.bodyFallback && pairName) pairName.style.fontFamily = profile.bodyFallback

  renderSpecimenContent()
  applySpecimenStyles()

  if (displayMeta) {
    displayMeta.textContent = aiResult?.tags?.length
      ? `${profile.meta} · ${aiResult.tags.join(' · ').toUpperCase()}`
      : profile.meta
  }
  if (pairName) pairName.textContent = profile.bodyFamily
  if (pairMeta) pairMeta.textContent = profile.pairMeta
  if (archetype) archetype.textContent = profile.archetype
  if (recommendationStatus) {
    const source = aiResult?.source === 'gemini' ? ' by Gemini' : aiResult ? ' by the offline matcher' : ''
    recommendationStatus.textContent = `${profile.headingFamily} + ${profile.bodyFamily} selected${source}.`
  }

  // Editorial label vs. real font: say where the look comes from, honestly.
  const disclaimer = document.getElementById('licenseDisclaimer')
  if (disclaimer) {
    if (profile.name.toLowerCase() !== profile.headingFamily.toLowerCase()) {
      disclaimer.textContent = `"${profile.name}" style · set in free Google Font ${profile.headingFamily}`
      disclaimer.style.display = 'block'
    } else {
      disclaimer.style.display = 'none'
    }
  }
})

const dummyPresets = {
  pangram: 'The quick brown fox jumps over the lazy dog',
  headline: 'Design with intention, build with character.',
  alphabet: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz',
  numbers: '0123456789 — $1,999.00 (50% OFF) & #@?!',
  paragraph: 'Typography is the art and technique of arranging type to make written language legible, readable, and appealing when displayed.'
}

function updateActivePresetChip(currentText) {
  const trimmed = (currentText || '').trim()
  specimenPresetChips.forEach((chip) => {
    const key = chip.dataset.preset
    const matches = dummyPresets[key] && dummyPresets[key].trim() === trimmed
    chip.classList.toggle('active', Boolean(matches))
  })
}

// Initialization
function init() {
  const urlParams = new URLSearchParams(window.location.search);
  const vibeId = urlParams.get('vibe');
  const targetProfile = profiles.find(p => p.id === vibeId) || profiles[Math.floor(Math.random() * profiles.length)];
  // Initial render must not push a history entry, or the Back button just reloads the same page.
  state.setActiveProfile(targetProfile, { updateUrl: 'replace' });
  updateActivePresetChip(specimenState.text);
}

async function updateRecommendation() {
  if (isAnalyzing) return

  const prompt = brief?.value?.trim()
  if (!prompt) {
    triggerTerminalError()
    showToast('Describe your project first.', true)
    brief?.focus()
    return
  }

  if (isGibberishPrompt(prompt)) {
    triggerTerminalError()
    showToast('⚠️ Random characters detected. Please describe your project, brand, or desired aesthetic vibe (e.g. "cyberpunk RPG", "warm bakery").', true)
    brief?.focus()
    return
  }

  isAnalyzing = true
  if (analyse) {
    analyse.disabled = true
    analyse.classList.add('loading')
    analyse.innerHTML = 'ASKING <span>◌</span>'
  }

  try {
    const recommendation = await recommendProfile(prompt)
    state.setActiveProfile(recommendation.profile, { aiResult: recommendation.aiResult })
    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  } catch (error) {
    if (error.name === 'AbortError') return
    console.error('Recommendation failed:', error)
    triggerTerminalError()
    if (recommendationStatus) recommendationStatus.textContent = error.message
    showToast(error.message || 'Recommendation failed.', true)
  } finally {
    isAnalyzing = false
    if (analyse) {
      analyse.disabled = false
      analyse.classList.remove('loading')
      analyse.innerHTML = 'ASK <span>→</span>'
    }
  }
}

brief?.addEventListener('input', () => {
  brief.style.height = 'auto'
  brief.style.height = brief.scrollHeight + 'px'
})

brief?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && ((e.metaKey || e.ctrlKey) || !e.shiftKey)) {
    e.preventDefault()
    updateRecommendation()
  }
})

analyse?.addEventListener('click', updateRecommendation)

// Specimen Customizer Handlers in Type Lab
if (specimenTextInput) {
  specimenTextInput.addEventListener('input', (e) => {
    specimenState.text = e.target.value
    renderSpecimenContent()
    updateActivePresetChip(specimenState.text)
  })
}

if (testerPreview) {
  // Plain text paste handler to prevent external rich-text style pollution
  testerPreview.addEventListener('paste', (e) => {
    e.preventDefault()
    const text = (e.clipboardData || window.clipboardData)?.getData('text/plain') || ''
    if (document.queryCommandSupported && document.queryCommandSupported('insertText')) {
      document.execCommand('insertText', false, text)
    } else {
      const selection = window.getSelection()
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0)
        range.deleteContents()
        const node = document.createTextNode(text)
        range.insertNode(node)
        range.setStartAfter(node)
        range.setEndAfter(node)
        selection.removeAllRanges()
        selection.addRange(range)
      } else {
        testerPreview.textContent = text
      }
    }
    specimenState.text = testerPreview.innerText || testerPreview.textContent || ''
    if (specimenTextInput) specimenTextInput.value = specimenState.text
    updateActivePresetChip(specimenState.text)
  })

  testerPreview.addEventListener('input', () => {
    specimenState.text = testerPreview.innerText || testerPreview.textContent || ''
    if (specimenTextInput) specimenTextInput.value = specimenState.text
    updateActivePresetChip(specimenState.text)
  })
}

if (clearSpecimenText) {
  clearSpecimenText.addEventListener('click', () => {
    specimenState.text = ''
    if (specimenTextInput) specimenTextInput.value = ''
    renderSpecimenContent()
    updateActivePresetChip('')
    if (specimenTextInput) specimenTextInput.focus()
  })
}

specimenPresetChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const presetKey = chip.dataset.preset
    if (dummyPresets[presetKey]) {
      specimenState.text = dummyPresets[presetKey]
      if (specimenTextInput) specimenTextInput.value = dummyPresets[presetKey]
      renderSpecimenContent()
      updateActivePresetChip(dummyPresets[presetKey])
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
if (copyCssBtn) {
  copyCssBtn.addEventListener('click', (e) => {
    if (!state.activeProfile) return
    const heading = state.activeProfile.headingFamily || 'Heading Font'
    const body = state.activeProfile.bodyFamily || 'Body Font'
    const cssCode = `${state.activeProfile.cssImport}\n\n${state.activeProfile.cssVars}`
    copyToClipboard(cssCode, e.currentTarget, `✓ Copied CSS for ${heading} + ${body}!`)
  })
}

if (openGoogleFontsBtn) {
  openGoogleFontsBtn.addEventListener('click', () => {
    if (!state.activeProfile) return
    const family = state.activeProfile.headingFamily
    const googleFontsUrl = `https://fonts.google.com/specimen/${encodeURIComponent(family).replace(/%20/g, '+')}`
    window.open(googleFontsUrl, '_blank', 'noopener,noreferrer')
  })
}

// Interactive Preset Prompt Chips
document.querySelectorAll('.chips button').forEach((chip) => {
  chip.addEventListener('click', () => {
    const promptText = chip.dataset.prompt
    if (promptText) {
      if (brief) brief.value = promptText
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
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

