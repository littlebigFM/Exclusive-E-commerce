import React, { useState } from "react";
import AuthForm from "../Auth/AuthForm";
import image from "../assets/logo/logo.png";
import { loginInitialState } from "../Data/FormData";

const LoginPage = () => {
  const [formData, setFormData] = useState(loginInitialState);

  console.log(formData);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission logic here
  // };

  console.log(formData);

  return (
    <div
      className="
       max-w-[1440px] mx-auto 
       px-4 pt-[30px]
       flex
       "
    >
      <div className="w-full flex align-center h-[750px] bg-[#CBE4E8] max-[800px]:hidden">
        <img src={image} alt="" />
      </div>

      <div className="w-full flex items-center justify-center">
        <AuthForm
          type="login"
          nameFour="email"
          valueFour={formData.email}
          onChangeFour={handleChange}
          nameFive="password"
          valueFive={formData.password}
          onChangeFive={handleChange}
        />
      </div>
    </div>
  );
};

export default LoginPage;
