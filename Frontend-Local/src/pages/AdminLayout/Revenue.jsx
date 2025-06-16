import { useState, useEffect } from 'react';
import { DollarSign, Receipt, CreditCard, TrendingDown, TrendingUp, Wallet, AlertTriangle, Filter } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { StatCard } from '../../components';
import { analyticsService } from '../../services/analyticService';

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

const COLORS = ['#6B9DFE', '#f5c073', '#af89f3', '#EC4899', '#10B981', '#F59E0B'];

const Revenue = () => {
  const [timePeriod, setTimePeriod] = useState('this-month');
  const [chartType, setChartType] = useState('bar');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [revenueData, setRevenueData] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        setError(null);

        const [revenueResponse, dashboardResponse] = await Promise.all([
          analyticsService.getRevenueAnalytics(),
          analyticsService.getDashboardStats()
        ]);

        setRevenueData(revenueResponse.data);
        setDashboardData(dashboardResponse.data);
      } catch (err) {
        console.error('Error fetching revenue analytics:', err);
        setError('Failed to load revenue data');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [timePeriod]);

  const getStatsData = () => {
    if (!revenueData || !dashboardData) return {};

    const totalRevenue = revenueData.monthlyRevenue?.reduce((sum, month) => sum + month.revenue, 0) || 0;
    
    const emergencyRevenue = revenueData.revenueByVisitType?.find(item => item._id === 'emergency')?.revenue || 0;
    const appointmentRevenue = revenueData.revenueByVisitType?.find(item => item._id === 'appointment')?.revenue || 0;
    // eslint-disable-next-line no-unused-vars
    const walkinRevenue = revenueData.revenueByVisitType?.find(item => item._id === 'walk-in')?.revenue || 0;

    const pendingPayments = revenueData.paymentStatusDistribution?.find(item => item._id === 'pending')?.totalAmount || 0;

    return {
      totalRevenue: {
        name: "Total Revenue",
        icon: DollarSign,
        value: analyticsService.formatCurrency(totalRevenue),
        color: "#60A5FA",
        timeIcon: TrendingUp,
        trend: 3.5,
        time: "Last 12 months"
      },
      currentMonthRevenue: {
        name: "Monthly Revenue",
        icon: Receipt,
        value: analyticsService.formatCurrency(dashboardData.monthlyRevenue),
        color: "#34D399",
        timeIcon: TrendingUp,
        trend: 5.2,
        time: getTimePeriodText(timePeriod)
      },
      emergencyRevenue: {
        name: "Emergency Revenue",
        icon: CreditCard,
        value: analyticsService.formatCurrency(emergencyRevenue),
        color: "#A78BFA",
        timeIcon: TrendingUp,
        trend: 2.8,
        time: "All time"
      },
      appointmentRevenue: {
        name: "Appointment Revenue",
        icon: Wallet,
        value: analyticsService.formatCurrency(appointmentRevenue),
        color: "#F472B6",
        timeIcon: TrendingUp,
        trend: 2.7,
        time: "All time"
      },
      pendingPayments: {
        name: "Pending Payments",
        icon: AlertTriangle,
        value: analyticsService.formatCurrency(pendingPayments),
        color: "#F59E0B",
        timeIcon: TrendingDown,
        trend: -1.2,
        time: getTimePeriodText(timePeriod)
      }
    };
  };

  const getBarChartData = () => {
    if (!revenueData?.monthlyRevenue) return [];

    return revenueData.monthlyRevenue.map(item => ({
      name: `${item._id.month}/${item._id.year}`,
      value: item.revenue,
      visitCount: item.visitCount,
      month: item._id.month,
      year: item._id.year
    }));
  };

  const getPieChartData = () => {
    if (!revenueData?.revenueByVisitType) return [];

    return revenueData.revenueByVisitType.map(item => ({
      name: item._id.charAt(0).toUpperCase() + item._id.slice(1).replace('-', ' '),
      value: item.revenue,
      count: item.count
    }));
  };

  const handleTimePeriodChange = (e) => {
    setTimePeriod(e.target.value);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{`Month: ${label}`}</p>
          <p className="text-blue-600">{`Revenue: ${analyticsService.formatCurrency(payload[0].value)}`}</p>
          {payload[0].payload.visitCount && (
            <p className="text-gray-600">{`Visits: ${payload[0].payload.visitCount}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-semibold text-gray-800">{payload[0].name}</p>
          <p className="text-blue-600">{`Revenue: ${analyticsService.formatCurrency(payload[0].value)}`}</p>
          {payload[0].payload.count && (
            <p className="text-gray-600">{`Count: ${payload[0].payload.count}`}</p>
          )}
        </div>
      );
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading revenue analytics...</p>
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
  const barChartData = getBarChartData();
  const pieChartData = getPieChartData();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-full px-4 sm:px-6 lg:px-12 py-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-gray-900">Revenue Analytics</h1>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>Growing</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <select
                value={timePeriod}
                onChange={handleTimePeriodChange}
                className="px-3 py-2 border border-gray-300 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="last-7-days">Last 7 days</option>
                <option value="last-30-days">Last 30 days</option>
                <option value="this-month">This month</option>
                <option value="last-month">Last month</option>
              </select>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
          {Object.values(statsData).map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Revenue Trends Chart */}
          <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Revenue Trends</h3>
                <p className="text-sm text-gray-500 mt-1">Monthly revenue breakdown</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setChartType('bar')}
                  className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                    chartType === 'bar'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Bar Chart
                </button>
                <button
                  onClick={() => setChartType('pie')}
                  className={`px-3 py-1 text-sm rounded-md font-medium transition-colors ${
                    chartType === 'pie'
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Pie Chart
                </button>
              </div>
            </div>

            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                {chartType === 'bar' ? (
                  <BarChart data={barChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis 
                      dataKey="name" 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                      tickFormatter={(value) => analyticsService.formatCurrency(value)}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar 
                      dataKey="value" 
                      fill="#6B9DFE" 
                      radius={[4, 4, 0, 0]}
                      name="Revenue"
                    />
                  </BarChart>
                ) : (
                  <PieChart>
                    <Pie
                      data={pieChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltip />} />
                    <Legend />
                  </PieChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Revenue Breakdown */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Breakdown</h3>
            
            <div className="space-y-4">
              {pieChartData.map((item, index) => (
                <div key={item.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm font-medium text-gray-700">{item.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">
                      {analyticsService.formatCurrency(item.value)}
                    </div>
                    {item.count && (
                      <div className="text-xs text-gray-500">{item.count} visits</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {pieChartData.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Receipt className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No revenue data available</p>
              </div>
            )}
          </div>
        </div>

        {/* Additional Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Payment Status Distribution */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status</h3>
            
            <div className="space-y-3">
              {revenueData?.paymentStatusDistribution?.map((status) => {
                const percentage = revenueData.paymentStatusDistribution.reduce((sum, item) => sum + item.totalAmount, 0);
                const statusPercentage = percentage > 0 ? (status.totalAmount / percentage) * 100 : 0;
                
                return (
                  <div key={status._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div 
                        className={`w-3 h-3 rounded-full ${
                          status._id === 'completed' ? 'bg-green-500' :
                          status._id === 'pending' ? 'bg-yellow-500' :
                          status._id === 'failed' ? 'bg-red-500' : 'bg-gray-400'
                        }`}
                      />
                      <span className="text-sm font-medium text-gray-700 capitalize">
                        {status._id}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-gray-900">
                        {analyticsService.formatCurrency(status.totalAmount)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {statusPercentage.toFixed(1)}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Avg. Revenue per Visit</span>
                <span className="text-sm font-semibold text-gray-900">
                  {revenueData?.monthlyRevenue?.length > 0 ? 
                    analyticsService.formatCurrency(
                      revenueData.monthlyRevenue.reduce((sum, month) => sum + month.revenue, 0) /
                      revenueData.monthlyRevenue.reduce((sum, month) => sum + month.visitCount, 0)
                    ) : '₹0'
                  }
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Visits</span>
                <span className="text-sm font-semibold text-gray-900">
                  {revenueData?.monthlyRevenue?.reduce((sum, month) => sum + month.visitCount, 0) || 0}
                </span>
              </div>
              
              <div className="flex items-center justify-between py-2">
                <span className="text-sm text-gray-600">Revenue Sources</span>
                <span className="text-sm font-semibold text-gray-900">
                  {revenueData?.revenueByVisitType?.length || 0} Types
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;