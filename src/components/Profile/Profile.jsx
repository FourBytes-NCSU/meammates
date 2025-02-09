import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./Profile.css";
import foodBecome from "./../../assets/search.png";
import foodBecomechef from "./../../assets/foodbecome.png";

const Profile = () => {
  const { user, logout, savedFood, providedFood } = useAuth();
  const history = useHistory();

  if (!user) {
    history.push("/login");
    return null;
  }

  return (
    <div className="profile-container">
      <div className="header-texte">
        {user.role === "chef" && (
          <img src={foodBecomechef} alt="Meal Mates" className="mealphoto" />
        )}

        {user.role === "gimmeFood" && (
          <img src={foodBecome} alt="Meal Mates" className="mealphoto" />
        )}

        <h1 className="header-tilee">
          Welcome, {user.role === "chef" ? "Chef" : "Food Lover"}!
        </h1>
        <h4 className="profile-label">
          Your role:{" "}
          {user.role === "chef" ? "Master Chef User" : "Gimme Food User"}
        </h4>
      </div>

      {user.role === "chef" && (
        <div className="header-tile">
          <h2>Your Provided Food:</h2>
          {providedFood.length > 0 ? (
            providedFood.map((food, index) => (
              <li key={index}>{food.food_description}</li>
            ))
          ) : (
            <p>No food provided yet.</p>
          )}
        </div>
      )}

      {user.role === "gimmeFood" && (
        <div className="header-tile">
          <h2 className="foot-stats">Food stats</h2>
          {savedFood.length > 0 ? (
            savedFood.map((food, index) => (
              <li key={index}>{food.food_description}</li>
            ))
          ) : (
            <p>No food taken yet.</p>
          )}
        </div>
      )}

      <button
        onClick={() => {
          logout();
          history.push("/login");
        }}
        className="btn btn-white logout-btn"
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
