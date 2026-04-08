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

const PrivacyPolicyPage = () => {
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
          <span className="text-black">Privacy Policy</span>
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
            Privacy Policy
          </motion.h1>

          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-[24px] text-[16px] text-black/70 leading-[24px]"
          >
            <p>
              At Exclusive, we are committed to protecting your privacy and
              ensuring the security of your personal information. This Privacy
              Policy explains how we collect, use, and safeguard your data when
              you use our website and services.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Information We Collect
            </h2>
            <p>
              We collect information you provide directly to us, such as when
              you create an account, make a purchase, or contact us for support.
              This may include your name, email address, shipping address,
              payment information, and any other details you choose to provide.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              How We Use Your Information
            </h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-[24px] space-y-[8px]">
              <li>Process and fulfill your orders</li>
              <li>Provide customer support</li>
              <li>Send you important updates about your account and orders</li>
              <li>Improve our products and services</li>
              <li>Send marketing communications (with your consent)</li>
            </ul>

            <h2 className="text-[24px] font-semibold text-black">
              Information Sharing
            </h2>
            <p>
              We do not sell, trade, or otherwise transfer your personal
              information to third parties without your consent, except as
              described in this policy. We may share your information with
              trusted service providers who assist us in operating our website
              and conducting our business.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction. However, no method of transmission
              over the internet is 100% secure.
            </p>

            <h2 className="text-[24px] font-semibold text-black">
              Your Rights
            </h2>
            <p>
              You have the right to access, update, or delete your personal
              information. You can also opt out of marketing communications at
              any time. To exercise these rights, please contact us using the
              information provided below.
            </p>

            <h2 className="text-[24px] font-semibold text-black">Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please
              contact us at:
            </p>
            <p className="font-medium">
              Email: privacy@exclusive.com
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

export default PrivacyPolicyPage;
