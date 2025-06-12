import { useState } from "react";
import { useDispatch } from "react-redux";
import { Trash2, AlertTriangle } from "lucide-react";
import { adminService } from "../../../services/adminDashboardService";
import { deleteAdmin } from "../../../store/adminSlice";
import { GlassCard, GlassButton, GlassInput, LoadingOverlay } from "../../common";
import toast from 'react-hot-toast';

const RemoveAdmin = () => {
  const [adminId, setAdminId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = async () => {
    if (adminId.trim() === "") {
      toast.error("Please enter a valid Admin ID.");
      return;
    }

    setIsLoading(true);
    try {
      await adminService.removeAdmin(adminId);
      dispatch(deleteAdmin(adminId));
      toast.success(`Admin with ID ${adminId} has been removed successfully.`);
      setAdminId("");
      setShowConfirm(false);
    } catch (error) {
      console.error("Error removing admin:", error.message);
      toast.error(error?.response?.data?.message || "Failed to remove admin.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingOverlay isLoading={isLoading} message="Removing admin...">
      <GlassCard className="animate-fadeInUp">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-xl">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Remove Admin</h2>
          </div>
          <p className="text-gray-600">Permanently delete an administrator account</p>
        </div>

        <div className="space-y-6">
          <GlassInput
            label="Admin ID"
            type="text"
            placeholder="Enter Admin ID to remove"
            value={adminId}
            onChange={(e) => setAdminId(e.target.value)}
          />

          {adminId && !showConfirm && (
            <div className="flex justify-end">
              <GlassButton
                onClick={() => setShowConfirm(true)}
                variant="danger"
                className="bg-red-600 text-white"
              >
                Proceed to Remove
              </GlassButton>
            </div>
          )}

          {showConfirm && (
            <GlassCard background="glass" className="border-red-200">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-red-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-red-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-red-800 mb-2">Confirm Removal</h3>
                  <p className="text-red-700 mb-4">
                    Are you sure you want to remove admin with ID: <strong>{adminId}</strong>? 
                    This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <GlassButton
                      onClick={handleRemove}
                      variant="danger"
                      loading={isLoading}
                      className="bg-red-600 text-white"
                    >
                      Yes, Remove Admin
                    </GlassButton>
                    <GlassButton
                      onClick={() => setShowConfirm(false)}
                      variant="secondary"
                    >
                      Cancel
                    </GlassButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          )}
        </div>
      </GlassCard>
    </LoadingOverlay>
  );
};

export default RemoveAdmin;