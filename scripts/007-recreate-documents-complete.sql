-- Drop existing table and recreate with correct schema including expiration date
DROP TABLE IF EXISTS documents;

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  filename TEXT NOT NULL,
  original_name TEXT NOT NULL,
  blob_url TEXT NOT NULL,
  content_type TEXT NOT NULL,
  size INTEGER NOT NULL,
  category TEXT DEFAULT 'general',
  expiration_date DATE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
