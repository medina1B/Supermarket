import React, { useEffect, useState } from "react";
import axios from "axios";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          alert("You must be logged in to view orders.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:8800/api/orders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setOrders(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Orders fetch error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p className="p-4">Loading orders...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!orders.length) return <p className="p-4">No orders yet.</p>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-center">All Orders</h1>

      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-4 py-2">Order ID</th>
            <th className="border px-4 py-2">Customer</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Total (Br)</th>
            <th className="border px-4 py-2">Payment</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id} className="border-b hover:bg-gray-50">
              <td className="border px-4 py-2">{order._id}</td>
              <td className="border px-4 py-2">{order.user?.username || "Unknown"}</td>
              <td className="border px-4 py-2">{order.user?.email || "N/A"}</td>
              <td className="border px-4 py-2">{order.user?.phoneNumber || "N/A"}</td>
              <td className="border px-4 py-2">{order.totalAmount}</td>
              <td className="border px-4 py-2">{order.paymentMethod}</td>
              <td className="border px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
              <td className="border px-4 py-2">
                {order.items?.length > 0 ? (
                  order.items.map((item, idx) => (
                    <div key={item._id || idx} className="flex justify-between border-b py-1 text-sm">
                      <span>{item.name} x {item.qty || 1}</span>
                      <span>{item.price * (item.qty || 1)} Br</span>
                    </div>
                  ))
                ) : (
                  <span className="text-gray-400">No items</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Order;
