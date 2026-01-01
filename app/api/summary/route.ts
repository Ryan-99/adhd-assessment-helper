import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
    try {
        // 1. 获取评估结果数据
        const body = await req.json();
        const { answers, mode, score, language } = body;

        // 2. 构建系统提示词 (System Prompt)
        // 根据用户选择的语言动态调整输出语言 (简中/繁中/英文)
        // 指示 AI 扮演专家角色，基于分数给出简短、共情的3句总结建议
        const systemPrompt = `You are an expert ADHD analyst. 
    Analyze the following WHO ASRS v1.1 assessment results and provide a summary in ${language === 'zh-CN' ? 'Simplified Chinese' : (language === 'zh-TW' ? 'Traditional Chinese' : 'English')}.
    Data: Score ${score}/6 (Part A). Mode: ${mode}.
    Task: Provide a concise, empathetic 3-sentence summary of what this result implies. Do not diagnose. Focus on next steps.`;

        // 3. 调用 OpenAI API
        const completion = await openai.chat.completions.create({
            model: process.env.API_MODEL || "gpt-3.5-turbo",
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Patient Answers: ${JSON.stringify(answers)}` }
            ],
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 });
    }
}
