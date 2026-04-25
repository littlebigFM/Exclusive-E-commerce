import React, { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext({
  admin: null,
  adminToken: null,
  adminLoading: true,
  adminLogin: () => {},
  adminLogout: () => {},
  isAdmin: false,
});

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [adminLoading, setAdminLoading] = useState(true);

  // Check if admin is already logged in on app load
  useEffect(() => {
    const savedAdmin = localStorage.getItem("admin");
    const savedAdminToken = localStorage.getItem("adminToken");

    if (savedAdmin && savedAdminToken) {
      setAdmin(JSON.parse(savedAdmin));
    }
    setAdminLoading(false);
  }, []);

  const loginAdmin = (adminData, token) => {
    localStorage.setItem("adminToken", token);
    localStorage.setItem("admin", JSON.stringify(adminData));
    setAdmin(adminData);
  };

  const logoutAdmin = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("admin");
    setAdmin(null);
  };

  const isAdmin = !!admin && admin.role === "admin";

  return (
    <AdminContext.Provider
      value={{
        admin,
        adminLoading,
        loginAdmin,
        logoutAdmin,
        isAdmin,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  return useContext(AdminContext);
};
