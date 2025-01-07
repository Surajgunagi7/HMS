import { api } from '../app/api';

class DoctorService {
  async addDoctor(doctorData) {
    try {
      console.log("Adding new doctor:", doctorData);

      return { id: Math.random().toString(36).substr(2, 9), ...doctorData };
      // const response = await api.post('/doctors', doctorData);
      // return response.data;
    } catch (error) {
      console.error('Error adding doctor:', error.response?.data || error.message);
      throw error;
    }
  }

  async removeDoctor(doctorId) {
    try {
      console.log(`Removing doctor with ID: ${doctorId}`);

      return { success: true, id: doctorId };
      // const response = await api.delete(`/doctors/${doctorId}`);
      // return response.data;
    } catch (error) {
      console.error('Error removing doctor:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateDoctor(doctorId, updates) {
    try {
      console.log(`Updating doctor with ID: ${doctorId}`);
      console.log("Updates:", updates);

      return { id: doctorId, ...updates };

      // const response = await api.patch(`/doctors/${doctorId}`, updates);
      // return response.data;
    } catch (error) {
      console.error('Error updating doctor:', error.response?.data || error.message);
      throw error;
    }
  }
}

class AdminService {
  async addAdmin(adminData) {
    try {
      console.log("Adding new admin:", adminData);

      return { id: Math.random().toString(36).substr(2, 9), ...adminData };
      // const response = await api.post('/admin', adminData);
      // return response.data;
    } catch (error) {
      console.error('Error adding admin:', error.response?.data || error.message);
      throw error;
    }
  }

  async removeAdmin(adminId) {
    try {
      console.log(`Removing admin with ID: ${adminId}`);

      return { success: true, id: adminId };
      // const response = await api.delete(`/admin/${adminId}`);
      // return response.data;
    } catch (error) {
      console.error('Error removing admin:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateAdmin(adminId, updates) {
    try {
      console.log(`Updating admin with ID: ${adminId}`);
      console.log("Updates:", updates);

      return { id: adminId, ...updates };

      // const response = await api.patch(`/admin/${adminId}`, updates);
      // return response.data;
    } catch (error) {
      console.error('Error updating admin:', error.response?.data || error.message);
      throw error;
    }
  }
}

class ReceptionistService {
  async addReceptionist(receptionistData) {
    try {
      console.log("Adding new receptionist:", receptionistData);

      return { id: Math.random().toString(36).substr(2, 9), ...receptionistData };
      // const response = await api.post('/receptionist', receptionistData);
      // return response.data;
    } catch (error) {
      console.error('Error adding receptionist:', error.response?.data || error.message);
      throw error;
    }
  }

  async removeReceptionist(receptionistId) {
    try {
      console.log(`Removing receptionist with ID: ${receptionistId}`);

      return { success: true, id: receptionistId };
      // const response = await api.delete(`/receptionist/${receptionistId}`);
      // return response.data;
    } catch (error) {
      console.error('Error removing receptionist:', error.response?.data || error.message);
      throw error;
    }
  }

  async updateReceptionist(receptionistId, updates) {
    try {
      console.log(`Updating receptionist with ID: ${receptionistId}`);
      console.log("Updates:", updates);

      return { id: receptionistId, ...updates };

      // const response = await api.patch(`/receptionist/${receptionistId}`, updates);
      // return response.data;
    } catch (error) {
      console.error('Error updating receptionist:', error.response?.data || error.message);
      throw error;
    }
  }
}

export const doctorService = new DoctorService()
export const adminService = new AdminService();
export const receptionistService = new ReceptionistService();
