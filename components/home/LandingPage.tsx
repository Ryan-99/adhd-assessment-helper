"use client";

import { useAssessmentStore } from "@/store/useAssessmentStore";
import { uiStrings } from "@/lib/data";
import { ListChecks, ArrowRight } from "lucide-react";

export default function LandingPage() {
    const { startAssessment, setView, language } = useAssessmentStore();
    const t = uiStrings[language];

    return (
        <section className="w-full animate-slide-in">
            <div className="bg-white p-8 rounded-3xl shadow-xl shadow-blue-100/50 relative overflow-hidden text-center">
                {/* Decorative Blobs */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-100 rounded-full opacity-50 blur-xl"></div>
                <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-100 rounded-full opacity-50 blur-xl"></div>

                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 text-primary text-2xl shadow-sm relative z-10">
                    <ListChecks className="h-8 w-8" />
                </div>

                <h1 className="text-3xl font-bold text-gray-900 mb-3 relative z-10 whitespace-pre-line">
                    {t.home_title}
                </h1>

                <p className="text-gray-500 mb-8 leading-relaxed text-sm relative z-10 whitespace-pre-line">
                    {t.home_subtitle}
                </p>

                <div className="space-y-3 relative z-10">
                    <button
                        onClick={startAssessment}
                        className="w-full bg-primary hover:bg-blue-800 active:scale-95 transition-all text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-900/20 text-lg flex items-center justify-center"
                    >
                        {t.start_btn}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </button>

                    <button
                        onClick={() => setView('about')}
                        className="w-full bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 font-semibold py-3 rounded-2xl transition-colors text-sm"
                    >
                        {t.about_btn}
                    </button>
                </div>
            </div>
        </section>
    );
}
