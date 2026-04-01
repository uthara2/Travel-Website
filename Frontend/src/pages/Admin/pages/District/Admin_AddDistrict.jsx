import { useState } from "react";
import axios from "axios";
import "../styles/CreateAddDestination.css";

const AdminAddDistrict = ({ setActivePage }) => {

  const [formData, setFormData] = useState({
    name: "",
    image: null
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      const file = files[0];

      setFormData((prev) => ({
        ...prev,
        image: file
      }));

      setPreview(URL.createObjectURL(file));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append("name", formData.name);
    data.append("image", formData.image);

    try {

      await axios.post("http://localhost:5000/api/districts", data, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });

      alert("District Added Successfully");

      setActivePage("district");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-page">

      <div className="create-card">

        <button
          className="back-btn"
          onClick={() => setActivePage("district")}
        >
          Back
        </button>

        <h2>Add District</h2>

        <form onSubmit={handleSubmit} className="create-form">

          <div>
            <label>District Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Upload Image</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              required
            />
          </div>

          {preview && (
            <div className="image-preview">
              <img src={preview} alt="preview" />
            </div>
          )}

          <button type="submit" className="create-btn">
            Add District
          </button>

        </form>

      </div>

    </div>
  );
};

export default AdminAddDistrict;