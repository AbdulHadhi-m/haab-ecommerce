"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { toast } from "sonner";
import apiClient from "@/lib/axios";
import { useCategories } from "@/features/products/hooks/useCategories";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  slug: z.string().optional(),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  discountPrice: z.coerce.number().optional().nullable(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const { data: categoriesData } = useCategories();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
    defaultValues: { featured: false, discountPrice: null },
  });

  async function onSubmit(values: ProductForm) {
    setSubmitting(true);
    try {
      await apiClient.post("/products", values);
      toast.success("Product created successfully");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to create product");
    } finally {
      setSubmitting(false);
    }
  }

  const categories = categoriesData?.data ?? [];

  return (
    <div>
      <Link href="/admin/products" className="mb-6 inline-flex items-center gap-1 text-sm text-brand-500 hover:text-brand-900">
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6" noValidate>
        <div className="grid gap-6 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Name</label>
            <Input {...register("name")} />
            {errors.name && <p className="text-xs text-red-500">{errors.name.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Description</label>
            <textarea {...register("description")} className="h-24 w-full border border-input bg-background px-4 py-2 text-sm outline-none focus:ring-1 focus:ring-ring" />
            {errors.description && <p className="text-xs text-red-500">{errors.description.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Price</label>
            <Input type="number" step="0.01" {...register("price")} />
            {errors.price && <p className="text-xs text-red-500">{errors.price.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Discount Price</label>
            <Input type="number" step="0.01" {...register("discountPrice")} />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Stock</label>
            <Input type="number" {...register("stock")} />
            {errors.stock && <p className="text-xs text-red-500">{errors.stock.message}</p>}
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">SKU</label>
            <Input {...register("sku")} />
            {errors.sku && <p className="text-xs text-red-500">{errors.sku.message}</p>}
          </div>
          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">Category</label>
            <select {...register("category")} className="h-10 w-full border border-input bg-background px-4 text-sm outline-none focus:ring-1 focus:ring-ring">
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
            {errors.category && <p className="text-xs text-red-500">{errors.category.message}</p>}
          </div>
          <div className="flex items-center gap-2 sm:col-span-2">
            <input type="checkbox" id="featured" {...register("featured")} className="h-4 w-4" />
            <label htmlFor="featured" className="text-sm">Featured product</label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="black" size="lg" className="uppercase tracking-widest" disabled={submitting}>
            {submitting ? "Creating..." : "Create Product"}
          </Button>
          <Button asChild variant="outline" size="lg" className="uppercase tracking-widest">
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
