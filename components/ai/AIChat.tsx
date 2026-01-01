"use client";

import { useAssessmentStore } from "@/store/useAssessmentStore";
import { MessageSquare, X, Send, User, Bot, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
    role: 'user' | 'assistant';
    content: string;
    type?: 'text' | 'qrcode';
}

export default function AIChat() {
    const { isChatOpen, toggleChat, chatQuota, decrementQuota, addQuota } = useAssessmentStore();
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: "你好！我是你的ADHD辅助咨询助手。关于刚才的测试题或你的症状，有什么想问的吗？" }
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [redeemCode, setRedeemCode] = useState("");
    const [isRedeeming, setIsRedeeming] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isChatOpen]);

    const handleSend = async () => {
        // 1. 校验：输入为空、正在加载或无额度时不处理
        if (!input.trim() || isLoading || chatQuota <= 0) return;

        const userMsg = input.trim();
        // 2. 乐观更新：立即将用户消息添加到界面
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setInput("");
        setIsLoading(true);

        // 扣除额度
        decrementQuota();

        try {
            // 3. 发送请求到后端 API
            const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, { role: 'user', content: userMsg }] }) // 发送完整的上下文历史
            });

            if (!res.ok) throw new Error("API Error");

            // 4. 解析返回结果并显示 AI 回复
            const data = await res.json();
            setMessages(prev => {
                const newMessages = [...prev, { role: 'assistant', content: data.reply, type: 'text' } as Message];
                // Check if we need to show QR code (quota just became 0 and we successfully replied)
                if (chatQuota - 1 <= 0) {
                    newMessages.push({
                        role: 'assistant',
                        content: "希望我的回答对您有帮助！\n\n您的免费对话次数已用完。如需继续深入咨询，请扫描下方二维码关注公众号，回复【激活码】获取更多对话机会。",
                        type: 'qrcode'
                    });
                }
                return newMessages;
            });

        } catch (e) {
            // 5. 错误处理：提示用户服务不可用
            setMessages(prev => [...prev, { role: 'assistant', content: "抱歉，AI服务暂时不可用，请稍后再试。" }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRedeem = async () => {
        if (!redeemCode.trim() || isRedeeming) return;
        setIsRedeeming(true);
        try {
            const res = await fetch('/api/redeem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ code: redeemCode.trim() })
            });
            const data = await res.json();
            if (data.success) {
                addQuota(data.quotaAdded);
                setRedeemCode("");
                setMessages(prev => [...prev, { role: 'assistant', content: `成功兑换！增加了 ${data.quotaAdded} 次对话机会。` }]);
            } else {
                alert("无效的激活码");
            }
        } catch (e) {
            alert("兑换失败，请稍后重试");
        } finally {
            setIsRedeeming(false);
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
                                <span className={cn("w-1.5 h-1.5 rounded-full mr-1", chatQuota > 0 ? "bg-green-400" : "bg-red-400")}></span>
                                剩余次数: {chatQuota}
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
                                {msg.type === 'qrcode' ? (
                                    <div className="flex flex-col items-center">
                                        <div className="prose prose-sm max-w-none mb-3">
                                            {msg.content}
                                        </div>
                                        <div className="bg-gray-50 p-2 rounded-lg border border-gray-100 animate-in zoom-in duration-500">
                                            <img src="/images/qrcode.jpg" alt="WeChat QR Code" className="w-40 h-40 object-contain rounded" />
                                        </div>
                                    </div>
                                ) : (
                                    msg.role === 'assistant' ? (
                                        <div className="prose prose-sm max-w-none prose-p:my-1 prose-headings:my-2 prose-ul:my-1 prose-li:my-0.5">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{msg.content}</ReactMarkdown>
                                        </div>
                                    ) : (
                                        msg.content
                                    )
                                )}
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
                    {chatQuota > 0 ? (
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
                    ) : (
                        <div className="flex flex-col gap-2">
                            {/* QR Code removed from here, now shows as a message */}
                            <p className="text-xs text-red-500 text-center mb-1">您的免费对话次数已用完，请输入激活码继续。</p>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={redeemCode}
                                    onChange={(e) => setRedeemCode(e.target.value)}
                                    placeholder="输入激活码..."
                                    className="flex-grow bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-red-400 focus:bg-white transition-all text-red-900 placeholder:text-red-300"
                                />
                                <button
                                    onClick={handleRedeem}
                                    disabled={isRedeeming || !redeemCode.trim()}
                                    className="bg-red-500 text-white rounded-xl px-4 py-2 shadow-md hover:bg-red-600 transition-colors disabled:opacity-50"
                                >
                                    {isRedeeming ? '验证中...' : '兑换'}
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
