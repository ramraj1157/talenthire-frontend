import { FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { motion } from "framer-motion";

const ProfileDropdown = ({
  label,
  field,
  value,
  options,
  editingField,
  tempValue,
  onEdit,
  onChange,
  onSave,
  onCancel,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg shadow-sm">
      <strong className="text-gray-700 w-1/3">{label}:</strong>
      {editingField === field ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center space-x-2 w-2/3"
        >
          <select
            value={tempValue}
            onChange={onChange}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          <FaCheck
            className="text-green-500 cursor-pointer hover:text-green-600 transition"
            onClick={onSave}
          />
          <FaTimes
            className="text-red-500 cursor-pointer hover:text-red-600 transition"
            onClick={onCancel}
          />
        </motion.div>
      ) : (
        <div className="flex items-center justify-between w-2/3">
          <span className="text-gray-600">{value || "Not Provided"}</span>
          <FaEdit
            className="text-blue-500 cursor-pointer hover:text-blue-600 transition"
            onClick={() => onEdit(field, value)}
          />
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
