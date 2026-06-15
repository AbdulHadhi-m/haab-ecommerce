"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { reviewApi } from "../services";
import { REVIEWS_KEYS } from "../constants";

export function useDeleteReview() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (reviewId: string) => reviewApi.deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: REVIEWS_KEYS.ALL });
    },
  });
}
