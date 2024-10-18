import { z } from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export const signInSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const paymentSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .nonempty({ message: "Name is required" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .nonempty({ message: "Last name is required" }),
  cardNumber: z
    .string()
    .length(16, { message: "Card number must be exactly 16 digits" })
    .regex(/^\d{16}$/, { message: "Card number must contain only digits" })
    .nonempty({ message: "Card number is required" }),
  expiration: z
    .string()
    .regex(/^\d{3,4}$/, { message: "exp must be a 3 or 4 digit number" })
    .nonempty({ message: "Exp is required" }),
  cvv: z
    .string()
    .regex(/^\d{3,4}$/, { message: "CVV must be a 3 or 4 digit number" })
    .nonempty({ message: "CVV is required" }),
  postalCode: z
    .string()
    .regex(/^\d{3,7}$/, { message: "CVV must be a 3 or 7 digit number" })
    .nonempty({ message: "Postal code is required" }),
  email: z
    .string()
    .email({ message: "Must be a valid email" })
    .nonempty({ message: "Email is required" }),
});

export const createEventSchema = z.object({
  title: z
    .string()
    .min(2, { message: "Title must be at least 2 characters long" })
    .nonempty({ message: "Title is required" }),
  address: z
    .string()
    .min(5, { message: "Address must be at least 5 characters long" })
    .nonempty({ message: "Address is required" }),
  date: z
    .date({ invalid_type_error: "Please select a valid date" }) // Expect a Date object instead of a string
    .refine((value) => value instanceof Date && !isNaN(value), {
      message: "Please select a valid date",
    }),
  price: z
    .string()
    .transform((value) => parseFloat(value)) // Convert string input to number
    .refine((value) => !isNaN(value) && value > 0, {
      message: "Price must be a positive number",
    }),
  variant: z
    .string()
    .min(3, { message: "Variant must be at least 3 characters long" })
    .nonempty({ message: "Variant is required" }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters long" })
    .nonempty({ message: "Description is required" }),
});

export const newsLetterSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .nonempty({ message: "Name is required" }),
  lastname: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters long" })
    .nonempty({ message: "Last name is required" }),
  email: z.string().email("Invalid email"),
});
