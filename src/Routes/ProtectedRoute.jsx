import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, loading, user } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Not logged in — redirect to login
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in but not admin — redirect to homepage
  if (adminOnly && user?.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
