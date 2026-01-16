
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Auth } from './components/Auth';
import { StudentForm } from './components/StudentForm';
import { RiskDashboard } from './components/RiskDashboard';
import { MentorPortal } from './components/MentorPortal';
import { Footer } from './components/Footer';
import { Role, StudentData, RiskAnalysis } from './types';
import { generateRescuePlan } from './services/geminiService';
import { Users, Heart, Star } from 'lucide-react';

type View = 'landing' | 'auth' | 'assessment' | 'results' | 'mentor' | 'about';

const App: React.FC = () => {
  const [view, setView] = useState<View>('landing');
  const [user, setUser] = useState<{ name: string; email: string; role: Role } | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [analysis, setAnalysis] = useState<RiskAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (name: string, role: Role, email: string) => {
    setUser({ name, role, email });
    setView('landing');
  };

  const handleLogout = () => {
    setUser(null);
    setAnalysis(null);
    setView('landing');
  };

  const handleNavigate = (targetView: View) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (targetView === 'assessment' && !user) {
      setView('auth');
    } else {
      setView(targetView);
    }
  };

  const handleSubmitAssessment = async (data: StudentData) => {
    setIsLoading(true);
    setStudentData(data);
    try {
      const result = await generateRescuePlan(data);
      setAnalysis(result);
      setView('results');
    } catch (error) {
      console.error("Analysis Error:", error);
      alert("Failed to generate rescue plan. Please check your API key.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar 
        user={user} 
        onLogout={handleLogout} 
        onSignInClick={() => setView('auth')} 
        onNavigate={handleNavigate}
      />

      <main className="flex-1">
        {view === 'landing' && (
          <LandingPage 
            onStart={() => handleNavigate('assessment')} 
            onAuth={() => setView('auth')} 
          />
        )}

        {view === 'auth' && (
          <Auth onLogin={handleLogin} />
        )}

        {view === 'assessment' && (
          <div className="pt-32 pb-40">
            <div className="text-center mb-24 space-y-4 px-6">
               <h1 className="text-6xl md:text-[72px] font-extrabold text-gray-900 mb-6 tracking-tight leading-tight">
                  Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">Assessment</span>
               </h1>
               <p className="text-gray-500 font-medium text-xl leading-relaxed max-w-2xl mx-auto">Enter your academic details for AI-powered risk analysis</p>
            </div>
            
            <StudentForm 
              onSubmit={handleSubmitAssessment} 
              isLoading={isLoading} 
              initialName={user?.name}
            />

            {/* Testimonials section also appears on assessment page in screenshots */}
            <div className="mt-40 bg-gray-50/50 py-32 -mx-6 px-6">
              <div className="max-w-7xl mx-auto text-center">
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
                    <div key={i} className="bg-white p-12 rounded-[3rem] border border-gray-100 shadow-sm text-left flex flex-col justify-between space-y-10">
                      <div className="space-y-8">
                        <div className="text-orange-200">
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
                          <h4 className="text-xl font-extrabold text-gray-900 tracking-tight">{t.name}</h4>
                          <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mt-1">{t.role}</p>
                          <p className="text-xs font-bold text-orange-400 uppercase mt-1 tracking-wider">{t.org}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'mentor' && (
          <MentorPortal onLogin={() => setView('auth')} />
        )}

        {view === 'about' && (
          <div className="pt-40 pb-32 text-center space-y-16 px-6">
            <div className="space-y-8">
              <h1 className="text-6xl md:text-[72px] font-extrabold text-gray-900 tracking-tight leading-tight">About <span className="text-indigo-600">AcademicRescue</span></h1>
              <p className="max-w-3xl mx-auto text-gray-500 leading-relaxed text-xl font-medium">
                AcademicRescue is a mission-driven initiative aimed at reducing student drop-out rates in engineering colleges across India.
                By leveraging advanced AI models like Google Gemini, we provide personalized support at the scale of an entire university.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-white rounded-[4rem] p-16 border border-gray-100 shadow-2xl shadow-gray-200/50">
              <div className="flex flex-col items-center gap-10">
                <div className="inline-flex items-center gap-3 bg-indigo-50 border border-indigo-100 text-indigo-600 px-8 py-3 rounded-full text-base font-bold uppercase tracking-[0.15em]">
                  <Users size={22} /> Made by TECH YODHAS
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 text-left w-full mt-4">
                  <div className="flex items-center gap-5 p-6 rounded-3xl bg-gray-50 border border-gray-100 transition-all">
                    <div className="w-14 h-14 rounded-full bg-[#ff751f] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-100">SP</div>
                    <div>
                      <p className="text-xl font-extrabold text-gray-900">Shreyas Patankar</p>
                      <p className="text-sm font-bold text-indigo-500 uppercase tracking-widest">Team Lead</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-5 p-6 rounded-3xl bg-white border border-gray-100 hover:bg-gray-50 transition-all">
                    <div className="w-14 h-14 rounded-full bg-[#ff751f] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-100">GK</div>
                    <p className="text-xl font-extrabold text-gray-800">Gaurav Karmilkar</p>
                  </div>

                  <div className="flex items-center gap-5 p-6 rounded-3xl bg-white border border-gray-100 hover:bg-gray-50 transition-all">
                    <div className="w-14 h-14 rounded-full bg-[#ff751f] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-100">TD</div>
                    <p className="text-xl font-extrabold text-gray-800">Tanmay Dhale</p>
                  </div>

                  <div className="flex items-center gap-5 p-6 rounded-3xl bg-white border border-gray-100 hover:bg-gray-50 transition-all">
                    <div className="w-14 h-14 rounded-full bg-[#ff751f] flex items-center justify-center text-white text-xl font-black shadow-lg shadow-orange-100">KK</div>
                    <p className="text-xl font-extrabold text-gray-800">Kaushal Kakade</p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 text-gray-400 text-sm font-bold uppercase tracking-[0.2em] mt-8">
                  Built with <Heart size={18} className="text-rose-500 fill-rose-500" /> for Academic Excellence
                </div>
              </div>
            </div>

            <button 
              onClick={() => handleNavigate('landing')}
              className="text-indigo-600 font-extrabold text-lg hover:underline transition-all"
            >
              Back to Home
            </button>
          </div>
        )}

        {view === 'results' && analysis && studentData && (
          <div className="pt-24 pb-40 px-6">
            <RiskDashboard 
              analysis={analysis} 
              studentData={studentData} 
              onReset={() => handleNavigate('assessment')} 
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default App;
