import express from "express";
import { registerController } from "../controllers/authController.js";
import { loginController } from "../controllers/authController.js";

//routing objects
const router = express.Router();

//registering [post]

router.post("/register", registerController);

//loggin in [post]
router.post("/login", loginController);

export default router;
