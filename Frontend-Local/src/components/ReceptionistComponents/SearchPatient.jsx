import React, { useState } from "react";
import RegisterPatient  from "./RegisterPatient "; 
import PatientDetails from "./PatientDetails";

const SearchPatient = () => {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null); // To store patient data if found
  const [isPatientFound, setIsPatientFound] = useState(false); // Flag to toggle between PatientDetails and RegisterPatient

  // Dummy data for the sake of illustration
  const patientDatabase = [
    {
      id: "P001",
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
      phone: "123-456-7890",
      doctorName: "Dr. Smith",
      reason: "Routine Checkup",
      appointmentDate: "2024-12-01",
      appointmentTime: "10:00 AM",
      payments: [
        { amount: 100, date: "2024-11-25", status: "Paid" },
      ],
    },
  ];

  const handleSearch = () => {
    const foundPatient = patientDatabase.find((p) => p.id === patientId);
    if (foundPatient) {
      setPatient(foundPatient);
      setIsPatientFound(true);
    } else {
      setPatient(null);
      setIsPatientFound(false);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-blue-600">Search Patient</h2>

      {/* Patient Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full mb-4"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
      </div>

      {/* Display Patient Details or Register Patient Form */}
      {isPatientFound ? (
        <PatientDetails patient={patient} />
      ) : (
        <RegisterPatient />
      )}
    </div>
  );
};

export default SearchPatient;
