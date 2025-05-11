import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { receptionistService } from "../../../services/adminDashboardService";
import { updateReceptionist } from "../../../store/receptionistSlice";
import toast from 'react-hot-toast';

const editableFields = ["name", "email", "phone"];

const UpdateReceptionist = () => {
  const [receptionistIdInput, setReceptionistIdInput] = useState("");
  const [receptionistDetails, setReceptionistDetails] = useState(null); 
  const dispatch = useDispatch();
  const receptionists = useSelector((state) => state.receptionist?.receptionists || []);
  const { register, handleSubmit, setValue, reset } = useForm();

  const fetchReceptionistDetails = () => {
    if (!receptionistIdInput.trim()) {
      alert("Please enter a valid Receptionist ID.");
      return;
    }

    console.log(receptionists);
    
    const receptionist = receptionists.find((rec) => rec.loginId === receptionistIdInput);
    if (!receptionist) {
      alert("Receptionist with the given ID does not exist.");
      return;
    }

    setReceptionistDetails(receptionist);
    editableFields.forEach((key) => setValue(key, receptionist[key]));
  };

  const onSubmit = async (data) => {
    if (!receptionistDetails) {
      alert("Please fetch the receptionist details before updating.");
      return;
    }

    try {
      const updatedReceptionist = await receptionistService.updateReceptionist(receptionistDetails._id, data);

      dispatch(updateReceptionist({ id: receptionistDetails._id, updates: updatedReceptionist.data }));

      toast.success(`Receptionist with ID ${receptionistDetails.loginId} has been updated successfully.`);
    
      setReceptionistIdInput("");
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
        placeholder="Enter Receptionist ID"
        value={receptionistIdInput}
        onChange={(e) => setReceptionistIdInput(e.target.value)}
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
          {editableFields.map((key) => (
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
