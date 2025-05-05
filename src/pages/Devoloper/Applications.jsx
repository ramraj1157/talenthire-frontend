import React, { useEffect, useState, useCallback, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEllipsisV } from "react-icons/fa";
import DeveloperHeader from "../../components/Devoloper/DeveloperHeader";
import ApplicationsCard from "../../components/Devoloper/ApplicationsCard";

const Applications = () => {
  const [applications, setApplications] = useState([]);
  const [activeTab, setActiveTab] = useState("applied");
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const loggedInDeveloperId = localStorage.getItem("developerId");

  const fetchApplications = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_BASE_URL}/api/developer/applications`,
        {
          headers: { "developer-id": loggedInDeveloperId },
        }
      );

      switch (activeTab) {
        case "rejected":
          setApplications(
            res.data.rejectedApplications.map((job) => ({
              ...job,
              jobId: job.jobId || job._id,
            }))
          );
          break;
        case "bookmarked":
          setApplications(
            res.data.onHoldApplications.map((job) => ({
              ...job,
              jobId: job.jobId || job._id,
            }))
          );
          break;
        default:
          setApplications([
            ...res.data.appliedApplications.map((job) => ({
              ...job,
              jobId: job.jobId || job._id,
              status: "Applied",
            })),
            ...res.data.underProcessApplications.map((job) => ({
              ...job,
              jobId: job.jobId || job._id,
              status: "Under Process",
            })),
            ...res.data.hiredApplications.map((job) => ({
              ...job,
              jobId: job.jobId || job._id,
              status: "Hired",
            })),
          ]);
      }
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to fetch applications"
      );
    }
  }, [activeTab, loggedInDeveloperId, API_BASE_URL]);

  useEffect(() => {
    fetchApplications();
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeTab, fetchApplications]);

  const updateStatus = async (jobId, action) => {
    try {
      await axios.put(
        `${API_BASE_URL}/api/developer/applications`,
        { jobId, action },
        {
          headers: { "developer-id": loggedInDeveloperId },
        }
      );
      toast.success(`Action '${action}' applied successfully`);
      fetchApplications();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
      <DeveloperHeader />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-8 flex-wrap">
          {["rejected", "bookmarked", "applied"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                activeTab === tab
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-700 border hover:bg-gray-100"
              }`}
            >
              Jobs {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Applications Grid */}
        {applications.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {applications.map((job, index) => (
              <ApplicationsCard
                key={job.jobId}
                job={job}
                index={index}
                activeTab={activeTab}
                openDropdown={openDropdown}
                setOpenDropdown={setOpenDropdown}
                updateStatus={updateStatus}
                dropdownRef={dropdownRef}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-12">
            No applications found.
          </div>
        )}
      </div>
    </div>
  );
};

export default Applications;
