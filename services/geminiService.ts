import { GoogleGenAI, Type } from "@google/genai";

export const getExchangeRate = async (from: string, to: string): Promise<number | null> => {
  if (!process.env.API_KEY) {
    console.error("API key not found.");
    return null;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `What is the current exchange rate from ${from} to ${to}?`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            rate: {
              type: Type.NUMBER,
              description: 'The numeric exchange rate.',
            },
          },
          required: ['rate'],
        },
      },
    });
    
    const jsonString = response.text.trim();
    const result = JSON.parse(jsonString);
    
    if (result && typeof result.rate === 'number') {
      return result.rate;
    } else {
      console.error("Invalid response format from Gemini API:", result);
      return null;
    }
  } catch (error) {
    console.error("Error fetching exchange rate from Gemini API:", error);
    return null;
  }
};
