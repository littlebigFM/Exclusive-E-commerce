import api from "./Api";

// POST /api/auth/register
export const registerUser = async (userData) => {
  const response = await api.post("/api/auth/register", userData);
  return response.data;
};

// POST /api/auth/login
export const loginUser = async (userData) => {
  const response = await api.post("/api/auth/login", userData);
  return response.data;
};

// GET /api/auth/profile
export const getProfile = async () => {
  const response = await api.get("/api/auth/me");
  return response.data;
};
