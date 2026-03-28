import React, { useState } from "react";
import { ChevronRight, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../Components/UI/SectionHeader";
import ProductCard from "../Components/UI/ProductCard";
import FlashSaleTimer from "../Components/UI/FlashSaleTimer";
import iphone from "../assets/iphone.png";
import { DiApple } from "react-icons/di";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { sidebarCategories, browseCategories } from "../Data/Categories";
import {
  flashSaleProducts,
  bestSellingProducts,
  newArrivalProducts,
  explorableProducts,
} from "../Data/Product";
import ServicesStrip from "../Components/UI/ServiceTrip/ServicesStrip";

const HomePage = () => {
  const [flashIndex, setFlashIndex] = useState(0);
  const productsPerPage = 4;

  const visibleFlash = flashSaleProducts.slice(
    flashIndex * productsPerPage,
    flashIndex * productsPerPage + productsPerPage,
  );

  const maxFlashIndex =
    Math.ceil(flashSaleProducts.length / productsPerPage) - 1;

  return (
    <div className="w-full bg-white">
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[px] flex gap-[40px]">
          <aside className=" py-[40px] hidden lg:flex flex-col w-[200px] shrink-0 border-r border-black/10 pr-[24px] gap-[4px]">
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
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <div className="flex items-end justify-between mb-[40px]">
            <div className="flex flex-col gap-[24px]">
              <div className="flex items-center gap-[16px]">
                {/* <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" /> */}
                <span
                  className="
                text-[#DB4444] font-semibold text-[16px] leading-[20px]"
                >
                  Today's
                </span>
              </div>
              <div
                className="
              flex flex-col 
              gap-[16px]
              min-[800px]:flex-row
              min-[800px]:gap-[90px]
              min-[800px]:items-center
              "
              >
                <h2
                  className="
                font-semibold text-[36px] 
                text-black 
                leading-[48px] 
                tracking-[0.04em]
                "
                >
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

          <div
            className="
          w-full 
          gap-[30px]
          flex justify-between
          max-[1250px]:grid
          max-[1250px]:gap-[20px]
          max-[1250px]:grid-cols-4
          max-[1125px]:grid-cols-3
          max-[850px]:grid-cols-2
          max-[500px]:grid-cols-1
          "
          >
            {visibleFlash.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="flex justify-center mt-[60px]">
            <button className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium leading-[24px] px-[48px] py-[16px] rounded-[4px] transition-colors">
              View All Products
            </button>
          </div>
        </div>
      </section>
      {/* ────────────────────────────────────────
    SECTION — Browse by Category
──────────────────────────────────────── */}
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <SectionHeader tag="Categories" title="Browse By Category" />

          <div
            className="
          mt-[40px]
          w-full 
          gap-[30px]
          flex justify-between
          max-[1250px]:grid
          max-[1250px]:gap-[20px]
          max-[1250px]:grid-cols-5
          max-[1125px]:grid-cols-4
          max-[850px]:grid-cols-3
          max-[500px]:grid-cols-2
          max-[350px]:grid-cols-1
          "
          >
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
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <div className="flex items-center justify-between mb-[40px] ">
            <SectionHeader tag="This Month" title="Best Selling Products" />
            <button
              className="
              h-[56px]
            bg-[#DB4444] 
            hover:bg-[#E07575] 
            text-white 
            text-[12px]
            min-[500px]:text-[16px]
            font-medium
            px-[16px]
            min-[800px]:w-[159px]
            py-[16px] 
            rounded-[4px] 
            transition-colors
            cursor-pointer
            "
            >
              View All
            </button>
          </div>

          <div
            className="
            w-full 
          gap-[30px]
          flex justify-between
          max-[1250px]:grid
          max-[1250px]:gap-[20px]
          max-[1250px]:grid-cols-4
          max-[1125px]:grid-cols-3
          max-[850px]:grid-cols-2
          max-[500px]:grid-cols-1
          "
          >
            {bestSellingProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      {/* Explore Our Products */}
      <section className="w-full border-b border-black/10">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <SectionHeader tag="Our Products" title="Explore Our Products" />

          {/* Product grid — 8 products, 4 per row */}
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
            {/* 🔌 BACKEND: replace with GET /api/products */}
            {explorableProducts.slice(0, 8).map((product) => (
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
      <section className="w-full">
        <div className="max-w-[1440px] mx-auto px-4 py-[60px]">
          <SectionHeader tag="Featured" title="New Arrival" />
          <div
            className="
          flex flex-col
          min-[600px]:grid
          min-[600px]:grid-cols-2
          gap-[30px] mt-[40px]  "
          >
            <div className="h-[600px] bg-black rounded-[4px] relative overflow-hidden flex items-end p-[32px] ">
              <img
                src={newArrivalProducts[0].image}
                alt={newArrivalProducts[0].name}
                className="absolute inset-0 w-full h-full object-contain opacity-80"
              />
              <div className="relative z-10">
                <h3 className="text-white font-semibold text-[24px] leading-[28px] mb-[8px]">
                  {newArrivalProducts[0].name}
                </h3>
                <p className="text-white/60 text-[14px] mb-[8px]">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <a
                  href="#"
                  className="text-white text-[16px] font-semibold underline underline-offset-2 hover:text-[#DB4444] transition-colors"
                >
                  Shop Now
                </a>
              </div>
            </div>

            <div className="flex flex-col gap-[30px]">
              <div className="h-[285px] bg-black rounded-[4px] relative overflow-hidden flex items-end p-[24px] ">
                <img
                  src={newArrivalProducts[1].image}
                  alt={newArrivalProducts[1].name}
                  className="absolute inset-0 w-full h-full object-contain opacity-80"
                />
                <div className="text-white relative z-10">
                  <h3 className=" font-semibold text-[20px] leading-[24px] mb-[4px]">
                    {newArrivalProducts[1].name}
                  </h3>

                  <p className="text-white/60 text-[14px] mb-[8px] min-[750px]:w-[255px]">
                    Featured woman collections that give you another vibe.
                  </p>

                  <a
                    href="#"
                    className=" text-[14px] underline underline-offset-2 hover:text-[#DB4444] transition-colors"
                  >
                    Shop Now
                  </a>
                </div>
              </div>

              <div
                className="
              flex flex-col
              min-[600px]:grid
              min-[600px]:grid-cols-2
              gap-[15px]"
              >
                {newArrivalProducts.slice(2).map((product) => (
                  <div
                    key={product.id}
                    className="h-[285px] bg-black rounded-[4px] relative overflow-hidden flex items-end p-[20px] "
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 h-[221px] w-full top-8 object-contain opacity-80"
                    />
                    <div className="relative z-10 text-white">
                      <h3 className=" font-semibold text-[16px] leading-[20px] mb-[4px]">
                        {product.name}
                      </h3>

                      <p className="text-white/60 text-[14px] mb-[8px]">
                        Amazon wireless speakers
                      </p>

                      <a
                        href="#"
                        className=" text-[12px] underline underline-offset-2 hover:text-[#DB4444] transition-colors"
                      >
                        Shop Now
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServicesStrip />
    </div>
  );
};

export default HomePage;
