import React from "react";
import { useNavigate } from "react-router-dom";

const AdminLogout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (!confirmLogout) return;

    // Remove token from local storage
    localStorage.removeItem("adminToken");

    // Update state
    if (setIsLoggedIn) setIsLoggedIn(false);

    // Redirect to login
    navigate("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
};

export default AdminLogout;
