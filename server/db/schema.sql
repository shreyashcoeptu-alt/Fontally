-- Fontally: Supabase PostgreSQL + pgvector Schema
-- Run this in the Supabase SQL Editor to initialize your database schema.
-- After running this schema, run server/db/seed.sql to populate 130+ enriched Google Fonts,
-- or run `npm run seed` to generate AI vector embeddings and seed via Node.js.

-- 1. Enable the pgvector extension for AI embeddings
CREATE EXTENSION IF NOT EXISTS vector;

-- 2. Fonts Catalog Table with Vector Embeddings
CREATE TABLE IF NOT EXISTS fonts (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  family           TEXT NOT NULL UNIQUE,
  category         TEXT NOT NULL, -- 'sans-serif', 'serif', 'display', 'monospace', 'handwriting'
  variants         JSONB NOT NULL DEFAULT '["400"]'::jsonb,
  designer         TEXT,
  foundry          TEXT,
  year             INT,
  license          TEXT DEFAULT 'OFL',
  is_variable      BOOLEAN DEFAULT FALSE,
  is_color         BOOLEAN DEFAULT FALSE,
  min_weight       INT DEFAULT 400,
  max_weight       INT DEFAULT 700,
  axes             JSONB DEFAULT '{}'::jsonb,
  subsets          JSONB DEFAULT '["latin"]'::jsonb,
  popularity       INT DEFAULT 0,
  mood_tags        TEXT[] DEFAULT '{}',
  use_cases        TEXT[] DEFAULT '{}',
  description      TEXT,
  embedding        vector(768), -- Gemini gemini-embedding-001 768-dimensional vector
  google_fonts_url TEXT,
  specimen_url     TEXT,
  created_at       TIMESTAMPTZ DEFAULT now()
);

-- No vector index on purpose. An exact scan of ~130 rows takes well under a
-- millisecond. The old ivfflat index was never used (match_fonts orders by
-- similarity, not by `embedding <=> q`) and was built on an empty table, which
-- leaves ivfflat with useless centroids. Revisit (HNSW) only past ~10k fonts.
DROP INDEX IF EXISTS fonts_embedding_idx;

-- Indexes for fast filtering and full-text search
CREATE INDEX IF NOT EXISTS fonts_category_idx ON fonts(category);
CREATE INDEX IF NOT EXISTS fonts_is_variable_idx ON fonts(is_variable);
CREATE INDEX IF NOT EXISTS fonts_popularity_idx ON fonts(popularity DESC);
CREATE INDEX IF NOT EXISTS fonts_family_lower_idx ON fonts(lower(family));
CREATE INDEX IF NOT EXISTS fonts_mood_tags_idx ON fonts USING GIN (mood_tags);

