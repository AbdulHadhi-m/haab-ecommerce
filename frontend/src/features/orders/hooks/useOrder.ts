"use client";

import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../services/order.service";
import { ORDERS_KEYS } from "../constants";

export function useOrder(id: string) {
  return useQuery({
    queryKey: ORDERS_KEYS.DETAIL(id),
    queryFn: () => orderApi.getById(id),
    enabled: !!id,
  });
}
