"use client";

import { useAssessmentStore } from "@/store/useAssessmentStore";
import { uiStrings } from "@/lib/data";
import { Check } from "lucide-react";

export default function Checkpoint() {
    const { continueAssessment, setView, language } = useAssessmentStore();
    const t = uiStrings[language];

    return (
        <section className="w-full animate-slide-in pt-4">
            <div className="bg-white p-8 rounded-3xl shadow-xl text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl animate-bounce">
                    <Check className="h-8 w-8" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{t.checkpoint_title}</h2>
                <p className="text-gray-500 mb-8 text-sm">
                    {t.checkpoint_desc}
                </p>
                <div className="space-y-3">
                    <button
                        onClick={continueAssessment}
                        className="w-full bg-primary text-white font-bold py-4 rounded-xl shadow-lg hover:bg-blue-800 transition-colors"
                    >
                        {t.continue_btn}
                    </button>
                    <button
                        onClick={() => setView('result')}
                        className="w-full bg-white border border-gray-200 text-gray-600 font-semibold py-4 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                        {t.report_btn}
                    </button>
                </div>
            </div>
        </section>
    );
}
