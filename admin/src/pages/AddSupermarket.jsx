import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import SupermarketList from "./SupermarketList";
import "./AddSupermarket.css";

const AddSupermarket = () => {
  const { id } = useParams(); // If editing, id will be available

  const [form, setForm] = useState({
    name: "",
    description: "",
    image: "",
    lat: "",
    lng: "",
  });

  // Resize image before saving
  const resizeImage = (file, maxWidth = 500, maxHeight = 500) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;

          if (width > height) {
            if (width > maxWidth) {
              height *= maxWidth / width;
              width = maxWidth;
            }
          } else {
            if (height > maxHeight) {
              width *= maxHeight / height;
              height = maxHeight;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.7));
        };
        img.onerror = reject;
      };
      reader.onerror = reject;
    });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const resized = await resizeImage(file);
    setForm({ ...form, image: resized });
  };

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  // Load data if editing
  useEffect(() => {
    if (!id) return;
    axios
      .get(`http://localhost:8800/api/supermarkets/${id}`)
      .then((res) => setForm(res.data))
      .catch(() => alert("Failed to load supermarket data"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:8800/api/supermarkets/${id}`, form);
        alert("Supermarket updated!");
      } else {
        await axios.post("http://localhost:8800/api/supermarkets", form);
        alert("Supermarket added!");
      }
      setForm({ name: "", description: "", image: "", lat: "", lng: "" });
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="add-supermarket-container">
      <h2>{id ? "Edit Supermarket" : "Add Supermarket"}</h2>
      <form onSubmit={handleSubmit} className="supermarket-form">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {form.image && (
          <img src={form.image} alt="Preview" className="image-preview" />
        )}
        <input
          name="lat"
          type="number"
          value={form.lat}
          onChange={handleChange}
          placeholder="Latitude"
          required
        />
        <input
          name="lng"
          type="number"
          value={form.lng}
          onChange={handleChange}
          placeholder="Longitude"
          required
        />
        <button type="submit">
          {id ? "Update Supermarket" : "Add Supermarket"}
        </button>
      </form>

      <h2 className="mt-6">Existing Supermarkets</h2>
      <SupermarketList />
    </div>
  );
};

export default AddSupermarket;
