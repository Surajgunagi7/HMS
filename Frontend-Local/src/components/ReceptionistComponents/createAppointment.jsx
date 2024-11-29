import React, { useState } from "react";

const CreateAppointment = () => {
  const [patientName, setPatientName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [doctorName, setDoctorName] = useState("");
  const [reason, setReason] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  const handleCreateAppointment = () => {
    // Validate if all fields are filled
    if (!patientName || !age || !email || !phone || !doctorName || !reason || !appointmentDate || !appointmentTime) {
      alert("Please fill all the fields.");
      return;
    }

    // Normally, you'd send this data to your backend or store it in your state
    alert("Appointment Created Successfully!");

    // Reset the form
    setPatientName("");
    setAge("");
    setEmail("");
    setPhone("");
    setDoctorName("");
    setReason("");
    setAppointmentDate("");
    setAppointmentTime("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-semibold text-center text-blue-600 mb-8">Create Appointment</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Patient Information */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Patient Details</h3>
          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Appointment Details */}
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Appointment Details</h3>
          <input
            type="text"
            placeholder="Doctor's Name"
            value={doctorName}
            onChange={(e) => setDoctorName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          />
          <textarea
            placeholder="Reason for Checkup"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="p-3 border border-gray-300 rounded-md"
          />
          <div className="flex space-x-4">
            <input
              type="date"
              value={appointmentDate}
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
            <input
              type="time"
              value={appointmentTime}
              onChange={(e) => setAppointmentTime(e.target.value)}
              className="p-3 border border-gray-300 rounded-md w-full"
            />
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleCreateAppointment}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Appointment
        </button>
      </div>
    </div>
  );
};

export default CreateAppointment;
