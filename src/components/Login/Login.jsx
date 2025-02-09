import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useHistory } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const history = useHistory();

  const handleLogin = (role) => {
    login(role);
    history.push("/profile");
  };

  return (
    <div className="login-container">
      <h2>Login to Meal Mates</h2>
      <button onClick={() => handleLogin("chef")} className="login-btn chef">
        Login as Chef
      </button>
      <button
        onClick={() => handleLogin("gimmeFood")}
        className="login-btn food"
      >
        Login as Gimme Food User
      </button>
    </div>
  );
};

export default Login;
