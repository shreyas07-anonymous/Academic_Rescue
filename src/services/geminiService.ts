import { GoogleGenAI, Type } from "@google/genai";
import { StudentData, RiskAnalysis } from "../types";

export const generateRescuePlan = async (data: StudentData): Promise<RiskAnalysis> => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  
  if (!apiKey) {
    throw new Error("API Key (VITE_GEMINI_API_KEY) is missing in Netlify settings.");
  }

  const genAI = new GoogleGenAI(apiKey);
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const subjectsStr = data.subjects.map(s => `${s.name}: ${s.marks}% (Backlog: ${s.hasBacklog})`).join(', ');

  const prompt = `
    Analyze this engineering student's academic risk.
    Name: ${data.fullName}, Roll: ${data.rollNumber}, Semester: ${data.semester}, Attendance: ${data.attendance}%
    Detailed Performance: ${subjectsStr}
    Stress level: ${data.stressLevel}/10, Study hours: ${data.studyHours}h/day, Sleep hours: ${data.sleepHours}h/day
    Provide a professional deep-dive analysis in JSON format.
  `;

  const result = await model.generateContent({
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    generationConfig: {
      responseMimeType: "application/json",
    }
  });

  const response = await result.response;
  return JSON.parse(response.text()) as RiskAnalysis;
};
