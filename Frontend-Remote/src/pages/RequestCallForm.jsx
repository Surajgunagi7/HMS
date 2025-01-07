import { useState } from 'react';
import { Phone, Clock, User, MessageSquare, Check } from 'lucide-react';

export default function RequestCallForm({ onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredTime: '',
    reason: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (onSubmitSuccess) {
      setTimeout(onSubmitSuccess, 2000);
    }
  };

  if (submitted) {
    return (
      <div className="bg-gradient-to-b from-white to-blue-500 rounded-lg shadow-md p-6 text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
          <Check className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">Call Request Received</h3>
        <p className="mt-2 text-sm text-gray-600">
          We&apos;ll call you at {formData.phone} during your preferred time.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-row bg-gradient-to-b from-white h-screen to-blue-500 justify-center rounded-lg shadow-md p-6">
      <div className="space-y-5 justify-center max-w-xl">
        <div className='flex justify-center'>
          <h3 className="text-lg font-medium text-gray-900 mb-4">Request a Call Back</h3>
        </div>
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <div className="mt-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="name"
              required
              className="pl-10 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-400 border rounded-md"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
        </div>
        <div className='flex justify-start'>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phone"
                required
                pattern="[0-9]{10}"
                className="pl-10 p-3 focus:ring-blue-500 focus:border-blue-500 block w-auto sm:text-sm border-gray-400 border rounded-md"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">Format: 10 digits without spaces or dashes</p>
          </div>
          <div className='ml-5'>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-700">
              Preferred Time
            </label>
            <div className="mt-1 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Clock className="h-4 w-4 text-gray-400" />
              </div>
              <select
                id="preferredTime"
                required
                className="pl-10 p-3 focus:ring-blue-500 focus:border-blue-500 block w-auto sm:text-sm border-gray-400 border rounded-md"
                value={formData.preferredTime}
                onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
              >
                <option value="">Select a time</option>
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 4 PM)</option>
                <option value="evening">Evening (4 PM - 7 PM)</option>
              </select>
            </div>
          </div>
        </div>
        <div>
          <label htmlFor="reason" className="block text-sm font-medium text-gray-700">
            Reason for Call
          </label>
          <div className="mt-1 relative">
            <div className="absolute top-3 left-3 pointer-events-none">
              <MessageSquare className="h-5 w-5 text-gray-400" />
            </div>
            <textarea
              id="reason"
              required
              rows={3}
              className="pl-10 p-3 focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-400 border rounded-md"
              value={formData.reason}
              onChange={(e) => setFormData({ ...formData, reason: e.target.value })}
            />
          </div>
        </div>
        <button
          type="submit"
          className="mt-6 w-68 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Request Call
        </button>
      </div>
    </form>
  );
}

