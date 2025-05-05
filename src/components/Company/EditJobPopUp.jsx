import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
  exit: { opacity: 0, scale: 0.9 },
};

const EditJobPopUp = ({ show, onClose, onSubmit, onChange, jobData }) => {
  if (!show || !jobData) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4 overflow-y-auto"
          initial="hidden"
          animate="visible"
          exit="hidden"
          variants={backdropVariants}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white text-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 relative my-10 sm:my-16"
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
              aria-label="Close"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-2xl font-semibold mb-4 text-blue-700">
              Edit Job
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Title
                </label>
                <input
                  name="jobTitle"
                  value={jobData.jobTitle}
                  onChange={onChange}
                  className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Description
                </label>
                <textarea
                  name="jobDescription"
                  value={jobData.jobDescription}
                  onChange={onChange}
                  className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Responsibilities
                </label>
                <input
                  name="responsibilities"
                  value={jobData.responsibilities.join(", ")}
                  onChange={onChange}
                  className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Required Skills
                </label>
                <input
                  name="requiredSkills"
                  value={jobData.requiredSkills.join(", ")}
                  onChange={onChange}
                  className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Salary Range
                  </label>
                  <input
                    name="salaryRange"
                    value={jobData.salaryRange}
                    onChange={onChange}
                    className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Work Mode
                  </label>
                  <select
                    name="workMode"
                    value={jobData.workMode}
                    onChange={onChange}
                    className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  >
                    <option value="Remote">Remote</option>
                    <option value="Onsite">Onsite</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Location
                  </label>
                  <input
                    name="location"
                    value={jobData.location}
                    onChange={onChange}
                    className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Date to Apply
                  </label>
                  <input
                    type="date"
                    name="lastDateToApply"
                    value={jobData.lastDateToApply}
                    onChange={onChange}
                    className="w-full px-4 py-2 border rounded border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-colors duration-200 cursor-pointer"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-full cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditJobPopUp;
