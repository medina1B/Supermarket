import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "dsnfmx82z",
  api_key: process.env.CLOUDINARY_API_KEY || "991431935857361",
  api_secret:
    process.env.CLOUDINARY_API_SECRET || "4k0Snu4KNhdt5Au8kqFSIPSLECM",
});

export default cloudinary;
