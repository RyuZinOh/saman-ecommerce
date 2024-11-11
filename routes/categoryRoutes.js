import express from "express";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
import { createCategoryController } from "../controllers/categoryController.js";
import { updateCategoryController } from "../controllers/categoryController.js";
import { categoryController } from "../controllers/categoryController.js";
import { singleCategoryController } from "../controllers/categoryController.js";
import { deleteCategoryController } from "../controllers/categoryController.js";
const router = express.Router();

//creating catrgory
router.post(
  "/create-category",
  requireSignIn,
  isAdmin,
  createCategoryController
);

//updating category
router.put(
  "/update-category/:id",
  requireSignIn,
  isAdmin,
  updateCategoryController
);

//getting all the category
router.get("/get-category", categoryController);

//gettin single category
router.get("/single-category/:slug", singleCategoryController);

//deleting category
router.delete(
  "/delete-category/:id",
  requireSignIn,
  isAdmin,
  deleteCategoryController
);

export default router;
