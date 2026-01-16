export interface Subject {
  name: string;
  marks: number;
  hasBacklog: boolean;
}

export interface StudentData {
  fullName: string;
  rollNumber: string;
  semester: string;
  attendance: number;
  subjects: Subject[];
  stressLevel: number;
  studyHours: number;
  sleepHours: number;
}

export interface RiskAnalysis {
  risk_level: 'High' | 'Medium' | 'Low';
  risk_score: number;
  summary: string;
  short_term_goals: string[];
  long_term_goals: string[];
  daily_targets: string[];
  mentor_recommendations: string[];
  motivational_quotes: { text: string; icon: string }[];
  subject_strategies: {
    name: string;
    hours: number;
    strategy: string;
    riskLevel: string;
  }[];
}
