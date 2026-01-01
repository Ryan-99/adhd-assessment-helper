import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
    try {
        // 1. 解析请求体，获取消息历史和上下文信息
        const body = await req.json();
        const { messages, context } = body;

        // 2. 构建系统提示词 (System Prompt)
        // 这里设定了 AI 的角色：ADHD 评估助手，基于 WHO ASRS v1.1 标准
        // 并且注入了用户的当前状态 (context)
        const systemPrompt = `You are a professional ADHD Assessment Helper based on WHO ASRS v1.1.
    Context:
    - User Stats: ${context ? JSON.stringify(context) : 'None'}
    - Tone: Empathetic, objective, scientific.
    - Constraints: DO NOT DIAGNOSE. Always suggest consulting a professional.
    - Style: Brief, supportive, action-oriented.`;

        // 3. 调用 OpenAI API (Chat Completion)
        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt }, // 插入系统设定
                ...messages // 附带完整的对话历史
            ],
            // 使用环境变量中指定的模型，默认为 gpt-3.5-turbo
            model: process.env.API_MODEL || "gpt-3.5-turbo",
        });

        // 4. 获取 AI 的回复内容
        const reply = completion.choices[0].message.content;

        // 5. 返回 JSON 响应
        return NextResponse.json({ reply });

    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
    }
}
