import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Topbar from "./components/Topbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Orders from "./pages/Orders";
import Users from "./pages/Users";

import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AddSupermarket from "./pages/AddSupermarket";
import SupermarketList from "./pages/SupermarketList";

import "./App.css";

const AdminLayout = ({ children, setIsLoggedIn }) => (
  <div className="admin-container" style={{ display: "flex" }}>
    <Sidebar />
    <div className="main-content" style={{ flex: 1 }}>
      <Topbar setIsLoggedIn={setIsLoggedIn} />
      <div className="page-content" style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  </div>
);

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsLoggedIn(true);
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public/admin login/signup */}
        <Route
          path="/admin/login"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <AdminLogin setIsLoggedIn={setIsLoggedIn} />
          }
        />
        <Route
          path="/admin/signup"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <AdminSignup />}
        />

        {/* Private/admin pages */}
        <Route
          path="/dashboard"
          element={
            isLoggedIn ? (
              <AdminLayout setIsLoggedIn={setIsLoggedIn}>
                <Dashboard />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/products"
          element={
            isLoggedIn ? (
              <AdminLayout setIsLoggedIn={setIsLoggedIn}>
                <Products />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/orders"
          element={
            isLoggedIn ? (
              <AdminLayout setIsLoggedIn={setIsLoggedIn}>
                <Orders />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />
        <Route
          path="/users"
          element={
            isLoggedIn ? (
              <AdminLayout setIsLoggedIn={setIsLoggedIn}>
                <Users />
              </AdminLayout>
            ) : (
              <Navigate to="/admin/login" />
            )
          }
        />

        {/* Supermarket routes (not protected) */}
        <Route path="/supermarkets" element={<SupermarketList />} />
        <Route path="/add-supermarket" element={<AddSupermarket />} />
        <Route path="/edit-supermarket/:id" element={<AddSupermarket />} />

        {/* Catch all */}
        <Route
          path="*"
          element={isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/admin/login" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
