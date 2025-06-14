import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {
  User, Mail, Phone, Stethoscope, Edit2, Save, Camera, GraduationCap, DollarSign
} from "lucide-react";
import { doctorService } from "../../services/adminDashboardService";
import { authService } from "../../services/authService";
import { GlassCard, GlassButton, GlassInput, LoadingOverlay } from "../common";
import toast from "react-hot-toast";

const DoctorProfile = () => {
  const { register, handleSubmit, reset } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [doctor, setDoctor] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        setIsLoading(true);
        const res = await authService.getUserProfile();
        setDoctor(res.data);
        setPreviewUrl(res.data.profilePicture || null);
        reset({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          specialization: res.data.specialization || "",
          experience: res.data.about?.experience || "",
          education: res.data.about?.education || "",
          consultationFee: res.data.consultationFee || "",
        });
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
        toast.error("Failed to load profile");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoctorProfile();
  }, [reset]);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error("Please select a valid image file");
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (data) => {
    try {
      setIsLoading(true);

      let payload;
      
      if (profilePicture) {
        // Create FormData for image upload
        payload = new FormData();
        payload.append("name", data.name);
        payload.append("email", data.email);
        payload.append("role", doctor.role || "doctor"); 
        payload.append("phone", data.phone);
        payload.append("specialization", data.specialization);
        payload.append("consultationFee", parseFloat(data.consultationFee));
        
        // Stringify the about object for FormData
        const aboutData = JSON.stringify({
          experience: data.experience,
          education: data.education,
        });
        payload.append("about", aboutData);    
        payload.append("profilePicture", profilePicture);
        
        console.log("Sending FormData with image");
      } else {
        // Regular JSON payload for updates without image
        payload = {
          name: data.name,
          email: data.email,
          role: doctor.role || "doctor",
          phone: data.phone,
          specialization: data.specialization,
          consultationFee: parseFloat(data.consultationFee),
          about: {
            experience: data.experience,
            education: data.education,
          },
        };
        
        console.log("Sending JSON payload without image");
      }
      
      // Use the new service method that handles both FormData and JSON
      const updated = await doctorService.updateDoctorWithImage(doctor._id, payload);
      console.log("Update response:", updated);
      
      // Refresh profile data
      const refreshedProfile = await authService.getUserProfile();
      setDoctor(refreshedProfile.data);
      setPreviewUrl(refreshedProfile.data.profilePicture || null);
      
      // Update form with fresh data from server
      reset({
        name: refreshedProfile.data.name || "",
        email: refreshedProfile.data.email || "",
        phone: refreshedProfile.data.phone || "",
        specialization: refreshedProfile.data.specialization || "",
        experience: refreshedProfile.data.about?.experience || "",
        education: refreshedProfile.data.about?.education || "",
        consultationFee: refreshedProfile.data.consultationFee || "",
      });
      
      setEditMode(false);
      setProfilePicture(null); // Clear the selected file
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle edit button click with explicit event prevention
  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(true);
  };

  // Handle cancel button click with explicit event prevention
  const handleCancelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setEditMode(false);
    setProfilePicture(null); // Clear any selected image
    // Reset preview URL to original
    setPreviewUrl(doctor?.profilePicture || null);
  };

  const InputField = ({ icon: Icon, label, name, type = "text", disabled = false }) => (
    <GlassInput
      icon={Icon}
      label={label}
      type={type}
      disabled={!editMode || disabled}
      {...register(name)}
      className={`${!editMode ? "bg-gray-50" : ""}`}
    />
  );

  return (
    <div className="min-h-screen bg-gray-50 relative">
      <div className="absolute inset-0 gradient-doctor opacity-5"></div>

      <div className="relative z-10 p-6">
        <LoadingOverlay isLoading={isLoading} message={editMode ? "Updating profile..." : "Loading profile..."}>
          <GlassCard className="max-w-4xl mx-auto animate-fadeInUp">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor Profile</h2>
              <p className="text-gray-600">Manage your professional information</p>
            </div>

            {/* Conditional form rendering - only show form in edit mode */}
            {editMode ? (
              <form onSubmit={handleSubmit(handleSave)}>
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full border-4 border-cyan-100 overflow-hidden bg-gray-100 flex items-center justify-center mx-auto">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Doctor avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-cyan-500 p-3 rounded-full text-white hover:bg-cyan-600 transition-colors cursor-pointer shadow-lg">
                      <Camera size={18} />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleProfilePictureChange} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">{doctor?.name}</h3>
                    <p className="text-gray-600">{doctor?.specialization}</p>
                    <p className="text-sm text-gray-500">ID: {doctor?.loginId}</p>
                    {profilePicture && (
                      <p className="text-sm text-green-600 mt-2">New image selected: {profilePicture.name}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <InputField icon={User} label="Full Name" name="name" />
                  <InputField icon={Mail} label="Email Address" name="email" type="email" disabled />
                  <InputField icon={Phone} label="Phone Number" name="phone" />
                  <InputField icon={Stethoscope} label="Specialization" name="specialization" />
                  <InputField icon={GraduationCap} label="Experience" name="experience" />
                  <InputField icon={GraduationCap} label="Education" name="education" />
                  <InputField icon={DollarSign} label="Consultation Fee (₹)" name="consultationFee" type="number" />
                </div>

                <div className="flex justify-center gap-4">
                  <GlassButton 
                    type="submit" 
                    variant="success" 
                    size="lg" 
                    loading={isLoading} 
                    className="bg-green-500 text-white hover:bg-green-600"
                  >
                    <Save size={18} />
                    Save Changes
                  </GlassButton>
                  <GlassButton 
                    type="button" 
                    onClick={handleCancelClick} 
                    variant="secondary" 
                    size="lg"
                  >
                    Cancel
                  </GlassButton>
                </div>
              </form>
            ) : (
              // View mode - no form wrapper
              <div>
                <div className="text-center mb-8">
                  <div className="relative inline-block">
                    <div className="w-32 h-32 rounded-full border-4 border-cyan-100 overflow-hidden bg-gray-100 flex items-center justify-center mx-auto">
                      {previewUrl ? (
                        <img src={previewUrl} alt="Doctor avatar" className="w-full h-full object-cover" />
                      ) : (
                        <User className="w-16 h-16 text-gray-400" />
                      )}
                    </div>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-xl font-semibold text-gray-800">{doctor?.name}</h3>
                    <p className="text-gray-600">{doctor?.specialization}</p>
                    <p className="text-sm text-gray-500">ID: {doctor?.loginId}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <InputField icon={User} label="Full Name" name="name" />
                  <InputField icon={Mail} label="Email Address" name="email" type="email" disabled />
                  <InputField icon={Phone} label="Phone Number" name="phone" />
                  <InputField icon={Stethoscope} label="Specialization" name="specialization" />
                  <InputField icon={GraduationCap} label="Experience" name="experience" />
                  <InputField icon={GraduationCap} label="Education" name="education" />
                  <InputField icon={DollarSign} label="Consultation Fee (₹)" name="consultationFee" type="number" />
                </div>

                <div className="flex justify-center gap-4">
                  <GlassButton 
                    type="button" 
                    onClick={handleEditClick} 
                    variant="primary" 
                    size="lg" 
                    className="gradient-doctor text-white"
                  >
                    <Edit2 size={18} />
                    Edit Profile
                  </GlassButton>
                </div>
              </div>
            )}
          </GlassCard>
        </LoadingOverlay>
      </div>
    </div>
  );
};

export default DoctorProfile;