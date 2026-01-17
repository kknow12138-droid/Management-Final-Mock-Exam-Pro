
import { GoogleGenAI, Type } from "@google/genai";
import { Question, GradedQuestion } from '../types';

// Access the API key injected via build tools or environment
const apiKey = process.env.API_KEY;

export async function gradeExam(
  questions: Question[],
  userAnswers: Record<string, string>
): Promise<{ totalScore: number; feedback: string; results: GradedQuestion[] }> {
  
  if (!apiKey) {
    return {
      totalScore: 0,
      feedback: "API_KEY 未配置。请在部署平台的环境变量中添加 API_KEY。",
      results: []
    };
  }

  const ai = new GoogleGenAI({ apiKey });
  const model = "gemini-3-flash-preview";
  
  const payload = questions.map(q => ({
    id: q.id,
    type: q.type,
    content: q.content,
    suggested: q.suggestedAnswer,
    userAnswer: userAnswers[q.id] || "（未作答）",
    maxScore: q.score
  }));

  const prompt = `
    作为一名资深的管理学教授，请对以下学生的期末模拟考试答案进行评分。
    
    评分规则：
    1. 名词解释：要求核心概念准确，术语规范。
    2. 简答题：要求要点齐全，逻辑清晰。
    3. 案例分析：要求能够运用管理学理论分析实际问题，逻辑严密，建议合理。
    
    请根据参考答案给出每个题目的得分（不能超过满分）和具体评语。
    
    待评分内容：
    ${JSON.stringify(payload, null, 2)}
  `;

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            totalScore: { type: Type.NUMBER },
            summaryFeedback: { type: Type.STRING },
            details: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  questionId: { type: Type.STRING },
                  score: { type: Type.NUMBER },
                  feedback: { type: Type.STRING }
                },
                required: ["questionId", "score", "feedback"]
              }
            }
          },
          required: ["totalScore", "summaryFeedback", "details"]
        }
      }
    });

    const result = JSON.parse(response.text || '{}');
    return {
      totalScore: result.totalScore,
      feedback: result.summaryFeedback,
      results: result.details
    };
  } catch (error) {
    console.error("Grading error:", error);
    return {
      totalScore: 0,
      feedback: "评分过程中出现错误，可能是 API 调用额度已满或网络波动。",
      results: []
    };
  }
}
