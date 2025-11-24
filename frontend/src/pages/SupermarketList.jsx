import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./SupermarketList.css";

const SupermarketList = () => {
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const location = { lat: 9.03, lng: 38.74 };

  // ✅ CRA environment variable
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchSupermarkets = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/supermarkets?lat=${location.lat}&lng=${location.lng}`
        );

        if (Array.isArray(res.data)) setSupermarkets(res.data);
        else {
          setError("Invalid data format from server");
          setSupermarkets([]);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load supermarkets");
        setSupermarkets([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSupermarkets();
  }, [API_URL, location.lat, location.lng]);

  const handleStoreClick = (store) => {
    navigate(`/products/${store._id}`);
  };

  const filteredSupermarkets = supermarkets.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="no-supermarkets">Loading supermarkets...</p>;
  if (error) return <p className="no-supermarkets">{error}</p>;

  return (
    <div className="supermarket-container">
      <h1 className="supermarket-title">🛒 Suk</h1>

      <input
        type="text"
        placeholder="Search supermarkets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="supermarket-search"
      />

      {filteredSupermarkets.length === 0 && (
        <p className="no-supermarkets">No supermarkets found.</p>
      )}

      <div className="supermarket-grid">
        {filteredSupermarkets.map((s) => (
          <div
            key={s._id}
            className="supermarket-card"
            onClick={() => handleStoreClick(s)}
          >
            <img src={s.image} alt={s.name} />
            <h3>{s.name}</h3>
            <p>{s.description}</p>
            <p className="rating">⭐ {s.rating || 4.0}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SupermarketList;
