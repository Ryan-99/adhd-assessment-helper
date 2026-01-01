import OpenAI from 'openai';

// In a real Vercel environment, these would be process.env.OPENAI_API_KEY
// For this demo, we might warn if missing.
// Helper to strip /chat/completions if user pastes full URL
const getBaseUrl = () => {
    let url = process.env.OPENAI_BASE_URL;
    if (!url) return undefined;

    // Remove trailing slash
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    // Remove /chat/completions suffix if present
    if (url.endsWith('/chat/completions')) {
        url = url.replace('/chat/completions', '');
    }

    // Remove trailing slash again if it appeared after replacement
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }

    console.log("Using Custom Base URL:", url);
    return url;
};

export const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'sk-custom-key',
    baseURL: getBaseUrl(),
    dangerouslyAllowBrowser: false
});
