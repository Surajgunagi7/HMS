import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://your-backend-api-url.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized errors (e.g., redirect to login)
      console.error('Unauthorized! Redirecting to login.');
      localStorage.removeItem('token'); 
    }
    return Promise.reject(error);
  }
);
