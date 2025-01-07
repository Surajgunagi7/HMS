import { useState } from "react";
import { useForm } from "react-hook-form";

const PatientDetails = ({ patient }) => (
  <div className="bg-white shadow-lg rounded-lg p-6">
    <h3 className="text-2xl font-semibold text-blue-600 mb-4">Patient Details</h3>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <p className="font-semibold">Patient ID:</p>
        <p>{patient.id}</p>
      </div>
      <div>
        <p className="font-semibold">Name:</p>
        <p>{patient.name}</p>
      </div>
      <div>
        <p className="font-semibold">Age:</p>
        <p>{patient.age}</p>
      </div>
      <div>
        <p className="font-semibold">Email:</p>
        <p>{patient.email}</p>
      </div>
      <div>
        <p className="font-semibold">Phone:</p>
        <p>{patient.phone}</p>
      </div>
      <div>
        <p className="font-semibold">Doctor:</p>
        <p>{patient.doctorName}</p>
      </div>
      <div>
        <p className="font-semibold">Reason:</p>
        <p>{patient.reason}</p>
      </div>
      <div>
        <p className="font-semibold">Next Appointment:</p>
        <p>{patient.appointmentDate} at {patient.appointmentTime}</p>
      </div>
    </div>
  </div>
);

const RegisterPatient = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: {
      name: "",
      age: "",
      email: "",
      phone: ""
    }
  });

  const onSubmit = (data) => {
    alert(`Patient ${data.name} successfully registered!`);
    reset();
    if (onClose) onClose();
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">Register New Patient</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register("name", { required: "Name is required" })}
          placeholder="Name"
          className="p-3 border border-gray-300 rounded-md"
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

        <input
          {...register("age", { 
            required: "Age is required",
            min: { value: 0, message: "Age must be positive" }
          })}
          type="number"
          placeholder="Age"
          className="p-3 border border-gray-300 rounded-md"
        />
        {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}

        <input
          {...register("email", { 
            required: "Email is required",
            pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" }
          })}
          type="email"
          placeholder="Email"
          className="p-3 border border-gray-300 rounded-md"
        />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <input
          {...register("phone", { required: "Phone number is required" })}
          type="tel"
          placeholder="Phone Number"
          className="p-3 border border-gray-300 rounded-md"
        />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Register Patient
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

const PatientManagement = () => {
  const [patientId, setPatientId] = useState("");
  const [patient, setPatient] = useState(null);
  const [showRegister, setShowRegister] = useState(false);
  const [searchAttempted, setSearchAttempted] = useState(false);

  const patientDatabase = [
    {
      id: "111",
      name: "John Doe",
      age: 30,
      email: "john.doe@example.com",
      phone: "123-456-7890",
      doctorName: "Dr. Smith",
      reason: "Routine Checkup",
      appointmentDate: "2024-12-01",
      appointmentTime: "10:00 AM",
    },
  ];

  const handleSearch = () => {
    setSearchAttempted(true);
    setShowRegister(false);
    const foundPatient = patientDatabase.find((p) => p.id === patientId);
    setPatient(foundPatient);
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-3xl font-semibold mb-6 text-blue-600">Patient Management</h2>

      <div className="mb-6 flex gap-4">
        <input
          type="text"
          placeholder="Enter Patient ID"
          value={patientId}
          onChange={(e) => setPatientId(e.target.value)}
          className="p-3 border border-gray-300 rounded-md flex-grow"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Search
        </button>
        <button
          onClick={() => {
            setShowRegister(true);
            setPatient(null);
            setSearchAttempted(false);
          }}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Register New
        </button>
      </div>

      <div className="mt-6">
        {showRegister ? (
          <RegisterPatient onClose={() => setShowRegister(false)} />
        ) : searchAttempted ? (
          patient ? (
            <PatientDetails patient={patient} />
          ) : (
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-lg text-gray-600">No patient found with ID: {patientId}</p>
              <button
                onClick={() => setShowRegister(true)}
                className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Register New Patient
              </button>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

export default PatientManagement; 