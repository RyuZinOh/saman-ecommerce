import express from "express";
import {
  registerController,
  loginController,
  testController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";
//routing objects
const router = express.Router();

//registering [post]

router.post("/register", registerController);

//loggin in [post]
router.post("/login", loginController);

export default router;

//testing route
router.get("/test", requireSignIn, isAdmin, testController);
