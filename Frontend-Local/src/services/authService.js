import { api } from '../app/api';

class AuthService {
  async login(username, password, role) {
    try {
      console.log(`Service Data:`);
      console.log({username,password,role});
      
      return {username, token: 'token123',role}
      // const response = await api.post('/login', { username, password, role });
      // return response.data;
    } catch (error) {
      console.error('Login error:', error.response?.data || error.message);
      throw error; 
    }
  }

  logout(role) {
    console.log(`${role}: Logged out`);
    localStorage.removeItem('token'); 
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
