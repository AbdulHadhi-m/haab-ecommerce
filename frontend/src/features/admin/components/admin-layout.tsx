"use client";

import { useState } from "react";
import { AdminSidebar } from "./admin-sidebar";
import { AdminHeader } from "./admin-header";
import { AdminRouteGuard } from "./admin-route-guard";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <AdminRouteGuard>
      <div className="flex min-h-screen bg-brand-50">
        <AdminSidebar
          isMobileOpen={isMobileOpen}
          onMobileClose={() => setIsMobileOpen(false)}
        />
        <div className="flex flex-1 flex-col lg:ml-64">
          <AdminHeader onMenuToggle={() => setIsMobileOpen(true)} />
          <div className="flex-1 p-4 sm:p-6 lg:p-8">{children}</div>
        </div>
      </div>
    </AdminRouteGuard>
  );
}
