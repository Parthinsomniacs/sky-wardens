const express = require("express");
const router = express.Router();
const {
  submitLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
} = require("../controllers/leadController");
const { protect, superAdminOnly } = require("../middleware/authMiddleware");
const { leadSubmissionLimiter } = require("../middleware/rateLimiter");
const validate = require("../middleware/validateMiddleware");
const {
  submitLeadSchema,
  updateLeadSchema,
} = require("../validators/leadValidator");

// Public inquiry submission (Anti-spam rate limited, strict Zod schema)
router.post("/", leadSubmissionLimiter, validate(submitLeadSchema), submitLead);

// SUPER ADMIN ONLY ENDPOINTS (Strictly protected from Normal Admin)
router.get("/", protect, superAdminOnly, getLeads);
router.get("/:id", protect, superAdminOnly, getLeadById);
router.put("/:id", protect, superAdminOnly, validate(updateLeadSchema), updateLead);
router.delete("/:id", protect, superAdminOnly, deleteLead);

module.exports = router;
