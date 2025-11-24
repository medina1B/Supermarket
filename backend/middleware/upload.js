import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dsnfmx82z",
  api_key: process.env.CLOUDINARY_API_KEY || "991431935857361",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "4k0Snu4KNhdt5Au8kqFSIPSLECM",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "supermarket_products", // folder name in your Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const upload = multer({ storage });

export default upload;
