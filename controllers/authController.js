import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
// Signup User
export const signupUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password

    const hashPassword = await bcrypt.hash(password, 10);

    // Create User

    await User.create({
      name,
      email,
      password: hashPassword,
    });
    res.status(201).json({ message: "User Registered successfully" });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      message: "server error",
      error: error.message,
    });
  }
};

// Login User

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // To check already user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not exists" });
    }
    // Compare Password

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }
    // Generate JWT Token

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res.json({
      message: "Login Successfull",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
  console.error("LOGIN ERROR:", error);

  res.status(500).json({
    message: error.message,
    stack: error.stack,
  });
}
};
