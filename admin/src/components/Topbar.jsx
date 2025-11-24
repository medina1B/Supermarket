// src/components/Topbar.jsx
import React from "react";
import AdminLogout from "./AdminLogout";

const Topbar = ({ setIsLoggedIn }) => {
  return (
    <div
      className="topbar"
      style={{
        height: "60px",
        background: "#52796f",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <h3>Admin Dashboard</h3>

      <div
        className="topbar"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          padding: "10px",
          background: "#eee",
        }}
      >
        <AdminLogout setIsLoggedIn={setIsLoggedIn} />
      </div>
    </div>
  );
};

export default Topbar;
