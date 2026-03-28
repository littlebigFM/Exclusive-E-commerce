import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../Context/AppContext";
// import { useApp } from "../Context/AppContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useApp();

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-[40px] md:py-[80px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-[8px] text-[14px] text-black/50 mb-[40px] md:mb-[80px]">
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">Cart</span>
        </div>

        {cart.length === 0 ? (
          /* ── Empty Cart ── */
          <div className="flex flex-col items-center justify-center gap-[24px] py-[80px]">
            <p className="text-[20px] md:text-[24px] font-medium text-black">
              Your cart is empty
            </p>
            <Link
              to="/"
              className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium px-[48px] py-[16px] rounded-[4px] transition-colors"
            >
              Return To Shop
            </Link>
          </div>
        ) : (
          <>
            {/* ── Cart Table — Desktop ── */}
            <div className="hidden md:flex flex-col gap-[32px]">
              {/* Table header */}
              <div className="grid grid-cols-4 items-center bg-white shadow-sm rounded-[4px] px-[40px] py-[24px]">
                <p className="text-[16px] font-medium text-black">Product</p>
                <p className="text-[16px] font-medium text-black text-center">
                  Price
                </p>
                <p className="text-[16px] font-medium text-black text-center">
                  Quantity
                </p>
                <p className="text-[16px] font-medium text-black text-end">
                  Subtotal
                </p>
              </div>

              {/* Cart items */}
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 items-center bg-white shadow-sm rounded-[4px] px-[40px] py-[24px]"
                >
                  {/* Product */}
                  <div className="flex items-center gap-[20px]">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="w-[20px] h-[20px] rounded-full bg-[#DB4444] text-white text-[12px] flex items-center justify-center hover:bg-[#E07575] transition-colors shrink-0"
                    >
                      ✕
                    </button>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-[50px] h-[50px] object-contain"
                    />
                    <p className="text-[16px] text-black">{item.name}</p>
                  </div>

                  {/* Price */}
                  <p className="text-[16px] text-black text-center">
                    ${item.price}
                  </p>

                  {/* Quantity */}
                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-black/20 rounded-[4px] overflow-hidden">
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="px-[12px] py-[8px] hover:bg-[#DB4444] hover:text-white transition-colors text-[16px]"
                      >
                        -
                      </button>
                      <span className="px-[20px] py-[8px] text-[16px] border-x border-black/20 min-w-[50px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="px-[12px] py-[8px] hover:bg-[#DB4444] hover:text-white transition-colors text-[16px]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <p className="text-[16px] font-medium text-black text-end">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* ── Cart Items — Mobile ── */}
            <div className="flex md:hidden flex-col gap-[16px]">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start gap-[16px] bg-white shadow-sm rounded-[4px] p-[16px]"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-[70px] h-[70px] object-contain shrink-0"
                  />

                  {/* Info */}
                  <div className="flex flex-col gap-[8px] flex-1">
                    <div className="flex items-start justify-between">
                      <p className="text-[14px] font-medium text-black">
                        {item.name}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="w-[20px] h-[20px] rounded-full bg-[#DB4444] text-white text-[12px] flex items-center justify-center hover:bg-[#E07575] transition-colors shrink-0 ml-[8px]"
                      >
                        ✕
                      </button>
                    </div>
                    <p className="text-[14px] text-[#DB4444] font-medium">
                      ${item.price}
                    </p>

                    {/* Quantity + Subtotal row */}
                    <div className="flex items-center justify-between mt-[4px]">
                      <div className="flex items-center border border-black/20 rounded-[4px] overflow-hidden">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="px-[10px] py-[6px] hover:bg-[#DB4444] hover:text-white transition-colors text-[14px]"
                        >
                          -
                        </button>
                        <span className="px-[14px] py-[6px] text-[14px] border-x border-black/20 min-w-[36px] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="px-[10px] py-[6px] hover:bg-[#DB4444] hover:text-white transition-colors text-[14px]"
                        >
                          +
                        </button>
                      </div>
                      <p className="text-[14px] font-medium text-black">
                        ${(item.price * item.quantity).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* ── Action Buttons ── */}
            <div className="flex items-center justify-between mt-[32px] gap-[16px] flex-wrap">
              <Link
                to="/"
                className="border border-black/20 text-black text-[14px] md:text-[16px] font-medium px-[24px] md:px-[48px] py-[12px] md:py-[16px] rounded-[4px] hover:border-[#DB4444] hover:text-[#DB4444] transition-colors"
              >
                Return To Shop
              </Link>
              <button className="border border-black/20 text-black text-[14px] md:text-[16px] font-medium px-[24px] md:px-[48px] py-[12px] md:py-[16px] rounded-[4px] hover:border-[#DB4444] hover:text-[#DB4444] transition-colors">
                Update Cart
              </button>
            </div>

            {/* ── Bottom Section ── */}
            <div className="flex flex-col lg:flex-row items-start justify-between mt-[60px] md:mt-[80px] gap-[40px]">
              {/* Coupon code */}
              <div className="flex items-center gap-[16px] w-full lg:w-auto flex-wrap">
                <input
                  type="text"
                  placeholder="Coupon Code"
                  className="border border-black/20 rounded-[4px] px-[24px] py-[16px] text-[16px] outline-none focus:border-[#DB4444] transition-colors w-full sm:w-[300px]"
                />
                <button className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium px-[48px] py-[16px] rounded-[4px] transition-colors whitespace-nowrap w-full sm:w-auto">
                  Apply Coupon
                </button>
              </div>

              {/* Cart Total */}
              <div className="border border-black/20 rounded-[4px] p-[24px] md:p-[32px] w-full lg:w-[470px] flex flex-col gap-[16px]">
                <h3 className="text-[20px] font-medium text-black">
                  Cart Total
                </h3>

                {/* Subtotal */}
                <div className="flex items-center justify-between py-[16px] border-b border-black/10">
                  <span className="text-[16px] text-black">Subtotal:</span>
                  <span className="text-[16px] text-black">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>

                {/* Shipping */}
                <div className="flex items-center justify-between py-[16px] border-b border-black/10">
                  <span className="text-[16px] text-black">Shipping:</span>
                  <span className="text-[16px] text-black">Free</span>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-[16px]">
                  <span className="text-[16px] text-black">Total:</span>
                  <span className="text-[16px] font-medium text-black">
                    ${cartTotal.toLocaleString()}
                  </span>
                </div>

                {/* Checkout button */}
                <Link
                  to="/checkout"
                  className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium px-[48px] py-[16px] rounded-[4px] transition-colors text-center mt-[8px]"
                >
                  Proceed To Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartPage;
