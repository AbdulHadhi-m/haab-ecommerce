export interface PaginationQuery {
  page?: string;
  limit?: string;
  sort?: string;
  order?: "asc" | "desc";
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
