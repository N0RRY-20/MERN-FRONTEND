import { z } from "zod";

export const registerSchema = z
  .object({
    fullname: z.string().min(1, "Full name is required"),
    username: z.string().min(3, "Username must be at least 3 characters long"),
    email: z.email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;
