import React, { useState } from "react";

const UpdateAdmin = () => {
  const [searchId, setSearchId] = useState("");
  const [admin, setAdmin] = useState(null);

  const dummyAdmin = { id: "201", name: "Admin John", email: "admin@mail.com", role: "Super Admin", contact: "9876543210", experience: "5" };

  const handleSearch = () => {
    setAdmin(dummyAdmin); // Mock search with dummy data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleUpdate = () => {
    console.log("Updating Admin: ", admin);
  };

  return (
    <div className="space-y-4">
      <div>
        <input
          type="text"
          placeholder="Enter Admin ID"
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

      {admin && (
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={admin.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
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
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update Admin
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateAdmin;
