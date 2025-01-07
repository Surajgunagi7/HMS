import { useState } from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone, Stethoscope, Edit2, Save, Camera } from "lucide-react";

const DoctorProfile = () => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: "Dr. John Doe",
      email: "johndoe@example.com",
      phone: "123-456-7890",
      specialization: "Cardiologist",
      avatar: "/user.svg",
    },
  });

  const [editMode, setEditMode] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: "" });


  const handleSave = (data) => {
    setEditMode(false);
    setNotification({ show: true, message: "Profile updated successfully!" });
    setTimeout(() => setNotification({ show: false, message: "" }), 3000);
    // Simulate saving changes
    console.log("Saved profile data:", data);
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

  return (
    <div className="h-full overflow-y-auto">
      {/* Notification */}
      {notification.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in z-50">
          {notification.message}
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg p-6 h-full">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-6">
            <div className="relative inline-block">
              <img
                src={'/user.svg'}
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

          {/* Form Fields */}
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="space-y-2">
              <InputField icon={User} label="Full Name" name="name" />
              <InputField icon={Mail} label="Email Address" name="email" type="email" />
              <InputField icon={Phone} label="Phone Number" name="phone" />
              <InputField icon={Stethoscope} label="Specialization" name="specialization" />
            </div>

            {/* Action Button */}
            <div className="mt-6 flex justify-center">
              {editMode ? (
                <button
                  type="submit"
                  className="
                    flex items-center gap-2 
                    bg-green-500 text-white 
                    px-6 py-2.5 rounded-lg
                    hover:bg-green-600 
                    transition-colors duration-200
                    shadow-sm hover:shadow
                  "
                >
                  <Save size={18} />
                  Save Changes
                </button>
              ) : (
                <span
                  onClick={() => setEditMode(true)}
                  className="
                    flex items-center gap-2 
                    bg-white text-blue-500 
                    px-6 py-2.5 rounded-lg
                    border-2 border-blue-100
                    hover:border-blue-200 
                    hover:bg-blue-50
                    transition-all duration-200
                  "
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