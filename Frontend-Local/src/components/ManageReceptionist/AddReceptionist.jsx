import React, { useState } from "react";

const AddReceptionist = () => {
  const [receptionist, setReceptionist] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    experience: "",
    schedule: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReceptionist({ ...receptionist, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding Receptionist: ", receptionist);
    setReceptionist({
      name: "",
      email: "",
      phone: "",
      department: "",
      experience: "",
      schedule: "",
    }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={receptionist.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter receptionist's name"
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
          placeholder="Enter email"
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
          placeholder="Enter phone number"
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
          placeholder="Enter department"
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
          placeholder="Enter experience"
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
          placeholder="Enter schedule"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Receptionist
      </button>
    </form>
  );
};

export default AddReceptionist;
