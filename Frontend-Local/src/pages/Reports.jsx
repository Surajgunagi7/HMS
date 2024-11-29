import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Reports = () => {
  const navigate = useNavigate(); // Initialize the useNavigate hook

  // Dummy data for reports
  const reports = [
    { id: "1", title: "Patient Stats", description: "Total number of patients admitted in the last month.", value: "120" },
    { id: "2", title: "Doctor Performance", description: "Number of surgeries performed by Dr. Smith in the last quarter.", value: "45" },
    { id: "3", title: "Revenue Report", description: "Total revenue generated from consultations and treatments.", value: "$5000" },
    { id: "4", title: "Surgery Stats", description: "Number of surgeries performed by Dr. John in the last year.", value: "300" },
    { id: "5", title: "Patient Satisfaction", description: "Average satisfaction score from patients.", value: "4.8/5" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("title");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  // Filter reports based on the search term
  const filteredReports = reports.filter((report) =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort reports by selected attribute
  const sortedReports = filteredReports.sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    } else if (sortBy === "value") {
      return parseFloat(a.value.replace(/[^\d.-]/g, "")) - parseFloat(b.value.replace(/[^\d.-]/g, ""));
    }
    return 0;
  });

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Reports</h2>

      {/* Right-aligned Back to Dashboard Button */}
      <div className="flex justify-end mb-4">
        <button
          onClick={() => navigate("/admin-dashboard")} // Navigate back to Admin Dashboard
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Dashboard
        </button>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex mb-4 gap-4">
        <input
          type="text"
          placeholder="Search reports..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <select
          value={sortBy}
          onChange={handleSortChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="title">Sort by Title</option>
          <option value="value">Sort by Value</option>
        </select>
      </div>

      {/* Table for displaying reports */}
      <table className="min-w-full table-auto bg-white shadow rounded-lg border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left">Report Title</th>
            <th className="px-6 py-3 text-left">Description</th>
            <th className="px-6 py-3 text-left">Value</th>
          </tr>
        </thead>
        <tbody>
          {sortedReports.length > 0 ? (
            sortedReports.map((report) => (
              <tr key={report.id} className="border-t">
                <td className="px-6 py-4">{report.title}</td>
                <td className="px-6 py-4">{report.description}</td>
                <td className="px-6 py-4 text-green-600 font-bold">{report.value}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="px-6 py-4 text-center text-gray-500">No reports found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Reports;
