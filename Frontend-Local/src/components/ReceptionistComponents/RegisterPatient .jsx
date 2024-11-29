import React, { useState } from "react";

const RegisterPatient = () => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegisterPatient = () => {
    if (!name || !age || !email || !phone) {
      alert("Please fill in all fields.");
      return;
    }
    alert(`Patient ${name} successfully registered!`);
    setName("");
    setAge("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">Register New Patient</h3>
      <div className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
        <button
          onClick={handleRegisterPatient}
          className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Register Patient
        </button>
      </div>
    </div>
  );
};

export default RegisterPatient;
