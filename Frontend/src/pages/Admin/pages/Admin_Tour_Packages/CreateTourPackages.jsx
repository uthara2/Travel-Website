import { useState } from "react";
import axios from "axios";
import "../styles/CreateAddDestination.css";

const CreateTourPackages = ({ setActivePage }) => {

  const [formData, setFormData] = useState({
    title: "",
    destination: "",
    price: "",
    description: "",
    nights: "",
    maxPersons: "",
    image: null,
  });

  const [itinerary, setItinerary] = useState([
    { day: "", description: "" }
  ]);

  const [inclusions, setInclusions] = useState([""]);
  const [exclusions, setExclusions] = useState([""]);

  /* INPUT CHANGE */

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

  /* AUTO DURATION */

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
      type === "inclusions" ? [...inclusions] : [...exclusions];

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

  /* SUBMIT */

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    data.append("duration", duration);
    data.append("itinerary", JSON.stringify(itinerary));
    data.append("inclusions", JSON.stringify(inclusions));
    data.append("exclusions", JSON.stringify(exclusions));

    await axios.post(
      "https://travel-website-lm4n.onrender.com/api/packages/create",
      data,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    alert("Tour Package Created Successfully 🚀");

    setActivePage("tourPackages");
  };

  return (
    <div className="create-page">

      <div className="create-card">

        <button
          className="back-btn"
          onClick={() => setActivePage("tourPackages")}
        >
          Back
        </button>

        <h2>Create Tour Package</h2>

        <form className="create-form" onSubmit={handleSubmit}>

          <div>
            <label>Package Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Destination</label>
            <input
              type="text"
              name="destination"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Price</label>
            <input
              type="number"
              name="price"
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Max Persons</label>
            <input
              type="number"
              name="maxPersons"
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
              onChange={handleChange}
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
                  placeholder="Day (Ex: Day 1)"
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
                placeholder="Included item"
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
                placeholder="Excluded item"
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
            Create Tour Package
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateTourPackages;