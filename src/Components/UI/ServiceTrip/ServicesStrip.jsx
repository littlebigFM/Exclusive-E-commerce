import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { PiHeadsetBold } from "react-icons/pi";
import { MdOutlineVerified } from "react-icons/md";

const services = [
  {
    id: 1,
    icon: TbTruckDelivery,
    title: "FREE AND FAST DELIVERY",
    subtitle: "Free delivery for all orders over $140",
  },
  {
    id: 2,
    icon: PiHeadsetBold,
    title: "24/7 CUSTOMER SERVICE",
    subtitle: "Friendly 24/7 customer support",
  },
  {
    id: 3,
    icon: MdOutlineVerified,
    title: "MONEY BACK GUARANTEE",
    subtitle: "We return money within 30 days",
  },
];

const ServicesStrip = () => {
  return (
    <section className="w-full">
      <div className="max-w-[1200px] mx-auto px-4 py-[80px]">
        <div
          className="
        flex 
        items-center 
        justify-center 
        gap-[88px] 
        max-[580px]:gap-[40px]
        max-[510px]:gap-[20px]
        "
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className="flex flex-col items-center gap-[16px] text-center"
              >
                <div className="relative flex items-center justify-center">
                  <div className="w-[80px] h-[80px] rounded-full bg-black/10 flex items-center justify-center">
                    <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center">
                      <Icon size={32} className="text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[8px]">
                  <p
                    className="
                  text-[20px] 
                  max-[580px]:text-[14px]
                  max-[510px]:text-[12px]
                  font-bold text-black
                  "
                  >
                    {service.title}
                  </p>
                  <p
                    className="
                  text-[14px] 
                  max-[580px]:text-[12px]
                  max-[510px]:text-[10px]
                  text-black/70
                  "
                  >
                    {service.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesStrip;
