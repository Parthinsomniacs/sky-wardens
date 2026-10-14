const express = require("express");
const router = express.Router();
const {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, authorize, superAdminOnly } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  createCategorySchema,
  updateCategorySchema,
} = require("../validators/categoryValidator");

// Public endpoints (Website visitors & catalog index)
router.get("/", getCategories);
router.get("/:id", getCategoryById);

// Protected endpoints (Admin / Super Admin clearance with strict Zod validation)
router.post(
  "/",
  protect,
  authorize("Super Admin", "Admin"),
  validate(createCategorySchema),
  createCategory
);

router.put(
  "/:id",
  protect,
  authorize("Super Admin", "Admin"),
  validate(updateCategorySchema),
  updateCategory
);

router.delete("/:id", protect, superAdminOnly, deleteCategory);

module.exports = router;
