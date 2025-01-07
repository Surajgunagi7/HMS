import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { adminService } from "../../../services/adminDashboardService";
import { updateAdmin } from "../../../store/adminSlice";

const UpdateAdmin = () => {
  const [adminId, setAdminId] = useState("");
  const [adminDetails, setAdminDetails] = useState(null); 
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin?.admins || []);
  const { register, handleSubmit, setValue, reset } = useForm();

  const fetchAdminDetails = () => {
    if (!adminId.trim()) {
      alert("Please enter a valid Admin ID.");
      return;
    }

    const admin = admins.find((ad) => ad.id === adminId);
    if (!admin) {
      alert("Admin with the given ID does not exist.");
      return;
    }

    setAdminDetails(admin);

    Object.keys(admin).forEach((key) => {
      setValue(key, admin[key]);
    });
  };

  const onSubmit = async (data) => {
    if (!adminDetails) {
      alert("Please fetch the admin details before updating.");
      return;
    }

    try {
      const updatedAdmin = await adminService.updateAdmin(adminId, data);
      console.log(`Admin with ID ${adminId} has been updated in backend.`);

      dispatch(updateAdmin({ id: adminId, updates: updatedAdmin }));
      alert(`Admin with ID ${adminId} has been updated successfully.`);

      setAdminId("");
      setAdminDetails(null);
      reset();
    } catch (error) {
      console.error("Error updating admin:", error.message);
      alert("Failed to update admin. Please try again.");
    }
  };

  return (
    <div className="space-y-4 shadow p-6 max-h-screen">
      {/* Input Admin ID */}
      <input
        type="text"
        placeholder="Enter Admin ID"
        value={adminId}
        onChange={(e) => setAdminId(e.target.value)}
        className="w-full border border-gray-300 rounded px-3 py-2"
      />
      <button
        onClick={fetchAdminDetails}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Fetch Details
      </button>

      {/* Form for updating admin details */}
      {adminDetails && (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {Object.keys(adminDetails).map((key) => (
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
            Update Admin
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateAdmin;
