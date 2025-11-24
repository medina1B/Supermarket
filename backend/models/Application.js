import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    category: [{ type: String }],
    employees: { type: Number },
    district: { type: String },
    address: { type: String },
    managerName: { type: String },
    managerPhone: { type: String },
    email: { type: String },
    image: { type: String, default: "" },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
    notes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Application", applicationSchema);
