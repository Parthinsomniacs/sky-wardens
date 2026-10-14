const User = require("../models/User");
const Role = require("../models/Role");
const asyncHandler = require("../utils/asyncHandler");
const { findByIdOrCustomId } = require("../utils/queryHelper");

// @desc    Get all admin users
// @route   GET /api/users
// @access  Private (Super Admin Only)
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find()
    .select("-password")
    .populate("role")
    .sort({ createdAt: -1 });

  const formattedUsers = users.map((u) => ({
    _id: u._id,
    id: u.id,
    name: u.name,
    email: u.email,
    role: u.role?.name || "Super Admin",
    avatar: u.avatar,
    status: u.status,
    lastLogin: u.lastLogin,
    createdAt: u.createdAt,
  }));

  res.status(200).json({
    success: true,
    count: formattedUsers.length,
    users: formattedUsers,
  });
});

// @desc    Create new admin user
// @route   POST /api/users
// @access  Private (Super Admin Only)
const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email: email.toLowerCase().trim() });
  if (existing) {
    return res.status(400).json({
      success: false,
      message: `An account with email '${email}' already exists.`,
    });
  }

  // Ensure default Super Admin role exists
  let superAdminRole = await Role.findOne({ name: "Super Admin" });
  if (!superAdminRole) {
    superAdminRole = await Role.create({
      name: "Super Admin",
      slug: "super-admin",
      description: "Full System Operational & Defense Clearance Access",
      permissions: ["*"],
      isActive: true,
    });
  }

  const tempPassword = password || "SuperAdmin@Sky2026#";

  const count = await User.countDocuments();
  const id = `USR-${String(count + 1).padStart(3, "0")}`;

  const initials =
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "SA";

  const user = await User.create({
    id,
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: tempPassword,
    role: superAdminRole._id,
    avatar: initials,
    status: "Active",
  });

  res.status(201).json({
    success: true,
    message: `User '${user.name}' provisioned as Super Admin.`,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: "Super Admin",
      avatar: user.avatar,
      status: user.status,
    },
  });
});

// @desc    Update admin user
// @route   PUT /api/users/:id
// @access  Private (Super Admin Only)
const updateUser = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const user = await findByIdOrCustomId(User, identifier, ["id"], "role");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  // Whitelist safe update fields (Prevent Mass Assignment of role, id, password hash)
  const allowedFields = ["name", "department", "clearance", "status"];
  allowedFields.forEach((field) => {
    if (req.body[field] !== undefined) {
      user[field] = req.body[field];
    }
  });

  const updated = await user.save();
  await updated.populate("role");

  res.status(200).json({
    success: true,
    message: `User '${updated.name}' updated successfully.`,
    user: {
      _id: updated._id,
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role?.name || "Super Admin",
      department: updated.department,
      clearance: updated.clearance,
      avatar: updated.avatar,
      status: updated.status,
    },
  });
});

// @desc    Delete admin user
// @route   DELETE /api/users/:id
// @access  Private (Super Admin Only)
const deleteUser = asyncHandler(async (req, res) => {
  const identifier = req.params.id;
  const user = await findByIdOrCustomId(User, identifier, ["id"]);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found.",
    });
  }

  // Prevent deleting root super admin account
  if (user.id === "USR-001" || user.email === "admin@skywardens.com") {
    return res.status(400).json({
      success: false,
      message: "Root Super Administrator account cannot be deleted.",
    });
  }

  await User.findByIdAndDelete(user._id);

  res.status(200).json({
    success: true,
    message: `User '${user.name}' removed from system.`,
  });
});

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
