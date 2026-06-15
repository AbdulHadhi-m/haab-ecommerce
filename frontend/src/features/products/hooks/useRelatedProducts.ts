"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.service";
import { PRODUCTS_KEYS } from "../constants";

export function useRelatedProducts(slug: string, limit = 4) {
  return useQuery({
    queryKey: PRODUCTS_KEYS.RELATED(slug),
    queryFn: () => productApi.getRelated(slug, limit),
    enabled: !!slug,
  });
}
