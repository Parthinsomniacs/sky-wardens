const Category = require("../models/Category");
const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const { findByIdOrCustomId, escapeRegex } = require("../utils/queryHelper");

// @desc    Get all categories (public or filtered by division)
// @route   GET /api/categories
// @access  Public
const getCategories = asyncHandler(async (req, res) => {
  const { division, status } = req.query;

  const query = {};

  // Status filter (defaults to Active for public callers unless specified)
  if (status && status !== "all") {
    query.status = status;
  } else if (!status) {
    query.status = "Active";
  }

  if (division && division !== "all" && division !== "All") {
    const escapedDiv = escapeRegex(division);
    query.division = new RegExp(`^${escapedDiv}$`, "i");
  }

  const categories = await Category.find(query).sort({ order: 1, createdAt: 1 });

  res.status(200).json({
    success: true,
    count: categories.length,
    categories,
  });
});

// @desc    Get single category by slug or ID
// @route   GET /api/categories/:id
// @access  Public
const getCategoryById = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const category = await findByIdOrCustomId(Category, identifier, ["id"]);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: `Category with identifier '${identifier}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    category,
  });
});

// @desc    Create new category
// @route   POST /api/categories
// @access  Private (Admin / Super Admin clearance)
const createCategory = asyncHandler(async (req, res) => {
  const { name, id, division, number, tagline, order, status } = req.body;

  const generatedId =
    id?.trim().toLowerCase() ||
    name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  // Check if unique slug/ID already exists in this division
  const existing = await Category.findOne({ id: generatedId });
  if (existing) {
    return res.status(400).json({
      success: false,
      message: `Category with slug '${generatedId}' already exists. Please choose a unique name.`,
    });
  }

  const category = await Category.create({
    id: generatedId,
    name: name.trim(),
    division,
    number: number?.trim() || "01",
    tagline: tagline?.trim() || "",
    order: order || 1,
    status: status || "Active",
  });

  res.status(201).json({
    success: true,
    message: `Category '${category.name}' created under '${category.division}'.`,
    category,
  });
});

// @desc    Update category
// @route   PUT /api/categories/:id
// @access  Private (Admin / Super Admin clearance)
const updateCategory = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const category = await findByIdOrCustomId(Category, identifier, ["id"]);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found.",
    });
  }

  const oldName = category.name;
  const oldId = category.id;

  // Safe update with whitelist fields only (Prevent Mass Assignment)
  const allowedFields = ["name", "division", "number", "tagline", "order", "status"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      category[field] = req.body[field];
    }
  });

  const updated = await category.save();

  // Cascade category title rename to products referencing this category
  if (req.body.name && req.body.name.trim() !== oldName) {
    await Product.updateMany(
      { categoryId: oldId },
      { categoryTitle: req.body.name.trim(), categoryName: req.body.name.trim() }
    );
  }

  res.status(200).json({
    success: true,
    message: `Category '${updated.name}' updated successfully.`,
    category: updated,
  });
});

// @desc    Delete category
// @route   DELETE /api/categories/:id
// @access  Private (Super Admin clearance)
const deleteCategory = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const category = await findByIdOrCustomId(Category, identifier, ["id"]);

  if (!category) {
    return res.status(404).json({
      success: false,
      message: "Category not found.",
    });
  }

  // Check if products are currently assigned to this category
  const productCount = await Product.countDocuments({ categoryId: category.id });
  if (productCount > 0) {
    return res.status(400).json({
      success: false,
      message: `Cannot delete category '${category.name}' because ${productCount} product(s) are assigned to it. Please reassign or delete the products first.`,
    });
  }

  await Category.findByIdAndDelete(category._id);

  res.status(200).json({
    success: true,
    message: `Category '${category.name}' deleted successfully.`,
  });
});

module.exports = {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
