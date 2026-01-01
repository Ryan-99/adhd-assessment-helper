import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { answers, mode, score, language } = body;

        // System Prompt
        const systemPrompt = `You are an expert ADHD analyst. 
    Analyze the following WHO ASRS v1.1 assessment results and provide a summary in ${language === 'zh-CN' ? 'Simplified Chinese' : (language === 'zh-TW' ? 'Traditional Chinese' : 'English')}.
    Data: Score ${score}/6 (Part A). Mode: ${mode}.
    Task: Provide a concise, empathetic 3-sentence summary of what this result implies. Do not diagnose. Focus on next steps.`;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: `Patient Answers: ${JSON.stringify(answers)}` }
            ],
            model: process.env.API_MODEL || "gpt-3.5-turbo",
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: 'Failed to fetch summary' }, { status: 500 });
    }
}
