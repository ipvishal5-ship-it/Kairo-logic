import { z } from "zod";
export const enquirySchema = z.object({
  id: z.string().uuid(),
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z
    .string()
    .trim()
    .email("Enter a valid email address.")
    .max(254)
    .transform((v) => v.toLowerCase()),
  organisation: z.string().trim().max(160).default(""),
  message: z
    .string()
    .trim()
    .min(10, "Please add a little more detail (at least 10 characters).")
    .max(3000),
  consent: z.literal(true, {
    errorMap: () => ({
      message: "Please agree to being contacted about this enquiry.",
    }),
  }),
  website: z.string().max(0).default(""),
});
