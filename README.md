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

- 🧠 **Gemini-Powered Typography Engine**: Sends creative design briefs to a serverless Gemini endpoint with fast token sampling, compressed prompt payloads, and persistent response caching across deployments.
- 🗄️ **Supabase & pgvector Persistence**:
  - Persistent recommendation cache in PostgreSQL with hit count metrics (survives cold starts and redeployments).
  - High-dimensional vector embeddings (`gemini-embedding-001` with 768 dimensions) for semantic font similarity search.
  - Zero-config graceful in-memory fallback during local development or offline mode.
- 🔍 **Three-Tier Search Architecture (Fuzzy + Filters + Vector Semantic)**:
  - **Typo-Tolerant Search (Fuse.js)**: Handles typos and partial names (e.g. `"playfar"` instantly matches `"Playfair Display"`).
  - **Vibe & Tag Discovery**: Query by aesthetic mood tags (*"cyberpunk"*, *"quiet-luxury"*, *"editorial"*, *"warm"*), designers, and use cases.
  - **Granular Typographic Filters**: Filter by classification, variable font support (`variable=true`), and custom weight ranges (`min_weight`, `max_weight`).
- 🧬 **Font Similarity Engine**: Find stylistically and structurally similar fonts to any family in the catalog (`GET /api/fonts/similar/:family`).
- 🔖 **User History & Favourites**: Anonymous session-based history tracking and bookmarks for saved pairings (`/api/history`, `/api/favourites`).
- 🔤 **90+ Curated Typographic Archetypes**: Complete aesthetic taxonomy spanning *Swiss Bauhaus, Cyberpunk Neon, Quiet Luxury, 90s Grunge Zine, Dark Academia, Japanese Minimalist, Y2K Pop, 8-Bit Pixel RPG, Geneva Horology, Nordic Sauna*, and more.
- 🧪 **Interactive Type Lab Sandbox**:
  - Live editable specimen playground
  - Real-time optical size slider (24px – 140px)
  - Style modifiers (<kbd>Aa</kbd> Uppercase, <kbd>I</kbd> Italic, <kbd>B</kbd> Bold)
  - Color palette swatches and interactive hex color picker
  - One-click dummy copy presets (*Pangram, Headline, Alphabet, Numbers, Paragraph*)
