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
  Settings,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const Navbar = () => {
  const { cartCount, wishlistCount } = useApp();
  const [menuOpen, setMenuOpen] = useState(false);
  const [accountModal, setAccountModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, logout, isLoggedIn } = useAuth();

  const navLinks = ["Home", "Contact", "About"];

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

      <header className="w-full border-b border-black/10 bg-white sticky top-0 z-50">
        <div className="max-w-[1440px] mx-auto px-4 h-[80px] flex items-center justify-between gap-8 max-[890px]:gap-4">
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

            {isLoggedIn ? (
              <div className="flex items-center gap-[12px] relative">
                <button
                  onClick={() => setAccountModal(!accountModal)}
                  className="p-1 cursor-pointer"
                >
                  <User
                    size={22}
                    className="text-black hover:text-[#DB4444] transition-colors"
                  />
                </button>

                {/* Animated Account Dropdown */}
                <AnimatePresence>
                  {accountModal && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="
                        w-[220px] 
                        flex flex-col
                        gap-3 p-4
                        rounded-[4px]
                        bg-gradient-to-b from-black to-black-700/100 backdrop-blur-[150px] shadow-lg
                        absolute top-full right-0 mt-2
                        z-50
                      "
                    >
                      <Link
                        to="/account"
                        onClick={() => setAccountModal(false)}
                        className="
                          flex items-center gap-3
                          py-2
                          rounded-[4px]
                          text-[14px] text-white
                          transition-colors
                        "
                      >
                        <Settings size={18} className="text-white" />
                        <span>Manage My Account</span>
                      </Link>

                      <button
                        onClick={() => {
                          logout();
                          setAccountModal(false);
                        }}
                        className="
                          flex items-center gap-3
                          py-2
                          rounded-[4px]
                          text-[14px] text-white
                          transition-colors
                          w-full text-left
                          cursor-pointer
                        "
                      >
                        <LogOut size={18} className="text-white" />
                        <span>Logout</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
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
                        {/* {user?.first_name} */}
                        <User size={23} />
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
