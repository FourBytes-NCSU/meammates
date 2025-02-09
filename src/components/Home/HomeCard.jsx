import React from "react";
import { Link } from "react-router-dom";
import "./HomeCard.css"; // Separate CSS for styling

const HomeCard = ({ title, description, imageUrl, link }) => {
  return (
    <div className="home-card">
      <div className="image-container">
        <Link to={link} className="card-link">
          <img src={imageUrl} alt={title} className="home-card-img" />
        </Link>
      </div>
      <div className="card-details-container">
        <h2 className="home-card-heading">{title}</h2>
        <p className="home-card-description">{description}</p>
      </div>
    </div>
  );
};

export default HomeCard;
