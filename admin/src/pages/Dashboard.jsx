import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [counts, setCounts] = useState({
    users: 0,
    orders: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const token = localStorage.getItem("adminToken");
        if (!token) {
          alert("You must be logged in to view the dashboard.");
          setLoading(false);
          return;
        }

        const [usersRes, ordersRes, productsRes] = await Promise.all([
          axios.get("http://localhost:8800/api/users", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8800/api/orders", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8800/api/products", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setCounts({
          users: Array.isArray(usersRes.data) ? usersRes.data.length : 0,
          orders: Array.isArray(ordersRes.data) ? ordersRes.data.length : 0,
          products: Array.isArray(productsRes.data) ? productsRes.data.length : 0,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, []);

  if (loading) return <p className="p-4">Loading dashboard...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  const handleNavigate = (path) => navigate(path);

  const cardStyle = (bgColor, color = "#000") => ({
    flex: 1,
    background: bgColor,
    color,
    padding: "20px",
    borderRadius: "8px",
    cursor: "pointer",
    textAlign: "center",
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle("#cad2c5")} onClick={() => handleNavigate("/users")}>
          <h3 className="text-xl font-semibold">Total Users</h3>
          <p className="text-2xl">{counts.users}</p>
        </div>

        <div style={cardStyle("#84a98c")} onClick={() => handleNavigate("/orders")}>
          <h3 className="text-xl font-semibold">Total Orders</h3>
          <p className="text-2xl">{counts.orders}</p>
        </div>

        <div style={cardStyle("#52796f", "#fff")} onClick={() => handleNavigate("/products")}>
          <h3 className="text-xl font-semibold">Total Products</h3>
          <p className="text-2xl">{counts.products}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
