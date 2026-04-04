import { useState, useEffect } from "react";
import axios from "axios";
import "../styles/CreateAddDestination.css";

const UpdateTourPackage = ({ editId, setActivePage }) => {

  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    price: "",
    description: "",
    nights: "",
    maxPersons: "",
    image: null
  });

  const [existingImage, setExistingImage] = useState("");

  const [itinerary, setItinerary] = useState([]);
  const [inclusions, setInclusions] = useState([]);
  const [exclusions, setExclusions] = useState([]);

  /* FETCH PACKAGE */

  useEffect(() => {
  if (editId) fetchPackage();
}, [editId]);

  const fetchPackage = async () => {

    const res = await axios.get(
      `https://travel-website-lm4n.onrender.com/api/packages/${editId}`
    );

    const data = res.data;

    setFormData({
      title: data.title || "",
      destination: data.destination || "",
      price: data.price || "",
      description: data.description || "",
      nights: data.duration?.split(" ")[0] || "",
      maxPersons: data.maxPersons || "",
      image: null
    });

    setExistingImage(data.image || "");

    setItinerary(
      data.itinerary?.length
        ? data.itinerary
        : [{ day: "", description: "" }]
    );

    setInclusions(data.inclusions?.length ? data.inclusions : [""]);
    setExclusions(data.exclusions?.length ? data.exclusions : [""]);

    setLoading(false);
  };

  /* INPUT HANDLING */

  const handleChange = (e) => {

    const { name, value, files } = e.target;

    if (name === "image") {
      setFormData((prev) => ({
        ...prev,
        image: files[0]
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* DURATION AUTO CALC */

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
    setItinerary([...itinerary, { day: "", description: "" }]);
  };

  /* INCLUSIONS / EXCLUSIONS */

  const handleArrayChange = (index, value, type) => {

    const updated =
      type === "inclusions"
        ? [...inclusions]
        : [...exclusions];

    updated[index] = value;

    type === "inclusions"
      ? setInclusions(updated)
      : setExclusions(updated);
  };

  const addField = (type) => {

    type === "inclusions"
      ? setInclusions([...inclusions, ""])
      : setExclusions([...exclusions, ""]);
  };

  /* UPDATE PACKAGE */

  const handleUpdate = async (e) => {

    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key !== "image") {
        data.append(key, formData[key]);
      }
    });

    if (formData.image) {
      data.append("image", formData.image);
    }

    data.append("duration", duration);
    data.append("itinerary", JSON.stringify(itinerary));
    data.append("inclusions", JSON.stringify(inclusions));
    data.append("exclusions", JSON.stringify(exclusions));

    await axios.put(
      `https://travel-website-lm4n.onrender.com/api/packages/${editId}`,
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Tour Package Updated Successfully 🚀");

    setActivePage("tourPackages");
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="create-page">

      <div className="create-card">

        <button
          className="back-btn"
          onClick={() => setActivePage("tourPackages")}
        >
          Back
        </button>

        <h2>Update Tour Package</h2>

        <form className="create-form" onSubmit={handleUpdate}>

          <div>
            <label>Package Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleChange}
              required
            />
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
            <label>Max Persons</label>
            <input
              type="number"
              name="maxPersons"
              value={formData.maxPersons}
              onChange={handleChange}
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
                    fontWeight: "500"
                  }}
                >
                  {duration}
                </div>
              )}

            </div>
          </div>

          <div>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div>
            <label>Upload Image</label>

            {existingImage && (
              <img
                src={existingImage}
                alt="package"
                width="120"
                style={{ marginBottom: "10px", display: "block" }}
              />
            )}

            <input
              type="file"
              name="image"
              onChange={handleChange}
            />
          </div>

          {/* ITINERARY */}

          <div>
            <label>Itinerary</label>

            {itinerary.map((item, index) => (

              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "10px",
                  marginBottom: "8px"
                }}
              >

                <input
                  type="text"
                  placeholder="Day"
                  value={item.day}
                  onChange={(e) =>
                    handleItineraryChange(
                      index,
                      "day",
                      e.target.value
                    )
                  }
                />

                <input
                  type="text"
                  placeholder="Description"
                  value={item.description}
                  onChange={(e) =>
                    handleItineraryChange(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />

              </div>

            ))}

            <button
              className="other-btn"
              type="button"
              onClick={addItinerary}
            >
              Add Day
            </button>

          </div>

          {/* INCLUSIONS */}

          <div>
            <label>Inclusions</label>

            {inclusions.map((item, index) => (

              <input
                key={index}
                type="text"
                value={item}
                style={{ marginBottom: "8px" }}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    e.target.value,
                    "inclusions"
                  )
                }
              />

            ))}

            <button
              className="other-btn"
              type="button"
              onClick={() => addField("inclusions")}
            >
              Add Inclusion
            </button>

          </div>

          {/* EXCLUSIONS */}

          <div>
            <label>Exclusions</label>

            {exclusions.map((item, index) => (

              <input
                key={index}
                type="text"
                value={item}
                style={{ marginBottom: "8px" }}
                onChange={(e) =>
                  handleArrayChange(
                    index,
                    e.target.value,
                    "exclusions"
                  )
                }
              />

            ))}

            <button
              className="other-btn"
              type="button"
              onClick={() => addField("exclusions")}
            >
              Add Exclusion
            </button>

          </div>

          <button type="submit" className="create-btn">
            Update Tour Package
          </button>

        </form>

      </div>
    </div>
  );
};

export default UpdateTourPackage;