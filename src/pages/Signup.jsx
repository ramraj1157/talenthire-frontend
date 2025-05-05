import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("developer");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.fullName) {
      errors.push(
        role === "developer"
          ? "Full name is required."
          : "Company name is required."
      );
    }
    if (!formData.email) errors.push("Email is required.");
    if (!formData.password) errors.push("Password is required.");
    if (role === "developer" && !formData.phoneNumber)
      errors.push("Phone number is required.");

    if (errors.length > 0) {
      toast.error(errors.join(" "));
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true); // Set loading state to true

    const apiUrl =
      role === "developer"
        ? `${API_BASE_URL}/api/auth/developer/signup`
        : `${API_BASE_URL}/api/auth/company/signup`;

    const payload =
      role === "developer"
        ? formData
        : {
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
          };

    try {
      const response = await axios.post(apiUrl, payload);

      if (role === "developer") {
        localStorage.setItem("developerId", response.data.developerId);
      } else {
        localStorage.setItem("companyId", response.data.companyId);
      }

      toast.success(response.data.success);
      setTimeout(() => {
        navigate(
          role === "developer" ? "/developer/dashboard" : "/company/dashboard"
        );
      }, 1000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed!");
    } finally {
      setIsLoading(false); // Set loading state back to false
    }
  };

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="w-full max-w-lg bg-white bg-opacity-90 rounded-2xl shadow-xl p-8 backdrop-blur-md"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        whileHover={{
          scale: 1.01,
          boxShadow: "0 8px 30px rgba(0, 123, 255, 0.25)",
        }}
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          Create Your Account
        </h2>

        {/* Role Toggle */}
        <div className="flex justify-center gap-6 mb-6">
          {["developer", "company"].map((r) => (
            <motion.button
              key={r}
              onClick={() => setRole(r)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-6 cursor-pointer py-2 text-sm font-semibold transition-all duration-300 rounded-full ${
                role === r
                  ? "bg-blue-600 text-white shadow-md"
                  : "border border-blue-600 text-blue-600 bg-white"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </motion.button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Floating Label Input */}
          <div className="relative">
            <input
              type="text"
              name="fullName"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              value={formData.fullName}
              onChange={handleChange}
            />
            <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              {role === "developer" ? "Full Name" : "Company Name"}
            </label>
          </div>

          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              value={formData.email}
              onChange={handleChange}
            />
            <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder=" "
              className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
              value={formData.password}
              onChange={handleChange}
            />
            <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
              Password
            </label>
          </div>

          {role === "developer" && (
            <div className="relative">
              <input
                type="text"
                name="phoneNumber"
                placeholder=" "
                className="peer w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-300"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
              <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
                Phone Number
              </label>
            </div>
          )}

          <motion.button
            type="submit"
            className="w-full cursor-pointer py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-md hover:from-blue-700 hover:to-blue-800 transition-all"
            whileHover={{ scale: 1.03 }}
          >
            {isLoading ? (
              <span className="flex justify-center items-center space-x-2">
                <svg
                  className="w-5 h-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="12" cy="12" r="10" strokeWidth="4" />
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    d="M4 12a8 8 0 1 0 16 0A8 8 0 0 0 4 12"
                  />
                </svg>
                <span>Loading...</span>
              </span>
            ) : (
              "Register"
            )}
          </motion.button>
        </form>

        <p className="text-center text-sm text-gray-700 mt-6">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-blue-600 font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Signup;
