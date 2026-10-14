const { z } = require("zod");

const createUserSchema = z
  .object({
    name: z
      .string({ required_error: "Full name is required." })
      .trim()
      .min(2, "Name must be at least 2 characters.")
      .max(100, "Name must not exceed 100 characters."),
    email: z
      .string({ required_error: "Official email address is required." })
      .trim()
      .email("Please provide a valid official email address.")
      .max(120, "Email must not exceed 120 characters."),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .max(128, "Password must not exceed 128 characters.")
      .optional(),
  })
  .strict(); // Block unexpected/injected fields

const updateUserSchema = z
  .object({
    name: z.string().trim().min(2).max(100).optional(),
    department: z.string().trim().max(100).optional(),
    clearance: z.string().trim().max(100).optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
  })
  .strict();

module.exports = {
  createUserSchema,
  updateUserSchema,
};
