"use client";

import { useAssessmentStore } from "@/store/useAssessmentStore";
import { questions, options, bgColors, uiStrings } from "@/lib/data";
import { ArrowLeft, CheckCircle, Circle } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function QuizCore() {
    const { currentStep, totalSteps, answers, setAnswer, nextStep, prevStep, mode, language } = useAssessmentStore();
    const [selectedVal, setSelectedVal] = useState<number | null>(null);

    const t = uiStrings[language];
    const question = questions[currentStep];
    const progressPercent = ((currentStep) / totalSteps) * 100;

    // Background color cycling
    const bgColor = bgColors[currentStep % bgColors.length];

    useEffect(() => {
        // Reset local selected state when step changes (if needed, though we track via store)
        // Actually we can just derive from store answers.
    }, [currentStep]);

    const handleSelect = (val: number) => {
        setSelectedVal(val);
        setAnswer(currentStep, val);
        setTimeout(() => {
            setSelectedVal(null);
            nextStep();
        }, 350);
    };

    const currentAnswer = answers[currentStep];
    // Get options for current language
    const currentOptions = options[language];

    return (
        <section className={cn("w-full transition-colors duration-500 min-h-[600px] flex flex-col")}>
            {/* Progress Bar */}
            <div className="w-full bg-gray-200 h-1.5 rounded-full mb-6 overflow-hidden">
                <div
                    className="h-full bg-secondary transition-all duration-500 ease-out"
                    style={{ width: `${progressPercent}%` }}
                />
            </div>

            <div className={cn("bg-white p-6 rounded-3xl shadow-lg flex-grow flex flex-col relative transition-colors duration-500", bgColor)}>
                <div className="flex justify-between items-center mb-6">
                    <span className="inline-block px-3 py-1 rounded-lg bg-white/60 backdrop-blur text-gray-500 text-xs font-bold border border-black/5">
                        <span className="font-mono">{currentStep + 1}</span> / <span className="font-mono">{totalSteps}</span>
                    </span>
                    <span className="text-xs text-gray-400 font-mono">
                        {mode === 'screening' ? t.part_a : t.assessment}
                    </span>
                </div>

                {/* Question Text with Animation Key */}
                <div key={`q-text-${currentStep}`} className="min-h-[4rem] mb-6 overflow-hidden">
                    <h2 className="text-xl font-bold text-gray-800 leading-snug animate-slide-in">
                        {question.text[language]}
                    </h2>
                </div>

                {/* Options */}
                <div className="flex flex-col gap-3 flex-grow" key={`options-${currentStep}`}>
                    {currentOptions.map((opt, i) => {
                        const isSelected = (selectedVal !== null ? selectedVal === opt.val : currentAnswer === opt.val);

                        return (
                            <button
                                key={opt.val}
                                onClick={() => handleSelect(opt.val)}
                                style={{ animationDelay: `${i * 0.08}s` }}
                                className={cn(
                                    "w-full text-left px-5 py-4 rounded-xl border transition-all duration-200 font-medium text-sm sm:text-base flex justify-between items-center group bg-white/80 backdrop-blur-sm animate-slide-in opacity-0",
                                    isSelected
                                        ? "option-selected"
                                        : "border-black/5 text-gray-600 hover:bg-white hover:border-blue-300 hover:text-primary hover:shadow-md"
                                )}
                            >
                                <span>{opt.label}</span>
                                {isSelected ? (
                                    <CheckCircle className="h-5 w-5" />
                                ) : (
                                    <Circle className="h-5 w-5 text-gray-300 group-hover:text-blue-300" />
                                )}
                            </button>
                        );
                    })}
                </div>

                <div className="mt-6 flex justify-between items-center border-t border-black/5 pt-4">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 0}
                        className="text-gray-500 hover:text-gray-800 text-sm font-medium px-2 py-1 disabled:opacity-30 transition-opacity flex items-center"
                    >
                        <ArrowLeft className="mr-1 h-4 w-4" /> {t.prev_btn}
                    </button>
                </div>
            </div>
        </section>
    );
}
