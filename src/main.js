import './style.css'
import { inject } from '@vercel/analytics'
import { profiles } from '../shared/profiles.js'
import { isGibberishPrompt } from '../shared/gibberish.js'
import { matchProfilesLocally, extractBrandName } from '../shared/local-matcher.js'
import { normalizeBriefKey } from '../shared/brief-key.js'
import { detectScript, scriptSupport, suggestBodyFonts, cssStack, googleFontsCssUrl } from '../shared/pairing.js'
import {
  apiFetch, sendFeedback, loadSaved, getLocalSaved, savePairing, removePairing,
  getRecentBriefs, rememberBrief
} from './api.js'

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
const typeLab = $('.type-lab')
const testerPreview = $('#testerPreview')
const labHeadingName = $('#labHeadingName')
const labBodyName = $('#labBodyName')
const fontSizeSlider = $('#fontSizeSlider')
const fontSizeVal = $('#fontSizeVal')
const trackingSlider = $('#trackingSlider')
const trackingVal = $('#trackingVal')
const leadingSlider = $('#leadingSlider')
const leadingVal = $('#leadingVal')
const toggleCase = $('#toggleCase')
const toggleItalic = $('#toggleItalic')
const toggleBold = $('#toggleBold')
const togglePaper = $('#togglePaper')
const specimenColorPicker = $('#specimenColorPicker')
const customColorPreview = $('#customColorPreview')
const customColorWrapper = $('.custom-color-wrapper')
const clearSpecimenText = $('#clearSpecimenText')
const colorSwatches = document.querySelectorAll('.color-swatch')
const specimenPresetChips = document.querySelectorAll('.specimen-preset-chip')
const labTargetBtns = document.querySelectorAll('.lab-target-btn')
const labViewBtns = document.querySelectorAll('.lab-view-btn')

// Export Handles
const copyCssBtn = $('#copyCssBtn')
const openGoogleFontsBtn = $('#openGoogleFontsBtn')
const recommendationStatus = $("#recommendationStatus")

// Top-3 recommendation & "your words" preview handles
const aiRationale = $('#aiRationale')
const briefPreview = $('#briefPreview')
const previewBrand = $('#previewBrand')
const previewBody = $('#previewBody')
const alternatesEl = $('#alternates')
const scriptNote = $('#scriptNote')
const bodyOptionsEl = $('#bodyOptions')
const savePairingBtn = $('#savePairingBtn')
const savedSection = $('#savedSection')
const savedList = $('#savedList')
const recentList = $('#recentList')


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
// bodyOverride: a family chosen from the on-demand body suggestions
function buildProfile(base, bodyOverride = null) {
  const p = bodyOverride
    ? { ...base, bodyFallback: cssStack(bodyOverride), bodyGoogleFontsUrl: googleFontsCssUrl(bodyOverride) }
    : base
  // `name`/`pair` are editorial labels (some are commercial or invented names).
  // Everything the user copies must reference the real, free Google Fonts families.
  const headingFamily = primaryFamily(p.headingFallback, p.name)
  const bodyFamily = primaryFamily(p.bodyFallback, p.pair)
  const imports = [p.googleFontsUrl, p.bodyGoogleFontsUrl].filter(Boolean)
  const cssImport = imports.map((url) => `@import url('${url}');`).join('\n')
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

  return { ...p, bodyOverride, headingFamily, bodyFamily, cssImport, cssVars, tailwind }
}

// Client-side Memory Cache for Instant <1ms repeated lookups
const clientRecommendationCache = new Map()
const profileById = new Map(profiles.map((p) => [p.id, p]))

// Gemini recommendation client with Resilient Local Semantic Fallback & Instant Cache
const RECOMMENDATION_ENDPOINT = '/api/recommend'
let recommendationAbortController = null
let isAnalyzing = false

async function recommendProfile(promptText) {
  if (isGibberishPrompt(promptText)) {
    throw new Error('The input appears to be random characters or gibberish. Please describe your project, brand, or desired aesthetic vibe (e.g., "cyberpunk gaming studio", "warm artisan bakery").')
  }

  const cacheKey = normalizeBriefKey(promptText)
  if (clientRecommendationCache.has(cacheKey)) {
    return clientRecommendationCache.get(cacheKey)
  }

  let busyNotice = null

  // Cancel any previous in-flight recommendation request
  if (recommendationAbortController) {
    recommendationAbortController.abort()
  }
  recommendationAbortController = new AbortController()
  const controller = recommendationAbortController
  // Must be longer than the server's worst case (2.5s cache read + 10s Gemini budget,
  // see server/lib/gemini-client.mjs), otherwise the browser gives up on requests the
  // server would have answered and silently uses the offline matcher.
  const timeout = setTimeout(() => controller.abort(), 14000)

  try {
    // The server owns the profile catalog (shared/profiles.js); only the brief is sent.
    const response = await apiFetch(RECOMMENDATION_ENDPOINT, {
      method: 'POST',
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
      // Older API deployments return a single pick without `picks`
      const rawPicks = Array.isArray(payload.picks) && payload.picks.length ? payload.picks : [payload]
      const picks = rawPicks
        .map((pick) => ({ profile: profileById.get(pick.profileId), aiResult: { ...pick, source: 'gemini' } }))
        .filter((pick) => pick.profile)
      if (picks.length) {
        const result = {
          picks,
          brandName: payload.brandName || extractBrandName(promptText),
          briefKey: payload.briefKey || cacheKey,
          script: payload.script || null,
          model: payload.model || null,
          source: 'gemini'
        }
        clientRecommendationCache.set(cacheKey, result)
        return result
      }
    }
    if (payload?.reason === 'quota') busyNotice = payload.error
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
  const fallbackMatch = matchProfilesLocally(promptText, profiles)
  if (fallbackMatch.error) {
    throw new Error(fallbackMatch.error)
  }

  // Offline matches are not cached, so the next attempt can still reach Gemini.
  const script = detectScript(promptText)
  return {
    picks: fallbackMatch.picks.map(({ profile, confidence, rationale, tags }) => ({
      profile,
      aiResult: {
        profileId: profile.id, confidence, rationale, tags, source: 'local',
        ...(script ? { scriptSupport: scriptSupport(profile, script) } : {})
      }
    })),
    brandName: extractBrandName(promptText),
    briefKey: cacheKey,
    script: script ? { id: script.id, label: script.label } : null,
    notice: busyNotice,
    source: 'local'
  }
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
  // Current brief result: { brief, brandName, source, picks: [{ profile, aiResult }] }.
  // picks[0] is always the profile shown in the main card. null when the active
  // profile came from the shelf, a shared ?vibe= link, or the initial random pick.
  recommendation: null,
  listeners: [],
  // updateUrl: 'push' adds a history entry, 'replace' rewrites the current one, false leaves the URL alone
  setActiveProfile(profile, { updateUrl = 'push', aiResult = null, recommendation = null, bodyOverride = null } = {}) {
    this.activeProfile = { ...buildProfile(profile, bodyOverride), aiResult };
    this.recommendation = recommendation;
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

// Make picks[index] the main pick, keeping the other picks as alternates
function promotePick(recommendation, index) {
  const picks = [...recommendation.picks]
  ;[picks[0], picks[index]] = [picks[index], picks[0]]
  return { ...recommendation, picks }
}

function showPick(recommendation, { updateUrl = 'push' } = {}) {
  const [main] = recommendation.picks
  state.setActiveProfile(main.profile, { aiResult: main.aiResult, recommendation, updateUrl })
}

window.addEventListener("popstate", () => {
  const vibeId = new URLSearchParams(window.location.search).get("vibe")
  const profile = profiles.find((candidate) => candidate.id === vibeId)
  if (!profile || state.activeProfile?.id === profile.id) return
  // Back/forward between picks of the same brief keeps the alternates on screen
  const index = state.recommendation?.picks.findIndex((pick) => pick.profile.id === vibeId) ?? -1
  if (index > 0) showPick(promotePick(state.recommendation, index), { updateUrl: false })
  else state.setActiveProfile(profile, { updateUrl: false })
})
// Interactive Specimen State for Type Lab.
// Heading and body each keep their own size/tracking/leading, because a
// 56px display line and an 18px paragraph need very different settings.
const LAB_TARGETS = {
  heading: { min: 20, max: 120, waterfall: [96, 64, 44, 30, 20] },
  body: { min: 10, max: 36, waterfall: [28, 22, 18, 15, 12] }
}

const specimenState = {
  text: 'The quick brown fox jumps over the lazy dog',
  target: 'heading',
  view: 'line',
  paper: 'light',
  isBold: false,
  isItalic: false,
  isUppercase: false,
  color: 'auto',
  settings: {
    heading: { fontSize: 56, tracking: 0, leading: 1.05 },
    body: { fontSize: 18, tracking: 0, leading: 1.5 }
  }
}

const currentSettings = () => specimenState.settings[specimenState.target]
const SPECIMEN_PLACEHOLDER = 'Type something to preview'

function specimenLineSizes() {
  return specimenState.view === 'waterfall'
    ? LAB_TARGETS[specimenState.target].waterfall
    : [currentSettings().fontSize]
}

// Rebuild the specimen lines. Lines are plaintext-only contenteditable so
// pasted rich text can't smuggle in styles; typing in one line syncs the rest.
function buildSpecimenLines() {
  if (!testerPreview) return
  const sizes = specimenLineSizes()
  testerPreview.replaceChildren(...sizes.map((size) => {
    const row = document.createElement('div')
    row.className = 'specimen-row'
    if (specimenState.view === 'waterfall') {
      const marker = document.createElement('span')
      marker.className = 'specimen-size'
      marker.setAttribute('aria-hidden', 'true')
      marker.textContent = size
      row.append(marker)
    }
    const line = document.createElement('div')
    line.className = 'specimen-line'
    line.contentEditable = 'plaintext-only'
    line.spellcheck = false
    line.dataset.size = size
    line.dataset.placeholder = SPECIMEN_PLACEHOLDER
    line.setAttribute('role', 'textbox')
    line.setAttribute('aria-label', `Specimen text at ${size} pixels`)
    line.style.fontSize = `${size}px`
    line.textContent = specimenState.text
    row.append(line)
    return row
  }))
}

function renderSpecimenContent() {
  if (!testerPreview) return
  testerPreview.querySelectorAll('.specimen-line').forEach((line) => {
    // Never rewrite the line being typed in, or the caret jumps to the start.
    if (line !== document.activeElement && line.textContent !== specimenState.text) {
      line.textContent = specimenState.text
    }
  })
}

function specimenFontFamily() {
  const profile = state.activeProfile
  if (!profile) return ''
  return specimenState.target === 'body' ? profile.bodyFallback : profile.headingFallback
}

function applySpecimenStyles() {
  const s = currentSettings()
  if (typeLab) {
    typeLab.dataset.target = specimenState.target
    typeLab.dataset.view = specimenState.view
    typeLab.dataset.paper = specimenState.paper
  }
  if (testerPreview) {
    const family = specimenFontFamily()
    if (family) testerPreview.style.fontFamily = family
    testerPreview.style.fontWeight = specimenState.isBold ? '700' : '400'
    testerPreview.style.fontStyle = specimenState.isItalic ? 'italic' : 'normal'
    testerPreview.style.textTransform = specimenState.isUppercase ? 'uppercase' : 'none'
    testerPreview.style.letterSpacing = `${s.tracking}em`
    testerPreview.style.lineHeight = String(s.leading)
    if (specimenState.color === 'auto') testerPreview.style.removeProperty('--specimen-color')
    else testerPreview.style.setProperty('--specimen-color', specimenState.color)
    if (specimenState.view === 'line') {
      testerPreview.querySelectorAll('.specimen-line').forEach((line) => {
        line.style.fontSize = `${s.fontSize}px`
      })
    }
  }
  syncSpecimenControls()
}

// Keep sliders and readouts in step with whichever font is being tested.
function syncSpecimenControls() {
  const s = currentSettings()
  const range = LAB_TARGETS[specimenState.target]
  if (fontSizeSlider) {
    fontSizeSlider.min = range.min
    fontSizeSlider.max = range.max
    fontSizeSlider.value = s.fontSize
    fontSizeSlider.disabled = specimenState.view === 'waterfall'
  }
  if (fontSizeVal) fontSizeVal.textContent = specimenState.view === 'waterfall' ? 'Waterfall' : `${s.fontSize}px`
  if (trackingSlider) trackingSlider.value = Math.round(s.tracking * 1000)
  if (trackingVal) trackingVal.textContent = s.tracking === 0 ? '0' : `${s.tracking > 0 ? '+' : ''}${Math.round(s.tracking * 1000)}`
  if (leadingSlider) leadingSlider.value = Math.round(s.leading * 100)
  if (leadingVal) leadingVal.textContent = s.leading.toFixed(2)
}

function setRadioGroup(buttons, attr, value) {
  buttons.forEach((btn) => {
    const on = btn.dataset[attr] === value
    btn.classList.toggle('active', on)
    btn.setAttribute('aria-checked', String(on))
  })
}

function setSpecimenText(text) {
  specimenState.text = text
  renderSpecimenContent()
  updateActivePresetChip(text)
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
  if (customColorPreview && isCustom) {
    customColorPreview.style.backgroundColor = color
  }
  if (specimenColorPicker && isCustom && specimenColorPicker.value !== color) {
    specimenColorPicker.value = color
  }
}

// Render DOM on State Change
state.subscribe((profile) => {
  const aiResult = profile.aiResult
  loadGoogleFont(profile.googleFontsUrl)
  loadGoogleFont(profile.bodyGoogleFontsUrl)
  // Show the real Google Fonts family the user will actually get and export.
  if (displayName) displayName.textContent = profile.headingFamily
  // The user's own brand name beats the canned sample. textContent: user input is never HTML.
  const brandName = state.recommendation?.brandName
  if (displaySample) {
    if (brandName) displaySample.textContent = brandName
    else displaySample.innerHTML = profile.sample
  }

  if (labHeadingName) labHeadingName.textContent = profile.headingFamily
  if (labBodyName) labBodyName.textContent = profile.bodyFamily

  if (profile.headingFallback) {
    if (displaySample) displaySample.style.fontFamily = profile.headingFallback
    if (displayName) displayName.style.fontFamily = profile.headingFallback
  }
  if (profile.bodyFallback && pairName) pairName.style.fontFamily = profile.bodyFallback

  if (testerPreview && !testerPreview.childElementCount) buildSpecimenLines()
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

  if (aiRationale) {
    aiRationale.textContent = aiResult?.rationale || ''
    aiRationale.hidden = !aiResult?.rationale
  }

  renderBriefPreview(profile)
  renderAlternates()
  renderScriptNote(profile)
  renderBodyOptions(profile)
  renderSaveButton(profile)

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

// "In your words": brand name in the heading font, the brief in the body font
function renderBriefPreview(profile) {
  if (!briefPreview) return
  const rec = state.recommendation
  briefPreview.hidden = !rec
  if (!rec) return
  if (previewBrand) {
    if (document.activeElement !== previewBrand) {
      previewBrand.textContent = rec.brandName || rec.brief.split(/[,.;:—–-]/)[0].trim().slice(0, 60)
    }
    previewBrand.style.fontFamily = profile.headingFallback
  }
  if (previewBody) {
    previewBody.textContent = rec.brief
    previewBody.style.fontFamily = profile.bodyFallback
  }
}

function renderAlternates() {
  if (!alternatesEl) return
  const rec = state.recommendation
  const alternates = rec ? rec.picks.slice(1) : []
  alternatesEl.hidden = alternates.length === 0
  alternatesEl.replaceChildren()
  if (!alternates.length) return

  const label = document.createElement('p')
  label.className = 'alternates-label'
  label.textContent = 'OR TRY'
  alternatesEl.append(label)

  const list = document.createElement('div')
  list.className = 'alternates-list'
  alternates.forEach(({ profile: raw, aiResult }, offset) => {
    const alt = buildProfile(raw)
    loadGoogleFont(alt.googleFontsUrl)

    const card = document.createElement('button')
    card.type = 'button'
    card.className = 'alternate-card'
    card.setAttribute('aria-label', `Use ${alt.headingFamily} with ${alt.bodyFamily} instead`)

    const sample = document.createElement('span')
    sample.className = 'alternate-sample'
    sample.style.fontFamily = alt.headingFallback
    sample.textContent = rec.brandName || alt.headingFamily

    const families = document.createElement('span')
    families.className = 'alternate-families'
    families.textContent = `${alt.headingFamily} + ${alt.bodyFamily}`

    const reason = document.createElement('span')
    reason.className = 'alternate-reason'
    reason.style.fontFamily = alt.bodyFallback
    reason.textContent = aiResult?.rationale || alt.rationale

    card.append(sample, families, reason)
    card.addEventListener('click', () => {
      showPick(promotePick(state.recommendation, offset + 1))
      reportChoice('choose_alternate')
      document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    list.append(card)
  })
  alternatesEl.append(list)
}

// Let users correct the brand name we guessed; keep every preview in sync
previewBrand?.addEventListener('input', () => {
  if (!state.recommendation) return
  state.recommendation.brandName = previewBrand.textContent.trim().slice(0, 60)
  if (displaySample) {
    if (state.recommendation.brandName) displaySample.textContent = state.recommendation.brandName
    else if (state.activeProfile) displaySample.innerHTML = state.activeProfile.sample
  }
  alternatesEl?.querySelectorAll('.alternate-sample').forEach((el, i) => {
    const alt = state.recommendation.picks[i + 1]
    if (alt) el.textContent = state.recommendation.brandName || buildProfile(alt.profile).headingFamily
  })
})
previewBrand?.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') { e.preventDefault(); previewBrand.blur() }
})
previewBrand?.addEventListener('paste', (e) => {
  e.preventDefault()
  const text = (e.clipboardData?.getData('text/plain') || '').replace(/\s+/g, ' ').slice(0, 60)
  document.execCommand('insertText', false, text)
})

// Warn when the chosen fonts can't render the brief's writing system
function renderScriptNote(profile) {
  if (!scriptNote) return
  const script = state.recommendation?.script
  const support = profile.aiResult?.scriptSupport
  if (!script || !support) {
    scriptNote.hidden = true
    return
  }
  const missing = [!support.heading && profile.headingFamily, !support.body && !profile.bodyOverride && profile.bodyFamily].filter(Boolean)
  const bodyOk = profile.bodyOverride ? true : support.body
  if (!missing.length && bodyOk) {
    scriptNote.textContent = `✓ Both fonts include ${script.label} glyphs.`
    scriptNote.classList.remove('is-warning')
  } else {
    scriptNote.textContent = `${missing.join(' and ')} ${missing.length > 1 ? 'have' : 'has'} no ${script.label} glyphs; ${script.label} text will fall back to a system font. Pick a body font below that supports it.`
    scriptNote.classList.add('is-warning')
  }
  scriptNote.hidden = false
}

// On-demand body pairing: rule-based alternatives for the current heading
function renderBodyOptions(profile) {
  if (!bodyOptionsEl) return
  const rawProfile = profileById.get(profile.id)
  if (!rawProfile) return
  const scriptId = state.recommendation?.script?.id
  const script = scriptId ? detectScript(state.recommendation.brief) : null
  const options = suggestBodyFonts(rawProfile, { script, brief: state.recommendation?.brief || '' })
  bodyOptionsEl.replaceChildren()
  if (!options.length) {
    bodyOptionsEl.hidden = true
    return
  }

  const label = document.createElement('span')
  label.className = 'body-options-label'
  label.textContent = 'OR SET BODY IN'
  bodyOptionsEl.append(label)

  const makeChip = (family, title, override) => {
    const chip = document.createElement('button')
    chip.type = 'button'
    chip.className = 'body-option'
    chip.textContent = family
    chip.title = title
    chip.style.fontFamily = cssStack(family)
    const active = (profile.bodyOverride || null) === override
    chip.classList.toggle('active', active)
    chip.setAttribute('aria-pressed', String(active))
    chip.addEventListener('click', () => setBodyOverride(override))
    return chip
  }

  // The curated pair is always one click away
  const curated = primaryFamily(rawProfile.bodyFallback, rawProfile.pair)
  bodyOptionsEl.append(makeChip(curated, 'The curated pairing for this profile', null))
  for (const option of options) {
    loadGoogleFont(googleFontsCssUrl(option.family))
    bodyOptionsEl.append(makeChip(option.family, option.reason, option.family))
  }
  bodyOptionsEl.hidden = false
}

function setBodyOverride(family) {
  const current = state.activeProfile
  if (!current) return
  const raw = profileById.get(current.id)
  state.setActiveProfile(raw, {
    aiResult: current.aiResult,
    recommendation: state.recommendation,
    bodyOverride: family,
    updateUrl: false
  })
}

// ---- Saved pairings & recent briefs ------------------------------------------

function isSaved(profile) {
  return getLocalSaved().some((f) => f.heading_font === profile.headingFamily && f.body_font === profile.bodyFamily)
}

function renderSaveButton(profile) {
  if (!savePairingBtn) return
  const saved = isSaved(profile)
  savePairingBtn.textContent = saved ? 'SAVED ✓' : 'SAVE'
  savePairingBtn.setAttribute('aria-pressed', String(saved))
}

function renderSavedPanel(saved = getLocalSaved()) {
  if (!savedSection) return
  const recent = getRecentBriefs()
  savedSection.hidden = !saved.length && !recent.length

  if (savedList) {
    savedList.replaceChildren()
    if (!saved.length) {
      const empty = document.createElement('li')
      empty.className = 'saved-empty'
      empty.textContent = 'Nothing saved yet. Hit SAVE on a pairing you like.'
      savedList.append(empty)
    }
    for (const entry of saved) {
      const li = document.createElement('li')
      const open = document.createElement('button')
      open.type = 'button'
      open.className = 'saved-open'
      open.style.fontFamily = cssStack(entry.heading_font)
      open.textContent = `${entry.heading_font} + ${entry.body_font}`
      loadGoogleFont(googleFontsCssUrl(entry.heading_font))
      open.addEventListener('click', () => {
        const profile = profileById.get(entry.profile_id) ||
          profiles.find((p) => primaryFamily(p.headingFallback) === entry.heading_font)
        if (!profile) return
        const curatedBody = primaryFamily(profile.bodyFallback, profile.pair)
        state.setActiveProfile(profile, { bodyOverride: entry.body_font === curatedBody ? null : entry.body_font })
        document.getElementById('results')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      })
      const remove = document.createElement('button')
      remove.type = 'button'
      remove.className = 'saved-remove'
      remove.textContent = '✕'
      remove.setAttribute('aria-label', `Remove ${entry.heading_font} + ${entry.body_font}`)
      remove.addEventListener('click', async () => {
        renderSavedPanel(await removePairing(entry))
        if (state.activeProfile) renderSaveButton(state.activeProfile)
      })
      li.append(open, remove)
      savedList.append(li)
    }
  }

  if (recentList) {
    recentList.replaceChildren()
    for (const item of recent) {
      const li = document.createElement('li')
      const again = document.createElement('button')
      again.type = 'button'
      again.className = 'recent-brief'
      again.textContent = item.brief
      again.addEventListener('click', () => {
        if (brief) brief.value = item.brief
        updateRecommendation()
      })
      li.append(again)
      recentList.append(li)
    }
  }
}

savePairingBtn?.addEventListener('click', async () => {
  const profile = state.activeProfile
  if (!profile) return
  if (isSaved(profile)) {
    const entry = getLocalSaved().find((f) => f.heading_font === profile.headingFamily && f.body_font === profile.bodyFamily)
    renderSavedPanel(await removePairing(entry))
    showToast('Removed from saved pairings.')
  } else {
    renderSavedPanel(await savePairing({
      profileId: profile.id,
      headingFont: profile.headingFamily,
      bodyFont: profile.bodyFamily,
      label: state.recommendation?.brandName || profile.archetype
    }))
    reportChoice('save')
    showToast(`✓ Saved ${profile.headingFamily} + ${profile.bodyFamily}`)
  }
  renderSaveButton(profile)
})

// Tell the server which pick for this brief the visitor actually used
function reportChoice(event) {
  const rec = state.recommendation
  if (!rec?.briefKey || !state.activeProfile) return
  sendFeedback({ briefKey: rec.briefKey, profileId: state.activeProfile.id, event })
}

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
  renderSavedPanel();
  loadSaved().then((saved) => {
    renderSavedPanel(saved);
    if (state.activeProfile) renderSaveButton(state.activeProfile);
  });
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
    const result = await recommendProfile(prompt)
    showPick({ ...result, brief: prompt })
    rememberBrief(prompt, result.picks[0].profile.id)
    renderSavedPanel()
    if (result.notice) showToast(result.notice)
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
if (testerPreview) {
  // Delegated: lines are rebuilt when the layout changes.
  testerPreview.addEventListener('input', (e) => {
    const line = e.target.closest?.('.specimen-line')
    if (!line) return
    setSpecimenText(line.textContent || '')
  })
  testerPreview.addEventListener('keydown', (e) => {
    // Specimens are single strings; Enter would only desync the waterfall.
    if (e.key === 'Enter' && e.target.closest?.('.specimen-line')) e.preventDefault()
  })
}

if (clearSpecimenText) {
  clearSpecimenText.addEventListener('click', () => {
    setSpecimenText('')
    testerPreview?.querySelector('.specimen-line')?.focus()
  })
}

specimenPresetChips.forEach(chip => {
  chip.addEventListener('click', () => {
    const preset = dummyPresets[chip.dataset.preset]
    if (preset) setSpecimenText(preset)
  })
})

labTargetBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (specimenState.target === btn.dataset.target) return
    specimenState.target = btn.dataset.target
    setRadioGroup(labTargetBtns, 'target', specimenState.target)
    buildSpecimenLines()
    applySpecimenStyles()
  })
})

labViewBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (specimenState.view === btn.dataset.view) return
    specimenState.view = btn.dataset.view
    setRadioGroup(labViewBtns, 'view', specimenState.view)
    buildSpecimenLines()
    applySpecimenStyles()
  })
})

