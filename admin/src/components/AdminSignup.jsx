import React, { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AdminSignup = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous errors
    try {
      // Use environment variable for the API URL
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/signup`,
        {
          ...form,
          role: "admin", // backend role
        }
      );

      alert(res.data.message); // show backend message
      navigate("/admin/login"); // redirect to login page
    } catch (err) {
      console.error(err);
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Signup failed");
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-20 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Signup</h2>

      {error && <p className="text-red-500 mb-2 text-center">{error}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          Signup
        </button>
      </form>

      <p className="mt-4 text-center">
        Already have an account?{" "}
        <a href="/admin/login" className="text-blue-500 underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default AdminSignup;
