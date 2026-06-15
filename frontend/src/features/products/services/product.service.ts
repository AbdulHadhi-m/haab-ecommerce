import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type {
  ProductsResponse,
  ProductResponse,
  ProductsQueryParams,
  CategoriesResponse,
} from "../types";

function buildQueryString(params: ProductsQueryParams): string {
  const searchParams = new URLSearchParams();

  if (params.page) searchParams.set("page", String(params.page));
  if (params.limit) searchParams.set("limit", String(params.limit));
  if (params.search) searchParams.set("search", params.search);
  if (params.category) searchParams.set("category", params.category);
  if (params.minPrice !== undefined) searchParams.set("minPrice", String(params.minPrice));
  if (params.maxPrice !== undefined) searchParams.set("maxPrice", String(params.maxPrice));
  if (params.sort) searchParams.set("sort", params.sort);
  if (params.featured) searchParams.set("featured", params.featured);

  const qs = searchParams.toString();
  return qs ? `?${qs}` : "";
}

export const productApi = {
  getAll: async (params: ProductsQueryParams = {}): Promise<ProductsResponse> => {
    const { data } = await apiClient.get<ProductsResponse>(
      `${API_ROUTES.PRODUCTS.BASE}${buildQueryString(params)}`,
    );
    return data;
  },

  getBySlug: async (slug: string): Promise<ProductResponse> => {
    const { data } = await apiClient.get<ProductResponse>(
      API_ROUTES.PRODUCTS.BY_SLUG(slug),
    );
    return data;
  },

  getFeatured: async (): Promise<ProductsResponse> => {
    const { data } = await apiClient.get<ProductsResponse>(
      `${API_ROUTES.PRODUCTS.BASE}?featured=true&limit=8`,
    );
    return data;
  },

  getRelated: async (slug: string, limit = 4): Promise<ProductsResponse> => {
    const { data } = await apiClient.get<ProductsResponse>(
      `${API_ROUTES.PRODUCTS.BASE}?relatedTo=${slug}&limit=${limit}`,
    );
    return data;
  },

  getCategories: async (): Promise<CategoriesResponse> => {
    const { data } = await apiClient.get<CategoriesResponse>(
      API_ROUTES.CATEGORIES.BASE,
    );
    return data;
  },
};
