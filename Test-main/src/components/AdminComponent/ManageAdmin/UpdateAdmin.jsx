import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Search, Edit, User, Mail, Phone } from "lucide-react";
import { adminService } from "../../../services/adminDashboardService";
import { updateAdmin } from "../../../store/adminSlice";
import { GlassCard, GlassButton, GlassInput, LoadingOverlay } from "../../common";
import toast from 'react-hot-toast';

const editableFields = ["name", "email", "phone"];

const UpdateAdmin = () => {
  const [adminIdInput, setAdminIdInput] = useState("");
  const [adminDetails, setAdminDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const dispatch = useDispatch();
  const admins = useSelector((state) => state.admin?.admins || []);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const fetchAdminDetails = async () => {
    if (!adminIdInput.trim()) {
      toast.error("Please enter a valid Admin ID.");
      return;
    }

    setIsSearching(true);
    try {
      const admin = admins.find(ad => ad.loginId === adminIdInput);
      if (!admin) {
        toast.error("Admin with the given ID does not exist.");
        return;
      }

      setAdminDetails(admin);
      editableFields.forEach((key) => setValue(key, admin[key]));
      toast.success("Admin details loaded successfully!");
    } catch (error) {
      toast.error("Failed to fetch admin details.");
      console.error("Error fetching admin details:", error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const onSubmit = async (data) => {
    if (!adminDetails) {
      toast.error("Please fetch the admin details before updating.");
      return;
    }

    setIsLoading(true);
    try {
      const updatedAdmin = await adminService.updateAdmin(adminDetails._id, data);
      dispatch(updateAdmin({ id: adminDetails._id, updates: updatedAdmin.data }));
      toast.success(`Admin with ID ${adminDetails.loginId} has been updated successfully.`);
      
      setAdminIdInput("");
      setAdminDetails(null);
      reset();
    } catch (error) {
      console.error("Error updating admin:", error.message);
      toast.error("Failed to update admin. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldIcon = (field) => {
    switch (field) {
      case 'name': return User;
      case 'email': return Mail;
      case 'phone': return Phone;
      default: return User;
    }
  };

  return (
    <LoadingOverlay isLoading={isLoading} message="Updating admin...">
      <div className="space-y-6">
        {/* Search Section */}
        <GlassCard className="animate-fadeInUp">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Update Admin</h2>
            </div>
            <p className="text-gray-600">Search and update administrator details</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <GlassInput
                label="Admin ID"
                type="text"
                placeholder="Enter Admin ID to search"
                value={adminIdInput}
                onChange={(e) => setAdminIdInput(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <GlassButton
                onClick={fetchAdminDetails}
                loading={isSearching}
                className="gradient-admin"
                variant="searching"
              >
                <Search size={18}/>
                Search
              </GlassButton>
            </div>
          </div>
        </GlassCard>

        {/* Update Form */}
        {adminDetails && (
          <GlassCard className="animate-fadeInUp animate-stagger-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Edit className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Edit Admin Details</h3>
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
                      type={field === 'email' ? 'email' : 'text'}
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
                  Update Admin
                </GlassButton>
              </div>
            </form>
          </GlassCard>
        )}
      </div>
    </LoadingOverlay>
  );
};

export default UpdateAdmin;