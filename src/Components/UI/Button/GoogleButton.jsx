import React from "react";

const GoogleButton = ({ text, className, icon }) => {
  return (
    <div
      className={`
    border border-gray-300
    h-[56px]
    flex items-center justify-center
    gap-2
    font-regular
    text-[16px]
    rounded-[4px]
    cursor-pointer
    ${className}`}
    >
      {icon}
      {text}
    </div>
  );
};

export default GoogleButton;
