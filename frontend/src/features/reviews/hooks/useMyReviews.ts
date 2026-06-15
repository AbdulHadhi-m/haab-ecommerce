"use client";

import { useQuery } from "@tanstack/react-query";
import { reviewApi } from "../services";
import { REVIEWS_KEYS } from "../constants";
import type { ReviewQueryParams } from "../types";

export function useMyReviews(params?: ReviewQueryParams) {
  return useQuery({
    queryKey: REVIEWS_KEYS.MY(),
    queryFn: () => reviewApi.getMyReviews(params),
  });
}
