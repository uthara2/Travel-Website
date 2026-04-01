import { useEffect, useState } from "react";
import axios from "axios";
import "./styles/UpdateCategory.css";

const UpdateCategory = ({ editId, setActivePage }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  useEffect(() => {
    fetchCategory();
  }, []);

  const fetchCategory = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/categories/${editId}`
      );

      setName(res.data.name);
      setExistingImage(res.data.image);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("name", name);

    if (image) {
      data.append("image", image);
    }

    try {
      await axios.put(
        `http://localhost:5000/api/categories/${editId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setActivePage("category");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="update-page">
      <div className="update-card">
        <h2>Update Category</h2>

        <form className="update-form" onSubmit={handleSubmit}>
          <div>
            <label>Category Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {existingImage && (
            <div>
              <p>Current Image</p>
              <img
                src={existingImage}
                alt="category"
                width="120"
                style={{ borderRadius: "8px" }}
              />
            </div>
          )}

          <div>
            <label>Change Image</label>
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button type="submit" className="update-btn">
            Update Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;