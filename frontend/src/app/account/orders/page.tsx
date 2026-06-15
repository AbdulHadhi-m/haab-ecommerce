import type { Metadata } from "next";
import { OrdersListPageContent } from "./content";

export const metadata: Metadata = {
  title: "My Orders",
  description: "View and track your orders.",
};

export default function OrdersListPage() {
  return <OrdersListPageContent />;
}
