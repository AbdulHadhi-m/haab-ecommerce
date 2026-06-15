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

export type PaymentMethod = "cod" | "razorpay" | "stripe";

export type CheckoutStep = "shipping" | "payment" | "review";

export interface CreateOrderPayload {
  items: {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }[];
  shippingAddress: ShippingAddress;
  paymentMethod: PaymentMethod;
  couponCode?: string;
  discount?: number;
}
