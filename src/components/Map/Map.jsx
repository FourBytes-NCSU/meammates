import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import "./Map.css";

const Map = ({ location, foodData }) => {
  const mapContainerStyle = {
    height: "400px",
    width: "100%",
  };

  const center = {
    lat: location.lat,
    lng: location.lng,
  };

  return (
    <LoadScript googleMapsApiKey="">
      <div className="myclass">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={12}
        >
          {foodData.map((food) => (
            <Marker key={food.id} position={{ lat: food.lat, lng: food.lng }} />
          ))}
        </GoogleMap>
      </div>
    </LoadScript>
  );
};

export default Map;
