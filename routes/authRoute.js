import express from "express";
import {
  registerController,
  loginController,
  testController,
  forgetPassController,
  updateProfile,
  getAllUsers,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

// routing objects
const router = express.Router();

// Register [POST]
router.post("/register", registerController);

// Login [POST]
router.post("/login", loginController);

// forget password
router.post("/forgot-password", forgetPassController);
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

// Get all users
router.get("/users", requireSignIn, isAdmin, getAllUsers);

export default router;
