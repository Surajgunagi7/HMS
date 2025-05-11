import { useState } from "react";
import { useDispatch } from "react-redux";
import { doctorService } from "../../../services/adminDashboardService";
import { deleteDoctor } from "../../../store/doctorSlice";

const RemoveDoctor = () => {
  const [doctorId, setDoctorId] = useState("");
  const dispatch = useDispatch();

  const handleRemove = async () => {
    if (doctorId.trim() === "") {
      alert("Please enter a valid Doctor ID.");
      return;
    }
    try {
      await doctorService.removeDoctor(doctorId);
      console.log(`Doctor with ID ${doctorId} has been removed from backend.`);

      dispatch(deleteDoctor(doctorId));
      alert(`Doctor with ID ${doctorId} has been removed.`);

      setDoctorId("");
    } catch (error) {
      console.error("Error removing doctor:", error.message);
      alert(error?.response?.data?.message || "Failed to remove doctor.");
    }
  };

  return (
    <div className="space-y-4 p-6 shadow">
      <input
        type="text"
        placeholder="Enter Doctor ID"
        value={doctorId}
        onChange={(e) => setDoctorId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Remove Doctor
      </button>
    </div>
  );
};

export default RemoveDoctor;
