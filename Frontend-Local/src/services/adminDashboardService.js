import { api } from "../app/api";

class AdminService {
  async addAdmin(adminData) {
    try {
      console.log("Adding new admin:", adminData);
      const response = await api.post("/users/register", adminData);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding admin:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async removeAdmin(adminId) {
    try {
      console.log(`Removing admin with ID: ${adminId}`);
      const response = await api.delete(`/users/delete/${adminId}`);

      return response.data;
    } catch (error) {
      console.error(
        "Error removing admin:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async updateAdmin(adminMongoId, updates) {
    try {
      const payload = { _id: adminMongoId, ...updates };
      const response = await api.patch(`/users/update`, payload);

      console.log(`Admin with Mongo ID ${adminMongoId} has been updated:`);
      console.log(response.data);

      return response.data; 
    } catch (error) {
      console.error(
        "Error updating admin:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getAdminList(role = "admin") {
    try {
      const response = await api.get(`/users/get-users-by-role/${role}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching admin list:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

class DoctorService {
  async addDoctor(doctorData) {
    try {
      console.log("Adding new doctor:", doctorData);
      const response = await api.post('/users/register', doctorData);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding doctor:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async removeDoctor(doctorId) {
    try {
      console.log(`Removing doctor with ID: ${doctorId}`);

      const response = await api.delete(`/users/delete/${doctorId}`);

      return response.data;
    } catch (error) {
      console.error(
        "Error removing doctor:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async updateDoctor(doctorMongoId, updates) {
    try {
      const payload = { _id: doctorMongoId, ...updates };
      const response = await api.patch(`/users/update`, payload);
      console.log(`Doctor with Mongo ID ${doctorMongoId} has been updated:`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Error updating doctor:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getDoctorList(role = "doctor") {
    try {
      const response = await api.get(`/users/get-users-by-role/${role}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching doctor list:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

class ReceptionistService {
  async addReceptionist(receptionistData) {
    try {
      console.log("Adding new receptionist:", receptionistData);
      const response = await api.post('/users/register', receptionistData);
      return response.data;
    } catch (error) {
      console.error(
        "Error adding receptionist:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async removeReceptionist(receptionistId) {
    try {
      console.log(`Removing receptionist with ID: ${receptionistId}`);
      const response = await api.delete(`/users/delete/${receptionistId}`);
      
      return response.data;
    } catch (error) {
      console.error(
        "Error removing receptionist:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async updateReceptionist(receptionistMongoId, updates) {
    try {
      const payload = { _id: receptionistMongoId, ...updates };
      const response = await api.patch(`/users/update`, payload);
      console.log(`Receptionist with Mongo ID ${receptionistMongoId} has been updated:`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error(
        "Error updating receptionist:",
        error.response?.data || error.message
      );
      throw error;
    }
  }

  async getReceptionistList(role = "receptionist") {
    try {
      const response = await api.get(`/users/get-users-by-role/${role}`);
      return response.data;
    } catch (error) {
      console.error(
        "Error fetching receptionist list:",
        error.response?.data || error.message
      );
      throw error;
    }
  }
}

export const doctorService = new DoctorService();
export const adminService = new AdminService();
export const receptionistService = new ReceptionistService();
