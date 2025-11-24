// backend/controllers/supermarketController.js
import Supermarket from "../models/supermarket.js";

// ✅ Add a new supermarket
export const addSupermarket = async (req, res) => {
  try {
    const { name, description, image, lat, lng } = req.body;

    if (!name || !image || !lat || !lng) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newSupermarket = new Supermarket({
      name,
      description,
      image,
      lat,
      lng,
    });

    await newSupermarket.save();
    res.status(201).json({
      message: "Supermarket added successfully!",
      newSupermarket,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// ✅ Get all supermarkets
export const getSupermarkets = async (req, res) => {
  try {
    const supermarkets = await Supermarket.find();
    res.status(200).json(supermarkets);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch supermarkets",
      error: error.message,
    });
  }
};

// ✅ Get one supermarket by ID
export const getSupermarketById = async (req, res) => {
  try {
    const supermarket = await Supermarket.findById(req.params.id);

    if (!supermarket) {
      return res.status(404).json({ message: "Supermarket not found" });
    }

    res.status(200).json(supermarket);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch supermarket",
      error: error.message,
    });
  }
};

// ✅ Update supermarket
export const updateSupermarket = async (req, res) => {
  try {
    const updated = await Supermarket.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Supermarket not found" });
    }

    res.status(200).json({
      message: "Supermarket updated successfully!",
      supermarket: updated,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update supermarket",
      error: error.message,
    });
  }
};

// ✅ Delete supermarket
export const deleteSupermarket = async (req, res) => {
  try {
    const deleted = await Supermarket.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Supermarket not found" });
    }

    res.status(200).json({ message: "Supermarket deleted successfully!" });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete supermarket",
      error: error.message,
    });
  }
};
