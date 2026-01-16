
import React from 'react';
import { motion } from 'framer-motion';
import { 
  AlertTriangle, 
  Target, 
  Zap, 
  Users, 
  ArrowRight, 
  ArrowLeft, 
  Clock, 
  BookOpen, 
  Flag,
  CheckCircle2,
  Download,
  Brain,
  Heart,
  Lightbulb,
  Sparkles
} from 'lucide-react';
import { RiskAnalysis, StudentData, MotivationalQuote } from '../types';

interface RiskDashboardProps {
  analysis: RiskAnalysis;
  studentData: StudentData;
  onReset: () => void;
}

declare var html2pdf: any;

export const RiskDashboard: React.FC<RiskDashboardProps> = ({ analysis, studentData, onReset }) => {
  const isHigh = analysis.risk_level === 'High';
  const isMed = analysis.risk_level === 'Medium';
  
  const riskColor = isHigh ? 'bg-[#f43f5e]' : isMed ? 'bg-[#f59e0b]' : 'bg-[#10b981]';
  const riskLabel = isHigh ? 'Immediate intervention required' : isMed ? 'Preventive measures needed' : 'Maintaining good standing';

  const handleExportPDF = () => {
    const element = document.getElementById('assessment-result');
    if (!element) return;

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const opt = {
      margin: 10,
      filename: `Assessment_Result_${timestamp}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Use the global html2pdf from the CDN
    if (typeof html2pdf !== 'undefined') {
      html2pdf().set(opt).from(element).save();
    } else {
      console.error('html2pdf library not loaded');
      // Fallback to window.print() if library fails to load
      window.print();
    }
  };

  const QuoteIcon = ({ type }: { type: MotivationalQuote['icon'] }) => {
    switch (type) {
      case 'heart': return <Heart size={20} className="text-[#f43f5e]" />;
      case 'lamp': return <Lightbulb size={20} className="text-[#f59e0b]" />;
      case 'sparkles': return <Sparkles size={20} className="text-[#a855f7]" />;
      default: return <Sparkles size={20} className="text-gray-400" />;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="max-w-7xl mx-auto space-y-12 pb-24 px-6 print:p-0 print:space-y-6"
    >
      {/* Action Buttons Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 print:hidden">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#fef3c7] border border-[#fde68a] text-[#d97706] px-4 py-1.5 rounded-full text-[12px] font-bold">
            <CheckCircle2 size={14} /> Analysis Complete
          </div>
          <h1 className="text-6xl font-black text-gray-900 tracking-tight leading-tight">
            Your <span className="text-[#7c3aed]">Results</span>
          </h1>
          <p className="text-gray-500 font-medium text-lg max-w-lg leading-relaxed">
            AI-generated risk assessment and personalized rescue plan tailored just for you
          </p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={onReset}
            className="flex items-center gap-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-all hover:scale-110 hover:-translate-y-1 active:scale-90 shadow-sm hover:shadow-md"
          >
            <ArrowLeft size={16} /> New Assessment
          </button>
          <button 
            id="export-btn"
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-8 py-3 bg-[#7c3aed] hover:bg-[#6d28d9] text-white rounded-xl font-bold text-sm transition-all hover:scale-110 hover:-translate-y-1 active:scale-90 shadow-lg shadow-indigo-100 hover:shadow-indigo-200"
          >
            <Download size={16} /> Export PDF
          </button>
        </div>
      </div>

      {/* Target Content Div for PDF Export */}
      <div id="assessment-result" className="space-y-12 bg-[#f3f4f6] p-4 rounded-3xl">
        <div className="flex justify-center print:hidden">
           <div className="bg-[#fff7ed] border border-[#ffedd5] text-[#f97316] px-8 py-3 rounded-full text-[13px] font-bold inline-flex items-center gap-2 shadow-sm transition-transform hover:scale-105">
              <Brain size={20} /> Powered by Google Gemini AI <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
           </div>
        </div>

        {/* Hero Risk Card */}
        <div className={`${riskColor} rounded-[2rem] p-12 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-2xl transition-transform hover:scale-[1.01] hover:brightness-105 group`}>
           <div className="flex items-center gap-8 z-10">
              <div className="w-24 h-24 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-xl transition-transform group-hover:rotate-6">
                 <AlertTriangle size={48} />
              </div>
              <div className="space-y-1">
                 <h2 className="text-5xl font-black tracking-tight">{analysis.risk_level} Risk</h2>
                 <p className="text-white/90 font-bold text-xl">{riskLabel}</p>
              </div>
           </div>
           <div className="mt-8 md:mt-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 text-center min-w-[160px] z-10 transition-all group-hover:bg-white/20">
              <div className="text-7xl font-black leading-none">{analysis.risk_score}</div>
              <div className="text-[12px] font-black uppercase tracking-widest mt-2 opacity-80 flex items-center justify-center gap-1">
                 <ArrowRight size={14} className="-rotate-45" /> Risk Score
              </div>
           </div>
           <div className="absolute right-[-10%] top-[-20%] w-[300px] h-[300px] bg-white/5 rounded-full blur-[80px]"></div>
        </div>

        {/* Summary Box */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-[#d97706]">
            <Brain size={24} />
            <h3 className="text-sm font-black uppercase tracking-widest">AI Assessment Summary</h3>
          </div>
          <div className="bg-[#e5e7eb]/80 backdrop-blur-sm rounded-[2rem] p-10 md:p-14 relative border border-gray-200 shadow-inner transition-all hover:shadow-lg hover:bg-gray-200/50">
             <div className="absolute top-10 left-10 text-[#d97706] opacity-30">
                <Sparkles size={32} />
             </div>
             <p className="text-gray-700 italic font-bold leading-relaxed text-xl max-w-4xl mx-auto text-center relative z-10">
               "{analysis.summary}"
             </p>
          </div>
        </div>

        {/* Rescue Plan Section */}
        <div className="space-y-10 pt-10">
           <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#7c3aed] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                 <Target size={28} />
              </div>
              <div>
                 <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none">Your Rescue Plan</h2>
                 <p className="text-gray-500 font-bold text-lg mt-2 tracking-tight">Step-by-step guidance to improve your academic performance</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <GoalCard 
                icon={Flag} 
                title="Short-term Goals" 
                subtitle="Next 2 weeks" 
                items={analysis.short_term_goals} 
                color="indigo" 
              />
              <GoalCard 
                icon={Target} 
                title="Long-term Goals" 
                subtitle="This semester" 
                items={analysis.long_term_goals} 
                color="orange" 
              />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-[#e5e7eb]/60 rounded-[2.5rem] p-10 border border-gray-200 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#f9a825] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">Daily Targets</h3>
                 </div>
                 <div className="space-y-5">
                    {analysis.daily_targets.map((target, idx) => (
                      <div key={idx} className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:scale-[1.03] hover:shadow-md">
                         <div className="w-9 h-9 bg-[#7c3aed] text-white rounded-xl flex-shrink-0 flex items-center justify-center font-black text-sm shadow-md">{idx + 1}</div>
                         <p className="text-gray-700 font-bold text-base leading-relaxed">{target}</p>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-[#e5e7eb]/60 rounded-[2.5rem] p-10 border border-gray-200 shadow-sm transition-all hover:scale-[1.02] hover:shadow-md">
                 <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-[#f9a825] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-orange-100">
                      <Users size={24} />
                    </div>
                    <h3 className="text-2xl font-black text-gray-800 tracking-tight">Mentor Recommendations</h3>
                 </div>
                 <div className="space-y-5">
                    {analysis.mentor_recommendations.map((rec, idx) => (
                      <div key={idx} className="flex items-start gap-5 p-6 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:scale-[1.03] hover:shadow-md">
                         <div className="w-2.5 h-2.5 rounded-full bg-[#7c3aed] mt-2 flex-shrink-0 shadow-sm"></div>
                         <p className="text-gray-700 font-bold text-base leading-relaxed">{rec}</p>
                      </div>
                    ))}
                 </div>
              </div>
           </div>
        </div>

        {/* Strategies Section */}
        <div className="space-y-8 pt-10">
           <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-[#7c3aed] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                 <BookOpen size={28} />
              </div>
              <div>
                 <h2 className="text-4xl font-black text-gray-900 tracking-tight leading-none">Subject-Wise Strategies</h2>
                 <p className="text-gray-500 font-bold text-lg mt-2 tracking-tight">Personalized study plans for each subject</p>
              </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {analysis.subject_strategies.map((strat, i) => (
                <StrategyCard key={i} {...strat} />
              ))}
           </div>
        </div>

        {/* Stay Motivated Section */}
        <div className="space-y-8 pt-10">
           <div className="bg-white rounded-[2.5rem] p-12 border border-gray-100 shadow-sm relative overflow-hidden transition-all hover:shadow-xl">
              <div className="flex items-center gap-5 mb-10">
                 <div className="w-14 h-14 bg-[#7c3aed] text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-100">
                    <Sparkles size={28} />
                 </div>
                 <div>
                    <h3 className="text-3xl font-black text-gray-900 tracking-tight">Stay Motivated</h3>
                    <p className="text-gray-400 font-bold text-sm uppercase tracking-widest mt-1">Daily inspiration to keep you going</p>
                 </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {analysis.motivational_quotes.map((quote, i) => (
                   <div key={i} className="bg-[#fff7ed] rounded-[2rem] p-8 border border-[#ffedd5] flex flex-col justify-between shadow-sm hover:shadow-2xl transition-all hover:-translate-y-2 group">
                      <p className="text-gray-800 font-bold text-lg italic leading-relaxed">
                        "{quote.text}"
                      </p>
                      <div className="flex justify-end mt-8">
                         <div className="p-3 bg-white rounded-2xl shadow-sm group-hover:scale-110 transition-transform">
                            <QuoteIcon type={quote.icon} />
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="text-center py-20 space-y-10 print:hidden">
        <h2 className="text-[56px] font-black text-gray-900 tracking-tight leading-tight">
          What People <span className="text-[#7c3aed]">Say</span>
        </h2>
        <p className="text-gray-500 font-bold text-xl max-w-2xl mx-auto leading-relaxed">
          Hear from educators and students who have benefited from our AI-powered academic rescue system.
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media print {
          body { background-color: white !important; -webkit-print-color-adjust: exact; }
          .max-w-7xl { max-width: 100% !important; margin: 0 !important; }
          .print\\:hidden { display: none !important; }
          .shadow-2xl, .shadow-xl, .shadow-lg, .shadow-md, .shadow-sm, .shadow-inner { box-shadow: none !important; }
          button { display: none !important; }
          nav, footer { display: none !important; }
        }
      `}} />
    </motion.div>
  );
};

