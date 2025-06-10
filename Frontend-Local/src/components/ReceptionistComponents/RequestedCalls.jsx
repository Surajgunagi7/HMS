import { useEffect, useState } from 'react';
import { Mail, MessageCircle, Phone, Search } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { callRequestService } from '../../services/callRequestService';

const RequestedCalls = () => {
  const [calls, setCalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [attendingId, setAttendingId] = useState(null);

  const fetchCallRequests = async () => {
    try {
      setLoading(true);
      const res = await callRequestService.getCallRequests();
      
      setCalls(res.data || []);
      
    } catch (error) {
      toast.error('Failed to load call requests.');
      console.error('Error fetching call requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAttend = async (id) => {
    setAttendingId(id);
    const toastId = toast.loading('Updating status...');
    try {
      await callRequestService.attendCallRequest(id);
      setCalls((prevCalls) =>
        prevCalls.map((call) =>
          call._id === id ? { ...call, status: 'attended' } : call
        )
      );
      toast.success('Call marked as attended.', { id: toastId });
      setTimeout(fetchCallRequests, 500); 
    } catch (error) {
      toast.error('Failed to update call status.', { id: toastId });
      console.error('Error attending call request:', error);
    } finally {
      setAttendingId(null);
    }
  };

  useEffect(() => {
    fetchCallRequests();
  }, []);

  
  const filteredCalls = calls.filter((call) =>
    call.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    call.phone.includes(searchTerm)
  );

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Requested Calls</h2>
        <div className="relative w-64">
          <input
            type="search"
            placeholder="Search calls..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact Info</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reason</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredCalls.length > 0 ? (
                filteredCalls.map((call) => (
                  <tr key={call._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {call.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center">
                          <Mail className="w-4 h-4 mr-2 text-gray-400" />
                          {call.email}
                        </div>
                        <div className="flex items-center">
                          <Phone className="w-4 h-4 mr-2 text-gray-400" />
                          {call.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-2 text-gray-400" />
                        {call.reason}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {call.status === 'completed' ? (
                        <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded-lg">Attended</span>
                      ) : (
                        <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-lg">Pending</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {call.status !== 'completed' && (
                          <button
                            onClick={() => handleAttend(call._id)}
                            disabled={attendingId === call._id}
                            className={`px-3 py-1.5 rounded-lg text-sm transition ${
                              attendingId === call._id
                                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                                : 'bg-green-100 text-green-700 hover:bg-green-200'
                            }`}
                          >
                            {attendingId === call._id ? 'Updating...' : 'Mark as Attended'}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-6 text-gray-500">
                    {loading ? 'Loading requests...' : 'No requested calls found.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RequestedCalls;
