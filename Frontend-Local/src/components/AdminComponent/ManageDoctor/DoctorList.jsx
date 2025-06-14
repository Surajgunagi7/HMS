import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Search, User, Mail, Phone, Stethoscope, DollarSign, Eye, EyeOff } from 'lucide-react';
import { GlassCard, GlassButton, GlassInput } from '../../common';
import toast from 'react-hot-toast';
import { updateDoctorById } from '../../../store/doctorSlice';
import { doctorService } from '../../../services/adminDashboardService';

const DoctorList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loadingDoctors, setLoadingDoctors] = useState(new Set());
  const allDoctors = useSelector(state => state.doctor.doctors);
  const dispatch = useDispatch();

  useEffect(() => {
    setFilteredDoctors(
      allDoctors.filter(doctor =>
        (doctor.name?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (doctor.loginId?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
        (doctor.specialization?.toLowerCase() || '').includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, allDoctors]);

  const toggleAvailability = async (doctorId) => {
    const doctor = allDoctors.find(d => d._id === doctorId);
    if (!doctor) return;

    setLoadingDoctors(prev => new Set([...prev, doctorId]));

    const updatedDoctorData = {
      name: doctor.name,
      email: doctor.email,
      phone: doctor.phone,
      specialization: doctor.specialization,
      role: doctor.role,
      consultationFee: doctor.consultationFee,
      available: !doctor.available,
      experience: doctor.about?.experience,
      education: doctor.about?.education,
    };

    try {
      const response = await doctorService.updateDoctor(doctor._id, updatedDoctorData);
      
      const updatedDoctor = response.data;

      dispatch(updateDoctorById({
        _id: doctor._id,
        updates: {
          available: updatedDoctor.available,
          name: updatedDoctor.name,
          email: updatedDoctor.email,
          phone: updatedDoctor.phone,
          specialization: updatedDoctor.specialization,
          consultationFee: updatedDoctor.consultationFee,
          about: updatedDoctor.about,
          profilePicture: updatedDoctor.profilePicture,
          updatedAt: updatedDoctor.updatedAt
        }
      }));

      toast.success(`Dr. ${updatedDoctor.name} is now ${updatedDoctor.available ? 'available' : 'unavailable'}`);
    } catch (err) {
      console.error("Error updating doctor availability:", err);
      toast.error("Failed to update availability");
    } finally {
      setLoadingDoctors(prev => {
        const newSet = new Set(prev);
        newSet.delete(doctorId);
        return newSet;
      });
    }
  };

  return (
    <GlassCard className="animate-fadeInUp">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Doctor List</h2>
        <p className="text-gray-600">Manage doctor availability and view details</p>
      </div>

      <div className="mb-6">
        <GlassInput
          icon={Search}
          label="Search Doctors"
          type="text"
          placeholder="Search by name, ID, or specialization..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor, index) => (
          <GlassCard
            key={doctor._id}
            className={`hover-lift animate-fadeInUp animate-stagger-${(index % 3) + 1}`}
            background="glass-card"
          >
            <div className="text-center mb-4">
              <div className="w-20 h-20 mx-auto mb-3 rounded-full border-4 border-blue-100 overflow-hidden bg-gray-100 flex items-center justify-center">
                {doctor.profilePicture ? (
                  <img
                    src={doctor.profilePicture}
                    alt={doctor.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-10 h-10 text-gray-400" />
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-800">{doctor.name}</h3>
              <p className="text-sm text-gray-500 mb-2">ID: {doctor.loginId}</p>

              <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                doctor.available
                  ? 'bg-green-100 text-green-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {doctor.available ? 'Available' : 'Unavailable'}
              </div>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Mail className="w-4 h-4 mr-2 text-gray-400" />
                <span className="truncate">{doctor.email}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Phone className="w-4 h-4 mr-2 text-gray-400" />
                <span>{doctor.phone}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <Stethoscope className="w-4 h-4 mr-2 text-gray-400" />
                <span>{doctor.specialization}</span>
              </div>

              <div className="flex items-center text-sm text-gray-600">
                <DollarSign className="w-4 h-4 mr-2 text-gray-400" />
                <span>₹{doctor.consultationFee}</span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mb-4">
              <p><strong>Experience:</strong> {doctor.about?.experience || 'N/A'}</p>
              <p><strong>Education:</strong> {doctor.about?.education || 'N/A'}</p>
            </div>

            <GlassButton
              onClick={() => toggleAvailability(doctor._id)}
              variant={doctor.available ? "danger" : "success"}
              size="sm"
              disabled={loadingDoctors.has(doctor._id)}
              className={`w-full ${
                doctor.available
                  ? 'bg-red-500 text-white hover:bg-red-600'
                  : 'bg-green-500 text-white hover:bg-green-600'
              } ${loadingDoctors.has(doctor._id) ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {loadingDoctors.has(doctor._id) ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Updating...
                </>
              ) : doctor.available ? (
                <>
                  <EyeOff size={16} />
                  Mark Unavailable
                </>
              ) : (
                <>
                  <Eye size={16} />
                  Mark Available
                </>
              )}
            </GlassButton>
          </GlassCard>
        ))}
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-8">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 text-lg">No doctors found</p>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}
    </GlassCard>
  );
};

export default DoctorList;