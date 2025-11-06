/*
  # Create products table

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `description` (text)
      - `price` (numeric)
      - `original_price` (numeric)
      - `discount` (integer)
      - `stock` (integer)
      - `rating` (numeric)
      - `review_count` (integer)
      - `image_url` (text)
      - `brand` (text)
      - `category_id` (text)
      - `tags` (text[])
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)

  2. Security
    - Enable RLS on `products` table
    - Add policy for authenticated admin users to perform all operations
    - Add policy for public users to read products
*/

-- Drop the table if it exists to ensure a clean state
DROP TABLE IF EXISTS public.products;

CREATE TABLE public.products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  price numeric NOT NULL,
  original_price numeric NOT NULL,
  discount integer DEFAULT 0,
  stock integer DEFAULT 0,
  rating numeric DEFAULT 0,
  review_count integer DEFAULT 0,
  image_url text,
  brand text,
  category_id text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Allow read access for everyone
CREATE POLICY "Products are viewable by everyone"
  ON public.products
  FOR SELECT
  TO public
  USING (true);

-- Allow full access for authenticated admin users
CREATE POLICY "Admins have full access to products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin')
  WITH CHECK (auth.jwt() ->> 'role' = 'admin');