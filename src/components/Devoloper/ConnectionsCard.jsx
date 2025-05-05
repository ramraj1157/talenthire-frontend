import React from "react";
import { motion } from "framer-motion";
import { FaLinkedin, FaGithub, FaGlobe, FaUserCircle } from "react-icons/fa";

const ConnectionsCard = ({ developer, API_BASE_URL }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-xl rounded-2xl overflow-hidden p-6 flex flex-col lg:flex-row gap-6"
    >
      {/* Left Section */}
      <div className="lg:w-1/2 space-y-5">
        <div className="flex flex-col items-center text-center">
          {developer.profilePhoto ? (
            <img
              src={`${API_BASE_URL}${developer.profilePhoto}`}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow"
            />
          ) : (
            <FaUserCircle size={100} className="text-blue-300" />
          )}

          <h2 className="text-2xl font-bold text-gray-800 mt-2">
            {developer.fullName}
          </h2>
          <p className="text-sm text-gray-500">
            {developer.location || "No location"}
          </p>
          <p className="text-gray-600 max-w-xs">
            {developer.bio || "No bio available."}
          </p>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 text-blue-600 text-xl">
          {developer.linkedIn && (
            <a
              href={developer.linkedIn}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition"
            >
              <FaLinkedin />
            </a>
          )}
          {developer.github && (
            <a
              href={developer.github}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition"
            >
              <FaGithub />
            </a>
          )}
          {developer.portfolio && (
            <a
              href={developer.portfolio}
              target="_blank"
              rel="noreferrer"
              className="hover:scale-110 transition"
            >
              <FaGlobe />
            </a>
          )}
        </div>

        {/* Professional Section */}
        {developer.professionalDetails && (
          <div className="text-sm space-y-1">
            <h3 className="text-blue-700 font-semibold text-md">
              Professional
            </h3>
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
                {developer.professionalDetails.skills?.map((skill, idx) => (
                  <span
                    key={idx}
                    className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full text-xs"
                  >
                    {skill}
                  </span>
                )) || <span>N/A</span>}
              </div>
            </div>
          </div>
        )}

        {/* Education */}
        {developer.education?.length > 0 && (
          <div className="text-sm">
            <h3 className="text-blue-700 font-semibold text-md mb-1">
              Education
            </h3>
            {developer.education.map((edu, idx) => (
              <p key={idx}>
                {edu.degree} - {edu.college} ({edu.graduationYear})
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Right Section */}
      <div className="lg:w-1/2 space-y-6 text-sm">
        {/* Experience */}
        {developer.workExperience?.length > 0 && (
          <div>
            <h3 className="text-blue-700 font-semibold text-md mb-1">
              Experience
            </h3>
            {developer.workExperience.map((work, idx) => (
              <div key={idx} className="mb-3">
                <p className="font-semibold text-gray-800">
                  {work.jobTitle} - {work.company} ({work.startDate} -{" "}
                  {work.endDate || "Present"})
                </p>
                <ul className="list-disc pl-5 text-gray-600">
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
            <h3 className="text-blue-700 font-semibold text-md mb-1">
              Additional Info
            </h3>
            <div className="mb-1">
              <strong>Certifications:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {developer.additionalInfo.certifications?.map((c, i) => (
                  <span
                    key={i}
                    className="bg-green-100 text-green-800 px-2 py-0.5 rounded-full text-xs"
                  >
                    {c}
                  </span>
                )) || "N/A"}
              </div>
            </div>
            <div className="mb-1">
              <strong>Achievements:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {developer.additionalInfo.achievements?.map((a, i) => (
                  <span
                    key={i}
                    className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full text-xs"
                  >
                    {a}
                  </span>
                )) || "N/A"}
              </div>
            </div>
            <div>
              <strong>Languages:</strong>
              <div className="flex flex-wrap gap-2 mt-1">
                {developer.additionalInfo.languages?.map((l, i) => (
                  <span
                    key={i}
                    className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs"
                  >
                    {l}
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

export default ConnectionsCard;
