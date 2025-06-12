import { api } from '../app/api';

class AuthService {
  async login(loginId, password, role) {
    try {
      console.log(`Service Data: `);
      console.log({loginId,password,role});
      const response = await api.post('/users/login', { loginId, password, role });
      return response.data;

    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error; 
    }
  }

  async logout(role) {
    try {
      const response = await api.post('/users/logout'); 

      localStorage.removeItem('token');
      localStorage.removeItem('role');
      console.log(`${role}: Logged out`);

      return response.data;
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  }

  async getUserProfile() {
    try {
      const response = await api.get('/users/profile');      
       
      return response.data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      throw error;
    }
  }
  
  // Use of these methods will be done after the backend
  isAuthenticated() {
    const token = localStorage.getItem('token');
    return !!token; 
  }

  getAuthHeader() {
    const token = localStorage.getItem('token');
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();
