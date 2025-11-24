// models/Order.js
import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // link to user
    items: [
      {
        _id: String,
        name: String,
        price: Number,
        qty: Number,
      },
    ],
    subtotal: Number,
    serviceFee: Number,
    deliveryFee: Number,
    totalAmount: Number,
    address: String,
    notes: String,
    paymentMethod: String,
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
