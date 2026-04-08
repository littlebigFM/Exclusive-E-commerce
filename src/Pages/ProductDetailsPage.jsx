import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Truck, RotateCcw, Minus, Plus } from "lucide-react";
import StarRating from "../Components/UI/StarRating";
import { useApp } from "../Context/AppContext";
import { motion } from "framer-motion";
import { getProductById } from "../Services/productService";

// ── Animation Variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeRight = {
  hidden: { opacity: 0, x: 40 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const viewport = { once: true, amount: 0.2 };

const colors = ["#A0BCE0", "#E07575"];
const sizes = ["XS", "S", "M", "L", "XL"];

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart, toggleWishlist, isInWishlist } = useApp();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState(0);
  const [activeThumb, setActiveThumb] = useState(0);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      setFetchError(false);

      if (!id) {
        setLoading(false);
        setFetchError(true);
        return;
      }

      try {
        const response = await getProductById(id);
        // response is { success, message, data }
        // we need response.data for the actual product
        setProduct(response.data);
      } catch (error) {
        console.error("Failed to fetch product:", error);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const inWishlist = product ? isInWishlist(product.id) : false;

  // 🔌 BACKEND: replace with GET /api/products?category_id=${product.category_id}
  const relatedProducts = [];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
  };

  // Product image with fallback
  const productImage = product?.primary_image || "/images/placeholder.png";

  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-[16px]">
          <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
          <p className="text-[16px] text-black/50">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product || fetchError) {
    return (
      <div className="max-w-[1200px] mx-auto px-4 py-[80px] text-center">
        <p className="text-[24px] font-medium text-black">Product not found.</p>
        <Link
          to="/"
          className="inline-block mt-[24px] bg-[#DB4444] hover:bg-[#E07575] text-white px-[48px] py-[16px] rounded-[4px] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-[40px] md:py-[80px]">
        {/* Breadcrumb */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-[8px] text-[14px] text-black/50 mb-[40px] md:mb-[80px] flex-wrap"
        >
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black/50">Category {product.category_id}</span>
          {/* 🔌 BACKEND: replace category_id with category name when API returns it */}
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </motion.div>

        {/* ── Main Content ── */}
        <div className="flex flex-col lg:flex-row gap-[60px] lg:gap-[70px] mb-[80px] md:mb-[140px]">
          {/* ── Left — Images ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col-reverse sm:flex-row gap-[16px]"
          >
            {/* Thumbnails */}
            <div className="flex sm:flex-col flex-row gap-[16px] max-[480px]:hidden">
              {[0, 1, 2, 3].map((i) => (
                <button
                  key={i}
                  onClick={() => setActiveThumb(i)}
                  className={`w-[100px] h-[80px] sm:w-[130px] sm:h-[110px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center shrink-0 transition-all ${
                    activeThumb === i
                      ? "ring-2 ring-[#DB4444]"
                      : "hover:ring-1 hover:ring-black/20"
                  }`}
                >
                  <img
                    src={productImage}
                    alt={product.name}
                    className="w-[70px] h-[70px] object-contain"
                  />
                </button>
              ))}
            </div>

            {/* Main image */}
            <div className="flex-1 bg-[#F5F5F5] rounded-[4px] flex items-center justify-center min-h-[300px] sm:min-h-[500px] p-[24px]">
              <img
                src={productImage}
                alt={product.name}
                className="w-full max-w-[400px] h-[300px] sm:h-[400px] object-contain"
              />
            </div>
          </motion.div>

          {/* ── Right — Product Info ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-[24px] flex-1"
          >
            {/* Name */}
            <h1 className="font-semibold text-[24px] text-black leading-[28px]">
              {product.name}
            </h1>

            {/* Rating + In Stock */}
            <div className="flex items-center gap-[16px] flex-wrap">
              <StarRating
                rating={product.avg_rating || 0}
                reviews={product.review_count || 0}
              />
              <span className="text-[14px] text-[#00FF66]">
                {product.stock_label || "In Stock"}
              </span>
            </div>

            {/* Price */}
            <p className="text-[24px] text-black font-normal">
              ₦{product.price?.toLocaleString()}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-black/10" />

            {/* Description */}
            <p className="text-[14px] text-black/70 leading-[21px]">
              {product.description ||
                product.short_description ||
                "High quality product with premium materials."}
            </p>

            {/* Divider */}
            <div className="h-[1px] bg-black/10" />

            {/* Colors */}
            <div className="flex items-center gap-[24px]">
              <span className="text-[16px] text-black font-medium">
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
                        : "hover:ring-1 hover:ring-offset-1 hover:ring-black/50"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="flex items-center gap-[24px] flex-wrap">
              <span className="text-[16px] text-black font-medium">Size:</span>
              <div className="flex gap-[8px] flex-wrap">
                {sizes.map((size, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedSize(i)}
                    className={`w-[40px] h-[40px] text-[14px] border rounded-[4px] transition-colors ${
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
            <div className="flex items-center gap-[16px] flex-wrap">
              {/* Quantity */}
              <div className="flex items-center border border-black/20 rounded-[4px] overflow-hidden h-[44px]">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-[12px] h-full hover:bg-[#DB4444] hover:text-white transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="px-[20px] text-[16px] font-medium border-x border-black/20 h-full flex items-center min-w-[50px] justify-center">
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
                className="flex-1 h-[44px] bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium rounded-[4px] transition-colors min-w-[140px]"
              >
                Add To Cart
              </button>

              {/* Wishlist */}
              <button
                onClick={() => toggleWishlist(product)}
                className={`w-[44px] h-[44px] border rounded-[4px] flex items-center justify-center transition-colors shrink-0 ${
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

            {/* Delivery Info */}
            <div className="border border-black/20 rounded-[4px] overflow-hidden mt-[8px]">
              {/* Free Delivery */}
              <div className="flex items-start gap-[16px] p-[20px] border-b border-black/20">
                <Truck size={36} className="shrink-0 text-black mt-[2px]" />
                <div className="flex flex-col gap-[4px]">
                  <p className="text-[16px] font-medium text-black">
                    Free Delivery
                  </p>
                  <p className="text-[12px] text-black underline underline-offset-2 cursor-pointer">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </div>

              {/* Return Delivery */}
              <div className="flex items-start gap-[16px] p-[20px]">
                <RotateCcw size={36} className="shrink-0 text-black mt-[2px]" />
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
          </motion.div>
        </div>

        {/* ── Related Products ── */}
        {/* 🔌 BACKEND: GET /api/products?category_id=${product.category_id} */}
        {relatedProducts.length > 0 && (
          <motion.section
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
          >
            <div className="flex items-center gap-[16px] mb-[24px]">
              <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
              <span className="text-[#DB4444] font-semibold text-[16px]">
                Related Item
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-[30px]">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailsPage;
