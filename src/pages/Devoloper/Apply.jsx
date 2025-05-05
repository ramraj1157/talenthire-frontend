// src/pages/Developer/Apply.jsx
import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import DeveloperHeader from "../../components/Devoloper/DeveloperHeader";
import JobCard from "../../components/Devoloper/JobCard";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://talentbridge-backend.onrender.com";

const Apply = () => {
  const [jobs, setJobs] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const developerId = localStorage.getItem("developerId");

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/developer/jobs`, {
          headers: { "developer-id": developerId },
        });
        setJobs(response.data);
      } catch (err) {
        toast.error("Failed to load jobs.");
      }
    };

    fetchJobs();
  }, [developerId]);

  const handleSwipe = useCallback(
    async (action) => {
      if (jobs.length === 0 || currentIndex >= jobs.length) return;
      const jobId = jobs[currentIndex]._id;

      try {
        await axios.post(
          `${API_BASE_URL}/api/developer/jobs`,
          { jobId, action },
          {
            headers: {
              "developer-id": developerId,
              "Content-Type": "application/json",
            },
          }
        );

        toast.success(
          `You ${
            action === "swipeRight" ? "applied to" : "rejected"
          } the job role of ${jobs[currentIndex].jobTitle}`
        );
        setCurrentIndex((prevIndex) => prevIndex + 1);
      } catch (err) {
        toast.error("Error recording swipe action. Please try again.");
      }
    },
    [jobs, currentIndex, developerId]
  );

  const handleBookmark = async () => {
    if (jobs.length === 0 || currentIndex >= jobs.length) return;

    const jobId = jobs[currentIndex]._id;

    try {
      await axios.post(
        `${API_BASE_URL}/api/developer/jobs`,
        { jobId, action: "underHold" },
        {
          headers: {
            "developer-id": developerId,
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(`You marked ${jobs[currentIndex].jobTitle} as Under Hold`);
      setCurrentIndex((prevIndex) => prevIndex + 1);
    } catch (err) {
      toast.error("Error marking job as under hold. Please try again.");
    }
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowRight") handleSwipe("swipeRight");
      if (event.key === "ArrowLeft") handleSwipe("swipeLeft");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleSwipe]);

  return (
    <div className="min-h-screen bg-gray-50">
      <DeveloperHeader />
      <div className="p-4">
        <motion.div
          className="apply-container max-w-lg mx-auto bg-white rounded-lg shadow-lg p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {jobs.length > 0 && currentIndex < jobs.length ? (
            <JobCard
              job={jobs[currentIndex]}
              onApply={() => handleSwipe("swipeRight")}
              onReject={() => handleSwipe("swipeLeft")}
              onBookmark={handleBookmark}
            />
          ) : (
            <p>No more jobs to show.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Apply;
