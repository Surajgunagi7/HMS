import { api } from '../app/api';

class CallRequestService {
  async getCallRequests(status = '') {
    try {
      const response = await api.get('/call-requests/get-call-requests', {
        params: status ? { status } : {},
      });
      return response.data.data;
    } catch (error) {
      console.error('Error fetching call requests:', error.response?.data || error.message);
      throw error;
    }
  }

  async attendCallRequest(requestId) {
    try {
      const response = await api.patch(`/call-requests/attend-call-request/${requestId}`);
      return response.data;
    } catch (error) {
      console.error('Error marking call as attended:', error.response?.data || error.message);
      throw error;
    }
  }
}

export const callRequestService = new CallRequestService();
