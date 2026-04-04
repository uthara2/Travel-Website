import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/AddDestination.css";

const AddDestination = ({ setActivePage, setEditId }) => {
  const [destinations, setDestinations] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH DESTINATIONS
  =============================== */
  const fetchDestinations = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/destinations");

      // safety: ensure array
      setDestinations(Array.isArray(res.data) ? res.data : []);

    } catch (error) {
      console.error("Error fetching destinations:", error);
      setDestinations([]);
    } finally {
      setLoading(false);
    }
  };

  /* ===============================
     FETCH CATEGORIES (optional use)
  =============================== */
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/categories");

      // handle both formats
      setCategories(res.data.categories || res.data || []);

    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchDestinations();
    fetchCategories();
  }, []);

  /* ===============================
     DELETE
  =============================== */
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/destinations/${id}`);
      fetchDestinations();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  /* ===============================
     LOADING
  =============================== */
  if (loading) {
    return <p style={{ textAlign: "center" }}>Loading destinations...</p>;
  }

  return (
    <div className="add-destination-page">

      {/* HEADER */}
      <div className="categories-header">
        <h2>All Tourist Destinations</h2>
        <button
          className="category-btn"
          onClick={() => setActivePage("create")}
        >
          Add Destination
        </button>
      </div>

      {/* EMPTY STATE */}
      {destinations.length === 0 ? (
        <p style={{ textAlign: "center" }}>
          No destinations found. Add one 🚀
        </p>
      ) : (

        /* TABLE */
        <div className="destination-table">
  <table>
    <thead>
      <tr>
        <th>Image</th>
        <th>Place</th>
        <th>Category</th>
        <th>District</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {destinations.map((item) => (
        <tr key={item._id}>
          <td>{item.image ? <img src={item.image} alt={item.place} /> : "No Image"}</td>
          <td>{item.place}</td>
          <td>{item.category?.name || "N/A"}</td>
          <td>{item.district || "N/A"}</td>
          <td>
            <button
              className="edit-btn"
              onClick={() => {
                setEditId(item._id);
                setActivePage("update");
              }}
            >
              Edit
            </button>
            <button
              className="delete-btn"
              onClick={() => handleDelete(item._id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
      )}
    </div>
  );
};

export default AddDestination;