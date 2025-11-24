import React, { useState } from "react";
import axios from "axios";
import "./JoinUs.css";

// ✅ Resize image before uploading
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

        // Maintain aspect ratio
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

        // Convert to JPEG with quality 0.7
        const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.7);
        resolve(resizedDataUrl);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

const categories = [
  "ሱፐርማርኬት",
  "GurageSuk",
  "ዳቦ እና ኬክ",
  "መጠጦች",
  "ፋርማሲ ሱክ",
  "ኮስሜቲክስ ሱክ",
  "የቤት እቃዎች ሱክ",
  "Henasa mesaria",
  "ልጆች እቃዎች ሱክ",
  "Fernicer suk",
  "ባህላዊ እቃዎች ሱክ"
];

const JoinUs = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: [],
    employees: "",
    district: "",
    address: "",
    managerName: "",
    managerPhone: "",
    email: "",
    image: "",
    lat: "",
    lng: "",
    notes: "",
  });

  const [imageFile, setImageFile] = useState(null);

  // CRA environment variable for backend URL
  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      const newCategories = checked
        ? [...form.category, value]
        : form.category.filter((cat) => cat !== value);
      setForm({ ...form, category: newCategories });
    } else if (type === "file") {
      if (files && files[0]) {
        setImageFile(files[0]);
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageBase64 = form.image;
    if (imageFile) {
      try {
        imageBase64 = await resizeImage(imageFile, 500, 500);
      } catch (err) {
        return alert("Error processing image");
      }
    }

    try {
      // ✅ Use CRA backend environment variable
      const res = await axios.post(`${API_URL}/api/applications`, {
        ...form,
        image: imageBase64,
      });

      alert(res.data.message);

      setForm({
        name: "",
        description: "",
        category: [],
        employees: "",
        district: "",
        address: "",
        managerName: "",
        managerPhone: "",
        email: "",
        image: "",
        lat: "",
        lng: "",
        notes: "",
      });
      setImageFile(null);
    } catch (err) {
      alert(err.response?.data?.message || "Error submitting application");
    }
  };

  return (
    <div className="join-us-container">
      <h2>የሱክ ምዝገባ ቅጽ</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="የሱክ ስም *"
          value={form.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="ስለ ሱክ መግለጫ"
          value={form.description}
          onChange={handleChange}
        />
        <div className="categories">
          <label>ምድብ *</label>
          {categories.map((cat) => (
            <label key={cat}>
              <input
                type="checkbox"
                name="category"
                value={cat}
                checked={form.category.includes(cat)}
                onChange={handleChange}
              />
              {cat}
            </label>
          ))}
        </div>
        <input
          name="employees"
          type="number"
          placeholder="የሰራተኞች ቁጥር"
          value={form.employees}
          onChange={handleChange}
        />
        <input
          name="district"
          placeholder="ክፍለ ከተማ"
          value={form.district}
          onChange={handleChange}
        />
        <input
          name="address"
          placeholder="ትክክለኛ ቦታ"
          value={form.address}
          onChange={handleChange}
        />
        <input
          name="managerName"
          placeholder="የስራ አስኪያጅ ስም *"
          value={form.managerName}
          onChange={handleChange}
          required
        />
        <input
          name="managerPhone"
          placeholder="የስራ አስኪያጅ ስልክ *"
          value={form.managerPhone}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="ኢሜይል"
          value={form.email}
          onChange={handleChange}
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          required
        />
        {imageFile && (
          <img
            src={URL.createObjectURL(imageFile)}
            alt="Preview"
            className="image-preview"
            style={{ width: "80px", height: "80px", objectFit: "cover", margin: "8px 0" }}
          />
        )}

        <input
          name="lat"
          type="number"
          placeholder="Latitude *"
          value={form.lat}
          onChange={handleChange}
          required
        />
        <input
          name="lng"
          type="number"
          placeholder="Longitude *"
          value={form.lng}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="አስተያየት እና ቅድመ ሁኔታዎች"
          value={form.notes}
          onChange={handleChange}
        />
        <button type="submit">Submit Application</button>
      </form>
    </div>
  );
};

export default JoinUs;
