import "./Card.css";
import { Link } from "react-router-dom";

const Card = ({ image, title, link }) => {
  return (
    <Link to={link} className="card-link">
      <div className="custom-card">
        <img src={image} alt={title} />

        <div className="card-overlay">
          <h4>{title}</h4>
        </div>
      </div>
    </Link>
  );
};

export default Card;