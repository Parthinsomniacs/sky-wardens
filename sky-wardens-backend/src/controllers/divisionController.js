const Division = require("../models/Division");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const { findByIdOrCustomId, escapeRegex } = require("../utils/queryHelper");

// @desc    Get all divisions
// @route   GET /api/divisions
// @access  Public
const getDivisions = asyncHandler(async (req, res) => {
  const divisions = await Division.find().sort({ createdAt: 1 });
  res.status(200).json({
    success: true,
    count: divisions.length,
    divisions,
  });
});

// @desc    Create new division
// @route   POST /api/divisions
// @access  Private (Admin / Super Admin clearance)
const createDivision = asyncHandler(async (req, res) => {
  const { name, description, status, badgeColor } = req.body;

  const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  const existing = await Division.findOne({
    $or: [{ name: name.trim() }, { slug }],
  });

  if (existing) {
    return res.status(400).json({
      success: false,
      message: `Division with name '${name}' or slug '${slug}' already exists.`,
    });
  }

  const division = await Division.create({
    name: name.trim(),
    slug,
    description: description?.trim() || "",
    status: status || "Active",
    badgeColor: badgeColor || "bg-indigo-600",
  });

  res.status(201).json({
    success: true,
    message: `Division '${division.name}' created successfully.`,
    division,
  });
});

// @desc    Update division
// @route   PUT /api/divisions/:id
// @access  Private (Admin / Super Admin clearance)
const updateDivision = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const division = await findByIdOrCustomId(Division, identifier, ["id", "slug"]);

  if (!division) {
    return res.status(404).json({
      success: false,
      message: "Division not found.",
    });
  }

  const oldName = division.name;

  // Safe update with validated fields only (Prevent Mass Assignment)
  const allowedFields = ["name", "description", "status", "badgeColor"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      division[field] = req.body[field];
    }
  });

  // Re-generate slug if name changed
  if (req.body.name && req.body.name.trim() !== oldName) {
    division.slug = req.body.name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");
  }

  const updated = await division.save();

  // Cascade status update to all products belonging to this division
  if (req.body.status) {
    const escapedOldName = escapeRegex(oldName);
    await Product.updateMany(
      { division: new RegExp(`^${escapedOldName}$`, "i") },
      { status: req.body.status }
    );
  }

  // Cascade division name update if changed
  if (req.body.name && req.body.name.trim() !== oldName) {
    const escapedOldName = escapeRegex(oldName);
    await Product.updateMany(
      { division: new RegExp(`^${escapedOldName}$`, "i") },
      { division: req.body.name.trim() }
    );
  }

  res.status(200).json({
    success: true,
    message: `Division '${updated.name}' updated successfully.`,
    division: updated,
  });
});

// @desc    Delete division
// @route   DELETE /api/divisions/:id
// @access  Private (Super Admin clearance)
const deleteDivision = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const division = await findByIdOrCustomId(Division, identifier, ["id", "slug"]);

  if (!division) {
    return res.status(404).json({
      success: false,
      message: "Division not found.",
    });
  }

  // Protect core Aerospace and Defence divisions from deletion
  const normalizedName = division.name.toLowerCase();
  if (normalizedName === "aerospace" || normalizedName === "defence") {
    return res.status(400).json({
      success: false,
      message: "Core divisions (Aerospace & Defence) cannot be deleted.",
    });
  }

  await Division.findByIdAndDelete(division._id);

  res.status(200).json({
    success: true,
    message: `Division '${division.name}' deleted successfully.`,
  });
});

module.exports = {
  getDivisions,
  createDivision,
  updateDivision,
  deleteDivision,
};
