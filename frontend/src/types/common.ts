export type SortDirection = "asc" | "desc";

export interface PaginationParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: SortDirection;
}

export interface SelectOption {
  label: string;
  value: string;
}
