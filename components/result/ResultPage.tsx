"use client";

import { useAssessmentStore } from "@/store/useAssessmentStore";
import { questions } from "@/lib/data";
import { db } from "@/lib/db";
import { Sparkles, MessageSquare, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { uiStrings } from "@/lib/data";

export default function ResultPage() {
    const { answers, mode, toggleChat, reset, language } = useAssessmentStore();
    const [resultStatus, setResultStatus] = useState<'positive' | 'negative'>('negative');

    const t = uiStrings[language];
    const [aiSummary, setAiSummary] = useState<string>("");
    const [loadingSummary, setLoadingSummary] = useState(false);

    useEffect(() => {
        // Calculate Score (Part A)
        let partACount = 0;

        // ASRS Part A is questions index 0-5
        for (let i = 0; i < 6; i++) {
            const val = answers[i] || 0;
            const q = questions[i];
            if (val >= q.threshold) {
                partACount++;
            }
        }

        const isPositive = partACount >= 4;
        const status = isPositive ? 'positive' : 'negative';
        setResultStatus(status);

        // Save to DB
        const saveResult = async () => {
            try {
                await db.assessments.add({
                    date: new Date(),
                    scorePartA: partACount,
                    scoreTotal: Object.values(answers).reduce((a, b) => a + b, 0),
                    answers: answers,
                    mode: mode,
                    result: status
                });
            } catch (e) {
                console.error("Failed to save result", e);
            }
        };
        saveResult();

        // Fetch AI Summary (Once)
        const fetchSummary = async () => {
            setLoadingSummary(true);
            try {
                const res = await fetch('/api/summary', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        answers,
                        mode,
                        language,
                        score: partACount
                    })
                });
                const data = await res.json();
                if (data.reply) {
                    setAiSummary(data.reply);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoadingSummary(false);
            }
        };
        fetchSummary();

    }, [answers, mode, language]);

    const isPositive = resultStatus === 'positive';

    return (
        <section className="w-full animate-slide-in pb-20">
            <div className={cn(
                "bg-white rounded-2xl shadow-sm p-6 mb-4 text-center border-b-4",
                isPositive ? "border-secondary" : "border-green-500"
            )}>
                <h2 className="text-gray-500 text-sm uppercase tracking-wider mb-2">{t.title}</h2>
                <div className={cn(
                    "text-4xl font-bold mb-2",
                    isPositive ? "text-secondary" : "text-green-500"
                )}>
                    {isPositive ? t.result_title_pos : t.result_title_neg}
                </div>
                <div className="text-sm text-gray-400">Data encrypted locally</div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm p-6 mb-4">
                <h3 className="font-bold text-gray-800 mb-4 flex items-center">
                    <Sparkles className="text-secondary mr-2 h-5 w-5" />
                    AI Insights
                </h3>
                <div className="text-gray-600 text-sm leading-relaxed space-y-4">
                    <p>{isPositive ? t.result_positive_desc : t.result_negative_desc}</p>

                    {loadingSummary && (
                        <div className="flex items-center gap-2 text-primary text-xs animate-pulse">
                            <Sparkles className="h-4 w-4" /> Generating personalized analysis...
                        </div>
                    )}

                    {aiSummary && (
                        <div className="mt-4 p-4 bg-blue-50 rounded-xl border border-blue-100 text-gray-700">
                            <p className="font-semibold text-xs text-primary mb-1">AI ANALYSIS:</p>
                            {aiSummary}
                        </div>
                    )}
                </div>
            </div>

            {/* AI Guide Card */}
            <div
                className="bg-ai-gradient rounded-2xl p-6 mb-4 text-white shadow-lg relative overflow-hidden cursor-pointer hover:shadow-xl transition-shadow"
                onClick={() => toggleChat(true)}
            >
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <h3 className="font-bold text-lg">{t.ai_guide_title}</h3>
                        <p className="text-white/80 text-xs mt-1">{t.ai_guide_desc}</p>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors">
                        <MessageSquare className="h-6 w-6" />
                    </div>
                </div>
            </div>

            <button
                onClick={reset}
                className="w-full text-gray-400 py-4 text-sm hover:text-gray-600 flex items-center justify-center gap-2"
            >
                <RotateCcw className="h-4 w-4" />
                {t.restart_btn}
            </button>
        </section>
    );
}
