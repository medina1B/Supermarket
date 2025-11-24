import React, { useEffect, useState } from "react";
import "./OrdersCard.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // CRA environment variable for backend URL
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          alert("You must be logged in to view your orders.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_URL}/api/orders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load orders");
        }

        setOrders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Orders fetch error:", err);
        alert(err.message);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [API_URL]);

  if (loading) return <p className="no-orders">Loading orders...</p>;
  if (!orders.length) return <p className="no-orders">No orders yet.</p>;

  return (
    <div className="orders-container">
      <h1 className="orders-title">My Orders</h1>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleString()}</p>
          <p><strong>Payment:</strong> {order.paymentMethod}</p>
          <p><strong>Address:</strong> {order.address}</p>
          <p><strong>Total:</strong> {order.totalAmount} Br</p>

          <div className="order-items">
            <strong>Items:</strong>
            {order.items?.map((item) => (
              <div key={item._id} className="order-item">
                <span>{item.name} x {item.qty || 1}</span>
                <span>{item.price * (item.qty || 1)} Br</span>
              </div>
            )) || null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Orders;
