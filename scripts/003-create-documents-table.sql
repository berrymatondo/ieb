CREATE TABLE IF NOT EXISTS documents (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  pathname VARCHAR(500) NOT NULL,
  url TEXT NOT NULL,
  size BIGINT NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  category VARCHAR(100) DEFAULT 'general',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_documents_category ON documents(category);
CREATE INDEX IF NOT EXISTS idx_documents_created_at ON documents(created_at DESC);
