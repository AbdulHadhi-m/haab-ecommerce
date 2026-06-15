import { formatPrice } from "@/shared/lib/utils";
import type { CartItem } from "@/features/cart/types";

interface OrderSummaryProps {
  items: CartItem[];
}

export function OrderSummary({ items }: OrderSummaryProps) {
  const subtotal = items.reduce(
    (sum, item) => sum + (item.discountPrice ?? item.price) * item.quantity,
    0,
  );
  const shippingFee = subtotal >= 100 ? 0 : 9.99;
  const tax = Math.round(subtotal * 0.08 * 100) / 100;
  const total = Math.round((subtotal + shippingFee + tax) * 100) / 100;

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.productId} className="flex gap-3">
          <div className="h-16 w-16 flex-shrink-0 overflow-hidden bg-brand-50">
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-1 justify-between">
            <div>
              <p className="text-sm font-medium">{item.name}</p>
              <p className="text-xs text-brand-500">Qty: {item.quantity}</p>
            </div>
            <span className="text-sm font-semibold">
              {formatPrice((item.discountPrice ?? item.price) * item.quantity)}
            </span>
          </div>
        </div>
      ))}

      <div className="border-t border-brand-200 pt-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-brand-600">Subtotal</span>
          <span>{formatPrice(subtotal)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-600">Shipping</span>
          <span>{shippingFee === 0 ? <span className="text-green-700">Free</span> : formatPrice(shippingFee)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-600">Tax (8%)</span>
          <span>{formatPrice(tax)}</span>
        </div>
        <div className="flex justify-between border-t border-brand-200 pt-2 text-base font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  );
}
