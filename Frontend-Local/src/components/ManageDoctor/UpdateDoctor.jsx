import React, { useState } from "react";

const UpdateDoctor = () => {
  const [searchId, setSearchId] = useState("");
  const [doctor, setDoctor] = useState(null);

  // Mock data for demonstration
  const dummyDoctor = {
    id: "101",
    name: "Dr. Smith",
    specialization: "Cardiology",
    email: "drsmith@mail.com",
    experience: "10 years",
    schedule: "Mon-Fri, 9AM-3PM",
    contact: "+123456789",
    education: "MBBS, MD (Cardiology)",
    awards: "Best Cardiologist Award 2021",
    about: "Experienced cardiologist specializing in heart surgeries."
  };

  const handleSearch = () => {
    setDoctor(dummyDoctor); // Mock search with dummy data
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleUpdate = () => {
    console.log("Updating Doctor: ", doctor);
    alert("Doctor details updated successfully!");
  };

  return (
    <div className="space-y-4 bg-white shadow p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">Update Doctor</h2>

      {/* Search Section */}
      <div>
        <input
          type="text"
          placeholder="Enter Doctor ID"
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

      {/* Update Form */}
      {doctor && (
        <form className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={doctor.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Specialization</label>
            <input
              type="text"
              name="specialization"
              value={doctor.specialization}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={doctor.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Experience</label>
            <input
              type="text"
              name="experience"
              value={doctor.experience}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Schedule</label>
            <input
              type="text"
              name="schedule"
              value={doctor.schedule}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Contact</label>
            <input
              type="text"
              name="contact"
              value={doctor.contact}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Education</label>
            <input
              type="text"
              name="education"
              value={doctor.education}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Awards</label>
            <input
              type="text"
              name="awards"
              value={doctor.awards}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block font-medium mb-1">About</label>
            <textarea
              name="about"
              value={doctor.about}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              rows="4"
            ></textarea>
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
          >
            Update Doctor
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateDoctor;
