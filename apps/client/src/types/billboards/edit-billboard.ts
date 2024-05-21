import * as z from "zod";

export const editBillboardFormSchema = z.object({
  tittle: z.string(),
  imageFile: z.any(),
  imageUrl: z.string(),
  label: z.string(),
  section: z.string(),
});

export type EditBillboardFormSchema = z.infer<typeof editBillboardFormSchema>;
