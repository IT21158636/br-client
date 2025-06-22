export const PROVINCES = [
  "Western Province",
  "Central Province",
  "Southern Province",
  "Northern Province",
  "Eastern Province",
  "North Western Province",
  "North Central Province",
  "Uva Province",
  "Sabaragamuwa Province",
];

export const DISTRICTS = {
  "Western Province": ["Colombo", "Gampaha", "Kalutara"],
  "Central Province": ["Kandy", "Matale", "Nuwara Eliya"],
  "Southern Province": ["Galle", "Matara", "Hambantota"],
  "Northern Province": [
    "Jaffna",
    "Kilinochchi",
    "Mannar",
    "Mullaitivu",
    "Vavuniya",
  ],
  "Eastern Province": ["Ampara", "Batticaloa", "Trincomalee"],
  "North Western Province": ["Kurunegala", "Puttalam"],
  "North Central Province": ["Anuradhapura", "Polonnaruwa"],
  "Uva Province": ["Badulla", "Monaragala"],
  "Sabaragamuwa Province": ["Ratnapura", "Kegalle"],
};

export const BUSINESS_TYPES = [
  "Private Limited Company",
  "Partnership",
  "Sole Proprietorship",
  "NGO",
  "Trading Company",
  "Service Company",
  "Manufacturing Company",
  "Import/Export Company",
];

export const GENDER_OPTIONS = ["Male", "Female", "Other"];

export const INITIAL_FORM_DATA = {
  businessName: "",
  companyDetails: {
    address: "",
    emailAddress: "",
    phoneNumber: "",
    province: "",
    district: "",
    city: "",
    postalCode: "",
    businessNature: "",
  },
  directors: [
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
  secretary: {
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
  },
};
