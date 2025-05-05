import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBriefcase,
  FaFileAlt,
  FaPlus,
  FaTasks,
  FaUserCheck,
} from "react-icons/fa";
import { AnimatePresence } from "framer-motion";
import CompanyHeader from "../../components/Company/CompanyHeader";
import JobCard from "../../components/Company/JobCard";
import CreateJobPopUp from "../../components/Company/CreateJobPopUp";
import EditJobPopUp from "../../components/Company/EditJobPopUp";
import DeleteJob from "../../components/Company/DeleteJob";
import StatCard from "../../components/Company/StatCard";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const CompanyDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [companyName, setCompanyName] = useState(null);
  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [editJobData, setEditJobData] = useState(null);
  const [jobToDelete, setJobToDelete] = useState(null);

  const [newJob, setNewJob] = useState({
    jobTitle: "",
    jobDescription: "",
    responsibilities: "",
    requiredSkills: "",
    salaryRange: "",
    workMode: "Remote",
    location: "",
    lastDateToApply: "",
  });

  // Stats
  const [totalApplications, setTotalApplications] = useState(0);
  const [totalHires, setTotalHires] = useState(0);
  const [activeJobsCount, setActiveJobsCount] = useState(0);

  const companyId = localStorage.getItem("companyId");

  // ✅ Utility: Deduplicate jobs by _id and remove ones without _id
  const deduplicateJobs = (jobList) => {
    const seen = new Set();
    return jobList.filter((job) => {
      if (!job._id || seen.has(job._id)) return false;
      seen.add(job._id);
      return true;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [jobsRes, nameRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/api/company/jobs`, {
            headers: { "company-id": companyId },
          }),
          axios.get(`${API_BASE_URL}/api/company/jobs/companyname`, {
            headers: { "company-id": companyId },
          }),
        ]);

        let jobsData = deduplicateJobs(jobsRes.data || []);
        setJobs(jobsData);
        setCompanyName(nameRes.data.companyName);

        // Stats
        let ApplicationsCount = 0;
        let hiredCount = 0;
        const activeCount = jobsData.filter(
          (job) => job.acceptingApplications
        ).length;

        for (const job of jobsData) {
          const jobId = job._id;
          try {
            const hiresRes = await axios.get(
              `${API_BASE_URL}/api/company/applications/total-hires/${jobId}`
            );

            const response = await axios.get(
              `${API_BASE_URL}/api/company/jobs/${jobId}/applications`
            );

            const { rejected, applied, underProcess, hired } =
              response.data.data.jobApplications;

            ApplicationsCount +=
              rejected.length +
              applied.length +
              underProcess.length +
              hired.length;

            hiredCount += hiresRes.data.count || 0;
          } catch (error) {
            console.error(`Error fetching hires for job ${jobId}:`, error);
          }
        }

        setTotalApplications(ApplicationsCount);
        setTotalHires(hiredCount);
        setActiveJobsCount(activeCount);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [companyId]);

  // Handlers
  const handleInputChange = (e) =>
    setNewJob({ ...newJob, [e.target.name]: e.target.value });

  const handleEditInputChange = (e) =>
    setEditJobData({ ...editJobData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    const formattedJob = {
      ...newJob,
      responsibilities: newJob.responsibilities.split(",").map((r) => r.trim()),
      requiredSkills: newJob.requiredSkills.split(",").map((s) => s.trim()),
    };

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/company/jobs/create`,
        formattedJob,
        {
          headers: { "company-id": companyId },
        }
      );

      // Add and deduplicate again after creation
      const updatedJobs = deduplicateJobs([...jobs, res.data.job]);
      setJobs(updatedJobs);

      setShowModal(false);
      setNewJob({
        jobTitle: "",
        jobDescription: "",
        responsibilities: "",
        requiredSkills: "",
        salaryRange: "",
        workMode: "Remote",
        location: "",
        lastDateToApply: "",
      });

      // Success notification
      toast.success("Job created successfully!");
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `${API_BASE_URL}/api/company/jobs/${editJobData._id}`,
        editJobData
      );
      const updatedJobs = jobs.map((job) =>
        job._id === editJobData._id ? res.data.job : job
      );
      setJobs(deduplicateJobs(updatedJobs));
      setShowEditModal(false);

      // Success notification
      toast.success("Job updated successfully!");
    } catch (error) {
      console.error("Error editing job:", error);
      toast.error("Failed to update job. Please try again.");
    }
  };

  const confirmDeleteJob = (job) => {
    setJobToDelete(job);
    setShowDeleteModal(true);
  };

  const deleteJob = async () => {
    try {
      await axios.delete(`${API_BASE_URL}/api/company/jobs/${jobToDelete._id}`);
      setJobs(jobs.filter((job) => job._id !== jobToDelete._id));
      setShowDeleteModal(false);
      setJobToDelete(null);

      // Success notification
      toast.success("Job deleted successfully!");
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job. Please try again.");
    }
  };

  const toggleJobApplicationStatus = async (jobId, currentStatus) => {
    try {
      const res = await axios.patch(
        `${API_BASE_URL}/api/company/jobs/${jobId}`,
        {
          acceptingApplications: !currentStatus,
        }
      );
      setJobs(jobs.map((job) => (job._id === jobId ? res.data.job : job)));
    } catch (error) {
      console.error("Error toggling job status:", error);
    }
  };

  const safeJobs = deduplicateJobs(jobs);

  return (
    <div className="bg-gray-50 min-h-screen">
      <CompanyHeader />
      <div className="max-w-6xl mx-auto p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          <span className="text-blue-500">{companyName}</span>'s Dashboard
        </h2>

        {/* Stat Summary */}
        {!loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 py-5 gap-6">
            <StatCard
              title="Jobs Posted"
              value={safeJobs.length}
              icon={FaBriefcase}
              color="blue"
              tooltip="Total number of jobs posted"
            />
            <StatCard
              title="People Hired"
              value={totalHires}
              icon={FaUserCheck}
              color="green"
              tooltip="Number of candidates successfully hired"
            />
            <StatCard
              title="Applications Received"
              value={totalApplications}
              icon={FaFileAlt}
              color="purple"
              tooltip="All applications submitted"
            />
            <StatCard
              title="Active Jobs"
              value={activeJobsCount}
              icon={FaTasks}
              color="orange"
              tooltip="Jobs currently open and accepting applications"
            />
          </div>
        )}

        <div className="text-center mb-6">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-blue-700 flex items-center justify-center gap-2 mx-auto"
          >
            <FaPlus /> Post a New Job
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : safeJobs.length === 0 ? (
          <p className="text-center text-gray-500">
            No jobs found. Start by posting one!
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {safeJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                onEdit={(j) => {
                  setEditJobData(j);
                  setShowEditModal(true);
                }}
                onDelete={confirmDeleteJob}
                onToggleStatus={toggleJobApplicationStatus}
              />
            ))}
          </div>
        )}

        {/* Modals */}
        <AnimatePresence>
          <CreateJobPopUp
            show={showModal}
            onClose={() => setShowModal(false)}
            onSubmit={handleSubmit}
            submitting={submitting}
            newJob={newJob}
            onChange={handleInputChange}
          />
          <EditJobPopUp
            show={showEditModal}
            onClose={() => setShowEditModal(false)}
            onSubmit={handleEditSubmit}
            onChange={handleEditInputChange}
            jobData={editJobData}
          />
          <DeleteJob
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={deleteJob}
          />
        </AnimatePresence>

        {/* Toast Container */}
      </div>
    </div>
  );
};

export default CompanyDashboard;
