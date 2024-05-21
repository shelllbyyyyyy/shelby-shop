import * as z from "zod";

export const editProfileFormSchema = z.object({
  name: z.string().min(4).max(20),
  phoneNumber: z.string().min(8).max(16),
});

export type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;
