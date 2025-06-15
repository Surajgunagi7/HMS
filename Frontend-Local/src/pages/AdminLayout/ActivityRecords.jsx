import { useState, useEffect } from 'react';
import { StatCard } from '../../components';
import { analyticsService } from '../../services/analyticService';
import {
  Users,
  Stethoscope,
  Calendar,
  HeartPulse,
  TrendingDown,
  TrendingUp,
  UserPlus,
  Activity as ActivityIcon
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line
} from 'recharts';

const getTimePeriodText = (period) => {
  switch (period) {
    case 'today':
      return 'Today';
    case 'last-7-days':
      return 'Last 7 days';
    case 'last-30-days':
      return 'Last 30 days';
    case 'this-month':
      return 'This month';
    case 'last-month':
      return 'Last month';
    default:
      return 'Last 7 days';
  }
};

const Activity = () => {
  const [timePeriod, setTimePeriod] = useState('this-month');
  const [chartView, setChartView] = useState('appointments');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);
  const [patientData, setPatientData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const [dashboardResponse, appointmentResponse, patientResponse] = await Promise.all([
          analyticsService.getDashboardStats(),
          analyticsService.getAppointmentAnalytics(),
          analyticsService.getPatientAnalytics()
        ]);

        setDashboardData(dashboardResponse.data);
        setAppointmentData(appointmentResponse.data);
        setPatientData(patientResponse.data);
      } catch (err) {
        console.error('Error fetching analytics:', err);
        setError('Failed to load analytics data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timePeriod]);

  const getStatsData = () => {
    if (!dashboardData) return {};

    return {
      totalPatients: {
        name: "Total Patients",
        icon: Users,
        value: analyticsService.formatNumber(dashboardData.totalPatients),
        color: "#60A5FA",
        timeIcon: TrendingUp,
        trend: 4.5, 
        time: getTimePeriodText(timePeriod)
      },
      totalDoctors: {
        name: "Total Doctors",
        icon: Stethoscope,
        value: analyticsService.formatNumber(dashboardData.totalDoctors),
        color: "#34D399",
        timeIcon: TrendingUp,
        trend: 2.3,
        time: getTimePeriodText(timePeriod)
      },
      totalAppointments: {
        name: "Total Appointments",
        icon: Calendar,
        value: analyticsService.formatNumber(dashboardData.totalAppointments),
        color: "#A78BFA",
        timeIcon: TrendingUp,
        trend: 1.8,
        time: getTimePeriodText(timePeriod)
      },
      todayAppointments: {
        name: "Today's Appointments",
        icon: ActivityIcon,
        value: analyticsService.formatNumber(dashboardData.todayAppointments),
        color: "#F472B6",
        timeIcon: dashboardData.todayAppointments > 10 ? TrendingUp : TrendingDown,
        trend: 3.7,
        time: "Today"
      },
      pendingAppointments: {
        name: "Pending Appointments",
        icon: HeartPulse,
        value: analyticsService.formatNumber(dashboardData.pendingAppointments),
        color: "#F59E0B",
        timeIcon: dashboardData.pendingAppointments > 5 ? TrendingDown : TrendingUp,
        trend: -2.1,
        time: getTimePeriodText(timePeriod)
      },
      newPatients: {
        name: "New Patients",
        icon: UserPlus,
        value: analyticsService.formatNumber(dashboardData.newPatientsThisMonth),
        color: "#10B981",
        timeIcon: TrendingUp,
        trend: 5.2,
        time: "This Month"
      }
    };
  };

  const getChartData = () => {
    if (chartView === 'appointments' && appointmentData?.monthlyTrends) {
      return appointmentData.monthlyTrends.map(item => ({
        name: `${item._id.month}/${item._id.year}`,
        appointments: item.count,
        month: item._id.month,
        year: item._id.year
      }));
    }
    
    if (chartView === 'patients' && patientData?.registrationTrends) {
      return patientData.registrationTrends.map(item => ({
        name: `${item._id.month}/${item._id.year}`,
        patients: item.count,
        month: item._id.month,
        year: item._id.year
      }));
    }

    return [];
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-600 text-lg font-semibold">{error}</div>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const statsData = getStatsData();
  const chartData = getChartData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full px-12 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Hospital Activity Dashboard</h1>
          </div>
          <div className="flex gap-4">
            <select
              value={chartView}
              onChange={(e) => setChartView(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="appointments">Appointments Trend</option>
              <option value="patients">Patient Registration</option>
            </select>
            <select
              value={timePeriod}
              onChange={handleTimePeriodChange}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="today">Today</option>
              <option value="last-7-days">Last 7 Days</option>
              <option value="last-30-days">Last 30 Days</option>
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
            </select>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Stats Grid */}
          <div className="lg:col-span-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
              {Object.entries(statsData).map(([key, stat]) => (
                <StatCard
                  key={key}
                  name={stat.name}
                  icon={stat.icon}
                  value={stat.value}
                  color={stat.color}
                  time={stat.time}
                  timeIcon={stat.timeIcon}
                  trend={stat.trend}
                />
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">
                {chartView === 'appointments' ? 'Appointment Trends' : 'Patient Registration Trends'}
              </h2>
            </div>
            
            <div className="h-96">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  {chartView === 'appointments' ? (
                    <AreaChart data={chartData}>
                      <CartesianGrid strokeDasharray="4 1" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(label) => `Month: ${label}`}
                        formatter={(value) => [value, 'Appointments']}
                      />
                      <Area
                        type="monotone"
                        dataKey="appointments"
                        stroke="#60A5FA"
                        fill="#60A5FA"
                        fillOpacity={0.2}
                      />
                    </AreaChart>
                  ) : (
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="4 1" vertical={false} />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip 
                        labelFormatter={(label) => `Month: ${label}`}
                        formatter={(value) => [value, 'New Patients']}
                      />
                      <Line
                        type="monotone"
                        dataKey="patients"
                        stroke="#34D399"
                        strokeWidth={2}
                        dot={{ fill: '#34D399', strokeWidth: 2, r: 4 }}
                        activeDot={{ r: 6 }}
                      />
                    </LineChart>
                  )}
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-gray-500">
                  <div className="text-center">
                    <ActivityIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No data available for the selected period</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;