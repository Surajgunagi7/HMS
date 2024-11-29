import React, { useState } from "react";
import { ReceptionistAppointment, SearchPatient,CreateAppointment,RequestedCalls } from "../components";
import { useNavigate } from "react-router-dom";

const ReceptionistDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [currentPage, setCurrentPage] = useState("manageAppointments"); // state to track which component to render
  const navigate = useNavigate();
  const handleLogout = () => {
    // Handle logout logic here (e.g., clearing session or redirecting to login page)
    console.log("Logged out!");
    navigate('/')
    // Optionally navigate to login page or reset app state here
  };

  return (
    <div className="p-4">
      {/* Navigation Bar */}
      <nav className="mb-6 flex justify-between bg-gray-800 text-white p-4 rounded-md">
        <h2 className="text-2xl font-semibold">Receptionist Dashboard</h2>
        <div className="flex space-x-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage("manageAppointments")} // Set page to 'appointments' when clicked
          >
            Manage Appointment
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage("createAppointments")} // Set page to 'appointments' when clicked
          >
            Create Appointment
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage("searchPatient")} // Set page to 'searchPatient' when clicked
          >
            Search Patient
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={() => setCurrentPage("requestedCalls")} // Set page to 'requestedCalls' when clicked
          >
            Requested Calls
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Conditionally Render Components Based on currentPage */}
      {currentPage === "manageAppointments" && <ReceptionistAppointment />}
      {currentPage === "createAppointments" && <CreateAppointment />}
      {currentPage === "searchPatient" && <SearchPatient />}
      {currentPage === "requestedCalls" && <RequestedCalls/>} {/* Add the requested calls component */}

    </div>
  );
};

export default ReceptionistDashboard;
