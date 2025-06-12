import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Phone, User, Mail, FileText, CheckCircle, AlertCircle, Clock, X } from 'lucide-react';
import { requestCallback, clearCallbackMessages } from '../store/slices/callbackSlice';
import LoadingSpinner from '../components/UI/LoadingSpinner';

const RequestCall = () => {
  const dispatch = useDispatch();
  const { loading, error, successMessage } = useSelector((state) => state.callbacks);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm();

  useEffect(() => {
    setShowModal(true);
    return () => {
      dispatch(clearCallbackMessages());
    };
  }, [dispatch]);

  useEffect(() => {
    if (successMessage) {
      setShowSuccess(true);
      reset();
    }
  }, [successMessage, reset]);

  const onSubmit = (data) => {
    dispatch(requestCallback(data));
  };

  const closeModal = () => {
    setShowModal(false);
    setTimeout(() => {
      window.history.back();
    }, 300);
  };

  if (showSuccess) {
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
                  Request Submitted!
                </h1>
                
                <p className="text-gray-600 mb-8">
                  We'll get back to you shortly. Our team will contact you within 24 hours during business hours.
                </p>
                
                <div className="liquid-glass-blue rounded-2xl p-6 mb-8">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="h-6 w-6 text-blue-600 mr-2" />
                    <span className="font-semibold text-blue-900">Expected Response Time</span>
                  </div>
                  <p className="text-blue-800">
                    Monday - Friday: Within 2-4 hours<br />
                    Weekends: Within 24 hours
                  </p>
                </div>
                
                <button
                  onClick={() => setShowSuccess(false)}
                  className="btn-liquid text-white px-6 py-3 rounded-xl font-medium"
                >
                  Submit Another Request
                </button>
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
            className="liquid-glass-popup max-w-5xl w-full max-h-[95vh] overflow-y-auto rounded-3xl smooth-transition"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 p-8 rounded-t-3xl">
                <button
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-white hover:bg-white/30 smooth-transition"
                >
                  <X className="h-5 w-5" />
                </button>
                
                <div className="text-center text-white">
                  <div className="inline-flex items-center px-4 py-2 liquid-glass rounded-full text-sm font-medium mb-4">
                    <Phone className="h-4 w-4 mr-2" />
                    Request a Callback
                  </div>
                  <h1 className="text-4xl font-bold mb-4">We'll Call You Back</h1>
                  <p className="text-xl text-cyan-100">
                    Can't find time to call? Let us call you back at your convenience
                  </p>
                </div>
              </div>

              <div className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Form */}
                  <div className="lg:col-span-2">
                    <div className="liquid-glass-blue rounded-2xl p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Callback Information</h2>
                      
                      {error && (
                        <div className="bg-red-50/80 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-center">
                          <AlertCircle className="h-5 w-5 mr-2" />
                          {error}
                        </div>
                      )}

                      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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

                        <div>
                          <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                            <FileText className="h-4 w-4 mr-2" />
                            Reason for Callback
                          </label>
                          <textarea
                            {...register('reason', { required: 'Please describe your reason for callback' })}
                            rows={5}
                            className="w-full px-4 py-3 input-liquid rounded-xl resize-none"
                            placeholder="Please describe what you'd like to discuss during the callback..."
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
                              <Phone className="h-5 w-5" />
                              <span>Request Callback</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Response Times */}
                    <div className="liquid-glass rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Response Times</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Monday - Friday</span>
                          <span className="text-sm font-medium text-blue-600">2-4 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Weekends</span>
                          <span className="text-sm font-medium text-blue-600">Within 24 hours</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">Emergency</span>
                          <span className="text-sm font-medium text-red-600">Call immediately</span>
                        </div>
                      </div>
                    </div>

                    {/* Emergency Contact */}
                    <div className="liquid-glass rounded-2xl p-6 bg-gradient-to-br from-red-50/50 to-orange-50/50">
                      <h3 className="text-lg font-semibold text-red-900 mb-4">Emergency?</h3>
                      <p className="text-sm text-red-800 mb-4">
                        If this is a medical emergency, please don't wait for a callback.
                      </p>
                      <a
                        href="tel:911"
                        className="block w-full bg-gradient-to-r from-red-600 to-red-700 text-white text-center py-3 rounded-xl hover:from-red-700 hover:to-red-800 smooth-transition font-semibold mb-3"
                      >
                        Call 911 Now
                      </a>
                      <a
                        href="tel:+1234567890"
                        className="block w-full liquid-glass border border-red-300 text-red-700 text-center py-3 rounded-xl hover:bg-red-50/50 smooth-transition font-semibold"
                      >
                        Hospital Emergency: +1 (555) 123-4567
                      </a>
                    </div>

                    {/* Contact Options */}
                    <div className="liquid-glass rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Other Ways to Contact</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <Phone className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">Direct Call</p>
                            <p className="text-sm text-gray-600">+1 (555) 123-4567</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <Mail className="h-5 w-5 text-blue-500" />
                          <div>
                            <p className="font-medium text-gray-900">Email</p>
                            <p className="text-sm text-gray-600">info@medicare.com</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Operating Hours */}
                    <div className="liquid-glass-blue rounded-2xl p-6">
                      <h3 className="text-lg font-semibold text-blue-900 mb-4">Operating Hours</h3>
                      <div className="space-y-2 text-sm text-blue-800">
                        <div className="flex justify-between">
                          <span>Monday - Friday</span>
                          <span>8:00 AM - 8:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Saturday</span>
                          <span>9:00 AM - 5:00 PM</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Sunday</span>
                          <span>10:00 AM - 4:00 PM</span>
                        </div>
                        <div className="flex justify-between font-medium">
                          <span>Emergency</span>
                          <span>24/7</span>
                        </div>
                      </div>
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

export default RequestCall;