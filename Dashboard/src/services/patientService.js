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
}

export const patientService = new PatientService();
