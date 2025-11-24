import express from "express";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { verifyAdmin } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/", getProducts); // public, filter by supermarketId

router.post("/", verifyAdmin, addProduct);
router.put("/:id", verifyAdmin, updateProduct);
router.delete("/:id", verifyAdmin, deleteProduct);

export default router;
