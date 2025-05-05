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

const DeleteJob = ({ show, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center px-4 z-50"
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
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md text-center relative"
          >
            {/* Close Icon */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-600 cursor-pointer"
              aria-label="Close"
            >
              <FaTimes size={18} />
            </button>

            <h2 className="text-xl font-bold text-red-600 mb-3">
              Confirm Job Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              This will permanently remove the job and its applications.
              <br />
              <strong>This action cannot be undone.</strong>
            </p>

            <div className="flex justify-center gap-4">
              <button
                onClick={onConfirm}
                className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full transition duration-200 cursor-pointer"
              >
                Yes, Delete
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-5 py-2 rounded-full transition duration-200 cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default DeleteJob;
