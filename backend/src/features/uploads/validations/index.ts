import { z } from "zod";

export const deleteImageSchema = z.object({
  params: z.object({
    publicId: z.string().min(1, "Public ID is required"),
  }),
});
