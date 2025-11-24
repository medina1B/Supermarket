import express from "express";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// ✅ Customer Signup
router.post("/signup", async (req, res) => {
  try {
    let { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      return res.status(400).json({ message: "Name and phone required" });
    }

    phoneNumber = phoneNumber.trim().replace(/\D/g, "");

    const existing = await User.findOne({ phoneNumber });
    if (existing) {
      return res
        .status(400)
        .json({ message: "Phone number already registered" });
    }

    const user = new User({
      username: name.trim(),
      phoneNumber,
      isAdmin: false,
    });

    await user.save();

    const token = jwt.sign(
      { id: user._id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Signup successful",
      token,
      name: user.username,
    });
  } catch (err) {
    console.error("Error in /customer/signup:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Customer Login (Auto Signup if new)
router.post("/login", async (req, res) => {
  try {
    let { name, phoneNumber } = req.body;

    if (!name || !phoneNumber) {
      return res.status(400).json({ message: "Name and phone required" });
    }

    phoneNumber = phoneNumber.trim().replace(/\D/g, "");

    let user = await User.findOne({ phoneNumber });

    // Create new user if not found
    if (!user) {
      user = new User({
        username: name.trim(),
        phoneNumber,
        isAdmin: false,
      });
      await user.save();
    } else {
      // Update name if changed
      if (user.username !== name.trim()) {
        user.username = name.trim();
        await user.save();
      }
    }

    const token = jwt.sign(
      { id: user._id, isAdmin: false },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      name: user.username,
    });
  } catch (err) {
    console.error("Error in /customer/login:", err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
