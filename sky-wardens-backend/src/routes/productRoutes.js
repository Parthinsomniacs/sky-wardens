const express = require("express");
const router = express.Router();
const {
  getPublicProducts,
  getAllAdminProducts,
  getProductById,
  createProduct,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
} = require("../controllers/productController");
const { protect, authorize, superAdminOnly } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  createProductSchema,
  updateProductSchema,
} = require("../validators/productValidator");

// Public routes (Website visitors)
router.get("/", getPublicProducts);
router.get("/:id", getProductById);

// Protected routes (Admin Portal with strict validation and clearance checks)
router.get("/admin/all", protect, authorize("Super Admin", "Admin"), getAllAdminProducts);

router.post(
  "/",
  protect,
  authorize("Super Admin", "Admin"),
  validate(createProductSchema),
  createProduct
);

router.put(
  "/:id",
  protect,
  authorize("Super Admin", "Admin"),
  validate(updateProductSchema),
  updateProduct
);

router.patch(
  "/:id/status",
  protect,
  authorize("Super Admin", "Admin"),
  toggleProductStatus
);

router.delete("/:id", protect, authorize("Super Admin", "Admin"), deleteProduct);

module.exports = router;
