-- Rename columns to match frontend naming
ALTER TABLE public.products 
  RENAME COLUMN original_price TO "originalPrice";

ALTER TABLE public.products 
  RENAME COLUMN image_url TO "imageUrl";

ALTER TABLE public.products 
  RENAME COLUMN category_id TO "categoryId";

ALTER TABLE public.products 
  RENAME COLUMN review_count TO "reviewCount";

-- Add images array column
ALTER TABLE public.products 
  ADD COLUMN images text[] DEFAULT '{}'::text[];