import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BusinessRegistrationForm from "./components/BusinessRegistrationForm";
import AdminDashboard from "./components/AdminDashboard";
import EditCompanyPage from "./components/EditCompanyPage"; // Add this import

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BusinessRegistrationForm />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/edit-company/:id" element={<EditCompanyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
