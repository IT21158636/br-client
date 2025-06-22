import React from "react";

const TextInput = ({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  ...props
}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder={placeholder}
      {...props}
    />
  </div>
);

export default TextInput;
