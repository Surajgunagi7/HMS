import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { adminService } from "../../../services/adminDashboardService";
import { updateAdmin } from "../../../store/adminSlice";
import toast from 'react-hot-toast';

const editableFields = ["name", "email", "phone"];

const UpdateAdmin = () => {
  const [adminIdInput, setAdminIdInput] = useState("");
  const [adminDetails, setAdminDetails] = useState(null);
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin?.admins || []);
  const { register, handleSubmit, setValue, reset } = useForm();

  const fetchAdminDetails = () => {
    if (!adminIdInput.trim()) {
      alert("Please enter a valid Admin ID.");
      return;
    }

    const admin = admins.find(ad => ad.loginId === adminIdInput);
    if (!admin) {
      alert("Admin with the given ID does not exist.");
      return;
    }

    setAdminDetails(admin);
    editableFields.forEach((key) => setValue(key, admin[key]));
  };

  const onSubmit = async (data) => {
    if (!adminDetails) {
      alert("Please fetch the admin details before updating.");
      return;
    }

    try {
      const updatedAdmin = await adminService.updateAdmin(adminDetails._id, data);

      dispatch(updateAdmin({ id: adminDetails._id, updates: updatedAdmin.data })); 

      toast.success(`Admin with ID ${adminDetails.loginId} has been updated successfully.`);

      setAdminIdInput("");
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
        value={adminIdInput}
        onChange={(e) => setAdminIdInput(e.target.value)}
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
            Update Admin
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateAdmin;
