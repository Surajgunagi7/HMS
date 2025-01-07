import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { receptionistService } from "../../../services/adminDashboardService";
import { updateReceptionist } from "../../../store/receptionistSlice";

const UpdateReceptionist = () => {
  const [receptionistId, setReceptionistId] = useState("");
  const [receptionistDetails, setReceptionistDetails] = useState(null); 
  const dispatch = useDispatch();
  const receptionists = useSelector((state) => state.receptionist?.receptionists || []);
  const { register, handleSubmit, setValue, reset } = useForm();

  const fetchReceptionistDetails = () => {
    if (!receptionistId.trim()) {
      alert("Please enter a valid Receptionist ID.");
      return;
    }

    const receptionist = receptionists.find((rec) => rec.id === receptionistId);
    if (!receptionist) {
      alert("Receptionist with the given ID does not exist.");
      return;
    }

    setReceptionistDetails(receptionist);

    Object.keys(receptionist).forEach((key) => {
      setValue(key, receptionist[key]);
    });
  };

  const onSubmit = async (data) => {
    if (!receptionistDetails) {
      alert("Please fetch the receptionist details before updating.");
      return;
    }

    try {
      const updatedReceptionist = await receptionistService.updateReceptionist(receptionistId, data);
      console.log(`Receptionist with ID ${receptionistId} has been updated in backend.`);

      dispatch(updateReceptionist({ id: receptionistId, updates: updatedReceptionist }));
      alert(`Receptionist with ID ${receptionistId} has been updated successfully.`);

      setReceptionistId("");
      setReceptionistDetails(null);
      reset();
    } catch (error) {
      console.error("Error updating receptionist:", error.message);
      alert("Failed to update receptionist. Please try again.");
    }
  };

  return (
    <div className="space-y-4 max-h-screen p-6 shadow">
      {/* Input Receptionist ID */}
      <input
        type="text"
        placeholder="Enter Admin ID"
        value={receptionistId}
        onChange={(e) => setReceptionistId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={fetchReceptionistDetails}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Fetch Details
      </button>

      {/* Form for updating receptionist details */}
      {receptionistDetails && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {Object.keys(receptionistDetails).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key}
              </label>
              <input
                type="text"
                placeholder={`Enter new ${key}`}
                {...register(key, { required: true })}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
            </div>
          ))}

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Update Receptionist
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateReceptionist;
