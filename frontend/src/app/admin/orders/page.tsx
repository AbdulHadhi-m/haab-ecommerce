"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import apiClient from "@/lib/axios";
import { formatPrice } from "@/shared/lib/utils";
import { DataTable, type Column } from "@/features/admin/components/data-table";
import { SearchBar } from "@/features/admin/components/search-bar";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { AdminPagination } from "@/features/admin/components/admin-pagination";
import { TableSkeleton } from "@/features/admin/components/skeletons";
import { toast } from "sonner";
import type { Order, OrderStatus } from "@/features/orders/types";

const STATUS_OPTIONS: OrderStatus[] = ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"];

interface OrdersResponse {
  success: boolean;
  data: Order[];
  meta: { page: number; limit: number; total: number; totalPages: number };
}

export default function AdminOrdersPage() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useQuery<OrdersResponse>({
    queryKey: ["admin", "orders", page, search],
    queryFn: async () => {
      const res = await apiClient.get("/orders/admin/all", { params: { page, limit: 10, search: search || undefined } });
      return res.data;
    },
  });

  const orders = data?.data ?? [];
  const meta = data?.meta;

  async function updateStatus(id: string, status: OrderStatus) {
    try {
      await apiClient.patch(`/orders/${id}/status`, { orderStatus: status });
      toast.success("Order status updated");
      queryClient.invalidateQueries({ queryKey: ["admin", "orders"] });
    } catch {
      toast.error("Failed to update status");
    }
  }

  const columns: Column<Order>[] = [
    {
      key: "orderNumber",
      header: "Order",
      render: (o) => <span className="font-mono text-xs font-medium">{o.orderNumber}</span>,
    },
    {
      key: "customer",
      header: "Customer",
      render: (o) => (
        <div>
          <p className="text-sm font-medium">{(o.shippingAddress as unknown as { fullName: string })?.fullName ?? "N/A"}</p>
          <p className="text-xs text-brand-400">{(o.shippingAddress as unknown as { email: string })?.email ?? ""}</p>
        </div>
      ),
    },
    {
      key: "date",
      header: "Date",
      render: (o) => <span className="text-xs text-brand-500">{new Date(o.createdAt).toLocaleDateString()}</span>,
    },
    {
      key: "amount",
      header: "Amount",
      render: (o) => <span className="font-semibold">{formatPrice(o.pricing.totalAmount)}</span>,
    },
    {
      key: "status",
      header: "Status",
      render: (o) => (
        <div className="relative inline-block">
          <select
            value={o.orderStatus}
            onChange={(e) => updateStatus(o._id, e.target.value as OrderStatus)}
            className="appearance-none rounded-none border border-brand-200 bg-white py-1 pl-2 pr-6 text-xs font-semibold uppercase tracking-wider outline-none focus:border-brand-900"
          >
            {STATUS_OPTIONS.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-3 w-3 -translate-y-1/2 text-brand-400" />
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Orders</h1>

      <div className="mb-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search orders..." />
      </div>

      {isLoading ? (
        <TableSkeleton cols={5} />
      ) : (
        <>
          <DataTable columns={columns} data={orders} keyExtractor={(o) => o._id} />
          {meta && (
            <div className="mt-6">
              <AdminPagination currentPage={meta.page} totalPages={meta.totalPages} onPageChange={setPage} />
            </div>
          )}
        </>
      )}
    </div>
  );
}
