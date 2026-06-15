"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { toast } from "sonner";
import apiClient from "@/lib/axios";
import { useProduct } from "@/features/products/hooks/useProduct";
import { useCategories } from "@/features/products/hooks/useCategories";
import { ProductFormSkeleton } from "@/features/admin/components/skeletons";
import { ImageUpload } from "@/features/admin/components/image-upload";
import type { ProductImage } from "@/features/products/types";

const productSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().positive("Price must be positive"),
  discountPrice: z.coerce.number().nullable().optional(),
  stock: z.coerce.number().int().min(0, "Stock cannot be negative"),
  sku: z.string().min(1, "SKU is required"),
  category: z.string().min(1, "Category is required"),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
});

type ProductForm = z.infer<typeof productSchema>;

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const { data: productData, isLoading: productLoading } = useProduct(id);
  const { data: categoriesData } = useCategories();
  const [images, setImages] = useState<ProductImage[]>([]);
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(productSchema),
  });

  useEffect(() => {
    if (productData?.data) {
      const p = productData.data;
      setImages(p.images ?? []);
      reset({
        name: p.name,
        description: p.description,
        price: p.price,
        discountPrice: p.discountPrice,
        stock: p.stock,
        sku: p.sku,
        category: typeof p.category === "object" ? (p.category as { _id: string })._id : p.category,
        featured: p.featured,
        isActive: p.isActive,
      });
    }
  }, [productData, reset]);

  async function onSubmit(values: ProductForm) {
    setSubmitting(true);
    try {
      await apiClient.put(`/products/${id}`, { ...values, images });
      toast.success("Product updated successfully");
      router.push("/admin/products");
    } catch {
      toast.error("Failed to update product");
    } finally {
      setSubmitting(false);
    }
  }

  if (productLoading) return <ProductFormSkeleton />;
  if (!productData?.data) return <p className="text-sm text-red-500">Product not found</p>;

  const categories = categoriesData?.data ?? [];

  return (
    <div>
      <Link href="/admin/products" className="mb-6 inline-flex items-center gap-1 text-sm text-brand-500 hover:text-brand-900">
        <ChevronLeft className="h-4 w-4" />
        Back to Products
      </Link>
      <h1 className="mb-6 text-2xl font-bold tracking-tight">Edit Product</h1>

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
          <div className="sm:col-span-2">
            <ImageUpload images={images} onChange={setImages} />
          </div>
          <div className="flex items-center gap-6 sm:col-span-2">
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("featured")} className="h-4 w-4" />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" {...register("isActive")} className="h-4 w-4" />
              Active
            </label>
          </div>
        </div>

        <div className="flex gap-3">
          <Button type="submit" variant="black" size="lg" className="uppercase tracking-widest" disabled={submitting}>
            {submitting ? "Saving..." : "Save Changes"}
          </Button>
          <Button asChild variant="outline" size="lg" className="uppercase tracking-widest">
            <Link href="/admin/products">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
