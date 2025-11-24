import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      className="sidebar"
      style={{
        width: "220px",
        background: "#2f3e46",
        color: "#fff",
        height: "100vh",
        padding: "20px",
      }}
    >
      <h2>Admin Panel</h2>
      <nav>
        <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
          <li>
            <Link to="/dashboard" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
          </li>
           <li>
            <Link to="/products" style={{ color: "#fff", textDecoration: "none" }}>
            Products
            </Link>
          </li>
          
          <li>
            <Link to="/orders" style={{ color: "#fff", textDecoration: "none" }}>
              Orders
            </Link>
          </li>
          <li>
            <Link to="/users" style={{ color: "#fff", textDecoration: "none" }}>
              Users
            </Link>
          </li>
          <li>
            <Link to="/add-supermarket" style={{ color: "#fff", textDecoration: "none" }}>
              Add suk
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
