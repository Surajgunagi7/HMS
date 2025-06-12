import { api } from '../app/api.js';

class Service {
  async createAppointment(appointmentData) {
    try {
      const response = await api.post('/appointments/create', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error.response?.data || error.message);
      throw error;
    }
  }

  async getDoctorList() {
    try {
      const response = await api.get(`/users/get-users-by-role/doctor`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching doctor list:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async createOrFindPatient(patientData) {
    try {      
      const response = await api.post('/patients/create-or-find-patient', patientData);
      return response.data; 
    } catch (error) {
      console.error('Error creating/finding patient:', error);
      throw error;
    }
  }
  async createRequestCall(requestCallData) {
    try {
      const response = await api.post('/call-requests/create-call-request', requestCallData);
      console.log('Response from createRequestCall:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching call requests:', error.response?.data || error.message);
      throw error;
    }
  }
  
}

export const service = new Service();
