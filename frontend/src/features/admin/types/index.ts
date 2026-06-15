export interface DashboardStats {
  totalRevenue: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
}

export interface DashboardData {
  stats: DashboardStats;
  recentOrders: import("@/features/orders/types").Order[];
  latestCustomers: CustomerSummary[];
  ordersTrend: { month: string; revenue: number; orders: number }[];
  topProducts: { _id: string; totalQuantity: number; totalRevenue: number }[];
}

export interface CustomerSummary {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  createdAt: string;
  totalOrders: number;
  totalSpent: number;
}

export interface CustomersResponse {
  success: boolean;
  message: string;
  data: CustomerSummary[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export interface DashboardResponse {
  success: boolean;
  message: string;
  data: DashboardData;
}
