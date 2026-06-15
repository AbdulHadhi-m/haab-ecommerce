"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingBag, User, MapPin, Lock, LogOut } from "lucide-react";
import { cn } from "@/shared/lib/utils";
import { useLogout } from "@/features/auth/hooks/useLogout";

const ACCOUNT_LINKS = [
  { href: "/account/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/account/profile", label: "Profile", icon: User },
  { href: "/account/address", label: "Addresses", icon: MapPin },
  { href: "/account/password", label: "Password", icon: Lock },
];

export function AccountNav() {
  const pathname = usePathname();
  const { mutate: logout } = useLogout();

  return (
    <nav className="space-y-1">
      {ACCOUNT_LINKS.map((link) => {
        const Icon = link.icon;
        const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
        return (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-brand-900 text-white"
                : "text-brand-600 hover:bg-brand-100 hover:text-brand-900",
            )}
          >
            <Icon className="h-4 w-4" />
            {link.label}
          </Link>
        );
      })}
      <div className="pt-4">
        <button
          onClick={() => logout()}
          className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </nav>
  );
}
