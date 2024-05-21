import * as z from "zod";

export const addBillboardFormSchema = z.object({
  tittle: z.string(),
  imageFile: z.any(),
  imageUrl: z.string(),
  label: z.string(),
  section: z.string(),
});

export type AddBillboardFormSchema = z.infer<typeof addBillboardFormSchema>;
