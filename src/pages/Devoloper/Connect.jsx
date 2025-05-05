// src/pages/Developer/Connect.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import DeveloperHeader from "../../components/Devoloper/DeveloperHeader";

import "react-toastify/dist/ReactToastify.css";
import ConnectCard from "../../components/Devoloper/ConnectCard";

const Connect = () => {
  const [developers, setDevelopers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const loggedInDeveloperId = localStorage.getItem("developerId");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchDevelopers = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/developer/connect`,
          {
            headers: { "developer-id": loggedInDeveloperId },
          }
        );
        setDevelopers(response.data);
      } catch (err) {
        toast.error("Failed to fetch developers.");
      }
    };
    fetchDevelopers();
  }, [loggedInDeveloperId, API_BASE_URL]);

  const handleSwipe = useCallback(
    async (direction) => {
      const developer = developers[currentIndex];
      if (!developer) return;

      const action = direction === "right" ? "swipeRight" : "swipeLeft";

      try {
        await axios.post(
          `${API_BASE_URL}/api/developer/connect`,
          { developerId: developer.id, action },
          {
            headers: {
              "developer-id": loggedInDeveloperId,
              "Content-Type": "application/json",
            },
          }
        );
        toast.success(`You swiped ${direction} on ${developer.fullName}`);
        setCurrentIndex((prev) => prev + 1);
      } catch (err) {
        toast.error("Swipe failed. Try again.");
      }
    },
    [developers, currentIndex, loggedInDeveloperId, API_BASE_URL]
  );

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") handleSwipe("right");
      if (e.key === "ArrowLeft") handleSwipe("left");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleSwipe]);

  const developer = developers[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 text-gray-800">
      <DeveloperHeader />
      <div className="max-w-5xl mx-auto p-6">
        {developer ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ConnectCard developer={developer} apiBaseUrl={API_BASE_URL} />
          </motion.div>
        ) : (
          <p className="text-center text-gray-500">
            No more developers to show.
          </p>
        )}

        {developer && (
          <div className="flex justify-center gap-6 mt-6">
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSwipe("left")}
              className="bg-red-100 text-red-600 px-6 py-2 cursor-pointer rounded-full font-semibold shadow hover:bg-red-200 transition"
            >
              ← Swipe Left to Reject
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={() => handleSwipe("right")}
              className="bg-blue-600 text-white px-6 py-2 cursor-pointer rounded-full font-semibold shadow hover:bg-blue-700 transition"
            >
              Swipe Right to Connect →
            </motion.button>
          </div>
        )}

        <p className="text-center mt-3 text-sm text-gray-400">
          Use arrow keys to swipe
        </p>
      </div>
    </div>
  );
};

export default Connect;
