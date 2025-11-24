import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

const Products = () => {
  const [supermarkets, setSupermarkets] = useState([]);
  const [selectedSupermarket, setSelectedSupermarket] = useState("");
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const token = localStorage.getItem("adminToken");
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } };

  // Fetch supermarkets
  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/supermarkets`, axiosConfig);
        setSupermarkets(res.data);
        if (res.data.length) setSelectedSupermarket(res.data[0]._id);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || "Failed to fetch supermarkets");
      }
    };
    fetchSupermarkets();
  }, []);

  // Fetch products for selected supermarket
  useEffect(() => {
    if (!selectedSupermarket) return;
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/products?supermarketId=${selectedSupermarket}`,
          axiosConfig
        );
        setProducts(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedSupermarket]);

  const showSuccess = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Add or Edit product
  const handleAddOrEdit = async (productData) => {
    try {
      productData.supermarketId = selectedSupermarket;

      let res;
      if (editingProduct) {
        // Update product
        res = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/products/${editingProduct._id}`,
          productData,
          axiosConfig
        );
        setProducts(products.map(p => p._id === res.data._id ? res.data : p));
        setEditingProduct(null);
        showSuccess("Product updated successfully!");
      } else {
        // Add new product
        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/products`,
          productData,
          axiosConfig
        );
        setProducts([...products, res.data]);
        showSuccess("Product added successfully!");
      }
    } catch (err) {
      console.error("Error saving product:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Failed to save product.");
    }
  };

  const handleEditClick = (product) => setEditingProduct(product);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, axiosConfig);
      setProducts(products.filter(p => p._id !== id));
      showSuccess("Product deleted successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Failed to delete product.");
    }
  };

  if (loading) return <p className="p-4">Loading products...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Products</h1>

      {/* Supermarket selector */}
      <div className="mb-4">
        <label className="mr-2 font-medium">Select Supermarket:</label>
        <select
          value={selectedSupermarket}
          onChange={e => setSelectedSupermarket(e.target.value)}
          className="border p-2 rounded"
        >
          {supermarkets.map(s => (
            <option key={s._id} value={s._id}>{s.name}</option>
          ))}
        </select>
      </div>

      {/* Success message */}
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">{successMessage}</div>
      )}

      <ProductForm
        onAddOrEdit={handleAddOrEdit}
        editingProduct={editingProduct}
        setEditingProduct={setEditingProduct}
      />

      <ProductList
        products={products}
        onEdit={handleEditClick}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Products;
