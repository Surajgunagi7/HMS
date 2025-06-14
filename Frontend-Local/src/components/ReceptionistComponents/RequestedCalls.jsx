import { useEffect, useState } from 'react';
import { Mail, MessageCircle, Phone, Search, User, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { callRequestService } from '../../services/callRequestService';
import { GlassCard, GlassButton, GlassInput } from '../common';

const RequestedCalls = () => {
  const [calls, setCalls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [attendingId, setAttendingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState('all');

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

  const filteredCalls = calls.filter((call) => {
    const matchesSearch = call.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || call.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusCounts = {
    all: calls.length,
    pending: calls.filter(c => c.status === 'pending').length,
    completed: calls.filter(c => c.status === 'completed').length,
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
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Requested Calls</h2>
              <p className="text-gray-600">Manage incoming call requests from patients</p>
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
                <div className="text-2xl font-bold text-green-600">{statusCounts.completed}</div>
                <div className="text-xs text-gray-500">Completed</div>
              </div>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <GlassInput
                icon={Search}
                placeholder="Search calls..."
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
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
        </GlassCard>

        {/* Calls List */}
        <div className="space-y-4">
          {filteredCalls.length > 0 ? (
            filteredCalls.map((call, index) => (
              <GlassCard 
                key={call._id} 
                className={`hover-lift animate-fadeInUp animate-stagger-${(index % 3) + 1}`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-400 to-green-500 flex items-center justify-center mr-4">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-800">{call.name}</h4>
                        <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                          call.status === 'completed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {call.status === 'completed' ? 'Attended' : 'Pending'}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-emerald-500" />
                        <span className="truncate">{call.email}</span>
                      </div>
                      <div className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-emerald-500" />
                        <span>{call.phone}</span>
                      </div>
                    </div>

                    <div className="bg-gray-50 rounded-lg p-3 mb-4">
                      <div className="flex items-start">
                        <MessageCircle className="w-4 h-4 mr-2 text-emerald-500 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">Reason for Call:</p>
                          <p className="text-sm text-gray-600">{call.reason}</p>
                        </div>
                      </div>
                    </div>

                    {call.createdAt && (
                      <div className="flex items-center text-xs text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        <span>Requested: {new Date(call.createdAt).toLocaleString()}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 lg:mt-0 lg:ml-6">
                    {call.status !== 'completed' && (
                      <GlassButton
                        onClick={() => handleAttend(call._id)}
                        loading={attendingId === call._id}
                        variant="success"
                        className="bg-green-500 text-white hover:bg-green-600"
                      >
                        <Phone size={16} />
                        Mark as Attended
                      </GlassButton>
                    )}
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
            <GlassCard className="text-center py-12 animate-fadeInUp">
              <Phone className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                {loading ? 'Loading requests...' : 'No call requests found'}
              </h3>
              <p className="text-gray-500">
                {loading ? 'Please wait while we fetch the data' : 'Try adjusting your search or filter criteria'}
              </p>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default RequestedCalls;