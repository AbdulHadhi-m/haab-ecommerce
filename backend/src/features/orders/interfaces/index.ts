import { IBaseDocument } from "@/shared/interfaces";

interface OrderItem {
  productId: string;
  name: string;
  quantity: number;
  size: string;
  color: string;
  price: number;
  image: string;
}

interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
}

export interface IOrder extends IBaseDocument {
  userId: string;
  items: OrderItem[];
  shippingAddress: ShippingAddress;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  paymentMethod: string;
  paymentStatus: "pending" | "paid" | "failed";
}
