-- Add missing emailVerified column to user table
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "emailVerified" BOOLEAN NOT NULL DEFAULT false;

-- Also ensure createdAt and updatedAt columns exist
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "createdAt" TIMESTAMP NOT NULL DEFAULT NOW();
ALTER TABLE "user" ADD COLUMN IF NOT EXISTS "updatedAt" TIMESTAMP NOT NULL DEFAULT NOW();
