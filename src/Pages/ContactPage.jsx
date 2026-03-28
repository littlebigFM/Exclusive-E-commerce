import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import { motion } from "framer-motion";
import { contactInitialState } from "../Data/FormData";

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

const viewport = { once: true, amount: 0.2 };

// ── Component ───────────────────────────────────────────────
const ContactPage = () => {
  const [formData, setFormData] = useState(contactInitialState);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 🔌 BACKEND: POST /api/contact
    console.log("Message sent:", formData);
    setFormData(contactInitialState);
    alert("Message sent successfully!");
  };

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
          <span className="text-black">Contact</span>
        </motion.div>

        {/* ── Main Content ── */}
        <div className="flex flex-col lg:flex-row gap-[30px] items-start">
          {/* ── Left — Contact Info ── */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="w-full lg:w-[340px] shrink-0 flex flex-col shadow-md rounded-[4px] overflow-hidden"
          >
            {/* Call us */}
            <div className="flex flex-col gap-[24px] p-[40px] border-b border-black/10">
              <div className="flex items-center gap-[16px]">
                <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-white" />
                </div>
                <p className="text-[16px] font-medium text-black">Call To Us</p>
              </div>
              <p className="text-[14px] text-black/70 leading-[21px]">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-[14px] text-black font-medium">
                Phone: +8801611112222
              </p>
            </div>

            {/* Write to us */}
            <div className="flex flex-col gap-[24px] p-[40px]">
              <div className="flex items-center gap-[16px]">
                <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-white" />
                </div>
                <p className="text-[16px] font-medium text-black">
                  Write To Us
                </p>
              </div>
              <p className="text-[14px] text-black/70 leading-[21px]">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-[14px] text-black font-medium">
                Emails: customer@exclusive.com
              </p>
              <p className="text-[14px] text-black font-medium">
                Emails: support@exclusive.com
              </p>
            </div>
          </motion.div>

          {/* ── Right — Contact Form ── */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            className="flex-1 w-full shadow-md rounded-[4px] p-[40px]"
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
              {/* Top row — Name, Email, Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-[16px]">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name *"
                  required
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email *"
                  required
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone *"
                  required
                  className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
                />
              </div>

              {/* Message */}
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows={8}
                className="w-full bg-[#F5F5F5] rounded-[4px] px-[16px] py-[14px] text-[16px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all resize-none"
              />

              {/* Submit button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium px-[48px] py-[16px] rounded-[4px] transition-colors"
                >
                  Send Message
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
