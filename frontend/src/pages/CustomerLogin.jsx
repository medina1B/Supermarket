import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "./CustomerAuthCard.css";

const CustomerLogin = ({ setUser }) => {
  const [form, setForm] = useState({ name: "", phoneNumber: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // CRA environment variable for backend URL
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const payload = {
        name: form.name.trim(),
        phoneNumber: form.phoneNumber.trim().replace(/\D/g, ""),
      };

      // ✅ Use CRA backend environment variable
      const res = await axios.post(`${API_URL}/api/customer/login`, payload);

      const { token, name } = res.data;

      localStorage.setItem("token", token);
      localStorage.setItem("name", name);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      if (setUser) setUser({ name, token });
      navigate("/orders");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="auth-card">
      <h2>Customer Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          type="tel"
          pattern="[\+0-9]{7,15}"
          value={form.phoneNumber}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/CustomerSignup">Signup</Link>
      </p>
    </div>
  );
};

export default CustomerLogin;
