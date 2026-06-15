"use client";

import { useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { formatPrice } from "@/shared/lib/utils";
import { useProducts } from "@/features/products/hooks/useProducts";
import { DataTable, type Column } from "@/features/admin/components/data-table";
import { SearchBar } from "@/features/admin/components/search-bar";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { TableSkeleton } from "@/features/admin/components/skeletons";
import { PageContainer } from "@/shared/components/elements/page-container";
import type { Product } from "@/features/products/types";

export default function AdminProductsPage() {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useProducts({ search: search || undefined, limit: 50 });

  const products = data?.data ?? [];

  const columns: Column<Product>[] = [
    {
      key: "image",
      header: "Image",
      render: (p) => (
        <div className="h-10 w-10 overflow-hidden bg-brand-100">
          <img src={p.images[0]?.url ?? ""} alt="" className="h-full w-full object-cover" />
        </div>
      ),
    },
    {
      key: "name",
      header: "Name",
      render: (p) => (
        <div>
          <p className="font-medium">{p.name}</p>
          <p className="text-xs text-brand-400 font-mono">{p.sku}</p>
        </div>
      ),
    },
    {
      key: "category",
      header: "Category",
      render: (p) => {
        const name = typeof p.category === "object" && p.category !== null
          ? (p.category as { name: string }).name
          : "—";
        return <span className="text-sm">{name}</span>;
      },
    },
    {
      key: "price",
      header: "Price",
      className: "text-right",
      render: (p) => (
        <span className="font-semibold">{formatPrice(p.discountPrice ?? p.price)}</span>
      ),
    },
    {
      key: "stock",
      header: "Stock",
      className: "text-center",
      render: (p) => (
        <span className={p.stock > 0 ? "text-green-700" : "text-red-600"}>{p.stock}</span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (p) => <StatusBadge status={p.isActive ? "active" : "inactive"} />,
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (p) => (
        <div className="flex justify-end gap-2">
          <Link
            href={`/products/${p.slug}`}
            className="flex h-8 w-8 items-center justify-center text-brand-500 hover:text-brand-700"
          >
            <ExternalLink className="h-4 w-4" />
          </Link>
          <Link
            href={`/admin/products/${p._id}/edit`}
            className="flex h-8 w-8 items-center justify-center text-brand-500 hover:text-brand-700"
          >
            <Edit className="h-4 w-4" />
          </Link>
          <button className="flex h-8 w-8 items-center justify-center text-brand-500 hover:text-red-600">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Products</h1>
        <Button asChild variant="black" size="sm" className="uppercase tracking-widest">
          <Link href="/admin/products/new">
            <Plus className="mr-1.5 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>

      <div className="mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search products..." />
      </div>

      {isLoading ? (
        <TableSkeleton cols={7} />
      ) : (
        <DataTable columns={columns} data={products} keyExtractor={(p) => p._id} />
      )}
    </div>
  );
}
