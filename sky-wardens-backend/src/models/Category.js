const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
    },
    number: {
      type: String,
      default: "01",
      trim: true,
    },
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
    },
    division: {
      type: String,
      required: [true, "Parent division is required (e.g. Aerospace or Defence)"],
      trim: true,
      enum: ["Aerospace", "Defence", "Advanced Systems", "Petrochemicals"],
    },
    tagline: {
      type: String,
      default: "",
      trim: true,
    },
    order: {
      type: Number,
      default: 1,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  }
);

// Auto-generate id/slug before saving if not provided
categorySchema.pre("save", function () {
  if (!this.id && this.name) {
    this.id = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
});

module.exports = mongoose.model("Category", categorySchema);
