/**
 * asyncHandler
 * Higher-order function that wraps asynchronous Express route handlers
 * and automatically forwards errors to the centralized error middleware.
 * Eliminates repetitive try-catch blocks across all controllers.
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
