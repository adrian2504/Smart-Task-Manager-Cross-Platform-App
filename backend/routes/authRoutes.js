// backend/routes/authRoutes.js

import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js"; // your Mongoose model

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "super‐secret‐key";

// ─── SIGN UP ──────────────────────────────────────────────────────────────────
// POST /api/auth/signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // 1) Check for existing email or username
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ error: "Email already in use." });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ error: "Username already taken." });
    }

    // 2) Hash the password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // 3) Create & save new user
    // Note: in this schema, the field is named "password" (not passwordHash),
    // so we store the hashed value in the "password" field.
    const newUser = new User({
      username,
      email,
      password: passwordHash,
    });
    await newUser.save();

    // 4) Generate a JWT (optional)
    const token = jwt.sign(
      { userId: newUser._id, username: newUser.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(201).json({
      username: newUser.username,
      token,
    });
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).json({ error: "Server error during signup." });
  }
});

// ─── LOG IN ────────────────────────────────────────────────────────────────────
// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required." });
    }

    // 1) Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // 2) Ensure the hashed password is in `user.password`
    if (!user.password) {
      console.error("Login error: user has no password field:", user);
      return res.status(500).json({ error: "Server error: no password on record." });
    }

    // 3) Compare the plain‐text password against the stored bcrypt hash
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // 4) Generate JWT (optional)
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    return res.status(200).json({
      username: user.username,
      token,
    });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({ error: "Server error during login." });
  }
});

export default router;
