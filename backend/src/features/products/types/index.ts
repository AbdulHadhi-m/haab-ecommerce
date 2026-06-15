export interface ImageInput {
  url: string;
  publicId: string;
}

export interface CreateProductInput {
  name: string;
  slug?: string;
  description: string;
  price: number;
  discountPrice?: number | null;
  images?: ImageInput[];
  stock: number;
  sku: string;
  category: string;
  featured?: boolean;
  isActive?: boolean;
}

export interface UpdateProductInput {
  name?: string;
  slug?: string;
  description?: string;
  price?: number;
  discountPrice?: number | null;
  images?: ImageInput[];
  stock?: number;
  sku?: string;
  category?: string;
  featured?: boolean;
  isActive?: boolean;
}

export interface ProductQuery {
  page?: string;
  limit?: string;
  search?: string;
  category?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
  featured?: string;
  isActive?: string;
}

export interface ProductFilter {
  isActive?: boolean;
  category?: string;
  featured?: boolean;
  price?: { $gte?: number; $lte?: number };
  $text?: { $search: string };
}

export interface ProductSort {
  [key: string]: 1 | -1;
}
