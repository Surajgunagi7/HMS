import { useState } from "react";
import { patientService } from "../../services/patientService";
import RegisterPatient from "./RegisterPatient";

const PatientDetails = ({ patient }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-2xl font-semibold text-blue-600 mb-4">Patient Details</h3>
    <div className="grid grid-cols-2 gap-4">
      <div><p className="font-semibold">Patient ID:</p><p>{patient.patientId}</p></div>
      <div><p className="font-semibold">Name:</p><p>{patient.name}</p></div>
      <div><p className="font-semibold">Age:</p><p>{patient.age}</p></div>
      <div><p className="font-semibold">Email:</p><p>{patient.email}</p></div>
      <div><p className="font-semibold">Phone:</p><p>{patient.phone}</p></div>
      <div><p className="font-semibold">Gender:</p><p>{patient.gender}</p></div>
      <div><p className="font-semibold">Medical History:</p><p>{patient.medicalHistory}</p></div>
      <div><p className="font-semibold">Emergency Contact:</p>
        <p>{patient.emergencyContact?.name} ({patient.emergencyContact?.phone})</p>
      </div>
    </div>
  </div>
);


const PatientManagement = () => {
  const [patientInput, setPatientInput] = useState("");
  const [patient, setPatient] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const handleSearch = async () => {
    setSearchAttempted(true);
    setShowRegister(false);
    try {
      const results = await patientService.searchPatientByIdOrPhone({ phone: patientInput });
      setPatient(results.data[0]);
    } catch (err) {
      console.error("Search error:", err);
      setPatient(null);
    }
  };

  const handleRegisteredPatient = (newPatient) => {
    setPatient(newPatient);
    setPatientInput(newPatient.phone);
    setShowRegister(false);
    setSearchAttempted(true);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-blue-600">Patient Management</h2>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Enter Patient Phone"
          value={patientInput || ""}
          onChange={(e) => setPatientInput(e.target.value)}
          className="p-3 border rounded-md flex-grow"
        />
        <button onClick={handleSearch} className="bg-blue-600 text-white px-6 py-2 rounded-full">Search</button>
        <button
          onClick={() => {
            setShowRegister(true);
            setPatient(null);
            setSearchAttempted(false);
          }}
          className="bg-green-600 text-white px-6 py-2 rounded-full"
        >
          Register New
        </button>
      </div>

      <div className="mt-6">
        {showRegister ? (
          <RegisterPatient
            onClose={() => setShowRegister(false)}
            onRegistered={handleRegisteredPatient}
            patient={patient}
          />
        ) : searchAttempted ? (
          patient ? (
            <div className="flex flex-col gap-4">
              <PatientDetails patient={patient} />
              <button
                onClick={() => setShowRegister(true)}
                className="bg-yellow-500 text-white px-6 py-2 rounded-full w-max"
              >
                Edit Patient
              </button>
            </div>
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">No patient found with input: {patientInput}</p>
              <button
                onClick={() => setShowRegister(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full"
              >
                Register New Patient
              </button>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default PatientManagement;
