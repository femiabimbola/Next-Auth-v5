import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string({ invalid_type_error: "Must be a string" }).email({ message: "Valid email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  code: z.optional(z.string()),
});
