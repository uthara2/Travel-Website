import "./Trip.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";



import trolley from "../../assets/trolley-DAFgW4x2.svg";
import plane from "../../assets/plane-DxAuZ-f9.svg";

const Trip = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const res = await axios.get("https://travel-website-lm4n.onrender.com/api/destinations");

      // ✅ safe shuffle
      const shuffled = [...res.data].sort(() => Math.random() - 0.5);

      // ✅ pick 6 random
      const randomSix = shuffled.slice(0, 6);

      setTrips(randomSix);
    } catch (err) {
      console.log("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

  const navigate = useNavigate();
  return (
    <section className="trip-section">
      <div className="trolley-img">
        <img src={trolley} alt="trolley decoration" />
      </div>

      <div className="plane-img">
        <img src={plane} alt="plane decoration" />
      </div>

      <div className="divider"></div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="section-heading text-center">
              <span className="sub-title">Explore The World</span>
              <h2 className="mb-0">Awesome Trip with us</h2>
            </div>
          </div>
        </div>

        <div className="divider-sm"></div>

        {/* ✅ Empty state */}
        {trips.length === 0 ? (
          <p className="text-center">No trips available</p>
        ) : (
          <div className="row g-4">
            {trips.map((trip) => (
              <div key={trip._id} className="col-12 col-md-6 col-lg-4">

                <Link to={`/destination/${trip._id}`} className="trip-link">
                  <div className="featured-destination-card">

                    <img
                      src={trip.image}
                      alt={trip.title || trip.place}
                    />

                    <div className="overlay-content d-flex flex-column justify-content-end">

                      <h4 className="mb-1 text-white">
                        {trip.place}
                      </h4>

                      {/* ✅ Country */}
                      {/* {trip.country && (
                        <p className="text-white-50 small mb-1">
                          {trip.country}
                        </p>
                      )} */}

                      {/* ✅ District (clickable) */}
                      {trip.district && (
                        <span
                          className="text-white-50 small"
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          e.preventDefault();       // stop outer link
          e.stopPropagation();      // stop bubbling
          navigate(`/district/${trip.district._id}`);
        }}
                        >
                          {trip.district.name}
                        </span>
                      )}

                    </div>

                  </div>
                </Link>

              </div>
            ))}
          </div>
        )}


      </div>

      <div className="divider"></div>
    </section>
  );
};

export default Trip;