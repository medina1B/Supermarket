import React, { useState, useEffect } from "react";

// Resize image before uploading
const resizeImage = (file, maxWidth = 500, maxHeight = 500) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        let width = img.width;
        let height = img.height;

        if (width > height && width > maxWidth) {
          height *= maxWidth / width;
          width = maxWidth;
        } else if (height > maxHeight) {
          width *= maxHeight / height;
          height = maxHeight;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(resizedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

const ProductForm = ({ onAddOrEdit, editingProduct, setEditingProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    stock: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  // Pre-fill form when editing
  useEffect(() => {
    if (editingProduct) {
      setFormData({
        name: editingProduct.name || "",
        price: editingProduct.price || "",
        category: editingProduct.category || "",
        stock: editingProduct.stock || "",
        description: editingProduct.description || "",
        image: editingProduct.image || "",
      });
    }
  }, [editingProduct]);

  const handleChange = e => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  const handleImageChange = e => setImageFile(e.target.files[0]);

  const handleSubmit = async e => {
    e.preventDefault();

    let imageBase64 = formData.image;
    if (imageFile) {
      imageBase64 = await resizeImage(imageFile);
    }

    onAddOrEdit({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      image: imageBase64,
    });

    // Reset form
    setFormData({ name: "", price: "", category: "", stock: "", description: "", image: "" });
    setImageFile(null);
    setEditingProduct(null);
  };

  const handleCancel = () => {
    setEditingProduct(null);
    setFormData({ name: "", price: "", category: "", stock: "", description: "", image: "" });
    setImageFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 border p-4 rounded max-w-md bg-white shadow-md">
      <h2 className="text-lg font-bold mb-3">{editingProduct ? "Edit Product" : "Add New Product"}</h2>

      <input type="text" name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} className="border p-2 mb-2 w-full rounded" required />
      <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className="border p-2 mb-2 w-full rounded" required />
      <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className="border p-2 mb-2 w-full rounded" />
      <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} className="border p-2 mb-2 w-full rounded" />
      <textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} className="border p-2 mb-2 w-full rounded" />

      <input type="file" name="image" accept="image/*" onChange={handleImageChange} className="border p-2 mb-3 w-full rounded" />
      {imageFile && <img src={URL.createObjectURL(imageFile)} alt="Preview" style={{ width: "80px", height: "80px", objectFit: "cover", borderRadius: "6px", marginBottom: "12px" }} />}

      <div className="flex gap-2">
        <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">{editingProduct ? "Update Product" : "Add Product"}</button>
        {editingProduct && <button type="button" onClick={handleCancel} className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600">Cancel</button>}
      </div>
    </form>
  );
};

export default ProductForm;
