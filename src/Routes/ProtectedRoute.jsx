import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import { useAdmin } from "../Context/AdminContext";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const { isLoggedIn, loading } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();
  const location = useLocation();

  // Wait for both auth checks to complete
  if (loading || adminLoading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Admin route — check admin context
  if (adminOnly) {
    if (!isAdmin) {
      return <Navigate to="/admin/login" replace />;
    }
    return children;
  }

  // Regular protected route — check user auth
  if (!isLoggedIn) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
