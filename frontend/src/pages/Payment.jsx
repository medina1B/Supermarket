import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    items = [],
    subtotal = 0,
    serviceFee = 0,
    deliveryFee = 0,
    totalAmount = 0,
    address = "",
    notes = "",
  } = location.state || {};

  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);

  // Use CRA environment variable for backend URL
  const API_URL = process.env.REACT_APP_API_URL;

  const handlePayment = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    setLoading(true);

    const order = {
      items,
      subtotal,
      serviceFee,
      deliveryFee,
      totalAmount,
      address,
      notes,
      paymentMethod,
    };

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to place an order.");
        navigate("/customer/login");
        return;
      }

      // ✅ Updated backend URL using CRA env variable
      const response = await fetch(`${API_URL}/api/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(order),
      });

      if (!response.ok) throw new Error("Failed to save order");

      alert(`✅ Payment method "${paymentMethod}" selected!\nOrder Confirmed!`);
      navigate("/orders");
    } catch (err) {
      console.error(err);
      alert("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <h1>Payment</h1>

      {/* Order Summary */}
      <div className="payment-section">
        <h2>Order Summary</h2>
        {items.length === 0 ? (
          <p>No items in your order.</p>
        ) : (
          items.map((item) => (
            <div key={item._id} className="order-item">
              <p>{item.name}</p>
              <p>{item.price * (item.qty || 1)} Br</p>
            </div>
          ))
        )}
        <hr style={{ margin: "10px 0" }} />
        <div className="order-item">
          <span>Subtotal</span>
          <span>{subtotal} Br</span>
        </div>
        <div className="order-item">
          <span>Service Fee</span>
          <span>{serviceFee} Br</span>
        </div>
        <div className="order-item">
          <span>Delivery Fee</span>
          <span>{deliveryFee} Br</span>
        </div>
        <div className="order-total">
          <span>Total</span>
          <span>{totalAmount} Br</span>
        </div>
      </div>

      {/* Delivery Address */}
      <div className="payment-section">
        <h2>Deliver To</h2>
        <p>{address || "No address provided"}</p>
      </div>

      {/* Notes */}
      {notes && (
        <div className="payment-section">
          <h2>Notes</h2>
          <p>{notes}</p>
        </div>
      )}

      {/* Payment Methods */}
      <div className="payment-section">
        <h2>Select Payment Method</h2>
        <div className="payment-methods">
          {["Credit Card", "Cash on Delivery"].map((method) => (
            <label key={method}>
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              {method}
            </label>
          ))}
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={loading || items.length === 0}
        className="pay-btn"
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
    </div>
  );
};

export default Payment;
