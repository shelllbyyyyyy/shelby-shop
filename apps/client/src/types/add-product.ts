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
  image: z.any(),
  description: z.string(),
  price: z.number(),
  slug: z.string(),
});

export type AddProductFormSchema = z.infer<typeof addProductFormSchema>;
