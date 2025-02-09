import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [savedFood, setSavedFood] = useState([]);
  const [providedFood, setProvidedFood] = useState([]);

  const login = (role) => {
    setUser({ role });
  };

  const logout = () => {
    setUser(null);
    setSavedFood([]); // Clear saved food on logout
    setProvidedFood([]);
  };

  const saveFood = (foodItem) => {
    setSavedFood((prevFood) => [...prevFood, foodItem]);
  };

  const saveProvidedFood = (foodItem) => {
    setProvidedFood((prevFood) => [...prevFood, foodItem]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        savedFood,
        saveFood,
        providedFood,
        saveProvidedFood,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
