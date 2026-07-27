import z from "zod";

export const user = z.object({
  email: z.string(),
  password: z.string().min(6).max(100),
});
