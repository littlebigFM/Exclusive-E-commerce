import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { adminLogin } from "../Services/adminService";
import { useAdmin } from "../Context/AdminContext";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { loginAdmin } = useAdmin();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await adminLogin({
        email: formData.email,
        password: formData.password,
      });

      console.log("Admin login successful:", response);

      // response.data has token and user
      loginAdmin(response.data.user, response.data.token);

      // Redirect to admin dashboard
      navigate("/admin");
    } catch (err) {
      console.error("Admin login failed:", err);
      setError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const isFormValid =
    formData.email.trim() !== "" && formData.password.trim() !== "";

  return (
    <div className="min-h-screen bg-[#F5F5F5] flex items-center justify-center px-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="text-center mb-[40px]">
          <h1 className="font-bold text-[28px] text-black">
            Exclusive
            <span className="text-[#DB4444] ml-[8px] text-[14px] font-semibold bg-[#DB4444]/10 px-[10px] py-[3px] rounded-full">
              Admin
            </span>
          </h1>
          <p className="text-[14px] text-black/50 mt-[8px]">
            Sign in to your admin account
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-[12px] border border-black/5 shadow-sm p-[40px]">
          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-[#DB4444] text-[14px] px-[16px] py-[12px] rounded-[8px] mb-[24px]">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">
            {/* Email */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-black/60">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                required
                className="w-full bg-[#F5F5F5] rounded-[8px] px-[16px] py-[12px] text-[14px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col gap-[8px]">
              <label className="text-[13px] font-medium text-black/60">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                required
                className="w-full bg-[#F5F5F5] rounded-[8px] px-[16px] py-[12px] text-[14px] outline-none focus:ring-2 focus:ring-[#DB4444] transition-all"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={!isFormValid || loading}
              className="w-full bg-[#DB4444] hover:bg-[#E07575] text-white text-[15px] font-medium py-[14px] rounded-[8px] transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-[8px]"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>

        {/* Back to store */}
        <p className="text-center text-[13px] text-black/40 mt-[24px]">
          Not an admin?{" "}
          <a href="/" className="text-[#DB4444] hover:underline">
            Back to store
          </a>
        </p>
      </div>
    </div>
  );
};

export default AdminLoginPage;
