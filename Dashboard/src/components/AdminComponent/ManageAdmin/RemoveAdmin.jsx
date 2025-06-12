import { useState } from "react";
import { useDispatch } from "react-redux";
import { adminService } from "../../../services/adminDashboardService";
import { deleteAdmin } from "../../../store/adminSlice";

const RemoveAdmin = () => {
  const [adminId, setAdminId] = useState("");
  const dispatch = useDispatch();

  const handleRemove = async () => {
    if (adminId.trim() === "") {
      alert("Please enter a valid Admin ID.");
      return;
    }
    try {
      await adminService.removeAdmin(adminId);
      console.log(`Admin with ID ${adminId} has been removed from backend.`);

      dispatch(deleteAdmin(adminId));
      alert(`Admin with ID ${adminId} has been removed.`);

      setAdminId("");
    } catch (error) {
      console.error("Error removing admin:", error.message);
      alert(error?.response?.data?.message || "Failed to remove admin.");
    }
  };

  return (
    <div className="space-y-4 max-h-screen p-6 shadow">
      <input
        type="text"
        placeholder="Enter Admin ID"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={handleRemove}
        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
        Remove Admin
      </button>
    </div>
  );
};

export default RemoveAdmin;
