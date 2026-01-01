import { NextResponse } from 'next/server';
import { generateCode } from '@/lib/codes';

// In production, protect this route!
export async function POST(req: Request) {
    try {
        const body = await req.json();
        // Assume simple protection or open for demo
        const count = body.count || 1;
        const codes = Array(count).fill(0).map(() => generateCode());

        return NextResponse.json({ codes });
    } catch (e) {
        return NextResponse.json({ error: 'Failed' }, { status: 500 });
    }
}
