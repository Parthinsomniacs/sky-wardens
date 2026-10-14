const mongoose = require("mongoose");

/**
 * Escapes any special regex characters to prevent ReDoS (Regular Expression Denial of Service)
 * and regex syntax errors when querying MongoDB.
 *
 * @param {string} text - User-supplied search or filter string
 * @returns {string} - Escaped string safe for new RegExp()
 */
const escapeRegex = (text) => {
  if (!text || typeof text !== "string") return "";
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

/**
 * Universal document lookup helper.
 * Replaces duplicate lookup logic across controllers by checking custom identifiers
 * (e.g. id, slug) and falling back to MongoDB _id if valid ObjectId.
 *
 * @param {mongoose.Model} Model - Mongoose model to query
 * @param {string} identifier - Target id, slug, or _id
 * @param {Array<string>} customFields - Custom field names to check, default: ['id', 'slug']
 * @param {string|object} populateFields - Optional populate query
 * @returns {Promise<mongoose.Document|null>}
 */
const findByIdOrCustomId = async (
  Model,
  identifier,
  customFields = ["id", "slug"],
  populateFields = null
) => {
  if (!identifier || typeof identifier !== "string") return null;

  const trimmedId = identifier.trim();
  const orConditions = customFields.map((field) => ({ [field]: trimmedId }));

  let query = Model.findOne({ $or: orConditions });
  if (populateFields) query = query.populate(populateFields);
  let doc = await query;

  // Fallback to MongoDB ObjectId if not found by custom ID
  if (!doc && mongoose.Types.ObjectId.isValid(trimmedId)) {
    let fallbackQuery = Model.findById(trimmedId);
    if (populateFields) fallbackQuery = fallbackQuery.populate(populateFields);
    doc = await fallbackQuery;
  }

  return doc;
};

module.exports = {
  escapeRegex,
  findByIdOrCustomId,
};
