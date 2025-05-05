import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ResetPassword = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [role, setRole] = useState("developer");
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/auth/reset-password`,
        {
          resetToken,
          newPassword: formData.newPassword,
          confirmPassword: formData.confirmPassword,
          type: role,
        }
      );
      toast.success(response.data.message || "Password reset successfully!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed!");
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-md bg-white bg-opacity-90 p-8 shadow-2xl rounded-xl backdrop-blur-md"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 8px 30px rgba(0, 123, 255, 0.3)",
        }}
      >
        <h3 className="text-3xl font-bold text-center mb-6 text-blue-700">
          Reset Your Password
        </h3>

        {/* Role Toggle */}
        <div className="flex justify-center mb-6 gap-4">
          {["developer", "company"].map((r) => (
            <motion.button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              whileHover={{ scale: 1.05 }}
              className={`px-5 py-2 cursor-pointer rounded-full font-semibold text-sm transition-all duration-300 ${
                role === r
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white border border-blue-600 text-blue-600"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </motion.button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* New Password */}
          <div className="relative">
            <input
              type="password"
              name="newPassword"
              placeholder=" "
              value={formData.newPassword}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 peer focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              New Password
            </label>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              type="password"
              name="confirmPassword"
              placeholder=" "
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-md border border-gray-300 peer focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none"
            />
            <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              Confirm Password
            </label>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            className="w-full py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md text-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-800 transition-all"
            whileHover={{ scale: 1.03 }}
            disabled={loading}
          >
            Reset Password
          </motion.button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Now you can{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login
          </Link>{" "}
          with the new password.
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ResetPassword;
