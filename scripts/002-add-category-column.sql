-- Add category column to messages table
ALTER TABLE messages ADD COLUMN IF NOT EXISTS category VARCHAR(100);
