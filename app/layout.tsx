import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "ADHD测试-EverNow",
    description: "Self-assessment tool for Adult ADHD based on WHO ASRS v1.1",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="zh-CN">
            <body className={`${inter.className} min-h-screen flex flex-col font-sans overflow-x-hidden bg-bg`}>
                {children}
            </body>
        </html>
    );
}
