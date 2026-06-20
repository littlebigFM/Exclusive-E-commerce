import api from "./api";

// ── Admin Auth ───────────────────────────────────────────────

export const adminLogin = async (credentials) => {
  const response = await api.post("/api/admin/login", credentials);
  return response.data;
};

// ── Admin Dashboard ──────────────────────────────────────────

export const getDashboardStats = async () => {
  const response = await api.get("/api/admin/dashboard");
  return response.data;
};

// ── Admin Orders ─────────────────────────────────────────────

export const getAdminOrders = async (page = 1, limit = 10) => {
  const response = await api.get(
    `/api/admin/orders?page=${page}&limit=${limit}`,
  );
  return response.data;
};

// ── Admin Products ───────────────────────────────────────────

// GET /api/products
export const getAllProducts = async () => {
  const response = await api.get("/api/products");
  return response.data;
};

// GET /api/products/:id
export const getProduct = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// POST /api/products — multipart/form-data for image upload
export const createProduct = async (formData) => {
  const response = await api.post("/api/products", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// PUT /api/products/:id — multipart/form-data for image upload
export const updateProduct = async (id, formData) => {
  const response = await api.put(`/api/products/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

// DELETE /api/products/:id
export const deleteProduct = async (id) => {
  const response = await api.delete(`/api/products/${id}`);
  return response.data;
};
