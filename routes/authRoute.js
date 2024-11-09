import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPassController
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// routing objects
const router = express.Router();

// Register [POST]
router.post("/register", registerController);

// Login [POST]
router.post("/login", loginController);

// forget password
router.post('/forget_password', forgetPassController)
// Testing route
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
  res.status(200).send({ ok: true });
});
export default router;
