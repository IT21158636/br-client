import React from "react";
import { TextInput, TextArea, Select } from "../common";
import { PROVINCES, DISTRICTS, BUSINESS_TYPES } from "../../constants/formData";

const BusinessInfoStep = ({ formData, onFormDataChange }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Business Information
      </h3>
      <TextInput
        label="Business Name"
        value={formData.businessName}
        onChange={(value) => onFormDataChange("root", "businessName", value)}
        placeholder="Enter business name"
      />
    </div>

    <div>
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        Company Details
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="md:col-span-2">
          <TextArea
            label="Company Address"
            value={formData.companyDetails.address}
            onChange={(value) =>
              onFormDataChange("companyDetails", "address", value)
            }
            placeholder="Enter company address"
          />
        </div>
        <TextInput
          label="Email Address"
          type="email"
          value={formData.companyDetails.emailAddress}
          onChange={(value) =>
            onFormDataChange("companyDetails", "emailAddress", value)
          }
          placeholder="Enter email address"
        />
        <TextInput
          label="Phone Number"
          value={formData.companyDetails.phoneNumber}
          onChange={(value) =>
            onFormDataChange("companyDetails", "phoneNumber", value)
          }
          placeholder="Enter phone number"
        />
        <Select
          label="Province"
          value={formData.companyDetails.province}
          onChange={(value) => {
            onFormDataChange("companyDetails", "province", value);
            onFormDataChange("companyDetails", "district", "");
          }}
          options={PROVINCES}
          placeholder="Select Province"
        />
        <Select
          label="District"
          value={formData.companyDetails.district}
          onChange={(value) =>
            onFormDataChange("companyDetails", "district", value)
          }
          options={
            formData.companyDetails.province
              ? DISTRICTS[formData.companyDetails.province] || []
              : []
          }
          placeholder="Select District"
          disabled={!formData.companyDetails.province}
        />
        <TextInput
          label="City"
          value={formData.companyDetails.city}
          onChange={(value) =>
            onFormDataChange("companyDetails", "city", value)
          }
          placeholder="Enter city"
        />
        <TextInput
          label="Postal Code"
          value={formData.companyDetails.postalCode}
          onChange={(value) =>
            onFormDataChange("companyDetails", "postalCode", value)
          }
          placeholder="Enter postal code"
        />
        <Select
          label="Business Nature"
          value={formData.companyDetails.businessNature}
          onChange={(value) =>
            onFormDataChange("companyDetails", "businessNature", value)
          }
          options={BUSINESS_TYPES}
          placeholder="Select Business Type"
        />
      </div>
    </div>
  </div>
);

export default BusinessInfoStep;
