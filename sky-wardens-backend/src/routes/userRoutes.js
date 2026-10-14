const express = require("express");
const router = express.Router();
const {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { protect, superAdminOnly } = require("../middleware/authMiddleware");
const validate = require("../middleware/validateMiddleware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/userValidator");

// All user management routes require Super Admin clearance!
router.use(protect);
router.use(superAdminOnly);

router.get("/", getUsers);
router.post("/", validate(createUserSchema), createUser);
router.put("/:id", validate(updateUserSchema), updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
