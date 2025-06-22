import React from "react";
import { PersonForm } from "../forms";

const SecretaryStep = ({ formData, onFormDataChange }) => (
  <div className="space-y-6">
    <div className="border border-gray-200 rounded-lg p-6">
      <PersonForm
        person={formData.secretary}
        onPersonChange={(field, value) =>
          onFormDataChange("secretary", field, value)
        }
        title="Company Secretary Details"
        showShare={false}
      />
    </div>
  </div>
);

export default SecretaryStep;
