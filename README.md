<div align="center">

# **FONTALLY**

### *Make your type talk.*

**A brief-to-type recommendation tool for designers, founders, and curious people who care about typography.**

[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES%20Modules-F7DF1E?style=for-the-badge&logo=javascript&logoColor=111111)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
[![Vitest](https://img.shields.io/badge/tests-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)
[![CSS](https://img.shields.io/badge/style-Vanilla%20CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)

[**Live repository**](https://github.com/shreyashcoeptu-alt/Fontally) · [**Run locally**](#run-locally) · [**Understand the Gemini route**](#gemini-recommendation-route)

</div>

---

## The idea

Fontally turns a natural-language creative brief into a curated typography direction. Instead of asking users to begin with a font name, it lets them describe a product, brand, game, publication, or atmosphere in ordinary language. The application sends that brief to a server-side Gemini recommendation route, receives one validated profile, and presents the result as an interactive type specimen.

The experience is intentionally opinionated: **describe the feeling first, then refine the type.**

> Fontally is a design-direction tool, not a font licensing database or a replacement for typographic judgment. Font availability and licensing should always be checked at the original font source before production use.

## What the current app actually does

| Area | Current behavior |
|---|---|
| **Brief input** | Accepts a creative description and provides six preset prompt chips: Fintech, Cultural Menace, Quiet Luxury, AI & SaaS, Cyberpunk, and Luxury Editorial. |
| **AI recommendation** | Sends the brief and the curated profile catalog to `POST /api/recommend`, which calls Gemini 3.6 Flash by default and returns a validated profile ID, confidence, rationale, and tags. |
| **Font catalog** | Contains **44 curated profiles** in `src/main.js`. Each profile includes a vibe vocabulary, specimen copy, category metadata, pairing information, rationale, archetype, fallback stacks, and a Google Fonts stylesheet URL. |
| **Interactive specimen** | Renders the selected recommendation, loads its configured stylesheet, and lets the user edit live specimen text in the recommended font. |
| **Type controls** | Includes a 32–140px size slider plus uppercase, italic, and bold toggles. The controls apply to both the large specimen and the inline type field. |
| **Developer h| **Developer h| **Deveariables, a Tailwind font-family snippet, or the configured Google Fonts stylesheet URL. |
| **Sharing** | Creates shareable `?vibe=<profile-id>` URLs and restores the selected profile through browser history navigation. |
| **Featured shelf** | Shows three clickable featured pairings under **“Some personal favourites.”** |

The DNA visualization and PNG export are intentionally not part of the current interface. The project focuses on the recommendation, specimen editing, and developer handoff loop.

## A quick tour

### 1. Describe the project

Try a brief such as:

```text
A quiet, rain-soaked indie game with cinematic storytelling, handmade zines, and an underground mood.
```

Then choose **ASK GEMINI**. The recommendation button is connected to the application’s same-origin API route rather than calling Gemini directly from browser code.

### 2. Read the recommendation

The result card shows the selected profile, category metadata, pairing recommendation, rationale, archetype, and—when the API returns them—Gemini match confidence and tags.

### 3. Edit the specimen

Use the **TYPE** field on the divider line to replace the sample text. The text updates immediately and inherits the selected profile’s configured heading fallback. The control row provides size, uppercase, italic, and bold states.

### 4. Export or share

The developer export bar provides three copy actions and a share action:

- **COPY CSS** copies the generated import and CSS-variable snippet.
- **TAILWIND CONFIG** copies the generated `fontFamily` configuration.
- **GOOGLE FONTS** copies the profile’s configured stylesheet URL.
- **SHARE LINK** copies the current URL with the active `vibe` profile ID.

## Project structure

```text
Fontally/
├── index.html                         # HTML entry point and page structure
├── src/
│   ├── main.js                        # Profiles, UI state, Gemini client, interactions
│   └── style.css                      # Visual system, responsive rules, font imports
├── server/
│   └── gemini-recommendation.mjs     # Server-side Gemini proxy and validation
├── tests/
│   └── scorer.test.js                 # Gemini handler and response-validation tests
├── vite.config.js                     # Vite dev/preview middleware registration
├── .env.example                       # Secret-free local configuration template
├── package.json                       # Scripts and dependencies
└── package-lock.json                  # npm lockfile
```

The project is a **vanilla HTML, CSS, and JavaScript ES-module application**. It is not React, TypeScript, or Tailwind-based. Vite treats `index.html` as the application entry point and provides the development server and production build workflow [1].

## Run locally

### Requirements

Use a current Node.js release compatible with your installed Vite and Vitest versions. The current Vite documentation lists Node.js 20.19+ or 22.12+ for its current major, while Vitest documents Node.js 20+ and Vite 6+ as requirements [1] [3].

### Install dependencies

```bash
npm install
```

### Configure Gemini for local development

Copy the example file and add a server-only key:

```bash
cp .env.example .env
```

Set the following values in `.env`:

```dotenv
GEMINI_API_KEY=your_server_only_gemini_key
GEMINI_MODEL=gemini-3.6-flash
```

The repository ignores `.env` files and includes only the empty, secret-free `.env.example`. **Never put the Gemini key in `src/`, `index.html`, a `VITE_*` variable, or a committed README.**

### Start the development server

```bash
npm run dev
```

Vite normally serves the app at `http://localhost:5173/`. If that port is already in use, Vite selects another available port and prints it in the terminal.

### Run the production build locally

```bash
npm run build
npm run preview
```

`vite build` creates the static client bundle, and `vite preview` locally serves that built output [2]. The repository’s `build` script currently runs only `vite build`.

## Gemini recommendation route

The browser calls the same-origin endpoint below:

```http
POST /api/recommend
Content-Type: application/json
```

The request contains the creative brief and the profile catalog available to the client:

```json
{
  "prompt": "A calm, editorial fintech product for first-time investors.",
  "profiles": [
    {
      "id": "fintech",
      "name": "PP Neue Montreal",
      "meta": "GROTESK / VARIABLE",
      "archetype": "THE OPTIMISTIC OPERATOR",
      "rationale": "A calm precision-first direction for finance.",
      "words": ["fintech", "wealth", "finance"]
    }
  ]
}
```

The server calls Gemini’s `generateContent` endpoint using the configured model. Gemini supports developer system instructions, generation configuration, and structured JSON output; structured outputs are designed for predictable typed extraction and classification [4] [5]. Fontally requests an object containing:

```json
{
  "profileId": "fintech",
  "confidence": 0.91,
  "rationale": "A calm precision-first direction for a finance product.",
  "tags": ["precise", "credible", "modern"]
}
```

The server then validates the response before returning it to the browser. The returned profile ID must belong to the submitted catalog, confidence is clamped to `0–1`, rationale and tags are length-limited, and the frontend maps the validated ID back to its full local profile object.

### Current server safeguards

The implementation currently includes the following bounded behaviors:

| Safeguard | Current value or behavior |
|---|---|
| Request body limit | 80,000 bytes |
| Prompt limit | 1,200 characters after trimming |
| Profile catalog limit | 80 profiles |
| Rate limit | 30 requests per client key within 60 seconds |
| Provider timeout | 20 seconds using `AbortController` |
| Model | `GEMINI_MODEL`, defaulting to `gemini-3.6-flash` |
| Thinking configuration | `minimal` for Gemini 3.6 Flash |
| Output format | JSON with a response schema |
| Cache behavior | `Cache-Control: no-store` |
| Error details | Provider details are logged server-side; generic service errors are returned to the browser |

Gemini 3 models support configurable thinking levels, including `minimal`, `low`, `medium`, and `high`; the current project uses `minimal` for this interactive recommendation task [6].

### Current error behavior

The route returns controlled HTTP responses for common failures:

| Status | Meaning in the current implementation |
|---:|---|
| `204` | Empty response for an `OPTIONS` request. |
| `400` | Missing brief, invalid JSON, or missing/invalid profile catalog. |
| `405` | Method other than `POST`. |
| `413` | Request body too large. |
| `429` | Local in-memory rate limit exceeded or Gemini returned rate limiting. |
| `503` | `GEMINI_API_KEY` is not configured. |
| `502` | Gemini provider failure, invalid model JSON, or unknown returned profile ID. |
| `504` | Gemini request timed out. |

The frontend displays a toast and updates an accessible status region when a recommendation fails. It does **not** silently fall back to the old TF-IDF matcher.

## Important deployment note

The current Gemini route is registered through Vite’s `configureServer` and `configurePreviewServer` middleware hooks. This makes the route available during local development and local preview when the server process has `GEMINI_API_KEY`.

The current production build script is only:

```bash
vite build
```

That produces a static client bundle. It does not create a standalone production Node server for `/api/recommend`. Therefore, a production deployment that needs live Gemini recommendations must also deploy a backend or serverless function for the route, or add a production server entrypoint. A static hosting deployment can serve the built UI, but the Gemini route must be hosted separately and the frontend endpoint configuration must be adapted accordingly.

## Typography and font loading

Fontally imports the following web-font families for its interface and preview system through Google Fonts CSS: **Anybody**, **Bricolage Grotesque**, **DM Mono**, **DM Sans**, **Fraunces**, **Instrument Serif**, and **Space Grotesk**. Individual recommendation profiles also contain configured stylesheet URLs that are loaded when a profile is selected.

Some profile names are editorial or commercial references, while the browser preview may use a free fallback stack. When the profile name differs from the first fallback family, the UI displays a fallback disclaimer. This is a preview behavior, not a statement that Fontally owns or redistributes the named typeface.

The Google Fonts Developer API can expose metadata such as family, variants, subsets, last-modified date, files, variable axes, and tags, and supports sorting by date, popularity, and trending signals [7]. Fontally does **not** currently run a Google Fonts metadata synchronization job; its 44-profile catalog is currently maintained in `src/main.js`.

## Testing and validation

The repository provides these npm scripts:

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create the Vite production client bundle. |
| `npm run preview` | Locally preview the built client bundle. |
| `npm test` | Start Vitest using the repository configuration. |
| `npm test -- --run` | Run the Vitest suite once and exit. |

Vitest is powered by Vite and supports one-shot execution through `vitest run` [3]. The current test file covers Gemini response validation, unknown profile rejection, request construction, structured-output configuration, and missing-key behavior.

Recommended verification sequence:

```bash
npm test -- --run
npm run build
git diff --check
```

## Known limitations

The current implementation is intentionally compact, but the following limitations are real:

1. The catalog is embedded in the client source rather than stored in a separate canonical backend dataset.
2. The server validates against the profile catalog submitted by the browser; a production hardening pass should make the server’s catalog authoritative.
3. Rate limiting is an in-memory `Map`, which is suitable for local use but is not shared across multiple production instances.
4. The handler performs one Gemini provider request and does not currently implement a bounded retry policy or secondary model fallback.
5. The Vite production build does not bundle a standalone backend server.
6. No `LICENSE` file is currently present in the repository. Add an explicit project license before distributing the code as an open-source package.
7. Font metadata is curated manually; there is no automated “newest” or “trending” font sync yet.

## Suggested next steps

The cleanest next iteration would extract the 44 profiles into a versioned catalog module, add explicit source and license metadata, introduce a server-owned catalog for Gemini validation, and add a separate production API deployment. After that, a Google Fonts metadata sync could add variable-font axes, subsets, last-modified dates, WOFF2 availability, and popularity/trending signals using the official API [7].

## References

[1]: [Vite — Getting Started](https://vite.dev/guide/) — Development server, project entry point, npm scripts, browser/runtime requirements, and local workflow.
[2]: [Vite — Building for Production](https://vite.dev/guide/build) — `vite build` behavior and static build output.
[3]: [Vitest — Getting Started](https://vitest.dev/guide/) — Vitest’s Vite integration, test discovery, and one-shot execution.
[4]: [Gemini API — Generate Content](https://ai.google.dev/api/generate-content) — `generateContent`, system instructions, generation configuration, and REST request structure.
[5]: [Gemini API — Structured Outputs](https://ai.google.dev/gemini-api/docs/generate-content/structured-output) — JSON Schema response formatting for typed extraction and classification.
[6]: [Gemini API — Thinking](https://ai.google.dev/gemini-api/docs/generate-content/thinking) — Gemini 3 thinking levels and `thinkingConfig`.
[7]: [Google Fonts Developer API](https://developers.google.com/fonts/docs/developer_api) — Font metadata, filtering, sorting, variable-font axes, and API requirements.

## Author

Designed and developed by **Shreyash Kadam**.

- LinkedIn: [shreyashkadam400](https://www.linkedin.com/in/shreyashkadam400)
- Repository: [shreyashcoeptu-alt/Fontally](https://github.com/shreyashcoeptu-alt/Fontally)
