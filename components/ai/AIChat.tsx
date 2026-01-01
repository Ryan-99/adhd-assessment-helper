"use client";

import { useAssessmentStore } from "@/store/useAssessmentStore";
import { MessageSquare, X, Send, User, Bot, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export default function AIChat() {
    const { isChatOpen, toggleChat } = useAssessmentStore();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "你好！我是你的ADHD辅助咨询助手。关于刚才的测试题或你的症状，有什么想问的吗？" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isChatOpen]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMsg = input.trim();
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput("");
        setIsLoading(true);

        try {
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMsg }] }) // Send history context
            });

            if (!res.ok) throw new Error("API Error");

            const data = await res.json();
            setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);

        } catch (e) {
            setMessages(prev => [...prev, { role: 'assistant', content: "抱歉，AI服务暂时不可用，请稍后再试。" }]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isChatOpen) {
        // FAB Button
        return (
            <div className="fixed bottom-6 right-6 z-50">
                <button
                    onClick={() => toggleChat(true)}
                    className="bg-ai-gradient text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-110 active:scale-95 group border-2 border-white/20"
                >
                    <MessageSquare className="h-6 w-6 group-hover:animate-pulse" />
                </button>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[60] flex flex-col justify-end sm:justify-center items-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => toggleChat(false)}>
            <div
                className="bg-white w-full sm:w-[400px] h-[85vh] sm:h-[600px] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="bg-ai-gradient p-4 flex justify-between items-center text-white shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                            <Bot className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-sm">AI 咨询助手</h3>
                            <p className="text-xs text-blue-200 flex items-center">
                                <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-1"></span> 在线
                            </p>
                        </div>
                    </div>
                    <button onClick={() => toggleChat(false)} className="text-white/70 hover:text-white p-2">
                        <ChevronDown className="h-6 w-6" />
                    </button>
                </div>

                {/* Chat History */}
                <div className="flex-grow overflow-y-auto p-4 space-y-4 bg-gray-50" ref={scrollRef}>
                    {messages.map((msg, idx) => (
                        <div key={idx} className={cn("flex items-start", msg.role === 'user' ? "justify-end" : "justify-start")}>
                            {msg.role === 'assistant' && (
                                <div className="w-8 h-8 bg-ai-gradient rounded-full flex-shrink-0 flex items-center justify-center text-white mt-1 mr-2">
                                    <span className="text-xs">AI</span>
                                </div>
                            )}
                            <div className={cn(
                                "max-w-[85%] px-4 py-3 text-sm shadow-sm",
                                msg.role === 'assistant'
                                    ? "bg-white border border-gray-100 rounded-2xl rounded-tl-none text-gray-700"
                                    : "bg-primary text-white rounded-2xl rounded-tr-none"
                            )}>
                                {msg.content}
                            </div>
                            {msg.role === 'user' && (
                                <div className="w-8 h-8 bg-primary rounded-full flex-shrink-0 flex items-center justify-center text-white mt-1 ml-2">
                                    <User className="h-4 w-4" />
                                </div>
                            )}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="flex items-center text-gray-400 text-xs ml-12">
                            <span className="animate-pulse">AI 正在思考...</span>
                        </div>
                    )}
                </div>

                {/* Input Area */}
                <div className="p-4 border-t border-gray-100 bg-white shrink-0">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="输入您的问题..."
                            className="flex-grow bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary focus:bg-white transition-all"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || !input.trim()}
                            className="bg-ai-gradient text-white rounded-xl px-4 py-2 shadow-md hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <Send className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
