import api from "./api";

// POST /api/cart/add — add item to cart
export const addToCartAPI = async (productId, quantity) => {
  const response = await api.post("/api/cart/add", {
    product_id: productId,
    quantity: quantity,
  });
  return response.data;
};

// GET /api/cart — get all cart items
export const getCartAPI = async () => {
  const response = await api.get("/api/cart");
  return response.data;
};

// PUT /api/cart/update/:id — update cart item quantity
export const updateCartAPI = async (cartItemId, quantity) => {
  const response = await api.put(`/api/cart/update/${cartItemId}`, {
    quantity: quantity,
  });
  return response.data;
};

// DELETE /api/cart/remove/:id — remove item from cart
export const removeFromCartAPI = async (cartItemId) => {
  const response = await api.delete(`/api/cart/remove/${cartItemId}`);
  return response.data;
};
