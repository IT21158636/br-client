import axios from "axios";

// ✅ Use your deployed Vercel backend URL here
const API_URL =
  "https://br-backend-git-main-ureshs-projects.vercel.app/api/business-registration";

// Get all companies
export const fetchCompanies = () => axios.get(API_URL);

// Get a company by ID
export const fetchCompanyById = (id) => axios.get(`${API_URL}/${id}`);

// Update a company
export const updateCompany = (id, data) => axios.put(`${API_URL}/${id}`, data);

// Delete a company
export const deleteCompany = (id) => axios.delete(`${API_URL}/${id}`);
