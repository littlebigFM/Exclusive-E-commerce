import React from "react";
import { Send } from "lucide-react";
import qrCode from "../../assets/Qrcode.png";
import playstore from "../../assets/GooglePlay.png";
import appstore from "../../assets/AppStore.png";
import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs";
import { FaInstagram } from "react-icons/fa";
import { TfiLinkedin } from "react-icons/tfi";
import { Link } from "react-router-dom";

const Footer = () => {
  const accountLinks = [
    { label: "My Account", path: "/account" },
    { label: "Login / Register", path: "/login" },
    { label: "Cart", path: "/cart" },
    { label: "Wishlist", path: "/wishlist" },
    { label: "Shop", path: "/" },
  ];

  const quickLinks = [
    { label: "Privacy Policy", path: "/privacy-policy" },
    { label: "Terms Of Use", path: "/terms-of-use" },
    { label: "FAQ", path: "/faq" },
    { label: "Contact", path: "/contact" },
  ];

  return (
    <footer className="bg-black text-white mt-[80px]">
      <div className="max-w-[1440px] mx-auto px-4 py-[80px] grid grid-cols-1 md:grid-cols-5 gap-[40px]">
        <div className="flex flex-col gap-[24px]">
          <h3 className="font-bold text-[24px]">Exclusive</h3>
          <p className="text-[20px] font-medium">Subscribe</p>
          <p className="text-[14px] text-white/70">
            Get 10% off your first order
          </p>

          <div className="flex items-center border border-white rounded-[4px] h-[48px] px-[16px] gap-[8px]">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent flex-1 text-[14px] text-white placeholder:text-white/50 outline-none"
            />
            <Send
              size={20}
              className="shrink-0 cursor-pointer hover:text-[#DB4444] rotate-45 transition-colors"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          <h4 className="text-[20px] font-medium">Support</h4>
          <div className="flex flex-col gap-[16px]">
            <p className="text-[14px] text-white/70 leading-[21px]">
              111 Bijoy sarani, Dhaka,
              <br />
              DH 1515, Bangladesh.
            </p>
            <p className="text-[14px] text-white/70">exclusive@gmail.com</p>
            <p className="text-[14px] text-white/70">+88015-88888-9999</p>
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          <h4 className="text-[20px] font-medium">Account</h4>
          <div className="flex flex-col gap-[16px]">
            {accountLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-[14px] text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          <h4 className="text-[20px] font-medium">Quick Link</h4>
          <div className="flex flex-col gap-[16px]">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                to={link.path}
                className="text-[14px] text-white/70 hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-[24px]">
          <h4 className="text-[20px] font-medium">Download App</h4>
          <div className="flex flex-col gap-[12px]">
            <p className="text-[12px] text-white/50">
              Save $3 with App New User Only
            </p>
            <div className="flex gap-[8px] items-center">
              <div>
                <img src={qrCode} alt="" />
              </div>
              <div className="flex flex-col gap-[8px]">
                <img src={playstore} alt="" />
                <img src={appstore} alt="" />
              </div>
            </div>

            <div
              className="flex items-center gap-[26px] 
            mt-[px] max-[850px]:gap-[12px]"
            >
              <a href="#" className="hover:text-blue-300 transition-colors">
                <BiLogoFacebook />
              </a>
              <a href="#" className="hover:text-[#DB4444] transition-colors">
                <BsTwitterX />
              </a>
              <a href="#" className="hover:text-[#DB4444] transition-colors">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-blue-500 transition-colors">
                <TfiLinkedin />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <p className="text-center text-[14px] text-white/50 py-[24px]">
          © Copyright Rimel 2022. All rights reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
