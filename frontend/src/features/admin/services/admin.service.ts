import apiClient from "@/lib/axios";
import { API_ROUTES } from "@/constants";
import type { DashboardData, CustomersResponse } from "../types";

export const adminApi = {
  getDashboard: async (): Promise<DashboardData> => {
    const { data } = await apiClient.get<DashboardData>("/admin/dashboard");
    return data;
  },

  getCustomers: async (params?: {
    page?: number;
    limit?: number;
    search?: string;
  }): Promise<CustomersResponse> => {
    const { data } = await apiClient.get<CustomersResponse>("/admin/customers", { params });
    return data;
  },
};
