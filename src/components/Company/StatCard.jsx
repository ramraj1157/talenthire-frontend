import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "react-tooltip";

const StatCard = ({ title, value, icon: Icon, tooltip, color = "blue" }) => {
  const textColor = `text-${color}-700`;
  const borderColor = `border-${color}-100`;
  const hoverShadow = `hover:shadow-${color}-200`;

  return (
    <div
      className={`relative bg-white shadow rounded-lg p-6 text-center border ${borderColor} transition-shadow duration-300 ${hoverShadow}`}
      aria-label={title}
    >
      {tooltip && (
        <div className="absolute top-2 right-2">
          <span
            data-tooltip-id={`tooltip-${title}`}
            className="text-gray-400 cursor-pointer"
          >
            ⓘ
          </span>
          <Tooltip id={`tooltip-${title}`} place="top" content={tooltip} />
        </div>
      )}

      {Icon && (
        <div className="flex justify-center mb-3">
          <Icon className={`h-6 w-6 ${textColor}`} />
        </div>
      )}

      <h4 className="text-gray-600 text-sm font-medium mb-1">{title}</h4>
      <p className={`text-2xl font-semibold ${textColor}`}>{value}</p>
    </div>
  );
};

StatCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  icon: PropTypes.elementType,
  tooltip: PropTypes.string,
  color: PropTypes.oneOf(["blue", "green", "red", "yellow", "purple", "gray"]),
};

export default StatCard;
