import React, { useState } from "react";

const RemoveDoctor = () => {
  const [doctorId, setDoctorId] = useState("");

  const handleRemove = () => {
    console.log("Removing Doctor with ID: ", doctorId);
    setDoctorId(""); // Reset input
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Enter Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Remove Doctor
      </button>
    </div>
  );
};

export default RemoveDoctor;
