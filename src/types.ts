
export type Role = 'student' | 'mentor';

export interface User {
  id: string;
  email: string;
  full_name: string;
  role: Role;
}

export interface SubjectMarks {
  name: string;
  marks: number;
  hasBacklog: boolean;
}

export interface StudentData {
  fullName: string;
  rollNumber: string;
  semester: number;
  attendance: number;
  subjects: SubjectMarks[];
  stressLevel: number;
  studyHours: number;
  sleepHours: number;
}

export interface SubjectStrategy {
  name: string;
  hours: number;
  strategy: string;
  riskLevel: 'High' | 'Medium' | 'Low';
}

export interface MotivationalQuote {
  text: string;
  icon: 'heart' | 'lamp' | 'sparkles';
}

export interface RiskAnalysis {
  risk_level: 'High' | 'Medium' | 'Low';
  risk_score: number;
  summary: string;
  short_term_goals: string[];
  long_term_goals: string[];
  daily_targets: string[];
  mentor_recommendations: string[];
  subject_strategies: SubjectStrategy[];
  motivational_quotes: MotivationalQuote[];
}
