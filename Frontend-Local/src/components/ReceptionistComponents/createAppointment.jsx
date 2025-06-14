import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Calendar, Clock, User, Mail, Phone, Stethoscope, FileText } from 'lucide-react';
import { patientService } from '../../services/patientService';
import { appointmentService } from "../../services/appointmentsService";
import { GlassCard, GlassButton, GlassInput } from '../common';
import toast from 'react-hot-toast';
import { useState } from 'react';

const CreateAppointment = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      patientName: "",
      age: "",
      email: "",
      phone: "",
      doctorId: "",
      reason: "",
      appointmentDate: "",
      appointmentTime: ""
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const doctors = useSelector((state) => state.doctor.doctors);
  
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const patientDetails = {
        name: data.patientName,
        age: data.age,
        email: data.email,
        phone: data.phone,
      };

      const patientRes = await patientService.createOrFindPatient(patientDetails);
      const patientId = patientRes.data.data._id;
    
      const appointmentPayload = {
        patient: patientId,
        doctor: data.doctorId,
        reason: data.reason,
        dateTime: `${data.appointmentDate}T${data.appointmentTime}:00.000Z`,
        status: "pending",
        paymentStatus: "pending"
      };

      const response = await appointmentService.createAppointment(appointmentPayload);
      console.log("Appointment created successfully:", response);
      
      toast.success("Appointment created successfully!");
      reset();
    } catch (error) {
      console.error("Error creating appointment:", error);
      toast.error("Failed to create appointment. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-receptionist opacity-5"></div>
      
      <div className="relative z-10 p-6">
        <GlassCard className="max-w-4xl mx-auto animate-fadeInUp">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Create New Appointment</h2>
            <p className="text-gray-600">Fill in the information below to schedule a new appointment</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Patient Information Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <User className="w-5 h-5 mr-2 text-emerald-600" />
                Patient Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassInput
                  icon={User}
                  label="Patient Name"
                  type="text"
                  placeholder="Enter patient's full name"
                  {...register("patientName", { required: "Patient name is required" })}
                  error={errors.patientName?.message}
                />
                <GlassInput
                  icon={User}
                  label="Age"
                  type="number"
                  placeholder="Enter patient's age"
                  {...register("age", { 
                    required: "Age is required",
                    min: { value: 0, message: "Age must be positive" },
                    max: { value: 150, message: "Please enter a valid age" }
                  })}
                  error={errors.age?.message}
                />
                <GlassInput
                  icon={Mail}
                  label="Email Address"
                  type="email"
                  placeholder="Enter email address"
                  {...register("email", { 
                    required: "Email is required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: "Please enter a valid email"
                    }
                  })}
                  error={errors.email?.message}
                />
                <GlassInput
                  icon={Phone}
                  label="Phone Number"
                  type="tel"
                  placeholder="Enter contact number"
                  {...register("phone", { required: "Phone number is required" })}
                  error={errors.phone?.message}
                />
              </div>
            </div>

            {/* Appointment Details Section */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-emerald-600" />
                Appointment Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Doctor</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none z-10">
                      <Stethoscope size={18} />
                    </div>
                    <select
                      {...register("doctorId", { required: "Please select a doctor" })}
                      className={`w-full pl-10 pr-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 ${
                        errors.doctorId ? 'border-red-300' : ''
                      }`}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                          Dr. {doc.name} - {doc.specialization}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.doctorId && (
                    <p className="text-sm text-red-500">{errors.doctorId.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400 pointer-events-none z-10">
                      <FileText size={18} />
                    </div>
                    <textarea
                      {...register("reason", { required: "Reason is required" })}
                      placeholder="Describe the reason for visit"
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80 ${
                        errors.reason ? 'border-red-300' : ''
                      }`}
                    />
                  </div>
                  {errors.reason && (
                    <p className="text-sm text-red-500">{errors.reason.message}</p>
                  )}
                </div>

                <GlassInput
                  icon={Calendar}
                  label="Appointment Date"
                  type="date"
                  {...register("appointmentDate", { required: "Date is required" })}
                  error={errors.appointmentDate?.message}
                />

                <GlassInput
                  icon={Clock}
                  label="Appointment Time"
                  type="time"
                  {...register("appointmentTime", { required: "Time is required" })}
                  error={errors.appointmentTime?.message}
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-6">
              <GlassButton
                type="submit"
                variant="success"
                size="lg"
                loading={isLoading}
                className="gradient-receptionist text-white"
              >
                Create Appointment
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
};

export default CreateAppointment;