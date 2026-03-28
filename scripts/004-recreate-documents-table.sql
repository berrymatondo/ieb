-- Drop and recreate documents table with correct schema
DROP TABLE IF EXISTS documents;

CREATE TABLE documents (
  id SERIAL PRIMARY KEY,
  pathname VARCHAR(500) NOT NULL,
  original_name VARCHAR(255) NOT NULL,
  content_type VARCHAR(100) NOT NULL,
  size INTEGER NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
