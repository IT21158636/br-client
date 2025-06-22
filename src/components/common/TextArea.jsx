import React from "react";

const TextArea = ({
  label,
  value,
  onChange,
  placeholder,
  rows = 3,
  ...props
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      rows={rows}
      placeholder={placeholder}
      {...props}
    />
  </div>
);

export default TextArea;
