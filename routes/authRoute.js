import express from "express"
import {registerController} from "../controllers/authController.js"

//routing objects
const router = express.Router()

//registering [post]

router.post('/register',registerController)

export default router
