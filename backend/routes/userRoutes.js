// routes/userRoutes.js
import express from "express";
import {
  registerUser,
  loginUser,
  getUsers,
} from "../controllers/userController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

// public
router.post("/register", registerUser);
router.post("/login", loginUser);

// only admin can see all users
router.get("/", verifyAdmin, getUsers);

export default router;
