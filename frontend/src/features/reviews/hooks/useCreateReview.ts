"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "../services";
import { REVIEWS_KEYS } from "../constants";
import type { CreateReviewPayload } from "../types";

export function useCreateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateReviewPayload) => reviewApi.createReview(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_KEYS.PRODUCT(data.product) });
      queryClient.invalidateQueries({ queryKey: REVIEWS_KEYS.MY() });
    },
  });
}
