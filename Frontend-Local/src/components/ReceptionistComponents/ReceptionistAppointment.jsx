import { useEffect, useState } from 'react';
import { Calendar, Clock, Search, CheckCircle, XCircle, User } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { appointmentService } from '../../services/appointmentsService';
import { setAppointments, updateAppointmentStatus } from '../../store/appointmentSlice';
import { GlassCard, GlassButton, GlassInput } from '../common';
import toast from 'react-hot-toast';

const ReceptionistAppointment = () => {
  const dispatch = useDispatch();
  const appointments = useSelector(state => state.appointment.list);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await appointmentService.getAppointments();
        dispatch(setAppointments(response.data));
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        toast.error("Failed to load appointments");
      }
    };
    fetchAppointments();
  }, [dispatch]);

  const handleUpdateAppointment = async (id, status) => {
    try {
      await appointmentService.updateAppointment(id, { status });
      dispatch(updateAppointmentStatus({ id, status }));
      toast.success(`Appointment ${status.toLowerCase()} successfully!`);
    } catch (err) {
      console.error(`Failed to ${status.toLowerCase()} appointment:`, err);
      toast.error(`Failed to ${status.toLowerCase()} appointment`);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    // Add null/undefined checks to prevent crashes
    const patientName = appointment?.patient?.name || '';
    const patientId = appointment?.patientId || '';
    
    const matchesSearch = patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patientId.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: appointments.length,
    pending: appointments.filter(a => a.status === 'pending').length,
    confirmed: appointments.filter(a => a.status === 'confirmed').length,
    cancelled: appointments.filter(a => a.status === 'cancelled').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-receptionist opacity-5"></div>
      
      <div className="relative z-10 p-6">
        {/* Header */}
        <GlassCard className="mb-6 animate-fadeInUp">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Manage Appointments</h3>
              <p className="text-gray-600">View and manage all patient appointments</p>
            </div>
            
            {/* Status Summary */}
            <div className="flex gap-4 mt-4 md:mt-0">
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-600">{statusCounts.all}</div>
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
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="md:w-48">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80"
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
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{appointment?.patient?.name || 'Unknown Patient'}</h4>
                        <p className="text-sm text-gray-500">ID: {appointment?.patient?.patientId || appointment?.patientId || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-emerald-500" />
                        {appointment?.dateTime ? new Date(appointment.dateTime).toLocaleDateString() : 'N/A'}
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2 text-emerald-500" />
                        {appointment?.dateTime ? new Date(appointment.dateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'N/A'}
                      </div>
                      <div className="flex items-center">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(appointment?.status)}`}>
                          {appointment?.status || 'unknown'}
                        </span>
                      </div>
                    </div>

                    {appointment?.reason && (
                      <div className="bg-gray-50 rounded-lg p-3 mb-4">
                        <p className="text-sm text-gray-700">
                          <strong>Reason:</strong> {appointment.reason}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4 lg:mt-0 lg:ml-6">
                    {appointment?.status === "pending" && (
                      <>
                        <GlassButton
                          onClick={() => handleUpdateAppointment(appointment._id, "confirmed")}
                          variant="success"
                          size="sm"
                          className="bg-green-500 text-white hover:bg-green-600"
                        >
                          <CheckCircle size={16} />
                          Confirm
                        </GlassButton>
                        <GlassButton
                          onClick={() => handleUpdateAppointment(appointment._id, "cancelled")}
                          variant="danger"
                          size="sm"
                          className="bg-red-500 text-white hover:bg-red-600"
                        >
                          <XCircle size={16} />
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

export default ReceptionistAppointment;