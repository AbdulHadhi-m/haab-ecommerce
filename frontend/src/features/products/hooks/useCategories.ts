"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.service";
import { CATEGORIES_KEYS } from "../constants";

export function useCategories() {
  return useQuery({
    queryKey: CATEGORIES_KEYS.ALL,
    queryFn: () => productApi.getCategories(),
    staleTime: 10 * 60 * 1000,
  });
}
