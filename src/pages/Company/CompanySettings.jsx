import React, { useState } from "react";
import axios from "axios";
import CompanyHeader from "../../components/Company/CompanyHeader";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { motion } from "framer-motion";
import {
  FaEnvelope,
  FaLock,
  FaTrash,
  FaSignOutAlt,
  FaBuilding,
} from "react-icons/fa";

Modal.setAppElement("#root");

const CompanySettings = () => {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const companyId = localStorage.getItem("companyId");

  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleUpdateEmail = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/api/company/settings/update-email`,
        { newEmail: email },
        { headers: { companyid: companyId } }
      );
      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error updating email");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/api/company/settings/update-password`,
        { currentPassword, newPassword },
        { headers: { companyid: companyId } }
      );
      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error changing password");
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCompanyName = async () => {
    try {
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/api/company/settings/change-name`,
        { newName: companyName },
        { headers: { companyid: companyId } }
      );
      setMessage(response.data.message);
      setMessageType("success");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Error updating company name"
      );
      setMessageType("error");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${BASE_URL}/api/company/settings/delete-account`,
        { headers: { companyid: companyId } }
      );
      setMessage(response.data.message);
      setMessageType("success");
      localStorage.removeItem("companyId");
      navigate("/");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error deleting account");
      setMessageType("error");
    } finally {
      setLoading(false);
      setModalIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("companyId");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CompanyHeader />
      <motion.div
        className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {message && (
          <p
            className={`mb-4 text-sm text-center rounded p-2 ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </p>
        )}

        <div className="space-y-6">
          {/* Email */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" />
              <h3 className="font-semibold text-lg">Update Email</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="email"
                placeholder="New email"
                className="border px-3 py-2 rounded-md"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                onClick={handleUpdateEmail}
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white px-4 py-2 rounded-full"
              >
                Update Email
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
            <div className="flex items-center gap-2">
              <FaLock className="text-yellow-500" />
              <h3 className="font-semibold text-lg">Change Password</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="password"
                placeholder="Current password"
                className="border px-3 py-2 rounded-md"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="New password"
                className="border px-3 py-2 rounded-md"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="bg-yellow-500 hover:bg-yellow-600 cursor-pointer text-white px-4 py-2 rounded-full"
              >
                Change
              </button>
            </div>
          </div>

          {/* Company Name */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-4">
            <div className="flex items-center gap-2">
              <FaBuilding className="text-green-600" />
              <h3 className="font-semibold text-lg">Update Company Name</h3>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="New company name"
                className="border px-3 py-2 rounded-md"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
              <button
                onClick={handleUpdateCompanyName}
                disabled={loading}
                className="bg-green-600 hover:bg-green-700 cursor-pointer text-white px-4 py-2 rounded-full"
              >
                Update
              </button>
            </div>
          </div>

          {/* Delete Account */}
          <div className="flex items-center justify-between text-red-600">
            <div className="flex items-center gap-2">
              <FaTrash />
              <h3 className="font-semibold text-lg">Delete Account</h3>
            </div>
            <button
              onClick={() => setModalIsOpen(true)}
              className="px-4 py-2 border border-red-600 rounded-full cursor-pointer hover:bg-red-100"
            >
              Delete
            </button>
          </div>

          {/* Logout */}
          <div className="flex items-center justify-between text-gray-700">
            <div className="flex items-center gap-2">
              <FaSignOutAlt />
              <h3 className="font-semibold text-lg">Logout</h3>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-gray-700 text-white rounded-full cursor-pointer hover:bg-gray-800"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="bg-white max-w-md p-6 rounded-lg shadow-lg mx-auto mt-40"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-xl font-semibold mb-2">Are you sure?</h3>
        <p className="text-gray-600 mb-4">
          This action is irreversible. All company data will be deleted.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDeleteAccount}
            disabled={loading}
            className="bg-red-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-red-700"
          >
            Yes, Delete
          </button>
          <button
            onClick={() => setModalIsOpen(false)}
            className="bg-gray-300 px-4 py-2 rounded-full hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default CompanySettings;
