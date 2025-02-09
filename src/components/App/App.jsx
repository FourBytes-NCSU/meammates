import React from "react";
import { HashRouter, Route } from "react-router-dom";
import Home from "./../Home/Home";
import GimmeFood from "../GimmeFood/GimmeFood";
import Impact from "../Impact/Impact";
import "./App.css";
import NavBar from "../NavBar/NavBar";
import GoHome from "../GoHome/GoHome";
import FoodBot from "../FoodBot/FoodBot";
import BecomeChef from "../BecomeChef/BecomeChef";
import { AuthProvider } from "../../context/AuthContext";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <HashRouter>
          <div>
            {/* place NavBar inside BrowserRouter as withRouter is used. */}
            <NavBar />
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/gimme-food" component={GimmeFood} />
            <Route path="/foodbot" component={FoodBot} />
            <Route path="/impact" component={Impact} />
            <Route path="/become-chef" component={BecomeChef} />
            <GoHome />
          </div>
        </HashRouter>
      </AuthProvider>
    </div>
  );
};

export default App;
