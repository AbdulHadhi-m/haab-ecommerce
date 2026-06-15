"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../services/admin.service";
import { ADMIN_KEYS } from "../constants";

export function useCustomers(params?: {
  page?: number;
  limit?: number;
  search?: string;
}) {
  return useQuery({
    queryKey: [...ADMIN_KEYS.customers, params],
    queryFn: () => adminApi.getCustomers(params),
  });
}
