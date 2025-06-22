import React from "react";
import { ChevronLeft, ChevronRight, Edit, Eye, Check } from "lucide-react";

const Navigation = ({
  currentStep,
  totalSteps,
  isPreview,
  onPrevStep,
  onNextStep,
  onPreview,
  onEdit,
  onSubmit,
}) => (
  <div className="p-6 bg-gray-50 border-t">
    <div className="flex justify-between">
      <div>
        {(currentStep > 1 || isPreview) && (
          <button
            onClick={onPrevStep}
            className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back
          </button>
        )}
      </div>
      <div className="flex space-x-3">
        {!isPreview && currentStep === 3 && (
          <button
            onClick={onPreview}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview
          </button>
        )}
        {isPreview && (
          <>
            <button
              onClick={onEdit}
              className="flex items-center px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </button>
            <button
              onClick={onSubmit}
              className="flex items-center px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              <Check className="w-4 h-4 mr-2" />
              Submit Registration
            </button>
          </>
        )}
        {!isPreview && currentStep < 3 && (
          <button
            onClick={onNextStep}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-2" />
          </button>
        )}
      </div>
    </div>
  </div>
);

export default Navigation;
