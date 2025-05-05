// src/components/Developer/ConnectCard.jsx
import React from "react";
import { FaLinkedin, FaGithub, FaGlobe, FaUserCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const ConnectCard = ({ developer, apiBaseUrl }) => {
  const containerVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      variants={containerVariant}
      initial="hidden"
      animate="visible"
      className="bg-white shadow-2xl rounded-2xl overflow-hidden flex flex-col lg:flex-row p-8 gap-8 transition-all duration-300"
    >
      {/* Left Column */}
      <div className="lg:w-1/2 space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          {developer.profilePhoto ? (
            <img
              src={`${apiBaseUrl}${developer.profilePhoto}`}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-blue-400 shadow-md"
            />
          ) : (
            <FaUserCircle size={100} className="text-blue-300" />
          )}
          <h2 className="text-2xl font-bold text-gray-800">
            {developer.fullName}
          </h2>
          <p className="text-sm text-gray-500">
            {developer.location || "No location"}
          </p>
          <p className="text-gray-700 text-sm">
            {developer.bio || "No bio available."}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-5 text-blue-600 text-2xl">
          {developer.linkedIn && (
            <a
              href={developer.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-800 transition"
            >
              <FaLinkedin />
            </a>
          )}
          {developer.github && (
            <a
              href={developer.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-800 transition"
            >
              <FaGithub />
            </a>
          )}
          {developer.portfolio && (
            <a
              href={developer.portfolio}
              target="_blank"
              rel="noreferrer"
              className="hover:text-blue-800 transition"
            >
              <FaGlobe />
            </a>
          )}
        </div>

        {/* Professional Details */}
        {developer.professionalDetails && (
          <div className="text-sm text-gray-700 space-y-1">
            <h3 className="text-blue-700 font-semibold">Professional</h3>
            <p>
              <strong>Job:</strong> {developer.professionalDetails.currentJob}{" "}
              at {developer.professionalDetails.company || "N/A"}
            </p>
            <p>
              <strong>Experience:</strong>{" "}
              {developer.professionalDetails.yearsOfExperience} years
            </p>
            <div>
              <strong>Skills:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {developer.professionalDetails.skills?.map((skill, i) => (
                  <span
                    key={i}
                    className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                )) || "N/A"}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {developer.education?.length > 0 && (
          <div className="text-sm text-gray-700 space-y-1">
            <h3 className="text-blue-700 font-semibold">Education</h3>
            {developer.education.map((edu, idx) => (
              <p key={idx}>
                {edu.degree} - {edu.college} ({edu.graduationYear})
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Right Column */}
      <div className="lg:w-1/2 space-y-6 text-sm text-gray-700">
        {/* Experience */}
        {developer.workExperience?.length > 0 && (
          <div>
            <h3 className="text-blue-700 font-semibold mb-1">Experience</h3>
            {developer.workExperience.map((work, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-semibold text-gray-800">
                  {work.jobTitle} - {work.company} ({work.startDate} –{" "}
                  {work.endDate || "Present"})
                </p>
                <ul className="list-disc list-inside text-gray-600 mt-1">
                  {work.responsibilities.map((res, i) => (
                    <li key={i}>{res}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Additional Info */}
        {developer.additionalInfo && (
          <div>
            <h3 className="text-blue-700 font-semibold mb-1">
              Additional Info
            </h3>
            <p>
              <strong>Certifications:</strong>{" "}
              {developer.additionalInfo.certifications?.join(", ") || "N/A"}
            </p>
            <p>
              <strong>Achievements:</strong>{" "}
              {developer.additionalInfo.achievements?.join(", ") || "N/A"}
            </p>
            <div className="mt-2">
              <strong>Languages:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {developer.additionalInfo.languages?.map((lang, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs"
                  >
                    {lang}
                  </span>
                )) || "N/A"}
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ConnectCard;
