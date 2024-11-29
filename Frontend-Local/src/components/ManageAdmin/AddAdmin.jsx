import React, { useState } from "react";

const AddAdmin = () => {
  const [admin, setAdmin] = useState({ name: "", email: "", role: "", contact: "", experience: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding Admin: ", admin);
    setAdmin({ name: "", email: "", role: "", contact: "", experience: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={admin.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter admin's name"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Email</label>
        <input
          type="email"
          name="email"
          value={admin.email}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter email"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Role</label>
        <input
          type="text"
          name="role"
          value={admin.role}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter role"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Contact</label>
        <input
          type="text"
          name="contact"
          value={admin.contact}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter contact number"
        />
      </div>
      <div>
        <label className="block font-medium mb-1">Experience</label>
        <input
          type="text"
          name="experience"
          value={admin.experience}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter experience (years)"
        />
      </div>
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Admin
      </button>
    </form>
  );
};

export default AddAdmin;
