import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaEdit,
  FaCheck,
  FaTimes,
  FaPlus,
  FaTrash,
  FaUpload,
  FaUserCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

import DeveloperHeader from "../../components/Devoloper/DeveloperHeader";
import ProfileField from "../../components/Devoloper/ProfileField";
import ProfileDropdown from "../../components/Devoloper/ProfileDropdown";
import ProfileList from "../../components/Devoloper/ProfileList";
import AddExperienceForm from "../../components/Devoloper/AddExperienceForm";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [editingField, setEditingField] = useState(null);
  const [tempValue, setTempValue] = useState("");
  const [activeSection, setActiveSection] = useState("profile");
  const developerId = localStorage.getItem("developerId");
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    fetchProfile();
  }, [developerId]);

  const fetchProfile = async () => {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/developer/profile`,
        {
          headers: { "developer-id": developerId },
        }
      );
      setProfile(response.data);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const handleEdit = (field, value) => {
    setEditingField(field);
    setTempValue(value || "");
  };

  const handleSave = async () => {
    try {
      let updatedData = {};
      if (editingField.includes(".")) {
        const [parentField, childField] = editingField.split(".");
        if (parentField === "education") {
          const educationArray = profile.education || [];
          const educationObject = educationArray[0] || {};
          updatedData = {
            education: [{ ...educationObject, [childField]: tempValue }],
          };
        } else if (
          parentField === "professionalDetails" ||
          parentField === "additionalInfo"
        ) {
          updatedData = {
            [parentField]: {
              ...profile[parentField],
              [childField]: tempValue,
            },
          };
        }
      } else {
        updatedData = { [editingField]: tempValue };
      }

      await axios.put(`${API_BASE_URL}/api/developer/profile`, updatedData, {
        headers: { "developer-id": developerId },
      });

      await fetchProfile();
      setEditingField(null);
      setTempValue("");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleCancel = () => {
    setEditingField(null);
    setTempValue("");
  };

  const handleAddToList = async (field, newValue) => {
    if (!newValue.trim()) return;
    try {
      let updatedData = {};
      if (field.includes(".")) {
        const [parentField, childField] = field.split(".");
        const currentArray = profile[parentField]?.[childField] || [];
        updatedData = {
          [parentField]: {
            ...profile[parentField],
            [childField]: [...currentArray, newValue],
          },
        };
      } else {
        const currentArray = profile[field] || [];
        updatedData = { [field]: [...currentArray, newValue] };
      }

      await axios.put(`${API_BASE_URL}/api/developer/profile`, updatedData, {
        headers: { "developer-id": developerId },
      });

      await fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleRemoveFromList = async (field, index) => {
    try {
      let updatedData = {};
      if (field.includes(".")) {
        const [parentField, childField] = field.split(".");
        const currentArray = [...(profile[parentField]?.[childField] || [])];
        currentArray.splice(index, 1);
        updatedData = {
          [parentField]: {
            ...profile[parentField],
            [childField]: currentArray,
          },
        };
      } else {
        const currentArray = [...(profile[field] || [])];
        currentArray.splice(index, 1);
        updatedData = { [field]: currentArray };
      }

      await axios.put(`${API_BASE_URL}/api/developer/profile`, updatedData, {
        headers: { "developer-id": developerId },
      });

      await fetchProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleProfilePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profilePhoto", file);

    try {
      await axios.put(
        `${API_BASE_URL}/api/developer/uploadProfilePhoto`,
        formData,
        {
          headers: {
            "developer-id": developerId,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await fetchProfile();
    } catch (error) {
      console.error("Error uploading profile photo:", error);
    }
  };

  const handleAddExperience = async (newExperience) => {
    try {
      if (newExperience.startDate) {
        newExperience.startDate = new Date(
          newExperience.startDate
        ).toISOString();
      }
      if (newExperience.endDate) {
        newExperience.endDate = new Date(newExperience.endDate).toISOString();
      }
      const updatedData = {
        workExperience: [...(profile.workExperience || []), newExperience],
      };

      await axios.put(`${API_BASE_URL}/api/developer/profile`, updatedData, {
        headers: { "developer-id": developerId },
      });

      await fetchProfile();
    } catch (error) {
      console.error("Error adding experience:", error);
    }
  };

  const handleRemoveExperience = async (index) => {
    try {
      const updatedWorkExperience = [...profile.workExperience];
      updatedWorkExperience.splice(index, 1);
      const updatedData = { workExperience: updatedWorkExperience };

      await axios.put(`${API_BASE_URL}/api/developer/profile`, updatedData, {
        headers: { "developer-id": developerId },
      });

      await fetchProfile();
    } catch (error) {
      console.error("Error removing experience:", error);
    }
  };

  const handleStipendUpdate = async () => {
    try {
      const updatedData = { expectedStipend: tempValue };
      await axios.put(`${API_BASE_URL}/api/developer/profile`, updatedData, {
        headers: { "developer-id": developerId },
      });

      await fetchProfile();
      setEditingField(null);
      setTempValue("");
    } catch (error) {
      console.error("Error updating stipend:", error);
    }
  };

  if (!profile)
    return (
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <DeveloperHeader />
        <div className="flex-1 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl font-semibold text-gray-600"
          >
            Loading Profile...
          </motion.div>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <DeveloperHeader />
      <div className="flex-1 flex flex-row max-w-7xl mx-auto p-6 space-x-6">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-1/4 bg-white rounded-lg shadow-lg p-6"
        >
          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              {profile.profilePhoto ? (
                <img
                  src={`${API_BASE_URL}${profile.profilePhoto}`}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover"
                />
              ) : (
                <FaUserCircle className="w-24 h-24 text-gray-400" />
              )}
              <label
                htmlFor="photo-upload"
                className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full p-2 cursor-pointer hover:bg-blue-600 transition"
              >
                <FaUpload />
              </label>
              <input
                type="file"
                id="photo-upload"
                accept="image/*"
                onChange={handleProfilePhotoUpload}
                className="hidden"
              />
            </div>
          </div>
          <nav className="space-y-2">
            {[
              "profile",
              "education",
              "socials",
              "experience",
              "preferences",
              "additional",
            ].map((section) => (
              <motion.button
                key={section}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`w-full text-left py-2 px-4 rounded-lg ${
                  activeSection === section
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                } transition`}
                onClick={() => setActiveSection(section)}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </motion.button>
            ))}
          </nav>
        </motion.aside>

        {/* Main Content */}
        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="w-3/4 bg-white rounded-lg shadow-lg p-8"
        >
          <AnimatePresence mode="wait">
            {activeSection === "profile" && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">Profile</h2>
                <ProfileField
                  label="Full Name"
                  field="fullName"
                  value={profile.fullName}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <ProfileField
                  label="Bio"
                  field="bio"
                  value={profile.bio}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <ProfileField
                  label="Location"
                  field="location"
                  value={profile.location}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </motion.div>
            )}

            {activeSection === "education" && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">Education</h2>
                <ProfileField
                  label="College"
                  field="education.college"
                  value={profile.education?.[0]?.college}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <ProfileField
                  label="Degree"
                  field="education.degree"
                  value={profile.education?.[0]?.degree}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <ProfileField
                  label="Graduation Year"
                  field="education.graduationYear"
                  value={profile.education?.[0]?.graduationYear}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </motion.div>
            )}

            {activeSection === "socials" && (
              <motion.div
                key="socials"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">
                  Social Links
                </h2>
                <ProfileField
                  label="LinkedIn"
                  field="linkedIn"
                  value={profile.linkedIn}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <ProfileField
                  label="GitHub"
                  field="github"
                  value={profile.github}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <ProfileField
                  label="Portfolio"
                  field="portfolio"
                  value={profile.portfolio}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              </motion.div>
            )}

            {activeSection === "experience" && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">
                  Work Experience
                </h2>
                <ProfileField
                  label="Current Job"
                  field="professionalDetails.currentJob"
                  value={profile.professionalDetails?.currentJob}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <ProfileField
                  label="Years of Experience"
                  field="professionalDetails.yearsOfExperience"
                  value={profile.professionalDetails?.yearsOfExperience}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <div className="space-y-4">
                  {profile.workExperience?.map((exp, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-4 bg-gray-50 rounded-lg shadow-sm"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <strong className="text-lg text-gray-800">
                            {exp.company}
                          </strong>{" "}
                          - {exp.jobTitle}
                          <p className="text-sm text-gray-600">
                            {new Date(exp.startDate).toLocaleDateString()} -{" "}
                            {exp.endDate
                              ? new Date(exp.endDate).toLocaleDateString()
                              : "Present"}
                          </p>
                        </div>
                        <FaTrash
                          className="text-red-500 cursor-pointer hover:text-red-600 transition"
                          onClick={() => handleRemoveExperience(index)}
                        />
                      </div>
                    </motion.div>
                  ))}
                </div>
                <AddExperienceForm onAddExperience={handleAddExperience} />
              </motion.div>
            )}

            {activeSection === "preferences" && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">
                  Preferences
                </h2>
                <ProfileDropdown
                  label="Work Mode"
                  field="workMode"
                  value={profile.workMode}
                  options={["Remote", "Hybrid", "Onsite"]}
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
                <ProfileList
                  label="Work Locations"
                  field="preferredLocations"
                  values={profile.preferredLocations || []}
                  onAdd={handleAddToList}
                  onRemove={handleRemoveFromList}
                />
                <ProfileList
                  label="Programming Languages"
                  field="languagesPreferred"
                  values={profile.languagesPreferred || []}
                  onAdd={handleAddToList}
                  onRemove={handleRemoveFromList}
                />
                <ProfileField
                  label="Expected Stipend (LPA)"
                  field="expectedStipend"
                  value={
                    Array.isArray(profile.expectedStipend)
                      ? profile.expectedStipend[0]
                      : profile.expectedStipend
                  }
                  editingField={editingField}
                  tempValue={tempValue}
                  onEdit={handleEdit}
                  onChange={(e) => setTempValue(e.target.value)}
                  onSave={handleStipendUpdate}
                  onCancel={handleCancel}
                />
                <ProfileList
                  label="Job Roles Interested"
                  field="professionalDetails.jobRolesInterested"
                  values={profile.professionalDetails?.jobRolesInterested || []}
                  onAdd={handleAddToList}
                  onRemove={handleRemoveFromList}
                />
              </motion.div>
            )}

            {activeSection === "additional" && (
              <motion.div
                key="additional"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-2xl font-bold text-gray-800">
                  Additional Information
                </h2>
                <ProfileList
                  label="Achievements"
                  field="additionalInfo.achievements"
                  values={profile.additionalInfo?.achievements || []}
                  onAdd={handleAddToList}
                  onRemove={handleRemoveFromList}
                />
                <ProfileList
                  label="Certifications"
                  field="additionalInfo.certifications"
                  values={profile.additionalInfo?.certifications || []}
                  onAdd={handleAddToList}
                  onRemove={handleRemoveFromList}
                />
                <ProfileList
                  label="Skills"
                  field="professionalDetails.skills"
                  values={profile.professionalDetails?.skills || []}
                  onAdd={handleAddToList}
                  onRemove={handleRemoveFromList}
                />
                <ProfileList
                  label="Languages I Speak"
                  field="additionalInfo.languages"
                  values={profile.additionalInfo?.languages || []}
                  onAdd={handleAddToList}
                  onRemove={handleRemoveFromList}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.main>
      </div>
    </div>
  );
};

export default Profile;