const GoalCard = ({ icon: Icon, title, subtitle, items, color }: any) => {
  const borderCol = color === 'indigo' ? 'border-[#7c3aed]' : 'border-[#f9a825]';
  const iconBg = color === 'indigo' ? 'bg-[#7c3aed]' : 'bg-[#f9a825]';

  return (
    <div className={`bg-[#fff7ed] rounded-[2.5rem] p-10 border-l-[12px] ${borderCol} shadow-sm space-y-8 transition-all hover:scale-[1.02] hover:shadow-xl`}>
       <div className="flex items-center gap-5">
          <div className={`w-14 h-14 ${iconBg} rounded-2xl flex items-center justify-center text-white shadow-xl`}>
             <Icon size={28} />
          </div>
          <div>
             <h3 className="text-3xl font-black text-gray-800 tracking-tight">{title}</h3>
             <p className="text-xs font-black text-gray-400 uppercase tracking-[0.2em] mt-1">{subtitle}</p>
          </div>
       </div>
       <div className="space-y-5">
          {items.map((it: string, idx: number) => (
            <div key={idx} className="bg-white p-6 rounded-2xl flex items-start gap-5 border border-gray-100 shadow-sm transition-all hover:bg-gray-50/50 hover:scale-[1.03]">
               <div className={`w-9 h-9 ${iconBg} text-white rounded-full flex-shrink-0 flex items-center justify-center shadow-md`}>
                  <ArrowRight size={20} />
               </div>
               <p className="text-gray-700 font-bold text-base leading-relaxed">{it}</p>
            </div>
          ))}
       </div>
    </div>
  );
};

