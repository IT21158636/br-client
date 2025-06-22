import React, { useState } from "react";
import { ProgressBar, Navigation } from "./ui";
import {
  BusinessInfoStep,
  DirectorsStep,
  SecretaryStep,
  PreviewStep,
  SuccessStep,
} from "./steps";
import { INITIAL_FORM_DATA } from "../constants/formData";

const BusinessRegistrationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isPreview, setIsPreview] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const totalSteps = 4;

  const updateFormData = (section, field, value, index = null) => {
    setFormData((prev) => {
      if (section === "directors" && index !== null) {
        const newDirectors = [...prev.directors];
        newDirectors[index] = { ...newDirectors[index], [field]: value };
        return { ...prev, directors: newDirectors };
      } else if (section === "companyDetails") {
        return {
          ...prev,
          companyDetails: { ...prev.companyDetails, [field]: value },
        };
      } else if (section === "secretary") {
        return {
          ...prev,
          secretary: { ...prev.secretary, [field]: value },
        };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const addDirector = () => {
    setFormData((prev) => ({
      ...prev,
      directors: [
        ...prev.directors,
        {
          nicNo: "",
          fullName: "",
          nameWithInitial: "",
          dateOfBirth: "",
          gender: "",
          address: "",
          emailAddress: "",
          province: "",
          district: "",
          city: "",
          postalCode: "",
          contactNumbers: "",
          shareOwnership: "",
        },
      ],
    }));
  };

  const removeDirector = (index) => {
    if (formData.directors.length > 1) {
      setFormData((prev) => ({
        ...prev,
        directors: prev.directors.filter((_, i) => i !== index),
      }));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/business-registration",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        setIsPreview(false); // Ensure we exit preview mode
        setCurrentStep(4);
      } else {
        alert("Error submitting form. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error submitting form. Please try again.");
    }
  };

  const renderStep = () => {
    if (isPreview) {
      return <PreviewStep formData={formData} />;
    }

    switch (currentStep) {
      case 1:
        return (
          <BusinessInfoStep
            formData={formData}
            onFormDataChange={updateFormData}
          />
        );
      case 2:
        return (
          <DirectorsStep
            formData={formData}
            onFormDataChange={updateFormData}
            onAddDirector={addDirector}
            onRemoveDirector={removeDirector}
          />
        );
      case 3:
        return (
          <SecretaryStep
            formData={formData}
            onFormDataChange={updateFormData}
          />
        );
      case 4:
        return <SuccessStep />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen px-4 py-8 bg-gray-50 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="overflow-hidden bg-white rounded-lg shadow-lg">
          <div className="p-6 text-white bg-blue-600 rounded-t-lg">
            <h1 className="text-2xl font-bold"> Business Registration</h1>
            <p className="mt-2 text-blue-100">
              Complete all steps to register your business
            </p>
          </div>

          {!isPreview && currentStep !== 4 && (
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          )}

          <div className="p-6">{renderStep()}</div>

          {currentStep !== 4 && (
            <Navigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              isPreview={isPreview}
              onPrevStep={() => {
                if (currentStep > 1) {
                  setCurrentStep(currentStep - 1);
                }
                if (isPreview) {
                  setIsPreview(false);
                }
              }}
              onNextStep={() => {
                if (currentStep < totalSteps) {
                  setCurrentStep(currentStep + 1);
                }
              }}
              onPreview={() => setIsPreview(true)}
              onEdit={() => setIsPreview(false)}
              onSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BusinessRegistrationForm;