fontSizeSlider?.addEventListener('input', (e) => {
  currentSettings().fontSize = Number(e.target.value)
  applySpecimenStyles()
})

trackingSlider?.addEventListener('input', (e) => {
  currentSettings().tracking = Number(e.target.value) / 1000
  applySpecimenStyles()
})

leadingSlider?.addEventListener('input', (e) => {
  currentSettings().leading = Number(e.target.value) / 100
  applySpecimenStyles()
})

function bindToggle(button, key) {
  button?.addEventListener('click', () => {
    specimenState[key] = !specimenState[key]
    button.classList.toggle('active', specimenState[key])
    button.setAttribute('aria-pressed', String(specimenState[key]))
    applySpecimenStyles()
  })
}
bindToggle(toggleCase, 'isUppercase')
bindToggle(toggleItalic, 'isItalic')
bindToggle(toggleBold, 'isBold')

togglePaper?.addEventListener('click', () => {
  specimenState.paper = specimenState.paper === 'light' ? 'dark' : 'light'
  const dark = specimenState.paper === 'dark'
  togglePaper.classList.toggle('active', dark)
  togglePaper.setAttribute('aria-pressed', String(dark))
  applySpecimenStyles()
})

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
    reportChoice('copy_css')
  })
}

if (openGoogleFontsBtn) {
  openGoogleFontsBtn.addEventListener('click', () => {
    if (!state.activeProfile) return
    const family = state.activeProfile.headingFamily
    const googleFontsUrl = `https://fonts.google.com/specimen/${encodeURIComponent(family).replace(/%20/g, '+')}`
    window.open(googleFontsUrl, '_blank', 'noopener,noreferrer')
    reportChoice('open_google_fonts')
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

