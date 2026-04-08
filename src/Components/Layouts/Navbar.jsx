import React, { useState } from "react";
import { useApp } from "../../Context/AppContext";
import {
  Search,
  Heart,
  ShoppingCart,
  User,
  Menu,
  X,
  LogOut,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const { cartCount, wishlistCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isLoggedIn } = useAuth();

  const navLinks = ["Home", "Contact", "About"];
  // Removed "Sign Up" from navLinks because once a user is logged in
  // we don't want to show Sign Up anymore — we show their name instead

  return (
    <div>
      {/* ── Top announcement bar ── */}
      <nav className="flex gap-2 items-center justify-center bg-black py-[8px] text-[#FAFAFA] font-regular text-[9px] min-[600px]:text-[12px] min-[800px]:text-[14px]">
        <p>
          Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%!
        </p>
        {/* <Link
          className="text-[16px] font-medium underline underline-offset-4 hover:text-[#DB4444] transition-colors w-fit"
          to="/"
        >
          Shop now
        </Link> */}
      </nav>

      {/* ── Main header ── */}
      <header className="w-full border-b border-black/10 bg-white sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-[80px] flex items-center justify-between gap-8 max-[890px]:gap-4">
          {/* Logo */}
          <Link to="/" className="font-bold text-[24px] text-black shrink-0">
            Exclusive
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 max-[890px]:gap-4">
            {navLinks.map((link) => (
              <Link
                key={link}
                to={
                  link === "Home"
                    ? "/"
                    : `/${link.toLowerCase().replace(" ", "-")}`
                }
                className="text-[16px] text-black hover:text-[#DB4444] transition-colors relative group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300" />
              </Link>
            ))}

            {/* Show Sign Up link only when NOT logged in */}
            {!isLoggedIn && (
              <Link
                to="/sign-up"
                className="text-[16px] text-black hover:text-[#DB4444] transition-colors relative group"
              >
                Sign Up
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-black group-hover:w-full transition-all duration-300" />
              </Link>
            )}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center gap-4 max-[890px]:gap-2">
            {/* Search Bar */}
            <div className="flex items-center bg-[#F5F5F5] rounded-[4px] px-4 h-[38px] gap-2 w-[243px]">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="What are you looking for?"
                className="bg-transparent flex-1 text-[12px] text-black placeholder:text-black/50 outline-none"
              />
              <Search
                size={20}
                className="text-black shrink-0 cursor-pointer"
              />
            </div>

            {/* Wishlist */}
            <Link to="/wishlist" className="relative p-1">
              <Heart
                size={22}
                className="text-black hover:text-[#DB4444] transition-colors"
              />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DB4444] text-white text-[10px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link to="/cart" className="relative p-1">
              <ShoppingCart
                size={22}
                className="text-black hover:text-[#DB4444] transition-colors"
              />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#DB4444] text-white text-[10px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User section — shows differently based on login status */}
            {isLoggedIn ? (
              // Logged in — show first name + logout button
              <div className="flex items-center gap-[12px]">
                <Link
                  to="/account"
                  className="text-[14px] font-medium text-black hover:text-[#DB4444] transition-colors"
                >
                  {user?.first_name}
                </Link>
                <button
                  onClick={logout}
                  title="Logout"
                  className="p-1 cursor-pointer"
                >
                  <LogOut
                    size={20}
                    className="text-black hover:text-[#DB4444] transition-colors"
                  />
                </button>
              </div>
            ) : (
              // Not logged in — show user icon linking to login
              <Link to="/login" className="relative p-1">
                <User
                  size={22}
                  className="text-black hover:text-[#DB4444] transition-colors"
                />
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-1 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white border-t border-black/10 overflow-hidden"
            >
              <div className="px-4 py-4 flex flex-col gap-4">
                {/* Nav links */}
                {navLinks.map((link) => (
                  <Link
                    key={link}
                    to={
                      link === "Home"
                        ? "/"
                        : `/${link.toLowerCase().replace(" ", "-")}`
                    }
                    onClick={() => setMenuOpen(false)}
                    className="text-[16px] text-black hover:text-[#DB4444] transition-colors"
                  >
                    {link}
                  </Link>
                ))}

                {/* Show Sign Up only when not logged in */}
                {!isLoggedIn && (
                  <Link
                    to="/sign-up"
                    onClick={() => setMenuOpen(false)}
                    className="text-[16px] text-black hover:text-[#DB4444] transition-colors"
                  >
                    Sign Up
                  </Link>
                )}

                {/* Search */}
                <div className="flex items-center bg-[#F5F5F5] rounded-[4px] px-4 h-[38px] gap-2">
                  <input
                    type="text"
                    placeholder="What are you looking for?"
                    className="bg-transparent flex-1 text-[12px] outline-none"
                  />
                  <Search size={18} />
                </div>

                {/* Icons row */}
                <div className="flex items-center gap-4 pt-2">
                  <Link
                    to="/wishlist"
                    className="relative"
                    onClick={() => setMenuOpen(false)}
                  >
                    <Heart size={22} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#DB4444] text-white text-[10px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/cart"
                    className="relative"
                    onClick={() => setMenuOpen(false)}
                  >
                    <ShoppingCart size={22} />
                    {cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-[#DB4444] text-white text-[10px] font-bold rounded-full w-[16px] h-[16px] flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  {/* Mobile user section */}
                  {isLoggedIn ? (
                    <div className="flex items-center gap-[12px]">
                      <Link
                        to="/account"
                        onClick={() => setMenuOpen(false)}
                        className="text-[14px] font-medium text-black hover:text-[#DB4444] transition-colors"
                      >
                        {user?.first_name}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setMenuOpen(false);
                        }}
                        className="cursor-pointer"
                      >
                        <LogOut
                          size={20}
                          className="text-black hover:text-[#DB4444] transition-colors"
                        />
                      </button>
                    </div>
                  ) : (
                    <Link to="/login" onClick={() => setMenuOpen(false)}>
                      <User size={22} />
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

export default Navbar;
