"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { toast } from "sonner";
import apiClient from "@/lib/axios";
import { useQueryClient } from "@tanstack/react-query";
import { DataTable, type Column } from "@/features/admin/components/data-table";
import { StatusBadge } from "@/features/admin/components/status-badge";
import { TableSkeleton } from "@/features/admin/components/skeletons";
import { ConfirmDialog } from "@/features/admin/components/confirm-dialog";
import { useCategories } from "@/features/products/hooks/useCategories";
import type { Category } from "@/features/products/types";

const categorySchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
});

type CategoryForm = z.infer<typeof categorySchema>;

export default function AdminCategoriesPage() {
  const { data, isLoading } = useCategories();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<CategoryForm>({
    resolver: zodResolver(categorySchema),
  });

  const categories = data?.data ?? [];

  async function onCreate(values: CategoryForm) {
    setSubmitting(true);
    try {
      await apiClient.post("/categories", values);
      toast.success("Category created");
      reset({ name: "" });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch { toast.error("Failed to create category"); }
    finally { setSubmitting(false); }
  }

  async function onEdit(id: string) {
    setSubmitting(true);
    const name = (document.getElementById(`edit-name-${id}`) as HTMLInputElement)?.value;
    if (!name) return;
    try {
      await apiClient.put(`/categories/${id}`, { name });
      toast.success("Category updated");
      setEditingId(null);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch { toast.error("Failed to update category"); }
    finally { setSubmitting(false); }
  }

  async function onDelete(id: string) {
    try {
      await apiClient.delete(`/categories/${id}`);
      toast.success("Category deleted");
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch { toast.error("Failed to delete category"); }
  }

  const columns: Column<Category>[] = [
    { key: "name", header: "Name", render: (c) => (
      editingId === c._id ? (
        <div className="flex items-center gap-2">
          <Input id={`edit-name-${c._id}`} defaultValue={c.name} className="h-8 w-48 text-sm" />
          <Button size="sm" variant="black" onClick={() => onEdit(c._id)} disabled={submitting} className="text-xs">Save</Button>
          <Button size="sm" variant="ghost" onClick={() => setEditingId(null)} className="text-xs text-brand-500">Cancel</Button>
        </div>
      ) : (
        <span className="font-medium">{c.name}</span>
      )
    )},
    { key: "slug", header: "Slug", render: (c) => <span className="text-xs font-mono text-brand-500">{c.slug}</span> },
    { key: "status", header: "Status", render: (c) => <StatusBadge status={c.isActive ? "active" : "inactive"} /> },
    { key: "actions", header: "Actions", className: "text-right", render: (c) => (
      <div className="flex justify-end gap-2">
        <button onClick={() => setEditingId(c._id)} className="flex h-8 w-8 items-center justify-center text-brand-500 hover:text-brand-700">
          <Edit className="h-4 w-4" />
        </button>
        <button onClick={() => setDeleteId(c._id)} className="flex h-8 w-8 items-center justify-center text-brand-500 hover:text-red-600">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    )},
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Categories</h1>

      <form onSubmit={handleSubmit(onCreate)} className="mb-6 flex items-end gap-3">
        <div className="flex-1 space-y-1">
          <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">New Category</label>
          <Input placeholder="Category name" {...register("name")} />
          {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
        </div>
        <Button type="submit" variant="black" size="lg" className="uppercase tracking-widest flex-shrink-0" disabled={submitting}>
          <Plus className="mr-1.5 h-4 w-4" />
          Add
        </Button>
      </form>

      {isLoading ? <TableSkeleton cols={4} /> : (
        <DataTable columns={columns} data={categories} keyExtractor={(c) => c._id} />
      )}

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Category"
        message="Are you sure you want to delete this category? This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={() => deleteId && onDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
