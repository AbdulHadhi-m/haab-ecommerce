import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type { OrdersResponse, OrderResponse } from "../types";

export const orderApi = {
  getMyOrders: async (): Promise<OrdersResponse> => {
    const { data } = await apiClient.get<OrdersResponse>(API_ROUTES.ORDERS.MY_ORDERS);
    return data;
  },

  getById: async (id: string): Promise<OrderResponse> => {
    const { data } = await apiClient.get<OrderResponse>(API_ROUTES.ORDERS.BY_ID(id));
    return data;
  },
};
