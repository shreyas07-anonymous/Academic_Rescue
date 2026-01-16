
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, BookOpen, Brain, ArrowRight, Trash2, Plus, CheckCircle2 } from 'lucide-react';
import { StudentData, SubjectMarks } from '../types';

interface StudentFormProps {
  onSubmit: (data: StudentData) => Promise<void>;
  isLoading: boolean;
  initialName?: string;
}

export const StudentForm: React.FC<StudentFormProps> = ({ onSubmit, isLoading, initialName }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StudentData>({
    fullName: initialName || '',
    rollNumber: '',
    semester: 3,
    attendance: 75,
    subjects: [
      { name: 'Mathematics', marks: 26, hasBacklog: true },
      { name: 'Physics', marks: 83, hasBacklog: false },
      { name: 'Programming', marks: 85, hasBacklog: false },
    ],
    stressLevel: 8,
    studyHours: 6,
    sleepHours: 7,
  });

  const handleNext = () => setStep((s) => s + 1);
  const handleBack = () => setStep((s) => s - 1);

  const addSubject = () => {
    setFormData({
      ...formData,
      subjects: [...formData.subjects, { name: '', marks: 50, hasBacklog: false }]
    });
  };

  const removeSubject = (index: number) => {
    const newSubjects = [...formData.subjects];
    newSubjects.splice(index, 1);
    setFormData({ ...formData, subjects: newSubjects });
  };

  const updateSubject = (index: number, updates: Partial<SubjectMarks>) => {
    const newSubjects = [...formData.subjects];
    newSubjects[index] = { ...newSubjects[index], ...updates };
    setFormData({ ...formData, subjects: newSubjects });
  };

  const avgMarks = Math.round(
    formData.subjects.reduce((acc, s) => acc + s.marks, 0) / (formData.subjects.length || 1)
  );
  const backlogs = formData.subjects.filter(s => s.hasBacklog).length;

  const getRangeBackground = (val: number, max: number) => {
    const percentage = (val / max) * 100;
    return {
      backgroundImage: `linear-gradient(to right, #f97316 ${percentage}%, #525252 ${percentage}%)`
    };
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white">
                <User size={20} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-800">Basic Information</h3>
                <p className="text-gray-400 text-[11px] font-medium">Your personal details</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="Enter your name"
                  className="w-full bg-[#f1f1f1] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 transition-all placeholder:text-gray-400 hover:bg-white"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[13px] font-bold text-gray-700">Roll Number</label>
                <input
                  type="text"
                  value={formData.rollNumber}
                  onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                  className="w-full bg-[#f1f1f1] border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/20 transition-all placeholder:text-gray-400 hover:bg-white"
                  placeholder="e.g., 21CS101"
                />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center text-[13px] font-bold text-gray-800">
                 <span>Current Semester: {formData.semester}</span>
              </div>
              <input
                type="range"
                min="1"
                max="8"
                step="1"
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: parseInt(e.target.value) })}
                className="w-full cursor-pointer h-[5px] rounded-lg appearance-none bg-[#525252]"
                style={getRangeBackground(formData.semester - 1, 7)}
              />
              <div className="flex justify-between text-[11px] text-gray-500 font-bold px-1">
                 <span>1st</span>
                 <span>8th</span>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                 <span className="text-[13px] font-bold text-gray-800">Attendance Percentage</span>
                 <span className={`text-[13px] font-bold ${formData.attendance < 75 ? 'text-[#f43f5e]' : 'text-[#10b981]'}`}>{formData.attendance}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value={formData.attendance}
                onChange={(e) => setFormData({ ...formData, attendance: parseInt(e.target.value) })}
                className="w-full cursor-pointer h-[5px] rounded-lg appearance-none bg-[#525252]"
                style={getRangeBackground(formData.attendance, 100)}
              />
            </div>
          </motion.div>
        );
      case 2:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white">
                <BookOpen size={20} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-800">Subject-wise Performance</h3>
                <p className="text-gray-400 text-[11px] font-medium">Enter marks for each subject</p>
              </div>
            </div>

            <div className="bg-[#cacaca] rounded-xl p-6 flex justify-around items-center border border-gray-100 shadow-inner">
               <div className="text-center">
                  <div className={`text-2xl font-black transition-colors ${avgMarks < 50 ? 'text-[#f43f5e]' : 'text-[#10b981]'}`}>{avgMarks}%</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Average Marks</div>
               </div>
               <div className="text-center">
                  <div className={`text-2xl font-black transition-colors ${backlogs > 0 ? 'text-[#f43f5e]' : 'text-[#10b981]'}`}>{backlogs}</div>
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Backlogs</div>
               </div>
            </div>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {formData.subjects.map((s, idx) => (
                <div key={idx} className={`bg-white border rounded-xl p-5 space-y-4 shadow-sm relative transition-all hover:shadow-md ${s.marks < 50 || s.hasBacklog ? 'border-rose-300 bg-rose-50/10' : 'border-gray-200'}`}>
                  <button onClick={() => removeSubject(idx)} className="absolute top-5 right-5 text-gray-400 hover:text-rose-600 transition-all hover:scale-125">
                    <Trash2 size={16} />
                  </button>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold text-gray-600">Subject Name</label>
                      <input
                        type="text"
                        value={s.name}
                        onChange={(e) => updateSubject(idx, { name: e.target.value })}
                        className="w-full bg-[#f1f1f1] border border-gray-100 rounded-xl px-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/10 hover:bg-white transition-all"
                        placeholder="e.g. Mathematics"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center text-[11px] font-bold uppercase tracking-wider">
                         <span className="text-gray-600">Obtained Marks</span>
                         <span className={s.marks < 50 ? 'text-[#f43f5e] font-black' : 'text-[#10b981]'}>{s.marks}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={s.marks}
                        onChange={(e) => updateSubject(idx, { marks: parseInt(e.target.value) })}
                        className="w-full cursor-pointer h-[5px] rounded-lg appearance-none bg-[#525252]"
                        style={getRangeBackground(s.marks, 100)}
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 cursor-pointer select-none group">
                     {s.hasBacklog ? (
                       <div 
                         onClick={() => updateSubject(idx, { hasBacklog: false })}
                         className="flex items-center gap-2 transition-transform hover:scale-105"
                       >
                         <div className="w-4 h-4 rounded-full bg-[#f97316] flex items-center justify-center shadow-sm">
                            <CheckCircle2 size={12} className="text-white" />
                         </div>
                         <span className="text-[11px] font-black text-[#f43f5e]">This subject has a backlog</span>
                       </div>
                     ) : (
                       <div 
                         onClick={() => updateSubject(idx, { hasBacklog: true })}
                         className="flex items-center gap-2 transition-transform hover:scale-105"
                       >
                         <div className="w-4 h-4 rounded-full border border-[#f97316]"></div>
                         <span className="text-[11px] font-bold text-gray-700">This subject has a backlog</span>
                       </div>
                     )}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addSubject}
              className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 font-bold text-[11px] flex items-center justify-center gap-2 hover:bg-indigo-50 hover:border-indigo-300 hover:text-indigo-600 transition-all hover:scale-[1.01] active:scale-[0.98]"
            >
              <Plus size={14} /> Add Another Subject
            </button>
          </motion.div>
        );
      case 3:
        return (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#7c3aed] rounded-xl flex items-center justify-center text-white">
                <Brain size={20} />
              </div>
              <div>
                <h3 className="text-[14px] font-bold text-gray-800">Self Assessment</h3>
                <p className="text-gray-400 text-[11px] font-medium">Your wellbeing indicators</p>
              </div>
            </div>

            <div className="space-y-6 bg-gray-100/40 p-6 rounded-2xl border border-gray-200">
              <div className="space-y-3">
                <div className="flex justify-between items-center text-[13px] font-bold text-gray-800">
                   <span>Stress Level</span>
                   <span className="text-xs font-bold text-rose-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">{formData.stressLevel}/10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.stressLevel}
                  onChange={(e) => setFormData({ ...formData, stressLevel: parseInt(e.target.value) })}
                  className="w-full cursor-pointer h-[5px] rounded-lg appearance-none bg-[#525252]"
                  style={getRangeBackground(formData.stressLevel - 1, 9)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[13px] font-bold text-gray-800">
                   <span>Daily Study Hours</span>
                   <span className="text-indigo-600 font-bold">{formData.studyHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="16"
                  value={formData.studyHours}
                  onChange={(e) => setFormData({ ...formData, studyHours: parseInt(e.target.value) })}
                  className="w-full cursor-pointer h-[5px] rounded-lg appearance-none bg-[#525252]"
                  style={getRangeBackground(formData.studyHours, 16)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center text-[13px] font-bold text-gray-800">
                   <span>Daily Sleep Hours</span>
                   <span className="text-emerald-500 font-bold">{formData.sleepHours} hrs</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="12"
                  value={formData.sleepHours}
                  onChange={(e) => setFormData({ ...formData, sleepHours: parseInt(e.target.value) })}
                  className="w-full cursor-pointer h-[5px] rounded-lg appearance-none bg-[#525252]"
                  style={getRangeBackground(formData.sleepHours, 12)}
                />
              </div>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-4">
      <div className="bg-white rounded-[1rem] shadow-xl overflow-hidden border border-gray-100 flex flex-col min-h-[500px]">
        {/* Header Progress */}
        <div className="bg-[#cacaca] p-6 flex justify-between items-center">
           <div>
              <h2 className="text-[15px] font-bold text-gray-800">Assessment Form</h2>
              <p className="text-[11px] font-medium text-gray-500">Step {step} of 3</p>
           </div>
           <div className="flex gap-2">
              {[1, 2, 3].map(s => (
                <div key={s} className={`h-1.5 w-6 rounded-full transition-all duration-300 ${s <= step ? 'bg-[#7c3aed]' : 'bg-[#cacaca] border border-gray-400'}`} />
              ))}
           </div>
        </div>

        {/* Content */}
        <div className="p-10 flex-1">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </div>

        {/* Footer buttons with strong hover effects */}
        <div className="p-8 pt-4 flex justify-between items-center border-t border-gray-50 bg-gray-50/20">
          <button
            onClick={handleBack}
            disabled={step === 1 || isLoading}
            className={`px-6 py-2 rounded-lg font-bold text-[13px] transition-all border ${
                step === 1 ? 'border-transparent text-transparent pointer-events-none' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-100 hover:scale-105 active:scale-95 hover:shadow-sm'
            }`}
          >
            Previous
          </button>
          
          <button
            onClick={step < 3 ? handleNext : () => onSubmit(formData)}
            disabled={isLoading}
            className="px-8 py-2.5 bg-[#f9a825] hover:bg-orange-500 text-white rounded-lg font-bold text-[13px] transition-all flex items-center gap-2 hover:scale-105 active:scale-95 shadow-md hover:shadow-lg"
          >
            {isLoading ? 'Analyzing...' : step < 3 ? 'Next' : 'Analyze Risk'} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
