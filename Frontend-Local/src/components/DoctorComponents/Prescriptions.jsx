import React, { useState } from "react";

const Prescriptions = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [formData, setFormData] = useState({
    patientName: "",
    medication: "",
    dosage: "",
    instructions: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddPrescription = () => {
    if (
      formData.patientName &&
      formData.medication &&
      formData.dosage &&
      formData.instructions
    ) {
      setPrescriptions([...prescriptions, formData]);
      setFormData({ patientName: "", medication: "", dosage: "", instructions: "" });
      alert("Prescription added successfully!");
    } else {
      alert("Please fill in all fields!");
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Prescriptions</h2>
      <div className="mb-6">
        <input
          type="text"
          name="patientName"
          placeholder="Patient Name"
          value={formData.patientName}
          onChange={handleInputChange}
          className="w-full mb-2 px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="medication"
          placeholder="Medication"
          value={formData.medication}
          onChange={handleInputChange}
          className="w-full mb-2 px-4 py-2 border rounded"
        />
        <input
          type="text"
          name="dosage"
          placeholder="Dosage (e.g., 1 tablet twice a day)"
          value={formData.dosage}
          onChange={handleInputChange}
          className="w-full mb-2 px-4 py-2 border rounded"
        />
        <textarea
          name="instructions"
          placeholder="Additional Instructions"
          value={formData.instructions}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border rounded"
        />
        <button
          onClick={handleAddPrescription}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Prescription
        </button>
      </div>

      <h3 className="text-xl font-bold mb-4">Prescription List</h3>
      {prescriptions.length > 0 ? (
        prescriptions.map((prescription, index) => (
          <div
            key={index}
            className="p-4 border rounded shadow-md mb-4"
          >
            <p><strong>Patient:</strong> {prescription.patientName}</p>
            <p><strong>Medication:</strong> {prescription.medication}</p>
            <p><strong>Dosage:</strong> {prescription.dosage}</p>
            <p><strong>Instructions:</strong> {prescription.instructions}</p>
          </div>
        ))
      ) : (
        <p>No prescriptions added yet.</p>
      )}
    </div>
  );
};

export default Prescriptions;
