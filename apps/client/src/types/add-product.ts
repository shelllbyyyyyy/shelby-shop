import * as z from "zod";

export const addProductFormSchema = z.object({
  name: z.string(),
  imageFile: z.any(),
  description: z.string(),
  price: z.number(),
  slug: z.string(),
  imageUrl: z.string(),
  sku: z.string(),
  label: z.string(),
  category: z.string(),
});

export type AddProductFormSchema = z.infer<typeof addProductFormSchema>;
