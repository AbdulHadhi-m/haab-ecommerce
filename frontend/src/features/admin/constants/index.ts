export const ADMIN_KEYS = {
  dashboard: ["admin", "dashboard"] as const,
  customers: ["admin", "customers"] as const,
};

export const ADMIN_SIDEBAR = [
  { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
  { label: "Products", href: "/admin/products", icon: "Package" },
  { label: "Categories", href: "/admin/categories", icon: "FolderTree" },
  { label: "Orders", href: "/admin/orders", icon: "ShoppingCart" },
  { label: "Customers", href: "/admin/customers", icon: "Users" },
  { label: "Analytics", href: "/admin/analytics", icon: "BarChart3" },
] as const;
