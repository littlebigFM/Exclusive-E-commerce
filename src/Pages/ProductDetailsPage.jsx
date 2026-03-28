import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, Truck, RotateCcw, Minus, Plus } from "lucide-react";
// import { useApp } from "../Context/AppContext";
// import StarRating from "../Components/ui/StarRating";
import { flashSaleProducts, bestSellingProducts } from "../Data/Product.js";
import StarRating from "../Components/UI/StarRating";
import { useApp } from "../Context/AppContext";

// 🔌 BACKEND: replace with GET /api/products/:id
const allProducts = [...flashSaleProducts, ...bestSellingProducts];

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  // 🔌 BACKEND: replace with API call using id
  const product = allProducts.find((p) => p.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);

  const colors = ["#A0BCE0", "#E07575"];
  const sizes = ["XS", "S", "M", "L", "XL"];
  const inWishlist = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-[80px] text-center">
        <p className="text-[24px] font-medium text-black">Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1200px] mx-auto px-4 py-[80px]">
        {/* Breadcrumb */}
        <div className="flex items-center gap-[8px] text-[14px] text-black/50 mb-[80px]">
          <a href="/" className="hover:text-black transition-colors">
            Account
          </a>
          <span>/</span>
          <a href="/" className="hover:text-black transition-colors">
            Gaming
          </a>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </div>

        {/* Main content */}
        <div className="flex gap-[70px]">
          {/* ── Left — Images ── */}
          <div className="flex gap-[16px]">
            {/* Thumbnail column */}
            <div className="flex flex-col gap-[16px]">
              {[1, 2, 3, 4].map((_, i) => (
                <div
                  key={i}
                  className="w-[170px] h-[138px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center cursor-pointer hover:border hover:border-[#DB4444] transition-all"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-[80px] h-[80px] object-contain"
                  />
                </div>
              ))}
            </div>

            {/* Main image */}
            <div className="w-[500px] h-[600px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="w-[400px] h-[400px] object-contain"
              />
            </div>
          </div>

          {/* ── Right — Product Info ── */}
          <div className="flex flex-col gap-[24px] flex-1">
            {/* Name */}
            <h1 className="font-semibold text-[24px] text-black leading-[28px]">
              {product.name}
            </h1>

            {/* Rating + reviews + in stock */}
            <div className="flex items-center gap-[16px]">
              <StarRating rating={product.rating} reviews={product.reviews} />
              <span className="text-[14px] text-[#00FF66]">In Stock</span>
            </div>

            {/* Price */}
            <p className="text-[24px] text-black font-normal">
              ${product.price}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-black/10" />

            {/* Description */}
            <p className="text-[14px] text-black leading-[21px]">
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal.
              Pressure sensitive.
              {/* 🔌 BACKEND: replace with product.description from API */}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-black/10" />

            {/* Colors */}
            <div className="flex items-center gap-[24px]">
              <span className="text-[20px] text-black font-medium">
                Colours:
              </span>
              <div className="flex gap-[8px]">
                {colors.map((color, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedColor(i)}
                    className={`w-[20px] h-[20px] rounded-full transition-all ${
                      selectedColor === i
                        ? "ring-2 ring-offset-2 ring-black"
                        : ""
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-[24px]">
              <span className="text-[20px] text-black font-medium">Size:</span>
              <div className="flex gap-[8px]">
                {sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(i)}
                    className={`w-[32px] h-[32px] text-[14px] border rounded-[4px] transition-colors ${
                      selectedSize === i
                        ? "bg-[#DB4444] text-white border-[#DB4444]"
                        : "bg-white text-black border-black/20 hover:border-[#DB4444]"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity + Add to Cart + Wishlist */}
            <div className="flex items-center gap-[16px]">
              {/* Quantity selector */}
              <div className="flex items-center border border-black/20 rounded-[4px] overflow-hidden h-[44px]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-[12px] h-full hover:bg-[#DB4444] hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-[24px] text-[16px] font-medium border-x border-black/20">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-[12px] h-full bg-[#DB4444] text-white hover:bg-[#E07575] transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-[44px] bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium rounded-[4px] transition-colors"
              >
                Add To Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-[44px] h-[44px] border rounded-[4px] flex items-center justify-center transition-colors ${
                  inWishlist
                    ? "bg-[#DB4444] border-[#DB4444]"
                    : "border-black/20 hover:border-[#DB4444]"
                }`}
              >
                <Heart
                  size={20}
                  className={
                    inWishlist ? "fill-white text-white" : "text-black"
                  }
                />
              </button>
            </div>

            {/* Delivery info */}
            <div className="border border-black/20 rounded-[4px] overflow-hidden">
              {/* Free Delivery */}
              <div className="flex items-start gap-[16px] p-[24px] border-b border-black/20">
                <Truck size={40} className="shrink-0 text-black" />
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[16px] font-medium text-black">
                    Free Delivery
                  </p>
                  <p className="text-[12px] text-black underline underline-offset-2">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>

              {/* Return Delivery */}
              <div className="flex items-start gap-[16px] p-[24px]">
                <RotateCcw size={40} className="shrink-0 text-black" />
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[16px] font-medium text-black">
                    Return Delivery
                  </p>
                  <p className="text-[12px] text-black">
                    Free 30 Days Delivery Returns.{" "}
                    <span className="underline underline-offset-2 cursor-pointer">
                      Details
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
