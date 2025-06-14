import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Search, Edit, User, Mail, Phone, Stethoscope, GraduationCap, DollarSign, Camera } from "lucide-react";
import { doctorService } from "../../../services/adminDashboardService";
import { updateDoctor } from "../../../store/doctorSlice";
import { GlassCard, GlassButton, GlassInput, LoadingOverlay } from "../../common";
import toast from "react-hot-toast";

const editableFields = [
  "name",
  "email", 
  "phone",
  "specialization",
  "experience",
  "education",
  "consultationFee"
];

const UpdateDoctor = () => {
  const [doctorIdInput, setDoctorIdInput] = useState("");
  const [doctorDetails, setDoctorDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctor?.doctors || []);
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const fetchDoctorDetails = () => {
    if (!doctorIdInput.trim()) {
      toast.error("Please enter a valid Doctor ID.");
      return;
    }

    setIsSearching(true);
    try {
      const doctor = doctors.find((doc) => doc.loginId === doctorIdInput);
      if (!doctor) {
        toast.error("Doctor with the given ID does not exist.");
        return;
      }

      setDoctorDetails(doctor);
      setPreviewUrl(doctor.profilePicture || null);

      setValue("name", doctor.name || "");
      setValue("email", doctor.email || "");
      setValue("phone", doctor.phone || "");
      setValue("specialization", doctor.specialization || "");
      setValue("experience", doctor.about?.experience || "");
      setValue("education", doctor.about?.education || "");
      setValue("consultationFee", doctor.consultationFee || "");
      setValue("available", doctor.available || false);

      toast.success("Doctor details loaded successfully!");
    } catch (error) {
      toast.error("Failed to fetch doctor details.");
      console.error("Error fetching doctor details:", error.message);
    } finally {
      setIsSearching(false);
    }
  };

  const onSubmit = async (data) => {
    if (!doctorDetails) {
      toast.error("Please fetch the doctor details before updating.");
      return;
    }

    setIsLoading(true);
    try {
      const formattedData = {
        name: data.name,
        email: data.email,
        phone: data.phone,
        specialization: data.specialization,
        about: {
          experience: data.experience,
          education: data.education,
        },
        consultationFee: parseFloat(data.consultationFee),
        available: data.available,
        profilePicture: previewUrl, 
      };

      const updatedDoctor = await doctorService.updateDoctor(
        doctorDetails._id,
        formattedData
      );

      dispatch(
        updateDoctor({
          loginId: doctorDetails.loginId,
          updates: updatedDoctor.data,
        })
      );

      toast.success(
        `Doctor with ID ${doctorDetails.loginId} has been updated successfully.`
      );

      setDoctorIdInput("");
      setDoctorDetails(null);
      setPreviewUrl(null);
      setProfilePicture(null);
      reset();
    } catch (error) {
      console.error("Error updating doctor:", error.message);
      toast.error("Failed to update doctor. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getFieldIcon = (field) => {
    switch (field) {
      case 'name': return User;
      case 'email': return Mail;
      case 'phone': return Phone;
      case 'specialization': return Stethoscope;
      case 'experience': return GraduationCap;
      case 'education': return GraduationCap;
      case 'consultationFee': return DollarSign;
      default: return User;
    }
  };

  return (
    <LoadingOverlay isLoading={isLoading} message="Updating doctor...">
      <div className="space-y-6">
        {/* Search Section */}
        <GlassCard className="animate-fadeInUp">
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-xl">
                <Search className="w-5 h-5 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800">Update Doctor</h2>
            </div>
            <p className="text-gray-600">Search and update doctor details</p>
          </div>

          <div className="flex gap-4">
            <div className="flex-1">
              <GlassInput
                label="Doctor ID"
                type="text"
                placeholder="Enter Doctor ID to search"
                value={doctorIdInput}
                onChange={(e) => setDoctorIdInput(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <GlassButton
                onClick={fetchDoctorDetails}
                loading={isSearching}
                className="gradient-doctor"
                variant="searching"
              >
                <Search size={18}/>
                Search
              </GlassButton>
            </div>
          </div>
        </GlassCard>

        {/* Update Form */}
        {doctorDetails && (
          <GlassCard className="animate-fadeInUp animate-stagger-2">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-green-100 rounded-xl">
                  <Edit className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Edit Doctor Details</h3>
              </div>
              <p className="text-gray-600">Update the information below</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Profile Picture Upload */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-32 h-32 rounded-full border-4 border-blue-100 overflow-hidden bg-gray-100 flex items-center justify-center">
                    {previewUrl ? (
                      <img src={previewUrl} alt="Profile preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-16 h-16 text-gray-400" />
                    )}
                  </div>
                  <label className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors cursor-pointer">
                    <Camera size={16} />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfilePictureChange}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {editableFields.map((field) => {
                  const Icon = getFieldIcon(field);
                  return (
                    <GlassInput
                      key={field}
                      icon={Icon}
                      label={field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                      type={field === 'email' ? 'email' : field === 'consultationFee' ? 'number' : 'text'}
                      placeholder={`Enter new ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
                      {...register(field, { required: `${field} is required` })}
                      error={errors[field]?.message}
                    />
                  );
                })}
              </div>

              {/* Availability Checkbox */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="available"
                  {...register('available')}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="available" className="text-sm font-medium text-gray-700">
                  Doctor is available for appointments
                </label>
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
                  Update Doctor
                </GlassButton>
              </div>
            </form>
          </GlassCard>
        )}
      </div>
    </LoadingOverlay>
  );
};

export default UpdateDoctor;