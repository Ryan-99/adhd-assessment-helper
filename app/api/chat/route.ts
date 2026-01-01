import { NextResponse } from 'next/server';
import { openai } from '@/lib/openai';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { messages, context } = body;

        // System Prompt construction
        const systemPrompt = `You are a professional ADHD Assessment Helper based on WHO ASRS v1.1.
    Context:
- User Stats: ${context ? JSON.stringify(context) : 'None'}
- Tone: Empathetic, objective, scientific.
    - Constraints: DO NOT DIAGNOSE.Always suggest consulting a professional.
    - Style: Brief, supportive, action - oriented.`;

        const completion = await openai.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                ...messages
            ],
            model: process.env.API_MODEL || "gpt-3.5-turbo",
        });

        const reply = completion.choices[0].message.content;

        return NextResponse.json({ reply });

    } catch (error) {
        console.error("OpenAI Error:", error);
        return NextResponse.json({ error: 'Failed to fetch AI response' }, { status: 500 });
    }
}
