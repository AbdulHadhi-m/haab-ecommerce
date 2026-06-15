"use client";

import { Menu, LogOut } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { useAuthStore } from "@/features/auth/store";
import { useLogout } from "@/features/auth/hooks/useLogout";

interface AdminHeaderProps {
  onMenuToggle: () => void;
}

export function AdminHeader({ onMenuToggle }: AdminHeaderProps) {
  const user = useAuthStore((s) => s.user);
  const { mutate: logout } = useLogout();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-brand-200 bg-white px-4 sm:px-6">
      <button
        onClick={onMenuToggle}
        className="flex items-center text-brand-600 transition-colors hover:text-brand-900 lg:hidden"
        aria-label="Toggle sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium">{user?.name}</p>
          <p className="text-xs text-brand-500 capitalize">{user?.role}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => logout()}
          className="text-brand-500 hover:text-red-600"
          aria-label="Logout"
        >
          <LogOut className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
