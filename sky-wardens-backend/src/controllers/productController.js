const Product = require("../models/Product");
const asyncHandler = require("../utils/asyncHandler");
const { findByIdOrCustomId, escapeRegex } = require("../utils/queryHelper");

// @desc    Get active products for public client website
// @route   GET /api/products
// @access  Public
const getPublicProducts = asyncHandler(async (req, res) => {
  const { division, category, search } = req.query;

  // Public visitors only see Active catalog equipment
  const query = { status: "Active" };

  if (division) {
    const escapedDiv = escapeRegex(division);
    query.division = new RegExp(`^${escapedDiv}$`, "i");
  }

  if (category && category !== "all") {
    const escapedCat = escapeRegex(category);
    query.$or = [
      { categoryId: category },
      { categoryTitle: new RegExp(escapedCat, "i") },
      { categoryName: new RegExp(escapedCat, "i") },
    ];
  }

  if (search) {
    const escapedSearch = escapeRegex(search);
    query.$or = [
      { name: new RegExp(escapedSearch, "i") },
      { description: new RegExp(escapedSearch, "i") },
      { id: new RegExp(escapedSearch, "i") },
    ];
  }

  const products = await Product.find(query).sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// @desc    Get all products (Active & Inactive) for Admin Portal
// @route   GET /api/products/admin/all
// @access  Private (Admin / Super Admin clearance)
const getAllAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find().sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: products.length,
    products,
  });
});

// @desc    Get single product by ID or Slug
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const product = await findByIdOrCustomId(Product, identifier, ["id"]);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with identifier '${identifier}' not found.`,
    });
  }

  res.status(200).json({
    success: true,
    product,
  });
});

// @desc    Create new product
// @route   POST /api/products
// @access  Private (Admin / Super Admin clearance)
const createProduct = asyncHandler(async (req, res) => {
  const {
    name,
    id,
    description,
    imageSrc,
    imageAlt,
    division,
    categoryId,
    categoryTitle,
    categoryName,
    status,
    details,
  } = req.body;

  const generatedId =
    id?.trim() || name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

  // Check if unique ID already exists
  const existing = await Product.findOne({ id: generatedId });
  if (existing) {
    return res.status(400).json({
      success: false,
      message: `Product ID '${generatedId}' already exists. Please choose a unique name/ID.`,
    });
  }

  const product = await Product.create({
    id: generatedId,
    name: name.trim(),
    description: description?.trim() || `${name} tactical specification profile.`,
    imageSrc: imageSrc.trim(),
    imageAlt: imageAlt?.trim() || name.trim(),
    division: division.trim(),
    categoryId: categoryId?.trim() || "general",
    categoryTitle: categoryTitle?.trim() || categoryName?.trim() || "General Equipment",
    categoryName: categoryName?.trim() || categoryTitle?.trim() || "General Equipment",
    status: status || "Active",
    details: Array.isArray(details) ? details : [],
  });

  res.status(201).json({
    success: true,
    message: `Product '${product.name}' created successfully.`,
    product,
  });
});

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private (Admin / Super Admin clearance)
const updateProduct = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const product = await findByIdOrCustomId(Product, identifier, ["id"]);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: `Product with identifier '${identifier}' not found.`,
    });
  }

  // Whitelist safe update fields (Prevent Mass Assignment)
  const allowedFields = [
    "name",
    "description",
    "imageSrc",
    "imageAlt",
    "division",
    "categoryId",
    "categoryTitle",
    "categoryName",
    "status",
    "details",
  ];

  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  });

  const updated = await product.save();

  res.status(200).json({
    success: true,
    message: `Product '${updated.name}' updated successfully.`,
    product: updated,
  });
});

// @desc    Toggle product status (Active <-> Inactive)
// @route   PATCH /api/products/:id/status
// @access  Private (Admin / Super Admin clearance)
const toggleProductStatus = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const product = await findByIdOrCustomId(Product, identifier, ["id"]);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  product.status = product.status === "Active" ? "Inactive" : "Active";
  await product.save();

  res.status(200).json({
    success: true,
    message: `Product '${product.name}' status changed to '${product.status}'.`,
    status: product.status,
    product,
  });
});

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private (Super Admin clearance)
const deleteProduct = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const product = await findByIdOrCustomId(Product, identifier, ["id"]);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found.",
    });
  }

  await Product.findByIdAndDelete(product._id);

  res.status(200).json({
    success: true,
    message: `Product '${product.name}' was successfully deleted.`,
  });
});

module.exports = {
  getPublicProducts,
  getAllAdminProducts,
  getProductById,
  createProduct,
  updateProduct,
  toggleProductStatus,
  deleteProduct,
};
