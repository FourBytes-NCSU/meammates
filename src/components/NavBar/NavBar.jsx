import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Link, withRouter } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./NavBar.css";

const NavBar = ({ location }) => {
  const { user } = useAuth();

  return (
    <Menu>
      <Link
        to="/"
        className={`menu-item ${
          location.pathname === "/" ? "active-item" : ""
        }`}
      >
        Home
      </Link>
      <Link
        to="/foodbot"
        className={`menu-item ${
          location.pathname === "/foodbot" ? "active-item" : ""
        }`}
      >
        FoodBot
      </Link>
      <Link
        to="/impact"
        className={`menu-item ${
          location.pathname === "/impact" ? "active-item" : ""
        }`}
      >
        Impact
      </Link>
      <Link
        to="/gimme-food"
        className={`menu-item ${
          location.pathname === "/gimme-food" ? "active-item" : ""
        }`}
      >
        Gimme Food
      </Link>
      <Link
        to="/become-chef"
        className={`menu-item ${
          location.pathname === "/become-chef" ? "active-item" : ""
        }`}
      >
        Become Chef
      </Link>

      {user ? (
        <Link to="/profile" className="menu-item">
          Profile
        </Link>
      ) : (
        <Link to="/login" className="menu-item">
          Login
        </Link>
      )}
    </Menu>
  );
};

export default withRouter(NavBar);
