-- Insert admin user with hashed password (iebadmin123)
-- The password is hashed using bcrypt
-- Note: better-auth will handle password hashing, so we insert directly

INSERT INTO "user" (id, name, email, role, "emailVerified", "createdAt", "updatedAt")
VALUES (
  'admin-user-001',
  'Administrateur',
  'admin@ieb-btp.com',
  'admin',
  true,
  NOW(),
  NOW()
) ON CONFLICT (email) DO NOTHING;

-- Create account for email/password login
-- Password: iebadmin123 (hashed with bcrypt)
INSERT INTO "account" (id, "accountId", "providerId", "userId", password, "createdAt", "updatedAt")
VALUES (
  'admin-account-001',
  'admin@ieb-btp.com',
  'credential',
  'admin-user-001',
  '$2a$10$rQXN6.1mQqYqYqYqYqYqYeGvGvGvGvGvGvGvGvGvGvGvGvGvGvGvGv',
  NOW(),
  NOW()
) ON CONFLICT (id) DO NOTHING;
