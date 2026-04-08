import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const slideUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
};

const viewport = { once: true, amount: 0.2 };

const FAQPage = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const faqData = [
    {
      question: "How do I create an account?",
      answer:
        "To create an account, click on the 'Sign Up' button in the top right corner of our website. Fill in your personal details including name, email, and password. Once registered, you'll receive a confirmation email.",
    },
    {
      question: "How do I track my order?",
      answer:
        "After placing an order, you'll receive an email with your order number. You can track your order status by logging into your account and visiting the 'My Orders' section, or by contacting our customer support team.",
    },
    {
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Items must be returned in their original condition and packaging. To initiate a return, please contact our customer support team or visit the returns section in your account.",
    },
    {
      question: "Do you offer international shipping?",
      answer:
        "Yes, we offer international shipping to select countries. Shipping costs and delivery times vary by location. You can view available shipping options during checkout.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "If you've forgotten your password, click on the 'Forgot Password' link on the login page. Enter your email address and we'll send you a link to reset your password.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept major credit cards (Visa, MasterCard, American Express), PayPal, and bank transfers. All payments are processed securely through encrypted connections.",
    },
    {
      question: "How long does shipping take?",
      answer:
        "Domestic shipping typically takes 3-5 business days. International shipping can take 7-14 business days depending on the destination. You'll receive tracking information once your order ships.",
    },
    {
      question: "Can I modify or cancel my order?",
      answer:
        "Orders can be modified or cancelled within 2 hours of placement. Please contact our customer support team immediately if you need to make changes to your order.",
    },
    {
      question: "Do you offer warranty on products?",
      answer:
        "Most of our products come with manufacturer warranties. Warranty terms vary by product. Please check the product description or contact us for specific warranty information.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team through email at support@exclusive.com, by phone at +88015-88888-9999, or through the contact form on our website. We're here to help Monday through Friday, 9 AM to 6 PM.",
    },
  ];

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
          <span className="text-black">FAQ</span>
        </motion.div>

        {/* Content */}
        <div className="max-w-[800px] mx-auto">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-[32px] md:text-[48px] font-bold text-black mb-[24px] text-center"
          >
            Frequently Asked Questions
          </motion.h1>

          <motion.p
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="text-[18px] text-black/70 text-center mb-[48px]"
          >
            Find answers to common questions about our products and services
          </motion.p>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.6 }}
            className="space-y-[16px]"
          >
            {faqData.map((item, index) => (
              <motion.div
                key={index}
                variants={slideUp}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                transition={{ delay: index * 0.1 }}
                className="border border-black/10 rounded-[8px] overflow-hidden"
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-[24px] text-left hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-[18px] font-medium text-black">
                    {item.question}
                  </h3>
                  {openItems[index] ? (
                    <ChevronUp size={20} className="text-black/50" />
                  ) : (
                    <ChevronDown size={20} className="text-black/50" />
                  )}
                </button>

                {openItems[index] && (
                  <div className="px-[24px] pb-[24px]">
                    <p className="text-[16px] text-black/70 leading-[24px]">
                      {item.answer}
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={viewport}
            transition={{ delay: 0.8 }}
            className="mt-[48px] text-center"
          >
            <p className="text-[16px] text-black/70 mb-[16px]">
              Can't find what you're looking for?
            </p>
            <Link
              to="/contact"
              className="inline-block bg-[#DB4444] hover:bg-[#E07575] text-white text-[16px] font-medium px-[32px] py-[12px] rounded-[4px] transition-colors"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
