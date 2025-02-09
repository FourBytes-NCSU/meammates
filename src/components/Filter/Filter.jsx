import React, { useState, useEffect } from "react";

const Filters = ({ onFilterChange, uniqueDietTypes }) => {
  const [foodType, setFoodType] = useState("");
  const [distance, setDistance] = useState("");

  const handleFoodTypeChange = (e) => {
    setFoodType(e.target.value);
    onFilterChange({ foodType: e.target.value, distance });
  };

  const handleDistanceChange = (e) => {
    setDistance(e.target.value);
    onFilterChange({ foodType, distance: e.target.value });
  };

  return (
    <div className="filters-container">
      <div className="filter">
        <label>Food Type</label>
        <select value={foodType} onChange={handleFoodTypeChange}>
          <option value="">All</option>
          {uniqueDietTypes.map((type, index) => (
            <option key={index} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <div className="filter">
        <label>Distance (km)</label>
        <select value={distance} onChange={handleDistanceChange}>
          <option value="">All</option>
          <option value="5">5 km</option>
          <option value="10">10 km</option>
          <option value="20">20 km</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
