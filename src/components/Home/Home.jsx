import React, { Component } from "react";
import chef from "./../../assets/chef.jpeg";
import food from "./../../assets/food.png";
import "./Home.css";
import HomeCard from "./HomeCard";
import recycle from "./../../assets/recycle.png";
import foodBecome from "./../../assets/network.png";

class Home extends Component {
  render() {
    return (
      <div className="home-containe">
        <div className="header-text">
          {/* <img
            src={foodBecome}
            alt="Meal Mates"
            className="mealphoto homephoto"
          /> */}

          <h1>Meal Mates</h1>
          <p>Fighting waste, One meal at a time</p>
        </div>

        <div className="home-cards-container">
          <HomeCard
            title="Become a Chef"
            description="Join our sustainable cooking community and share your recipes!"
            imageUrl={chef}
            link="/become-chef"
          />
          <HomeCard
            title="Gimme Food"
            description="Get healthy, sustainable meals delivered to your doorstep!"
            imageUrl={food}
            link="/gimme-food"
          />
        </div>
        <div className="header-tile">
          <div className="image-container">
            <img src={recycle} alt="Meal Mates" className="recycle" />
          </div>
          <h2>Why MealMates?</h2>
          <h4>
            MealMates is dedicated to sustainability and promoting healthier
            eating habits. We believe in reducing food waste and making it easy
            for you to enjoy meals that are good for both you and the planet.
            Whether you're a chef looking to share your sustainable recipes or
            someone who wants easy access to eco-friendly meals, MealMates has
            something for you!
          </h4>
        </div>
      </div>
    );
  }
}

export default Home;
