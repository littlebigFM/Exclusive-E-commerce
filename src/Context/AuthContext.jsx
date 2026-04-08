import React, { createContext, useContext, useState, useEffect } from "react";
import { getProfile } from "../Services/authService";

const AuthContext = createContext({
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
  isLoggedIn: false,
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // When app loads, check if token exists and fetch user profile
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      // No token means not logged in — stop loading
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await getProfile();
        // response.data is:
        // { id, first_name, last_name, email, phone, role, status }
        setUser(response.data);
      } catch (error) {
        // Token might be expired or invalid
        // Clear everything and treat as logged out
        console.error("Failed to fetch profile:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  // Call this after successful login
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  // Call this to log out from anywhere
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cart");
    localStorage.removeItem("wishlist");
    setUser(null);
  };

  const isLoggedIn = !!user; // true if user exists, false if null

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
