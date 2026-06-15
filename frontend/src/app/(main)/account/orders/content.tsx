"use client";

import { PageContainer } from "@/shared/components/elements/page-container";
import { useOrders } from "@/features/orders/hooks/useOrders";
import { OrderCard } from "@/features/orders/components/order-card";
import { OrdersListSkeleton } from "@/features/orders/components/order-skeleton";
import { EmptyOrders } from "@/features/orders/components/empty-orders";

export function OrdersListPageContent() {
  const { data, isLoading } = useOrders();
  const orders = data?.data ?? [];

  return (
    <PageContainer as="main" className="py-8 sm:py-12">
      <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">My Orders</h1>
      <p className="mt-2 text-sm text-brand-500">View and track your order history.</p>

      <div className="mt-8">
        {isLoading ? (
          <OrdersListSkeleton />
        ) : orders.length > 0 ? (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard key={order._id} order={order} />
            ))}
          </div>
        ) : (
          <EmptyOrders />
        )}
      </div>
    </PageContainer>
  );
}
