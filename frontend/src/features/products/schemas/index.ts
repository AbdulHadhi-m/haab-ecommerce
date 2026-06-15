import { z } from "zod";

export const productFilterSchema = z.object({
  category: z.string().optional(),
  minPrice: z.number().positive().optional(),
  maxPrice: z.number().positive().optional(),
  sizes: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  inStock: z.boolean().optional(),
});

export type ProductFilterFormData = z.infer<typeof productFilterSchema>;
