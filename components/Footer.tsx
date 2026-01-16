
import React from 'react';
import { GraduationCap, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        <div className="space-y-6">
          <div className="flex items-center gap-2 group cursor-pointer transition-transform hover:scale-105 active:scale-95">
            <div className="bg-indigo-600 p-1.5 rounded-lg transition-transform group-hover:rotate-6">
              <GraduationCap className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition-colors">AcademicRescue</span>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            AI-powered student support system for early risk detection and personalized academic rescue planning.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Quick Links</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-500">
            <li><button className="hover:text-indigo-600 transition-all hover:translate-x-1 active:scale-95">Home</button></li>
            <li><button className="hover:text-indigo-600 transition-all hover:translate-x-1 active:scale-95">Assessment</button></li>
            <li><button className="hover:text-indigo-600 transition-all hover:translate-x-1 active:scale-95">For Mentors</button></li>
            <li><button className="hover:text-indigo-600 transition-all hover:translate-x-1 active:scale-95">About Us</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Resources</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-500">
            <li><button className="hover:text-indigo-600 transition-all hover:translate-x-1 active:scale-95">Documentation</button></li>
            <li><button className="hover:text-indigo-600 transition-all hover:translate-x-1 active:scale-95">Student Guide</button></li>
            <li><button className="hover:text-indigo-600 transition-all hover:translate-x-1 active:scale-95">Mentor Portal</button></li>
            <li><button className="hover:text-indigo-600 transition-all hover:translate-x-1 active:scale-95">FAQ</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-gray-900 mb-6 uppercase text-xs tracking-widest">Contact</h4>
          <ul className="space-y-4 text-sm font-medium text-gray-500">
            <li className="flex items-center gap-3 group cursor-pointer transition-all hover:text-indigo-600">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center transition-transform group-hover:scale-110">
                <Mail size={16} className="text-orange-400" />
              </div>
              <span className="transition-all group-hover:translate-x-1">support@academicrescue.edu</span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer transition-all hover:text-indigo-600">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center transition-transform group-hover:scale-110">
                <Phone size={16} className="text-orange-400" />
              </div>
              <span className="transition-all group-hover:translate-x-1">+91 1234 567 890</span>
            </li>
            <li className="flex items-center gap-3 group cursor-pointer transition-all hover:text-indigo-600">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center transition-transform group-hover:scale-110">
                <MapPin size={16} className="text-orange-400" />
              </div>
              <span className="transition-all group-hover:translate-x-1">Engineering College Campus</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-10 border-t border-gray-50 text-center">
        <p className="text-gray-400 text-xs font-medium">
          © 2025 Academic Rescue System. Built for Tier-3 Engineering Colleges.
        </p>
      </div>
    </footer>
  );
};
