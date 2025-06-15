import { api } from '../app/api';

class AnalyticsService {
  async getDashboardStats() {
    try {
      const response = await api.get('/analytics/dashboard');
      return response.data;
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      throw error;
    }
  }

  async getAppointmentAnalytics() {
    try {
      const response = await api.get('/analytics/appointments');
      return response.data;
    } catch (error) {
      console.error('Error fetching appointment analytics:', error);
      throw error;
    }
  }

  async getPatientAnalytics() {
    try {
      const response = await api.get('/analytics/patients');
      return response.data;
    } catch (error) {
      console.error('Error fetching patient analytics:', error);
      throw error;
    }
  }

  async getRevenueAnalytics() {
    try {
      const response = await api.get('/analytics/revenue');
      return response.data;
    } catch (error) {
      console.error('Error fetching revenue analytics:', error);
      throw error;
    }
  }

  async getDoctorAnalytics() {
    try {
      const response = await api.get('/analytics/doctors');
      return response.data;
    } catch (error) {
      console.error('Error fetching doctor analytics:', error);
      throw error;
    }
  }

  async getComprehensiveAnalytics() {
    try {
      const response = await api.get('/analytics/comprehensive');
      return response.data;
    } catch (error) {
      console.error('Error fetching comprehensive analytics:', error);
      throw error;
    }
  }

  formatNumber(num) {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  }

  formatCurrency(amount, currency = '₹') {
    return `${currency}${this.formatNumber(amount)}`;
  }

  calculatePercentageChange(current, previous) {
    if (previous === 0) return 0;
    return ((current - previous) / previous) * 100;
  }
}

export const analyticsService = new AnalyticsService();