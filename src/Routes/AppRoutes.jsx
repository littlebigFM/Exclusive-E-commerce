import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "../Pages/HomePage";
import CartPage from "../Pages/CartPage";
import WishlistPage from "../Pages/WishlistPage";
import AccountPage from "../Pages/AccountPage";
import ContactPage from "../Pages/ContactPage";
import AboutPage from "../Pages/AboutPage";
import SignUpPage from "../Pages/SignUpPage";
import LoginPage from "../Pages/LoginPage";
import CheckoutPage from "../Pages/CheckoutPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import PrivacyPolicyPage from "../Pages/PrivacyPolicyPage";
import TermsOfUsePage from "../Pages/TermsOfUsePage";
import FAQPage from "../Pages/FAQPage";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/wishlist" element={<WishlistPage />} />
      {/* <Route path="/account" element={<AccountPage />} /> */}
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
      <Route path="/terms-of-use" element={<TermsOfUsePage />} />
      <Route path="/faq" element={<FAQPage />} />
      <Route path="/sign-up" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      {/* <Route path="/checkout" element={<CheckoutPage />} /> */}
      <Route path="/product/:id" element={<ProductDetailsPage />} />
      {/* <Route path="/success" element={<SuccessPage */}

      {/* Protected Routes */}
      <Route
        path="/checkout"
        element={
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
