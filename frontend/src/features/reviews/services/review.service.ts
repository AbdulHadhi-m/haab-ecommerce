import apiClient from "@/lib/axios";
import type { CreateReviewPayload, UpdateReviewPayload, ReviewQueryParams, PaginatedReviews, Review } from "../types";

export const reviewApi = {
  getProductReviews: async (productId: string, params?: ReviewQueryParams): Promise<PaginatedReviews> => {
    const { data } = await apiClient.get<{ success: boolean; data: PaginatedReviews }>(
      `/reviews/products/${productId}`,
      { params },
    );
    return data.data;
  },

  createReview: async (payload: CreateReviewPayload): Promise<Review> => {
    const { data } = await apiClient.post<{ success: boolean; data: Review }>("/reviews", payload);
    return data.data;
  },

  updateReview: async (reviewId: string, payload: UpdateReviewPayload): Promise<Review> => {
    const { data } = await apiClient.put<{ success: boolean; data: Review }>(`/reviews/${reviewId}`, payload);
    return data.data;
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    await apiClient.delete(`/reviews/${reviewId}`);
  },

  getMyReviews: async (params?: ReviewQueryParams): Promise<PaginatedReviews> => {
    const { data } = await apiClient.get<{ success: boolean; data: PaginatedReviews }>("/reviews/my-reviews", { params });
    return data.data;
  },
};
