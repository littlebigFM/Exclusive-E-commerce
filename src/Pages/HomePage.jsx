import React, { useEffect, useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../Components/UI/SectionHeader";
import ProductCard from "../Components/UI/ProductCard";
import FlashSaleTimer from "../Components/UI/FlashSaleTimer";
import iphone from "../assets/iphone.png";
import { DiApple } from "react-icons/di";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { sidebarCategories, browseCategories } from "../Data/Categories";
import ServicesStrip from "../Components/UI/ServiceTrip/ServicesStrip";
import { getProducts } from "../Services/productService";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [flashIndex, setFlashIndex] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await getProducts();
        setProducts(response.data);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Split products from real API
  const flashProducts = products.filter((p) => p.is_flash === true);
  const regularProducts = products.filter((p) => p.is_flash === false);

  // Paginate flash products
  const productsPerPage = 4;
  const visibleFlash = flashProducts.slice(
    flashIndex * productsPerPage,
    flashIndex * productsPerPage + productsPerPage,
  );
  // Math.max(0, ...) prevents -1 when flashProducts is empty
  const maxFlashIndex = Math.max(
    0,
    Math.ceil(flashProducts.length / productsPerPage) - 1,
  );

  // Loading state
  if (loading) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-[16px]">
          <div className="w-[40px] h-[40px] border-4 border-[#DB4444] border-t-transparent rounded-full animate-spin" />
          <p className="text-[16px] text-black/50">Loading products...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="w-full flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-[16px]">
          <p className="text-[16px] text-[#DB4444]">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-[#DB4444] text-white px-[32px] py-[12px] rounded-[4px] hover:bg-[#E07575] transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-white">
      {/* ── Hero Banner + Sidebar ── */}
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[px] flex gap-[40px]">
          <aside className="py-[40px] hidden lg:flex flex-col w-[200px] shrink-0 border-r border-black/10 pr-[24px] gap-[4px]">
            {sidebarCategories.map((cat) => (
              <a
                key={cat}
                href="#"
                className="flex items-center justify-between py-[10px] text-[16px] text-black hover:text-[#DB4444] transition-colors group"
              >
                <span>{cat}</span>
                <ChevronRight
                  size={16}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                />
              </a>
            ))}
          </aside>

          <div className="flex-1 bg-black rounded-[4px] relative overflow-hidden min-h-[344px] flex items-center px-[60px] my-[40px] max-[690px]:px-[20px]">
            <div className="flex flex-col gap-[16px] z-10 max-w-[300px]">
              <div className="flex items-center gap-[10px]">
                <DiApple className="w-[40px] h-[40px] object-contain text-white" />
                <span className="text-white/70 text-[16px]">
                  iPhone 14 Series
                </span>
              </div>
              <h1 className="text-white font-semibold text-[48px] leading-[56px]">
                Up to 10%
                <br />
                off Voucher
              </h1>
              <a
                href="#"
                className="flex items-center gap-[8px] text-white text-[16px] font-medium underline underline-offset-4 hover:text-[#DB4444] transition-colors w-fit"
              >
                Shop Now <ArrowRight size={16} />
              </a>
            </div>
            <img
              src={iphone}
              alt="iPhone"
              className="absolute right-[40px] top-15 h-[300px] object-contain max-[690px]:hidden"
            />
            <div className="absolute bottom-[16px] left-1/2 -translate-x-1/2 flex gap-[8px]">
              {[0, 1, 2, 4, 5].map((dot) => (
                <button
                  key={dot}
                  className={`w-[10px] h-[10px] rounded-full transition-colors ${
                    dot === 0 ? "bg-[#DB4444]" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Flash Sales ── */}
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <div className="flex items-end justify-between mb-[40px]">
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center gap-[16px]">
                <span className="text-[#DB4444] font-semibold text-[16px] leading-[20px]">
                  Today's
                </span>
              </div>
              <div className="flex flex-col gap-[16px] min-[800px]:flex-row min-[800px]:gap-[90px] min-[800px]:items-center">
                <h2 className="font-semibold text-[36px] text-black leading-[48px] tracking-[0.04em]">
                  Flash Sales
                </h2>
                <FlashSaleTimer />
              </div>
            </div>

            <div className="flex gap-[8px]">
              <button
                onClick={() => setFlashIndex((i) => Math.max(0, i - 1))}
                disabled={flashIndex === 0}
                className="w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#DB4444] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <BsArrowLeft size={20} />
              </button>
              <button
                onClick={() =>
                  setFlashIndex((i) => Math.min(maxFlashIndex, i + 1))
                }
                disabled={flashIndex === maxFlashIndex}
                className="w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center hover:bg-[#DB4444] hover:text-white disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <BsArrowRight size={20} />
              </button>
            </div>
          </div>

          {/* Flash products from real API */}
          {visibleFlash.length > 0 ? (
            <div className="w-full gap-[30px] flex justify-between max-[1250px]:grid max-[1250px]:gap-[20px] max-[1250px]:grid-cols-4 max-[1125px]:grid-cols-3 max-[850px]:grid-cols-2 max-[500px]:grid-cols-1">
              {visibleFlash.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            // 🔌 BACKEND: set is_flash: true on some products
            <p className="text-[16px] text-black/50 text-center py-[40px]">
              No flash sale products right now
            </p>
          )}

          <div className="flex justify-center mt-[60px]">
            <button className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium leading-[24px] px-[48px] py-[16px] rounded-[4px] transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <SectionHeader tag="Categories" title="Browse By Category" />
          <div className="mt-[40px] w-full gap-[30px] flex justify-between max-[1250px]:grid max-[1250px]:gap-[20px] max-[1250px]:grid-cols-5 max-[1125px]:grid-cols-4 max-[850px]:grid-cols-3 max-[500px]:grid-cols-2 max-[350px]:grid-cols-1">
            {browseCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link
                  key={cat.id}
                  to={`/products?category=${cat.label}`}
                  className="flex flex-col items-center justify-center gap-[16px] w-[170px] max-[600px]:w-full h-[145px] border border-black/20 rounded-[4px] hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444] transition-colors group"
                >
                  <Icon
                    size={40}
                    className="text-black group-hover:text-white transition-colors"
                  />
                  <span className="text-[16px] font-medium">{cat.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Best Selling ── */}
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <div className="flex items-center justify-between mb-[40px]">
            <SectionHeader tag="This Month" title="Best Selling Products" />
            <button className="h-[56px] bg-[#DB4444] hover:bg-[#E07575] text-white text-[12px] min-[500px]:text-[16px] font-medium px-[16px] min-[800px]:w-[159px] py-[16px] rounded-[4px] transition-colors cursor-pointer">
              View All
            </button>
          </div>

          {/* First 4 regular (non-flash) products */}
          <div className="w-full gap-[30px] flex justify-between max-[1250px]:grid max-[1250px]:gap-[20px] max-[1250px]:grid-cols-4 max-[1125px]:grid-cols-3 max-[850px]:grid-cols-2 max-[500px]:grid-cols-1">
            {regularProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Explore Our Products ── */}
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <SectionHeader tag="Our Products" title="Explore Our Products" />
          <div className="mt-[40px] w-full gap-[30px] grid grid-cols-4 max-[1250px]:gap-[20px] max-[1125px]:grid-cols-3 max-[850px]:grid-cols-2 max-[500px]:grid-cols-1">
            {/* All products up to 8 */}
            {products.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="flex justify-center mt-[60px]">
            <button className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium px-[48px] py-[16px] rounded-[4px] transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* ── New Arrivals ── */}
      {/* 🔌 BACKEND: replace with GET /api/products?type=new-arrival */}
      {/* For now hidden until backend provides new arrival products */}
      {products.length >= 4 && (
        <section className="w-full">
          <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
            <SectionHeader tag="Featured" title="New Arrival" />
            <div className="flex flex-col min-[600px]:grid min-[600px]:grid-cols-2 gap-[30px] mt-[40px]">
              <div className="h-[600px] bg-black rounded-[4px] relative overflow-hidden flex items-end p-[32px]">
                <img
                  src={products[0]?.primary_image || "/images/placeholder.png"}
                  alt={products[0]?.name}
                  className="absolute inset-0 w-full h-full object-contain opacity-80"
                />
                <div className="relative z-10">
                  <h3 className="text-white font-semibold text-[24px] leading-[28px] mb-[8px]">
                    {products[0]?.name}
                  </h3>
                  <p className="text-white/60 text-[14px] mb-[8px]">
                    {products[0]?.short_description}
                  </p>
                  <Link
                    to={`/product/${products[0]?.id}`}
                    className="text-white text-[16px] font-semibold underline underline-offset-2 hover:text-[#DB4444] transition-colors"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>

              <div className="flex flex-col gap-[30px]">
                <div className="h-[285px] bg-black rounded-[4px] relative overflow-hidden flex items-end p-[24px]">
                  <img
                    src={
                      products[1]?.primary_image || "/images/placeholder.png"
                    }
                    alt={products[1]?.name}
                    className="absolute inset-0 w-full h-full object-contain opacity-80"
                  />
                  <div className="text-white relative z-10">
                    <h3 className="font-semibold text-[20px] leading-[24px] mb-[4px]">
                      {products[1]?.name}
                    </h3>
                    <p className="text-white/60 text-[14px] mb-[8px] min-[750px]:w-[255px]">
                      {products[1]?.short_description}
                    </p>
                    <Link
                      to={`/product/${products[1]?.id}`}
                      className="text-[14px] underline underline-offset-2 hover:text-[#DB4444] transition-colors"
                    >
                      Shop Now
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col min-[600px]:grid min-[600px]:grid-cols-2 gap-[15px]">
                  {products.slice(2, 4).map((product) => (
                    <div
                      key={product.id}
                      className="h-[285px] bg-black rounded-[4px] relative overflow-hidden flex items-end p-[20px]"
                    >
                      <img
                        src={product.primary_image || "/images/placeholder.png"}
                        alt={product.name}
                        className="absolute inset-0 h-[221px] w-full top-8 object-contain opacity-80"
                      />
                      <div className="relative z-10 text-white">
                        <h3 className="font-semibold text-[16px] leading-[20px] mb-[4px]">
                          {product.name}
                        </h3>
                        <p className="text-white/60 text-[14px] mb-[8px]">
                          {product.short_description}
                        </p>
                        <Link
                          to={`/product/${product.id}`}
                          className="text-[12px] underline underline-offset-2 hover:text-[#DB4444] transition-colors"
                        >
                          Shop Now
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <ServicesStrip />
    </div>
  );
};

export default HomePage;
