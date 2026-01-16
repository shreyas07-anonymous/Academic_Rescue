
import React from 'react';
import { GraduationCap, LogOut, ChevronDown } from 'lucide-react';

interface NavbarProps {
  user: { name: string; email?: string } | null;
  onLogout: () => void;
  onSignInClick: () => void;
  onNavigate: (view: 'landing' | 'assessment' | 'mentor' | 'about') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout, onSignInClick, onNavigate }) => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-2 cursor-pointer transition-all hover:scale-105 active:scale-95 group" 
          onClick={() => onNavigate('landing')}
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg shadow-lg shadow-indigo-100 transition-transform group-hover:rotate-6">
            <GraduationCap className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold text-gray-800 transition-colors group-hover:text-indigo-600">AcademicRescue</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-500">
          {['landing', 'assessment', 'mentor', 'about'].map((item) => (
            <button 
              key={item}
              onClick={() => onNavigate(item as any)} 
              className="hover:text-indigo-600 transition-all hover:scale-110 active:scale-95 capitalize"
            >
              {item === 'landing' ? 'Home' : item === 'mentor' ? 'For Mentors' : item}
            </button>
          ))}
        </div>

        {user ? (
          <div className="flex items-center gap-4">
             <div className="hidden sm:flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 px-4 py-2 rounded-full border border-gray-100 transition-all hover:bg-white hover:shadow-md cursor-default">
               <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
               {user.email || user.name}
               <ChevronDown size={14} className="text-gray-400" />
             </div>
             <button
               onClick={onLogout}
               className="flex items-center gap-2 text-sm text-gray-400 hover:text-rose-500 font-bold transition-all hover:scale-110 active:scale-90"
             >
               <LogOut size={16} /> Sign Out
             </button>
          </div>
        ) : (
          <button
            onClick={onSignInClick}
            className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-2.5 rounded-full text-sm font-black transition-all shadow-lg shadow-orange-100 hover:scale-105 hover:shadow-orange-200 active:scale-95"
          >
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};
