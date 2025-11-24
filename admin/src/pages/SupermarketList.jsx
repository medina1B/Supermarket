import { useEffect, useState } from "react"; 
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const SupermarketList = () => {
  const [supermarkets, setSupermarkets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const location = { lat: 9.03, lng: 38.74 }; // fallback location

  const fetchSupermarkets = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/supermarkets?lat=${location.lat}&lng=${location.lng}`
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

  useEffect(() => {
    fetchSupermarkets();
  }, []);

  const handleEdit = (id) => {
    navigate(`/edit-supermarket/${id}`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supermarket?")) return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/supermarkets/${id}`);
      alert("Supermarket deleted!");
      fetchSupermarkets(); // Refresh the list
    } catch (err) {
      console.error(err);
      alert("Failed to delete supermarket");
    }
  };

  const filteredSupermarkets = supermarkets.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="p-4">Loading supermarkets...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;

  return (
    <div className="products-page p-4">
      <h1 className="page-title">🛒 Suk</h1>

      <input
        type="text"
        placeholder="Search supermarkets..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar mb-4 p-2 border rounded w-full"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSupermarkets.length > 0 ? (
          filteredSupermarkets.map((s) => (
            <div key={s._id} className="p-4 border rounded-lg shadow">
              <img
                src={s.image}
                alt={s.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-bold mt-2">{s.name}</h3>
              <p>{s.description}</p>
              <p>⭐ {s.rating || 4.0}</p>

              {/* Buttons: Products left, Edit/Delete right */}
              <div className="flex justify-between mt-2">
                <Link 
                  to={`/products/${s._id}`} 
                  className="p-2 bg-green-500 text-white rounded"
                  style={{ textDecoration: "none" }}
                >
                  Add Products
                </Link>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(s._id)}
                    className="p-2 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No supermarkets found.</p>
        )}
      </div>
    </div>
  );
};

export default SupermarketList;
