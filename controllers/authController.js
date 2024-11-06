import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import { hashPassword } from "../helpers/authHelper.js";

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
