import React, { useState } from "react";

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, patientName: "John Doe", time: "10:00 AM", status: "Pending" },
    { id: 2, patientName: "Jane Smith", time: "11:30 AM", status: "Pending" },
    { id: 3, patientName: "Alice Brown", time: "2:00 PM", status: "Pending" },
  ]);

  const [search, setSearch] = useState("");

  const handleSearchChange = (e) => setSearch(e.target.value);

  const filteredAppointments = appointments.filter((appointment) =>
    appointment.patientName.toLowerCase().includes(search.toLowerCase())
  );

  const handleConfirm = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Confirmed" }
          : appointment
      )
    );
    alert("Appointment confirmed!");
  };

  const handleCancel = (id) => {
    setAppointments((prevAppointments) =>
      prevAppointments.map((appointment) =>
        appointment.id === id
          ? { ...appointment, status: "Cancelled" }
          : appointment
      )
    );
    alert("Appointment cancelled!");
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Appointments</h2>
      <input
        type="text"
        placeholder="Search by patient name"
        value={search}
        onChange={handleSearchChange}
        className="mb-4 px-4 py-2 border rounded w-full"
      />
      <div className="space-y-4">
        {filteredAppointments.map((appointment) => (
          <div
            key={appointment.id}
            className="p-4 border rounded shadow-md flex justify-between items-center"
          >
            <div>
              <p className="text-lg font-semibold">{appointment.patientName}</p>
              <p className="text-sm text-gray-500">Time: {appointment.time}</p>
              <p
                className={`text-sm ${
                  appointment.status === "Pending"
                    ? "text-yellow-500"
                    : appointment.status === "Confirmed"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                Status: {appointment.status}
              </p>
            </div>
            {/* Add buttons here */}
            <div className="flex space-x-4 mt-2">
              <button
                onClick={() => handleConfirm(appointment.id)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
              <button
                onClick={() => handleCancel(appointment.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
