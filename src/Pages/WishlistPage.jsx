import React from "react";
import { useApp } from "../Context/AppContext";
import ProductCard from "../Components/UI/ProductCard";
import { Link } from "react-router-dom";

const WishlistPage = () => {
  const { wishlist, wishlistCount, addToCart } = useApp();

  const handleMoveAllToCart = () => {
    wishlist.forEach((product) => addToCart(product));
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
          <span className="text-black">Wishlist</span>
        </div>

        {wishlist.length === 0 ? (
          /* ── Empty Wishlist ── */
          <div className="flex flex-col items-center justify-center gap-[24px] py-[80px]">
            <p className="text-[20px] md:text-[24px] font-medium text-black">
              Your wishlist is empty
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
            {/* ── Header row ── */}
            <div className="flex items-center justify-between mb-[60px] flex-wrap gap-[16px]">
              <h2 className="text-[20px] font-medium text-black">
                Wishlist ({wishlistCount})
              </h2>
              <button
                onClick={handleMoveAllToCart}
                className="border border-black/20 text-black text-[16px] font-medium px-[48px] py-[16px] rounded-[4px] hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-colors"
              >
                Move All To Bag
              </button>
            </div>

            {/* ── Wishlist Products Grid ── */}
            <div
              className="
            mt-[40px]
            w-full 
          gap-[30px]
          grid 
          grid-cols-4
          max-[1250px]:grid
          max-[1250px]:gap-[20px]
          max-[1125px]:grid-cols-3
          max-[850px]:grid-cols-2
          max-[500px]:grid-cols-1
            
            "
            >
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
