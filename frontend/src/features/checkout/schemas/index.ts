import { z } from "zod";

export const shippingSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
  phone: z.string().min(10, "Valid phone number is required"),
});

export const paymentSchema = z.object({
  cardNumber: z.string().min(16, "Valid card number is required"),
  expiryDate: z.string().min(5, "Valid expiry date is required"),
  cvv: z.string().min(3, "Valid CVV is required"),
  cardholderName: z.string().min(1, "Cardholder name is required"),
});

export type ShippingFormData = z.infer<typeof shippingSchema>;
export type PaymentFormData = z.infer<typeof paymentSchema>;
