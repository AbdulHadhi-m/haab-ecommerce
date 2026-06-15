import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type { CreateOrderPayload } from "../types";
import type { Order } from "@/features/orders/types";

export const checkoutApi = {
  createOrder: async (payload: CreateOrderPayload): Promise<Order> => {
    const { data } = await apiClient.post<Order>(
      API_ROUTES.ORDERS.CREATE,
      payload,
    );
    return data;
  },
};
