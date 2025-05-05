import React from "react";
import { motion } from "framer-motion";
import {
  FaUserCircle,
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaInfoCircle,
} from "react-icons/fa";

const ProfileModal = ({ modalOpen, setModalOpen, selectedProfile }) => {
  if (!modalOpen || !selectedProfile) return null;

  const sectionDivider = <hr className="my-4 border-t border-gray-200" />;

  const fallbackText = (text) => (
    <p className="text-gray-500 italic flex items-center">
      <FaInfoCircle className="mr-2" /> {text}
    </p>
  );

  const renderBadgeList = (items, color = "green") =>
    items?.length > 0 ? (
      <div className="flex flex-wrap gap-2 mt-1">
        {items.map((item, idx) => (
          <span
            key={idx}
            className={`inline-block bg-${color}-100 text-${color}-800 text-sm font-medium px-2 py-1 rounded-full`}
          >
            {item}
          </span>
        ))}
      </div>
    ) : (
      fallbackText("No items listed")
    );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto p-6 relative shadow-2xl scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => setModalOpen(false)}
          className="fixed top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl z-50"
        >
          ×
        </motion.button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <div className="flex items-start mb-6">
              {selectedProfile.profilePhoto ? (
                <img
                  src={`${import.meta.env.VITE_API_BASE_URL}${
                    selectedProfile.profilePhoto
                  }`}
                  alt="Profile"
                  className="w-16 h-16 rounded-full mr-4 border-2 border-gray-200"
                />
              ) : (
                <FaUserCircle className="w-16 h-16 text-gray-400 mr-4" />
              )}
              <div>
                <h2 className="text-2xl font-bold text-gray-800">
                  {selectedProfile.fullName}
                </h2>
                <p className="text-gray-600">
                  {selectedProfile.location || "Location not provided"}
                </p>
                <p className="text-gray-600 mt-1">
                  {selectedProfile.bio || "No bio available"}
                </p>
                <p className="text-gray-600 mt-1">
                  <strong>Email:</strong> {selectedProfile.email}
                </p>
                <p className="text-gray-600">
                  <strong>Phone:</strong>{" "}
                  {selectedProfile.phoneNumber || "Not provided"}
                </p>
              </div>
            </div>

            <div className="flex space-x-4 mb-6">
              {selectedProfile.linkedIn && (
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href={selectedProfile.linkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800"
                >
                  <FaLinkedin size={24} />
                </motion.a>
              )}
              {selectedProfile.github && (
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href={selectedProfile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-900"
                >
                  <FaGithub size={24} />
                </motion.a>
              )}
              {selectedProfile.portfolio && (
                <motion.a
                  whileHover={{ scale: 1.2 }}
                  href={selectedProfile.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-600 hover:text-green-800"
                >
                  <FaGlobe size={24} />
                </motion.a>
              )}
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Professional Details
            </h3>
            <p className="text-gray-600">
              <strong>Current Job:</strong>{" "}
              {selectedProfile.professionalDetails?.currentJob ||
                "Not currently employed"}
            </p>
            <p className="text-gray-600">
              <strong>Experience:</strong>{" "}
              {selectedProfile.professionalDetails?.yearsOfExperience || 0}{" "}
              years
            </p>
            <p className="text-gray-600">
              <strong>Skills:</strong>
            </p>
            {renderBadgeList(selectedProfile.professionalDetails?.skills)}

            <p className="text-gray-600 mt-2">
              <strong>Job Roles Interested:</strong>
            </p>
            {renderBadgeList(
              selectedProfile.professionalDetails?.jobRolesInterested,
              "blue"
            )}

            {sectionDivider}

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Education
            </h3>
            {selectedProfile.education?.length > 0 ? (
              <ul className="list-disc pl-5 text-gray-600">
                {selectedProfile.education.map((edu, index) => (
                  <li key={index}>
                    <strong>{edu.degree}</strong> from {edu.college} (
                    {edu.graduationYear})
                  </li>
                ))}
              </ul>
            ) : (
              fallbackText("No education details provided")
            )}
          </motion.div>

          {/* Right Column */}
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Work Experience
            </h3>
            {selectedProfile.workExperience?.length > 0 ? (
              <ul className="space-y-4">
                {selectedProfile.workExperience.map((exp, index) => (
                  <li key={index} className="text-gray-600">
                    <strong>{exp.jobTitle}</strong> at {exp.company} (
                    {exp.startDate?.substring(0, 10)} -{" "}
                    {exp.endDate?.substring(0, 10) || "Present"})
                    <p className="mt-1">
                      <strong>Responsibilities:</strong>
                    </p>
                    <ul className="list-disc pl-5">
                      {exp.responsibilities?.length > 0 ? (
                        exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-gray-600">
                            {resp}
                          </li>
                        ))
                      ) : (
                        <li className="text-gray-500">
                          No responsibilities listed
                        </li>
                      )}
                    </ul>
                  </li>
                ))}
              </ul>
            ) : (
              fallbackText("No work experience available")
            )}

            {sectionDivider}

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Additional Information
            </h3>
            <p className="text-gray-600">
              <strong>Certifications:</strong>
            </p>
            {renderBadgeList(selectedProfile.additionalInfo?.certifications)}

            <p className="text-gray-600 mt-2">
              <strong>Achievements:</strong>
            </p>
            {renderBadgeList(selectedProfile.additionalInfo?.achievements)}

            <p className="text-gray-600 mt-2">
              <strong>Languages:</strong>
            </p>
            {renderBadgeList(
              selectedProfile.additionalInfo?.languages,
              "purple"
            )}

            {sectionDivider}

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Preferences
            </h3>
            <p className="text-gray-600">
              <strong>Expected Stipend:</strong>{" "}
              {selectedProfile.expectedStipend?.join(", ") || "Not specified"}
            </p>
            <p className="text-gray-600">
              <strong>Work Mode:</strong>{" "}
              {selectedProfile.workMode || "Not specified"}
            </p>
            <p className="text-gray-600">
              <strong>Preferred Locations:</strong>{" "}
              {selectedProfile.preferredLocations?.join(", ") ||
                "Not specified"}
            </p>
            <p className="text-gray-600">
              <strong>Languages Preferred:</strong>{" "}
              {selectedProfile.languagesPreferred?.join(", ") ||
                "Not specified"}
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProfileModal;
