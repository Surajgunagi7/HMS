import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { patientService } from "../../services/patientService";

const RegisterPatient = ({ onClose, onRegistered, patient = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      name: "",
      age: "",
      email: "",
      phone: "",
      gender: "other",
      medicalHistory: "",
      emergencyContactName: "",
      emergencyContactPhone: "",
    },
  });

  useEffect(() => {
  if (patient) {
    const flatData = {
      name: patient.name || "",
      age: patient.age || "",
      email: patient.email || "",
      phone: patient.phone || "",
      gender: patient.gender || "other",
      medicalHistory: patient.medicalHistory || "",
      emergencyContactName: patient.emergencyContact?.name || "",
      emergencyContactPhone: patient.emergencyContact?.phone || "",
    };
    reset(flatData); 
  }
}, [patient, reset]);

  const onSubmit = async (data) => {
    const finalData = {
      ...data,
      emergencyContact: {
        name: data.emergencyContactName,
        phone: data.emergencyContactPhone,
      },
    };

    delete finalData.emergencyContactName;
    delete finalData.emergencyContactPhone;

    try {
      let result;
      if (patient?._id) {
        result = await patientService.updatePatient(patient._id, finalData);
        alert(`Patient ${result.name} updated successfully.`);
      } else {
        result = await patientService.createOrFindPatient(finalData);
        alert(`Patient ${result.name} registered/found successfully.`);
      }

      onRegistered(result);
      reset();
      if (onClose) onClose();
    } catch (err) {
      alert("Failed to submit patient data.");
      console.error(err);
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-2xl font-semibold text-blue-600 mb-4">
        {patient ? "Update Patient" : "Register New Patient"}
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input {...register("name", { required: "Name is required" })} placeholder="Name" className="p-3 border border-gray-300 rounded-md" />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}

        <input {...register("age", { required: "Age is required", min: { value: 0, message: "Age must be positive" } })} type="number" placeholder="Age" className="p-3 border border-gray-300 rounded-md" />
        {errors.age && <span className="text-red-500 text-sm">{errors.age.message}</span>}

        <input {...register("email", { required: "Email is required", pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email" } })} type="email" placeholder="Email" className="p-3 border border-gray-300 rounded-md" />
        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}

        <input {...register("phone", { required: "Phone number is required" })} type="tel" placeholder="Phone Number" className="p-3 border border-gray-300 rounded-md" />
        {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}

        <select {...register("gender")} className="p-3 border border-gray-300 rounded-md">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <input {...register("medicalHistory")} placeholder="Medical History" className="p-3 border border-gray-300 rounded-md" />

        <input {...register("emergencyContactName")} placeholder="Emergency Contact Name" className="p-3 border border-gray-300 rounded-md" />
        <input {...register("emergencyContactPhone")} placeholder="Emergency Contact Phone" className="p-3 border border-gray-300 rounded-md" />

        <div className="flex gap-4">
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700">
            {patient ? "Update Patient" : "Register Patient"}
          </button>
          {onClose && (
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 px-6 py-3 rounded-full hover:bg-gray-300">
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterPatient;