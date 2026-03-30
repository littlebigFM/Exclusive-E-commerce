import React, { useState } from "react";
import AuthForm from "../Auth/AuthForm";
import image from "../assets/logo/logo.png";
import { signUpInitialState } from "../Data/FormData";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { registerUser } from "../Services/authService";

const SignUpPage = () => {
  const [formData, setFormData] = useState(signUpInitialState);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await registerUser({
        first_name: formData.firstName,
        last_name: formData.lastName,
        phone: formData.phone,
        email: formData.email,
        password: formData.password,
        role: "user",
      });

      console.log("registration succesful", response);
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      setShowModal(true);
    } catch (error) {
      console.error("registration failed", error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

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
          nameThree="phone"
          valueThree={formData.phone}
          onChangeThree={handleChange}
          nameFour="email"
          valueFour={formData.email}
          onChangeFour={handleChange}
          nameFive="password"
          valueFive={formData.password}
          onChangeFive={handleChange}
          nameSix="confirmPassword"
          valueSix={formData.confirmPassword}
          onChangeSix={handleChange}
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
        />
      </div>

      {/* Success Modal Overlay */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-[8px] p-8 max-w-[400px] w-full flex flex-col items-center text-center relative shadow-2xl"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-black/50 hover:text-black transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>

              <div className="w-[64px] h-[64px] rounded-full bg-green-100 flex items-center justify-center mb-6">
                <CheckCircle2 size={32} className="text-green-600" />
              </div>

              <h2 className="text-[24px] font-semibold text-black mb-2">
                Registration Successful!
              </h2>
              <p className="text-[14px] text-black/60 mb-8">
                Your account has been created successfully. You can now log in
                to start shopping.
              </p>

              <button
                onClick={() => navigate("/login")}
                className="w-full h-[48px] bg-[#DB4444] hover:bg-[#E07575] text-white font-medium rounded-[4px] transition-colors cursor-pointer"
              >
                Go to Login
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;
