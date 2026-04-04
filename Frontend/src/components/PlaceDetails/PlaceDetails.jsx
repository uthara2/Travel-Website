import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "./PlaceDetails.css";

const PlaceDetails = () => {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    fetchDestination();
  }, [id]);

  const fetchDestination = async () => {
    try {
      const res = await axios.get(
        `https://travel-website-lm4n.onrender.com/api/destinations/${id}`
      );
      setDestination(res.data);
    } catch (error) {
      console.error("Error fetching destination:", error);
    }
  };

  if (!destination) return <div className="loading">Loading...</div>;

  return (
    <div className="details-page">
      <div className="hero-header">
        <h1 className="hero-main-title">
          {destination.title}
        </h1>
      </div>
      {/* HERO SECTION */}
    
    <div className="heroo-section">
    <div className="hero-image-wrapper">
      <img
        src={destination.image}
        alt={destination.place}
        className="hero-image"
      />
    </div>

    <div className="hero-content">
      <span className="hero-category">
        {destination.category?.name}
      </span>

      <h1 className="hero-title">
        { destination.place}
      </h1>

      <p className="hero-location">
        {destination.district}
      </p>

      <div className="hero-price">
        ₹{destination.price} <span style={{color:"#3cb173",  fontSize:"16px", fontWeight:"200"}}>per person</span>
      </div>

      <button className="book-btn">Book Now</button>
    </div>
  </div>
      <div className="details-container">
        {/* DESCRIPTION */}
        <section className="section">
          <h2>About This Package</h2>
          <p>{destination.description}</p>
        </section>

        {/* PACKAGE DETAILS */}
        <section className="section">
          <h2>Package Details</h2>
          <div className="package-grid">
            <div>
              <strong>Duration</strong>
              <p>{destination.duration} </p>
            </div>

            <div>
              <strong>Stay</strong>
              <p>{destination.stay}</p>
            </div>

            <div>
              <strong>Transport</strong>
              <p>{destination.transport}</p>
            </div>
          </div>

        </section>

        {/* ITINERARY */}
        {destination.itinerary && (
          <section className="section">
            <h2>Itinerary</h2>
            <div className="itinerary">
              {destination.itinerary.map((item, index) => (
                <div key={index} className="itinerary-item">
                  <h4>{item.day}</h4>
                  <p>{item.details}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* INCLUDED / NOT INCLUDED */}
        <section className="section inclusion-section">
          <div>
            <h2>Included</h2>
            <ul>
              {destination.included?.map((item, index) => (
                <li key={index}>✔ {item}</li>
              ))}
            </ul>
          </div>

          <div>
            <h2>Not Included</h2>
            <ul>
              {destination.notIncluded?.map((item, index) => (
                <li key={index}>✘ {item}</li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PlaceDetails;