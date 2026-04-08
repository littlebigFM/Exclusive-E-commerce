import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../Context/AppContext";
import kashcard from "../assets/logo/kashcard.png";
import visacard from "../assets/logo/visacard.png";
import mastercard from "../assets/logo/mastercard.png";
import nonamecard from "../assets/logo/nonamecard.png";
import { checkoutInitialState } from "../Data/FormData";

const CheckoutPage = () => {
  const { cart, cartTotal } = useApp();

  const [formData, setFormData] = useState(checkoutInitialState);

  console.log(formData);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔌 BACKEND: POST /api/orders
    // Send formData + cart + cartTotal to backend
    console.log("Order submitted:", { formData, cart, cartTotal });
    alert("Order placed successfully!");
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
          <Link to="/cart" className="hover:text-black transition-colors">
            Cart
          </Link>
          <span>/</span>
          <span className="text-black">Checkout</span>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="flex flex-col lg:flex-row gap-[40px] lg:gap-[80px] items-start">
            {/* ── Left — Billing Details ── */}
            <div className="w-full lg:w-[60%] flex flex-col gap-[32px]">
              <h2 className="text-[36px] font-medium">Billing Details</h2>

              {/* First Name */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[16px] text-black/60 font-medium">
                  First Name <span className="text-[#DB4444]">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
              </div>

              {/* Company Name */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[16px] text-black/60 font-medium">
                  Company Name
                </label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
              </div>

              {/* Street Address */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[16px] text-black/60 font-medium">
                  Street Address <span className="text-[#DB4444]">*</span>
                </label>
                <input
                  type="text"
                  name="streetAddress"
                  value={formData.streetAddress}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
              </div>

              {/* Apartment */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[16px] text-black/60 font-medium">
                  Apartment, floor, etc. (optional)
                </label>
                <input
                  type="text"
                  name="apartment"
                  value={formData.apartment}
                  onChange={handleChange}
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
              </div>

              {/* Town/City */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[16px] text-black/60 font-medium">
                  Town/City <span className="text-[#DB4444]">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
              </div>

              {/* Phone Number */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[16px] text-black/60 font-medium">
                  Phone Number <span className="text-[#DB4444]">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-[8px]">
                <label className="text-[16px] text-black/60 font-medium">
                  Email Address <span className="text-[#DB4444]">*</span>
                </label>
                <input
                  type="email"
                  name="emailAddress"
                  value={formData.emailAddress}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
              </div>

              {/* Save info checkbox */}
              <div className="flex items-center gap-[16px]">
                <input
                  type="checkbox"
                  name="saveInfo"
                  id="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleChange}
                  className="w-[20px] h-[20px] accent-[#DB4444] cursor-pointer"
                />
                <label
                  htmlFor="saveInfo"
                  className="text-[16px] text-black cursor-pointer"
                >
                  Save this information for faster check-out next time
                </label>
              </div>
            </div>

            {/* ── Right — Order Summary ── */}
            <div className="w-full lg:w-[40%] flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[24px]">
                {cart.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between gap-[16px]"
                  >
                    <div className="flex items-center gap-[16px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-[54px] h-[54px] object-contain"
                      />
                      <p className="text-[16px] text-black">{item.name}</p>
                    </div>
                    <p className="text-[16px] text-black shrink-0">
                      #{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>

              <div className="h-[1px] bg-black/10" />

              <div className="flex items-center justify-between">
                <span className="text-[16px] text-black">Subtotal:</span>
                <span className="text-[16px] text-black">
                  #{cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="h-[1px] bg-black/10" />

              <div className="flex items-center justify-between">
                <span className="text-[16px] text-black">Shipping:</span>
                <span className="text-[16px] text-black">Free</span>
              </div>

              <div className="h-[1px] bg-black/10" />

              <div className="flex items-center justify-between">
                <span className="text-[16px] font-medium text-black">
                  Total:
                </span>
                <span className="text-[16px] font-medium text-black">
                  #{cartTotal.toLocaleString()}
                </span>
              </div>

              <div className="flex flex-col gap-[16px]">
                <label className="flex items-center justify-between cursor-pointer">
                  <div className="flex items-center gap-[16px]">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value="bank"
                      checked={formData.paymentMethod === "bank"}
                      onChange={handleChange}
                      className="w-[16px] h-[16px] accent-[#DB4444]"
                    />
                    <span className="text-[16px] text-black">Bank</span>
                  </div>
                  <div className="flex items-center gap-[8px]">
                    <img src={kashcard} alt="Kashcard" />
                    <img src={visacard} alt="Visa" />
                    <img src={mastercard} alt="Mastercard" />
                    <img src={nonamecard} alt="Nonamecard" />
                  </div>
                </label>

                <label className="flex items-center gap-[16px] cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cash"
                    checked={formData.paymentMethod === "cash"}
                    onChange={handleChange}
                    className="w-[16px] h-[16px] accent-[#DB4444]"
                  />
                  <span className="text-[16px] text-black">
                    Cash on delivery
                  </span>
                </label>
              </div>

              <div className="flex items-center gap-[16px] flex-wrap">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="flex-1 border border-black/20 rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:border-[#DB4444] transition-colors min-w-[160px]"
                />
                <button
                  type="button"
                  className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium px-[32px] py-[14px] rounded-[4px] transition-colors whitespace-nowrap"
                >
                  Apply Coupon
                </button>
              </div>

              <button
                type="submit"
                className="w-full bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium py-[16px] rounded-[4px] transition-colors"
              >
                Place Order
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
