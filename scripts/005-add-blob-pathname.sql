-- Add blob_pathname column if it doesn't exist
ALTER TABLE documents ADD COLUMN IF NOT EXISTS blob_pathname TEXT;
