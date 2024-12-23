import React, { useState } from "react";
import { Appointments, Prescriptions, DoctorProfile } from "../components";

const DoctorDashboard = () => {
  const [activeTab, setActiveTab] = useState("appointments"); // Default tab

  const handleLogout = () => {
    // Clear auth token
    localStorage.removeItem("authToken");
    window.location.href = "/login"; // Redirect to login
  };

  return (
    <div className="p-8 relative">
      <h1 className="text-3xl font-bold mb-4">Doctor Dashboard</h1>
      
      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>

      {/* Navigation Tabs */}
      <div className="flex mb-6">
        <button
          onClick={() => setActiveTab("profile")}
          className={`px-4 py-2 rounded mr-3 ${
            activeTab === "profile" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Profile
        </button>
        <button
          onClick={() => setActiveTab("appointments")}
          className={`px-4 py-2 mr-2 rounded ${
            activeTab === "appointments" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Appointments
        </button>
        <button
          onClick={() => setActiveTab("prescriptions")}
          className={`px-4 py-2 rounded ${
            activeTab === "prescriptions" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          Prescriptions
        </button>
      </div>

      {/* Render Content Based on Active Tab */}
      <div>
        {activeTab === "appointments" && <Appointments />}
        {activeTab === "prescriptions" && <Prescriptions />}
        {activeTab === "profile" && <DoctorProfile />}
      </div>
    </div>
  );
};

export default DoctorDashboard;
