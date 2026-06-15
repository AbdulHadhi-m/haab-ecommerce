"use client";

import { Search } from "lucide-react";
import { Input } from "@/shared/components/ui/input";
import { cn } from "@/shared/lib/utils";

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function SearchInput({
  placeholder = "Search products...",
  className,
  value,
  onChange,
}: SearchInputProps) {
  return (
    <div className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        type="search"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}
