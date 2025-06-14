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
      const isFormData = doctorData instanceof FormData;
      console.log("Adding new doctor:", doctorData);

      const response = await api.post('/users/register', doctorData, {
        headers: {
          'Content-Type': isFormData ? 'multipart/form-data' : 'application/json',
        },
      });
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
        let payload;
        let headers = {};
        payload = { _id: doctorMongoId, ...updates };
        headers['Content-Type'] = 'application/json';

        const response = await api.patch('/users/update', payload, { headers });

        return response.data;
    } catch (error) {
      console.error(
        'Error updating doctor:',
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

  async updateDoctorWithImage(doctorMongoId, updates) {
    try {
        console.log("Updating doctor with image:", doctorMongoId, updates);
        
        // Check if updates is FormData (indicating image upload)
        if (updates instanceof FormData) {
            console.log("Using FormData for image upload");
            
            // Add the doctor ID to FormData
            updates.append('_id', doctorMongoId);
            
            // Log FormData contents for debugging
            for (let [key, value] of updates.entries()) {
                console.log(`FormData - ${key}:`, value);
            }
            
            const response = await api.patch('/users/update-with-image', updates, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            
            return response.data;
        } else {
            // Regular JSON update (no image)
            console.log("Using JSON for regular update");
            
            const payload = { _id: doctorMongoId, ...updates };
            const response = await api.patch('/users/update', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            
            return response.data;
        }
    } catch (error) {
        console.error(
            'Error updating doctor with image:',
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
