import Product from "../models/Product.js";
import cloudinary from "../utils/cloudinary.js";

// Get products filtered by supermarket
export const getProducts = async (req, res) => {
  try {
    const { supermarketId } = req.query;

    let filter = { isActive: true };

    // If a supermarketId is provided, filter by it
    if (supermarketId) {
      filter.supermarketId = supermarketId;
    }

    const products = await Product.find(filter)
      .populate("supermarketId", "name")
      .populate("addedByAdmin", "username email");

    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Add product
export const addProduct = async (req, res) => {
  try {
    const { name, price, category, stock, description, image, supermarketId } =
      req.body;
    const addedByAdmin = req.user?.id;

    if (!name || !price || !supermarketId || !addedByAdmin)
      return res.status(400).json({ error: "Missing required fields" });

    let imageUrl = "";
    if (image) {
      const uploaded = await cloudinary.uploader.upload(image, {
        folder: "supermarket_products",
      });
      imageUrl = uploaded.secure_url;
    }

    const newProduct = new Product({
      name,
      price,
      category,
      stock,
      description,
      image: imageUrl,
      supermarketId,
      addedByAdmin,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Update product
export const updateProduct = async (req, res) => {
  try {
    const { name, price, category, stock, description, image } = req.body;

    if (!name || !price)
      return res.status(400).json({ error: "Name and price required" });

    const updateData = { name, price, category, stock, description };
    if (image) {
      const uploaded = await cloudinary.uploader.upload(image, {
        folder: "supermarket_products",
      });
      updateData.image = uploaded.secure_url;
    }

    const updated = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );
    if (!updated) return res.status(404).json({ error: "Product not found" });
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};

// Delete product (soft delete)
export const deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );
    if (!deleted) return res.status(404).json({ error: "Product not found" });
    res.status(200).json({ message: "Deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error: " + err.message });
  }
};
