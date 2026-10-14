const Lead = require("../models/Lead");
const asyncHandler = require("../utils/asyncHandler");
const { findByIdOrCustomId, escapeRegex } = require("../utils/queryHelper");

// @desc    Submit inquiry/lead from public website
// @route   POST /api/leads
// @access  Public (Rate-limited, Strict Zod Validation)
const submitLead = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    phone,
    company,
    designation,
    country,
    state,
    city,
    productInquired,
    category,
    type,
    message,
  } = req.body;

  const lead = await Lead.create({
    name: name.trim(),
    email: email.toLowerCase().trim(),
    phone: phone?.trim() || "",
    company: company?.trim() || "",
    designation: designation?.trim() || "",
    country: country?.trim() || "India",
    state: state?.trim() || "",
    city: city?.trim() || "",
    productInquired: productInquired?.trim() || "General Aerospace/Defence Inquiry",
    category: category?.trim() || "Aerospace",
    type: type?.trim() || "Product(s) Inquiry",
    message: message.trim(),
    status: "New",
    priority: "Standard",
  });

  res.status(201).json({
    success: true,
    message: "Thank you for reaching out. Your inquiry has been transmitted securely to our defense procurement team.",
    leadId: lead.id,
  });
});

// @desc    Get all leads & inquiries
// @route   GET /api/leads
// @access  Private (SUPER ADMIN ONLY - Strictly restricted!)
const getLeads = asyncHandler(async (req, res) => {
  const { status, priority, category, search } = req.query;

  const query = {};

  if (status && status !== "all") {
    query.status = status;
  }

  if (priority && priority !== "all") {
    query.priority = priority;
  }

  if (category && category !== "all") {
    const escapedCat = escapeRegex(category);
    query.category = new RegExp(escapedCat, "i");
  }

  if (search) {
    const escapedSearch = escapeRegex(search);
    query.$or = [
      { name: new RegExp(escapedSearch, "i") },
      { company: new RegExp(escapedSearch, "i") },
      { email: new RegExp(escapedSearch, "i") },
      { productInquired: new RegExp(escapedSearch, "i") },
      { id: new RegExp(escapedSearch, "i") },
    ];
  }

  const leads = await Lead.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: leads.length,
    leads,
  });
});

// @desc    Get single lead details
// @route   GET /api/leads/:id
// @access  Private (SUPER ADMIN ONLY)
const getLeadById = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const lead = await findByIdOrCustomId(Lead, identifier, ["id"]);

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead inquiry not found.",
    });
  }

  res.status(200).json({
    success: true,
    lead,
  });
});

// @desc    Update lead status / priority / notes
// @route   PUT /api/leads/:id
// @access  Private (SUPER ADMIN ONLY)
const updateLead = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const lead = await findByIdOrCustomId(Lead, identifier, ["id"]);

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead inquiry not found.",
    });
  }

  // Whitelist safe update fields (Prevent Mass Assignment of customer data/inquiry id)
  const allowedFields = ["status", "priority", "notes"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      lead[field] = req.body[field];
    }
  });

  const updated = await lead.save();

  res.status(200).json({
    success: true,
    message: "Lead updated successfully.",
    lead: updated,
  });
});

// @desc    Delete lead inquiry
// @route   DELETE /api/leads/:id
// @access  Private (SUPER ADMIN ONLY)
const deleteLead = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const lead = await findByIdOrCustomId(Lead, identifier, ["id"]);

  if (!lead) {
    return res.status(404).json({
      success: false,
      message: "Lead not found.",
    });
  }

  await Lead.findByIdAndDelete(lead._id);

  res.status(200).json({
    success: true,
    message: "Lead removed from system.",
  });
});

module.exports = {
  submitLead,
  getLeads,
  getLeadById,
  updateLead,
  deleteLead,
};
