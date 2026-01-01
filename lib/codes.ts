import { createHmac } from 'crypto';

const SECRET = process.env.CODE_SECRET || 'adhd-helper-secret-2025';

export function generateCode(type: '3-chats' = '3-chats'): string {
    // Simple format: TYPE.TIMESTAMP.SIGNATURE
    const payload = `${type}.${Date.now()}`;
    const sig = createHmac('sha256', SECRET).update(payload).digest('hex').substring(0, 8);
    // Add random salt to make it look like a code
    return Buffer.from(`${payload}.${sig}`).toString('base64').replace(/=/g, '');
}

export function verifyCode(code: string): { valid: boolean; type?: string } {
    try {
        const decoded = Buffer.from(code, 'base64').toString('utf-8');
        const parts = decoded.split('.');
        if (parts.length !== 3) return { valid: false };

        const [type, ts, sig] = parts;
        const expectedSig = createHmac('sha256', SECRET).update(`${type}.${ts}`).digest('hex').substring(0, 8);

        if (sig === expectedSig) {
            return { valid: true, type };
        }
        return { valid: false };
    } catch (e) {
        return { valid: false };
    }
}
