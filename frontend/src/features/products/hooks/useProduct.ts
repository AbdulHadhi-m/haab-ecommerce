"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.service";
import { PRODUCTS_KEYS } from "../constants";

export function useProduct(slug: string) {
  return useQuery({
    queryKey: PRODUCTS_KEYS.DETAIL(slug),
    queryFn: () => productApi.getBySlug(slug),
    enabled: !!slug,
  });
}
