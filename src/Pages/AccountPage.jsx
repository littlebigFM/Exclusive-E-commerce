import React, { useState } from "react";
import { Link } from "react-router-dom";
import { accountInitialState } from "../Data/FormData";

const sidebarLinks = [
  {
    heading: "Manage My Account",
    links: ["My Profile", "Address Book", "My Payment Options"],
  },
  {
    heading: "My Orders",
    links: ["My Returns", "My Cancellations"],
  },
  {
    heading: "My Wishlist",
    links: [],
  },
];

const AccountPage = () => {
  const [activeLink, setActiveLink] = useState("My Profile");
  const [formData, setFormData] = useState(accountInitialState);
  const [passwordVisible, setPasswordVisible] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔌 BACKEND: PUT /api/auth/update
    console.log("Profile updated:", formData);
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-[40px] md:py-[80px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-[8px] text-[14px] text-black/50 mb-[40px] md:mb-[80px]">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">My Account</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-start">
          {/* ── Left — Sidebar ── */}
          <aside className="w-full lg:w-[220px] shrink-0 flex flex-col gap-[32px]">
            {sidebarLinks.map((section) => (
              <div key={section.heading} className="flex flex-col gap-[16px]">
                {/* Section heading */}
                <p className="text-[16px] font-bold text-black">
                  {section.heading}
                </p>

                {/* Section links */}
                <div className="flex flex-col gap-[12px]">
                  {section.links.map((link) => (
                    <button
                      key={link}
                      onClick={() => setActiveLink(link)}
                      className={`text-left text-[16px] transition-colors ${
                        activeLink === link
                          ? "text-[#DB4444] font-medium"
                          : "text-black/60 hover:text-black"
                      }`}
                    >
                      {link}
                    </button>
                  ))}

                  {/* My Wishlist is a direct link */}
                  {section.heading === "My Wishlist" && (
                    <Link
                      to="/wishlist"
                      className="text-left text-[16px] text-black/60 hover:text-[#DB4444] transition-colors"
                    >
                      My Wishlist
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </aside>

          {/* ── Right — Content ── */}
          <div className="flex-1 w-full">
            {/* My Profile */}
            {activeLink === "My Profile" && (
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-[24px]"
              >
                <h2 className="text-[20px] font-medium text-[#DB4444]">
                  Edit Your Profile
                </h2>

                {/* Name row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[16px] text-black font-medium">
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="Tobi"
                      className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[16px] text-black font-medium">
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Daniel"
                      className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-[24px]">
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[16px] text-black font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="TobiDaniel@gmail.com"
                      className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                    />
                  </div>

                  {/* Address */}
                  <div className="flex flex-col gap-[8px]">
                    <label className="text-[16px] text-black font-medium">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="Kingston, 5236, United State"
                      className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                    />
                  </div>
                </div>

                {/* Password section */}
                <p className="text-[16px] font-medium text-black">
                  Password Changes
                </p>

                {/* Current Password */}
                <div className="flex flex-col gap-[8px]">
                  <div className="relative">
                    <input
                      type={passwordVisible.current ? "text" : "password"}
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleChange}
                      placeholder="Current Password"
                      className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all pr-[48px]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPasswordVisible((p) => ({
                          ...p,
                          current: !p.current,
                        }))
                      }
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors text-[12px]"
                    >
                      {passwordVisible.current ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div className="flex flex-col gap-[8px]">
                  <div className="relative">
                    <input
                      type={passwordVisible.new ? "text" : "password"}
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      placeholder="New Password"
                      className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all pr-[48px]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPasswordVisible((p) => ({ ...p, new: !p.new }))
                      }
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors text-[12px]"
                    >
                      {passwordVisible.new ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div className="flex flex-col gap-[8px]">
                  <div className="relative">
                    <input
                      type={passwordVisible.confirm ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm New Password"
                      className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all pr-[48px]"
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setPasswordVisible((p) => ({
                          ...p,
                          confirm: !p.confirm,
                        }))
                      }
                      className="absolute right-[16px] top-1/2 -translate-y-1/2 text-black/50 hover:text-black transition-colors text-[12px]"
                    >
                      {passwordVisible.confirm ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex items-center justify-end gap-[16px] flex-wrap">
                  <button
                    type="button"
                    onClick={() => setFormData(accountInitialState)}
                    className="text-[16px] text-black hover:text-[#DB4444] transition-colors px-[32px] py-[14px]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium px-[32px] py-[14px] rounded-[4px] transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            )}

            {/* Address Book */}
            {activeLink === "Address Book" && (
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[20px] font-medium text-[#DB4444]">
                  Address Book
                </h2>
                <p className="text-[16px] text-black/60">
                  No saved addresses yet.
                </p>
                {/* 🔌 BACKEND: GET /api/auth/addresses */}
              </div>
            )}

            {/* My Payment Options */}
            {activeLink === "My Payment Options" && (
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[20px] font-medium text-[#DB4444]">
                  My Payment Options
                </h2>
                <p className="text-[16px] text-black/60">
                  No saved payment methods yet.
                </p>
                {/* 🔌 BACKEND: GET /api/auth/payment-methods */}
              </div>
            )}

            {/* My Returns */}
            {activeLink === "My Returns" && (
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[20px] font-medium text-[#DB4444]">
                  My Returns
                </h2>
                <p className="text-[16px] text-black/60">
                  No return requests yet.
                </p>
                {/* 🔌 BACKEND: GET /api/orders/returns */}
              </div>
            )}

            {/* My Cancellations */}
            {activeLink === "My Cancellations" && (
              <div className="flex flex-col gap-[24px]">
                <h2 className="text-[20px] font-medium text-[#DB4444]">
                  My Cancellations
                </h2>
                <p className="text-[16px] text-black/60">
                  No cancelled orders yet.
                </p>
                {/* 🔌 BACKEND: GET /api/orders/cancellations */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
