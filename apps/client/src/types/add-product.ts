import * as z from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const addProductFormSchema = z.object({
  name: z.string(),
  imageFile: z.any(),
  description: z.string(),
  price: z.number(),
  slug: z.string(),
  imageUrl: z.string(),
});

export type AddProductFormSchema = z.infer<typeof addProductFormSchema>;
