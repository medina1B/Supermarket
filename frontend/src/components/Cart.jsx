import React from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // import the CSS file

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  if (cartItems.length === 0)
    return <p className="empty-cart">Your cart is empty</p>;

  return (
    <div className="cart-container">
      <h2 className="cart-title">Your Cart</h2>

      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Remove</th>
            <th>Buy Now</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id}>
              <td className="product-info">
                {item.image && (
                  <img src={item.image} alt={item.name} className="product-img" />
                )}
                {item.name}
              </td>
              <td>${item.price}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.qty}
                  onChange={(e) => updateQuantity(item._id, Number(e.target.value))}
                  className="qty-input"
                />
              </td>
              <td>${item.price * item.qty}</td>
              <td>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="btn-remove"
                >
                  Remove
                </button>
              </td>
              <td>
                <button
                  onClick={() =>
                    navigate("/checkout", { state: { buyNowItem: item } })
                  }
                  className="btn-buy"
                >
                  Buy Now
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="total-price">Total: ${totalPrice}</div>

      <button onClick={() => navigate("/checkout")} className="btn-checkout">
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Cart;
