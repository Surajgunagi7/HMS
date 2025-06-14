import { useState } from "react";
import { Search, Clock, Check, X, User, Calendar, Filter } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { updateAppointmentStatus } from "../../store/appointmentSlice";
import { appointmentService } from "../../services/appointmentsService";
import { GlassCard, GlassButton, GlassInput } from "../common";
import toast from 'react-hot-toast';

const Appointments = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const dispatch = useDispatch();

  const doctor = useSelector((state) => state.doctor.doctors);
  const appointments = useSelector((state) => state.appointment.list);

  const myAppointments = appointments.filter(
    (appt) => appt.doctor?._id === doctor?._id
  );
  
  const filteredAppointments = myAppointments.filter((appointment) => {
    const matchesSearch = (appointment.patient?.name || "").toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = async (id, newStatus) => {
    try {
      await appointmentService.updateAppointment(id, { status: newStatus });
      dispatch(updateAppointmentStatus({ id, status: newStatus }));
      toast.success(`Appointment ${newStatus.toLowerCase()} successfully!`);
    } catch (err) {
      console.error("Failed to update status:", err);
      toast.error("Failed to update appointment status");
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "confirmed":
        return "bg-green-100 text-green-800 border-green-200";
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const statusCounts = {
    all: myAppointments.length,
    pending: myAppointments.filter(a => a.status === 'pending').length,
    confirmed: myAppointments.filter(a => a.status === 'confirmed').length,
    cancelled: myAppointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-doctor opacity-5"></div>
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <GlassCard className="mb-6 animate-fadeInUp">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">My Appointments</h2>
              <p className="text-gray-600">Manage your patient appointments</p>
            </div>
            
            {/* Status Summary */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{statusCounts.all}</div>
                <div className="text-xs text-gray-500">Total</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{statusCounts.pending}</div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{statusCounts.confirmed}</div>
                <div className="text-xs text-gray-500">Confirmed</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <GlassInput
                icon={Search}
                placeholder="Search patients..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 input-glass rounded-xl border border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500/80"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <GlassCard className="text-center py-12 animate-fadeInUp">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No appointments found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria</p>
            </GlassCard>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <GlassCard 
                key={appointment._id} 
                className={`hover-lift animate-fadeInUp animate-stagger-${(index % 3) + 1}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">
                          {appointment.patient?.name || "Unknown Patient"}
                        </h3>
                        <p className="text-sm text-gray-500">Patient ID: {appointment.patient?.patientId}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar size={16} className="mr-2 text-cyan-500" />
                        <span>{new Date(appointment.dateTime).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock size={16} className="mr-2 text-cyan-500" />
                        <span>{new Date(appointment.dateTime).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}</span>
                      </div>
                      <div className="flex items-center">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(
                            appointment.status
                          )}`}
                        >
                          {appointment.status.charAt(0).toUpperCase() +
                            appointment.status.slice(1)}
                        </span>
                      </div>
                    </div>

                    {appointment.reason && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">
                          <strong>Reason:</strong> {appointment.reason}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 lg:mt-0 lg:ml-6">
                    {appointment.status === "pending" && (
                      <>
                        <GlassButton
                          onClick={() => handleStatusChange(appointment._id, "confirmed")}
                          variant="success"
                          size="sm"
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          <Check size={16} />
                          Confirm
                        </GlassButton>
                        <GlassButton
                          onClick={() => handleStatusChange(appointment._id, "cancelled")}
                          variant="danger"
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          <X size={16} />
                          Cancel
                        </GlassButton>
                      </>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointments;