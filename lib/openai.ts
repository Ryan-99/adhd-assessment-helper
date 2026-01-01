import OpenAI from 'openai';

// In a real Vercel environment, these would be process.env.OPENAI_API_KEY
// For this demo, we might warn if missing.
// Helper to strip /chat/completions if user pastes full URL
const getBaseUrl = () => {
    let url = process.env.OPENAI_BASE_URL;
    if (!url) return undefined;
    if (url.endsWith('/chat/completions')) {
        return url.replace('/chat/completions', '');
    }
    return url;
};

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-custom-key',
    baseURL: getBaseUrl(),
    dangerouslyAllowBrowser: false
});
