import React from "react";
import { FaShieldAlt, FaGlobe, FaCamera, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import './OffcanvasContent.css'; // optional CSS

const OffcanvasContent = () => {
  const cards = [
    {
      icon: <FaShieldAlt size={24} />,
      title: "Safety First Always",
      desc: "We believe in the power of travel As avid explorer."
    },
    {
      icon: <FaGlobe size={24} />,
      title: "Experience the World",
      desc: "We believe in the power of travel As avid explorer."
    },
    {
      icon: <FaCamera size={24} />,
      title: "Excellence in Service",
      desc: "We believe in the power of travel As avid explorer."
    },
    {
      icon: <FaUser size={24} />,
      title: "Friendly Guider",
      desc: "We believe in the power of travel As avid explorer."
    },
  ];

  return (
    <div className="offcanvas-body">
      <div className="container-fluid">
        <div className="d-flex flex-column gap-5 mb-5">
          {cards.map((card, index) => (
            <div key={index} className="about-card-sm d-flex align-items-center gap-3">
              <div className="icon">{card.icon}</div>
              <div>
                <h4>{card.title}</h4>
                <p className="mb-0">{card.desc}</p>
              </div>
            </div>
          ))}

          <Link to="/about-us" className="btn btn-primary">
            Book Now <i className="icon-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OffcanvasContent;