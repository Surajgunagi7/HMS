import { api } from '../app/api';

class AppointmentService {
  async createAppointment(appointmentData) {
    try {
      const response = await api.post('/appointments/create', appointmentData);
      return response.data;
    } catch (error) {
      console.error('Error creating appointment:', error.response?.data || error.message);
      throw error;
    }
  }

  async getAppointments(params = {}) {
    try {
      
      const response = await api.get('/appointments/get-appointments', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching appointments:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateAppointment(id, updatedData) {
    try {
      const response = await api.put(`/appointments/update-appointments/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating appointment:', error.response?.data || error.message);
      throw error;
    }
  }

  async deleteAppointment(id) {
    try {
      const response = await api.delete(`/appointments/delete-appointments/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting appointment:', error.response?.data || error.message);
      throw error;
    }
  }
}

export const appointmentService = new AppointmentService();
