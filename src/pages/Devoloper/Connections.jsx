import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaLinkedin,
  FaGithub,
  FaGlobe,
  FaEnvelope,
  FaPhone,
  FaCheck,
  FaTimes,
  FaUndo,
  FaUserCircle,
} from "react-icons/fa";
import DevoloperHeader from "../../components/Devoloper/DeveloperHeader";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";

// Get the base URL from environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const socket = io(API_BASE_URL, {
  transports: ["websocket"],
  reconnectionAttempts: 5,
  reconnectionDelay: 3000,
});

const Connections = () => {
  const [connections, setConnections] = useState({
    connectionRequests: [],
    requested: [],
    matched: [],
  });
  const [activeTab, setActiveTab] = useState("connectionRequests");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loggedInDeveloperId = localStorage.getItem("developerId");
    if (loggedInDeveloperId) {
      socket.emit("joinRoom", loggedInDeveloperId); // Join the WebSocket room
    }

    if (!socket.connected) {
      socket.connect();
    }
    fetchConnections(); // Initial fetch when component mounts

    socket.on("connection-updated", ({ developerId }) => {
      if (developerId === loggedInDeveloperId) {
        fetchConnections();
      }
    });

    return () => {
      socket.off("connection-updated");
    };
  }, []);

  const fetchConnections = async () => {
    try {
      const loggedInDeveloperId = localStorage.getItem("developerId");
      const response = await axios.get(
        `${API_BASE_URL}/api/developer/connections`,
        {
          headers: {
            "developer-id": loggedInDeveloperId,
          },
        }
      );

      setConnections(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Error fetching connections");
      setLoading(false);
    }
  };

  const handleConnectionAction = async (targetDeveloperId, action) => {
    try {
      const loggedInDeveloperId = localStorage.getItem("developerId");
      await axios.put(
        `${API_BASE_URL}/api/developer/connections`,
        {
          targetDeveloperId,
          action,
        },
        {
          headers: {
            "developer-id": loggedInDeveloperId,
          },
        }
      );
      fetchConnections();
    } catch (err) {
      console.error(
        "Error updating connection:",
        err.response?.data?.message || err.message
      );
    }
  };

  const renderConnections = () => {
    const currentConnections = connections[activeTab];

    if (!currentConnections || currentConnections.length === 0) {
      return (
        <p className="text-center text-lg text-gray-500">
          No connections in this category.
        </p>
      );
    }

    return (
      <AnimatePresence>
        {currentConnections.map((dev) => (
          <motion.div
            key={dev.developerId}
            className={`bg-white p-6 rounded-lg shadow-lg mb-6 ${
              activeTab === "matched" ? "border-l-4 border-green-500" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Left Section */}
            <div className="flex items-center mb-4 flex-col sm:flex-row">
              {dev?.profilePhoto ? (
                <img
                  src={`${API_BASE_URL}${dev.profilePhoto}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full mr-4 mb-4 sm:mb-0"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-400 mr-4 mb-4 sm:mb-0" />
              )}
              <div>
                <h4 className="text-xl font-semibold text-gray-900">
                  {dev.fullName}
                </h4>
                <p className="text-sm text-gray-500">
                  {dev.location || "Location not specified"}
                </p>

                <div className="flex mt-2 space-x-2">
                  {dev.linkedIn && (
                    <a
                      href={dev.linkedIn}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:text-blue-700"
                    >
                      <FaLinkedin />
                    </a>
                  )}
                  {dev.github && (
                    <a
                      href={dev.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-800 hover:text-black"
                    >
                      <FaGithub />
                    </a>
                  )}
                  {dev.portfolio && (
                    <a
                      href={dev.portfolio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-500 hover:text-green-700"
                    >
                      <FaGlobe />
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Right Section */}
            <div>
              <p className="text-sm text-gray-700 mb-4">
                {dev.bio || "No bio provided"}
              </p>

              <div className="mb-4">
                <strong>Current Job:</strong>
                <p className="text-sm text-gray-500">
                  {dev.professionalDetails?.currentJob || "N/A"}
                </p>
              </div>

              {dev.workExperience && dev.workExperience.length > 0 && (
                <div className="mb-4">
                  <strong>Work Experience:</strong>
                  {dev.workExperience.map((exp, idx) => (
                    <p key={idx} className="text-sm text-gray-500">
                      {exp.jobTitle} at {exp.company} (
                      {new Date(exp.startDate).getFullYear()} -{" "}
                      {exp.endDate
                        ? new Date(exp.endDate).getFullYear()
                        : "Present"}
                      )
                    </p>
                  ))}
                </div>
              )}

              <div className="mb-4">
                <strong>Skills:</strong>
                <p className="text-sm text-gray-500">
                  {dev.professionalDetails?.skills?.join(", ") || "N/A"}
                </p>
              </div>

              {activeTab === "matched" && (
                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <FaEnvelope className="text-gray-600 mr-2" />
                    <p>{dev.email}</p>
                  </div>
                  <div className="flex items-center">
                    <FaPhone className="text-gray-600 mr-2" />
                    <p>{dev.phoneNumber}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4">
              {activeTab === "connectionRequests" && (
                <>
                  <motion.button
                    onClick={() =>
                      handleConnectionAction(dev.developerId, "accept")
                    }
                    className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaCheck /> Accept
                  </motion.button>
                  <motion.button
                    onClick={() =>
                      handleConnectionAction(dev.developerId, "reject")
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-all"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaTimes /> Reject
                  </motion.button>
                </>
              )}
              {activeTab === "requested" && (
                <motion.button
                  onClick={() =>
                    handleConnectionAction(dev.developerId, "cancelRequest")
                  }
                  className="bg-yellow-500 cursor-pointer text-white px-4 py-2 rounded-full hover:bg-yellow-600 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Cancel Request
                </motion.button>
              )}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    );
  };

  if (loading)
    return (
      <div className="h-screen flex items-center justify-center">
        <DevoloperHeader />
        <p>Loading connections...</p>
      </div>
    );
  if (error)
    return (
      <div className="h-screen flex items-center justify-center text-red-500">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      <DevoloperHeader />
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-6 flex justify-around flex-wrap">
          <motion.button
            className={`text-xl  font-semibold px-6 py-2 rounded-full cursor-pointer ${
              activeTab === "connectionRequests"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("connectionRequests")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Connection Requests
          </motion.button>
          <motion.button
            className={`text-xl font-semibold px-6 py-2 rounded-full cursor-pointer ${
              activeTab === "requested"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("requested")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Requested
          </motion.button>
          <motion.button
            className={`text-xl font-semibold px-6 py-2 rounded-full cursor-pointer ${
              activeTab === "matched"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => setActiveTab("matched")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Matched Developers
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {renderConnections()}
        </div>
      </div>
    </div>
  );
};

export default Connections;
