"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { PageContainer } from "@/shared/components/elements/page-container";
import { useOrder } from "@/features/orders/hooks/useOrder";
import { LoadingSpinner } from "@/shared/components/elements/loading-spinner";

interface OrderSuccessPageContentProps {
  id: string;
}

export function OrderSuccessPageContent({ id }: OrderSuccessPageContentProps) {
  const { data, isLoading } = useOrder(id);
  const orderNumber = data?.data?.orderNumber;

  return (
    <PageContainer as="main" className="flex min-h-[70vh] items-center justify-center py-16">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
          <CheckCircle className="h-10 w-10 text-green-600" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Order Placed!</h1>
        <p className="mt-3 text-sm text-brand-600">
          Thank you for your purchase. Your order has been placed successfully.
        </p>

        {isLoading ? (
          <div className="mt-6 flex justify-center">
            <LoadingSpinner size="sm" />
          </div>
        ) : orderNumber ? (
          <p className="mt-4 font-mono text-sm text-brand-500">
            Order number: {orderNumber}
          </p>
        ) : null}

        <p className="mt-2 text-xs text-brand-400">
          A confirmation email will be sent with your order details.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild variant="black" size="lg" className="uppercase tracking-widest">
            <Link href="/products">Continue Shopping</Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="uppercase tracking-widest">
            <Link href="/account/orders">View Orders</Link>
          </Button>
        </div>
      </div>
    </PageContainer>
  );
}
