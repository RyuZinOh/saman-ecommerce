import productModel from "../models/productModel.js";
import fs from "fs";
import slugify from "slugify";
import categoryModels from "../models/categoryModels.js";
import braintree from "braintree";
import { error } from "console";
import orderModel from "../models/orderModel.js";
import dotenv from "dotenv";

dotenv.config();
// Validation helper
const validateProductFields = (fields, photo) => {
  const { name, description, price, category, quantity } = fields;
  if (!name) return "Name is required";
  if (!description) return "Description is required";
  if (!price) return "Price is required";
  if (!category) return "Category is required";
  if (!quantity) return "Quantity is required";
  if (photo && photo.size > 1000000) return "Photo must be less than 1MB";
  return null;
};

// ..payement gateway
var gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: process.env.BRAINTREE_MERCHANT,
  publicKey: process.env.BRAINTREE_PUBLIC_KEY,
  privateKey: process.env.BRAINTREE_PRIVATE_KEY,
});

// Create product controller
export const createProductController = async (req, res) => {
  try {
    const { fields, files } = req;
    const error = validateProductFields(fields, files?.photo);
    if (error) return res.status(400).send({ error });

    const product = new productModel({ ...fields, slug: slugify(fields.name) });
    if (files.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    await product.save();
    res.status(201).send({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).send({
      success: false,
      message: "Error creating product",
      error,
    });
  }
};

// Get products controller
export const getProductController = async (req, res) => {
  try {
    const products = await productModel
      .find({})
      .populate("category")
      .select("-photo")
      .limit(12)
      .sort({ createdAt: -1 });

    res.status(200).send({
      success: true,
      message: "Products retrieved successfully",
      total: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving products",
      error,
    });
  }
};

// Get single product controller
export const gettinSingleProduct = async (req, res) => {
  try {
    const product = await productModel
      .findOne({ slug: req.params.slug })
      .select("-photo")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Single product fetched successfully",
      product,
    });
  } catch (error) {
    console.error("Error fetching single product:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving single product",
      error,
    });
  }
};

// Get product photo controller
export const sniper = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.pidP)
      .select("photo");
    if (product?.photo?.data) {
      res.set("Content-Type", product.photo.contentType);
      return res.status(200).send(product.photo.data);
    }
    res.status(404).send({ error: "Photo not found" });
  } catch (error) {
    console.error("Error fetching photo:", error);
    res.status(500).send({
      success: false,
      message: "Error retrieving photo",
      error,
    });
  }
};

// Delete product controller
export const pdeleter = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.params.pidP);
    res.status(200).send({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).send({
      success: false,
      message: "Error deleting product",
      error,
    });
  }
};

// Update product controller
export const updateSki = async (req, res) => {
  try {
    const { fields, files } = req;
    const error = validateProductFields(fields, files?.photo);
    if (error) return res.status(400).send({ success: false, message: error });

    // Update product with new fields and slug
    let product = await productModel
      .findByIdAndUpdate(
        req.params.pidP,
        {
          ...fields,
          slug: slugify(fields.name),
        },
        { new: true }
      )
      .populate("category"); 

    if (files?.photo) {
      product.photo.data = fs.readFileSync(files.photo.path);
      product.photo.contentType = files.photo.type;
    }

    await product.save();

    res.status(200).send({
      success: true,
      message: "Product updated successfully",
      product,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).send({
      success: false,
      message: "Error updating product",
      error: error.message,
    });
  }
};

//catrgoryfilterdropdown

export const pCg = async (req, res) => {
  try {
    const category = await categoryModels.findOne({ slug: req.params.slug });
    const products = await productModel.find({ category }).populate("category");
    res.status(200).send({
      success: true,
      category,
      products,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      success: false,
      error,
      message: "Error While Getting products",
    });
  }
};


//searching product
export const searchProductController = async (req, res) => {
  try {
    const { keyword } = req.params;
    const results = await productModel
      .find({
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { description: { $regex: keyword, $options: "i" } },
        ],
      })
      .select("name slug price category _id")
      .populate("category");

    res.status(200).send({
      success: true,
      message: "Search results found",
      results,
    });
  } catch (error) {
    console.error("Error in search:", error);
    res.status(500).send({
      success: false,
      message: "Error in search",
      error,
    });
  }
};




//token
export const bTC = async (req, res) => {
  try {
    const tokenResponse = await new Promise((resolve, reject) => {
      gateway.clientToken.generate({}, (err, response) => {
        if (err) reject(err);
        else resolve(response);
      });
    });
    res.json(tokenResponse);
  } catch (error) {
    console.error("Error generating client token:", error);
    res.status(500).json({ error: "Failed to generate client token" });
  }
};







//payment
export const bTm = async (req, res) => {
  try {
    const { nonce, cart } = req.body;
    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const transactionResult = await new Promise((resolve, reject) => {
      gateway.transaction.sale(
        {
          amount: total.toFixed(2), // Ensure amount is in a proper format
          paymentMethodNonce: nonce,
          options: { submitForSettlement: true },
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
    });

    if (transactionResult.success) {
      const order = await new orderModel({
        products: cart,
        payment: transactionResult,
        buyer: req.user._id,
      }).save();

      res.json({ ok: true, order });
    } else {
      res
        .status(500)
        .json({ error: "Transaction failed", details: transactionResult });
    }
  } catch (error) {
    console.error("Error processing payment:", error);
    res.status(500).json({ error: "Failed to process payment" });
  }
};
