import React, { useState, useEffect } from "react";
import axios from "axios";
import Map from "../Map/Map";
import Filters from "../Filter/Filter";
import { useAuth } from "../../context/AuthContext"; // Import useAuth
import "./GimmeFood.css";
import foodBecome from "./../../assets/search.png";

const GimmeFood = () => {
  const defaultLocation = { lat: 35.785, lng: -78.676 }; // NC State University
  const { user, saveFood } = useAuth(); // Get user and saveFood function
  const [location, setLocation] = useState(defaultLocation);
  const [filters, setFilters] = useState({ foodType: "", distance: "" });
  const [foodData, setFoodData] = useState([]);
  const [uniqueDietTypes, setUniqueDietTypes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:5000/order/available-food"
        );
        let data = response.data;

        if (typeof data === "string") {
          try {
            data = JSON.parse(data);
          } catch (error) {
            console.error("Error parsing JSON:", error);
            return;
          }
        }

        if (Array.isArray(data)) {
          const sanitizedData = data.map((food) => ({
            ...food,
            provider_name: food.provider_name || "Unknown Provider",
            food_description:
              food.food_description || "No description available",
            diet_type_name: food.diet_type_name || "Unknown Diet Type",
            address: food.address || "No address provided",
            city: food.city || "Unknown City",
            expiry_date: food.expiry_date || "N/A",
            status: food.status || "unknown",
          }));

          setFoodData(sanitizedData);

          const dietTypes = [
            ...new Set(sanitizedData.map((food) => food.diet_type_name)),
          ];
          setUniqueDietTypes(dietTypes);

          if (sanitizedData.length > 0) {
            setLocation({
              lat: sanitizedData[0].lat,
              lng: sanitizedData[0].lng,
            });
          }
        } else {
          console.error("Unexpected data format:", data);
        }
      } catch (error) {
        console.error("Error fetching food data:", error);
      }
    };

    fetchFoodData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const getDistance = (start, end) => {
    const R = 6371; // km
    const dLat = toRad(end.lat - start.lat);
    const dLng = toRad(end.lng - start.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(start.lat)) *
        Math.cos(toRad(end.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (deg) => deg * (Math.PI / 180);

  const filteredFoodData = foodData.filter(
    (food) =>
      (!filters.foodType || food.diet_type_name === filters.foodType) &&
      (!filters.distance ||
        getDistance(location, { lat: food.lat, lng: food.lng }) <=
          filters.distance)
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFoodItems = filteredFoodData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const paginate = (pageNumber) => {
    if (
      pageNumber >= 1 &&
      pageNumber <= Math.ceil(filteredFoodData.length / itemsPerPage)
    ) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="gimme-food-page">
      <div className="header-text">
        <img src={foodBecome} alt="Meal Mates" className="mealphoto" />
        <h1>Find Sustainable Food</h1>
        <p>Ready for good food?</p>
      </div>

      <p className="info-header">
        View the map below to see where local chefs are sharing their spare
        meals
      </p>

      <Map location={location} foodData={filteredFoodData} />

      <Filters
        onFilterChange={handleFilterChange}
        uniqueDietTypes={uniqueDietTypes}
      />

      <div className="filtered-food-info">
        <h3>Filtered Food Locations</h3>
        <p className="info-header">
          View the index of local chefs in your area and sort by your needed
          dietary restrictions
        </p>
        <div className="food-tile-container">
          {currentFoodItems.length === 0 ? (
            <p>No food available for the selected filters.</p>
          ) : (
            currentFoodItems.map((food) => (
              <div className="food-tile" key={food.id}>
                <p>
                  {food.provider_name} - {food.food_description}
                </p>
                <p>
                  Location: {food.address}, {food.city}
                </p>
                <p>Diet Type: {food.diet_type_name}</p>
                <p>Expiry Date: {food.expiry_date}</p>

                {user && user.role === "gimmeFood" && (
                  <button onClick={() => saveFood(food)} className="save-btn">
                    Save Me
                  </button>
                )}
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          {Array.from(
            { length: Math.ceil(filteredFoodData.length / itemsPerPage) },
            (_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default GimmeFood;
