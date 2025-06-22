import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { PersonForm } from "../forms";

const DirectorsStep = ({
  formData,
  onFormDataChange,
  onAddDirector,
  onRemoveDirector,
}) => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <h3 className="text-lg font-semibold text-gray-800">
        Directors Information
      </h3>
      <button
        onClick={onAddDirector}
        className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Director
      </button>
    </div>

    {formData.directors.map((director, index) => (
      <div
        key={index}
        className="border border-gray-200 rounded-lg p-6 relative"
      >
        {formData.directors.length > 1 && (
          <button
            onClick={() => onRemoveDirector(index)}
            className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
        <PersonForm
          person={director}
          onPersonChange={(field, value) =>
            onFormDataChange("directors", field, value, index)
          }
          title={`Director ${index + 1} Details`}
          showShare={true}
        />
      </div>
    ))}
  </div>
);

export default DirectorsStep;
