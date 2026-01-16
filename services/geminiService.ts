import { GoogleGenAI, Type } from "@google/genai";
import { StudentData, RiskAnalysis } from "../types";

export const generateRescuePlan = async (data: StudentData): Promise<RiskAnalysis> => {
  // Use import.meta.env for Vite instead of process.env
  const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });
  
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not defined. Please check your Netlify environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  const subjectsStr = data.subjects.map(s => `${s.name}: ${s.marks}% (Backlog: ${s.hasBacklog})`).join(', ');

  const prompt = `
    Conduct a concise but highly impactful academic intervention analysis for this engineering student.
    Name: ${data.fullName}, Roll: ${data.rollNumber}, Semester: ${data.semester}
    Attendance: ${data.attendance}%
    Detailed Performance: ${subjectsStr}
    Stress level: ${data.stressLevel}/10, Study hours: ${data.studyHours}h/day, Sleep hours: ${data.sleepHours}h/day
    
    Tier-3 college context. Provide a professional deep-dive analysis in JSON format.
  `;

  const response = await ai.models.generateContent({
    model: 'gemini-1.5-flash',
    contents: prompt,
    config: {
      systemInstruction: "You are a world-class academic performance coach. Analyze drop-risk (High/Medium/Low) and provide a concise, on-point rescue plan. 'summary' should be a single, high-impact paragraph of about 60-80 words. Subject strategies must be extremely specific. Include 'motivational_quotes' as an array of 3 objects, each with 'text' (concise and powerful) and 'icon' (choose from 'heart', 'lamp', 'sparkles').",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          risk_level: { type: Type.STRING },
          risk_score: { type: Type.NUMBER },
          summary: { type: Type.STRING },
          short_term_goals: { type: Type.ARRAY, items: { type: Type.STRING } },
          long_term_goals: { type: Type.ARRAY, items: { type: Type.STRING } },
          daily_targets: { type: Type.ARRAY, items: { type: Type.STRING } },
          mentor_recommendations: { type: Type.ARRAY, items: { type: Type.STRING } },
          motivational_quotes: { 
            type: Type.ARRAY, 
            items: { 
              type: Type.OBJECT, 
              properties: {
                text: { type: Type.STRING },
                icon: { type: Type.STRING }
              }
            } 
          },
          subject_strategies: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                name: { type: Type.STRING },
                hours: { type: Type.NUMBER },
                strategy: { type: Type.STRING },
                riskLevel: { type: Type.STRING }
              },
              required: ["name", "hours", "strategy", "riskLevel"]
            }
          }
        },
        required: ["risk_level", "risk_score", "summary", "short_term_goals", "long_term_goals", "daily_targets", "mentor_recommendations", "subject_strategies", "motivational_quotes"]
      }
    }
  });

  if (!response.text) throw new Error("No response from AI");
  return JSON.parse(response.text()) as RiskAnalysis;
};
