import React from "react";

const ProgressBar = ({ currentStep, totalSteps }) => (
  <div className="p-6 bg-gray-50 border-b">
    <div className="flex items-center justify-between mb-4">
      <span className="text-sm font-medium text-gray-600">
        Step {currentStep} of {totalSteps}
      </span>
      <div className="flex space-x-2">
        {Array.from({ length: totalSteps - 1 }, (_, i) => i + 1).map((step) => (
          <div
            key={step}
            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
              step <= currentStep
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {step}
          </div>
        ))}
      </div>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2">
      <div
        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
        style={{ width: `${(currentStep / totalSteps) * 100}%` }}
      ></div>
    </div>
  </div>
);

export default ProgressBar;
