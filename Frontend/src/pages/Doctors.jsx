import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, Calendar, MapPin, X, Phone, Mail, Award, Clock, Users } from 'lucide-react';
import { fetchDoctors, setSearchTerm, setSelectedSpecialization } from '../store/slices/doctorSlice';
import { setSelectedDoctor } from '../store/slices/appointmentSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const Doctors = () => {
  const dispatch = useDispatch();
  const {
    filteredDoctors,
    specializations,
    searchTerm,
    selectedSpecialization,
    loading,
    error
  } = useSelector((state) => state.doctors);

  const [selectedDoctorDetail, setSelectedDoctorDetail] = useState(null);

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const handleBookAppointment = (doctor) => {
    dispatch(setSelectedDoctor(doctor));
    setSelectedDoctorDetail(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="lg" />
          <p className="mt-4 text-gray-600">Loading our amazing doctors...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center liquid-glass-popup p-8 rounded-2xl">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <button
            onClick={() => dispatch(fetchDoctors())}
            className="btn-liquid text-white px-6 py-3 rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 liquid-glass-blue rounded-full text-sm font-medium mb-6 text-blue-700">
            <Users className="h-4 w-4 mr-2" />
            Meet Our Team
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
            Our Expert
            <span className="gradient-text block">
              Medical Team
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet our team of experienced healthcare professionals dedicated to providing you with exceptional medical care.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="liquid-glass-strong p-6 rounded-2xl">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search doctors by name or specialization..."
                  value={searchTerm}
                  onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                  className="w-full pl-12 pr-4 py-4 input-liquid rounded-xl placeholder-gray-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <select
                  value={selectedSpecialization}
                  onChange={(e) => dispatch(setSelectedSpecialization(e.target.value))}
                  className="pl-12 pr-8 py-4 input-liquid rounded-xl min-w-[200px] appearance-none cursor-pointer"
                >
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec === 'All' ? 'All Specializations' : spec}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-8">
          <div className="liquid-glass px-6 py-3 rounded-xl inline-block">
            <p className="text-gray-700 font-medium">
              Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
              {searchTerm && ` for "${searchTerm}"`}
              {selectedSpecialization !== 'All' && ` in ${selectedSpecialization}`}
            </p>
          </div>
        </div>

        {/* Doctors Grid */}
        {filteredDoctors.length === 0 ? (
          <div className="text-center py-16">
            <div className="liquid-glass-popup p-12 rounded-2xl max-w-md mx-auto">
              <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="h-10 w-10 text-white" />
              </div>
              <p className="text-gray-600 text-lg mb-6">No doctors found matching your criteria.</p>
              <button
                onClick={() => {
                  dispatch(setSearchTerm(''));
                  dispatch(setSelectedSpecialization('All'));
                }}
                className="btn-liquid text-white px-6 py-3 rounded-xl font-medium"
              >
                Clear filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <div
                key={doctor.id}
                className="group relative card-liquid"
              >
                <div className="liquid-glass-blue rounded-2xl overflow-hidden smooth-hover">
                  <div className="relative overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      className="w-full h-64 object-cover smooth-transition group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 smooth-transition"></div>
                    <div className="absolute top-4 right-4 liquid-glass px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-white">{doctor.rating}</span>
                    </div>
                    <button
                      onClick={() => setSelectedDoctorDetail(doctor)}
                      className="absolute bottom-4 left-4 right-4 liquid-glass text-white py-2 px-4 rounded-lg opacity-0 group-hover:opacity-100 smooth-transition hover:bg-white/30 font-medium"
                    >
                      View Details
                    </button>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 smooth-transition">
                      {doctor.name}
                    </h3>
                    <p className="text-blue-600 font-semibold mb-2">{doctor.specialization}</p>
                    <p className="text-gray-600 text-sm mb-4 flex items-center">
                      <Award className="h-4 w-4 mr-1" />
                      {doctor.experience} Experience
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-6">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{doctor.availability}</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-gray-900">{doctor.consultationFee}</span>
                      <Link
                        to="/appointment"
                        onClick={() => handleBookAppointment(doctor)}
                        className="btn-liquid text-white px-6 py-2 rounded-xl flex items-center space-x-2 font-medium"
                      >
                        <Calendar className="h-4 w-4" />
                        <span>Book Now</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Doctor Detail Modal */}
      {selectedDoctorDetail && (
        <div
          className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedDoctorDetail(null)}
        >
          <div
            className="liquid-glass-popup max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-3xl smooth-transition"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Header */}
              <div className="relative h-64 overflow-hidden rounded-t-3xl">
                <img
                  src={selectedDoctorDetail.image}
                  alt={selectedDoctorDetail.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <button
                  onClick={() => setSelectedDoctorDetail(null)}
                  className="absolute top-6 right-6 w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white hover:bg-white/30 smooth-transition"
                >
                  <X className="h-5 w-5" />
                </button>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="liquid-glass px-3 py-1 rounded-full flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-medium text-white">{selectedDoctorDetail.rating}</span>
                    </div>
                    <div className="liquid-glass px-3 py-1 rounded-full">
                      <span className="text-sm font-medium text-white">{selectedDoctorDetail.availability}</span>
                    </div>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">{selectedDoctorDetail.name}</h2>
                  <p className="text-blue-200 text-lg font-semibold">{selectedDoctorDetail.specialization}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Info */}
                  <div className="lg:col-span-2 space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">About Dr. {selectedDoctorDetail.name.split(' ').pop()}</h3>
                      <p className="text-gray-600 leading-relaxed">
                        Dr. {selectedDoctorDetail.name.split(' ').pop()} is a highly experienced {selectedDoctorDetail.specialization.toLowerCase()} specialist with {selectedDoctorDetail.experience} of dedicated service in the medical field. Known for providing compassionate care and utilizing the latest medical technologies to ensure the best outcomes for patients.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Specializations & Expertise</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="liquid-glass p-4 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                              <Award className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Experience</p>
                              <p className="text-sm text-gray-600">{selectedDoctorDetail.experience}</p>
                            </div>
                          </div>
                        </div>
                        <div className="liquid-glass p-4 rounded-xl">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-lg flex items-center justify-center">
                              <Users className="h-5 w-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Patients Treated</p>
                              <p className="text-sm text-gray-600">1000+ Happy Patients</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-4">Available Services</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {['Consultation', 'Diagnosis', 'Treatment Planning', 'Follow-up Care', 'Emergency Care', 'Preventive Care'].map((service, index) => (
                          <div key={index} className="flex items-center space-x-3 liquid-glass p-3 rounded-lg">
                            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                            <span className="text-gray-700">{service}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Consultation Fee */}
                    <div className="liquid-glass-blue p-6 rounded-2xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Consultation Fee</h3>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{selectedDoctorDetail.consultationFee}</div>
                        <p className="text-sm text-gray-600">Per consultation</p>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="liquid-glass p-6 rounded-2xl">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">Phone</p>
                            <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-sm text-gray-600">doctor@medicare.com</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Clock className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">Availability</p>
                            <p className="text-sm text-gray-600">{selectedDoctorDetail.availability}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Book Appointment Button */}
                    <Link
                      to="/appointment"
                      onClick={() => {
                        handleBookAppointment(selectedDoctorDetail);
                        setSelectedDoctorDetail(null);
                      }}
                      className="w-full btn-liquid text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2"
                    >
                      <Calendar className="h-5 w-5" />
                      <span>Book Appointment</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Doctors;