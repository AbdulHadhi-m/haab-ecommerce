"use client";

import { DollarSign, ShoppingCart, Package, Users, TrendingUp } from "lucide-react";
import { useDashboard } from "@/features/admin/hooks/useDashboard";
import { StatsCard } from "@/features/admin/components/stats-card";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { DashboardSkeleton } from "@/features/admin/components/skeletons";
import { formatPrice } from "@/shared/lib/utils";
import type { Order } from "@/features/orders/types";

export default function AnalyticsPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold tracking-tight">Analytics</h1>
        <DashboardSkeleton />
      </div>
    );
  }

  const stats = data?.data?.stats;
  const ordersTrend = data?.data?.ordersTrend ?? [];
  const topProducts = data?.data?.topProducts ?? [];
  const recentOrders = data?.data?.recentOrders ?? [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Analytics</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard title="Revenue" value={formatPrice(stats?.totalRevenue ?? 0)} icon={<DollarSign className="h-5 w-5" />} />
        <StatsCard title="Orders" value={stats?.totalOrders ?? 0} icon={<ShoppingCart className="h-5 w-5" />} />
        <StatsCard title="Products" value={stats?.totalProducts ?? 0} icon={<Package className="h-5 w-5" />} />
        <StatsCard title="Customers" value={stats?.totalCustomers ?? 0} icon={<Users className="h-5 w-5" />} />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-brand-200 bg-white p-6">
          <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-widest">
            <TrendingUp className="h-4 w-4" />
            Monthly Sales Trend
          </h2>
          {ordersTrend.length > 0 ? (
            <div className="flex items-end gap-2">
              {ordersTrend.map((m) => {
                const max = Math.max(...ordersTrend.map((x) => x.orders));
                const height = max > 0 ? (m.orders / max) * 150 : 0;
                return (
                  <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                    <span className="text-[10px] font-medium">{m.orders}</span>
                    <div className="w-full bg-brand-500 transition-all" style={{ height: `${Math.max(height, 4)}px` }} />
                    <span className="text-[10px] text-brand-400">{m.month.slice(5)}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-brand-400">No data yet</p>
          )}
        </div>

        <div className="border border-brand-200 bg-white p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">Top Selling Products</h2>
          {topProducts.length > 0 ? (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p._id} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3">
                    <span className="flex h-6 w-6 items-center justify-center bg-brand-900 text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="font-medium">{p._id}</span>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">{p.totalQuantity} sold</p>
                    <p className="text-xs text-brand-400">{formatPrice(p.totalRevenue)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-400">No sales data yet</p>
          )}
        </div>
      </div>

      <div className="mt-6 border border-brand-200 bg-white">
        <div className="border-b border-brand-200 px-6 py-4">
          <h2 className="text-sm font-semibold uppercase tracking-widest">Recent Orders</h2>
        </div>
        <div className="divide-y divide-brand-100">
          {(recentOrders as Order[]).slice(0, 5).map((order) => (
            <div key={order._id} className="flex items-center justify-between px-6 py-3 text-sm">
              <div>
                <p className="font-mono text-xs font-medium">{order.orderNumber}</p>
                <p className="text-xs text-brand-500">
                  {(order.shippingAddress as unknown as { fullName: string })?.fullName ?? "N/A"}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs font-semibold">{formatPrice(order.pricing.totalAmount)}</span>
                <StatusBadge status={order.orderStatus} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
