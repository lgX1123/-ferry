import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 确保 GEMINI_API_KEY 存在
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is not defined in environment variables');
}

// 在服务器端初始化 Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// 模拟您原来的 geminiService 中的函数
// 注意：这里的实现是基于您原始代码的推断，您需要根据实际的 geminiService.ts 进行调整
async function generateAnalysis(resumeText: string, targetMajor: string, targetUni: string) {
  // ... 这里是您调用 Gemini 生成分析和介绍的逻辑 ...
  // 例如: const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  // const result = await model.generateContent(...)
  // return analysisData;
  console.log("Generating analysis for:", { resumeText, targetMajor, targetUni });
  // 返回模拟数据以便演示
  return { id: 'analysis-123', summary: 'This is a mock analysis.', intros: [] };
}

async function generateQuestions(resumeText: string, targetMajor: string, targetUni: string) {
  // ... 这里是您调用 Gemini 生成问题的逻辑 ...
  console.log("Generating questions for:", { resumeText, targetMajor, targetUni });
  // 返回模拟数据以便演示
  return [{ id: 'q-1', text: 'Tell me about yourself.', isFavorite: false, userNotes: '', practiceCount: 0 }];
}

export async function POST(req: NextRequest) {
  try {
    const { resumeText, targetMajor, targetUni } = await req.json();

    // Basic validation
    if (!resumeText || !targetMajor || !targetUni) {
      return NextResponse.json({ message: 'Missing required fields: resumeText, targetMajor, or targetUni' }, { status: 400 });
    }
    
    // 并行执行两个AI调用以提高效率
    const [analysisData, qData] = await Promise.all([
      generateAnalysis(resumeText, targetMajor, targetUni),
      generateQuestions(resumeText, targetMajor, targetUni)
    ]);

    return NextResponse.json({ analysis: analysisData, questions: qData });
  } catch (error) {
    console.error('Error in /api/analyze:', error);
    return NextResponse.json({ message: 'An error occurred on the server.' }, { status: 500 });
  }
}