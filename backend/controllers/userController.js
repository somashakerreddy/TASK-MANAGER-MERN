import userModel from "../models/User.js";
import bcrypt from "bcryptjs";
import asyncHandler from "../middlewares/asyncHandler.js";
import generateToken from "../utils/generateToken.js";
import jwt from "jsonwebtoken";

const domain =
  process.env.NODE_ENV === "production"
    ? "taskmanger-server-qg2o.onrender.com"
    : "localhost";

// ========================== SIGNUP ==========================
const signupUser = asyncHandler(async (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  console.log("[SIGNUP] Incoming request body:", req.body);

  if (!userModel || !firstname || !lastname || !email || !password) {
    console.error("[SIGNUP ERROR] Missing required fields");
    throw new Error("Please fill all the fields");
  }

  const existUser = await userModel.findOne({ email });
  if (existUser) {
    console.warn("[SIGNUP] User already exists:", email);
    return res.status(400).json({ message: "User already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      firstname,
      lastname,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    generateToken(res, newUser._id);

    console.log("[SIGNUP] New user created:", newUser.email);

    res.status(201).json({
      success: true,
      _id: newUser._id,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      email: newUser.email,
    });
  } catch (error) {
    console.error("[SIGNUP ERROR]", error.message);
    res.status(500).json({ message: "Signup failed: " + error.message });
  }
});

// ========================== LOGIN ==========================
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    const isPasswordValid = await bcrypt.compare(password, existingUser.password);

    if (isPasswordValid) {
      generateToken(res, existingUser._id);
      return res.status(200).json({
        _id: existingUser._id,
        firstname: existingUser.firstname,
        lastname: existingUser.lastname,
        email: existingUser.email,
      });
    } else {
      return res.status(401).json({ message: "Invalid Password" });
    }
  } else {
    return res.status(404).json({ message: "User not found" });
  }
});

// ========================== LOGOUT ==========================
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "Logged out successfully" });
});

// ========================== GOOGLE ==========================
const google = asyncHandler(async (req, res) => {
  const { name, email, googlePhotoUrl } = req.body;

  try {
    const user = await userModel.findOne({ email });

    const token = jwt.sign({ id: user?._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    if (user) {
      const { password, ...rest } = user._doc;
      return res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          domain,
          signed: true,
          path: "/",
          secure: true,
          sameSite: "None",
          maxAge: 1 * 24 * 60 * 60 * 1000,
        })
        .json(rest);
    }

    const generatedPassword =
      Math.random().toString(36).slice(-8) +
      Math.random().toString(36).slice(-8);
    const hashedPassword = bcrypt.hashSync(generatedPassword, 10);

    const newUser = new userModel({
      firstname: name,
      lastname: name,
      email,
      profilePicture: googlePhotoUrl,
      password: hashedPassword,
    });

    await newUser.save();

    const { password, ...rest } = newUser._doc;

    return res
      .status(200)
      .cookie("jwt", token, {
        httpOnly: true,
        domain,
        signed: true,
        path: "/",
        secure: true,
        sameSite: "None",
        maxAge: 1 * 24 * 60 * 60 * 1000,
      })
      .json(rest);
  } catch (error) {
    console.error("[GOOGLE AUTH ERROR]", error.message);
    throw new Error(error.message);
  }
});

export { signupUser, loginUser, logoutUser, google };
