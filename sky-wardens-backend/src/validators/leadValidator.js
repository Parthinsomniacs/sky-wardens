const { z } = require("zod");

const submitLeadSchema = z
  .object({
    name: z
      .string({ required_error: "Full name is required." })
      .trim()
      .min(2, "Full name must be at least 2 characters.")
      .max(100, "Full name must not exceed 100 characters."),
    email: z
      .string({ required_error: "Email address is required." })
      .trim()
      .email("Please provide a valid official email address.")
      .max(120, "Email address must not exceed 120 characters."),
    phone: z
      .string()
      .trim()
      .max(30, "Phone number must not exceed 30 characters.")
      .optional()
      .default(""),
    company: z
      .string()
      .trim()
      .max(120, "Company name must not exceed 120 characters.")
      .optional()
      .default(""),
    designation: z
      .string()
      .trim()
      .max(100, "Designation must not exceed 100 characters.")
      .optional()
      .default(""),
    country: z
      .string()
      .trim()
      .max(100, "Country name must not exceed 100 characters.")
      .optional()
      .default("India"),
    state: z
      .string()
      .trim()
      .max(100, "State name must not exceed 100 characters.")
      .optional()
      .default(""),
    city: z
      .string()
      .trim()
      .max(100, "City name must not exceed 100 characters.")
      .optional()
      .default(""),
    productInquired: z
      .string()
      .trim()
      .max(150, "Product inquired must not exceed 150 characters.")
      .optional()
      .default("General Aerospace/Defence Inquiry"),
    category: z
      .string()
      .trim()
      .max(100, "Category must not exceed 100 characters.")
      .optional()
      .default("Aerospace"),
    type: z
      .string()
      .trim()
      .max(100, "Inquiry type must not exceed 100 characters.")
      .optional()
      .default("Product(s) Inquiry"),
    message: z
      .string({ required_error: "Inquiry message is required." })
      .trim()
      .min(5, "Inquiry message must be at least 5 characters.")
      .max(2500, "Inquiry message must not exceed 2500 characters."),
  })
  .strict(); // Rejects unknown / malicious injected fields

const updateLeadSchema = z
  .object({
    status: z.enum(["New", "In Discussion", "Contacted", "Closed"]).optional(),
    priority: z.enum(["Standard", "Medium", "High"]).optional(),
    notes: z.string().trim().max(1000).optional(),
  })
  .strict();

module.exports = {
  submitLeadSchema,
  updateLeadSchema,
};
