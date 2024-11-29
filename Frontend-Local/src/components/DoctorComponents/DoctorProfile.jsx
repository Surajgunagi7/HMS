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
    <div className="p-8 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-6">Doctor Profile</h2>

      {editMode ? (
        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-lg mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg mb-2">Phone</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-lg mb-2">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={profile.specialization}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-center">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-lg">
            <strong>Name:</strong> {profile.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {profile.email}
          </p>
          <p className="text-lg">
            <strong>Phone:</strong> {profile.phone}
          </p>
          <p className="text-lg">
            <strong>Specialization:</strong> {profile.specialization}
          </p>
          <div className="text-center">
            <button
              onClick={() => setEditMode(true)}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-yellow-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DoctorProfile;
