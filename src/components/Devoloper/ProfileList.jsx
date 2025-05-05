import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

const ProfileList = ({ label, field, values, onAdd, onRemove }) => {
  const [newItem, setNewItem] = useState("");

  return (
    <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
      <strong className="text-gray-700">{label}:</strong>
      <ul className="mt-2 space-y-2">
        {values.length > 0 ? (
          values.map((item, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center justify-between p-2 bg-white rounded-lg shadow-sm"
            >
              <span className="text-gray-600">{item}</span>
              <FaTrash
                className="text-red-500 cursor-pointer hover:text-red-600 transition"
                onClick={() => onRemove(field, index)}
              />
            </motion.li>
          ))
        ) : (
          <span className="text-gray-600">Not Provided</span>
        )}
      </ul>
      <div className="mt-4 flex items-center space-x-2">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onAdd(field, newItem);
              setNewItem("");
            }
          }}
        />
        <FaPlus
          className="text-blue-500 cursor-pointer hover:text-blue-600 transition"
          onClick={() => {
            onAdd(field, newItem);
            setNewItem("");
          }}
        />
      </div>
    </div>
  );
};

export default ProfileList;
