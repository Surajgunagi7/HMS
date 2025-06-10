import { useState } from 'react';
import { Search, UserPlus, Pencil, Save, Phone, Mail, Info, Calendar, HeartPulse, AlertCircle } from 'lucide-react';
import { patientService } from '../../services/patientService';

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

const PatientManager = () => {
  const [phone, setPhone] = useState('');
  const [patient, setPatient] = useState(null);
  const [formData, setFormData] = useState(initialForm);
  const [notFound, setNotFound] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const handleSearch = async () => {
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
        setNotFound(false);
        setShowRegisterForm(false);
        setEditMode(false);
      } else {
        console.log("Patient not found");
        setNotFound(true);
        setShowRegisterForm(true);
        setPatient(null);
        setFormData({ ...initialForm, phone });
      }
    } catch (err) {
      console.error(err);
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

  const handleEditSave = async () => {
  try {
    const updated = await patientService.updatePatient(patient._id, formData);
    if (updated?.data) {
      // Reset all UI state to only show search and register
      setPatient(null);
      setFormData(initialForm);
      setEditMode(false);
      setShowRegisterForm(false);
      setNotFound(false);
    }
  } catch (err) {
    console.error(err);
  }
};



const handleRegister = async () => {
  try {
    const response = await patientService.createOrFindPatient(formData);
    if (response?.data) {
      // After successful registration, clear everything and go back to search view
      setPatient(null);
      setFormData(initialForm);
      setShowRegisterForm(false);
      setNotFound(false);
      setPhone(''); // optional: clears phone input field
    }
  } catch (err) {
    console.error(err);
  }
};




  return (
    <div className="max-w-4xl mx-auto mt-12 bg-white rounded-2xl p-8 space-y-8">
      <h2 className="text-3xl font-bold text-center">Patient Management</h2>

      {/* Search Section */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
        <input
          type="text"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        />
        <button
          onClick={handleSearch}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition">
          <Search size={18} /> Search
        </button>
        <button
          onClick={() => {
            setFormData(initialForm);
            setPatient(null);
            setEditMode(false);
            setShowRegisterForm(true);
            setNotFound(false);
          }}
          className="flex items-center gap-2 bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition">
          <UserPlus size={18} /> Register
        </button>
      </div>

      {notFound && (
        <div className="flex items-center gap-2 text-red-600 font-medium">
          <AlertCircle size={20} />
          Patient not found. Please register them.
        </div>
      )}

      {/* Patient View */}
      {patient && !editMode && (
        <div className="border-t pt-6 space-y-4">
          <h3 className="text-xl font-semibold">Patient Details</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <InfoRow icon={<Info />} label="ID" value={patient.patientId} />
            <InfoRow icon={<Phone />} label="Phone" value={patient.phone} />
            <InfoRow icon={<Info />} label="Name" value={patient.name} />
            <InfoRow icon={<Mail />} label="Email" value={patient.email} />
            <InfoRow icon={<Calendar />} label="Age" value={patient.age} />
            <InfoRow icon={<Info />} label="Gender" value={patient.gender} />
            <InfoRow icon={<HeartPulse />} label="Medical History" value={patient.medicalHistory} />
            <InfoRow
              icon={<Phone />}
              label="Emergency Contact"
              value={`${patient.emergencyContact?.name || '-'}, ${patient.emergencyContact?.phone || '-'}`}
            />
          </div>
          <button
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
            className="mt-4 bg-yellow-500 text-white px-4 py-2 rounded-lg flex items-center gap-1 hover:bg-yellow-600 transition">
            <Pencil size={18} /> Edit
          </button>
        </div>
      )}

      {/* Register or Edit Form */}
      {(editMode || showRegisterForm) && (
        <PatientForm
          formData={formData}
          handleChange={handleChange}
          onSubmit={editMode ? handleEditSave : handleRegister}
          submitText={editMode ? 'Save' : 'Register'}
          icon={editMode ? <Save /> : <UserPlus />}
        />
      )}
    </div>
  );
};

const InfoRow = ({ icon, label, value }) => (
  <div className="flex items-center space-x-2">
    {icon}
    <span className="font-semibold">{label}:</span>
    <span className="text-gray-800">{value || '-'}</span>
  </div>
);

const PatientForm = ({ formData, handleChange, onSubmit, submitText, icon }) => (
  <form onSubmit={(e) => {
    e.preventDefault();
    onSubmit();
  }} className="space-y-4 border-t pt-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input className="p-3 border rounded-lg" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input className="p-3 border rounded-lg" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
      <input className="p-3 border rounded-lg" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input className="p-3 border rounded-lg" name="age" value={formData.age} onChange={handleChange} placeholder="Age" />
      <select className="p-3 border rounded-lg" name="gender" value={formData.gender} onChange={handleChange}>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>
      <input className="p-3 border rounded-lg col-span-1 md:col-span-2" name="medicalHistory" value={formData.medicalHistory} onChange={handleChange} placeholder="Medical History" />
      <input className="p-3 border rounded-lg" name="emergencyContact.name" value={formData.emergencyContact.name} onChange={handleChange} placeholder="Emergency Contact Name" />
      <input className="p-3 border rounded-lg" name="emergencyContact.phone" value={formData.emergencyContact.phone} onChange={handleChange} placeholder="Emergency Contact Phone" />
    </div>
    <button type="submit" className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition">
      {icon} {submitText}
    </button>
  </form>
);

export default PatientManager;
