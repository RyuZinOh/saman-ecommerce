import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  gettinSingleProduct,
  sniper,
  pdeleter,
  updateSki,
  pCg,
  searchProductController,
  createOrder,
  getUserOrders,
  getUserOrderCount,
} from "../controllers/productcontroller.js";
import formidable from "express-formidable";
const router = express.Router();

//routes
//creating product
router.post(
  "/create-product",
  requireSignIn,
  isAdmin,
  formidable(),
  createProductController
);

//gettin prodycsts
router.get("/get-product", getProductController);

//getting single products
router.get("/get-product/:slug", gettinSingleProduct);

//getting photo
router.get("/product-photo/:pidP", sniper);

//dwlwting
router.delete("/product-delete/:pidP", requireSignIn, isAdmin, pdeleter);

//updtaing
router.put(
  "/update-product/:pidP",
  requireSignIn,
  isAdmin,
  formidable(),
  updateSki
);

//category prodcut
router.get("/product-category/:slug", pCg);

//searching product
router.get("/search/:keyword", searchProductController);

//ordering
router.post(
  "/create-order",
  requireSignIn,
  createOrder
)


router.get(
  "/user-orders",
  requireSignIn,
  getUserOrders,
);


// order count
router.get(
  "/order-count",
  requireSignIn,
  getUserOrderCount
);

export default router;
