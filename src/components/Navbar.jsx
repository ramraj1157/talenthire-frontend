import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMenu } from "react-icons/fi";
import logoImg from "../assets/logo.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Check localStorage for developerId or companyId
  const developerId = localStorage.getItem("developerId");
  const companyId = localStorage.getItem("companyId");

  // Conditional rendering for the "Dashboard" button
  const dashboardLink = developerId
    ? "/developer/dashboard"
    : companyId
    ? "/company/dashboard"
    : null;

  return (
    <motion.nav
      className="bg-white shadow-md sticky top-0 z-50"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left: Logo + Brand */}
          <Link
            to="/"
            className="flex items-center gap-4 text-blue-600 font-bold text-xl"
          >
            <img
              src={logoImg}
              alt="TalentHire Logo"
              className="h-8 sm:h-10 md:h-12"
            />
          </Link>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <button
              type="button"
              className="text-blue-700 focus:outline-none"
              onClick={toggleMobileMenu}
              aria-label="Toggle navigation"
            >
              <FiMenu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/features"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              Features
            </Link>
            <Link
              to="/about-us"
              className="text-gray-700 hover:text-blue-600 transition"
            >
              About Us
            </Link>
            <a
              href="https://talenthire-resumegenerator.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold py-2 px-4 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-md transform hover:scale-105 hover:shadow-lg hover:from-green-500 hover:to-blue-600 transition-all duration-300 ease-in-out animate-pulse"
            >
              📝 Generate Your Resume
            </a>

            {/* Conditional "Dashboard" Button */}
            {dashboardLink ? (
              <Link
                to={dashboardLink}
                className="inline-block px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out"
              >
                Go to Dashboard
              </Link>
            ) : (
              <Link
                to="/signup"
                className="inline-block px-6 py-3 text-sm font-semibold text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full shadow-md hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out"
              >
                Create Account
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden cursor-pointer px-4 pt-2 pb-4">
          <Link
            to="/features"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            Features
          </Link>
          <Link
            to="/about-us"
            className="block py-2 text-gray-700 hover:text-blue-600"
          >
            About Us
          </Link>
          <a
            href="https://talenthire-resumegenerator.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center font-semibold text-white py-3 px-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500 shadow-lg transform hover:scale-105 hover:shadow-xl hover:from-green-500 hover:to-blue-600 transition-all duration-300 ease-in-out animate-pulse mt-4"
          >
            📝 Generate Your Resume
          </a>

          {/* Conditional "Dashboard" Button for Mobile */}
          {dashboardLink ? (
            <Link
              to={dashboardLink}
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-full hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out mt-4"
            >
              Go to Dashboard
            </Link>
          ) : (
            <Link
              to="/signup"
              className="block w-full text-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-full hover:shadow-xl hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 ease-in-out mt-4"
            >
              Create Account
            </Link>
          )}
        </div>
      )}
    </motion.nav>
  );
};

export default Navbar;
