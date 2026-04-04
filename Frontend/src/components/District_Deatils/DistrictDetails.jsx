import "../Trip/Trip.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./DistrictDetails.css";

const DistrictDetails = () => {
  const { id } = useParams();
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/destinations/district/${id}`
        );
        setPlaces(res.data);
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [id]);

  return (
    <section className="district-details-section">
      <div className="container">

        {/* ✅ Heading */}
        <div className="heading-wrapper">
          <h2>{id.toUpperCase()}</h2>
          <p className="text-muted">
            Explore destinations in this district
          </p>
        </div>

        {/* ✅ Empty State */}
        {places.length === 0 ? (
          <p className="text-center mt-4">
            No tourist places found 😢
          </p>
        ) : (

          <div className="row g-4">
            {places.map((place) => (
              <div key={place._id} className="col-12 col-md-6 col-lg-4">

                <Link to={`/destination/${place._id}`} className="trip-link">

                  <div className="featured-destination-card">

                    <img
                      src={place.image}
                      alt={place.title || place.place}
                      onError={(e) =>
                        (e.target.src = "/fallback.jpg")
                      }
                    />

                    <div className="overlay-content d-flex flex-column justify-content-end">

                      <h4 className="mb-1 text-white">
                        {place.title}
                      </h4>

                      {/* Optional category */}
                      <p className="text-white small">
                        {place.category?.name}
                      </p>

                    </div>

                  </div>

                </Link>

              </div>
            ))}
          </div>

        )}

      </div>
    </section>
  );
};

export default DistrictDetails;