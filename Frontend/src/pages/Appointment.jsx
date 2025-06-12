import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Calendar, Clock, User, Phone, Mail, FileText, CheckCircle, AlertCircle, X,BookUser } from 'lucide-react';
import { bookAppointment, clearAppointmentMessages } from '../store/slices/appointmentSlice';
import { fetchDoctors } from '../store/slices/doctorSlice';

const Appointment = () => {
  const dispatch = useDispatch();
  const { 
    selectedDoctor, 
    loading, 
    error, 
    successMessage, 
    currentAppointment 
  } = useSelector((state) => state.appointments);
  const { doctors } = useSelector((state) => state.doctors);
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  useEffect(() => {
    dispatch(fetchDoctors());
    setShowModal(true);
    return () => {
      dispatch(clearAppointmentMessages());
    };
  }, [dispatch]);

  useEffect(() => {
    if (selectedDoctor) {
      setValue('doctor', selectedDoctor._id);
    }
  }, [selectedDoctor, setValue]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      reset();
    }
  }, [successMessage, reset]);

  const onSubmit = (data) => {
    const selectedDoc = doctors.find(d => d._id === data.doctor);
    const appointmentData = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      age: data.age,
      doctor: data.doctor,
      date: data.date,
      time: data.time,
      reason: data.reason,
      doctorName: selectedDoc ? selectedDoc.name : '',
    };
    
    dispatch(bookAppointment(appointmentData));
    
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      window.history.back();
    }, 300);
  };

  if (showSuccess && currentAppointment) {
    return (
      <>
        {showModal && (
          <div className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4">
            <div className="liquid-glass-popup max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl smooth-transition">
              <div className="relative p-8 text-center">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-gray-600 hover:bg-white/30 smooth-transition"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-12 w-12 text-white" />
                </div>
                
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Appointment Confirmed!
                </h1>
                
                <p className="text-gray-600 mb-8">
                  Your appointment has been successfully booked. We&apos;ll send you a confirmation email shortly.
                </p>
                
                <div className="liquid-glass-blue rounded-2xl p-6 mb-8 text-left">
                  <h3 className="font-semibold text-gray-900 mb-4 text-center">Appointment Details:</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Patient:</span>
                      <span className="text-gray-900">{currentAppointment.name}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Doctor:</span>
                      <span className="text-gray-900">{currentAppointment.doctorName}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Date:</span>
                      <span className="text-gray-900">{new Date(currentAppointment.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-700">Time:</span>
                      <span className="text-gray-900">{currentAppointment.time}</span>
                    </div>
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-gray-700">Reason:</span>
                      <span className="text-gray-900 text-right max-w-xs">{currentAppointment.reason}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="btn-liquid text-white px-6 py-3 rounded-xl font-medium"
                  >
                    Book Another Appointment
                  </button>
                  <button
                    onClick={() => window.print()}
                    className="btn-liquid-secondary px-6 py-3 rounded-xl font-medium"
                  >
                    Print Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }

  return (
    <>
      {showModal && (
        <div
          className="fixed inset-0 modal-backdrop z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="liquid-glass-popup max-w-6xl w-full max-h-[95vh] overflow-y-auto rounded-3xl smooth-transition"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-blue-500 to-cyan-500 p-8 rounded-t-3xl">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white hover:bg-white/30 smooth-transition"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="text-center text-white">
                  <div className="inline-flex items-center px-4 py-2 liquid-glass rounded-full text-sm font-medium mb-4">
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Your Appointment
                  </div>
                  <h1 className="text-4xl font-bold mb-4">Schedule Your Visit</h1>
                  <p className="text-xl text-blue-100">
                    Book a consultation with our expert healthcare professionals
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form */}
                  <div className="lg:col-span-2">
                    <div className="liquid-glass-blue rounded-2xl p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Appointment Information</h2>
                      
                      {error && (
                        <div className="bg-red-50/80 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2" />
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Personal Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <User className="h-4 w-4 mr-2" />
                              Full Name
                            </label>
                            <input
                              type="text"
                              {...register('name', { required: 'Name is required' })}
                              className="w-full px-4 py-3 input-liquid rounded-xl"
                              placeholder="Enter your full name"
                            />
                            {errors.name && (
                              <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <Phone className="h-4 w-4 mr-2" />
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              {...register('phone', { 
                                required: 'Phone number is required',
                                pattern: {
                                  value: /^[0-9+\-\s()]+$/,
                                  message: 'Please enter a valid phone number'
                                }
                              })}
                              className="w-full px-4 py-3 input-liquid rounded-xl"
                              placeholder="Enter your phone number"
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                            <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <BookUser className="h-4 w-4 mr-2" />
                              Age
                            </label>
                            <input
                              type="number"
                              {...register('age', { 
                                required: 'Age is required',
                                pattern: {
                                  value: /^[0-9+\-\s()]+$/,
                                  message: 'Please enter a valid Age'
                                }
                              })}
                              className="w-full px-4 py-3 input-liquid rounded-xl"
                              placeholder="Enter your Age"
                            />
                            {errors.age && (
                              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
                            )}
                        </div>
                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <Mail className="h-4 w-4 mr-2" />
                            Email Address
                          </label>
                          <input
                            type="email"
                            {...register('email', { 
                              required: 'Email is required',
                              pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: 'Please enter a valid email address'
                              }
                            })}
                            className="w-full px-4 py-3 input-liquid rounded-xl"
                            placeholder="Enter your email address"
                          />
                          {errors.email && (
                            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                          )}
                        </div>
                        </div>
                        {/* Appointment Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <Calendar className="h-4 w-4 mr-2" />
                              Preferred Date
                            </label>
                            <input
                              type="date"
                              {...register('date', { required: 'Date is required' })}
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-4 py-3 input-liquid rounded-xl"
                            />
                            {errors.date && (
                              <p className="mt-1 text-sm text-red-600">{errors.date.message}</p>
                            )}
                          </div>

                          <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                              <Clock className="h-4 w-4 mr-2" />
                              Preferred Time
                            </label>
                            <input
                              type="time"
                              {...register('time', { required: 'Time is required' })}
                              className="w-full px-4 py-3 input-liquid rounded-xl"
                            />
                            {errors.time && (
                              <p className="mt-1 text-sm text-red-600">{errors.time.message}</p>
                            )}
                          </div>
                        </div>

                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <User className="h-4 w-4 mr-2" />
                            Select Doctor
                          </label>
                          <select
                            {...register('doctor', { required: 'Please select a doctor' })}
                            className="w-full px-4 py-3 input-liquid rounded-xl appearance-none cursor-pointer"
                          >
                            <option value="">Choose a doctor</option>
                            {doctors.map((doctor) => (
                              <option key={doctor._id} value={doctor._id}>
                                {doctor.name} - {doctor.specialization}
                              </option>
                            ))}
                          </select>
                          {errors.doctor && (
                            <p className="mt-1 text-sm text-red-600">{errors.doctor.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FileText className="h-4 w-4 mr-2" />
                            Reason for Visit
                          </label>
                          <textarea
                            {...register('reason', { required: 'Please describe your reason for visit' })}
                            rows={4}
                            className="w-full px-4 py-3 input-liquid rounded-xl resize-none"
                            placeholder="Please describe your symptoms or reason for the appointment..."
                          />
                          {errors.reason && (
                            <p className="mt-1 text-sm text-red-600">{errors.reason.message}</p>
                          )}
                        </div>

                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full btn-liquid text-white py-4 px-6 rounded-xl font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <div className="spinner-liquid h-5 w-5"></div>
                          ) : (
                            <>
                              <Calendar className="h-5 w-5" />
                              <span>Book Appointment</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Selected Doctor */}
                    {selectedDoctor && (
                      <div className="liquid-glass-blue rounded-2xl p-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Selected Doctor</h3>
                        <div className="flex items-center space-x-4">
                          <img
                            src={selectedDoctor.image}
                            alt={selectedDoctor.name}
                            className="h-16 w-16 rounded-full object-cover ring-2 ring-white/50"
                          />
                          <div>
                            <p className="font-semibold text-gray-900">{selectedDoctor.name}</p>
                            <p className="text-blue-600">{selectedDoctor.specialization}</p>
                            <p className="text-sm text-gray-500">{selectedDoctor.experience}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Contact Info */}
                    <div className="liquid-glass rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">Call Us</p>
                            <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-sm text-gray-600">appointments@medicare.com</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Important Notes */}
                    <div className="liquid-glass-blue rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Important Notes</h3>
                      <ul className="space-y-2 text-sm text-blue-800">
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          Please arrive 15 minutes early
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          Bring your insurance card and ID
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          Bring a list of current medications
                        </li>
                        <li className="flex items-start">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                          Consultation fee is payable at visit
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Appointment;