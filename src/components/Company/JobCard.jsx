// components/Company/JobCard.jsx
import React from "react";
import { FaEdit, FaTrash, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const JobCard = ({ job, onEdit, onDelete, onToggleStatus }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white border  border-blue-100 shadow-lg rounded-lg p-6 space-y-4 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-xl font-bold text-blue-800">{job.jobTitle}</h3>
        <span
          className={`text-sm px-2 py-1 rounded-full ${
            job.acceptingApplications
              ? "bg-green-100 text-green-700"
              : "bg-gray-200 text-gray-600 "
          }`}
        >
          {job.acceptingApplications ? "Hiring Active" : "Paused"}
        </span>
      </div>

      <p className="text-gray-600 ">{job.jobDescription}</p>

      <div>
        <p className="font-medium text-gray-700 ">Responsibilities:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {job.responsibilities.map((res, idx) => (
            <span
              key={idx}
              className="bg-blue-100 text-blue-800 text-sm px-2 py-0.5 rounded-full "
            >
              {res}
            </span>
          ))}
        </div>
      </div>

      <div>
        <p className="font-medium text-gray-700 ">Required Skills:</p>
        <div className="flex flex-wrap gap-2 mt-1">
          {job.requiredSkills.map((skill, idx) => (
            <span
              key={idx}
              className="bg-blue-50 text-blue-700 text-sm px-2 py-0.5 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <strong>Salary:</strong> {job.salaryRange || "Not disclosed"}
        </p>
        <p>
          <strong>Work Mode:</strong> {job.workMode}
        </p>
        <p>
          <strong>Location:</strong> {job.location}
        </p>
        <p>
          <strong>Apply By:</strong>{" "}
          {new Date(job.lastDateToApply).toLocaleDateString()}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200 mt-2">
        <button
          onClick={() => onToggleStatus(job._id, job.acceptingApplications)}
          className={`px-4 py-2 text-sm font-medium rounded-full cursor-pointer transition-colors ${
            job.acceptingApplications
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-500 hover:bg-gray-600 text-white"
          }`}
        >
          {job.acceptingApplications ? "Pause Hiring" : "Resume Hiring"}
        </button>

        <button
          onClick={() => navigate(`/company/job/${job._id}/applications`)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-full cursor-pointer"
        >
          <FaEye /> Applications
        </button>

        <button
          onClick={() => onEdit(job)}
          className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 text-sm rounded-full cursor-pointer"
        >
          <FaEdit /> Edit
        </button>

        <button
          onClick={() => onDelete(job)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 text-sm rounded-full cursor-pointer"
        >
          <FaTrash /> Delete
        </button>
      </div>
    </motion.div>
  );
};

export default JobCard;