const StrategyCard = ({ name, hours, strategy, riskLevel }: any) => {
  const isH = riskLevel === 'High';
  const isM = riskLevel === 'Medium';
  const borderColor = isH ? 'border-[#f43f5e]' : isM ? 'border-[#f59e0b]' : 'border-[#10b981]';
  const riskBadgeCol = isH ? 'bg-rose-50 text-rose-500 border-rose-100' : isM ? 'bg-orange-50 text-orange-500 border-orange-100' : 'bg-emerald-50 text-emerald-500 border-emerald-100';

  return (
    <div className={`bg-white rounded-[2.5rem] p-12 border-t-[10px] border ${borderColor} shadow-sm space-y-6 transition-all hover:shadow-2xl hover:-translate-y-2 cursor-default group`}>
       <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
             <div className={`w-12 h-12 rounded-2xl ${isH ? 'bg-rose-50 text-rose-500' : 'bg-orange-50 text-[#f59e0b]'} flex items-center justify-center shadow-sm transition-transform group-hover:scale-110`}>
                <Zap size={24} />
             </div>
             <h4 className="text-3xl font-black text-gray-900 tracking-tight">{name}</h4>
          </div>
          <div className={`px-5 py-2 rounded-full text-[11px] font-black uppercase tracking-[0.2em] border ${riskBadgeCol}`}>{riskLevel}</div>
       </div>
       <div className="flex items-center gap-3 text-[#f43f5e] text-lg font-black uppercase tracking-wider transition-transform group-hover:translate-x-1">
          <Clock size={22} /> {hours} hours / week
       </div>
       <p className="text-gray-600 text-lg leading-relaxed font-bold">{strategy}</p>
    </div>
  );
};
