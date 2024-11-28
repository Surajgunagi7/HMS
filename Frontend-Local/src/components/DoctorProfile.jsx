import React, { useState } from "react";

const DoctorProfile = () => {
  const [profile, setProfile] = useState({
    name: "Dr. John Doe",
    email: "johndoe@example.com",
    phone: "123-456-7890",
    specialization: "Cardiologist",
  });

  const [editMode, setEditMode] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setEditMode(false);
    alert("Profile updated successfully!");
    // Add API call here to save profile changes
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Doctor Profile</h2>

      {editMode ? (
        <div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={profile.specialization}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded"
            />
          </div>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="mb-2">
            <strong>Name:</strong> {profile.name}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="mb-2">
            <strong>Phone:</strong> {profile.phone}
          </p>
          <p className="mb-2">
            <strong>Specialization:</strong> {profile.specialization}
          </p>
          <button
            onClick={() => setEditMode(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
