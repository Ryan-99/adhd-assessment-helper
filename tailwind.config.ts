import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#2C5282',
                secondary: '#F6AD55',
                bg: '#EFF6FF',
                surface: '#FFFFFF',
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
                "ai-gradient": "linear-gradient(135deg, #2C5282 0%, #4c51bf 100%)",
            },
            animation: {
                'slide-in': 'slideIn 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards',
                'pop-up': 'popUp 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
            keyframes: {
                slideIn: {
                    '0%': { opacity: '0', transform: 'translateX(30px)' },
                    '100%': { opacity: '1', transform: 'translateX(0)' },
                },
                popUp: {
                    '0%': { opacity: '0', transform: 'scale(0.8)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                }
            }
        },
    },
    plugins: [],
};
export default config;
