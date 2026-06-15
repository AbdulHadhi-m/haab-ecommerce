import { z } from "zod";
import { Types } from "mongoose";

const objectIdSchema = z.string().refine((val) => Types.ObjectId.isValid(val), {
  message: "Invalid product ID",
});

const orderItemSchema = z.object({
  productId: objectIdSchema,
  name: z.string().min(1, "Product name is required"),
  image: z.string().min(1, "Product image is required"),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().int("Quantity must be an integer").min(1, "Quantity must be at least 1"),
});

const shippingAddressSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  email: z.string().email("Valid email is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  postalCode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country is required"),
});

export const createOrderSchema = z.object({
  body: z.object({
    items: z.array(orderItemSchema).min(1, "At least one item is required"),
    shippingAddress: shippingAddressSchema,
    paymentMethod: z.enum(["cod", "razorpay", "stripe"], {
      errorMap: () => ({ message: "Invalid payment method" }),
    }),
  }),
});

export const updateOrderStatusSchema = z.object({
  body: z.object({
    orderStatus: z.enum(
      ["pending", "confirmed", "processing", "shipped", "delivered", "cancelled"],
      { errorMap: () => ({ message: "Invalid order status" }) },
    ),
  }),
});
