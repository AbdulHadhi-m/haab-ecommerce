"use client";

import { useQuery } from "@tanstack/react-query";
import { productApi } from "../services/product.service";
import { PRODUCTS_KEYS } from "../constants";
import type { ProductsQueryParams } from "../types";

export function useProducts(params: ProductsQueryParams = {}) {
  return useQuery({
    queryKey: PRODUCTS_KEYS.LIST(params as Record<string, unknown>),
    queryFn: () => productApi.getAll(params),
  });
}
