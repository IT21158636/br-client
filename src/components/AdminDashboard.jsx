import React, { useEffect, useState, useMemo } from "react";
import { fetchCompanies, deleteCompany } from "../services/api";
import ExportExcel from "./ExportExcel";

// Inline Pagination Component
const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show

    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);

    // Adjust start page if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
      <div className="flex justify-between flex-1 sm:hidden">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startItem}</span> to{" "}
            <span className="font-medium">{endItem}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>

        <div>
          <nav
            className="relative z-0 inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            {/* Previous button */}
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            {/* Page numbers */}
            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-medium border ${
                  page === currentPage
                    ? "z-10 bg-blue-50 border-blue-500 text-blue-600"
                    : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            {/* Next button */}
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center px-2 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [companies, setCompanies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [sortBy, setSortBy] = useState("newest"); // Default to newest first
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    loadCompanies();
  }, []);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const res = await fetchCompanies();
      setCompanies(res.data); // Adjust if API wraps data differently
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure to delete this company?")) {
      try {
        await deleteCompany(id);
        loadCompanies();

        // Adjust current page if necessary after deletion
        const totalPages = Math.ceil((companies.length - 1) / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
        }
      } catch (error) {
        console.error("Error deleting company:", error);
        alert("Error deleting company. Please try again.");
      }
    }
  };

  // Check if company is new (registered within last 7 days)
  const isNewCompany = (company) => {
    if (!company.createdAt && !company.registrationDate) return false;

    const companyDate = new Date(company.createdAt || company.registrationDate);
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    return companyDate > sevenDaysAgo;
  };

  // Get days since registration
  const getDaysSinceRegistration = (company) => {
    if (!company.createdAt && !company.registrationDate) return null;

    const companyDate = new Date(company.createdAt || company.registrationDate);
    const today = new Date();
    const diffTime = Math.abs(today - companyDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Filter and sort companies
  const filteredAndSortedCompanies = useMemo(() => {
    let filtered = companies;

    // Filter by search term
    if (searchTerm) {
      filtered = companies.filter(
        (company) =>
          company.businessName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          company.companyDetails?.emailAddress
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          company.companyDetails?.phoneNumber?.includes(searchTerm) ||
          company.directors?.some(
            (d) =>
              d.fullName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
              d.nameWithInitial
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase())
          )
      );
    }

    // Sort companies
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case "newest":
          const dateA = new Date(a.createdAt || a.registrationDate || 0);
          const dateB = new Date(b.createdAt || b.registrationDate || 0);
          return dateB - dateA; // Newest first
        case "oldest":
          const dateA2 = new Date(a.createdAt || a.registrationDate || 0);
          const dateB2 = new Date(b.createdAt || b.registrationDate || 0);
          return dateA2 - dateB2; // Oldest first
        case "name":
          return (a.businessName || "").localeCompare(b.businessName || "");
        default:
          return 0;
      }
    });
  }, [companies, searchTerm, sortBy]);

  // Calculate pagination
  const totalItems = filteredAndSortedCompanies.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCompanies = filteredAndSortedCompanies.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
    setCurrentPage(1); // Reset to first page when changing sort
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  // New Company Icon Component
  const NewCompanyIcon = ({ days }) => (
    <div className="relative inline-flex group">
      <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-green-500 rounded-full animate-pulse">
        ✨
      </span>
      <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full animate-ping"></span>
      {/* Tooltip */}
      <div className="absolute z-10 px-2 py-1 mb-1 text-xs text-white transition-opacity duration-200 transform -translate-x-1/2 bg-gray-800 rounded opacity-0 group-hover:opacity-100 bottom-full left-1/2 whitespace-nowrap">
        {days === 0
          ? "Registered today!"
          : `${days} day${days > 1 ? "s" : ""} ago`}
      </div>
    </div>
  );

  // Count new companies
  const newCompaniesCount = companies.filter(isNewCompany).length;

  return (
    <div className="p-4 mx-auto max-w-7xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <h1 className="text-3xl font-bold text-gray-900">
              Company Dashboard
            </h1>
            {newCompaniesCount > 0 && (
              <div className="flex items-center px-3 py-1 space-x-2 bg-green-100 rounded-full">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span className="text-sm font-medium text-green-800">
                  {newCompaniesCount} new compan
                  {newCompaniesCount > 1 ? "ies" : "y"} this week
                </span>
              </div>
            )}
          </div>
          <ExportExcel
            data={filteredAndSortedCompanies}
            fileName="Company_Registrations"
          />
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-4 mb-6 md:grid-cols-3">
          <div className="p-4 bg-white border rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h2M7 3h10M9 7h6m-6 4h6m-6 4h6"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Total Companies
                </h3>
                <p className="text-2xl font-bold text-gray-900">
                  {companies.length}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-green-600"
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
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  New This Week
                </h3>
                <p className="text-2xl font-bold text-green-600">
                  {newCompaniesCount}
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white border rounded-lg shadow">
            <div className="flex items-center">
              <div className="p-2 bg-purple-100 rounded-lg">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-sm font-medium text-gray-500">
                  Search Results
                </h3>
                <p className="text-2xl font-bold text-purple-600">
                  {filteredAndSortedCompanies.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="p-4 mb-6 bg-white border rounded-lg shadow">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0 md:space-x-4">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search companies, emails, phones, or directors..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Sort and Items per page */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label
                htmlFor="sortBy"
                className="text-sm font-medium text-gray-700"
              >
                Sort by:
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={handleSortChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Company Name</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <label
                htmlFor="itemsPerPage"
                className="text-sm font-medium text-gray-700"
              >
                Show:
              </label>
              <select
                id="itemsPerPage"
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Loading indicator */}
      {loading ? (
        <div className="flex items-center justify-center py-12">
          <div className="w-8 h-8 border-b-2 border-blue-600 rounded-full animate-spin"></div>
          <span className="ml-3 text-gray-600">Loading companies...</span>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-hidden bg-white border rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Company Details
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Contact Information
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Directors
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Registration Date
                    </th>
                    <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentCompanies.map((company) => {
                    const isNew = isNewCompany(company);
                    const daysSince = getDaysSinceRegistration(company);

                    return (
                      <tr
                        key={company._id}
                        className={`hover:bg-gray-50 transition-colors ${
                          isNew ? "bg-green-50 border-l-4 border-green-400" : ""
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-3">
                            <div>
                              <div className="flex items-center space-x-2">
                                <div className="text-sm font-medium text-gray-900">
                                  {company.businessName || "N/A"}
                                </div>
                                {isNew && <NewCompanyIcon days={daysSince} />}
                              </div>
                              <div className="text-sm text-gray-500">
                                {company.companyDetails?.address ||
                                  "No address provided"}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {company.companyDetails?.emailAddress || "N/A"}
                          </div>
                          <div className="text-sm text-gray-500">
                            {company.companyDetails?.phoneNumber || "N/A"}
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {company.directors &&
                            company.directors.length > 0 ? (
                              <div className="space-y-1">
                                {company.directors.slice(0, 2).map((d, i) => (
                                  <div key={i} className="flex items-center">
                                    <span className="w-2 h-2 mr-2 bg-blue-400 rounded-full"></span>
                                    {d.fullName || d.nameWithInitial || "N/A"}
                                  </div>
                                ))}
                                {company.directors.length > 2 && (
                                  <div className="text-xs text-gray-500">
                                    +{company.directors.length - 2} more
                                  </div>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-500">
                                No Directors
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {formatDate(
                              company.createdAt || company.registrationDate
                            )}
                          </div>
                          {daysSince !== null && (
                            <div className="text-xs text-gray-500">
                              {daysSince === 0
                                ? "Today"
                                : `${daysSince} day${
                                    daysSince > 1 ? "s" : ""
                                  } ago`}
                            </div>
                          )}
                        </td>

                        <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                          <div className="flex flex-col space-y-2">
                            <div className="flex space-x-2">
                              <button
                                onClick={() =>
                                  (window.location.href = `/admin/edit-company/${company._id}`)
                                }
                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition-colors bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              >
                                Edit
                              </button>
                              {/* <button
                                onClick={() => handleDelete(company._id)}
                                className="inline-flex items-center px-3 py-1 text-xs font-medium text-white transition-colors bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                              >
                                Delete
                              </button> */}
                            </div>
                            <ExportExcel singleCompany={company} />
                          </div>
                        </td>
                      </tr>
                    );
                  })}

                  {currentCompanies.length === 0 && !loading && (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center">
                        <div className="flex flex-col items-center">
                          <svg
                            className="w-12 h-12 mb-4 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-4m-5 0H3m0 0h2M7 3h10M9 7h6m-6 4h6m-6 4h6"
                            />
                          </svg>
                          <h3 className="mb-2 text-lg font-medium text-gray-900">
                            No companies found
                          </h3>
                          <p className="text-gray-500">
                            {searchTerm
                              ? "Try adjusting your search terms"
                              : "No company registrations available"}
                          </p>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
