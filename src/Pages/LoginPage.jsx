import React, { useState } from "react";
import AuthForm from "../Auth/AuthForm";
import image from "../assets/logo/logo.png";
import { loginInitialState } from "../Data/FormData";
import { useLocation, useNavigate } from "react-router-dom";
import { loginUser } from "../Services/authService";
import { useAuth } from "../Context/AuthContext";

const LoginPage = () => {
  const [formData, setFormData] = useState(loginInitialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Check if user was redirected from somewhere
  // If yes — send them back there after login
  // If no — send them to homepage
  const from = location.state?.from?.pathname || "/";

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      console.log("login successful", response);

      login(response.data, response.token);

      navigate(from, { replace: true });

      // navigate("/");
    } catch (error) {
      console.error("login failed", error);
      setError(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

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
          onSubmit={handleSubmit}
          error={error}
          loading={loading}
          isFormValid={isFormValid}
        />
      </div>
    </div>
  );
};

export default LoginPage;
