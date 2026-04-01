import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/CreateAddDestination.css";

const UpdateAddDestination = ({ editId, setActivePage }) => {
  const [categories, setCategories] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    place: "",
    category: "",
    location: "",
    district: "",
    country: "",
    price: "",
    description: "",
    nights: "",
    stay: "",
    transport: "",
    image: null,
  });

  const [existingImage, setExistingImage] = useState("");
  const [itinerary, setItinerary] = useState([{ day: "", details: "" }]);
  const [included, setIncluded] = useState([""]);
  const [notIncluded, setNotIncluded] = useState([""]);

  /* ===============================
     FETCH DATA
  =============================== */
  useEffect(() => {
    fetchCategories();
    fetchDistricts();
  }, []);

  useEffect(() => {
    if (editId) fetchDestination();
  }, [editId]);

  const fetchCategories = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/categories");

    const cats = res.data.data || []; // <-- correct key

    const formattedCats = cats.map((c) => ({
      ...c,
      _id: c._id?.toString() ?? "",
    }));

    console.log("Formatted categories:", formattedCats);
    setCategories(formattedCats);
  } catch (error) {
    console.error("Error fetching categories:", error);
    setCategories([]);
  }
};

  const fetchDistricts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/districts");
      const dists = res.data || [];
      const formattedDists = dists.map((d) => ({
        ...d,
        _id: d._id?.toString() ?? "",
      }));
      setDistricts(formattedDists);
    } catch (error) {
      console.error("Error fetching districts:", error);
      setDistricts([]);
    }
  };

  const fetchDestination = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/destinations/${editId}`);
      const data = res.data;

      const nightsMatch = data.duration?.match(/\d+/);
      const nights = nightsMatch ? Number(nightsMatch[0]) : "";

      setFormData({
        title: data.title || "",
        place: data.place || "",
        category: (() => {
          if (!data.category) return "";
          if (typeof data.category === "object") return data.category?._id?.toString() ?? "";
          return data.category?.toString() ?? "";
        })(),
        district: data.district?._id?.toString() ?? "",
        location: data.location || "",
        country: data.country || "",
        price: data.price || "",
        description: data.description || "",
        nights: nights,
        stay: data.stay || "",
        transport: data.transport || "",
        image: null,
      });

      setExistingImage(data.image || "");
      setItinerary(data.itinerary?.length ? data.itinerary : [{ day: "", details: "" }]);
      setIncluded(data.included?.length ? data.included : [""]);
      setNotIncluded(data.notIncluded?.length ? data.notIncluded : [""]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  /* ===============================
     INPUT HANDLING
  =============================== */
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
      return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* ===============================
     DURATION
  =============================== */
  const nights = Number(formData.nights);
  const days = nights > 0 ? nights + 1 : "";
  const duration = nights > 0 ? `${nights} Nights / ${days} Days` : "";

  /* ===============================
     ITINERARY HANDLING
  =============================== */
  const handleItineraryChange = (index, field, value) => {
    const updated = [...itinerary];
    updated[index][field] = value;
    setItinerary(updated);
  };

  const addItinerary = () => setItinerary([...itinerary, { day: "", details: "" }]);

  /* ===============================
     INCLUDED / NOT INCLUDED
  =============================== */
  const handleArrayChange = (index, value, type) => {
    const updated = type === "included" ? [...included] : [...notIncluded];
    updated[index] = value;
    type === "included" ? setIncluded(updated) : setNotIncluded(updated);
  };

  const addField = (type) => {
    type === "included" ? setIncluded([...included, ""]) : setNotIncluded([...notIncluded, ""]);
  };

  /* ===============================
     UPDATE HANDLER
  =============================== */
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key !== "image") data.append(key, formData[key]);
      });

      if (formData.image) data.append("image", formData.image);

      data.append("duration", duration);
      data.append("itinerary", JSON.stringify(itinerary));
      data.append("included", JSON.stringify(included));
      data.append("notIncluded", JSON.stringify(notIncluded));

      await axios.put(
        `http://localhost:5000/api/destinations/${editId}`,
        data,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      alert("Destination Updated Successfully 🚀");
      setActivePage("tourist");
    } catch (error) {
      console.error("Update failed:", error);
      alert("Update failed ❌");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="create-page">
      <div className="create-card">
        <button className="back-btn" onClick={() => setActivePage("tourist")}>
          Back
        </button>
        <h2>Update Travel Package</h2>

        <form className="create-form" onSubmit={handleUpdate}>
          <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" />
          <input type="text" name="place" value={formData.place} onChange={handleChange} placeholder="Place" required />
          <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <select name="district" value={formData.district} onChange={handleChange} required>
            <option value="">Select District</option>
            {districts.map((dist) => (
              <option key={dist._id} value={dist._id}>{dist.name}</option>
            ))}
          </select>
          <input type="text" name="country" value={formData.country} onChange={handleChange} placeholder="Country" required />
          <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />

          {/* Duration */}
          <div>
            <input type="number" name="nights" value={formData.nights} onChange={handleChange} min="1" />
            {duration && <p>{duration}</p>}
          </div>

          <input type="text" name="stay" value={formData.stay} onChange={handleChange} placeholder="Stay" />
          <input type="text" name="transport" value={formData.transport} onChange={handleChange} placeholder="Transport" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" />

          {/* Category */}
          <select name="category" value={formData.category} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>{cat.name}</option>
            ))}
          </select>

          {/* Image Preview */}
          {formData.image ? (
            <img src={URL.createObjectURL(formData.image)} alt="preview" style={{ width: 150 }} />
          ) : existingImage ? (
            <img src={existingImage} alt="preview" style={{ width: 150 }} />
          ) : null}

          <input type="file" name="image" onChange={handleChange} />

          {/* Itinerary */}
          {itinerary.map((item, index) => (
            <div key={index}>
              <input value={item.day} onChange={(e) => handleItineraryChange(index, "day", e.target.value)} placeholder="Day" />
              <input value={item.details} onChange={(e) => handleItineraryChange(index, "details", e.target.value)} placeholder="Details" />
            </div>
          ))}
          <button type="button" onClick={addItinerary}>Add Day</button>

          {/* Included */}
          {included.map((item, index) => (
            <input key={index} value={item} onChange={(e) => handleArrayChange(index, e.target.value, "included")} placeholder="Included" />
          ))}
          <button type="button" onClick={() => addField("included")}>Add Included</button>

          {/* Not Included */}
          {notIncluded.map((item, index) => (
            <input key={index} value={item} onChange={(e) => handleArrayChange(index, e.target.value, "notIncluded")} placeholder="Not Included" />
          ))}
          <button type="button" onClick={() => addField("notIncluded")}>Add Not Included</button>

          <button type="submit" className="create-btn">Update Destination</button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAddDestination;