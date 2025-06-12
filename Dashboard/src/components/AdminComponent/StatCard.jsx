const StatCard = ({ name, icon: Icon, value, color, time, timeIcon: TimeIcon }) => (
  <div className="relative overflow-hidden bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-600">{name}</span>
        <Icon className="w-5 h-5" style={{ color }} />
      </div>
      <div className="space-y-2">
        <h3 className="text-2xl font-bold">{value}</h3>
        <div className="flex items-center text-sm text-gray-500">
          <TimeIcon className="w-4 h-4 mr-1" />
          <span>{time}</span>
        </div>
      </div>
    </div>
    {/* Add subtle background color */}
    <div 
      className="absolute inset-0 opacity-10"
      style={{ backgroundColor: color }}
    />
  </div>
);
export default StatCard