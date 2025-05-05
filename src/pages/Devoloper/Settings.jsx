import React, { useState } from "react";
import axios from "axios";
import {
  FaEnvelope,
  FaLock,
  FaPhone,
  FaTrash,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import DeveloperHeader from "../../components/Devoloper/DeveloperHeader";

Modal.setAppElement("#root");

const Settings = () => {
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_BASE_URL;

  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const developerId = localStorage.getItem("developerId");

  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // Validation
  const validateEmail = (email) => {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email) return setEmailError("Email is required"), false;
    if (!emailRegex.test(email))
      return setEmailError("Invalid email format"), false;
    setEmailError("");
    return true;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    if (!phone) return setPhoneError("Phone number is required"), false;
    if (!phoneRegex.test(phone))
      return setPhoneError("Phone must be 10 digits"), false;
    setPhoneError("");
    return true;
  };

  const validatePassword = () => {
    if (!currentPassword)
      return setPasswordError("Current password is required"), false;
    if (!newPassword)
      return setPasswordError("New password is required"), false;
    if (newPassword.length < 6)
      return setPasswordError("Password must be at least 6 characters"), false;
    setPasswordError("");
    return true;
  };

  // Action Handlers
  const handleUpdateEmail = async () => {
    if (!validateEmail(email)) return;
    try {
      setLoading(true);
      const res = await axios.put(
        `${API}/api/developer/settings/update-email`,
        { newEmail: email },
        {
          headers: { "developer-id": developerId },
        }
      );
      toast.success(res.data.message);
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update email");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!validatePassword()) return;
    try {
      setLoading(true);
      const res = await axios.put(
        `${API}/api/developer/settings/change-password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: { "developer-id": developerId },
        }
      );
      toast.success(res.data.message);
      setCurrentPassword("");
      setNewPassword("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdatePhoneNumber = async () => {
    if (!validatePhone(phoneNumber)) return;
    try {
      setLoading(true);
      const res = await axios.put(
        `${API}/api/developer/settings/update-phone`,
        {
          newPhoneNumber: phoneNumber,
        },
        {
          headers: { "developer-id": developerId },
        }
      );
      toast.success(res.data.message);
      setPhoneNumber("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update phone");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      setLoading(true);
      await axios.delete(`${API}/api/developer/settings/delete-account`, {
        headers: { "developer-id": developerId },
      });
      localStorage.removeItem("developerId");
      toast.success("Account deleted successfully");
      navigate("/");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error deleting account");
    } finally {
      setLoading(false);
      setModalIsOpen(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("developerId");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DeveloperHeader />

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="max-w-4xl mx-auto px-4 py-8"
      >
        <h2 className="text-2xl font-bold mb-6">Settings</h2>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Update Email */}
          <div className="p-6 bg-white shadow rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaEnvelope /> Update Email
            </div>
            <input
              type="email"
              placeholder="Enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
            <button
              onClick={handleUpdateEmail}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
            >
              {loading ? "Processing..." : "Update Email"}
            </button>
          </div>

          {/* Change Password */}
          <div className="p-6 bg-white shadow rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaLock /> Change Password
            </div>
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
            <button
              onClick={handleChangePassword}
              disabled={loading}
              className="w-full bg-green-600  text-white py-2 rounded-full hover:bg-green-700 transition"
            >
              {loading ? "Processing..." : "Change Password"}
            </button>
          </div>

          {/* Update Phone */}
          <div className="p-6 bg-white shadow rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <FaPhone /> Update Phone
            </div>
            <input
              type="text"
              placeholder="Enter 10-digit phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-4 py-2 border rounded"
            />
            {phoneError && <p className="text-red-500 text-sm">{phoneError}</p>}
            <button
              onClick={handleUpdatePhoneNumber}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-full hover:bg-indigo-700 transition"
            >
              {loading ? "Processing..." : "Update Phone"}
            </button>
          </div>

          {/* Delete Account */}
          <div className="p-6 bg-red-50 shadow rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-red-600">
              <FaTrash /> Delete Account
            </div>
            <button
              onClick={() => setModalIsOpen(true)}
              disabled={loading}
              className="w-full bg-red-600 text-white py-2 rounded-full hover:bg-red-700 transition"
            >
              Delete Account
            </button>
          </div>

          {/* Logout */}
          <div className="p-6 bg-gray-100 shadow rounded-lg space-y-3">
            <div className="flex items-center gap-2 text-lg font-semibold text-gray-800">
              <FaSignOutAlt /> Logout
            </div>
            <button
              onClick={handleLogout}
              className="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-gray-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </motion.div>

      {/* Modal for Deletion */}
      <AnimatePresence>
        {modalIsOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white p-6 rounded shadow-lg w-full max-w-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
            >
              <h3 className="text-lg font-bold mb-2">Are you sure?</h3>
              <p className="mb-4">This action is irreversible.</p>
              <div className="flex gap-4 justify-end">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  disabled={loading}
                >
                  {loading ? "Processing..." : "Yes, Delete"}
                </button>
                <button
                  onClick={() => setModalIsOpen(false)}
                  className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Settings;
