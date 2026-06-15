import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type { Order } from "../types";

export const orderApi = {
  getMyOrders: async (): Promise<Order[]> => {
    const { data } = await apiClient.get<Order[]>(API_ROUTES.ORDERS.MY_ORDERS);
    return data;
  },

  getById: async (id: string): Promise<Order> => {
    const { data } = await apiClient.get<Order>(API_ROUTES.ORDERS.BY_ID(id));
    return data;
  },
};
