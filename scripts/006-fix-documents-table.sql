-- Drop and recreate documents table with correct schema
DROP TABLE IF EXISTS documents;

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  category TEXT DEFAULT 'general',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
