import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPassController,
  updateProfile,
  getOrderc,
  getOrdersA,
  updateStatusC,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// routing objects
const router = express.Router();

// Register [POST]
router.post("/register", registerController);

// Login [POST]
router.post("/login", loginController);

// forget password
router.post("/forget_password", forgetPassController);
// Testing route
router.get("/test", requireSignIn, isAdmin, testController);

//protected user route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
//protected admin route
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
  res.status(200).send({ ok: true });
});

router.put("/profile", requireSignIn, updateProfile);

//getting order

router.get("/orders", requireSignIn, getOrderc);

//for orders
router.get("/all-orders", requireSignIn, isAdmin, getOrdersA);

router.put("/order-status/:orderId", requireSignIn, isAdmin, updateStatusC);

export default router;
