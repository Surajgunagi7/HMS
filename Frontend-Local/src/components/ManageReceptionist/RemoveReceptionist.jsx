import React, { useState } from "react";

const RemoveReceptionist = () => {
  const [searchId, setSearchId] = useState("");
  const [receptionist, setReceptionist] = useState(null);

  // Dummy data for demonstration
  const dummyReceptionist = {
    id: "R101",
    name: "John Doe",
    email: "john.doe@mail.com",
    phone: "1234567890",
    department: "Front Desk",
    experience: "5 years",
    schedule: "9 AM - 5 PM",
  };

  const handleSearch = () => {
    setReceptionist(dummyReceptionist); // Mock search with dummy data
  };

  const handleRemove = () => {
    console.log("Removing Receptionist: ", receptionist);
    setReceptionist(null); // Reset after removal
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Enter Receptionist ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"
        >
          Search
        </button>
      </div>

      {receptionist && (
        <div className="space-y-4">
          <p><strong>ID:</strong> {receptionist.id}</p>
          <p><strong>Name:</strong> {receptionist.name}</p>
          <p><strong>Email:</strong> {receptionist.email}</p>
          <p><strong>Phone:</strong> {receptionist.phone}</p>
          <p><strong>Department:</strong> {receptionist.department}</p>
          <p><strong>Experience:</strong> {receptionist.experience}</p>
          <p><strong>Schedule:</strong> {receptionist.schedule}</p>
          <button
            type="button"
            onClick={handleRemove}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Remove Receptionist
          </button>
        </div>
      )}
    </div>
  );
};

export default RemoveReceptionist;
