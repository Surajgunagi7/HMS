import { useState } from 'react';
import { StatCard } from '../../components';
import {
  Users,
  Stethoscope,
  Calendar,
  HeartPulse,
  TrendingDown,
  TrendingUp
} from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';

// Helper function to get formatted time period text
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

const INITIAL_DATA = {
  stats: {
    patientVisits: {
      name: "Patient Visits",
      icon: Users,
      value: "2,325",
      color: "#60A5FA",
      timeIcon: TrendingUp,
      trend: 4.5
    },
    surgeries: {
      name: "Surgeries",
      icon: Stethoscope,
      value: "234",
      color: "#34D399",
      timeIcon: TrendingDown,
      trend: -2.2
    },
    appointments: {
      name: "Appointments",
      icon: Calendar,
      value: "567",
      color: "#A78BFA",
      timeIcon: TrendingUp,
      trend: 1.8
    },
    criticalCare: {
      name: "Critical Care",
      icon: HeartPulse,
      value: "45",
      color: "#F472B6",
      timeIcon: TrendingUp,
      trend: 3.7
    }
  },
  monthlyData: [
    { name: "Jan", patientVisits: 2400, surgeries: 140 },
    { name: "Feb", patientVisits: 1980, surgeries: 98 },
    { name: "Mar", patientVisits: 3050, surgeries: 155 },
    { name: "Apr", patientVisits: 4010, surgeries: 201 },
    { name: "May", patientVisits: 3870, surgeries: 187 },
    { name: "Jun", patientVisits: 4980, surgeries: 248 },
    { name: "Jul", patientVisits: 4560, surgeries: 226 },
    { name: "Aug", patientVisits: 4270, surgeries: 207 },
    { name: "Sep", patientVisits: 3890, surgeries: 189 },
    { name: "Oct", patientVisits: 4120, surgeries: 212 },
    { name: "Nov", patientVisits: 3340, surgeries: 164 },
    { name: "Dec", patientVisits: 2980, surgeries: 148 }
  ]
};

const Activity = () => {
  const [timePeriod, setTimePeriod] = useState('last-7-days');
  const [chartView, setChartView] = useState('patients');
  const [dashboardData, setDashboardData] = useState(INITIAL_DATA);

  const handleTimePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setTimePeriod(newPeriod);
    
    const updatedStats = Object.entries(dashboardData.stats).reduce((acc, [key, stat]) => {
      acc[key] = {
        ...stat,
        time: getTimePeriodText(newPeriod)
      };
      return acc;
    }, {});

    setDashboardData(prev => ({
      ...prev,
      stats: updatedStats
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full px-12 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Hospital Activity Dashboard</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Download Report
            </button>
            <select
              value={chartView}
              onChange={(e) => setChartView(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="patients">Patient Visits</option>
              <option value="surgeries">Surgeries</option>
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
              {dashboardData?.stats && Object.entries(dashboardData.stats).map(([key, stat]) => (
                <StatCard
                  key={key}
                  name={stat.name}
                  icon={stat.icon}
                  value={stat.value}
                  color={stat.color}
                  time={stat.time || getTimePeriodText(timePeriod)}
                  timeIcon={stat.timeIcon}
                  trend={stat.trend}
                />
              ))}
            </div>
          </div>

          {/* Chart Section */}
          <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-6">
              {chartView === 'patients' ? 'Monthly Patient Visits' : 'Monthly Surgeries'}
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={dashboardData?.monthlyData || []}>
                  <CartesianGrid strokeDasharray="4 1" vertical={false} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey={chartView === 'patients' ? 'patientVisits' : 'surgeries'}
                    stroke={chartView === 'patients' ? '#60A5FA' : '#34D399'}
                    fill={chartView === 'patients' ? '#60A5FA' : '#34D399'}
                    fillOpacity={0.2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activity;