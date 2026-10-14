const { z } = require("zod");

const createCategorySchema = z
  .object({
    name: z
      .string({ required_error: "Category name is required." })
      .trim()
      .min(2, "Category name must be at least 2 characters.")
      .max(80, "Category name must not exceed 80 characters."),
    id: z
      .string()
      .trim()
      .max(80)
      .regex(/^[a-z0-9-]+$/, "Category slug must contain only lowercase letters, numbers, and hyphens.")
      .optional(),
    division: z.enum(["Aerospace", "Defence", "Advanced Systems", "Petrochemicals"], {
      required_error: "Parent division is required (Aerospace or Defence).",
    }),
    number: z.string().trim().max(10).optional().default("01"),
    tagline: z.string().trim().max(300).optional().default(""),
    order: z.number().int().min(1).max(999).optional().default(1),
    status: z.enum(["Active", "Inactive"]).optional().default("Active"),
  })
  .strict(); // Rejects unknown / malicious injected fields

const updateCategorySchema = z
  .object({
    name: z.string().trim().min(2).max(80).optional(),
    division: z.enum(["Aerospace", "Defence", "Advanced Systems", "Petrochemicals"]).optional(),
    number: z.string().trim().max(10).optional(),
    tagline: z.string().trim().max(300).optional(),
    order: z.number().int().min(1).max(999).optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
  })
  .strict();

module.exports = {
  createCategorySchema,
  updateCategorySchema,
};
