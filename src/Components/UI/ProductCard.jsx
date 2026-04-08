import React, { useState } from "react";
import { Eye, Heart } from "lucide-react";
import StarRating from "./StarRating";
import { useApp } from "../../Context/AppContext";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useApp();
  const [hovered, setHovered] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const image =
    product.primary_image || product.image || "/images/placeholder.png";
  const originalPrice = product.compare_price || product.originalPrice;
  const discount = product.discount_percent || product.discount;
  const rating = product.avg_rating || product.rating || 0;
  const reviews = product.review_count || product.reviews || 0;

  return (
    <div
      className=" w-[full] flex flex-col gap-[16px] cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] w-[270px] max-[850px]:w-full overflow-hidden flex items-center justify-center">
        {discount > 0 && (
          <div className="absolute top-[12px] left-[12px] bg-[#DB4444] text-white text-[12px] font-normal leading-[18px] px-[12px] py-[4px] rounded-[4px] z-10">
            -{discount}%
          </div>
        )}

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

          {/* <button></button> */}

          <Link
            to={`/product/${product.id}`}
            className="w-[34px] h-[34px] bg-white rounded-full flex items-center justify-center shadow-sm hover:bg-[#DB4444] group/eye transition-colors"
          >
            <Eye
              size={16}
              className="text-black group-hover/eye:text-white transition-colors"
            />
          </Link>
        </div>

        <Link
          to={`/product/${product.id}`}
          className="flex items-center justify-center w-full h-full"
        >
          <img
            src={image}
            alt={product.name}
            className="h-[180px] w-[190px] object-contain"
          />
        </Link>

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
        <Link
          to={`/product/${product.id}`}
          className="text-[16px] font-medium text-black leading-[24px] hover:text-[#DB4444] transition-colors"
        >
          <p
          // className="text-[16px] font-medium text-black leading-[24px]"
          >
            {product.name}
          </p>
        </Link>

        <div className="flex items-center gap-[12px] text-[16px] font-medium leading-[24px]">
          <span className="text-[#DB4444]">
            #{product.price?.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-[#888888] line-through">
              #{originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        <StarRating rating={rating} reviews={reviews} />
      </div>
    </div>
  );
};

export default ProductCard;
