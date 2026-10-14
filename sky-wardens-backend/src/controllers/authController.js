const User = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");

// @desc    Authenticate admin user & get JWT token
// @route   POST /api/auth/login
// @access  Public (Rate-limited, Strict Zod Validation)
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // 1. Fetch user by email with password and populated role
  const user = await User.findOne({ email: email.toLowerCase().trim() })
    .select("+password")
    .populate("role");

  // Generic 401 response to prevent user enumeration
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Invalid credentials.",
    });
  }

  // 2. Check if account is temporarily locked due to repeated failed logins
  if (user.isLocked()) {
    const remainingMinutes = Math.ceil((user.lockUntil - Date.now()) / (60 * 1000));
    return res.status(429).json({
      success: false,
      message: `Account is temporarily locked due to multiple failed login attempts. Please try again in ${remainingMinutes} minute(s).`,
    });
  }

  // 3. Verify password hash using bcrypt
  const isMatch = await user.matchPassword(password);
  if (!isMatch) {
    // Increment failed attempts and trigger lockout if >= 5
    user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
    if (user.failedLoginAttempts >= 5) {
      user.lockUntil = new Date(Date.now() + 15 * 60 * 1000); // 15 mins lockout
    }
    await user.save({ validateBeforeSave: false });

    return res.status(401).json({
      success: false,
      message: "Invalid credentials.",
    });
  }

  // 4. Verify Account & Role Status (checked AFTER password validation)
  if (user.status === "Inactive") {
    return res.status(403).json({
      success: false,
      message: "This account has been deactivated. Please contact the administrator.",
    });
  }

  if (!user.role || !user.role.isActive) {
    return res.status(403).json({
      success: false,
      message: "Your assigned role is inactive or invalid. Access denied.",
    });
  }

  // 5. Reset lockout counter & record login timestamp
  user.failedLoginAttempts = 0;
  user.lockUntil = undefined;
  user.lastLogin = new Date().toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
  await user.save({ validateBeforeSave: false });

  // 6. Generate Signed JWT with verified Role name
  const roleName = user.role.name || "Super Admin";
  const token = user.getSignedJwtToken(roleName);

  res.status(200).json({
    success: true,
    token,
    user: {
      id: user.id || user._id,
      name: user.name,
      email: user.email,
      role: roleName,
      avatar: user.avatar || "SA",
    },
  });
});

// @desc    Get currently authenticated admin user profile
// @route   GET /api/auth/me
// @access  Private (JWT Protected)
const getMe = asyncHandler(async (req, res) => {
  const roleName = req.user.role?.name || req.user.role || "Super Admin";

  res.status(200).json({
    success: true,
    user: {
      id: req.user.id || req.user._id,
      name: req.user.name,
      email: req.user.email,
      role: roleName,
      avatar: req.user.avatar || "SA",
    },
  });
});

module.exports = {
  login,
  getMe,
};
