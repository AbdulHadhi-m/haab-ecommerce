"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search, User, ShoppingBag } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { SITE, NAV_CATEGORIES } from "@/constants";
import { cn } from "@/shared/lib/utils";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="mx-auto max-w-9xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <button
            className="flex items-center lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <Link href="/" className="flex items-center">
            <span className="text-xl font-black tracking-tightest">{SITE.name}</span>
          </Link>

          <nav className="hidden lg:flex lg:items-center lg:gap-8">
            {NAV_CATEGORIES.map((category) => (
              <Link
                key={category.label}
                href={category.href}
                className="text-sm font-medium uppercase tracking-wider text-foreground transition-colors hover:text-muted-foreground"
              >
                {category.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center" aria-label="Search">
              <Search className="h-5 w-5" />
            </button>
            <Link href="/auth/login" aria-label="Account">
              <User className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative" aria-label="Cart">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                0
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div
        className={cn(
          "border-t border-border lg:hidden",
          isMenuOpen ? "block" : "hidden",
        )}
      >
        <div className="space-y-1 px-4 py-4">
          {NAV_CATEGORIES.map((category) => (
            <Link
              key={category.label}
              href={category.href}
              className="block py-2 text-sm font-medium uppercase tracking-wider"
              onClick={() => setIsMenuOpen(false)}
            >
              {category.label}
            </Link>
          ))}
          <div className="pt-4">
            <Button variant="outline" className="w-full justify-start gap-2" size="sm">
              <Search className="h-4 w-4" />
              Search
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
