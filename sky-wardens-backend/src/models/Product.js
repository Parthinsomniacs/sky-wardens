const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      unique: true,
      trim: true,
      sparse: true,
    },
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
    },
    description: {
      type: String,
      default: "",
      trim: true,
    },
    imageSrc: {
      type: String,
      required: [true, "Product image is required"],
      trim: true,
    },
    imageAlt: {
      type: String,
      default: "",
      trim: true,
    },
    division: {
      type: String,
      required: [true, "Division is required"],
      trim: true,
    },
    categoryId: {
      type: String,
      default: "general",
      trim: true,
    },
    categoryTitle: {
      type: String,
      default: "General Equipment",
      trim: true,
    },
    categoryName: {
      type: String,
      default: "General Equipment",
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
    details: [
      {
        type: {
          type: String,
          enum: ["spec-grid", "text", "features", "table", "list"],
          default: "spec-grid",
        },
        title: {
          type: String,
          default: "",
        },
        body: {
          type: String,
          default: "",
        },
        items: [mongoose.Schema.Types.Mixed],
        rows: [
          {
            label: { type: String, default: "" },
            value: { type: String, default: "" },
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

// Auto-generate id/slug if not provided
productSchema.pre("save", function () {
  if (!this.id && this.name) {
    this.id = this.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  }
  if (!this.imageAlt && this.name) {
    this.imageAlt = this.name;
  }
});

module.exports = mongoose.model("Product", productSchema);
