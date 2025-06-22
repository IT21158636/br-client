import React from "react";

const PreviewStep = ({ formData }) => (
  <div className="space-y-6">
    <div className="p-4 rounded-lg bg-blue-50">
      <h3 className="mb-2 text-lg font-semibold text-blue-800">
        Preview - Business Registration Details
      </h3>
      <p className="text-blue-600">
        Please review all information before submitting
      </p>
    </div>

    <div className="p-6 bg-white border rounded-lg">
      <h4 className="mb-3 font-semibold text-gray-800">Business Information</h4>
      <p>
        <strong>Business Name:</strong> {formData.businessName}
      </p>
      <p>
        <strong>Address:</strong> {formData.companyDetails.address}
      </p>
      <p>
        <strong>Business Nature:</strong>{" "}
        {formData.companyDetails.businessNature}
      </p>
      <p>
        <strong>Email:</strong> {formData.companyDetails.emailAddress}
      </p>
      <p>
        <strong>Phone:</strong> {formData.companyDetails.phoneNumber}
      </p>
      <p>
        <strong>Location:</strong> {formData.companyDetails.city},{" "}
        {formData.companyDetails.district}, {formData.companyDetails.province}
      </p>
    </div>

    <div className="p-6 bg-white border rounded-lg">
      <h4 className="mb-3 font-semibold text-gray-800">
        Directors ({formData.directors.length})
      </h4>
      {formData.directors.map((director, index) => (
        <div key={index} className="p-4 mb-4 rounded bg-gray-50">
          <h5 className="font-medium">Director {index + 1}</h5>
          <p>
            <strong>Name:</strong> {director.fullName}
          </p>
          <p>
            <strong>Name with Initial:</strong> {director.nameWithInitial}
          </p>
          <p>
            <strong>NIC:</strong> {director.nicNo}
          </p>
          <p>
            <strong>Date of Birth:</strong> {director.dateOfBirth}
          </p>
          <p>
            <strong>Gender:</strong> {director.gender}
          </p>
          <p>
            <strong>Address:</strong> {director.address}
          </p>
          <p>
            <strong>Email:</strong> {director.emailAddress}
          </p>
          <p>
            <strong>Province:</strong> {director.province}
          </p>
          <p>
            <strong>District:</strong> {director.district}
          </p>
          <p>
            <strong>City:</strong> {director.city}
          </p>
          <p>
            <strong>Postal Code:</strong> {director.postalCode}
          </p>
          <p>
            <strong>Contact Numbers:</strong> {director.contactNumbers}
          </p>
          <p>
            <strong>Share Ownership:</strong> {director.shareOwnership}%
          </p>
        </div>
      ))}
    </div>

    <div className="p-6 bg-white border rounded-lg">
      <h4 className="mb-3 font-semibold text-gray-800">Company Secretary</h4>
      <p>
        <strong>Name:</strong> {formData.secretary.fullName}
      </p>
      <p>
        <strong>Name with Initial:</strong> {formData.secretary.nameWithInitial}
      </p>
      <p>
        <strong>NIC:</strong> {formData.secretary.nicNo}
      </p>
      <p>
        <strong>Date of Birth:</strong> {formData.secretary.dateOfBirth}
      </p>
      <p>
        <strong>Gender:</strong> {formData.secretary.gender}
      </p>
      <p>
        <strong>Address:</strong> {formData.secretary.address}
      </p>
      <p>
        <strong>Email:</strong> {formData.secretary.emailAddress}
      </p>
      <p>
        <strong>Province:</strong> {formData.secretary.province}
      </p>
      <p>
        <strong>District:</strong> {formData.secretary.district}
      </p>
      <p>
        <strong>City:</strong> {formData.secretary.city}
      </p>
      <p>
        <strong>Postal Code:</strong> {formData.secretary.postalCode}
      </p>
      <p>
        <strong>Contact Numbers:</strong> {formData.secretary.contactNumbers}
      </p>
    </div>
  </div>
);

export default PreviewStep;
