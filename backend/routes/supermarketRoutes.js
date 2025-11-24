// backend/routes/supermarketRoutes.js
import express from "express";
import {
  addSupermarket,
  getSupermarkets,
  getSupermarketById,
  updateSupermarket,
  deleteSupermarket,
} from "../controllers/supermarketController.js";

const router = express.Router();

// ✅ Add supermarket
router.post("/", addSupermarket);

// ✅ Get all supermarkets
router.get("/", getSupermarkets);

// ✅ Get one supermarket by ID
router.get("/:id", getSupermarketById);

// ✅ Update supermarket
router.put("/:id", updateSupermarket);

// ✅ Delete supermarket
router.delete("/:id", deleteSupermarket);

export default router;
