
import { GoogleGenAI, Type } from "@google/genai";
import { RecommendationResponse } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getSongRecommendations = async (preference: string): Promise<RecommendationResponse> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `사용자의 선호도 "${preference}"를 바탕으로 현재 한국에서 인기 있거나 숨겨진 명곡 K-POP 10곡을 추천해줘.`,
    config: {
      systemInstruction: "당신은 세계적인 K-POP 큐레이터입니다. 사용자의 취향에 딱 맞는 10곡의 노래를 선정하세요. 각 노래의 제목, 아티스트, 추천 이유, 그리고 곡의 분위기(vibe)를 포함해야 합니다. 답변은 반드시 한국어로 작성하세요.",
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          recommendations: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                songTitle: { type: Type.STRING },
                artist: { type: Type.STRING },
                reason: { type: Type.STRING },
                vibe: { type: Type.STRING }
              },
              required: ["songTitle", "artist", "reason", "vibe"]
            }
          }
        },
        required: ["recommendations"]
      }
    }
  });

  try {
    return JSON.parse(response.text) as RecommendationResponse;
  } catch (e) {
    console.error("Failed to parse recommendations", e);
    return { recommendations: [] };
  }
};

export const getTrendSummary = async (): Promise<string> => {
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: "2025년 12월 시점을 기준으로, 한국 아이돌 시장의 가장 뜨거운 트렌드 3가지를 예측하거나 현재 흐름을 반영하여 짧은 문장으로 요약해줘.",
    config: {
      systemInstruction: "K-POP 트렌드 분석가로서 2025년 12월의 미래적 시점(또는 해당 시기의 트렌드 전망)을 가정하여 아주 간결하고 명확하게 핵심만 전달하세요. 마크다운 형식을 사용하세요."
    }
  });
  return response.text || "트렌드 정보를 불러올 수 없습니다.";
};
