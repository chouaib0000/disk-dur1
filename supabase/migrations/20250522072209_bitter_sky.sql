/*
  # Create settings table

  1. New Tables
    - `settings`
      - `id` (text, primary key)
      - `whatsapp_number` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `settings` table
    - Add policy for authenticated users to manage settings
    - Add policy for public users to read settings
*/

CREATE TABLE IF NOT EXISTS settings (
  id text PRIMARY KEY,
  whatsapp_number text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Allow read access for everyone
CREATE POLICY "Settings are viewable by everyone"
  ON settings
  FOR SELECT
  TO public
  USING (true);

-- Allow full access for authenticated users
CREATE POLICY "Authenticated users can manage settings"
  ON settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Insert default WhatsApp number
INSERT INTO settings (id, whatsapp_number)
VALUES ('1', '+212522123456')
ON CONFLICT (id) DO NOTHING;