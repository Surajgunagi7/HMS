import { useState } from 'react';
import { DollarSign, Receipt, CreditCard, TrendingDown, TrendingUp, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { StatCard } from '../../components';

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
    totalRevenue: {
      name: "Total Revenue",
      icon: DollarSign,
      value: "₹542,325",
      color: "#60A5FA",
      timeIcon: TrendingUp,
      trend: 3.5
    },
    insurance: {
      name: "Insurance Claims",
      icon: Receipt,
      value: "₹234,567",
      color: "#34D399",
      timeIcon: TrendingUp,
      trend: 5.2
    },
    outPatient: {
      name: "Out-Patient Revenue",
      icon: CreditCard,
      value: "₹167,890",
      color: "#A78BFA",
      timeIcon: TrendingDown,
      trend: -1.8
    },
    inPatient: {
      name: "In-Patient Revenue",
      icon: Wallet,
      value: "₹139,868",
      color: "#F472B6",
      timeIcon: TrendingUp,
      trend: 2.7
    }
  },
  barData: [
    { name: "Jan", value: 400000 },
    { name: "Feb", value: 300000 },
    { name: "Mar", value: 500000 },
    { name: "Apr", value: 700000 },
    { name: "May", value: 600000 },
    { name: "Jun", value: 1100000 },
    { name: "Jul", value: 900000 },
    { name: "Aug", value: 800000 },
    { name: "Sep", value: 650000 },
    { name: "Oct", value: 700000 },
    { name: "Nov", value: 500000 },
    { name: "Dec", value: 400000 }
  ],
  pieData: [
    { name: 'Emergency Care', value: 400000 },
    { name: 'Surgery', value: 300000 },
    { name: 'Diagnostics', value: 300000 },
    { name: 'Pharmacy', value: 200000 }
  ]
};

const COLORS = ['#6B9DFE', '#f5c073', '#af89f3', '#EC4899'];

const Sales = () => {
  const [timePeriod, setTimePeriod] = useState('last-7-days');
  const [chartType, setChartType] = useState('bar');
  const [dashboardData, setDashboardData] = useState(INITIAL_DATA);

  // Update time period for all stats
  const handleTimePeriodChange = (e) => {
    const newPeriod = e.target.value;
    setTimePeriod(newPeriod);
    
    // Update the stats with new time period
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
      <div className="max-w-full lxl px-12 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Revenue Overview</h1>
          </div>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
              Download Report
            </button>
            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="bar">Bar Chart</option>
              <option value="pie">Pie Chart</option>
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
              {chartType === 'bar' ? 'Monthly Revenue' : 'Revenue by Department'}
            </h2>
            <div className="h-96">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={dashboardData?.barData || []}>
                    <CartesianGrid strokeDasharray="4 1" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      fill="#60A5FA"
                      radius={[6, 6, 0, 0]}
                    />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={dashboardData?.pieData || []}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {(dashboardData?.pieData || []).map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;