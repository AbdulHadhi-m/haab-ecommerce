export interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Pricing {
  subtotal: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
}

export interface Payment {
  method: "cod" | "razorpay" | "stripe";
  status: "pending" | "paid" | "failed";
  transactionId?: string;
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface Order {
  _id: string;
  customer: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  pricing: Pricing;
  payment: Payment;
  orderStatus: OrderStatus;
  orderNumber: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrdersResponse {
  success: boolean;
  message: string;
  data: Order[];
}

export interface OrderResponse {
  success: boolean;
  message: string;
  data: Order;
}

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  processing: "Processing",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};
