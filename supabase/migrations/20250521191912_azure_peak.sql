/*
  # Update products table RLS policies

  1. Changes
    - Drop existing RLS policies
    - Add new policy allowing authenticated users full access
    - Keep public read access policy

  2. Security
    - Maintain public read access
    - Allow all authenticated users to manage products
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Products are viewable by everyone" ON public.products;
DROP POLICY IF EXISTS "Admins have full access to products" ON public.products;

-- Allow read access for everyone
CREATE POLICY "Products are viewable by everyone"
  ON public.products
  FOR SELECT
  TO public
  USING (true);

-- Allow full access for any authenticated user
CREATE POLICY "Authenticated users have full access to products"
  ON public.products
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);