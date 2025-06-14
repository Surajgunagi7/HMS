import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { User, Mail, Lock, Phone, Stethoscope, GraduationCap, DollarSign, Camera } from 'lucide-react';
import { addDoctor } from "../../../store/doctorSlice";
import { doctorService } from "../../../services/adminDashboardService";
import { GlassCard, GlassButton, GlassInput, LoadingOverlay } from '../../common';
import toast from "react-hot-toast";

const AddDoctor = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const dispatch = useDispatch();

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

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("password", data.password);
      formData.append("specialization", data.specialization);
      formData.append("phone", data.phone);
      formData.append("role", "doctor");
      formData.append("experience", data.experience);
      formData.append("education", data.education);
      formData.append("consultationFee", data.consultationFee);
      formData.append("available", data.available || false);

      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }

      const response = await doctorService.addDoctor(formData);

      console.log("Doctor added successfully:", response.data);
      dispatch(addDoctor(response.data));
      toast.success("Doctor added successfully!");
      reset();
      setProfilePicture(null);
      setPreviewUrl(null);
    } catch (error) {
      console.error("Error adding doctor:", error.message);
      toast.error("Failed to add doctor. Please try again.");
    } finally {
      setIsLoading(false);
    }
};
  return (
    <LoadingOverlay isLoading={isLoading} message="Adding doctor...">
      <GlassCard className="animate-fadeInUp">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Add New Doctor</h2>
          <p className="text-gray-600">Create a new doctor account</p>
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
            <GlassInput
              icon={User}
              label="Full Name"
              type="text"
              placeholder="Enter doctor's full name"
              {...register('name', { required: 'Name is required' })}
              error={errors.name?.message}
            />

            <GlassInput
              icon={Mail}
              label="Email Address"
              type="email"
              placeholder="Enter email address"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: 'Please enter a valid email'
                }
              })}
              error={errors.email?.message}
            />

            <GlassInput
              icon={Lock}
              label="Password"
              type="password"
              placeholder="Enter secure password"
              {...register('password', { 
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters'
                }
              })}
              error={errors.password?.message}
            />

            <GlassInput
              icon={Phone}
              label="Phone Number"
              type="tel"
              placeholder="Enter contact number"
              {...register('phone', { required: 'Phone number is required' })}
              error={errors.phone?.message}
            />

            <GlassInput
              icon={Stethoscope}
              label="Specialization"
              type="text"
              placeholder="Enter specialization"
              {...register('specialization', { required: 'Specialization is required' })}
              error={errors.specialization?.message}
            />

            <GlassInput
              icon={GraduationCap}
              label="Experience (Years)"
              type="text"
              placeholder="Enter years of experience"
              {...register('experience', { required: 'Experience is required' })}
              error={errors.experience?.message}
            />

            <GlassInput
              icon={GraduationCap}
              label="Education"
              type="text"
              placeholder="Enter education details"
              {...register('education', { required: 'Education is required' })}
              error={errors.education?.message}
            />

            <GlassInput
              icon={DollarSign}
              label="Consultation Fee (₹)"
              type="number"
              placeholder="Enter consultation fee"
              {...register('consultationFee', { 
                required: 'Consultation fee is required',
                min: { value: 0, message: 'Fee must be positive' }
              })}
              error={errors.consultationFee?.message}
            />
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
              className="text-black"
            >
              Add Doctor
            </GlassButton>
          </div>
        </form>
      </GlassCard>
    </LoadingOverlay>
  );
};

export default AddDoctor;