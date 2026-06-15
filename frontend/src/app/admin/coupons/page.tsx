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
import { formatPrice } from "@/shared/lib/utils";
import { useCoupons, useCreateCoupon, useUpdateCoupon, useDeleteCoupon } from "@/features/coupons/hooks";
import type { Coupon, CreateCouponPayload, UpdateCouponPayload } from "@/features/coupons/types";

const couponSchema = z.object({
  code: z.string().min(2, "Code must be at least 2 characters").max(20),
  description: z.string().optional(),
  discountType: z.enum(["percentage", "fixed"]),
  discountValue: z.coerce.number().positive("Must be positive"),
  minimumOrderAmount: z.coerce.number().min(0).optional(),
  maxDiscountAmount: z.coerce.number().min(0).optional(),
  usageLimit: z.coerce.number().min(0).optional(),
  expiresAt: z.string().optional(),
  isActive: z.boolean().optional(),
});

type CouponForm = z.infer<typeof couponSchema>;

interface CouponFormDialogProps {
  open: boolean;
  onClose: () => void;
  editCoupon?: Coupon;
}

function CouponFormDialog({ open, onClose, editCoupon }: CouponFormDialogProps) {
  const createCoupon = useCreateCoupon();
  const updateCoupon = useUpdateCoupon();
  const isEditing = !!editCoupon;
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CouponForm>({
    resolver: zodResolver(couponSchema),
    defaultValues: editCoupon ? {
      code: editCoupon.code,
      description: editCoupon.description ?? "",
      discountType: editCoupon.discountType,
      discountValue: editCoupon.discountValue,
      minimumOrderAmount: editCoupon.minimumOrderAmount,
      maxDiscountAmount: editCoupon.maxDiscountAmount,
      usageLimit: editCoupon.usageLimit,
      expiresAt: editCoupon.expiresAt ? editCoupon.expiresAt.slice(0, 10) : "",
      isActive: editCoupon.isActive,
    } : {
      code: "",
      description: "",
      discountType: "percentage",
      discountValue: 0,
      minimumOrderAmount: 0,
      isActive: true,
    },
  });

  const onSubmit = async (values: CouponForm) => {
    const payload: CreateCouponPayload | UpdateCouponPayload = {
      code: values.code.toUpperCase(),
      description: values.description || undefined,
      discountType: values.discountType,
      discountValue: values.discountValue,
      minimumOrderAmount: values.minimumOrderAmount || undefined,
      maxDiscountAmount: values.maxDiscountAmount || undefined,
      usageLimit: values.usageLimit || undefined,
      expiresAt: values.expiresAt || undefined,
      isActive: values.isActive,
    };

    try {
      if (isEditing) {
        await updateCoupon.mutateAsync({ id: editCoupon._id, payload });
        toast.success("Coupon updated");
      } else {
        await createCoupon.mutateAsync(payload as CreateCouponPayload);
        toast.success("Coupon created");
      }
      reset();
      onClose();
    } catch {
      toast.error(isEditing ? "Failed to update coupon" : "Failed to create coupon");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative mx-4 w-full max-w-lg bg-white p-6 shadow-xl max-h-[90vh] overflow-y-auto">
        <h2 className="mb-6 text-lg font-bold">{isEditing ? "Edit Coupon" : "Create Coupon"}</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Code</label>
              <Input placeholder="SUMMER20" {...register("code")} />
              {errors.code && <p className="text-xs text-red-500">{errors.code.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Discount Type</label>
              <select
                {...register("discountType")}
                className="flex h-10 w-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-ring"
              >
                <option value="percentage">Percentage</option>
                <option value="fixed">Fixed</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Discount Value</label>
              <Input type="number" step="0.01" placeholder="10" {...register("discountValue")} />
              {errors.discountValue && <p className="text-xs text-red-500">{errors.discountValue.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Min. Order Amount</label>
              <Input type="number" step="0.01" placeholder="0" {...register("minimumOrderAmount")} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Max Discount Amount</label>
              <Input type="number" step="0.01" placeholder="Unlimited" {...register("maxDiscountAmount")} />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Usage Limit</label>
              <Input type="number" placeholder="Unlimited" {...register("usageLimit")} />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Expires At</label>
            <Input type="date" {...register("expiresAt")} />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Description</label>
            <Input placeholder="Optional description" {...register("description")} />
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input type="checkbox" {...register("isActive")} className="h-4 w-4" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand-600">Active</span>
          </label>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" size="lg" className="uppercase tracking-widest" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="black" size="lg" className="uppercase tracking-widest" disabled={createCoupon.isPending || updateCoupon.isPending}>
              {isEditing ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function AdminCouponsPage() {
  const { data, isLoading } = useCoupons();
  const deleteCoupon = useDeleteCoupon();
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editCoupon, setEditCoupon] = useState<Coupon | undefined>(undefined);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const coupons = data?.coupons ?? [];

  async function onDelete(id: string) {
    try {
      await deleteCoupon.mutateAsync(id);
      toast.success("Coupon deleted");
      setDeleteId(null);
      queryClient.invalidateQueries({ queryKey: ["coupons"] });
    } catch {
      toast.error("Failed to delete coupon");
    }
  }

  const columns: Column<Coupon>[] = [
    {
      key: "code",
      header: "Code",
      render: (c) => <span className="font-mono text-sm font-bold uppercase">{c.code}</span>,
    },
    {
      key: "discount",
      header: "Discount",
      render: (c) => (
        <span className="font-medium">
          {c.discountType === "percentage" ? `${c.discountValue}%` : formatPrice(c.discountValue)}
        </span>
      ),
    },
    {
      key: "minOrder",
      header: "Min Order",
      render: (c) => <span className="text-xs text-brand-500">{formatPrice(c.minimumOrderAmount)}</span>,
    },
    {
      key: "usage",
      header: "Usage",
      render: (c) => (
        <span className="text-xs text-brand-500">
          {c.usedCount}{c.usageLimit ? ` / ${c.usageLimit}` : ""}
        </span>
      ),
    },
    {
      key: "status",
      header: "Status",
      render: (c) => <StatusBadge status={c.isActive ? "active" : "inactive"} />,
    },
    {
      key: "expires",
      header: "Expires",
      render: (c) => (
        <span className="text-xs text-brand-500">
          {c.expiresAt ? new Date(c.expiresAt).toLocaleDateString() : "—"}
        </span>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (c) => (
        <div className="flex justify-end gap-2">
          <button
            onClick={() => { setEditCoupon(c); setShowForm(true); }}
            className="flex h-8 w-8 items-center justify-center text-brand-400 hover:text-brand-700"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDeleteId(c._id)}
            className="flex h-8 w-8 items-center justify-center text-brand-400 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
        <Button
          variant="black"
          size="lg"
          className="uppercase tracking-widest"
          onClick={() => { setEditCoupon(undefined); setShowForm(true); }}
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Add Coupon
        </Button>
      </div>

      {isLoading ? <TableSkeleton cols={7} /> : (
        <DataTable columns={columns} data={coupons} keyExtractor={(c) => c._id} />
      )}

      <CouponFormDialog
        open={showForm}
        onClose={() => { setShowForm(false); setEditCoupon(undefined); }}
        editCoupon={editCoupon}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Delete Coupon"
        message="Are you sure you want to delete this coupon? This action cannot be undone."
        confirmLabel="Delete"
        destructive
        onConfirm={() => deleteId && onDelete(deleteId)}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
