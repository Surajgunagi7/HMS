import React, { useState } from "react";

const ReceptionistAppointment = () => {
  const [appointments, setAppointments] = useState([
    // Example of pre-existing appointments (this should come from the backend)
    { id: "1", patientId: "101", patientName: "John Doe", appointmentDate: "2024-12-05", appointmentTime: "10:00 AM", status: "Pending" },
    { id: "2", patientId: "102", patientName: "Jane Smith", appointmentDate: "2024-12-06", appointmentTime: "11:30 AM", status: "Approved" },
    { id: "3", patientId: "103", patientName: "Alice Johnson", appointmentDate: "2024-12-07", appointmentTime: "01:00 PM", status: "Pending" },
  ]);

  const handleAcceptAppointment = (id) => {
    setAppointments(
      appointments.map((appointment) =>
        appointment.id === id ? { ...appointment, status: "Approved" } : appointment
      )
    );
  };

  const handleRejectAppointment = (id) => {
    setAppointments(
      appointments.filter((appointment) => appointment.id !== id)
    );
  };

  return (
    <div className="mb-6">
      {/* Manage Appointments */}
      <h3 className="text-xl font-semibold mb-4">Manage Appointments</h3>
      <table className="min-w-full table-auto bg-white shadow rounded-lg border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left">Patient ID</th>
            <th className="px-6 py-3 text-left">Patient Name</th>
            <th className="px-6 py-3 text-left">Appointment Date</th>
            <th className="px-6 py-3 text-left">Appointment Time</th>
            <th className="px-6 py-3 text-left">Status</th>
            <th className="px-6 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id} className="border-t">
              <td className="px-6 py-4">{appointment.patientId}</td>
              <td className="px-6 py-4">{appointment.patientName}</td>
              <td className="px-6 py-4">{appointment.appointmentDate}</td>
              <td className="px-6 py-4">{appointment.appointmentTime}</td>
              <td className="px-6 py-4">{appointment.status}</td>
              <td className="px-6 py-4">
                {appointment.status === "Pending" ? (
                  <>
                    <button
                      onClick={() => handleAcceptAppointment(appointment.id)}
                      className="bg-green-500 text-white p-2 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectAppointment(appointment.id)}
                      className="bg-red-500 text-white p-2 rounded"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-500">No actions</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReceptionistAppointment;
