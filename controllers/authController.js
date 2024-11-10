// import bcrypt, { compare } from "bcrypt";
import userModel from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/authHelper.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, fpassA } = req.body;
    //validations
    if (!name) {
      return res.send({ error: "Name is Required" });
    }
    if (!email) {
      return res.send({ message: "Email is Required" });
    }
    if (!password) {
      return res.send({ message: "Password is Required" });
    }
    if (!phone) {
      return res.send({ message: "Phone no is Required" });
    }
    if (!address) {
      return res.send({ message: "Address is Required" });
    }
    if (!fpassA) {
      return res.send({ message: "Answer is Required" });
    }
    //check user
    const exisitingUser = await userModel.findOne({ email });
    //exisiting user
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Already Register please login",
      });
    }
    //register user
    const hashedPassword = await hashPassword(password);
    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashedPassword,
      fpassA,
    }).save();

    res.status(201).send({
      success: true,
      message: "User Register Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Errro in Registeration",
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
        role: user.role,
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
