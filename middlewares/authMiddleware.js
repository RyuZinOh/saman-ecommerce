import JWT from "jsonwebtoken";
import userModel from "../models/userModel.js";

// Middleware to verify the user is signed in
export const requireSignIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authorization token not provided",
      });
    }
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

// Middleware to verify the user is an admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
    if (user.role !== 1) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized access",
      });
    }
    next();
  } catch (error) {
    console.error("Admin Check Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
