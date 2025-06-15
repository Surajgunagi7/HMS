import { api } from '../app/api';

class PatientService {
  async createOrFindPatient(patientData) {
    try {
      console.log("Creating or finding patient with data:", patientData);
      
      const response = await api.post('/patients/create-or-find-patient', patientData);
      return response.data; 
    } catch (error) {
      console.error('Error creating/finding patient:', error);
      throw error;
    }
  }

  async searchPatientByIdOrPhone({ name, phone }) {
    try {
      const query = new URLSearchParams();
      if (name) query.append('name', name);
      if (phone) query.append('phone', phone);

      const response = await api.get(`/patients/searchPatient?${query.toString()}`);
      return response.data.data;
    } catch (error) {
      console.error('Error searching patient:', error);
      throw error;
    }
  }

  async updatePatient(id, patientData) {
    try {
      console.log("Updating patient with ID:", id, "and data:", patientData);
      
      const response = await api.post(`/patients/updatePatient/${id}`, patientData);
      return response.data;
    } catch (error) {
      console.error('Error updating patient:', error);
      throw error;
    }
  }

  async addVisit(patientId, visitData) {
    try {
      const response = await api.post(`/patients/addVisitToPatient/${patientId}`, visitData);
      console.log(response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error adding visit:', error);
      throw error;
    }
  }

  async  getPendingPayments(patientId) {
    const response = await api.get(`/patients/${patientId}/pending-payments`);
    return response.data;
  };

  async recordPayment(patientId, visitId, paymentData) {
    const response = await api.post(`/patients/${patientId}/visits/${visitId}/record-payment`, paymentData);
    return response.data;
  };

  async updateVisitPayment(patientId, visitId, paymentData) {
    const response = await api.put(`/patients/${patientId}/visits/${visitId}/payment`, paymentData);
    return response.data;
  };
}

export const patientService = new PatientService();