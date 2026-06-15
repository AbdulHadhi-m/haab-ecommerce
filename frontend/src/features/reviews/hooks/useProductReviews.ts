"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "../services";
import { REVIEWS_KEYS } from "../constants";
import type { ReviewQueryParams } from "../types";

export function useProductReviews(productId: string, params?: ReviewQueryParams) {
  return useQuery({
    queryKey: REVIEWS_KEYS.PRODUCT(productId),
    queryFn: () => reviewApi.getProductReviews(productId, params),
    enabled: !!productId,
  });
}
