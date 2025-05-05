import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaEllipsisV } from "react-icons/fa";

const ApplicationsCard = ({
  job,
  index,
  activeTab,
  openDropdown,
  setOpenDropdown,
  updateStatus,
  dropdownRef,
}) => {
  const handleAction = (action) => {
    updateStatus(job.jobId, action);
    setOpenDropdown(null);
  };

  return (
    <motion.div
      key={job.jobId}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-lg p-5 border relative"
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-blue-700">{job.jobTitle}</h3>
        {job.status !== "Hired" && (
          <div ref={dropdownRef} className="relative">
            <button
              aria-label="Open dropdown"
              onClick={() =>
                setOpenDropdown(openDropdown === job.jobId ? null : job.jobId)
              }
            >
              <FaEllipsisV className="text-gray-500 hover:text-gray-700 transition" />
            </button>

            <AnimatePresence>
              {openDropdown === job.jobId && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute right-0 mt-2 w-44 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                >
                  <ul className="py-1 text-sm text-gray-700">
                    {activeTab === "rejected" && (
                      <>
                        <li
                          onClick={() => handleAction("delete")}
                          className="px-4 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2"
                        >
                          🗑 Delete
                        </li>
                        <li
                          onClick={() => handleAction("apply")}
                          className="px-4 py-2 hover:bg-blue-100 cursor-pointer flex items-center gap-2"
                        >
                          🔄 Re-Apply
                        </li>
                      </>
                    )}
                    {activeTab === "bookmarked" && (
                      <>
                        <li
                          onClick={() => handleAction("reject")}
                          className="px-4 py-2 hover:bg-yellow-100 cursor-pointer flex items-center gap-2"
                        >
                          ❌ Reject
                        </li>
                        <li
                          onClick={() => handleAction("delete")}
                          className="px-4 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2"
                        >
                          🗑 Delete
                        </li>
                        <li
                          onClick={() => handleAction("apply")}
                          className="px-4 py-2 hover:bg-green-100 cursor-pointer flex items-center gap-2"
                        >
                          🔖 Apply
                        </li>
                      </>
                    )}
                    {activeTab === "applied" && job.status !== "Hired" && (
                      <li
                        onClick={() => handleAction("reject")}
                        className="px-4 py-2 hover:bg-red-100 cursor-pointer flex items-center gap-2"
                      >
                        ❌ Withdraw
                      </li>
                    )}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>

      {/* Description */}
      <p className="text-sm text-gray-700 mb-2">{job.jobDescription}</p>

      {/* Responsibilities & Skills */}
      <div className="mb-2 text-sm text-gray-600">
        <strong>Responsibilities:</strong> {job.responsibilities.join(", ")}
      </div>
      <div className="mb-2 text-sm text-gray-600">
        <strong>Skills:</strong> {job.requiredSkills.join(", ")}
      </div>

      {/* Meta Info */}
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
        <div>💼 {job.salaryRange}</div>
        <div>🏢 {job.workMode}</div>
        <div>📍 {job.location}</div>
        <div>📅 {new Date(job.lastDateToApply).toLocaleDateString()}</div>
      </div>

      {/* Status Badge */}
      <div className="mt-2 text-sm font-medium">
        Status:{" "}
        <span
          className={`px-2 py-1 rounded ${
            job.status === "Hired"
              ? "bg-green-100 text-green-700"
              : job.status === "Under Process"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-blue-100 text-blue-700"
          }`}
        >
          {job.status || "N/A"}
        </span>
      </div>
    </motion.div>
  );
};

export default ApplicationsCard;
