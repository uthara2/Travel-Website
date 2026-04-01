import "../Trip/Trip.css";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import './DistrictDetails.css'

const DistrictDetails = () => {
  const { id } = useParams();

  const [destinations, setDestinations] = useState([]);
  const [districtName, setDistrictName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinations();
  }, [id]);

  const fetchDestinations = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/destinations/district/${id}`
      );

      setDestinations(res.data);

      // ✅ get district name from first item
      if (res.data.length > 0) {
        setDistrictName(res.data[0].district?.name);
      } else {
        setDistrictName("District");
      }

    } catch (error) {
      console.error("Error fetching destinations:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Loading UI
  if (loading) {
    return <h3 className="text-center mt-5">Loading destinations...</h3>;
  }

  return (
    <section className="district-details-section">
      <div className="container">

        {/* ✅ Heading */}
        <div className="heading-wrapper">
          <h2>{districtName}</h2>
          <p className="text-muted">Explore destinations in this district</p>
        </div>

        {/* ❌ Empty State */}
        {destinations.length === 0 ? (
          <p className="text-center">No destinations found</p>
        ) : (

          <div className="row g-4">
            {destinations.map((trip) => (
              <div key={trip._id} className="col-12 col-md-6 col-lg-4">

                <Link to={`/destination/${trip._id}`} className="trip-link">

                  <div className="featured-destination-card">

                    <img
                      src={trip.image}
                      alt={trip.title || trip.place}
                    />

                    <div className="overlay-content d-flex flex-column justify-content-end">

                      <h4 className="mb-1 text-white">
                        {trip.title}
                      </h4>

                      {/* Country */}
                      {trip.country && (
                        <p className="text-white-50 small mb-1">
                          {trip.country}
                        </p>
                      )}

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