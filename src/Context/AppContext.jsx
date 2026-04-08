import { createContext, useContext, useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import {
  addToCartAPI,
  getCartAPI,
  updateCartAPI,
  removeFromCartAPI,
} from "../Services/cartService";

const AppContext = createContext({
  cart: [],
  wishlist: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  toggleWishlist: () => {},
  isInWishlist: () => false,
  clearCart: () => {},
  cartCount: 0,
  wishlistCount: 0,
  cartTotal: 0,
});

export function AppProvider({ children }) {
  const { isLoggedIn } = useAuth();
  const isFirstRender = useRef(true);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem("wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
  }, [wishlist]);

  // When user logs in — fetch their cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      if (!isLoggedIn) return;
      try {
        const response = await getCartAPI();
        if (response.data) {
          const backendCart = response.data.map((item) => ({
            id: item.product_id,
            cartItemId: item.id,
            name: item.product?.name || "",
            price: item.product?.price || 0,
            compare_price: item.product?.compare_price || 0,
            primary_image: item.product?.primary_image || null,
            quantity: item.quantity,
          }));
          setCart(backendCart);
        }
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        if (error.response?.status === 401) {
          console.warn("Session expired or invalid. Using local cart storage.");
        }
        // Keep the localStorage cart as fallback
      }
    };
    fetchCart();
  }, [isLoggedIn]);

  // Clear cart and wishlist when user logs out
  // isFirstRender prevents this from running on initial page load
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    if (!isLoggedIn) {
      setCart([]);
      setWishlist([]);
    }
  }, [isLoggedIn]);

  const addToCart = async (product) => {
    if (isLoggedIn) {
      try {
        await addToCartAPI(product.id, 1);
        setCart((prev) => {
          const existing = prev.find((item) => item.id === product.id);
          if (existing) {
            return prev.map((item) =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            );
          }
          return [...prev, { ...product, quantity: 1 }];
        });
      } catch (error) {
        console.error("Failed to add to cart:", error);
        // If 401 Unauthorized, fall back to localStorage
        if (error.response?.status === 401) {
          console.warn(
            "Session expired. Saving to local storage. Please log in again.",
          );
          setCart((prev) => {
            const existing = prev.find((item) => item.id === product.id);
            if (existing) {
              return prev.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item,
              );
            }
            return [...prev, { ...product, quantity: 1 }];
          });
        }
      }
    } else {
      setCart((prev) => {
        const existing = prev.find((item) => item.id === product.id);
        if (existing) {
          return prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = async (id) => {
    if (isLoggedIn) {
      try {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem?.cartItemId) {
          await removeFromCartAPI(cartItem.cartItemId);
        }
      } catch (error) {
        console.error("Failed to remove from cart:", error);
        if (error.response?.status === 401) {
          console.warn("Session expired. Saving to local storage.");
        }
      }
    }
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return removeFromCart(id);
    if (isLoggedIn) {
      try {
        const cartItem = cart.find((item) => item.id === id);
        if (cartItem?.cartItemId) {
          await updateCartAPI(cartItem.cartItemId, quantity);
        }
      } catch (error) {
        console.error("Failed to update cart:", error);
        if (error.response?.status === 401) {
          console.warn("Session expired. Saving to local storage.");
        }
      }
    }
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const isInWishlist = (id) => wishlist.some((item) => item.id === id);

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = wishlist.length;
  const cartTotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <AppContext.Provider
      value={{
        cart,
        wishlist,
        addToCart,
        removeFromCart,
        updateQuantity,
        toggleWishlist,
        isInWishlist,
        clearCart,
        cartCount,
        wishlistCount,
        cartTotal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
