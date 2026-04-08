import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
};

const viewport = { once: true, amount: 0.2 };

const TermsOfUsePage = () => {
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
          <span className="text-black">Terms of Use</span>
        </motion.div>

        {/* Content */}
        <div className="max-w-[800px] mx-auto">
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="text-[32px] md:text-[48px] font-bold text-black mb-[24px]"
          >
            Terms of Use
          </motion.h1>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-[24px] text-[16px] text-black/70 leading-[24px]"
          >
            <p>
              Welcome to Exclusive! These Terms of Use govern your use of our
              website and services. By accessing or using our platform, you
              agree to be bound by these terms. Please read them carefully.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Acceptance of Terms
            </h2>
            <p>
              By accessing and using Exclusive, you accept and agree to be bound
              by the terms and provision of this agreement. If you do not agree
              to abide by the above, please do not use this service.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Use License
            </h2>
            <p>
              Permission is granted to temporarily download one copy of the
              materials on Exclusive's website for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>Modify or copy the materials</li>
              <li>
                Use the materials for any commercial purpose or for any public
                display
              </li>
              <li>
                Attempt to decompile or reverse engineer any software contained
                on our website
              </li>
              <li>
                Remove any copyright or other proprietary notations from the
                materials
              </li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black">
              User Account
            </h2>
            <p>
              When you create an account with us, you must provide information
              that is accurate, complete, and current at all times. You are
              responsible for safeguarding the password and for all activities
              that occur under your account.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Products and Services
            </h2>
            <p>
              All products and services are subject to availability. We reserve
              the right to discontinue any product or service at any time.
              Prices for our products are subject to change without notice.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Returns and Refunds
            </h2>
            <p>
              We offer a 30-day return policy for most items. Items must be
              returned in their original condition and packaging. Refunds will
              be processed within 5-7 business days after receipt of the
              returned item.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Prohibited Uses
            </h2>
            <p>
              You may not use our products for any illegal or unauthorized
              purpose. You must not transmit any worms or viruses or any code of
              a destructive nature.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Limitation of Liability
            </h2>
            <p>
              In no event shall Exclusive or its suppliers be liable for any
              damages (including, without limitation, damages for loss of data
              or profit, or due to business interruption) arising out of the use
              or inability to use the materials on our website.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Use, please contact
              us at:
            </p>
            <p className="font-medium">
              Email: legal@exclusive.com
              <br />
              Phone: +88015-88888-9999
              <br />
              Address: 111 Bijoy sarani, Dhaka, DH 1515, Bangladesh
            </p>

            <p className="text-[14px] text-black/50 mt-[24px]">
              Last updated: April 8, 2026
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfUsePage;
