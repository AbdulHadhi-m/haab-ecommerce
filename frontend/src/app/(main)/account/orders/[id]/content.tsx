"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { PageContainer } from "@/shared/components/elements/page-container";
import { Button } from "@/shared/components/ui/button";
import { EmptyState } from "@/shared/components/elements/empty-state";
import { useOrder } from "@/features/orders/hooks/useOrder";
import { OrderDetailSkeleton } from "@/features/orders/components/order-skeleton";
import { formatPrice } from "@/shared/lib/utils";
import type { OrderStatus } from "@/features/orders/types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

interface OrderDetailPageContentProps {
  id: string;
}

export function OrderDetailPageContent({ id }: OrderDetailPageContentProps) {
  const { data, isLoading, error } = useOrder(id);

  if (isLoading) {
    return (
      <PageContainer as="main" className="py-8 sm:py-12">
        <OrderDetailSkeleton />
      </PageContainer>
    );
  }

  if (error || !data?.data) {
    return (
      <PageContainer as="main" className="py-8 sm:py-12">
        <EmptyState
          title="Order not found"
          description="This order may have been removed or the link is invalid."
          action={
            <Button variant="black" size="lg" className="uppercase tracking-widest" asChild>
              <Link href="/account/orders">View My Orders</Link>
            </Button>
          }
        />
      </PageContainer>
    );
  }

  const order = data.data;

  return (
    <PageContainer as="main" className="py-8 sm:py-12">
      <Link
        href="/account/orders"
        className="mb-8 inline-flex items-center gap-1 text-sm text-brand-500 transition-colors hover:text-brand-900"
      >
        <ChevronLeft className="h-4 w-4" />
        Back to Orders
      </Link>

      <div className="mb-8 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Order {order.orderNumber}
          </h1>
          <p className="text-sm text-brand-500">
            Placed on{" "}
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
        <span
          className={`inline-flex w-fit px-4 py-1.5 text-xs font-semibold uppercase tracking-wider sm:self-center ${STATUS_STYLES[order.orderStatus]}`}
        >
          {order.orderStatus}
        </span>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="border border-brand-200 p-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-600">
            Shipping Address
          </h2>
          <div className="space-y-1 text-sm">
            <p className="font-medium">{order.shippingAddress.fullName}</p>
            <p>{order.shippingAddress.email}</p>
            <p>{order.shippingAddress.phone}</p>
            <p>{order.shippingAddress.address}</p>
            <p>
              {order.shippingAddress.city}, {order.shippingAddress.state}{" "}
              {order.shippingAddress.postalCode}
            </p>
            <p>{order.shippingAddress.country}</p>
          </div>
        </div>

        <div className="border border-brand-200 p-6">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand-600">
            Payment
          </h2>
          <div className="space-y-1 text-sm">
            <p>
              Method:{" "}
              <span className="font-medium capitalize">{order.payment.method}</span>
            </p>
            <p>
              Status:{" "}
              <span className="font-medium capitalize">{order.payment.status}</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 border border-brand-200">
        <div className="border-b border-brand-200 bg-brand-50 px-6 py-3">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-brand-600">
            Items
          </h2>
        </div>
        <div className="divide-y divide-brand-100">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center gap-4 px-6 py-4">
              <div className="h-16 w-16 flex-shrink-0 overflow-hidden bg-brand-50">
                <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
              </div>
              <div className="flex flex-1 justify-between">
                <div>
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-brand-500">Qty: {item.quantity}</p>
                </div>
                <span className="text-sm font-semibold">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-brand-200 bg-brand-50 px-6 py-4 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-600">Subtotal</span>
            <span>{formatPrice(order.pricing.subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-600">Shipping</span>
            <span>
              {order.pricing.shippingFee === 0 ? (
                <span className="text-green-700">Free</span>
              ) : (
                formatPrice(order.pricing.shippingFee)
              )}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-600">Tax</span>
            <span>{formatPrice(order.pricing.tax)}</span>
          </div>
          <div className="flex justify-between border-t border-brand-200 pt-1.5 text-base font-bold">
            <span>Total</span>
            <span>{formatPrice(order.pricing.totalAmount)}</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="black" size="lg" className="uppercase tracking-widest">
          <Link href="/products">Continue Shopping</Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="uppercase tracking-widest">
          <Link href="/account/orders">View All Orders</Link>
        </Button>
      </div>
    </PageContainer>
  );
}
