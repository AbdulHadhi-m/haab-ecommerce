"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { PRODUCT_SORT_OPTIONS } from "../constants";
import { useCategories } from "../hooks/useCategories";

export function ProductFilters() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { data: categoriesData } = useCategories();
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const currentSearch = searchParams.get("search") || "";
  const currentCategory = searchParams.get("category") || "";
  const currentSort = searchParams.get("sort") || "-createdAt";
  const currentMinPrice = searchParams.get("minPrice") || "";
  const currentMaxPrice = searchParams.get("maxPrice") || "";

  const [searchInput, setSearchInput] = useState(currentSearch);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  function updateParams(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value) params.set(key, value);
      else params.delete(key);
    });
    if (!updates.page) params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  }

  const handleSearch = useCallback(
    (value: string) => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchTimeoutRef.current = setTimeout(() => {
        updateParams({ search: value || undefined });
      }, 400);
    },
    [pathname, searchParams, router],
  );

  const categories = categoriesData?.data ?? [];

  const hasActiveFilters = !!(currentSearch || currentCategory || currentMinPrice || currentMaxPrice);

  function clearAllFilters() {
    router.push(pathname);
  }

  const filterContent = (
    <div className="space-y-6">
      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-brand-600">
          Category
        </label>
        <div className="space-y-1">
          <button
            onClick={() => updateParams({ category: undefined })}
            className={cn(
              "block w-full text-left px-3 py-2 text-sm transition-colors",
              !currentCategory
                ? "bg-brand-900 text-white"
                : "text-brand-700 hover:bg-brand-50",
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat._id}
              onClick={() => updateParams({ category: cat.slug })}
              className={cn(
                "block w-full text-left px-3 py-2 text-sm transition-colors",
                currentCategory === cat.slug
                  ? "bg-brand-900 text-white"
                  : "text-brand-700 hover:bg-brand-50",
              )}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-semibold uppercase tracking-widest text-brand-600">
          Price Range
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={currentMinPrice}
            onChange={(e) => updateParams({ minPrice: e.target.value || undefined })}
            className="h-9 text-xs"
            min={0}
          />
          <span className="text-brand-400">–</span>
          <Input
            type="number"
            placeholder="Max"
            value={currentMaxPrice}
            onChange={(e) => updateParams({ maxPrice: e.target.value || undefined })}
            className="h-9 text-xs"
            min={0}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Search + Sort + Mobile filter toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brand-400" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchInput}
            onChange={(e) => {
              setSearchInput(e.target.value);
              handleSearch(e.target.value);
            }}
            className="h-10 pl-10 pr-4 text-sm"
          />
        </div>

        <div className="flex items-center gap-3">
          <select
            value={currentSort}
            onChange={(e) => updateParams({ sort: e.target.value })}
            className="h-10 border border-brand-200 bg-white px-3 text-sm outline-none focus:border-brand-900"
          >
            {PRODUCT_SORT_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="flex h-10 items-center gap-2 border border-brand-200 px-3 text-sm transition-colors hover:bg-brand-50 lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" />
            Filters
          </button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-brand-500">Active filters:</span>
          {currentSearch && (
            <span className="inline-flex items-center gap-1 bg-brand-50 px-2 py-1 text-xs">
              Search: &quot;{currentSearch}&quot;
              <button onClick={() => { setSearchInput(""); updateParams({ search: undefined }); }}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {currentCategory && (
            <span className="inline-flex items-center gap-1 bg-brand-50 px-2 py-1 text-xs">
              {categories.find((c) => c.slug === currentCategory)?.name ?? currentCategory}
              <button onClick={() => updateParams({ category: undefined })}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          {(currentMinPrice || currentMaxPrice) && (
            <span className="inline-flex items-center gap-1 bg-brand-50 px-2 py-1 text-xs">
              Price: {currentMinPrice || "0"} – {currentMaxPrice || "∞"}
              <button onClick={() => updateParams({ minPrice: undefined, maxPrice: undefined })}>
                <X className="h-3 w-3" />
              </button>
            </span>
          )}
          <Button variant="ghost" size="sm" className="text-xs underline" onClick={clearAllFilters}>
            Clear all
          </Button>
        </div>
      )}

      {/* Desktop sidebar filters */}
      <div className="hidden lg:block">{filterContent}</div>

      {/* Mobile drawer overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 max-h-[80vh] overflow-y-auto bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-widest">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </div>
  );
}
