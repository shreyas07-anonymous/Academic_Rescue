
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Shield, Target, Users, Clock, TrendingUp, Star, CheckCircle2, Zap } from 'lucide-react';

interface LandingPageProps {
  onStart: () => void;
  onAuth: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onStart, onAuth }) => {
  return (
    <div className="pt-24">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 text-center space-y-8 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-orange-600 px-5 py-2 rounded-full text-[14px] font-bold tracking-wide transition-transform hover:scale-105 cursor-default"
        >
          <GraduationCap size={16} /> AI-Powered Academic Support
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-[88px] font-extrabold text-gray-900 leading-[1.05] tracking-tight"
        >
          Student Drop-Risk & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Academic Rescue</span><br />System
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto text-gray-500 text-xl font-medium leading-relaxed"
        >
          Early detection of academic risks using AI analysis. Personalized rescue plans to prevent student dropouts and improve academic performance in engineering colleges.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4"
        >
          <button
            onClick={onStart}
            className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-2 hover:opacity-95 transition-all shadow-2xl shadow-indigo-200 hover:scale-110 active:scale-95 hover:-translate-y-1"
          >
            Start Assessment <ArrowRight size={22} />
          </button>
          <button
            onClick={onAuth}
            className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-12 py-5 rounded-2xl font-black text-lg hover:bg-gray-50 transition-all active:scale-95 shadow-sm hover:scale-105 hover:border-gray-300"
          >
            Sign In / Register
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="pt-20 space-y-6"
        >
          <p className="text-[13px] font-bold text-gray-400 uppercase tracking-[0.25em]">Trusted by engineering colleges across India</p>
          <div className="flex flex-wrap justify-center gap-10 md:gap-20 grayscale opacity-40 font-bold text-gray-500 text-base">
             <span className="hover:grayscale-0 hover:opacity-100 transition-all cursor-default">ABC Engineering</span>
             <span className="hover:grayscale-0 hover:opacity-100 transition-all cursor-default">XYZ Institute</span>
             <span className="hover:grayscale-0 hover:opacity-100 transition-all cursor-default">DEF College</span>
          </div>
        </motion.div>
      </div>

      {/* Stats Bar Section */}
      <div className="bg-orange-50/50 border-y border-gray-100 py-20 mb-32">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { value: '500+', label: 'Students Assessed' },
            { value: '85%', label: 'Improvement Rate' },
            { value: '50+', label: 'Colleges Onboarded' },
            { value: '24/7', label: 'AI Support' }
          ].map((stat, i) => (
            <div key={i} className="group cursor-default">
              <div className="text-5xl font-black text-indigo-600 mb-2 transition-transform group-hover:scale-110">{stat.value}</div>
              <div className="text-[13px] font-bold text-gray-400 uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Section */}
      <div className="py-24 mb-24">
        <div className="max-w-7xl mx-auto px-6 text-center">
           <h2 className="text-[56px] font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">Why Choose <span className="text-indigo-600">AcademicRescue</span>?</h2>
           <p className="text-gray-500 mb-16 max-w-2xl mx-auto font-medium text-lg leading-relaxed">Our AI-powered system helps Tier-3 engineering colleges prevent academic failures through early detection and personalized intervention.</p>
           
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {[
                { icon: Brain, title: "AI-Powered Analysis", desc: "Google Gemini analyzes attendance, marks, backlogs, and stress indicators to predict academic risk levels accurately.", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: Shield, title: "Early Detection", desc: "Identify at-risk students before academic failure occurs, enabling timely intervention and support.", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: Target, title: "Personalized Plans", desc: "Get customized rescue strategies with daily targets, subject-wise approaches, and mentor recommendations.", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: Users, title: "Mentor Dashboard", desc: "Faculty and mentors can track student progress and coordinate intervention efforts effectively.", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: Clock, title: "Real-time Insights", desc: "Instant risk assessment and rescue plan generation powered by advanced AI technology.", color: "text-indigo-600", bg: "bg-indigo-50" },
                { icon: TrendingUp, title: "Progress Tracking", desc: "Monitor improvement over time with historical data and progress analytics.", color: "text-indigo-600", bg: "bg-indigo-50" },
              ].map((f, i) => (
                <div key={i} className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group space-y-6">
                  <div className={`w-14 h-14 ${f.bg} ${f.color} rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12`}>
                    <f.icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-gray-900 tracking-tight">{f.title}</h3>
                  <p className="text-gray-500 text-[15px] leading-relaxed font-medium">{f.desc}</p>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-32 mb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[56px] font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">How It <span className="text-indigo-600">Works</span></h2>
          <p className="text-gray-500 mb-20 max-w-2xl mx-auto font-medium text-lg leading-relaxed">A simple 4-step process to identify at-risk students and provide personalized academic support.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-[2px] bg-orange-100 z-0"></div>
            {[
              { num: '01', title: "Enter Academic Data", desc: "Students input their attendance, subject-wise marks, backlogs, and self-assessment details through our simple form." },
              { num: '02', title: "AI Analysis", desc: "Google Gemini AI analyzes the data to predict risk levels and identify areas of concern with high accuracy." },
              { num: '03', title: "Get Rescue Plan", desc: "Receive a personalized academic rescue plan with daily targets, subject strategies, and mentor recommendations." },
              { num: '04', title: "Track Progress", desc: "Mentors monitor student progress and adjust intervention strategies based on improvement metrics." },
            ].map((step, i) => (
              <div key={i} className="relative z-10 space-y-8 group">
                <div className="w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-full mx-auto flex items-center justify-center text-2xl font-black shadow-xl shadow-indigo-100 ring-8 ring-white transition-transform group-hover:scale-110">
                  {step.num}
                </div>
                <div className="space-y-3">
                  <h3 className="text-xl font-extrabold text-gray-900 tracking-tight">{step.title}</h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed font-medium px-4">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-24 mb-32">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-[56px] font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">What People <span className="text-indigo-600">Say</span></h2>
          <p className="text-gray-500 mb-20 max-w-2xl mx-auto font-medium text-lg leading-relaxed">Hear from educators and students who have benefited from our AI-powered academic rescue system.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                quote: "This system helped us identify 15 at-risk students early in the semester. With timely intervention, 12 of them improved significantly.",
                name: "Dr. Priya Sharma",
                role: "HOD, Computer Science",
                org: "ABC Engineering College"
              },
              {
                quote: "The personalized rescue plan was exactly what I needed. The daily targets and subject strategies helped me clear my backlogs.",
                name: "Rahul Kumar",
                role: "Student, 6th Semester",
                org: "XYZ Institute of Technology"
              },
              {
                quote: "The mentor dashboard gives me complete visibility into student progress. It has transformed how we provide academic support.",
                name: "Prof. Anil Mehta",
                role: "Faculty Mentor",
                org: "DEF Engineering College"
              }
            ].map((t, i) => (
              <div key={i} className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm text-left flex flex-col justify-between space-y-10 transition-all hover:shadow-2xl hover:scale-105 group">
                <div className="space-y-8">
                  <div className="text-orange-200 transition-colors group-hover:text-orange-400">
                    <svg width="48" height="38" viewBox="0 0 40 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.4286 0C5.11663 0 0 5.11663 0 11.4286V32H16V11.4286C16 8.892 13.9651 6.85714 11.4286 6.85714H9.14286C9.14286 5.58986 10.165 4.57143 11.4286 4.57143C12.6921 4.57143 13.7143 5.58986 13.7143 6.85714V9.14286H18.2857V6.85714C18.2857 3.06943 15.2163 0 11.4286 0Z" fill="currentColor"/>
                      <path d="M33.1429 0C26.8309 0 21.7143 5.11663 21.7143 11.4286V32H37.7143V11.4286C37.7143 8.892 35.6794 6.85714 33.1429 6.85714H30.8571C30.8571 5.58986 31.8793 4.57143 33.1429 4.57143C34.4064 4.57143 35.4286 5.58986 35.4286 6.85714V9.14286H40V6.85714C40 3.06943 36.9306 0 33.1429 0Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-gray-600 font-medium leading-relaxed italic text-lg">"{t.quote}"</p>
                </div>
                <div className="space-y-5">
                  <div className="flex gap-1.5">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} className="fill-orange-400 text-orange-400" />)}
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-gray-900 tracking-tight">{t.name}</h4>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t.role}</p>
                    <p className="text-xs font-bold text-orange-400 uppercase mt-1 tracking-wider">{t.org}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-white rounded-[4rem] border border-gray-100 p-20 md:p-32 text-center space-y-12 relative overflow-hidden shadow-2xl shadow-gray-200/50">
          <div className="absolute top-12 left-1/2 -translate-x-1/2">
             <div className="bg-orange-50 text-orange-400 border border-orange-100 px-8 py-2.5 rounded-full text-[13px] font-black flex items-center gap-2 tracking-wide uppercase">
                <Zap size={16} /> Powered by Google Gemini AI
             </div>
          </div>
          
          <h2 className="text-6xl md:text-[88px] font-extrabold text-gray-900 tracking-tight leading-[1] mt-8">
            Ready to Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Academic Outcomes</span>?
          </h2>
          
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-xl leading-relaxed">
            Join colleges across India using AI-powered early detection to prevent academic failures and support student success.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
             <button onClick={onStart} className="w-full sm:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 hover:opacity-95 transition-all shadow-2xl shadow-indigo-100 hover:scale-110 active:scale-95 hover:-translate-y-1">
                Start Free Assessment <ArrowRight size={24} />
             </button>
             <button onClick={onAuth} className="w-full sm:w-auto bg-white text-gray-700 border border-gray-200 px-12 py-6 rounded-2xl font-black text-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm hover:scale-105 hover:border-gray-300">
                Create Account
             </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-10 pt-6">
             <div className="flex items-center gap-2.5 text-[12px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors cursor-default">
                <CheckCircle2 size={16} className="text-indigo-600" /> No credit card required
             </div>
             <div className="flex items-center gap-2.5 text-[12px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors cursor-default">
                <CheckCircle2 size={16} className="text-indigo-600" /> Instant AI analysis
             </div>
             <div className="flex items-center gap-2.5 text-[12px] font-black text-gray-400 uppercase tracking-widest hover:text-indigo-600 transition-colors cursor-default">
                <CheckCircle2 size={16} className="text-indigo-600" /> Personalized rescue plans
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const GraduationCap = ({ size, className }: { size: number; className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
);
