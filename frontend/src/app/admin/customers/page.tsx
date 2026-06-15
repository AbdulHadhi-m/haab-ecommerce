"use client";

import { useState } from "react";
import { formatPrice } from "@/shared/lib/utils";
import { useCustomers } from "@/features/admin/hooks/useCustomers";
import { DataTable, type Column } from "@/features/admin/components/data-table";
import { SearchBar } from "@/features/admin/components/search-bar";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { AdminPagination } from "@/features/admin/components/admin-pagination";
import { TableSkeleton } from "@/features/admin/components/skeletons";
import type { CustomerSummary } from "@/features/admin/types";

export default function AdminCustomersPage() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useCustomers({ page, limit: 15, search: search || undefined });

  const customers = data?.data ?? [];
  const meta = data?.meta;

  const columns: Column<CustomerSummary>[] = [
    {
      key: "name",
      header: "Name",
      render: (c) => (
        <div>
          <p className="font-medium">{c.name}</p>
          <p className="text-xs text-brand-400">{c.email}</p>
        </div>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (c) => <StatusBadge status={c.isActive ? "active" : "inactive"} />,
    },
    {
      key: "orders",
      header: "Orders",
      className: "text-center",
      render: (c) => <span>{c.totalOrders}</span>,
    },
    {
      key: "spent",
      header: "Total Spent",
      render: (c) => <span className="font-semibold">{formatPrice(c.totalSpent)}</span>,
    },
    {
      key: "joined",
      header: "Joined",
      render: (c) => <span className="text-xs text-brand-500">{new Date(c.createdAt).toLocaleDateString()}</span>,
    },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Customers</h1>

      <div className="mb-4">
        <SearchBar value={search} onChange={(v) => { setSearch(v); setPage(1); }} placeholder="Search customers..." />
      </div>

      {isLoading ? (
        <TableSkeleton cols={5} />
      ) : (
        <>
          <DataTable columns={columns} data={customers} keyExtractor={(c) => c._id} />
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
