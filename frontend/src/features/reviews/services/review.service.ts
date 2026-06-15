import apiClient from "@/lib/axios";
import type { CreateReviewPayload, UpdateReviewPayload, ReviewQueryParams, PaginatedReviews, Review } from "../types";

export const reviewApi = {
  getProductReviews: async (productId: string, params?: ReviewQueryParams): Promise<PaginatedReviews> => {
    const { data } = await apiClient.get<PaginatedReviews>(
      `/reviews/products/${productId}`,
      { params },
    );
    return data;
  },

  createReview: async (payload: CreateReviewPayload): Promise<Review> => {
    const { data } = await apiClient.post<Review>("/reviews", payload);
    return data;
  },

  updateReview: async (reviewId: string, payload: UpdateReviewPayload): Promise<Review> => {
    const { data } = await apiClient.put<Review>(`/reviews/${reviewId}`, payload);
    return data;
  },

  deleteReview: async (reviewId: string): Promise<void> => {
    await apiClient.delete(`/reviews/${reviewId}`);
  },

  getMyReviews: async (params?: ReviewQueryParams): Promise<PaginatedReviews> => {
    const { data } = await apiClient.get<PaginatedReviews>("/reviews/my-reviews", { params });
    return data;
  },
};
