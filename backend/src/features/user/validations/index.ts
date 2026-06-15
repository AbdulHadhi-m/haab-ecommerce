import { z } from "zod";
import { Types } from "mongoose";

export const updateProfileSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name must not exceed 50 characters")
      .trim(),
    phone: z.string().optional(),
    avatar: z.string().url("Avatar must be a valid URL").optional(),
  }),
});

export const changePasswordSchema = z.object({
  body: z.object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(8, "New password must be at least 8 characters")
      .max(128, "New password must not exceed 128 characters"),
  }),
});

const addressSchema = z.object({
  label: z.string().min(1, "Label is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  state: z.string().min(1, "State is required"),
  zipCode: z.string().min(1, "Zip code is required"),
  phone: z.string().min(1, "Phone is required"),
  isDefault: z.boolean(),
});

export const addAddressSchema = z.object({
  body: addressSchema,
});

export const updateAddressSchema = z.object({
  body: addressSchema.partial(),
  params: z.object({
    addressId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid address ID",
    }),
  }),
});

export const addressParamsSchema = z.object({
  params: z.object({
    addressId: z.string().refine((val) => Types.ObjectId.isValid(val), {
      message: "Invalid address ID",
    }),
  }),
});
