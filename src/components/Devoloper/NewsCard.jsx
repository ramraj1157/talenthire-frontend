// src/components/Developer/NewsCard.jsx
import React from "react";
import { motion } from "framer-motion";

const NewsCard = ({ newsItem, index }) => {
  const formattedDate = new Date(newsItem.publishedAt).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition duration-300 flex flex-col overflow-hidden"
    >
      {newsItem.urlToImage ? (
        <img
          src={newsItem.urlToImage}
          alt={newsItem.title}
          className="w-full h-48 object-cover rounded-t-xl"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-500 text-sm italic">
          No Image Available
        </div>
      )}
      <div className="p-5 flex flex-col flex-grow">
        <h5 className="font-bold text-xl text-gray-900 mb-2 line-clamp-2">
          <a
            href={newsItem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-700 transition-colors duration-200"
          >
            {newsItem.title}
          </a>
        </h5>
        <p className="text-gray-700 text-sm mb-4 flex-grow line-clamp-3">
          {newsItem.description || "No description available."}
        </p>
        <div className="text-xs text-gray-500 flex items-center justify-between mt-auto">
          <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-[11px] font-medium">
            {newsItem.source || "Unknown Source"}
          </span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </motion.div>
  );
};

export default NewsCard;
