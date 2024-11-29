import React, { useState } from "react";

const PatientDetails = ({ patient }) => {
  const [paymentAmount, setPaymentAmount] = useState("");

  const handlePaymentUpdate = () => {
    if (!paymentAmount) {
      alert("Please enter a payment amount.");
      return;
    }
    // Here, you would typically send the payment data to the backend
    alert(`Payment of $${paymentAmount} successfully added for ${patient.name}`);
    setPaymentAmount(""); // Clear payment field after update
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">Patient Details</h3>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <strong>Name:</strong> {patient.name}
        </div>
        <div>
          <strong>Age:</strong> {patient.age}
        </div>
        <div>
          <strong>Email:</strong> {patient.email}
        </div>
        <div>
          <strong>Phone:</strong> {patient.phone}
        </div>
        <div>
          <strong>Doctor's Name:</strong> {patient.doctorName}
        </div>
        <div>
          <strong>Reason:</strong> {patient.reason}
        </div>
        <div>
          <strong>Appointment Date:</strong> {patient.appointmentDate}
        </div>
        <div>
          <strong>Appointment Time:</strong> {patient.appointmentTime}
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-700 mb-4">Payment Details</h3>
      <ul className="mb-4">
        {patient.payments.map((payment, index) => (
          <li key={index}>
            <strong>Amount:</strong> ${payment.amount} - <strong>Status:</strong> {payment.status}
          </li>
        ))}
      </ul>

      <div className="flex gap-4 mb-4">
        <input
          type="number"
          placeholder="Enter Payment Amount"
          value={paymentAmount}
          onChange={(e) => setPaymentAmount(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full"
        />
        <button
          onClick={handlePaymentUpdate}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Update Payment
        </button>
      </div>
    </div>
  );
};

export default PatientDetails;
