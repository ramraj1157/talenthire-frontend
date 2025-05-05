import React from "react";
import { FaInstagram, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import logoImg from "../assets/logo.png";

const Footer = () => {
  return (
    <motion.footer
      className="bg-white text-gray-600 py-6 border-t"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 flex flex-col sm:flex-row justify-between items-center">
        {/* Left: Brand Name */}
        <motion.div
          className="flex items-center mb-6 sm:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <img
            src={logoImg}
            alt="TalentHire Logo"
            className="h-8 sm:h-10 md:h-12" // Adjust logo size for different screen sizes
          />
        </motion.div>

        {/* Center: Social Icons */}
        <motion.div
          className="flex justify-center space-x-6 text-xl mb-6 sm:mb-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <motion.a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className=" text-pink-500 transition"
            whileHover={{ scale: 1.2 }}
          >
            <FaInstagram />
          </motion.a>

          <motion.a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-700 transition"
            whileHover={{ scale: 1.2 }}
          >
            <FaLinkedin />
          </motion.a>

          <motion.a
            href="mailto:support@talenthire.com"
            className="text-blue-500 transition"
            whileHover={{ scale: 1.2 }}
          >
            <FaEnvelope />
          </motion.a>
        </motion.div>

        {/* Right: Privacy Policy & Other Links */}
        <motion.div
          className="text-sm text-gray-500 flex flex-col sm:flex-row items-center sm:space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <a
            href="/privacy-policy"
            className="hover:text-blue-600 transition mb-2 sm:mb-0"
          >
            Privacy Policy
          </a>
          <a
            href="/terms-of-service"
            className="hover:text-blue-600 transition"
          >
            Terms of Service
          </a>
        </motion.div>
      </div>

      {/* Footer Text */}
      <div className="text-center text-sm text-gray-400 mt-6">
        <p>
          &copy; {new Date().getFullYear()}{" "}
          <span className="font-medium text-blue-600">TalentHire.com</span>. All
          rights reserved.
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
