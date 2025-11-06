export interface SubCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string;
  description?: string;
  imageUrl?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  imageUrl: string;
  subcategories: SubCategory[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  stock: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  brand: string;
  categoryId: string;
  date: string;
  tags: string[];
}