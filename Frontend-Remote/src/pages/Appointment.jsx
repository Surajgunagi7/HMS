import { useState } from 'react';
import { User, Mail, Check } from 'lucide-react';

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    time: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-blue-500 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Check className="h-6 w-6 text-green-600" />
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">Appointment Confirmed!</h2>
          <div className="mt-6 text-left">
            <p className="text-gray-600"><span className="font-medium">Name:</span> {formData.fullName}</p>
            <p className="text-gray-600"><span className="font-medium">Date:</span> {formData.date}</p>
            <p className="text-gray-600"><span className="font-medium">Time:</span> {formData.time}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Book an Appointment</h2>
          <p className="mt-2 text-sm text-gray-600">
            Fill in your details below to schedule your visit
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  required
                  className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="pl-10 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className='flex flex-row'>
              <label htmlFor="date" className="block text-sm p-3 font-medium text-gray-700">
                Date
              </label>
              <div className="mt-1 relative">
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  className="pl-5 pr-5 focus:ring-blue-500 focus:border-blue-500 block w-full h-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                />
              </div>
              <label htmlFor="time" className="block text-sm p-3 font-medium text-gray-700">
                Time
              </label>
              <div className="mt-1 relative">
                <input
                  id="time"
                  name="time"
                  type="time"
                  required
                  className="pl-5 pr-5 focus:ring-blue-500 focus:border-blue-800 block w-full h-10 sm:text-sm border-gray-300 rounded-md"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Book Appointment
          </button>
        </form>
      </div>
    </div>
  );
}

