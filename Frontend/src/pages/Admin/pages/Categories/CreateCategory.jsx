import { useState } from "react";
import axios from "axios";
import "../styles/CreateCategory.css";

const CreateCategory = ({ setActivePage }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim() || !image) {
      alert("Name and image required");
      return;
    }

    const data = new FormData();
    data.append("name", name);
    data.append("image", image);

    try {
      await axios.post("https://travel-website-lm4n.onrender.com/api/categories", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setActivePage("category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <button className="back-btn" onClick={() => setActivePage("category")}>
          Back
        </button>
        <h2>Create Category</h2>

        <form className="create-form" onSubmit={handleSubmit}>
          <div>
            <label>Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label>Category Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="create-btn">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;