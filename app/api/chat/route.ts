import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
    try {
        // 1. 解析请求体，获取消息历史和上下文信息
        const body = await req.json();
        const { messages, context } = body;

        // 2. 构建系统提示词 (System Prompt)
        // 这里设定了 AI 的角色：ADHD 专家顾问，负责解答用户疑问
        const systemPrompt = `You are a professional ADHD Expert Consultant at EverNow.
    Your Role: Answer user's questions about ADHD symptoms, management strategies, and related psychology.
    Context:
    - User Stats: ${context ? JSON.stringify(context) : 'None'}
    - Tone: Professional, empathetic, knowledgeable.
    - Constraints: 
      1. DO NOT focus on "conducting the test" (the user has likely finished it).
      2. DO NOT DIAGNOSE. Always suggest consulting a doctor for clinical diagnosis.
      3. Focus on answering their specific questions about ADHD.
    - Style: Clear, supportive, evidence-based.`;

        // 3. 调用 OpenAI API (Chat Completion)
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt }, // 插入系统设定
                ...messages // 附带完整的对话历史
            ],
            // 使用环境变量中指定的模型，默认为 gpt-3.5-turbo
            model: process.env.API_MODEL || "gpt-3.5-turbo",
        });

        console.log("OpenAI Raw Response:", JSON.stringify(completion, null, 2));

        if (!completion.choices || completion.choices.length === 0) {
            throw new Error("No choices returned from OpenAI API");
        }

        // 4. 获取 AI 的回复内容
        const reply = completion.choices[0].message.content;

        // 5. 返回 JSON 响应
        return NextResponse.json({ reply });

    } catch (error: any) {
        console.error("OpenAI Error Details:", {
            message: error.message,
            status: error.status,
            type: error.type,
            code: error.code
        });
        return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
    }
}
