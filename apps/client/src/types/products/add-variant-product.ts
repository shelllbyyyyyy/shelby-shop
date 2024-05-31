import * as z from "zod";

export const addProductVariantFormSchema = z.object({
  imageFile: z.any(),
  price: z.number(),
  imageUrl: z.string(),
  sku: z.string(),
  label: z.string(),
});

export type AddProductVariantFormSchema = z.infer<
  typeof addProductVariantFormSchema
>;
