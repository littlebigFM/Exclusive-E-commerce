import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const AdminRoute = ({ children }) => {
  const { user, loading, isLoggedIn } = useAuth();

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-screen">
        <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in → go to login
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  // Logged in but not admin → go to homepage
  if (user?.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  // Admin → show the page
  return children;
};

export default AdminRoute;
