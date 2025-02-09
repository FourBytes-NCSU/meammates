import React from "react";
import "./FoodBot.css";

const FoodBot = () => {
  return (
    <div className="external-page">
      <iframe
        src="https://898e-152-7-255-193.ngrok-free.app"
        title="External Service"
        width="100%"
        height="800px"
        style={{ border: "none" }}
      />
    </div>
  );
};

export default FoodBot;
