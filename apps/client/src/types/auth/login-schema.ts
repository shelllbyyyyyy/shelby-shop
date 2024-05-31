import * as z from "zod";

export const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
