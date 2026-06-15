"use client";

import { DollarSign, ShoppingCart, Package, Users } from "lucide-react";
import { useDashboard } from "@/features/admin/hooks/useDashboard";
import { StatsCard } from "@/features/admin/components/stats-card";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { DashboardSkeleton } from "@/features/admin/components/skeletons";
import { formatPrice } from "@/shared/lib/utils";
import type { Order } from "@/features/orders/types";

export default function DashboardPage() {
  const { data, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div>
        <h1 className="mb-6 text-2xl font-bold tracking-tight">Dashboard</h1>
        <DashboardSkeleton />
      </div>
    );
  }

  const stats = data?.data?.stats;
  const recentOrders = data?.data?.recentOrders ?? [];
  const latestCustomers = data?.data?.latestCustomers ?? [];
  const ordersTrend = data?.data?.ordersTrend ?? [];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Dashboard</h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Revenue"
          value={formatPrice(stats?.totalRevenue ?? 0)}
          icon={<DollarSign className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Orders"
          value={stats?.totalOrders ?? 0}
          icon={<ShoppingCart className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          icon={<Package className="h-5 w-5" />}
        />
        <StatsCard
          title="Total Customers"
          value={stats?.totalCustomers ?? 0}
          icon={<Users className="h-5 w-5" />}
        />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="border border-brand-200 bg-white">
          <div className="border-b border-brand-200 px-6 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest">Recent Orders</h2>
          </div>
          <div className="divide-y divide-brand-100">
            {(recentOrders as Order[]).slice(0, 5).map((order) => (
              <div key={order._id} className="flex items-center justify-between px-6 py-3 text-sm">
                <div>
                  <p className="font-mono text-xs font-medium">{order.orderNumber}</p>
                  <p className="text-xs text-brand-500">
                    {(order.customer as unknown as { name?: string })?.name ?? "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xs font-semibold">{formatPrice(order.pricing.totalAmount)}</span>
                  <StatusBadge status={order.orderStatus} />
                </div>
              </div>
            ))}
            {recentOrders.length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-brand-400">No orders yet</p>
            )}
          </div>
        </div>

        <div className="border border-brand-200 bg-white">
          <div className="border-b border-brand-200 px-6 py-4">
            <h2 className="text-sm font-semibold uppercase tracking-widest">Latest Customers</h2>
          </div>
          <div className="divide-y divide-brand-100">
            {latestCustomers.map((customer) => (
              <div key={customer._id} className="flex items-center justify-between px-6 py-3 text-sm">
                <div>
                  <p className="font-medium">{customer.name}</p>
                  <p className="text-xs text-brand-500">{customer.email}</p>
                </div>
                <span className="text-xs text-brand-400">
                  {new Date(customer.createdAt).toLocaleDateString()}
                </span>
              </div>
            ))}
            {latestCustomers.length === 0 && (
              <p className="px-6 py-8 text-center text-sm text-brand-400">No customers yet</p>
            )}
          </div>
        </div>
      </div>

      {ordersTrend.length > 0 && (
        <div className="mt-6 border border-brand-200 bg-white px-6 py-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-widest">Monthly Revenue</h2>
          <div className="flex items-end gap-2">
            {ordersTrend.map((m) => {
              const maxRevenue = Math.max(...ordersTrend.map((x) => x.revenue));
              const height = maxRevenue > 0 ? (m.revenue / maxRevenue) * 120 : 0;
              return (
                <div key={m.month} className="flex flex-1 flex-col items-center gap-1">
                  <span className="text-[10px] font-medium text-brand-600">{formatPrice(m.revenue)}</span>
                  <div
                    className="w-full bg-brand-900 transition-all"
                    style={{ height: `${Math.max(height, 4)}px` }}
                  />
                  <span className="text-[10px] text-brand-400">{m.month.slice(5)}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
