import { useState } from "react";
import { useDispatch } from "react-redux";
import { Trash2, AlertTriangle } from "lucide-react";
import { receptionistService } from "../../../services/adminDashboardService";
import { deleteReceptionist } from "../../../store/receptionistSlice";
import { GlassCard, GlassButton, GlassInput, LoadingOverlay } from "../../common";
import toast from "react-hot-toast";

const RemoveReceptionist = () => {
  const [receptionistId, setReceptionistId] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const dispatch = useDispatch();

  const handleRemove = async () => {
    if (receptionistId.trim() === "") {
      toast.error("Please enter a valid Receptionist ID.");
      return;
    }

    setIsLoading(true);
    try {
      await receptionistService.removeReceptionist(receptionistId);
      dispatch(deleteReceptionist(receptionistId));
      toast.success(`Receptionist with ID ${receptionistId} removed successfully.`);
      setReceptionistId("");
      setShowConfirm(false);
    } catch (error) {
      console.error("Error removing receptionist:", error.message);
      toast.error(error?.response?.data?.message || "Failed to remove receptionist.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoadingOverlay isLoading={isLoading} message="Removing receptionist...">
      <GlassCard className="animate-fadeInUp">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-100 rounded-xl">
              <Trash2 className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800">Remove Receptionist</h2>
          </div>
          <p className="text-gray-600">Permanently delete a receptionist account</p>
        </div>

        <div className="space-y-6">
          <GlassInput
            label="Receptionist ID"
            type="text"
            placeholder="Enter Receptionist ID to remove"
            value={receptionistId}
            onChange={(e) => setReceptionistId(e.target.value)}
          />

          {receptionistId && !showConfirm && (
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
                    Are you sure you want to remove receptionist with ID: <strong>{receptionistId}</strong>? 
                    This action cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <GlassButton
                      onClick={handleRemove}
                      variant="danger"
                      loading={isLoading}
                      className="bg-red-600 text-white"
                    >
                      Yes, Remove Receptionist
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

export default RemoveReceptionist;
