import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateAddDestination.css";

const CreateAddDestination = ({ setActivePage }) => {
  const [categories, setCategories] = useState([]);
  const districts = [
    "Thiruvananthapuram",
    "Kollam",
    "Pathanamthitta",
    "Alappuzha",
    "Kottayam",
    "Idukki",
    "Ernakulam",
    "Thrissur",
    "Palakkad",
    "Malappuram",
    "Kozhikode",
    "Wayanad",
    "Kannur",
    "Kasaragod"
  ];

  const [formData, setFormData] = useState({
    title: "",
    place: "",
    category: "",
    district: "",
    location: "",
    country: "",
    price: "",
    description: "",
    nights: "",
    stay: "",
    transport: "",
    image: null,
  });

  const [itinerary, setItinerary] = useState([{ day: "", details: "" }]);
  const [included, setIncluded] = useState([""]);
  const [notIncluded, setNotIncluded] = useState([""]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
  try {
    const res = await axios.get("https://travel-website-lm4n.onrender.com/api/categories");

    // categories are inside data
    setCategories(res.data.data);

  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

  /* HANDLE INPUT CHANGE */

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0],
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* DERIVED DURATION */

  const nights = Number(formData.nights);
  const days = nights > 0 ? nights + 1 : "";
  const duration = nights > 0 ? `${nights} Nights / ${days} Days` : "";

  /* ITINERARY */

  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const addItinerary = () => {
    setItinerary([...itinerary, { day: "", details: "" }]);
  };

  /* INCLUDED / NOT INCLUDED */

  const handleArrayChange = (index, value, type) => {
    const updated = type === "included" ? [...included] : [...notIncluded];

    updated[index] = value;

    type === "included" ? setIncluded(updated) : setNotIncluded(updated);
  };

  const addField = (type) => {
    type === "included"
      ? setIncluded([...included, ""])
      : setNotIncluded([...notIncluded, ""]);
  };

  /* SUBMIT */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("duration", duration);
    data.append("itinerary", JSON.stringify(itinerary));
    data.append("included", JSON.stringify(included));
    data.append("notIncluded", JSON.stringify(notIncluded));

    try {
      await axios.post("https://travel-website-lm4n.onrender.com/api/destinations", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Destination Created Successfully 🚀");
      setActivePage("tourist");
    } catch (error) {
      console.error("Error creating destination:", error);
    }
  };

  return (
    <div className="create-page">
      <div className="create-card">
        <button className="back-btn" onClick={() => setActivePage("tourist")}>
          Back
        </button>

        <h2>Create Travel Package</h2>

        <form className="create-form" onSubmit={handleSubmit}>
          
          <div>
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Place</label>
            <input
              type="text"
              name="place"
              value={formData.place}
              onChange={handleChange}
              required
            />
          </div>


          <div>
            <label>District</label>
            <select 
              name="district" 
              value={formData.district} 
              onChange={handleChange} 
              required
            >
              <option value="">Select District</option>

              {districts.map((dist, index) => (
                <option key={index} value={dist}> {dist} </option>
              ))}
            </select>
          </div>

          

          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Duration</label>
            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <input
                type="number"
                name="nights"
                min="1"
                value={formData.nights}
                onChange={handleChange}
                style={{ width: "70px" }}
                required
              />
              <span>Nights</span>

              {days && <span>{days} Days</span>}

              {duration && (
                <div
                  style={{
                    padding: "6px 12px",
                    background: "#f3f3f3",
                    borderRadius: "6px",
                    fontWeight: "500",
                  }}
                >
                  {duration}
                </div>
              )}
            </div>
          </div>

          <div>
            <label>Stay</label>
            <input
              type="text"
              name="stay"
              placeholder="Stay (4 Star Hotel)"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Transport</label>
            <input
              type="text"
              name="transport"
              placeholder="Transport (Private Cab)"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Description</label>
            <textarea name="description" onChange={handleChange} />
          </div>

          <div>
            <label>Category</label>
            <select name="category" onChange={handleChange} required>
              <option value="">Select Category</option>

              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
            </select>
          </div>

          <div>
            <label>Upload Image</label>
            <input type="file" name="image" onChange={handleChange} required />
          </div>

          <div>
            <label>Itinerary</label>

            {itinerary.map((item, index) => (
              <div key={index} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
                <input
                  type="text"
                  placeholder="Day (Ex: Day 1)"
                  onChange={(e) =>
                    handleItineraryChange(index, "day", e.target.value)
                  }
                />

                <input
                  type="text"
                  placeholder="Details"
                  onChange={(e) =>
                    handleItineraryChange(index, "details", e.target.value)
                  }
                />
              </div>
            ))}

            <button type="button" className="other-btn" onClick={addItinerary}>
              Add Day
            </button>
          </div>

          <div>
            <label>Included</label>

            {included.map((item, index) => (
              <input
                key={index}
                type="text"
                style={{ marginBottom: "8px" }}
                placeholder="Included item"
                onChange={(e) =>
                  handleArrayChange(index, e.target.value, "included")
                }
              />
            ))}

            <button
              type="button"
              className="other-btn"
              onClick={() => addField("included")}
            >
              Add Included
            </button>
          </div>

          <div>
            <label>Not Included</label>

            {notIncluded.map((item, index) => (
              <input
                key={index}
                type="text"
                style={{ marginBottom: "8px" }}
                placeholder="Not Included item"
                onChange={(e) =>
                  handleArrayChange(index, e.target.value, "notIncluded")
                }
              />
            ))}

            <button
              type="button"
              className="other-btn"
              onClick={() => addField("notIncluded")}
            >
              Add Not Included
            </button>
          </div>

          <button type="submit" className="create-btn">
            Create Destination
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAddDestination;