import { useState } from "react";
import { useDispatch } from "react-redux";
import { receptionistService } from "../../../services/adminDashboardService";
import { deleteReceptionist } from "../../../store/receptionistSlice"; 

const RemoveReceptionist = () => {
  const [receptionistId, setReceptionistId] = useState("");
  const dispatch = useDispatch();

  const handleRemove = async () => {
    if (receptionistId.trim() === "") {
      alert("Please enter a valid Receptionist ID.");
      return;
    }
    try {
      await receptionistService.removeReceptionist(receptionistId);
      console.log(`Receptionist with ID ${receptionistId} has been removed from backend.`);

      dispatch(deleteReceptionist(receptionistId));
      alert(`Receptionist with ID ${receptionistId} has been removed.`);
      
      setReceptionistId(""); 
    } catch (error) {
      console.error("Error removing receptionist:", error.message);
      alert(error?.response?.data?.message || "Failed to remove receptionist.");
    }
  };

  return (
    <div className="space-y-4 p-6 shadow max-h-screen">
      <input
        type="text"
        placeholder="Enter Admin ID"
        value={receptionistId}
        onChange={(e) => setReceptionistId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Remove Receptionist
      </button>
    </div>
  );
};

export default RemoveReceptionist;
