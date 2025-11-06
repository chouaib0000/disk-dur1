/*
  # Create admin user

  1. Create admin user with email and password
  2. Set admin role for the user
*/

-- Create admin user with email and password
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at
)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  gen_random_uuid(),
  'authenticated',
  'admin',
  'admin@disquedur.ma',
  crypt('Admin123!', gen_salt('bf')),
  now(),
  now(),
  now()
)
ON CONFLICT (email) DO NOTHING;

-- Ensure the user has the admin role
UPDATE auth.users
SET role = 'admin'
WHERE email = 'admin@disquedur.ma';