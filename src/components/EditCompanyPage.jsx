import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCompanyById, updateCompany } from "../services/api";

const EditCompanyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({
    businessName: "",
    companyDetails: {
      address: "",
      emailAddress: "",
      phoneNumber: "",
      website: "",
      businessType: "",
      registrationNumber: "",
      taxId: "",
    },
    directors: [],
  });

  useEffect(() => {
    loadCompanyDetails();
  }, [id]);

  const loadCompanyDetails = async () => {
    setLoading(true);
    try {
      const response = await fetchCompanyById(id);
      const company = response.data;

      setFormData({
        businessName: company.businessName || "",
        companyDetails: {
          address: company.companyDetails?.address || "",
          emailAddress: company.companyDetails?.emailAddress || "",
          phoneNumber: company.companyDetails?.phoneNumber || "",
          website: company.companyDetails?.website || "",
          businessType: company.companyDetails?.businessType || "",
          registrationNumber: company.companyDetails?.registrationNumber || "",
          taxId: company.companyDetails?.taxId || "",
        },
        directors: company.directors || [],
      });
    } catch (error) {
      console.error("Error loading company details:", error);
      setErrors({
        general: "Failed to load company details. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Business name validation
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Business name is required";
    }

    // Email validation
    if (formData.companyDetails.emailAddress) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.companyDetails.emailAddress)) {
        newErrors.emailAddress = "Please enter a valid email address";
      }
    }

    // Phone validation
    if (formData.companyDetails.phoneNumber) {
      const phoneRegex = /^[\d\s\-\+\(\)]+$/;
      if (!phoneRegex.test(formData.companyDetails.phoneNumber)) {
        newErrors.phoneNumber = "Please enter a valid phone number";
      }
    }

    // Website validation
    if (formData.companyDetails.website) {
      const urlRegex =
        /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
      if (!urlRegex.test(formData.companyDetails.website)) {
        newErrors.website = "Please enter a valid website URL";
      }
    }

    // Directors validation
    formData.directors.forEach((director, index) => {
      if (!director.fullName && !director.nameWithInitial) {
        newErrors[`director_${index}`] = "Director name is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value, isNested = false) => {
    if (isNested) {
      setFormData((prev) => ({
        ...prev,
        companyDetails: {
          ...prev.companyDetails,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleDirectorChange = (index, field, value) => {
    const updatedDirectors = [...formData.directors];
    updatedDirectors[index] = {
      ...updatedDirectors[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      directors: updatedDirectors,
    }));

    // Clear director-specific error
    if (errors[`director_${index}`]) {
      setErrors((prev) => ({
        ...prev,
        [`director_${index}`]: "",
      }));
    }
  };

  const addDirector = () => {
    setFormData((prev) => ({
      ...prev,
      directors: [
        ...prev.directors,
        {
          fullName: "",
          nameWithInitial: "",
          idNumber: "",
          address: "",
          phoneNumber: "",
          email: "",
        },
      ],
    }));
  };

  const removeDirector = (index) => {
    if (formData.directors.length > 1) {
      const updatedDirectors = formData.directors.filter((_, i) => i !== index);
      setFormData((prev) => ({
        ...prev,
        directors: updatedDirectors,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setSaving(true);
    setErrors({});

    try {
      await updateCompany(id, formData);
      setSuccessMessage("Company details updated successfully!");

      // Navigate back to dashboard after 2 seconds
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error updating company:", error);
      setErrors({
        general:
          error.response?.data?.message ||
          "Failed to update company details. Please try again.",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/dashboard");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading company details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      <div className="max-w-4xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center mb-4 space-x-4">
            <button
              onClick={handleCancel}
              className="flex items-center text-gray-600 transition-colors hover:text-gray-900"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Dashboard
            </button>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            Edit Company Details
          </h1>
          <p className="mt-2 text-gray-600">
            Update company information and director details
          </p>
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="p-4 mb-6 text-green-700 bg-green-100 border border-green-400 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              {successMessage}
            </div>
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="p-4 mb-6 text-red-700 bg-red-100 border border-red-400 rounded-lg">
            <div className="flex items-center">
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              {errors.general}
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Company Information */}
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">
              Company Information
            </h2>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Business Name */}
              <div className="md:col-span-2">
                <label
                  htmlFor="businessName"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Business Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) =>
                    handleInputChange("businessName", e.target.value)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.businessName ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="Enter business name"
                />
                {errors.businessName && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.businessName}
                  </p>
                )}
              </div>

              {/* Address */}
              <div className="md:col-span-2">
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Address
                </label>
                <textarea
                  id="address"
                  rows={3}
                  value={formData.companyDetails.address}
                  onChange={(e) =>
                    handleInputChange("address", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter company address"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="emailAddress"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="emailAddress"
                  value={formData.companyDetails.emailAddress}
                  onChange={(e) =>
                    handleInputChange("emailAddress", e.target.value, true)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.emailAddress ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="company@example.com"
                />
                {errors.emailAddress && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.emailAddress}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  value={formData.companyDetails.phoneNumber}
                  onChange={(e) =>
                    handleInputChange("phoneNumber", e.target.value, true)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.phoneNumber ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phoneNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              {/* Website */}
              <div>
                <label
                  htmlFor="website"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Website
                </label>
                <input
                  type="url"
                  id="website"
                  value={formData.companyDetails.website}
                  onChange={(e) =>
                    handleInputChange("website", e.target.value, true)
                  }
                  className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.website ? "border-red-300" : "border-gray-300"
                  }`}
                  placeholder="https://www.example.com"
                />
                {errors.website && (
                  <p className="mt-1 text-sm text-red-600">{errors.website}</p>
                )}
              </div>

              {/* Business Type */}
              <div>
                <label
                  htmlFor="businessType"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Business Type
                </label>
                <select
                  id="businessType"
                  value={formData.companyDetails.businessType}
                  onChange={(e) =>
                    handleInputChange("businessType", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select business type</option>
                  <option value="Corporation">Corporation</option>
                  <option value="LLC">LLC</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Sole Proprietorship">
                    Sole Proprietorship
                  </option>
                  <option value="Non-Profit">Non-Profit</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Registration Number */}
              <div>
                <label
                  htmlFor="registrationNumber"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Registration Number
                </label>
                <input
                  type="text"
                  id="registrationNumber"
                  value={formData.companyDetails.registrationNumber}
                  onChange={(e) =>
                    handleInputChange(
                      "registrationNumber",
                      e.target.value,
                      true
                    )
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Company registration number"
                />
              </div>

              {/* Tax ID */}
              <div>
                <label
                  htmlFor="taxId"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Tax ID
                </label>
                <input
                  type="text"
                  id="taxId"
                  value={formData.companyDetails.taxId}
                  onChange={(e) =>
                    handleInputChange("taxId", e.target.value, true)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tax identification number"
                />
              </div>
            </div>
          </div>

          {/* Directors Section */}
          <div className="p-6 bg-white rounded-lg shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Directors</h2>
              <button
                type="button"
                onClick={addDirector}
                className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Director
              </button>
            </div>

            {formData.directors.map((director, index) => (
              <div
                key={index}
                className="p-4 mb-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-900">
                    Director {index + 1}
                  </h3>
                  {formData.directors.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDirector(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  )}
                </div>

                {errors[`director_${index}`] && (
                  <div className="p-3 mb-4 text-red-700 bg-red-100 border border-red-300 rounded">
                    {errors[`director_${index}`]}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={director.fullName || ""}
                      onChange={(e) =>
                        handleDirectorChange(index, "fullName", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Name with Initial
                    </label>
                    <input
                      type="text"
                      value={director.nameWithInitial || ""}
                      onChange={(e) =>
                        handleDirectorChange(
                          index,
                          "nameWithInitial",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Name with initial"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      ID Number
                    </label>
                    <input
                      type="text"
                      value={director.idNumber || ""}
                      onChange={(e) =>
                        handleDirectorChange(index, "idNumber", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="National ID or passport number"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={director.phoneNumber || ""}
                      onChange={(e) =>
                        handleDirectorChange(
                          index,
                          "phoneNumber",
                          e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Director's phone number"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={director.email || ""}
                      onChange={(e) =>
                        handleDirectorChange(index, "email", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="director@example.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      type="text"
                      value={director.address || ""}
                      onChange={(e) =>
                        handleDirectorChange(index, "address", e.target.value)
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Director's address"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="flex items-center px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <div className="w-4 h-4 mr-2 border-b-2 border-white rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyPage;
