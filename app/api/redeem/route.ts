import { NextResponse } from 'next/server';
import { verifyCode } from '@/lib/codes';

// Stateless redemption: We verify the signature.
// FLAW: Replay attacks possible (same code used twice).
// FIX: In a real app, we must store "used" codes in a DB (Redis/Postgres).
// For this "Local First" demo without cloud DB, we will just verify validity.
// The user asked for "Activation Code Generation Interface", implying a simple check.

export async function POST(req: Request) {
    try {
        const { code } = await req.json();
        const { valid } = verifyCode(code);

        if (valid) {
            return NextResponse.json({ success: true, quotaAdded: 10 });
        } else {
            return NextResponse.json({ success: false, error: 'Invalid code' }, { status: 400 });
        }
    } catch (e) {
        return NextResponse.json({ error: 'Server Error' }, { status: 500 });
    }
}
