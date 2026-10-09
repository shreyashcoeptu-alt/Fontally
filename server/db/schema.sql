-- Fontally: Supabase PostgreSQL + pgvector Schema
-- Run this in the Supabase SQL Editor to initialize your database.

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

-- Index for vector cosine similarity search
CREATE INDEX IF NOT EXISTS fonts_embedding_idx 
  ON fonts USING ivfflat (embedding vector_cosine_ops) 
  WITH (lists = 50);

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

CREATE INDEX IF NOT EXISTS recommendation_cache_last_hit_idx 
  ON recommendation_cache(last_hit_at DESC);

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

-- =============================================================
-- 7. Row Level Security (RLS) Configuration
-- =============================================================

-- Enable RLS on all tables
ALTER TABLE fonts ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendation_cache ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_favourites ENABLE ROW LEVEL SECURITY;

-- Fonts: Public can read, only service_role can write
DROP POLICY IF EXISTS "Fonts are readable by all" ON fonts;
CREATE POLICY "Fonts are readable by all" ON fonts
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Service role can modify fonts" ON fonts;
CREATE POLICY "Service role can modify fonts" ON fonts
  FOR ALL USING (true) WITH CHECK (true);

-- Recommendation Cache: Public read & upsert
DROP POLICY IF EXISTS "Cache is readable by all" ON recommendation_cache;
CREATE POLICY "Cache is readable by all" ON recommendation_cache
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Cache is modifiable by all" ON recommendation_cache;
CREATE POLICY "Cache is modifiable by all" ON recommendation_cache
  FOR ALL USING (true) WITH CHECK (true);

-- User History: Readable and insertable
DROP POLICY IF EXISTS "History is readable by all" ON user_history;
CREATE POLICY "History is readable by all" ON user_history
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "History is insertable by all" ON user_history;
CREATE POLICY "History is insertable by all" ON user_history
  FOR INSERT WITH CHECK (true);

-- User Favourites: Readable and modifiable
DROP POLICY IF EXISTS "Favourites are manageable by all" ON user_favourites;
CREATE POLICY "Favourites are manageable by all" ON user_favourites
  FOR ALL USING (true) WITH CHECK (true);
