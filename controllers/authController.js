import bcrypt, { compare } from "bcrypt";
import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    // Validation
    if (!name) {
      return res.status(400).send({
        success: false,
        message: "Name is required",
      });
    }
    if (!email) {
      return res.status(400).send({
        success: false,
        message: "Email is required",
      });
    }
    if (!password) {
      return res.status(400).send({
        success: false,
        message: "Password is required",
      });
    }
    if (!phone) {
      return res.status(400).send({
        success: false,
        message: "Phone number is required",
      });
    }
    if (!address) {
      return res.status(400).send({
        success: false,
        message: "Address is required",
      });
    }
    const existingUser = await userModel.findOne({ email });
    //check user
    if (existingUser) {
      res.status(200).send({
        success: true,
        message: "User registered successfully",
      });
    }
    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create and save the user
    const user = new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
    }).save();
    res.status(201).send({
      sucess: true,
      message: "sucesssful registration",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      success: false,
      message: "Error in registration",
      error,
    });
  }
};

// POST LOGIN
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Check if user exists
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User is not registered",
      });
    }

    // Check if password matches
    const match = await comparePassword(password, user.password);
    if (!match) {
      return res.status(400).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Generate token
    const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Send response with user info and token
    res.status(200).send({
      success: true,
      message: "Successfully logged in",
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
      },
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error during login",
      error: error.message,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send("hi");
};
