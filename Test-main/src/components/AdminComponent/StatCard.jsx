import { GlassCard } from '../common';

const StatCard = ({ name, icon: Icon, value, color, time, timeIcon: TimeIcon, trend }) => (
  <GlassCard className="relative overflow-hidden group">
    <div className="relative z-10">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-600">{name}</span>
        <div className="p-2 rounded-xl" style={{ backgroundColor: `${color}20` }}>
          <Icon className="w-5 h-5" style={{ color }} />
        </div>
      </div>
      <div className="space-y-3">
        <h3 className="text-3xl font-bold text-gray-800 group-hover:scale-105 transition-transform duration-300">
          {value}
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <TimeIcon className="w-4 h-4 mr-1" />
            <span>{time}</span>
          </div>
          {trend && (
            <div className={`flex items-center text-sm font-medium ${
              trend > 0 ? 'text-green-600' : 'text-red-600'
            }`}>
              <span>{trend > 0 ? '+' : ''}{trend}%</span>
            </div>
          )}
        </div>
      </div>
    </div>
    
    {/* Subtle background gradient */}
    <div 
      className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-300"
      style={{ backgroundColor: color }}
    />
    
    {/* Animated border */}
    <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-white/20 transition-colors duration-300" />
  </GlassCard>
);

export default StatCard;