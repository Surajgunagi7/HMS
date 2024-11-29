import React, { useState } from "react";

const UpdateReceptionist = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceptionist({ ...receptionist, [name]: value });
  };

  const handleUpdate = () => {
    console.log("Updating Receptionist: ", receptionist);
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
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={receptionist.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={receptionist.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="text"
              name="phone"
              value={receptionist.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Department</label>
            <input
              type="text"
              name="department"
              value={receptionist.department}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={receptionist.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Schedule</label>
            <input
              type="text"
              name="schedule"
              value={receptionist.schedule}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update Receptionist
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateReceptionist;
