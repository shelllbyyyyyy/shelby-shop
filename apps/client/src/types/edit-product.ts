import * as z from "zod";

export const editProductFormSchema = z.object({
  name: z.string(),
  imageFile: z.any(),
  description: z.string(),
  price: z.number(),
  slug: z.string(),
  imageUrl: z.array(z.string()),
});

export type EditProductFormSchema = z.infer<typeof editProductFormSchema>;
