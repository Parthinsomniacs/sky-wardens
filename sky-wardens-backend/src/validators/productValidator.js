const { z } = require("zod");

const detailItemSchema = z
  .object({
    label: z.string().optional().default(""),
    value: z.string().optional().default(""),
  })
  .strict();

const productDetailSectionSchema = z
  .object({
    type: z.enum(["spec-grid", "text", "features"]).optional().default("spec-grid"),
    title: z.string().optional().default(""),
    body: z.string().optional().default(""),
    items: z.array(detailItemSchema).optional().default([]),
  })
  .strict();

const createProductSchema = z
  .object({
    name: z
      .string({ required_error: "Product name is required." })
      .trim()
      .min(2, "Product name must be at least 2 characters.")
      .max(120, "Product name must not exceed 120 characters."),
    id: z
      .string()
      .trim()
      .max(120)
      .regex(/^[a-z0-9-]+$/, "Custom ID must contain only lowercase letters, numbers, and hyphens.")
      .optional(),
    description: z.string().trim().max(1000).optional().default(""),
    imageSrc: z.string({ required_error: "Product image is required." }).trim().min(1),
    imageAlt: z.string().trim().max(120).optional().default(""),
    division: z
      .string({ required_error: "Division is required." })
      .trim()
      .min(2, "Division name must be at least 2 characters."),
    categoryId: z.string().trim().max(60).optional().default("general"),
    categoryTitle: z.string().trim().max(100).optional().default("General Equipment"),
    categoryName: z.string().trim().max(100).optional().default("General Equipment"),
    status: z.enum(["Active", "Inactive"]).optional().default("Active"),
    details: z.array(productDetailSectionSchema).optional().default([]),
  })
  .strict(); // Reject injected unknown fields

const updateProductSchema = z
  .object({
    name: z.string().trim().min(2).max(120).optional(),
    id: z
      .string()
      .trim()
      .max(120)
      .regex(/^[a-z0-9-]+$/, "Custom ID must contain only lowercase letters, numbers, and hyphens.")
      .optional(),
    description: z.string().trim().max(1000).optional(),
    imageSrc: z.string().trim().min(1).optional(),
    imageAlt: z.string().trim().max(120).optional(),
    division: z.string().trim().min(2).optional(),
    categoryId: z.string().trim().max(60).optional(),
    categoryTitle: z.string().trim().max(100).optional(),
    categoryName: z.string().trim().max(100).optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
    details: z.array(productDetailSectionSchema).optional(),
  })
  .strict();

module.exports = {
  createProductSchema,
  updateProductSchema,
};
