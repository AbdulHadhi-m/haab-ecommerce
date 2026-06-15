"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.service";
import { PRODUCTS_KEYS } from "../constants";

export function useFeaturedProducts() {
  return useQuery({
    queryKey: PRODUCTS_KEYS.FEATURED(),
    queryFn: () => productApi.getFeatured(),
    staleTime: 10 * 60 * 1000,
  });
}
