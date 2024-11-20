import mongoose from "mongoose";
// import slugify from "slugify";

const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        type: mongoose.ObjectId,
        ref: "Products",
      },
    ],
    payment: {},
    buyer: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      default: "not processed",
      enum: ["not processed", "processing", "shipped", "delivered"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
