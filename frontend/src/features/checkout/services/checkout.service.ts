import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type { CreateOrderPayload } from "../types";
import type { Order } from "@/features/orders/types";

interface CreateOrderResponse {
  success: boolean;
  message: string;
  data: Order;
}

export const checkoutApi = {
  createOrder: async (payload: CreateOrderPayload): Promise<CreateOrderResponse> => {
    const { data } = await apiClient.post<CreateOrderResponse>(
      API_ROUTES.ORDERS.CREATE,
      payload,
    );
    return data;
  },
};
