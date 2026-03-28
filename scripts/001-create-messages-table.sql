-- Create messages table for contact form submissions
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  subject VARCHAR(500) NOT NULL,
  message TEXT NOT NULL,
  is_treated BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for filtering
CREATE INDEX IF NOT EXISTS idx_messages_is_treated ON messages(is_treated);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
