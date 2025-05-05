// src/components/Developer/JobCard.jsx
import React from "react";
import { FaBookmark, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const JobCard = ({ job, onApply, onReject, onBookmark }) => {
  const formattedDate = new Date(job.lastDateToApply).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    }
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-gray-50 rounded-xl shadow-lg p-6 space-y-5  hover:shadow-xl transition-all duration-300"
    >
      {/* Header */}
      <div className="space-y-1">
        <h3 className="text-2xl font-bold text-gray-800">{job.jobTitle}</h3>
        <p className="text-sm text-gray-500 font-medium">
          Company: {job.companyName}
        </p>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700">{job.jobDescription}</p>

      {/* Job Details */}
      <div className="space-y-2 text-sm text-gray-700">
        <div>
          <strong>Responsibilities:</strong>
          <ul className="list-disc pl-5 mt-1">
            {job.responsibilities.map((resp, index) => (
              <li key={index}>{resp}</li>
            ))}
          </ul>
        </div>

        <p>
          <strong>Required Skills:</strong>{" "}
          <span className="flex flex-wrap gap-2 mt-1">
            {job.requiredSkills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </span>
        </p>

        <p>
          <strong>Salary:</strong> {job.salaryRange}
        </p>
        <p>
          <strong>Work Mode:</strong>{" "}
          <span className="capitalize">{job.workMode}</span>
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Last Date to Apply:</strong> {formattedDate}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap justify-between gap-4 mt-6">
        <button
          onClick={onReject}
          className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-600 transition"
        >
          <FaTimesCircle /> Reject
        </button>

        <button
          onClick={onBookmark}
          className="flex items-center gap-2 bg-yellow-400 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-yellow-500 transition"
        >
          <FaBookmark /> Bookmark
        </button>

        <button
          onClick={onApply}
          className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-600 transition"
        >
          <FaCheckCircle /> Apply
        </button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4 italic">
        Tip: Use Arrow Keys to swipe through jobs
      </p>
    </motion.div>
  );
};

export default JobCard;
