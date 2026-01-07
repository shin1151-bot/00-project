
import { GoogleGenAI } from "@google/genai";
import { Product } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getAiCuration = async (product: Product): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `당신은 프리미엄 신선식품 쇼핑몰의 전문 큐레이터입니다. 
      다음 상품에 대해 고객의 구매 욕구를 자극하는 세련되고 감성적인 '큐레이터의 한마디'를 3줄 이내로 작성해주세요.
      상품명: ${product.name}
      설명: ${product.description}
      태그: ${product.tags.join(', ')}`,
      config: {
        temperature: 0.7,
        maxOutputTokens: 200,
      }
    });
    return response.text || "신선한 즐거움을 집 앞까지 배달해 드립니다.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "엄격한 기준으로 선별한 프리미엄 상품입니다.";
  }
};

export const searchWithAi = async (query: string, allProducts: Product[]): Promise<{ suggestedProducts: string[], message: string }> => {
  try {
    const productList = allProducts.map(p => `${p.id}: ${p.name} (${p.category})`).join('\n');
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `당신은 똑똑한 쇼핑 도우미입니다. 사용자의 질문을 분석하여 가장 적합한 상품 리스트를 추천하고 짧은 조언을 해주세요.
      사용자 질문: "${query}"
      
      가용한 상품 리스트:
      ${productList}
      
      JSON 형식으로 응답하세요:
      {
        "suggestedIds": ["아이디1", "아이디2"],
        "message": "사용자에게 할 조언 (예: 비 오는 날에는 따뜻한 밀키트가 제격이죠!)"
      }`,
      config: {
        responseMimeType: "application/json",
      }
    });
    
    const result = JSON.parse(response.text || '{}');
    return {
      suggestedProducts: result.suggestedIds || [],
      message: result.message || "검색 결과를 확인해보세요."
    };
  } catch (error) {
    console.error("AI Search Error:", error);
    return { suggestedProducts: [], message: "검색 결과를 불러오는 중입니다." };
  }
};
