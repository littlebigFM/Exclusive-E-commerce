import React, { useState } from "react";
import { Eye, Heart } from "lucide-react";
import StarRating from "./StarRating";
import { useApp } from "../../Context/AppContext";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [hovered, setHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  return (
    <div
      className=" w-[full] flex flex-col gap-[16px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] w-[270px] max-[850px]:w-full overflow-hidden flex items-center justify-center">
        <div className="absolute top-[12px] left-[12px] bg-[#DB4444] text-white text-[12px] font-normal leading-[18px] px-[12px] py-[4px] rounded-[4px] z-10">
          -{product.discount}%
        </div>

        <div className="absolute top-[12px] right-[12px] flex flex-col gap-[8px] z-10">
          <button
            onClick={() => toggleWishlist(product)}
            className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#DB4444] group/wish transition-colors"
          >
            <Heart
              size={16}
              className={`transition-colors ${
                inWishlist
                  ? "fill-[#DB4444] text-[#DB4444]"
                  : "text-black group-hover/wish:text-white"
              }`}
            />
          </button>

          <button className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#DB4444] group/eye transition-colors">
            <Eye
              size={16}
              className="text-black group-hover/eye:text-white transition-colors"
            />
          </button>
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="h-[180px] w-[190px] object-contain"
        />

        <button
          onClick={() => addToCart(product)}
          className={`absolute bottom-0 left-0 right-0 bg-black text-white text-[16px] font-medium leading-[24px] h-[41px] flex items-center justify-center transition-all duration-300 hover:bg-[#DB4444] ${
            hovered ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
          }`}
        >
          Add To Cart
        </button>
      </div>

      <div className="flex flex-col gap-[8px]">
        <p className="text-[16px] font-medium text-black leading-[24px]">
          {product.name}
        </p>

        <div className="flex items-center gap-[12px] text-[16px] font-medium leading-[24px]">
          <span className="text-[#DB4444]">${product.price}</span>
          <span className="text-black opacity-50 line-through">
            ${product.originalPrice}
          </span>
        </div>

        <StarRating rating={product.rating} reviews={product.reviews} />
      </div>
    </div>
  );
};

export default ProductCard;
