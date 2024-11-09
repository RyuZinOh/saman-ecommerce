import bcrypt, { compare } from "bcrypt";
import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, fpassA } = req.body;

    // Validation
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .send({ success: false, message: "Password is required" });
    }
    if (!phone) {
      return res
        .status(400)
        .send({ success: false, message: "Phone number is required" });
    }
    if (!address) {
      return res
        .status(400)
        .send({ success: false, message: "Address is required" });
    }
    if (!fpassA) {
      return res
        .status(400)
        .send({ success: false, message: "Security answer is required" });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .send({ success: true, message: "User is already registered" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create and save user
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      fpassA, 
    }).save();

    return res.status(201).send({
      success: true,
      message: "Successful registration",
      user,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .send({ success: false, message: "Error in registration", error });
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
//forgetPassController
export const forgetPassController = async (req, res) => {
  try {
    const { email, fpassA, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "email reuqired" });
    }
    if (!fpassA) {
      res.status(400).send({ message: "answer is reuqired" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "new password needed" });
    }
    //cheking
    const user = await userModel.findOne({ email, fpassA });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "wrong emial or answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "password resetted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "something wrong",
      error,
    });
  }
};

//test controller
export const testController = (req, res) => {
  res.send("hi");
};
