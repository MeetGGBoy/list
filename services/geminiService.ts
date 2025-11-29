import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
// Initialize only if key is present to avoid errors in environments without keys set yet
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const generateCreativeDescription = async (title: string, category: string): Promise<string> => {
  if (!ai) {
    console.warn("Gemini API Key missing");
    return "API Key 缺失，请手动输入描述。";
  }

  try {
    const prompt = `为名为 "${title}" (分类: ${category}) 的数字素材写一段简短、吸引人且专业的中文描述（最多 40 字）。该素材供艺术家用于原创角色 (OC) 创作。`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });

    return response.text?.trim() || "无法生成描述。";
  } catch (error) {
    console.error("Gemini generation error:", error);
    return "暂时无法生成描述。";
  }
};