import { IBaseDocument } from "@/shared/interfaces";
import { Types } from "mongoose";

export interface IOrderItem {
  productId: Types.ObjectId;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

export interface IShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface IPricing {
  subtotal: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
}

export interface IPayment {
  method: "cod" | "razorpay" | "stripe";
  status: "pending" | "paid" | "failed";
  transactionId?: string;
}

export type OrderStatus = "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled";

export interface IOrder extends IBaseDocument {
  customer: Types.ObjectId;
  items: IOrderItem[];
  shippingAddress: IShippingAddress;
  pricing: IPricing;
  payment: IPayment;
  orderStatus: OrderStatus;
  orderNumber: string;
}
