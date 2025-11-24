import express from "express";
import Order from "../models/Order.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Middleware to verify token
const auth = (req, res, next) => {
  const authHeader = req.header("Authorization");
  if (!authHeader) return res.status(401).json({ message: "Access denied" });

  const token = authHeader.startsWith("Bearer ")
    ? authHeader.slice(7)
    : authHeader;

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(400).json({ message: "Invalid token" });
  }
};

// Create a new order (customer only)
router.post("/", auth, async (req, res) => {
  try {
    if (req.user.isAdmin)
      return res.status(403).json({ message: "Admins cannot place orders" });

    const {
      items,
      subtotal,
      serviceFee,
      deliveryFee,
      totalAmount,
      address,
      notes,
      paymentMethod,
    } = req.body;

    // ✅ Basic validation
    if (!items || !Array.isArray(items) || items.length === 0)
      return res.status(400).json({ message: "Items are required" });
    if (!subtotal || !totalAmount || !address || !paymentMethod)
      return res.status(400).json({ message: "All fields are required" });

    const order = new Order({
      items,
      subtotal,
      serviceFee,
      deliveryFee,
      totalAmount,
      address,
      notes,
      paymentMethod,
      user: req.user.id,
    });

    const savedOrder = await order.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({ message: err.message });
  }
});

// Get all orders (admin) or customer orders
router.get("/", auth, async (req, res) => {
  try {
    let orders;
    if (req.user.isAdmin) {
      orders = await Order.find()
        .sort({ createdAt: -1 })
        .populate("user", "username phoneNumber email");
    } else {
      orders = await Order.find({ user: req.user.id }).sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
