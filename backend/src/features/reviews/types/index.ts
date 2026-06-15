export interface CreateReviewInput {
  productId: string;
  rating: number;
  title?: string;
  comment?: string;
}

export interface UpdateReviewInput {
  rating?: number;
  title?: string;
  comment?: string;
}

export interface ReviewQueryParams {
  page?: string;
  limit?: string;
  sort?: string;
}

export interface PaginatedReviewResult {
  reviews: unknown[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
