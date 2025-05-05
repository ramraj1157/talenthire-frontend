import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaHouseUser,
  FaUsers,
  FaBriefcase,
  FaLink,
  FaFileAlt,
  FaCog,
  FaUserCircle,
} from "react-icons/fa";
import { motion } from "framer-motion";
import axios from "axios";
import logoImg from "../../assets/logo.png";

const DeveloperHeader = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const developerId = localStorage.getItem("developerId");
  const [profile, setProfile] = useState(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      if (!developerId) return;
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/developer/profile`,
          {
            headers: { "developer-id": developerId },
          }
        );
        setProfile(response.data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };
    fetchProfile();
  }, [developerId, API_BASE_URL]);

  const navLinks = [
    { path: "/developer/dashboard", icon: <FaHouseUser />, label: "Dashboard" },
    { path: "/developer/connect", icon: <FaUsers />, label: "Connect" },
    { path: "/developer/apply", icon: <FaBriefcase />, label: "Jobs" },
    { path: "/developer/connections", icon: <FaLink />, label: "Connections" },
    {
      path: "/developer/applications",
      icon: <FaFileAlt />,
      label: "Applications",
    },
    { path: "/developer/settings", icon: <FaCog />, label: "Settings" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="w-full bg-white shadow-md px-6 py-3"
    >
      <div className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto">
        {/* Brand */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="text-blue-700 font-bold text-2xl cursor-pointer mb-3 lg:mb-0"
          onClick={() => navigate("/developer/dashboard")}
        >
          <img
            src={logoImg}
            alt="TalentHire Logo"
            className="h-8 sm:h-10 md:h-12" // Adjust logo size for different screen sizes
          />
        </motion.div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-4 mb-3 lg:mb-0">
          {navLinks.map((link, idx) => (
            <motion.button
              key={idx}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              className={`flex items-center cursor-pointer gap-2 px-4 py-2 rounded-full transition-all duration-300 shadow-sm
              ${
                location.pathname === link.path
                  ? "bg-blue-600 text-white font-semibold shadow-md"
                  : "bg-white text-gray-600 hover:bg-gradient-to-r hover:from-blue-100 hover:to-blue-200 hover:text-blue-700"
              }`}
              onClick={() => navigate(link.path)}
            >
              {link.icon}
              <span className="hidden md:inline">{link.label}</span>
            </motion.button>
          ))}
        </div>

        {/* Profile Info */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => navigate("/developer/profile")}
        >
          {profile?.profilePhoto ? (
            <motion.img
              whileHover={{ scale: 1.1 }}
              src={`${API_BASE_URL}${profile.profilePhoto}`}
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={32} className="text-gray-500" />
          )}
          <span className="hidden md:inline text-sm font-medium text-gray-700 hover:text-blue-600">
            {profile?.fullName || "My Profile"}
          </span>
        </div>
      </div>
    </motion.nav>
  );
};

export default DeveloperHeader;
