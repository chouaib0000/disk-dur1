/*
  # Add sample products

  1. Changes
    - Insert sample products with correct category IDs
    - Match categories from frontend data
*/

-- Insert sample products
INSERT INTO public.products (
  name,
  slug,
  description,
  price,
  "originalPrice",
  discount,
  stock,
  rating,
  "reviewCount",
  "imageUrl",
  brand,
  "categoryId",
  tags,
  created_at
) VALUES
(
  'Samsung 870 EVO SSD 1TB',
  'samsung-870-evo-ssd-1tb',
  'SSD interne 2,5 pouces avec interface SATA III et technologie TLC',
  436,
  699,
  38,
  15,
  4.8,
  156,
  'https://images.pexels.com/photos/16065185/pexels-photo-16065185/free-photo-of-processeur-memoire-main-informatique.jpeg',
  'Samsung',
  '1-2', -- Maps to "SSD Internes" subcategory
  ARRAY['bestseller', 'featured'],
  NOW()
),
(
  'WD Elements 2TB External HDD',
  'wd-elements-2tb-external-hdd',
  'Disque dur externe portable de 2To avec connexion USB 3.0',
  266,
  399,
  33,
  25,
  4.6,
  203,
  'https://images.pexels.com/photos/7232455/pexels-photo-7232455.jpeg',
  'Western Digital',
  '2-1', -- Maps to "Disques Durs Externes" subcategory
  ARRAY['featured'],
  NOW()
);