"use client";

import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import type { ProductImage } from "../types";

interface ProductGalleryProps {
  images: ProductImage[];
  name: string;
}

export function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-square w-full bg-brand-50 flex items-center justify-center">
        <span className="text-sm text-brand-400">No image available</span>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full overflow-hidden bg-brand-50">
        <img
          src={images[selectedIndex]?.url}
          alt={`${name} — image ${selectedIndex + 1}`}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2">
          {images.map((img, i) => (
            <button
              key={img.publicId}
              onClick={() => setSelectedIndex(i)}
              className={cn(
                "flex-shrink-0 w-20 h-20 border-2 overflow-hidden transition-colors",
                i === selectedIndex
                  ? "border-brand-900"
                  : "border-transparent hover:border-brand-300",
              )}
            >
              <img
                src={img.url}
                alt={`${name} thumbnail ${i + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
