import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  exit: { opacity: 0, scale: 0.9 },
};

const CreateJobPopUp = ({
  show,
  onClose,
  onSubmit,
  submitting,
  newJob,
  onChange,
}) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-gray-800 bg-opacity-40 z-50 flex items-center justify-center px-4 sm:px-6 md:px-8 overflow-y-auto"
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

            <h2 className="text-2xl font-semibold mb-4 pt-20 text-blue-700">
              Create New Job
            </h2>

            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Title
                </label>
                <input
                  type="text"
                  name="jobTitle"
                  value={newJob.jobTitle}
                  onChange={onChange}
                  required
                  className="w-full px-4 py-2 border rounded bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g. Frontend Developer"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Job Description
                </label>
                <textarea
                  name="jobDescription"
                  value={newJob.jobDescription}
                  onChange={onChange}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border rounded bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the job in detail..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Responsibilities
                </label>
                <input
                  type="text"
                  name="responsibilities"
                  value={newJob.responsibilities}
                  onChange={onChange}
                  placeholder="Separate with commas"
                  className="w-full px-4 py-2 border rounded bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Required Skills
                </label>
                <input
                  type="text"
                  name="requiredSkills"
                  value={newJob.requiredSkills}
                  onChange={onChange}
                  placeholder="e.g. React, Node.js, TypeScript"
                  className="w-full px-4 py-2 border rounded bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Salary Range
                  </label>
                  <input
                    type="text"
                    name="salaryRange"
                    value={newJob.salaryRange}
                    onChange={onChange}
                    placeholder="e.g. $60k - $80k"
                    className="w-full px-4 py-2 border rounded bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Work Mode
                  </label>
                  <select
                    name="workMode"
                    value={newJob.workMode}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-2 border rounded bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select</option>
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
                    type="text"
                    name="location"
                    value={newJob.location}
                    onChange={onChange}
                    placeholder="e.g. New York, USA"
                    className="w-full px-4 py-2 border rounded bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Date to Apply
                  </label>
                  <input
                    type="date"
                    name="lastDateToApply"
                    value={newJob.lastDateToApply}
                    onChange={onChange}
                    required
                    className="w-full px-4 py-2 border rounded bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full transition-colors duration-200 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Create Job"}
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="text-gray-600 hover:text-red-600 cursor-pointer"
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

export default CreateJobPopUp;
