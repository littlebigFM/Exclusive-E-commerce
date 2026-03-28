import React from "react";

const Button = ({ text, className }) => {
  return (
    <button
      className={`
    bg-[#DB4444] 
    text-[#FAFAFA]
    h-[56px]
    flex items-center justify-center
    font-medium
    text-[16px]
    rounded-[4px]
    cursor-pointer
    ${className}
        `}
    >
      {text}
    </button>
  );
};

export default Button;
