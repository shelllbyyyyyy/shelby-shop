import * as z from "zod";

export const registerFormSchema = z.object({
  email: z.string().email(),
  name: z.string().min(3),
  password: z.string().min(6),
});

export type RegisterFormSchema = z.infer<typeof registerFormSchema>;
