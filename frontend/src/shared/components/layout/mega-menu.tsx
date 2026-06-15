"use client";

import { useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import type { MegaMenuItem } from "@/shared/constants/navigation";

interface MegaMenuProps {
  item: MegaMenuItem;
  isOpen: boolean;
  onClose: () => void;
  onHover: () => void;
}

export function MegaMenu({ item, isOpen, onClose, onHover }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const focusIndexRef = useRef(-1);
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const allLinks = item.groups.flatMap((g) => g.links);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key === "ArrowDown" || e.key === "Tab") {
        e.preventDefault();
        const next = focusIndexRef.current < allLinks.length - 1 ? focusIndexRef.current + 1 : 0;
        focusIndexRef.current = next;
        linkRefs.current[next]?.focus();
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = focusIndexRef.current > 0 ? focusIndexRef.current - 1 : allLinks.length - 1;
        focusIndexRef.current = prev;
        linkRefs.current[prev]?.focus();
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [isOpen, onClose, allLinks.length]);

  const collectRefs = useCallback((idx: number) => (el: HTMLAnchorElement | null) => {
    linkRefs.current[idx] = el;
  }, []);

  return (
    <div
      ref={menuRef}
      role="menu"
      aria-label={`${item.label} menu`}
      className={cn(
        "absolute left-0 top-full w-full border-b border-brand-200 bg-white shadow-xl transition-all duration-200 ease-in-out",
        isOpen ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0 pointer-events-none",
      )}
      onMouseEnter={onHover}
    >
      <div className="mx-auto max-w-9xl px-6 py-10">
        <div className="flex gap-10">
          <div className="grid flex-1 grid-cols-2 gap-x-8 gap-y-10 xl:grid-cols-4">
            {item.groups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-4 text-xs font-semibold uppercase tracking-widest text-brand-400">
                  {group.title}
                </h3>
                <ul className="space-y-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        ref={collectRefs(allLinks.indexOf(link))}
                        href={link.href}
                        role="menuitem"
                        className="text-sm text-brand-700 transition-colors hover:text-black"
                        onClick={onClose}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <Link
            href={item.banner.href}
            className="group relative hidden w-72 shrink-0 flex-col justify-end overflow-hidden bg-brand-900 p-6 xl:flex"
            onClick={onClose}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-black" />
            <div className="relative z-10">
              <p className="mb-1 text-xs font-semibold tracking-widest text-white/60">{item.banner.title}</p>
              <p className="text-lg font-semibold leading-tight text-white">{item.banner.subtitle}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-white transition-all group-hover:gap-2">
                Shop Now <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