- 💻 **Developer Code Export**: One-click `@import` and CSS custom property export, plus direct links to font specimen pages on [fonts.google.com](https://fonts.google.com/).
- ☁️ **Vercel Edge & Serverless Ready**: Native Hono.js router for zero-config global deployment.

---

## 🛠️ Project Structure

```text
Fontally/
├── api/
│   ├── index.js                  # Hono Vercel catch-all serverless entrypoint
│   ├── recommend.js              # Vercel Gemini recommendation endpoint
│   ├── fonts.js                  # Vercel font catalogue & similarity endpoint
│   ├── history.js                # Vercel session brief history endpoint
│   ├── favourites.js             # Vercel saved pairings endpoint
│   └── health.js                 # Vercel system health check endpoint
├── server/
│   ├── app.mjs                   # Unified Hono router with CORS, timing & error handling
│   ├── db/
│   │   ├── schema.sql            # Supabase PostgreSQL + pgvector schema & RLS policies
│   │   └── supabase.mjs          # Database client with in-memory fallback
│   ├── lib/
│   │   ├── embeddings.mjs        # Gemini gemini-embedding-001 vector generator
│   │   ├── font-catalog.mjs      # Enriched font catalogue dataset
│   │   └── fuzzy.mjs             # Fuse.js typo-tolerant multi-key search index
│   └── routes/
│       ├── recommend.mjs         # Recommendation route with persistent caching
│       ├── fonts.mjs             # Multi-mode search & similarity route
│       ├── history.mjs           # User history route
│       └── favourites.mjs        # User favourites bookmark route
├── scripts/
│   └── seed-fonts.mjs            # Seeding script with Gemini vector embeddings
├── src/
│   ├── main.js                   # Client state, Type Lab controller, local semantic engine
│   └── style.css                 # Vanilla CSS design system, dark mode & layout
├── tests/
│   ├── backend.test.js           # Vitest suite for Hono backend routes & search
│   └── scorer.test.js            # Vitest suite for Gemini response validation
├── vite.config.js                # Vite development server with Hono API middleware
├── vercel.json                   # Vercel deployment configuration
└── package.json                  # Dependencies, scripts, and metadata
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

Add your keys:
```dotenv
# Gemini API Configuration
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash

# Optional: Google Fonts API
GOOGLE_FONTS_API_KEY=optional_google_fonts_api_key_here

# Supabase Persistence & pgvector (Optional, falls back to in-memory)
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### 4. Database Setup & Seeding (Optional)
If using Supabase:
1. Run [`server/db/schema.sql`](server/db/schema.sql) in your Supabase **SQL Editor**.
2. Seed the font catalog and generate vector embeddings:
   ```bash
   npm run seed
   ```

### 5. Start Development Server
```bash
npm run dev
```
Open `http://localhost:5173/` in your browser.

---

## 🧪 Testing & Building

Run the complete Vitest test suite:
```bash
npm test -- --run
```

Build for production:
```bash
npm run build
```

Preview the production build locally:
```bash
npm run preview
```

---

## 🌐 API Architecture

### 1. `POST /api/recommend`
Generates typography recommendations based on natural-language briefs.

**Request Payload:**
```json
{
  "prompt": "A warm artisanal bakery brand with nostalgic 70s typography.",
  "profiles": [ /* catalog of archetype profiles */ ]
}
```

**Response:**
```json
{
  "profileId": "pastry-shop",
  "confidence": 0.94,
  "rationale": "Fluid retro curves evoke handcrafted dough and warm ovens.",
  "tags": ["NOSTALGIC", "WARM", "ARTISAN", "RETRO"]
}
```

---

### 2. `GET /api/fonts`
Multi-mode font catalogue search combining typo-tolerant fuzzy matching, database filters, and vector semantic similarity.

**Query Parameters:**
- `q` / `query` *(optional)*: Search query (e.g. `roboto`, `playfar`, `cyberpunk`, `clean`)
- `category` *(optional)*: `all` | `sans-serif` | `serif` | `display` | `monospace` | `handwriting`
- `variable` *(optional)*: `true` | `false` (filter variable fonts)
- `min_weight` / `max_weight` *(optional)*: Weight range filter (e.g. `300` to `800`)
- `mode` *(optional)*: `auto` | `fuzzy` | `semantic`
- `limit` *(optional)*: Maximum results (default: `250`)

---

### 3. `GET /api/fonts/similar/:family`
Finds fonts with the closest visual traits, classification, and mood vibes to a given font family.

**Example:**
```bash
curl http://localhost:5173/api/fonts/similar/Playfair%20Display
```

---

### 4. `GET /api/history` & `POST /api/history`
Anonymous session-based brief history tracking via `x-session-id` header or body parameter.

---

### 5. `GET /api/favourites` & `POST /api/favourites` & `DELETE /api/favourites/:id`
Save, retrieve, and delete bookmarked font pairings per session.

---

### 6. `GET /api/health`
System status and feature capability overview (Gemini, Supabase, vector search).

---

## 🚀 Deploy to Vercel

1. Push your repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import `Fontally`.
3. Add your Environment Variables in the Vercel Dashboard:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `GEMINI_MODEL`: `gemini-2.5-flash`
   - `SUPABASE_URL`: Your Supabase API URL *(optional)*
   - `SUPABASE_ANON_KEY`: Your Supabase Anon Key *(optional)*
   - `SUPABASE_SERVICE_ROLE_KEY`: Your Supabase Service Role Key *(optional)*
4. Click **Deploy**.

---

## 👨‍💻 Author

Designed and developed with passion by **Shreyash Kadam**.

- **Live Project**: [https://fontally.vercel.app/](https://fontally.vercel.app/)
- **LinkedIn**: [shreyashkadam400](https://www.linkedin.com/in/shreyashkadam400)
- **GitHub**: [@shreyashcoeptu-alt](https://github.com/shreyashcoeptu-alt)
