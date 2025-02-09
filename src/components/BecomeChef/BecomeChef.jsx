import React, { useState } from "react";
import axios from "axios";
import "./BecomeChef.css";
import foodBecome from "./../../assets/foodbecome.png";
import { useAuth } from "../../context/AuthContext";

const BecomeChef = () => {
  const { user, providedFood } = useAuth();
  const [foodData, setFoodData] = useState({
    food_description: "",
    food_quantity: "",
    expiry_date: "",
    diet_type_name: "",
    lat: "",
    lng: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const submitFoodData = async () => {
    try {
      console.log("Submitting food data:", foodData);

      const formattedExpiryDate = new Date(foodData.expiry_date).toISOString();
      console.log("Formatted expiry date:", formattedExpiryDate);

      // Dummy user session ID
      const session_id = "123";

      const requestBody = {
        provider_id: 1, // Dummy provider ID
        provider_name: "Test Provider", // Dummy provider name
        food_description: foodData.food_description.trim(),
        food_quantity: Number(foodData.food_quantity) || 1,
        expiry_date: formattedExpiryDate,
        diet_type_name: foodData.diet_type_name.trim() || "Unknown",
        address: "123 Maple St", // Dummy address
        city: "Metropolis", // Dummy city
        lat: parseFloat(foodData.lat) || 35.779591,
        lng: parseFloat(foodData.lng) || -78.638176,
        session_id, // Sending dummy session ID
      };

      console.log("Request body:", requestBody);

      const response = await axios.post(
        "http://127.0.0.1:5000/provider/add",
        requestBody,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      console.log("Server response:", response.data);
      alert("Food data submitted successfully!");

      // Save the food data provided by the chef in the context
      providedFood(foodData);
    } catch (error) {
      console.error("Error submitting food data:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
      } else if (error.request) {
        console.error("No response received:", error.request);
      } else {
        console.error("Request setup error:", error.message);
      }

      alert("Failed to submit food data. Check console for details.");
    }
  };

  return (
    <div className="gimme-food-page">
      <div className="header-text">
        <img src={foodBecome} alt="Meal Mates" className="mealphoto" />
        <h1>Become a Chef</h1>
        <p>Never Stop Sharing!</p>
      </div>

      <p>Fill out the form below to alert locals of your spare meals</p>

      <div className="input-container">
        <label>
          Food Description:
          <input
            type="text"
            name="food_description"
            value={foodData.food_description}
            onChange={handleChange}
          />
        </label>
        <label>
          Food Quantity:
          <input
            type="number"
            name="food_quantity"
            value={foodData.food_quantity}
            onChange={handleChange}
          />
        </label>
        <label>
          Expiry Date:
          <input
            type="datetime-local"
            name="expiry_date"
            value={foodData.expiry_date}
            onChange={handleChange}
          />
        </label>
        <label>
          Diet Type:
          <input
            type="text"
            name="diet_type_name"
            value={foodData.diet_type_name}
            onChange={handleChange}
          />
        </label>
        <label>
          Latitude:
          <input
            type="number"
            name="lat"
            value={foodData.lat}
            onChange={handleChange}
          />
        </label>
        <label>
          Longitude:
          <input
            type="number"
            name="lng"
            value={foodData.lng}
            onChange={handleChange}
          />
        </label>
      </div>

      <div className="pagination">
        <button onClick={submitFoodData}>Submit Food</button>
      </div>
    </div>
  );
};

export default BecomeChef;
