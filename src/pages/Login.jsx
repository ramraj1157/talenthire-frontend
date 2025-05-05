import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole] = useState("developer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Add loading state
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setEmailError(false);
    setPasswordError(false);

    if (!email && !password) {
      toast.error("Email and Password are required !");
      return;
    }

    if (!email) {
      toast.error("Email is required !");
      return;
    }

    if (!password) {
      toast.error("Password is required !");
      return;
    }

    // Set loading to true when the request starts
    setLoading(true);

    try {
      let response;
      if (role === "developer") {
        response = await axios.post(
          `${API_BASE_URL}/api/auth/developer/login`,
          {
            email,
            password,
          }
        );
        localStorage.setItem("developerId", response.data.developerId);
      } else {
        response = await axios.post(`${API_BASE_URL}/api/auth/company/login`, {
          email,
          password,
        });
        localStorage.setItem("companyId", response.data.companyId);
      }

      toast.success(response.data.message);
      setTimeout(() => {
        navigate(
          role === "developer" ? "/developer/dashboard" : "/company/dashboard"
        );
      }, 1000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      // Set loading to false once the request finishes (success or error)
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      toast.error("Email is required !");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/forgot-password`,
        {
          email,
          type: role,
        }
      );

      toast.success(response.data.message);

      setLoading(false);

      setTimeout(() => {
        toast.info("Didn't receive the email? Click 'Send Reset Link' again.");
      }, 7000);
    } catch (error) {
      setLoading(false);
      const msg =
        error.response?.status === 404 &&
        error.response?.data?.message === "User not found"
          ? "The email you entered doesn't exist in our records."
          : error.response?.data?.message || "Failed to send reset link.";
      toast.error(msg);
    }
  };

  return (
    <motion.div
      className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 via-blue-200 to-blue-300"
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
          Welcome Back
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

        {/* Email */}
        <div className="mb-5 relative">
          <input
            type="email"
            placeholder=" "
            className={`w-full p-3 rounded-md border border-gray-300 peer focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none ${
              emailError ? "border-red-500" : ""
            }`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
            Email
          </label>
        </div>

        {/* Password */}
        <div className="mb-5 relative">
          <input
            type="password"
            placeholder=" "
            className={`w-full p-3 rounded-md border border-gray-300 peer focus:border-blue-500 focus:ring-2 focus:ring-blue-300 focus:outline-none ${
              passwordError ? "border-red-500" : ""
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="absolute left-3 top-3 text-gray-500 text-sm peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 transition-all duration-200 peer-focus:top-1 peer-focus:text-sm peer-focus:text-blue-600">
            Password
          </label>
        </div>

        {/* Login Button */}
        <motion.button
          onClick={handleLogin}
          className="w-full py-3 cursor-pointer bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-md text-lg font-semibold shadow-md hover:from-blue-700 hover:to-blue-800 transition-all"
          whileHover={{ scale: 1.03 }}
          disabled={loading} // Disable the button while loading
        >
          {loading ? <span>Loading...</span> : <span>Login</span>}
        </motion.button>

        {/* Forgot Password */}
        <div className="text-center mt-4">
          <button
            className="text-blue-700 hover:underline cursor-pointer text-sm"
            onClick={() => setShowForgotPassword((prev) => !prev)}
          >
            Forgot Password?
          </button>
        </div>

        {/* Reset Password Section */}
        {showForgotPassword && (
          <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h5 className="text-md font-medium mb-2 text-gray-700">
              Reset Your Password
            </h5>
            <motion.button
              onClick={handleForgotPassword}
              disabled={loading}
              className="w-full py-2 cursor-pointer bg-blue-500 text-white rounded-md font-semibold hover:bg-blue-600 transition"
              whileHover={{ scale: 1.03 }}
            >
              {loading ? <span>Loading...</span> : <span>Send reset Link</span>}
            </motion.button>
          </motion.div>
        )}

        {/* Signup Link */}
        <div className="text-center mt-6 text-sm">
          <p>
            New here?{" "}
            <Link
              to="/signup"
              className="text-blue-600 hover:underline font-medium"
            >
              Register Now
            </Link>
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Login;
