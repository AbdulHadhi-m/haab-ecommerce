"use client";

import { useState, useRef, useCallback } from "react";
import { X, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";
import apiClient from "@/lib/axios";
import type { ProductImage } from "@/features/products/types";

interface ImageUploadProps {
  images: ProductImage[];
  onChange: (images: ProductImage[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSelect = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (!files.length) return;

    const remaining = maxImages - images.length;
    if (files.length > remaining) {
      toast.error(`You can only add ${remaining} more image${remaining > 1 ? "s" : ""}`);
      return;
    }

    setUploading(true);
    try {
      const uploaded: ProductImage[] = [];
      for (const file of files) {
        const formData = new FormData();
        formData.append("image", file);
        const { data } = await apiClient.post("/uploads/image", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        uploaded.push({ url: data.url, publicId: data.publicId });
      }
      onChange([...images, ...uploaded]);
    } catch {
      toast.error("Failed to upload image(s)");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }, [images, maxImages, onChange]);

  const handleRemove = useCallback(async (publicId: string) => {
    try {
      await apiClient.delete(`/uploads/${publicId}`);
    } catch {
      // silently fail — image may already be gone
    }
    onChange(images.filter((img) => img.publicId !== publicId));
  }, [images, onChange]);

  return (
    <div className="space-y-3">
      <label className="text-xs font-semibold uppercase tracking-widest text-brand-600">
        Product Images
      </label>

      <div className="grid grid-cols-5 gap-3">
        {images.map((img) => (
          <div key={img.publicId} className="group relative aspect-square overflow-hidden bg-brand-50">
            <img src={img.url} alt="" className="h-full w-full object-cover" />
            <button
              type="button"
              onClick={() => handleRemove(img.publicId)}
              className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center bg-black/50 text-white opacity-0 transition-opacity group-hover:opacity-100"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}

        {images.length < maxImages && (
          <button
            type="button"
            onClick={handleSelect}
            disabled={uploading}
            className="flex aspect-square items-center justify-center border-2 border-dashed border-brand-200 bg-brand-50 text-brand-400 transition-colors hover:border-brand-400 hover:text-brand-600 disabled:opacity-50"
          >
            {uploading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Upload className="h-5 w-5" />}
          </button>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />

      <p className="text-xs text-brand-400">
        {images.length} / {maxImages} images &mdash; JPEG, PNG, WebP (max 5 MB each)
      </p>
    </div>
  );
}
