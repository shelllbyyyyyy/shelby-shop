import * as z from "zod";

export const addCategoryFormSchema = z.object({
  name: z.string(),
});

export type AddCategoryFormSchema = z.infer<typeof addCategoryFormSchema>;
