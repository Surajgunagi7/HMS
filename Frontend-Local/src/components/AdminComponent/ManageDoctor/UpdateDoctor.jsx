import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { doctorService } from "../../../services/adminDashboardService";
import { updateDoctor } from "../../../store/doctorSlice";
import toast from "react-hot-toast";

const editableFields = [
  "name",
  "email",
  "phone",
  "specialization",
  "experience",
  "education",
  "description",
];

const UpdateDoctor = () => {
  const [doctorIdInput, setDoctorIdInput] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null);
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor?.doctors || []);
  const { register, handleSubmit, setValue, reset } = useForm();

  const fetchDoctorDetails = () => {
    if (!doctorIdInput.trim()) {
      alert("Please enter a valid Doctor ID.");
      return;
    }

    const doctor = doctors.find((doc) => doc.loginId === doctorIdInput);
    if (!doctor) {
      alert("Doctor with the given ID does not exist.");
      return;
    }

    setDoctorDetails(doctor);

    // Flatten the about fields to set value manually
    setValue("name", doctor.name || "");
    setValue("email", doctor.email || "");
    setValue("phone", doctor.phone || "");
    setValue("specialization", doctor.specialization || "");
    setValue("experience", doctor.about?.experience || "");
    setValue("education", doctor.about?.education || "");
    setValue("description", doctor.about?.description || "");
  };

  const onSubmit = async (data) => {
    if (!doctorDetails) {
      alert("Please fetch the doctor details before updating.");
      return;
    }

    const formattedData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      specialization: data.specialization,
      about: {
        experience: data.experience,
        education: data.education,
        description: data.description,
      },
    };

    try {
      console.log(formattedData);
      
      const updatedDoctor = await doctorService.updateDoctor(
        doctorDetails._id,
        formattedData
      );

      dispatch(
        updateDoctor({
          loginId: doctorDetails.loginId,
          updates: updatedDoctor.data,
        })
      );

      toast.success(
        `Doctor with ID ${doctorDetails.loginId} has been updated successfully.`
      );

      setDoctorIdInput("");
      setDoctorDetails(null);
      reset();
    } catch (error) {
      console.error("Error updating doctor:", error.message);
      alert("Failed to update doctor. Please try again.");
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 shadow rounded-md max-h-screen">
      {/* Input Doctor ID */}
      <input
        type="text"
        placeholder="Enter Doctor ID"
        value={doctorIdInput}
        onChange={(e) => setDoctorIdInput(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={fetchDoctorDetails}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Fetch Details
      </button>

      {/* Form for updating doctor details */}
      {doctorDetails && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {editableFields.map((field) => (
            <div key={field}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {field}
              </label>
              <input
                type="text"
                placeholder={`Enter ${field}`}
                {...register(field, { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
          >
            Update Doctor
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateDoctor;
