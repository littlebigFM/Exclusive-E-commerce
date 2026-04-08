import React from "react";
import { Link } from "react-router-dom";
import { TbCurrencyDollar } from "react-icons/tb";
import { PiShoppingBagOpenBold } from "react-icons/pi";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { BsHandbag, BsTwitterX } from "react-icons/bs";
import { motion } from "framer-motion";
import ServicesStrip from "../Components/UI/ServiceTrip/ServicesStrip";
import img1 from "../assets/images/sideimage.png";
import { BiLogoFacebook } from "react-icons/bi";
import { FaInstagram } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";

// ── Animation Variants ──────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeLeft = {
  hidden: { opacity: 0, x: -60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const fadeRight = {
  hidden: { opacity: 0, x: 60 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

// ── Static Data ─────────────────────────────────────────────
const stats = [
  {
    id: 1,
    icon: TbCurrencyDollar,
    value: "10.5k",
    label: "Sellers active on our site",
  },
  {
    id: 2,
    icon: PiShoppingBagOpenBold,
    value: "33k",
    label: "Monthly Product Sale",
    highlighted: true,
  },
  {
    id: 3,
    icon: MdOutlinePeopleAlt,
    value: "45.5k",
    label: "Customers active on our site",
  },
  {
    id: 4,
    icon: BsHandbag,
    value: "25k",
    label: "Annual gross sale on our site",
  },
];

const team = [
  {
    id: 1,
    name: "Tobi Daniel",
    role: "Founder & Chairman",
    image: "/Images/manOne.png",
    socials: [
      <BiLogoFacebook />,
      <BsTwitterX />,
      <FaInstagram />,
      <TfiLinkedin />,
    ],
  },
  {
    id: 2,
    name: "Femi Matthew",
    role: "Managing Director",
    image: "/Images/manTwo.png",
    socials: [
      <BiLogoFacebook />,
      <BsTwitterX />,
      <FaInstagram />,
      <TfiLinkedin />,
    ],
  },
  {
    id: 3,
    name: "Cynthia Ofori",
    role: "Product Designer",
    image: "/Images/woman.png",
    socials: [
      <BiLogoFacebook />,
      <BsTwitterX />,
      <FaInstagram />,
      <TfiLinkedin />,
    ],
  },
];

// ── Viewport config — reused across all sections ─────────────
const viewport = { once: true, amount: 0.2 };

// ── Component ───────────────────────────────────────────────
const AboutPage = () => {
  return (
    <div className="w-full bg-white">
      <div className="max-w-[1440px] mx-auto px-4 py-[40px] md:py-[80px]">
        {/* Breadcrumb */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-[8px] text-[14px] text-black/50 mb-[40px] md:mb-[80px]"
        >
          <Link to="/" className="hover:text-black transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-black">About</span>
        </motion.div>

        {/* ── Section 1 — Our Story ── */}
        <section className="flex flex-col lg:flex-row items-center gap-[60px] lg:gap-[80px] mb-[80px] md:mb-[140px]">
          {/* Text slides in from left */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex flex-col gap-[38px] flex-1"
          >
            <h2 className="font-semibold text-[36px] md:text-[54px] text-black leading-[48px] md:leading-[64px]">
              Our Story
            </h2>
            <p className="text-[16px] text-black/70 leading-[26px]">
              Launched in 2015, Exclusive is South Asia's premier online
              shopping marketplace with an active presence in Bangladesh.
              Supported by a wide range of tailored marketing, data and service
              solutions, Exclusive has 10,500 sellers and 300 brands and serves
              3 million customers across the region.
            </p>
            <p className="text-[16px] text-black/70 leading-[26px]">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast pace. Exclusive offers a diverse assortment in
              categories ranging from consumer electronics to fashion, home &
              living.
            </p>
          </motion.div>

          {/* Image slides in from right */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex-1 w-full"
          >
            <img
              src={img1}
              alt="About Exclusive"
              className="w-full h-[609px] object-cover rounded-[4px]"
            />
            {/* 🔌 BACKEND: replace with CMS image */}
          </motion.div>
        </section>

        {/* ── Section 2 — Stats ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="grid grid-cols-2 lg:grid-cols-4 gap-[24px] md:gap-[30px] mb-[80px] md:mb-[140px]"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                variants={fadeUp}
                key={stat.id}
                className={`flex flex-col items-center justify-center gap-[16px] py-[40px] px-[24px] border rounded-[4px] text-center transition-colors group cursor-default ${
                  stat.highlighted
                    ? "bg-[#DB4444] border-[#DB4444] text-white"
                    : "border-black/20 hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white"
                }`}
              >
                <div
                  className={`w-[56px] h-[56px] rounded-full flex items-center justify-center ${
                    stat.highlighted
                      ? "bg-white/30"
                      : "bg-black/10 group-hover:bg-white/30"
                  }`}
                >
                  <Icon
                    size={28}
                    className={
                      stat.highlighted
                        ? "text-white"
                        : "text-black group-hover:text-white"
                    }
                  />
                </div>
                <p
                  className={`font-bold text-[32px] leading-none ${
                    stat.highlighted
                      ? "text-white"
                      : "text-black group-hover:text-white"
                  }`}
                >
                  {stat.value}
                </p>
                <p
                  className={`text-[16px] leading-[24px] ${
                    stat.highlighted
                      ? "text-white/80"
                      : "text-black/60 group-hover:text-white/80"
                  }`}
                >
                  {stat.label}
                </p>
              </motion.div>
            );
          })}
        </motion.section>

        {/* ── Section 3 — Team ── */}
        <motion.section
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          className="mb-[80px] md:mb-[140px]"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[40px]">
            {team.map((member) => (
              <motion.div
                variants={fadeUp}
                key={member.id}
                className="flex flex-col gap-[24px]"
              >
                <div className="w-full h-[300px] md:h-[430px] bg-[#F5F5F5] rounded-[4px] overflow-hidden">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[24px] font-medium text-black">
                    {member.name}
                  </p>
                  <p className="text-[16px] text-black/60">{member.role}</p>
                </div>
                <div className="flex items-center gap-[16px]">
                  {member.socials.map((icon, i) => (
                    <a
                      key={i}
                      href="#"
                      className="text-[17px] text-black hover:text-[#DB4444] transition-colors"
                    >
                      {icon}
                    </a>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── Services Strip ── */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
        >
          <ServicesStrip />
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;
