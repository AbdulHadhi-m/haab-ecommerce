"use client";

import { useQuery } from "@tanstack/react-query";
import { orderApi } from "../services/order.service";
import { ORDERS_KEYS } from "../constants";

export function useOrders() {
  return useQuery({
    queryKey: ORDERS_KEYS.LIST(),
    queryFn: () => orderApi.getMyOrders(),
  });
}
