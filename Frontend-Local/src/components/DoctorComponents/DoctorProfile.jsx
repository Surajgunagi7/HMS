import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Stethoscope, Edit2, Save, Camera } from "lucide-react";
import { doctorService } from "../../services/adminDashboardService";
import { authService } from "../../services/authService";

const DoctorProfile = () => {
  const { register, handleSubmit, reset } = useForm();
  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "" });
  const [doctor, setDoctor] = useState(null); 

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      try {
        const res = await authService.getUserProfile();
        setDoctor(res.data);
        reset({
          name: res.data.name || "",
          email: res.data.email || "",
          phone: res.data.phone || "",
          specialization: res.data.specialization || "",
          avatar: res.data.avatar || "/user.svg",
        });
      } catch (error) {
        console.error("Error fetching doctor profile:", error);
      }
    };

    fetchDoctorProfile();
  }, [reset]);

  const handleSave = async (data) => {
    try {
      const updated = await doctorService.updateDoctor(doctor._id, data);
      setDoctor(updated.data); 
      setEditMode(false);
      setNotification({ show: true, message: "Profile updated successfully!" });
      setTimeout(() => setNotification({ show: false, message: "" }), 3000);
    } catch (error) {
      console.error("Error saving profile:", error);
      setNotification({ show: true, message: "Failed to update profile." });
      setTimeout(() => setNotification({ show: false, message: "" }), 3000);
    }
  };

  const InputField = ({ icon: Icon, label, name, type = "text" }) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
          <Icon size={18} />
        </div>
        <input
          type={type}
          {...register(name)}
          disabled={!editMode}
          className={`w-full pl-10 pr-4 py-2.5 
            border rounded-lg 
            ${editMode
              ? "border-blue-300 bg-white focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              : "border-gray-200 bg-gray-50"}
            transition-all duration-200
            disabled:cursor-not-allowed
            outline-none`}
        />
      </div>
    </div>
  );

  if (!doctor) return <div>Loading...</div>;

  return (
    <div className="h-full overflow-y-auto">
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {notification.message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={doctor?.avatar || "/user.svg"}
                alt="Doctor avatar"
                className="w-28 h-28 rounded-full border-4 border-blue-50 mb-4"
              />
              {editMode && (
                <button className="absolute bottom-4 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors">
                  <Camera size={16} />
                </button>
              )}
            </div>
          </div>

          <form onSubmit={handleSubmit(handleSave)}>
            <div className="space-y-2">
              <InputField icon={User} label="Full Name" name="name" />
              <InputField icon={Mail} label="Email Address" name="email" type="email" />
              <InputField icon={Phone} label="Phone Number" name="phone" />
              <InputField icon={Stethoscope} label="Specialization" name="specialization" />
            </div>

            <div className="mt-6 flex justify-center">
              {editMode ? (
                <button
                  type="submit"
                  className="flex items-center gap-2 bg-green-500 text-white px-6 py-2.5 rounded-lg hover:bg-green-600 transition-colors duration-200 shadow-sm hover:shadow"
                >
                  <Save size={18} />
                  Save Changes
                </button>
              ) : (
                <span
                  onClick={() => setEditMode(true)}
                  className="flex items-center gap-2 bg-white text-blue-500 px-6 py-2.5 rounded-lg border-2 border-blue-100 hover:border-blue-200 hover:bg-blue-50 transition-all duration-200 cursor-pointer"
                >
                  <Edit2 size={18} />
                  Edit Profile
                </span>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
