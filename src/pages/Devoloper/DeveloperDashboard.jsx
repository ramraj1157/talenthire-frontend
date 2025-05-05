// src/pages/Developer/DeveloperDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import DeveloperHeader from "../../components/Devoloper/DeveloperHeader";
import NewsCard from "../../components/Devoloper/NewsCard";

const DeveloperDashboard = () => {
  const [techNews, setTechNews] = useState([]);
  const [error, setError] = useState("");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/developer/dashboard`
        );

        setTechNews(response.data.techNews);
      } catch (err) {
        setError("Failed to load tech news. Please try again later.");
        toast.error("Failed to load tech news. Please try again later.");
      }
    };

    fetchNews();
  }, [API_BASE_URL]);

  return (
    <div className="bg-blue-50 min-h-screen">
      <DeveloperHeader />

      <main className="max-w-7xl mx-auto px-4 py-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-semibold text-blue-700 text-center mb-6"
        >
          Latest Tech News
        </motion.h2>

        {error ? (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-center">
            {error}
          </div>
        ) : techNews.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {techNews.map((newsItem, index) => (
              <NewsCard key={index} newsItem={newsItem} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center text-blue-600 mt-8">
            Loading news... Hang in there 🚀
          </div>
        )}
      </main>
    </div>
  );
};

export default DeveloperDashboard;
