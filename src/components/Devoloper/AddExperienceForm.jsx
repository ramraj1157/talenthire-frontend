import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { motion } from "framer-motion";

const AddExperienceForm = ({ onAddExperience }) => {
  const [newExperience, setNewExperience] = useState({
    company: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    responsibilities: [],
  });
  const [newResponsibility, setNewResponsibility] = useState("");

  const handleChange = (e) => {
    setNewExperience({ ...newExperience, [e.target.name]: e.target.value });
  };

  const handleAddResponsibility = () => {
    if (newResponsibility.trim()) {
      setNewExperience((prev) => ({
        ...prev,
        responsibilities: [...prev.responsibilities, newResponsibility],
      }));
      setNewResponsibility("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      newExperience.company &&
      newExperience.jobTitle &&
      newExperience.startDate
    ) {
      onAddExperience(newExperience);
      setNewExperience({
        company: "",
        jobTitle: "",
        startDate: "",
        endDate: "",
        responsibilities: [],
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-gray-50 rounded-lg shadow-sm"
    >
      <h4 className="text-lg font-semibold text-gray-800">
        Add Work Experience
      </h4>
      <div onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="text"
          name="company"
          placeholder="Company"
          value={newExperience.company}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={newExperience.jobTitle}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={newExperience.startDate}
          onChange={handleChange}
          required
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date (optional)"
          value={newExperience.endDate}
          onChange={handleChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Add Responsibility"
            value={newResponsibility}
            onChange={(e) => setNewResponsibility(e.target.value)}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddResponsibility();
              }
            }}
          />
          <FaPlus
            className="text-blue-500 cursor-pointer hover:text-blue-600 transition"
            onClick={handleAddResponsibility}
          />
        </div>
        <ul className="space-y-2">
          {newExperience.responsibilities.map((res, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-2 bg-white rounded-lg shadow-sm"
            >
              {res}
            </motion.li>
          ))}
        </ul>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          onClick={handleSubmit}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Add Experience
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AddExperienceForm;
