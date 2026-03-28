import React from "react";

const Input = ({ type, value, onChange, name, placeholder, disabled }) => {
  return (
    <div>
      <input
        type={type}
        value={value}
        onChange={onChange}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full  border-b-[2px] outline-none border-gray-300 py-2 placeholder:text-[16px]"
      />
    </div>
  );
};

export default Input;
