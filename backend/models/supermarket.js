import mongoose from "mongoose";

const supermarketSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    image: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    rating: { type: Number, default: 4.0 },
    distance: { type: Number },
  },
  { timestamps: true }
);

const Supermarket = mongoose.model("Supermarket", supermarketSchema);
export default Supermarket;
