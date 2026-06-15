"use client";

import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../services/admin.service";
import { ADMIN_KEYS } from "../constants";

export function useDashboard() {
  return useQuery({
    queryKey: ADMIN_KEYS.dashboard,
    queryFn: () => adminApi.getDashboard(),
  });
}