-- 3. Stored Procedure: Match fonts by vector cosine similarity
CREATE OR REPLACE FUNCTION match_fonts (
  query_embedding vector(768),
  match_threshold float DEFAULT 0.3,
  match_count int DEFAULT 20,
  filter_category text DEFAULT NULL,
  filter_variable boolean DEFAULT NULL
)
RETURNS TABLE (
  id uuid,
  family text,
  category text,
  variants jsonb,
  designer text,
  is_variable boolean,
  min_weight int,
  max_weight int,
  mood_tags text[],
  description text,
  similarity float
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.id,
    f.family,
    f.category,
    f.variants,
    f.designer,
    f.is_variable,
    f.min_weight,
    f.max_weight,
    f.mood_tags,
    f.description,
    (1 - (f.embedding <=> query_embedding)) AS similarity
  FROM fonts f
  WHERE f.embedding IS NOT NULL
    AND (filter_category IS NULL OR filter_category = 'all' OR lower(f.category) = lower(filter_category))
    AND (filter_variable IS NULL OR f.is_variable = filter_variable)
    AND (1 - (f.embedding <=> query_embedding)) >= match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
END;
$$;

-- 4. Persistent Gemini Recommendation Cache
CREATE TABLE IF NOT EXISTS recommendation_cache (
  cache_key    TEXT PRIMARY KEY,
  profile_id   TEXT NOT NULL,
  confidence   FLOAT NOT NULL,
  rationale    TEXT NOT NULL,
  tags         TEXT[] DEFAULT '{}',
  hit_count    INT DEFAULT 1,
  created_at   TIMESTAMPTZ DEFAULT now(),
  last_hit_at  TIMESTAMPTZ DEFAULT now()
);

-- Top-3 recommendations (added in v2; safe to re-run on existing databases)
ALTER TABLE recommendation_cache ADD COLUMN IF NOT EXISTS picks JSONB DEFAULT '[]'::jsonb;
ALTER TABLE recommendation_cache ADD COLUMN IF NOT EXISTS brand_name TEXT DEFAULT '';

CREATE INDEX IF NOT EXISTS recommendation_cache_last_hit_idx
  ON recommendation_cache(last_hit_at DESC);

-- Atomic hit counter. The API used to read hit_count and write back +1, which
-- lost counts when two visitors hit the same brief at once.
CREATE OR REPLACE FUNCTION increment_cache_hit(key text)
RETURNS void
LANGUAGE sql
AS $$
  UPDATE recommendation_cache
  SET hit_count = hit_count + 1, last_hit_at = now()
  WHERE cache_key = key;
$$;
REVOKE EXECUTE ON FUNCTION increment_cache_hit(text) FROM PUBLIC, anon, authenticated;

-- 5. User Search & Brief History (Anonymous session-based)
CREATE TABLE IF NOT EXISTS user_history (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id  TEXT NOT NULL,
  brief       TEXT NOT NULL,
  profile_id  TEXT NOT NULL,
  rationale   TEXT,
  tags        TEXT[] DEFAULT '{}',
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS user_history_session_idx 
  ON user_history(session_id, created_at DESC);

-- 6. User Saved Favourites
CREATE TABLE IF NOT EXISTS user_favourites (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id   TEXT NOT NULL,
  profile_id   TEXT,
  heading_font TEXT NOT NULL,
  body_font    TEXT NOT NULL,
  label        TEXT,
  created_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE (session_id, heading_font, body_font)
);

CREATE INDEX IF NOT EXISTS user_favourites_session_idx 
  ON user_favourites(session_id, created_at DESC);

-- 6b. Recommendation feedback: which pick people actually used for a brief.
-- Read back per brief to promote alternates that visitors consistently prefer.
CREATE TABLE IF NOT EXISTS feedback_events (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  session_id  TEXT,
  brief_key   TEXT NOT NULL,
  profile_id  TEXT NOT NULL,
  event       TEXT NOT NULL CHECK (event IN ('choose_alternate', 'copy_css', 'save', 'open_google_fonts')),
  created_at  TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS feedback_events_brief_idx ON feedback_events(brief_key);

-- 6c. Daily embedding budget shared by every serverless instance.
-- The Gemini free tier allows ~1,000 embeds/day per key; per-IP limits alone let
-- one client exhaust it. Days follow Pacific time, when Gemini quotas reset.
CREATE TABLE IF NOT EXISTS embed_usage (
  day   DATE PRIMARY KEY,
  count INT NOT NULL DEFAULT 0
);

-- true = one embed reserved for today; false = today's budget is spent
CREATE OR REPLACE FUNCTION try_consume_embed(max_per_day int)
RETURNS boolean
LANGUAGE plpgsql
AS $$
DECLARE
  used int;
BEGIN
  INSERT INTO embed_usage AS u (day, count)
  VALUES ((now() AT TIME ZONE 'America/Los_Angeles')::date, 1)
  ON CONFLICT (day) DO UPDATE SET count = u.count + 1
    WHERE u.count < max_per_day
  RETURNING u.count INTO used;
  RETURN used IS NOT NULL;
END;
$$;
REVOKE EXECUTE ON FUNCTION try_consume_embed(int) FROM PUBLIC, anon, authenticated;

-- =============================================================
-- 7. Row Level Security (RLS) Configuration
-- =============================================================

-- Enable RLS on all tables
ALTER TABLE fonts ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favourites ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE embed_usage ENABLE ROW LEVEL SECURITY;

-- The API server talks to Supabase with the SERVICE ROLE key, which bypasses RLS.
-- So the only policy needed is public read access to the font catalog.
-- Everything else (cache, history, favourites) is deliberately NOT reachable with
-- the anon key: previous "USING (true)" policies let anyone holding the anon key
-- read every user's briefs and rewrite the font catalog and cache.
DROP POLICY IF EXISTS "Fonts are readable by all" ON fonts;
CREATE POLICY "Fonts are readable by all" ON fonts
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can modify fonts" ON fonts;
DROP POLICY IF EXISTS "Cache is readable by all" ON recommendation_cache;
DROP POLICY IF EXISTS "Cache is modifiable by all" ON recommendation_cache;
DROP POLICY IF EXISTS "History is readable by all" ON user_history;
DROP POLICY IF EXISTS "History is insertable by all" ON user_history;
DROP POLICY IF EXISTS "Favourites are manageable by all" ON user_favourites;
