
import React from 'react';
import { motion } from 'framer-motion';
import { Users, Shield, TrendingDown, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface MentorPortalProps {
  onLogin: () => void;
}

export const MentorPortal: React.FC<MentorPortalProps> = ({ onLogin }) => {
  const stats = [
    { label: 'Total Students', value: '1,248', icon: Users, color: 'text-indigo-500', bg: 'bg-indigo-50' },
    { label: 'High Risk', value: '32', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' },
    { label: 'Improved', value: '156', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-50' },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">
          Mentor <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Portal</span>
        </h1>
        <p className="text-gray-500 font-medium">Monitor student progress and academic risk levels effectively</p>
      </div>

      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100 flex flex-col min-h-[600px]">
          {/* Card Header matching Assessment style */}
          <div className="bg-gray-50/80 p-10 flex justify-between items-center border-b border-gray-100">
            <div>
              <h2 className="text-xl font-extrabold text-gray-800">Dashboard Overview</h2>
              <p className="text-sm font-bold text-gray-400 uppercase tracking-widest">Real-time Insights</p>
            </div>
            <div className="flex gap-2">
              <div className="h-2.5 w-10 rounded-full bg-indigo-500 shadow-sm shadow-indigo-200" />
              <div className="h-2.5 w-10 rounded-full bg-gray-200" />
              <div className="h-2.5 w-10 rounded-full bg-gray-200" />
            </div>
          </div>

          <div className="p-10 space-y-12">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all hover:-translate-y-2 group">
                  <div className={`w-12 h-12 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110`}>
                    <stat.icon size={24} />
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-1">{stat.value}</div>
                  <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>

            {/* Feature Teasers */}
            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-indigo-100 transition-transform group-hover:rotate-6">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-800 transition-colors group-hover:text-indigo-600">Student Risk List</h3>
                  <p className="text-gray-400 text-sm font-medium">Automatic identification of at-risk engineering students</p>
                </div>
              </div>

              <div className="bg-gray-50/50 rounded-[2rem] p-10 border border-gray-100 text-center transition-all hover:bg-white hover:shadow-inner">
                <Users className="mx-auto text-indigo-200 mb-4 transition-transform hover:scale-110" size={48} />
                <h4 className="text-xl font-bold text-gray-800 mb-2">Access restricted to Faculty</h4>
                <p className="text-gray-500 text-sm max-w-md mx-auto mb-8">
                  The mentor dashboard provides deep analytics into attendance, subject performance, and mental well-being across your branch.
                </p>
                <button 
                  onClick={onLogin}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-10 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg shadow-indigo-100 hover:shadow-indigo-200 flex items-center gap-2 mx-auto hover:scale-105 active:scale-95"
                >
                  Sign In to Mentor Portal <ArrowRight size={18} />
                </button>
              </div>
            </div>
          </div>

          <div className="p-10 pt-0 mt-auto">
             <div className="flex items-center gap-2 justify-center text-gray-300">
                <Shield size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Institutional Access Only</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
