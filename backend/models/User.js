// models/User.js
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    // Customer fields
    phoneNumber: { type: String, unique: true, sparse: true },
    // Admin fields
    email: { type: String, unique: true, sparse: true },
    password: { type: String }, // only for admins
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
