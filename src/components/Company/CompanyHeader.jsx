import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaBriefcase, FaCog } from "react-icons/fa";
import { motion } from "framer-motion";
import logoImg from "../../assets/logo.png";

const CompanyHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Dashboard",
      icon: <FaBriefcase className="text-lg mr-2" />,
      path: "/company/dashboard",
    },
    {
      label: "Settings",
      icon: <FaCog className="text-lg mr-2" />,
      path: "/company/settings",
    },
  ];

  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">
      <motion.div
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <img
          src={logoImg}
          alt="TalentHire Logo"
          className="h-8 sm:h-10 md:h-12" // Adjust logo size for different screen sizes
        />
      </motion.div>

      <nav className="flex space-x-6">
        {navItems.map(({ label, icon, path }) => (
          <motion.button
            key={label}
            onClick={() => navigate(path)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className={`flex items-center px-4 py-2 rounded-full cursor-pointer font-medium transition-colors duration-300
              ${
                location.pathname === path
                  ? "bg-blue-600 text-white"
                  : "text-gray-600 hover:bg-gray-100"
              }
            `}
          >
            {icon}
            <span>{label}</span>
          </motion.button>
        ))}
      </nav>
    </header>
  );
};

export default CompanyHeader;
