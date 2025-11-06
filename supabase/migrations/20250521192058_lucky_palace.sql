/*
  # Create storage bucket and policies for products

  1. Changes
    - Create products storage bucket if it doesn't exist
    - Add storage policies for authenticated users
*/

-- Enable storage by creating the products bucket
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload files
CREATE POLICY "Authenticated users can upload product images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'products'
);

-- Allow authenticated users to update files
CREATE POLICY "Authenticated users can update product images"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'products'
);

-- Allow public access to product images
CREATE POLICY "Anyone can view product images"
ON storage.objects
FOR SELECT
TO public
USING (
  bucket_id = 'products'
);

-- Allow authenticated users to delete files
CREATE POLICY "Authenticated users can delete product images"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'products'
);