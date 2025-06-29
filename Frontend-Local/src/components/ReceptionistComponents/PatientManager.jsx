import { useState } from 'react';
import { Search, UserPlus, Pencil, Save, Phone, Mail, Info, Calendar, HeartPulse, AlertCircle, User, Activity, Clock, Plus } from 'lucide-react';
import { patientService } from '../../services/patientService';
import { GlassCard, GlassButton, GlassInput } from '../common';
import toast from 'react-hot-toast';

const initialForm = {
  name: '',
  phone: '',
  age: '',
  email: '',
  gender: 'other',
  medicalHistory: '',
  emergencyContact: {
    name: '',
    phone: ''
  }
};

const initialVisitForm = {
  visitType: 'appointment',
  amount: '',
  paymentStatus: 'paid',
  notes: ''
};

const PatientManager = () => {
  const [phone, setPhone] = useState('');
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [visitForm, setVisitForm] = useState(initialVisitForm);
  const [notFound, setNotFound] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [pendingPayments, setPendingPayments] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedVisit, setSelectedVisit] = useState(null);
  const [paymentForm, setPaymentForm] = useState({
    amountPaid: '',
    paymentMethod: 'cash',
    paymentDate: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const response = await patientService.searchPatientByIdOrPhone({ phone: phone.trim() });

      if (response?.data[0]) {
        const data = response.data[0];
        setPatient(data);
        setFormData({
          ...data,
          emergencyContact: {
            name: data.emergencyContact?.name || '',
            phone: data.emergencyContact?.phone || ''
          }
        });
        
        await fetchPendingPayments(data._id);
        
        setNotFound(false);
        setShowRegisterForm(false);
        setEditMode(false);
        setShowVisitForm(false);
        toast.success('Patient found successfully!');
      } else {
        console.log("Patient not found");
        setNotFound(true);
        setShowRegisterForm(true);
        setPatient(null);
        setFormData({ ...initialForm, phone });
        setPendingPayments([]);
        toast.error('Patient not found. Please register them.');
      }
    } catch (err) {
      console.error(err);
      toast.error('Error searching for patient');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('emergencyContact.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleVisitChange = (e) => {
    const { name, value } = e.target;
    setVisitForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    setIsLoading(true);
    try {
      const updated = await patientService.updatePatient(patient._id, formData);
      if (updated?.data) {
        setPatient(null);
        setFormData(initialForm);
        setEditMode(false);
        setShowRegisterForm(false);
        setNotFound(false);
        toast.success('Patient updated successfully!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to update patient');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async () => {
    setIsLoading(true);
    try {
      const response = await patientService.createOrFindPatient(formData);
      if (response?.data) {
        setPatient(null);
        setFormData(initialForm);
        setShowRegisterForm(false);
        setNotFound(false);
        setPhone('');
        toast.success('Patient registered successfully!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to register patient');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddVisit = async () => {
    if (!visitForm.amount || parseFloat(visitForm.amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    setIsLoading(true);
    try {
      const visitData = {
        ...visitForm,
        amount: parseFloat(visitForm.amount),
        visitDate: new Date()
      };

      const response = await patientService.addVisit(patient._id, visitData);
      
      if (response?.data) {
        setPatient(response.data);
        setVisitForm(initialVisitForm);
        setShowVisitForm(false);
        toast.success('Visit added successfully!');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to add visit');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPendingPayments = async (patientId) => {
    try {
      const response = await patientService.getPendingPayments(patientId);
      
      if (response?.data?.data?.pendingVisits) {
        setPendingPayments(response.data.data.pendingVisits);
      } else {
        setPendingPayments([]);
      }
    } catch (err) {
      console.error('Error fetching pending payments:', err);
      setPendingPayments([]);
      toast.error('Failed to fetch pending payments');
    }
  };

  const handlePaymentFormChange = (e) => {
    const { name, value } = e.target;
    setPaymentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleRecordPayment = async () => {
    if (!paymentForm.amountPaid || parseFloat(paymentForm.amountPaid) <= 0) {
      toast.error('Please enter a valid payment amount');
      return;
    }

    setIsLoading(true);
    try {
      const response = await patientService.recordPayment(
        patient._id, 
        selectedVisit._id, 
        paymentForm
      );
      console.log("Payment response:", response);
      
      if (response?.data) {
        await fetchPendingPayments(patient._id);
        
        setPaymentForm({
          amountPaid: '',
          paymentMethod: 'cash',
          paymentDate: new Date().toISOString().split('T')[0],
          notes: ''
        });
        setShowPaymentModal(false);
        setSelectedVisit(null);
        
        toast.success('Payment recorded successfully!');
      }
    } catch (err) {
      console.error('Error recording payment:', err);
      toast.error('Failed to record payment');
    } finally {
      setIsLoading(false);
    }
  };

  const openPaymentModal = (visit) => {
    setSelectedVisit(visit);
    setPaymentForm({
      amountPaid: '',
      paymentMethod: 'cash',
      paymentDate: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowPaymentModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 relative">
      {/* Background */}
      <div className="absolute inset-0 gradient-receptionist opacity-5"></div>
      
      <div className="relative z-10 p-6">
        <GlassCard className="max-w-4xl mx-auto animate-fadeInUp">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">Patient Management</h2>
            <p className="text-gray-600">Search, register, and manage patient information</p>
          </div>

          {/* Search Section */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <GlassInput
                  icon={Search}
                  label="Search Patient"
                  type="text"
                  placeholder="Enter phone number to search"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="flex gap-2 items-end">
                <GlassButton
                  onClick={handleSearch}
                  loading={isLoading}
                  className="gradient-receptionist text-white hover:text-black"
                  disabled={!phone.trim()}
                >
                  <Search size={18} />
                  Search
                </GlassButton>
                <GlassButton
                  onClick={() => {
                    setFormData(initialForm);
                    setPatient(null);
                    setEditMode(false);
                    setShowRegisterForm(true);
                    setNotFound(false);
                    setShowVisitForm(false);
                  }}
                  variant="success"
                  className="bg-green-500 text-white"
                >
                  <UserPlus size={18} />
                  Register
                </GlassButton>
              </div>
            </div>

            {notFound && (
              <div className="mt-4 flex items-center gap-2 text-red-600 font-medium">
                <AlertCircle size={20} />
                Patient not found. Please register them below.
              </div>
            )}
          </div>

          {/* Patient Details View */}
          {patient && !editMode && !showVisitForm && (
            <GlassCard className="mb-6 animate-fadeInUp animate-stagger-2" background="glass">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-emerald-600" />
                  Patient Details
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
                <InfoRow icon={<Info />} label="Patient ID" value={patient.patientId} />
                <InfoRow icon={<User />} label="Name" value={patient.name} />
                <InfoRow icon={<Phone />} label="Phone" value={patient.phone} />
                <InfoRow icon={<Mail />} label="Email" value={patient.email} />
                <InfoRow icon={<Calendar />} label="Age" value={patient.age} />
                <InfoRow icon={<Info />} label="Gender" value={patient.gender} />
              </div>

              {/* Visit Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 rounded-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Activity className="w-5 h-5 text-emerald-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">Total Visits</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-600">{patient.totalVisits || 0}</span>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-purple-600 mr-2" />
                    <span className="text-sm font-medium text-gray-600">Last Visit</span>
                  </div>
                  <span className="text-sm font-semibold text-purple-600">
                    {patient.lastVisit ? new Date(patient.lastVisit).toLocaleDateString() : 'No visits'}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InfoRow 
                  icon={<HeartPulse />} 
                  label="Medical History" 
                  value={patient.medicalHistory || 'No medical history recorded'} 
                />
                <InfoRow
                  icon={<Phone />}
                  label="Emergency Contact"
                  value={`${patient.emergencyContact?.name || 'Not provided'} - ${patient.emergencyContact?.phone || 'Not provided'}`}
                />
              </div>

              <div className="flex gap-3">
                <GlassButton
                  onClick={() => {
                    setEditMode(true);
                    setFormData({
                      ...patient,
                      emergencyContact: {
                        name: patient.emergencyContact?.name || '',
                        phone: patient.emergencyContact?.phone || ''
                      }
                    });
                  }}
                  variant="warning"
                  className="bg-yellow-500 text-white"
                >
                  <Pencil size={18} />
                  Edit Patient
                </GlassButton>
                <GlassButton
                  onClick={() => setShowVisitForm(true)}
                  variant="success"
                  className="bg-emerald-500 text-white"
                >
                  <Plus size={18} />
                  Add Visit
                </GlassButton>
              </div>
            </GlassCard>
          )}

          {/* Pending Payments Section */}
          {patient && !editMode && !showVisitForm && pendingPayments && pendingPayments.length > 0 &&  (
            <GlassCard className="mb-6 animate-fadeInUp animate-stagger-3" background="glass">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2 text-red-600" />
                  Pending Payments
                </h3>
              </div>
              
              <div className="space-y-4">
                {pendingPayments.map((visit) => (
                  <div key={visit._id} className="border border-red-200 rounded-lg p-4 bg-red-50">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="font-medium text-gray-800">
                            Visit Date: {new Date(visit.visitDate).toLocaleDateString()}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            visit.paymentStatus === 'pending' 
                              ? 'bg-red-100 text-red-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {visit.paymentStatus === 'pending' ? 'Payment Pending' : 'Partial Payment'}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600 mb-2">
                          Visit Type: <span className="font-medium">{visit.visitType}</span>
                        </div>
                        {visit.notes && (
                          <div className="text-sm text-gray-600 mb-2">
                            Notes: <span className="font-medium">{visit.notes}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-xs text-gray-500">Total Amount</div>
                        <div className="font-bold text-gray-800">₹{visit.amount}</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-xs text-gray-500">Paid Amount</div>
                        <div className="font-bold text-green-600">₹{visit.amountPaid || 0}</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-xs text-gray-500">Pending Amount</div>
                        <div className="font-bold text-red-600">₹{visit.pendingAmount || visit.amount}</div>
                      </div>
                      <div className="text-center p-2 bg-white rounded">
                        <div className="text-xs text-gray-500">Payment Method</div>
                        <div className="font-medium text-gray-700">{visit.paymentMethod || 'Not specified'}</div>
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <GlassButton
                        onClick={() => openPaymentModal(visit)}
                        variant="success"
                        className="bg-green-500 text-white"
                      >
                        <Plus size={16} />
                        Record Payment
                      </GlassButton>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Add Visit Form */}
          {showVisitForm && (
            <GlassCard className="mb-6 animate-fadeInUp animate-stagger-3" background="glass">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-emerald-600" />
                  Add New Visit
                </h3>
                <p className="text-gray-600">Record a new patient visit and payment</p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleAddVisit();
              }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Visit Type</label>
                    <select
                      name="visitType"
                      value={visitForm.visitType}
                      onChange={handleVisitChange}
                      className="w-full px-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80"
                      required
                    >
                      <option value="appointment">Appointment</option>
                      <option value="emergency">Emergency</option>
                      <option value="walk-in">Walk-in</option>
                    </select>
                  </div>

                  <GlassInput
                    icon={Plus}
                    label="Amount (₹)"
                    name="amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={visitForm.amount}
                    onChange={handleVisitChange}
                    placeholder="Enter visit amount"
                    required
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Payment Status</label>
                    <select
                      name="paymentStatus"
                      value={visitForm.paymentStatus}
                      onChange={handleVisitChange}
                      className="w-full px-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80"
                    >
                      <option value="paid">Paid</option>
                      <option value="pending">Pending</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Notes</label>
                    <textarea
                      name="notes"
                      value={visitForm.notes}
                      onChange={handleVisitChange}
                      placeholder="Visit notes (optional)"
                      rows="3"
                      className="w-full px-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <GlassButton
                    type="button"
                    onClick={() => {
                      setShowVisitForm(false);
                      setVisitForm(initialVisitForm);
                    }}
                    variant="secondary"
                    className="bg-gray-500 text-white"
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    type="submit"
                    variant="success"
                    loading={isLoading}
                    className="gradient-receptionist text-white"
                  >
                    <Plus size={18} />
                    Add Visit
                  </GlassButton>
                </div>
              </form>
            </GlassCard>
          )}

          {/* Register or Edit Form */}
          {(editMode || showRegisterForm) && (
            <PatientForm
              formData={formData}
              handleChange={handleChange}
              onSubmit={editMode ? handleEditSave : handleRegister}
              submitText={editMode ? 'Save Changes' : 'Register Patient'}
              icon={editMode ? <Save /> : <UserPlus />}
              isLoading={isLoading}
            />
          )}
        </GlassCard>

        {/* Payment Modal - Now properly placed outside the main card */}
        {showPaymentModal && selectedVisit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
                  <Plus className="w-5 h-5 mr-2 text-green-600" />
                  Record Payment
                </h3>
                <div className="text-sm text-gray-600">
                  Visit Date: {new Date(selectedVisit.visitDate).toLocaleDateString()}
                </div>
                <div className="text-sm text-gray-600">
                  Pending Amount: <span className="font-bold text-red-600">₹{selectedVisit.pendingAmount || selectedVisit.amount}</span>
                </div>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                handleRecordPayment();
              }} className="space-y-4">
                <GlassInput
                  icon={Plus}
                  label="Payment Amount (₹)"
                  name="amountPaid"
                  type="number"
                  min="0"
                  max={selectedVisit.pendingAmount || selectedVisit.amount}
                  step="0.01"
                  value={paymentForm.amountPaid}
                  onChange={handlePaymentFormChange}
                  placeholder="Enter payment amount"
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Payment Method</label>
                  <select
                    name="paymentMethod"
                    value={paymentForm.paymentMethod}
                    onChange={handlePaymentFormChange}
                    className="w-full px-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80"
                  >
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                    <option value="netbanking">Net Banking</option>
                    <option value="cheque">Cheque</option>
                  </select>
                </div>

                <GlassInput
                  icon={Calendar}
                  label="Payment Date"
                  name="paymentDate"
                  type="date"
                  value={paymentForm.paymentDate}
                  onChange={handlePaymentFormChange}
                  required
                />

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Notes</label>
                  <textarea
                    name="notes"
                    value={paymentForm.notes}
                    onChange={handlePaymentFormChange}
                    placeholder="Payment notes (optional)"
                    rows="3"
                    className="w-full px-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80"
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <GlassButton
                    type="button"
                    onClick={() => {
                      setShowPaymentModal(false);
                      setSelectedVisit(null);
                      setPaymentForm({
                        amountPaid: '',
                        paymentMethod: 'cash',
                        paymentDate: new Date().toISOString().split('T')[0],
                        notes: ''
                      });
                    }}
                    variant="secondary"
                    className="bg-gray-500 text-white"
                  >
                    Cancel
                  </GlassButton>
                  <GlassButton
                    type="submit"
                    variant="success"
                    loading={isLoading}
                    className="bg-green-500 text-white"
                  >
                    <Save size={18} />
                    Record Payment
                  </GlassButton>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
     
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
    <div className="text-emerald-600 mt-1">{icon}</div>
    <div className="flex-1">
      <span className="text-sm font-medium text-gray-600 block">{label}</span>
      <span className="text-gray-800">{value || 'Not provided'}</span>
    </div>
  </div>
);

const PatientForm = ({ formData, handleChange, onSubmit, submitText, icon, isLoading }) => (
  <GlassCard className="animate-fadeInUp animate-stagger-3" background="glass">
    <div className="mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-2 flex items-center">
        {icon}
        <span className="ml-2">{submitText}</span>
      </h3>
      <p className="text-gray-600">Fill in the patient information below</p>
    </div>

    <form onSubmit={(e) => {
      e.preventDefault();
      onSubmit();
    }} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlassInput
          icon={User}
          label="Full Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter patient's full name"
          required
        />
        <GlassInput
          icon={Phone}
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter contact number"
          required
        />
        <GlassInput
          icon={Mail}
          label="Email Address"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
        />
        <GlassInput
          icon={Calendar}
          label="Age"
          name="age"
          type="number"
          value={formData.age}
          onChange={handleChange}
          placeholder="Enter age"
          required
        />
        
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full px-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Medical History</label>
          <textarea
            name="medicalHistory"
            value={formData.medicalHistory}
            onChange={handleChange}
            placeholder="Enter medical history (optional)"
            rows="3"
            className="w-full px-4 py-3 input-glass rounded-xl border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/80"
          />
        </div>

        <GlassInput
          icon={User}
          label="Emergency Contact Name"
          name="emergencyContact.name"
          value={formData.emergencyContact.name}
          onChange={handleChange}
          placeholder="Emergency contact name"
        />
        <GlassInput
          icon={Phone}
          label="Emergency Contact Phone"
          name="emergencyContact.phone"
          value={formData.emergencyContact.phone}
          onChange={handleChange}
          placeholder="Emergency contact phone"
        />

      </div>

      <div className="flex justify-end pt-4">
        <GlassButton
          type="submit"
          variant="success"
          size="lg"
          loading={isLoading}
          className="gradient-receptionist text-white"
        >
          {icon}
          {submitText}
        </GlassButton>
      </div>
    </form>
  </GlassCard>
);

export default PatientManager;