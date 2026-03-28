import React, { useState } from "react";
import AuthForm from "../Auth/AuthForm";
import image from "../assets/logo/logo.png";
import { signUpInitialState } from "../Data/FormData";

const SignUpPage = () => {
  const [formData, setFormData] = useState(signUpInitialState);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });

    //or

    // const { name, value } = event.target;
    // setFormData((prevData) => ({
    //   ...prevData,
    //   [name]: value,
    // }));
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
          type="signup"
          nameOne="firstName"
          valueOne={formData.firstName}
          onChangeOne={handleChange}
          nameTwo="lastName"
          valueTwo={formData.lastName}
          onChangeTwo={handleChange}
          nameThree="email"
          valueThree={formData.email}
          onChangeThree={handleChange}
          nameFour="password"
          valueFour={formData.password}
          onChangeFour={handleChange}
          nameFive="confirmPassword"
          valueFive={formData.confirmPassword}
          onChangeFive={handleChange}
          nameSix="phone"
          valueSix={formData.phone}
          onChangeSix={handleChange}
        />
      </div>
    </div>
  );
};

export default SignUpPage;
