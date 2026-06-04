import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    oldPrice: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      default: 5,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    image: {
      type: String,
      required: true,
    },

    gallery: {
      type: [String],
      default: [],
    },

    description: {
      type: String,
      default: "",
    },

    width: {
      type: String,
      default: "",
    },

    height: {
      type: String,
      default: "",
    },

    length: {
      type: String,
      default: "",
    },

    weight: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Product =
  models.Product ||
  model("Product", ProductSchema);

export default Product;