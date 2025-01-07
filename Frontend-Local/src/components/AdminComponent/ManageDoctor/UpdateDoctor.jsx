import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { doctorService } from "../../../services/adminDashboardService";
import { updateDoctor } from "../../../store/doctorSlice";

const UpdateDoctor = () => {
  const [doctorId, setDoctorId] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null); 
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor?.doctors || []);
  const { register, handleSubmit, setValue, reset } = useForm();

  const fetchDoctorDetails = () => {
    if (!doctorId.trim()) {
      alert("Please enter a valid Doctor ID.");
      return;
    }

    const doctor = doctors.find((doc) => doc.id === doctorId);
    if (!doctor) {
      alert("Doctor with the given ID does not exist.");
      return;
    }

    setDoctorDetails(doctor);

    Object.keys(doctor).forEach((key) => {
      setValue(key, doctor[key]);
    });
  };

  const onSubmit = async (data) => {
    if (!doctorDetails) {
      alert("Please fetch the doctor details before updating.");
      return;
    }

    try {
      const updatedDoctor = await doctorService.updateDoctor(doctorId, data);
      console.log(`Doctor with ID ${doctorId} has been updated in backend.`);

      dispatch(updateDoctor({ id: doctorId, updates: updatedDoctor }));
      alert(`Doctor with ID ${doctorId} has been updated successfully.`);

      setDoctorId("");
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
      <div className="mb-2">
        <label className="block font-medium text-lg mb-2" htmlFor="doctorId">
          Doctor ID
        </label>
        <input
          type="text"
          id="doctorId"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Enter Doctor ID"
        />
      </div>
      <button
        onClick={fetchDoctorDetails}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-4"
      >
        Fetch Details
      </button>

      {/* Form for updating doctor details */}
      {doctorDetails && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-0">
          <div className="flex justify-between">
            <div className="w-full mr-10">
              <div className="mb-5">
                <label className="block font-medium text-lg mb-2" htmlFor="name">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  {...register("name", { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter doctor's name"
                />
              </div>
              <div className="mb-5">
                <label className="block font-medium text-lg mb-2" htmlFor="specialization">
                  Specialization
                </label>
                <input
                  type="text"
                  id="specialization"
                  {...register("specialization", { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter specialization"
                />
              </div>
              <div className="mb-5">
                <label className="block font-medium text-lg mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email", { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter email"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="mb-5">
                <label className="block font-medium text-lg mb-2" htmlFor="phone">
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone"
                  {...register("phone", { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter contact number"
                />
              </div>
              <div className="mb-5">
                <label className="block font-medium text-lg mb-2" htmlFor="education">
                  Education
                </label>
                <input
                  type="text"
                  id="education"
                  {...register("education", { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Enter education details"
                />
              </div>
              <div className="mb-5">
                <label className="block font-medium text-lg mb-2" htmlFor="about">
                  About
                </label>
                <textarea
                  id="about"
                  {...register("about", { required: true })}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                  placeholder="Write a short description about the doctor"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>

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
