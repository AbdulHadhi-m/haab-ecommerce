export interface PaginationOptions {
  page?: number;
  limit?: number;
  sort?: Record<string, 1 | -1>;
}

export interface PaginationResult {
  page: number;
  limit: number;
  total: number;
  pages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export function parsePaginationQuery(query: Record<string, unknown>): PaginationOptions {
  const page = Math.max(1, parseInt(query.page as string) || 1);
  const limit = Math.min(100, Math.max(1, parseInt(query.limit as string) || 20));

  let sort: Record<string, 1 | -1> = { createdAt: -1 };
  if (query.sort && typeof query.sort === "string") {
    sort = {};
    query.sort.split(",").forEach((field) => {
      if (field.startsWith("-")) {
        sort[field.slice(1)] = -1;
      } else {
        sort[field] = 1;
      }
    });
  }

  return { page, limit, sort };
}

export function getPaginationMeta(total: number, page: number, limit: number): PaginationResult {
  const pages = Math.ceil(total / limit);
  return {
    page,
    limit,
    total,
    pages,
    hasNext: page < pages,
    hasPrev: page > 1,
  };
}

export function getSkip(page: number, limit: number): number {
  return (page - 1) * limit;
}
