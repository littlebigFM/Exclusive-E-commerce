import api from "./api";

// GET /api/products — fetch all products
export const getProducts = async () => {
  const response = await api.get("/api/products");
  return response.data;
};

// GET /api/products/:id — fetch single product
export const getProductById = async (id) => {
  const response = await api.get(`/api/products/${id}`);
  return response.data;
};

// GET /api/products?is_flash=true — fetch flash sale products
export const getFlashProducts = async () => {
  const response = await api.get("/api/products?is_flash=true");
  return response.data;
};
