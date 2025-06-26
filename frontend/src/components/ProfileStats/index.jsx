import { TrendingUp, TrendingDown} from 'lucide-react';
import React from 'react';


const StatsCard = ({ icon: Icon, label, value, trend, color }) => {
  return (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 hover:border-green-500/50 transition-all duration-300 w-[250px]">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        {trend && (
          <div className={`flex items-center text-sm ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend > 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            <span className="ml-1">{Math.abs(trend)}%</span>
          </div>
        )}
      </div>
      <p className="text-slate-400 text-sm mb-1">{label}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  );
};

export default StatsCard