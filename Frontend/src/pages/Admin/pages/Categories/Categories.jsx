import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Categories.css";

const Categories = ({ setActivePage, setEditId }) => {
  const [categories, setCategories] = useState([]);


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://travel-website-lm4n.onrender.com/api/categories");
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };  

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this category?")) return;

    try {
      await axios.delete(`https://travel-website-lm4n.onrender.com/api/categories/${id}`);
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="categories-page">
      <div className="categories-header">
        <h2>All Categories</h2>
        <button className="category-btn" onClick={() => setActivePage("createCategory")}>
          Add Category
        </button>
      </div>

      <div className="categories-table">
        {categories.length === 0 ? (
          <p className="empty-text">No categories added yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>
                    <img
                      src={cat.image}
                      alt={cat.name}
                      width="80"
                      style={{ borderRadius: "8px" }}
                    />
                  </td>
                  <td>{cat.name}</td>
                  <td>
                    <button
                      className="category-delete-btn"
                      onClick={() => handleDelete(cat._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Categories;