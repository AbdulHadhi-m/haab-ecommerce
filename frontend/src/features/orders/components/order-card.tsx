import Link from "next/link";
import { formatPrice } from "@/shared/lib/utils";
import type { Order, OrderStatus } from "../types";

const STATUS_STYLES: Record<OrderStatus, string> = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-blue-100 text-blue-800",
  processing: "bg-purple-100 text-purple-800",
  shipped: "bg-indigo-100 text-indigo-800",
  delivered: "bg-green-100 text-green-800",
  cancelled: "bg-red-100 text-red-800",
};

interface OrderCardProps {
  order: Order;
}

export function OrderCard({ order }: OrderCardProps) {
  const itemCount = order.items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Link
      href={`/account/orders/${order._id}`}
      className="block border border-brand-200 bg-white p-5 transition-colors hover:bg-brand-50 sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-xs text-brand-500">
            {new Date(order.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="font-mono text-sm font-medium">{order.orderNumber}</p>
          <p className="text-sm text-brand-600">
            {itemCount} item{itemCount !== 1 ? "s" : ""} — {formatPrice(order.pricing.totalAmount)}
          </p>
        </div>
        <span
          className={`inline-flex w-fit px-3 py-1 text-xs font-semibold uppercase tracking-wider ${STATUS_STYLES[order.orderStatus]}`}
        >
          {order.orderStatus}
        </span>
      </div>
    </Link>
  );
}
