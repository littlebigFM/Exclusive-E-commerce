import React from "react";

const SectionHeader = ({ tag, title }) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div className="flex items-center gap-[16px]">
        <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
        <span className="text-[#DB4444] font-semibold text-[16px] leading-[20px]">
          {tag}
        </span>
      </div>

      <h2
        className="
      font-semibold 
      text-[20px] 
      min-[500px]:text-[28px]
      min-[800px]:text-[36px]
      leading-[24px]
      text-black 
      tracking-[0.04em]
      "
      >
        {title}
      </h2>
    </div>
  );
};

export default SectionHeader;
