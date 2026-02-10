
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getDailyReflection = async (streak: number) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a short, powerful daily Islamic spiritual reflection or an inspiring Ayat interpretation for a user currently on a ${streak}-day worship streak in Ramadan. Keep it under 200 characters. Return just the text.`,
      config: {
        systemInstruction: "You are a wise and compassionate Islamic spiritual guide. Provide uplifting, concise reminders from the Quran and Sunnah."
      }
    });
    return response.text || "Indeed, with hardship comes ease. Keep going, your journey is beautiful.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "The best of deeds are those done consistently, even if they are small.";
  }
};
