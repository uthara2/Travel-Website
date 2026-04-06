import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PackageDetails.css";

const PackageDetails = () => {

  const { id } = useParams();
  const [pkg, setPkg] = useState(null);

  useEffect(() => {
    fetchPackage();
  }, [id]);

  const fetchPackage = async () => {
    try {

      const res = await axios.get(
        `https://travel-website-lm4n.onrender.com/api/packages/${id}`
      );
      console.log("ID:", id);

      setPkg(res.data);

    } catch (error) {
      console.error("Error fetching package:", error);
    }
  };

  if (!pkg) return <div className="loading">Loading...</div>;

  return (
    <div className="details-page">

      {/* HERO HEADER */}
      <div className="hero-header">
        <h1 className="hero-main-title">
          {pkg.title}
        </h1>
      </div>

      {/* HERO SECTION */}

      <div className="heroo-section">

        <div className="hero-image-wrapper">
          <img
            src={pkg.image}
            alt={pkg.title}
            className="hero-image"
          />
        </div>

        <div className="hero-content">

          <span className="hero-category">
            Tour Package
          </span>

          <h1 className="hero-title">
            {pkg.destination}
          </h1>

          <p className="hero-location">
            {pkg.duration}
          </p>

          <div className="hero-price">
            ₹{pkg.price} per person
            <span
              style={{
                color:"#3cb173",
                fontSize:"16px",
                fontWeight:"200"
              }}
            >
              per person
            </span>
          </div>

          <button className="book-btn">
            Book Now
          </button>

        </div>
      </div>

      <div className="details-container">

        {/* DESCRIPTION */}

        <section className="section">

          <h2>About This Package</h2>
          <p>{pkg.description}</p>

        </section>


        {/* PACKAGE DETAILS */}

        <section className="section">

          <h2>Package Details</h2>

          <div className="package-grid">

            <div>
              <strong>Destination</strong>
              <p>{pkg.destination}</p>
            </div>

            <div>
              <strong>Duration</strong>
              <p>{pkg.duration}</p>
            </div>

            <div>
              <strong>Max Persons</strong>
              <p>{pkg.maxPersons}</p>
            </div>

          </div>

        </section>


        {/* ITINERARY */}

        {pkg.itinerary && (

          <section className="section">

            <h2>Itinerary</h2>

            <div className="itinerary">

              {pkg.itinerary.map((item, index) => (

                <div key={index} className="itinerary-item">

                  <h4>{item.day}</h4>
                  <p>{item.description}</p>

                </div>

              ))}

            </div>

          </section>

        )}


        {/* INCLUSIONS / EXCLUSIONS */}

        <section className="section inclusion-section">

          <div>

            <h2>Included</h2>

            <ul>

              {pkg.inclusions?.map((item, index) => (
                <li key={index}>✔ {item}</li>
              ))}

            </ul>

          </div>


          <div>

            <h2>Not Included</h2>

            <ul>

              {pkg.exclusions?.map((item, index) => (
                <li key={index}>✘ {item}</li>
              ))}

            </ul>

          </div>

        </section>

      </div>

    </div>
  );
};

export default PackageDetails;