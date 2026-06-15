"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "../services";
import { REVIEWS_KEYS } from "../constants";
import type { UpdateReviewPayload } from "../types";

export function useUpdateReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ reviewId, payload }: { reviewId: string; payload: UpdateReviewPayload }) =>
      reviewApi.updateReview(reviewId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_KEYS.ALL });
    },
  });
}
