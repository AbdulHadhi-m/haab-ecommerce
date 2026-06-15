import mongoose, { Schema } from "mongoose";
import { IProduct } from "./interfaces";

const imageSchema = new Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false },
);

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [200, "Name must not exceed 200 characters"],
      index: true,
    },
    slug: {
      type: String,
      required: [true, "Slug is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      maxlength: [5000, "Description must not exceed 5000 characters"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price must be positive"],
    },
    discountPrice: {
      type: Number,
      min: [0, "Discount price must be positive"],
      default: null,
      validate: {
        validator: function (this: { price: number }, value: number) {
          return value === null || value < this.price;
        },
        message: "Discount price must be less than regular price",
      },
    },
    images: {
      type: [imageSchema],
      default: [],
    },
    stock: {
      type: Number,
      required: [true, "Stock is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
      index: true,
    },
    featured: {
      type: Boolean,
      default: false,
      index: true,
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, "Rating cannot be negative"],
      max: [5, "Rating cannot exceed 5"],
    },
    ratings: {
      type: new Schema(
        {
          average: { type: Number, default: 0 },
          count: { type: Number, default: 0 },
        },
        { _id: false },
      ),
      default: { average: 0, count: 0 },
    },
    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        const transformed = ret as Record<string, unknown>;
        delete transformed.__v;
        return transformed;
      },
    },
  },
);

productSchema.index({ name: "text", description: "text" });
productSchema.index({ category: 1, isActive: 1, createdAt: -1 });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ featured: 1, isActive: 1, createdAt: -1 });
productSchema.index({ price: 1, createdAt: -1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ isActive: 1, createdAt: -1 });
productSchema.index({ "ratings.average": -1 });

export const Product = mongoose.model<IProduct>("Product", productSchema);
