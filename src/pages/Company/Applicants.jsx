import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  FaUserCircle,
  FaLinkedin,
  FaGithub,
  FaExternalLinkAlt,
  FaSpinner,
  FaSearch,
  FaFileExcel,
  FaEye,
  FaGlobe,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import CompanyHeader from "../../components/Company/CompanyHeader";
import ProfileModal from "../../components/Company/ProfileModal";
import * as XLSX from "xlsx";

const Applicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState({
    applied: [],
    underProcess: [],
    hired: [],
    rejected: [],
  });
  const [filteredApplications, setFilteredApplications] = useState({
    applied: [],
    underProcess: [],
    hired: [],
    rejected: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [jobTitle, setJobTitle] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_API_BASE_URL
          }/api/company/jobs/${jobId}/applications`
        );
        console.log(response);
        const { rejected, applied, underProcess, hired } =
          response.data.data.jobApplications;

        const newApplications = {
          rejected: [
            ...new Map(rejected.map((item) => [item._id, item])).values(),
          ],
          applied: [
            ...new Map(applied.map((item) => [item._id, item])).values(),
          ],
          underProcess: [
            ...new Map(underProcess.map((item) => [item._id, item])).values(),
          ],
          hired: [...new Map(hired.map((item) => [item._id, item])).values()],
        };

        setApplications(newApplications);
        setFilteredApplications(newApplications);
      } catch (error) {
        setError("Failed to load applications. Try again later.");
        console.error("Error fetching applications:", error);
      } finally {
        setLoading(false);
      }
    };

    const getJobTitle = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/api/company/jobs/${jobId}`
        );
        setJobTitle(response.data.jobTitle);
      } catch (error) {
        setError("Failed to load job title");
        console.error("Error loading job title", error);
      }
    };

    getJobTitle();
    fetchApplications();
  }, [jobId]);

  const handleStatusChange = async (developerId, newStatus) => {
    try {
      const apiEndpoints = {
        applied: {
          underProcess: `${
            import.meta.env.VITE_API_BASE_URL
          }/api/company/applications/process`,
          rejected: `${
            import.meta.env.VITE_API_BASE_URL
          }/api/company/applications/reject`,
        },
        underProcess: {
          hired: `${
            import.meta.env.VITE_API_BASE_URL
          }/api/company/applications/hire`,
          rejected: `${
            import.meta.env.VITE_API_BASE_URL
          }/api/company/applications/reject-under-process`,
        },
        rejected: {
          underProcess: `${
            import.meta.env.VITE_API_BASE_URL
          }/api/company/applications/move-rejected-to-under-process`,
        },
      };

      let currentStatus = Object.keys(applications).find((status) =>
        applications[status].some((app) => app._id === developerId)
      );
      const apiUrl = apiEndpoints[currentStatus]?.[newStatus];

      if (!apiUrl) {
        console.error("Invalid status transition");
        return;
      }

      await axios.put(apiUrl, { jobId, developerId });

      setApplications((prevApplications) => {
        const updatedApplications = { ...prevApplications };
        updatedApplications[currentStatus] = updatedApplications[
          currentStatus
        ].filter((app) => app._id !== developerId);

        if (
          !updatedApplications[newStatus].some((app) => app._id === developerId)
        ) {
          updatedApplications[newStatus].push(
            prevApplications[currentStatus].find(
              (app) => app._id === developerId
            )
          );
        }

        return updatedApplications;
      });

      setFilteredApplications((prevFiltered) => ({
        ...prevFiltered,
        [currentStatus]: prevFiltered[currentStatus].filter(
          (app) => app._id !== developerId
        ),
        [newStatus]: prevFiltered[newStatus].some(
          (app) => app._id === developerId
        )
          ? prevFiltered[newStatus]
          : [
              ...prevFiltered[newStatus],
              applications[currentStatus].find(
                (app) => app._id === developerId
              ),
            ],
      }));
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const handleSearch = (e) => {
    const searchValue = e.target.value.trim().toLowerCase();
    setSearchTerm(searchValue);

    if (!applications) return;

    if (!searchValue) {
      setFilteredApplications(applications);
      return;
    }

    const filtered = Object.keys(applications).reduce(
      (acc, status) => {
        acc[status] = (applications[status] || []).filter(
          (applicant) =>
            (applicant.fullName?.toLowerCase() || "").includes(searchValue) ||
            (applicant.skills?.join(" ").toLowerCase() || "").includes(
              searchValue
            ) ||
            status.toLowerCase().includes(searchValue) ||
            (applicant.currentJob?.toLowerCase() || "").includes(searchValue) ||
            applicant.workExperience?.some(
              (exp) =>
                (exp.jobTitle?.toLowerCase() || "").includes(searchValue) ||
                (exp.company?.toLowerCase() || "").includes(searchValue) ||
                applicant.graduationYear?.toString().includes(searchValue) ||
                false
            )
        );
        return acc;
      },
      { applied: [], underProcess: [], hired: [], rejected: [] }
    );

    setFilteredApplications(filtered);
  };

  const downloadExcel = () => {
    if (!filteredApplications) return;

    const allApplications = [
      "applied",
      "underProcess",
      "hired",
      "rejected",
    ].flatMap((status) =>
      filteredApplications[status].map((applicant) => ({
        FullName: applicant.fullName,
        Status: status.charAt(0).toUpperCase() + status.slice(1),
        Experience: `${applicant.yearsOfExperience} yrs`,
        CurrentJob: applicant.currentJob || "N/A",
        Skills: applicant.skills.join(", "),
        Degree: applicant.degree || "N/A",
        GraduationYear: applicant.graduationYear || "N/A",
        LinkedIn: applicant.linkedIn || "N/A",
        GitHub: applicant.github || "N/A",
        Portfolio: applicant.portfolio || "N/A",
      }))
    );

    const worksheet = XLSX.utils.json_to_sheet(allApplications);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Applicants");
    XLSX.writeFile(
      workbook,
      `Job_Applications_for_${jobTitle}_role_${jobId}.xlsx`
    );
  };

  const fetchDeveloperProfile = async (developerId) => {
    try {
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/company/applications/developer/${developerId}`,
        { params: { jobId } }
      );
      setSelectedProfile(response.data);
      setModalOpen(true);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <CompanyHeader />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container mx-auto p-6"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Job Applications for <span className="text-blue-500">{jobTitle}</span>
        </h2>

        {loading ? (
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <FaSpinner className="animate-spin text-4xl text-blue-500" />
            <span className="ml-2 text-lg text-gray-600">
              Loading applications...
            </span>
          </motion.div>
        ) : error ? (
          <p className="text-red-500 text-center text-lg">{error}</p>
        ) : applications.length === 0 ? (
          <p className="text-gray-600 text-center text-lg">
            No applications received yet.
          </p>
        ) : (
          <>
            <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
              <div className="relative w-full md:w-1/2">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name, skills, job title, education or status..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadExcel}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 transition"
              >
                <FaFileExcel className="mr-2" /> Download as Excel
              </motion.button>
            </div>

            <div className="overflow-x-auto bg-white rounded-lg shadow">
              <table className="w-full table-auto">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Candidate
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Work Experience
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Experience
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Skills
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Education
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700">Links</th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Status
                    </th>
                    <th className="px-4 py-2 text-left text-gray-700">
                      Profile
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {["rejected", "applied", "underProcess", "hired"].map(
                    (status) =>
                      [
                        ...new Map(
                          filteredApplications[status]?.map((app) => [
                            app._id,
                            app,
                          ])
                        ).values(),
                      ].map((applicant) => (
                        <motion.tr
                          key={applicant._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-4 py-2">
                            <div className="flex items-center">
                              {applicant.profilePhoto ? (
                                <img
                                  src={`${import.meta.env.VITE_API_BASE_URL}${
                                    applicant.profilePhoto
                                  }`}
                                  alt="Profile"
                                  className="w-10 h-10 rounded-full mr-2"
                                />
                              ) : (
                                <FaUserCircle className="w-10 h-10 text-gray-400 mr-2" />
                              )}
                              <span className="text-gray-800">
                                {applicant.fullName}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            {applicant.currentJob ? (
                              <p className="text-gray-600">
                                Currently working as {applicant.currentJob}
                              </p>
                            ) : (
                              <p className="text-gray-500">No current job</p>
                            )}
                            {applicant.workExperience.length > 0 ? (
                              applicant.workExperience.map((exp, index) => (
                                <p key={index} className="text-gray-600">
                                  {exp.jobTitle} at {exp.company}
                                </p>
                              ))
                            ) : (
                              <p className="text-gray-500">
                                No past experience
                              </p>
                            )}
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {applicant.yearsOfExperience} yrs
                          </td>
                          <td className="px-4 py-2 text-gray-600">
                            {applicant.skills.join(", ")}
                          </td>
                          <td className="px-4 py-2">
                            {Array.isArray(applicant.education) &&
                            applicant.education.length > 0 ? (
                              applicant.education.map((edu, index) => (
                                <p key={index} className="text-gray-600">
                                  <strong>{edu.degree}</strong> from{" "}
                                  {edu.college} ({edu.graduationYear})
                                </p>
                              ))
                            ) : (
                              <p className="text-gray-500">Not Provided</p>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <div className="flex space-x-2">
                              {applicant.linkedIn && (
                                <a
                                  href={applicant.linkedIn}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  <FaLinkedin size={20} />
                                </a>
                              )}
                              {applicant.github && (
                                <a
                                  href={applicant.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-gray-800 hover:text-gray-900"
                                >
                                  <FaGithub size={20} />
                                </a>
                              )}
                              {applicant.portfolio && (
                                <a
                                  href={applicant.portfolio}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-green-600 hover:text-green-800"
                                >
                                  <FaExternalLinkAlt size={20} />
                                </a>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-2">
                            {status === "hired" ? (
                              <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                                Hired
                              </span>
                            ) : (
                              <select
                                className="border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={status}
                                onChange={(e) =>
                                  handleStatusChange(
                                    applicant._id,
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" disabled>
                                  Select Status
                                </option>
                                {status === "applied" && (
                                  <>
                                    <option value="applied" disabled>
                                      Applied
                                    </option>
                                    <option value="underProcess">
                                      Under Process
                                    </option>
                                    <option value="rejected">Reject</option>
                                  </>
                                )}
                                {status === "underProcess" && (
                                  <>
                                    <option value="underProcess" disabled>
                                      Under Process
                                    </option>
                                    <option value="hired">Hire</option>
                                    <option value="rejected">Reject</option>
                                  </>
                                )}
                                {status === "rejected" && (
                                  <>
                                    <option value="rejected" disabled>
                                      Rejected
                                    </option>
                                    <option value="underProcess">
                                      Under Process
                                    </option>
                                  </>
                                )}
                              </select>
                            )}
                          </td>
                          <td className="px-4 py-2">
                            <motion.div
                              whileHover={{ scale: 1.2 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <FaEye
                                className="text-blue-500 cursor-pointer"
                                title="View Profile"
                                onClick={() =>
                                  fetchDeveloperProfile(applicant._id)
                                }
                                size={20}
                              />
                            </motion.div>
                          </td>
                        </motion.tr>
                      ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}

        <AnimatePresence>
          <ProfileModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            selectedProfile={selectedProfile}
          />
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Applicants;
