import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Checkout.css"; // Import the CSS file

const Checkout = () => {
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const buyNowItem = location.state?.buyNowItem;
  const items = buyNowItem ? [buyNowItem] : cartItems;

  const [promoCode, setPromoCode] = useState("");
  const [notes, setNotes] = useState("");
  const [address, setAddress] = useState("");

  const serviceFee = 11;
  const deliveryFee = 35;

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * (item.qty || 1),
    0
  );

  const totalAmount = subtotal + serviceFee + deliveryFee;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!address) {
      alert("Please enter your delivery address.");
      return;
    }

    navigate("/payment", {
      state: { items, subtotal, serviceFee, deliveryFee, totalAmount, address, notes, promoCode },
    });
  };

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-section products-section">
        <h2>Products</h2>
        {items.map((item) => (
          <div key={item._id} className="checkout-item">
            <img src={item.image} alt={item.name} />
            <div className="item-details">
              <p className="item-name">{item.name}</p>
              <p className="item-qty">{item.qty || 1} × {item.price} Br</p>
            </div>
            <div className="item-total">{item.price * (item.qty || 1)} Br</div>
          </div>
        ))}
        <div className="checkout-summary">
          <span>{items.length} Items</span>
          <span>{subtotal} Br</span>
        </div>
      </div>

      <div className="checkout-section">
        <label>Promo Code</label>
        <div className="promo-input">
          <input
            type="text"
            placeholder="Enter Promo Code"
            value={promoCode}
            onChange={(e) => setPromoCode(e.target.value)}
          />
          <button>Apply</button>
        </div>
      </div>

      <div className="checkout-section">
        <label>Delivery Address</label>
        <input
          type="text"
          placeholder="Enter your delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="checkout-section">
        <label>Additional Notes</label>
        <textarea
          placeholder="Add a note"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className="checkout-section breakdown">
        <div className="breakdown-row">
          <span>Subtotal</span>
          <span>{subtotal} Br</span>
        </div>
        <div className="breakdown-row">
          <span>Discount</span>
          <span>0.00 Br</span>
        </div>
        <div className="breakdown-row">
          <span>Service Fee</span>
          <span>{serviceFee} Br</span>
        </div>
        <div className="breakdown-row">
          <span>Delivery Fee</span>
          <span>{deliveryFee} Br</span>
        </div>
        <hr />
        <div className="breakdown-row total">
          <span>Total Amount</span>
          <span>{totalAmount} Br</span>
        </div>
      </div>

      <button className="btn-confirm" onClick={handleSubmit}>
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;
