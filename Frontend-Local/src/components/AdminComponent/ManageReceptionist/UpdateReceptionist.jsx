import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Search, Edit, User, Mail, Phone } from "lucide-react";
import { receptionistService } from "../../../services/adminDashboardService";
import { updateReceptionist } from "../../../store/receptionistSlice";
import { GlassCard, GlassButton, GlassInput, LoadingOverlay } from "../../common";
import toast from "react-hot-toast";

const editableFields = ["name", "email", "phone"];

const UpdateReceptionist = () => {
  const [receptionistIdInput, setReceptionistIdInput] = useState("");
  const [receptionistDetails, setReceptionistDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const receptionists = useSelector((state) => state.receptionist?.receptionists || []);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const fetchReceptionistDetails = async () => {
    if (!receptionistIdInput.trim()) {
      toast.error("Please enter a valid Receptionist ID.");
      return;
    }

    setIsSearching(true);
    try {
      const receptionist = receptionists.find((rec) => rec.loginId === receptionistIdInput);
      if (!receptionist) {
        toast.error("Receptionist with the given ID does not exist.");
        return;
      }

      setReceptionistDetails(receptionist);
      editableFields.forEach((key) => setValue(key, receptionist[key]));
      toast.success("Receptionist details loaded successfully!");
    } catch (error) {
      toast.error("Failed to fetch receptionist details.");
      console.error("Error:", error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const onSubmit = async (data) => {
    if (!receptionistDetails) {
      toast.error("Please fetch the receptionist details before updating.");
      return;
    }

    setIsLoading(true);
    try {
      const updated = await receptionistService.updateReceptionist(receptionistDetails._id, data);
      dispatch(updateReceptionist({ id: receptionistDetails._id, updates: updated.data }));

      toast.success(`Receptionist with ID ${receptionistDetails.loginId} has been updated successfully.`);
      setReceptionistIdInput("");
      setReceptionistDetails(null);
      reset();
    } catch (error) {
      console.error("Error updating receptionist:", error.message);
      toast.error("Failed to update receptionist. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldIcon = (field) => {
    switch (field) {
      case "name":
        return User;
      case "email":
        return Mail;
      case "phone":
        return Phone;
      default:
        return User;
    }
  };

  return (
    <LoadingOverlay isLoading={isLoading} message="Updating receptionist...">
      <div className="space-y-6">
        {/* Search Section */}
        <GlassCard className="animate-fadeInUp">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Update Receptionist</h2>
            </div>
            <p className="text-gray-600">Search and update receptionist details</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <GlassInput
                label="Receptionist ID"
                type="text"
                placeholder="Enter Receptionist ID to search"
                value={receptionistIdInput}
                onChange={(e) => setReceptionistIdInput(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <GlassButton
                onClick={fetchReceptionistDetails}
                loading={isSearching}
                className="gradient-admin"
                variant="searching"
              >
                <Search size={18} />
                Search
              </GlassButton>
            </div>
          </div>
        </GlassCard>

        {/* Update Form */}
        {receptionistDetails && (
          <GlassCard className="animate-fadeInUp animate-stagger-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Edit className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Edit Receptionist Details</h3>
              </div>
              <p className="text-gray-600">Update the information below</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editableFields.map((field) => {
                  const Icon = getFieldIcon(field);
                  return (
                    <GlassInput
                      key={field}
                      icon={Icon}
                      label={field.charAt(0).toUpperCase() + field.slice(1)}
                      type={field === "email" ? "email" : "text"}
                      placeholder={`Enter new ${field}`}
                      {...register(field, { required: `${field} is required` })}
                      error={errors[field]?.message}
                    />
                  );
                })}
              </div>

              <div className="flex justify-end pt-4">
                <GlassButton
                  type="submit"
                  variant="success"
                  size="lg"
                  loading={isLoading}
                  className="bg-green-500 text-white"
                >
                  <Edit size={18} />
                  Update Receptionist
                </GlassButton>
              </div>
            </form>
          </GlassCard>
        )}
      </div>
    </LoadingOverlay>
  );
};

export default UpdateReceptionist;
