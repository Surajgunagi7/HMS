import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { Calendar, Clock, User, Mail, Phone, Stethoscope, FileText } from 'lucide-react';
import {patientService} from '../../services/patientService'
import { appointmentService } from "../../services/appointmentsService";

const CreateAppointment = () => {
  const { register, handleSubmit, formState: { errors } } = useForm({
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

  const doctors = useSelector((state) => state.doctor.doctors);
  
  const onSubmit = async (data) => {
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
        
        alert("Appointment created successfully!");
      } catch (error) {
        console.error("Error creating appointment:", error);
      }
  };

  const InputField = ({ icon: Icon, ...props }) => (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        {...register(props.name, {
          required: "This field is required",
          ...(props.name === "email" && {
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please enter a valid email"
            }
          }),
          ...(props.name === "age" && {
            min: { value: 0, message: "Age must be positive" },
            max: { value: 150, message: "Please enter a valid age" }
          })
        })}
        {...props}
        className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
          errors[props.name] ? 'border-red-300' : 'border-gray-200'
        } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
      />
      {errors[props.name] && (
        <p className="mt-1 text-sm text-red-500">{errors[props.name].message}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-8">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="border-b border-gray-200 bg-gray-50 px-8 py-4">
          <h2 className="text-xl font-semibold text-gray-900">Create New Appointment</h2>
          <p className="mt-1 text-sm text-gray-500">Fill in the information below to schedule a new appointment</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
                <div className="space-y-4">
                  <InputField icon={User} type="text" name="patientName" placeholder="Patient Name" />
                  <InputField icon={User} type="number" name="age" placeholder="Age" />
                  <InputField icon={Mail} type="email" name="email" placeholder="Email Address" />
                  <InputField icon={Phone} type="tel" name="phone" placeholder="Phone Number" />
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Appointment Details</h3>
                <div className="space-y-4">
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Stethoscope className="h-5 w-5 text-gray-400" />
                    </div>
                    <select
                      {...register("doctorId", { required: "Please select a doctor" })}
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                        errors.doctorId ? 'border-red-300' : 'border-gray-200'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    >
                      <option value="">Select Doctor</option>
                      {doctors.map((doc) => (
                        <option key={doc._id} value={doc._id}>
                          Dr. {doc.name}
                        </option>
                      ))}
                    </select>
                    {errors.doctorId && (
                      <p className="mt-1 text-sm text-red-500">{errors.doctorId.message}</p>
                    )}
                  </div>

                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      {...register("reason", { required: "This field is required" })}
                      placeholder="Reason for Visit"
                      rows="3"
                      className={`w-full pl-10 pr-4 py-3 bg-gray-50 border ${
                        errors.reason ? 'border-red-300' : 'border-gray-200'
                      } rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors`}
                    />
                    {errors.reason && (
                      <p className="mt-1 text-sm text-red-500">{errors.reason.message}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputField icon={Calendar} type="date" name="appointmentDate" />
                    <InputField icon={Clock} type="time" name="appointmentTime" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
          <div className="flex justify-end">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Create Appointment
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateAppointment;
