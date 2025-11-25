import application from "../models/application.js";
import cloudinary from "../utils/cloudinary.js";

// Add a new application
export const addApplication = async (req, res) => {
  try {
    const {
      name,
      description,
      category,
      employees,
      district,
      address,
      managerName,
      managerPhone,
      email,
      lat,
      lng,
      notes,
      image, // base64 string from frontend
    } = req.body;

    if (!image) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    let imageUrl = "";
    try {
      const uploaded = await cloudinary.uploader.upload(image, {
        folder: "supermarket_applications",
      });
      imageUrl = uploaded.secure_url;
    } catch (err) {
      console.error("Cloudinary upload error:", err);
      return res
        .status(500)
        .json({ message: "Image upload failed", error: err.message });
    }

    const newApplication = new application({
      name,
      description,
      category,
      employees,
      district,
      address,
      managerName,
      managerPhone,
      email,
      image: imageUrl,
      lat,
      lng,
      notes,
    });

    await newApplication.save();
    res
      .status(201)
      .json({ message: "Application submitted successfully!", newApplication });
  } catch (err) {
    console.error("Add application error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Get all applications
export const getApplications = async (req, res) => {
  try {
    const applications = await Application.find();
    res.status(200).json(applications);
  } catch (err) {
    console.error("Get applications error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
