import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import {
  createProductController,
  getProductController,
  gettinSingleProduct,
  sniper,
  pdeleter,
  updateSki,
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

//u[dtaing
router.post("/update-product/:pidP", requireSignIn, isAdmin, formidable(), updateSki);
export default router;
