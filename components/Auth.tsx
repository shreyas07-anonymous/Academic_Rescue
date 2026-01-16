
import React, { useState } from 'react';
import { Shield, Mail, Lock, User, GraduationCap, Users } from 'lucide-react';
import { Role } from '../types';

interface AuthProps {
  onLogin: (name: string, role: Role, email: string) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState<Role>('student');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(name || 'John Doe', role, email);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-6 pt-12">
      <div className="text-center mb-8 space-y-2">
        <div className="flex justify-center mb-4 transition-transform hover:scale-110">
          <div className="w-16 h-16 bg-white border border-gray-100 rounded-2xl flex items-center justify-center shadow-xl">
            <Shield className="text-indigo-500 w-8 h-8" />
          </div>
        </div>
        <h1 className="text-3xl font-black text-gray-900 tracking-tight">Student Risk Assessment</h1>
        <p className="text-gray-500 font-bold text-base">Secure access for students and mentors</p>
      </div>

      <div className="w-full max-w-lg bg-white rounded-[3rem] shadow-2xl shadow-gray-200/50 overflow-hidden border border-gray-100">
        <div className="flex bg-gray-100/50 p-2 m-8 rounded-2xl border border-gray-100">
          <button
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${
              isLogin ? 'bg-white text-indigo-600 shadow-lg' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            } active:scale-95`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-4 text-sm font-black uppercase tracking-widest rounded-xl transition-all ${
              !isLogin ? 'bg-white text-indigo-600 shadow-lg' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-200/50'
            } active:scale-95`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-10 pb-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-black text-gray-900 tracking-tight">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
            <p className="text-gray-500 font-bold text-sm">
              {isLogin ? 'Enter your credentials to access your account' : 'Join the Student Risk Assessment System'}
            </p>
          </div>

          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-black text-gray-700 ml-1 uppercase tracking-widest">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-base font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all hover:bg-white"
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-700 ml-1 uppercase tracking-widest">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-base font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all hover:bg-white"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-black text-gray-700 ml-1 uppercase tracking-widest">Password</label>
            <input
              type="password"
              required
              className="w-full bg-gray-50 border border-gray-200 rounded-2xl px-5 py-4 text-base font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all hover:bg-white"
              placeholder="••••••••"
            />
          </div>

          {!isLogin && (
            <div className="space-y-3 pt-2">
              <label className="text-xs font-black text-gray-700 ml-1 uppercase tracking-widest">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole('student')}
                  className={`p-5 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-3 ${
                    role === 'student' ? 'border-orange-500 bg-orange-50/50 text-orange-600 shadow-lg shadow-orange-100 scale-105' : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:scale-105'
                  } active:scale-95`}
                >
                  <GraduationCap size={28} className={role === 'student' ? 'text-orange-500' : 'text-gray-400'} />
                  <div className="text-xs">
                    <div className="font-black uppercase tracking-widest">Student</div>
                    <div className="text-[10px] font-bold opacity-60">Take assessments</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('mentor')}
                  className={`p-5 rounded-2xl border-2 transition-all text-center flex flex-col items-center gap-3 ${
                    role === 'mentor' ? 'border-indigo-500 bg-indigo-50/50 text-indigo-600 shadow-lg shadow-indigo-100 scale-105' : 'border-gray-100 bg-gray-50 hover:bg-white hover:border-gray-200 hover:scale-105'
                  } active:scale-95`}
                >
                  <Users size={28} className={role === 'mentor' ? 'text-indigo-500' : 'text-gray-400'} />
                  <div className="text-xs">
                    <div className="font-black uppercase tracking-widest">Mentor</div>
                    <div className="text-[10px] font-bold opacity-60">View dashboards</div>
                  </div>
                </button>
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm transition-all shadow-xl shadow-indigo-100 hover:scale-105 active:scale-95"
          >
            {isLogin ? 'Sign In Now' : 'Create My Account'}
          </button>
        </form>
      </div>
    </div>
  );
};

const BookOpen = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
);
