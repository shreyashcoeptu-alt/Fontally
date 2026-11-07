<div align="center">

# **FONTALLY**

### *Make your type talk.*

**An intelligent brief-to-type pairing engine & typography playground for designers, founders, and engineers.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-fontally.vercel.app-00df8f?style=for-the-badge&logo=vercel&logoColor=black)](https://fontally.vercel.app/)
[![Vite](https://img.shields.io/badge/Vite-7.x-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev/)
[![Hono](https://img.shields.io/badge/Router-Hono.js-E36002?style=for-the-badge&logo=hono&logoColor=white)](https://hono.dev/)
[![Gemini](https://img.shields.io/badge/AI-Google%20Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)](https://ai.google.dev/)
[![Supabase](https://img.shields.io/badge/Database-Supabase%20pgvector-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![Google Fonts](https://img.shields.io/badge/Fonts-Google%20Fonts-EA4335?style=for-the-badge&logo=googlefonts&logoColor=white)](https://fonts.google.com/)
[![Tests](https://img.shields.io/badge/Tests-Vitest-6E9F18?style=for-the-badge&logo=vitest&logoColor=white)](https://vitest.dev/)

[**Visit Live App**](https://fontally.vercel.app/) · [**GitHub Repository**](https://github.com/shreyashcoeptu-alt/Fontally) · [**Run Locally**](#run-locally) · [**API Endpoints**](#api-architecture)

</div>

---

## ✦ What is Fontally?

**Fontally** translates natural-language design briefs into curated typography systems. Instead of searching by font names or categories, describe your project's aesthetic, mood, audience, or culture in everyday words. Fontally reasons over the visual hierarchy, contrast, and emotion to deliver the perfect headline and body font pairing in milliseconds.

> **Describe the feeling first, then test and export the type.**

---

## ⚡ Key Features

- 🧠 **Top-3 Gemini recommendations, each with a reason**: three different-feeling pairings, best first. Pick #1 fills the main card; the two alternates swap in with one click.
- ✍️ **Preview in your own words**: your brand name (detected from the brief, editable) is set in the heading font and your brief in the body font.
- 🔁 **Resilient model chain**: if one Gemini model is out of quota or overloaded, the next one answers, and models that just hit quota are skipped. If all fail, an offline keyword matcher still returns three picks and says so.
- 🌏 **Language-aware**: briefs in Hindi, Japanese, Korean, Greek, Cyrillic and more are accepted, and you're warned when a font has no glyphs for your script. Language data comes from Google Fonts' own metadata.
- 🔤 **On-demand body pairing**: swap the body font for rule-based alternatives (contrast, readability at 16px, mood fit, glyph coverage). The CSS export follows.
- 💾 **Saved pairings & recent briefs**: anonymous, per browser, synced to the server when a database is configured.
- 📈 **Learns from use**: when visitors to the same brief keep choosing an alternate, it gets promoted.
- 📏 **Measured, not guessed**: a 70-brief evaluation set scores the offline matcher on every `npm test` and live Gemini models with `npm run eval`. See [docs/RECOMMENDATION_ENGINE.md](docs/RECOMMENDATION_ENGINE.md).
- 🛡️ **Gibberish guard** (shared by browser and server): rejects keyboard mashing like `afrvq1r1` without blocking acronyms (`CRM`, `BBQ`) or non-Latin text.
- 🔍 **Catalog search API**: fuzzy (Fuse.js), filters, and pgvector semantic search over 130 enriched fonts, plus font similarity.
- 🧪 **Type Lab**: live editable specimen, size slider, case/italic/bold toggles, colours, text presets.
- 💻 **Developer export**: `@import` + CSS custom properties using the real Google Fonts families, and a link to each specimen.

---

## 🛠️ Project Structure

See [ARCHITECTURE.md](ARCHITECTURE.md) for the full code map, request flow, and which external API is used where.

```text
Fontally/
├── api/index.js            # Single Vercel function; vercel.json rewrites /api/* here
├── server/                 # Hono app: routes, Gemini client + model chain, candidates, Supabase
├── shared/                 # Used by browser AND server: profiles, matcher, pairing, font metadata
├── src/                    # Browser UI (main.js), API helpers (api.js), styles
├── scripts/                # eval-recommendations · sync-font-metadata · seed-fonts
├── tests/                  # Vitest suites + eval/briefs.json
└── docs/RECOMMENDATION_ENGINE.md   # How the model was chosen, with measurements
```

---

## 🏃 Run Locally

### 1. Prerequisites
- **Node.js**: `20.18+` or `22.x`
- **npm**: `10.x+`

### 2. Clone and Install
```bash
git clone https://github.com/shreyashcoeptu-alt/Fontally.git
cd Fontally
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```bash
cp .env.example .env
```

Only `GEMINI_API_KEY` is required; everything else is optional and documented in [`.env.example`](.env.example):

| Variable | Purpose |
|---|---|
| `GEMINI_API_KEY` | Gemini key (server-side only) |
| `GEMINI_MODEL` / `GEMINI_FALLBACK_MODELS` | Override the evaluated default model chain |
| `RECOMMEND_CANDIDATES` | Shortlist size sent to Gemini (default `20`; `0` = whole catalog) |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | Persistence for cache, feedback, history, favourites |
| `ALLOWED_ORIGINS` | Extra browser origins allowed to call the API |

### 4. Database Setup & Seeding (Optional)
If using Supabase:
1. Run [`server/db/schema.sql`](server/db/schema.sql) in your Supabase **SQL Editor** to initialize the tables, indexes, and stored procedures.
2. Populate the font catalogue (130+ enriched Google Fonts):
   - **Option A (Instant SQL):** Run [`server/db/seed.sql`](server/db/seed.sql) directly in your Supabase **SQL Editor**.
   - **Option B (Node.js with Gemini Embeddings):** Run the seeding script to automatically generate 768-dimensional AI vector embeddings:
     ```bash
     npm run seed
     ```

### 5. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 🧪 Testing, Evaluation & Building

```bash
npm test -- --run        # 66 tests, including the offline recommendation eval and a jsdom UI suite
npm run eval             # Score live Gemini on tests/eval/briefs.json (uses API quota)
GEMINI_MODEL=gemini-3.5-flash-lite RECOMMEND_CANDIDATES=0 npm run eval    # compare setups
npm run sync-fonts       # Refresh Google Fonts metadata (languages, axes, popularity)
npm run build            # Production build
npm run preview          # Preview the production build with the API
```

---

## 🌐 API Architecture

Full reference, including external services: [ARCHITECTURE.md §4–5](ARCHITECTURE.md#4-external-apis-and-services).

### `POST /api/recommend`
```json
{ "prompt": "Crumb & Co, a warm sourdough bakery in Lisbon" }
```
```json
{
  "profileId": "coffee", "confidence": 0.92, "rationale": "…", "tags": ["warm"],
  "brandName": "Crumb & Co",
  "picks": [ { "profileId": "coffee", "…": "…" }, { "profileId": "wonky_craft_artisan" }, { "profileId": "french_patisserie" } ],
  "briefKey": "crumb co a warm sourdough bakery in lisbon",
  "model": "gemini-3.1-flash-lite"
}
```
Errors: `400` (empty or gibberish brief), `429` (rate limit, or every Gemini model out of quota: `"reason": "quota"`), `502`/`504` (Gemini unavailable or timed out). The UI then falls back to offline picks.

### Other endpoints
| Endpoint | Purpose |
|---|---|
| `POST /api/feedback` | `{ briefKey, profileId, event }`: which pick was used (`choose_alternate`, `copy_css`, `save`, `open_google_fonts`) |
| `GET/POST /api/favourites`, `DELETE /api/favourites/:id` | Saved pairings (`x-session-id` header) |
| `GET/POST /api/history` | Brief history (`x-session-id` header) |
| `GET /api/fonts` | Catalog search: `q`, `category`, `variable`, `min_weight`, `max_weight`, `mode=auto\|fuzzy\|semantic`, `limit` |
| `GET /api/fonts/similar/:family` | Similar fonts |
| `GET /api/health` | Status, Gemini model chain, Supabase availability |

---

## 🚀 Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import `Fontally`.
3. Add your Environment Variables in the Vercel Dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API key (enable billing for real traffic; the free tier allows only a few requests per minute per model)
   - `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`: needed in production for the cache, feedback learning and cross-device favourites
4. Click **Deploy**, then open `/api/health` to confirm `geminiConfigured: true`.

---

## 👨‍💻 Author

Designed and developed with passion by **Shreyash Kadam**.

- **Live Project**: [https://fontally.vercel.app/](https://fontally.vercel.app/)
- **LinkedIn**: [shreyashkadam400](https://www.linkedin.com/in/shreyashkadam400)
- **GitHub**: [@shreyashcoeptu-alt](https://github.com/shreyashcoeptu-alt)
