import React, { useState } from "react";

const AddDoctor = () => {
  const [doctor, setDoctor] = useState({
    name: "",
    specialization: "",
    email: "",
    experience: "",
    schedule: "",
    contact: "",
    education: "",
    awards: "",
    about: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor({ ...doctor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Adding Doctor: ", doctor);
    // Reset the form after submission
    setDoctor({
      name: "",
      specialization: "",
      email: "",
      experience: "",
      schedule: "",
      contact: "",
      education: "",
      awards: "",
      about: ""
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow p-6 rounded-md">
      <h2 className="text-xl font-bold mb-4">Add Doctor</h2>

      <div>
        <label className="block font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={doctor.name}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter doctor's name"
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
          placeholder="Enter specialization"
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
          placeholder="Enter email"
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
          placeholder="Enter years of experience"
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
          placeholder="Enter schedule (e.g., Mon-Fri, 10AM-4PM)"
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
          placeholder="Enter contact number"
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
          placeholder="Enter education details"
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
          placeholder="Enter awards (if any)"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">About</label>
        <textarea
          name="about"
          value={doctor.about}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Write a short description about the doctor"
          rows="4"
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Add Doctor
      </button>
    </form>
  );
};

export default AddDoctor;
