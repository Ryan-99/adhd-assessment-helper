"use client";

import Navbar from "@/components/layout/Navbar";
import LandingPage from "@/components/home/LandingPage";
import AboutPage from "@/components/home/AboutPage";
import QuizCore from "@/components/assessment/QuizCore";
import Checkpoint from "@/components/assessment/Checkpoint";
import ResultPage from "@/components/result/ResultPage";
import AIChat from "@/components/ai/AIChat";
import { useAssessmentStore } from "@/store/useAssessmentStore";
import { useEffect } from "react";

export default function Home() {
    const { view } = useAssessmentStore();

    // Handle browser back button if desired? Use history API? 
    // For now, keep it simple SPA within index.

    return (
        <main className="flex-grow flex flex-col items-center justify-start pt-6 p-4 w-full max-w-2xl mx-auto relative pb-24 min-h-screen">
            <Navbar />

            <div className="w-full mt-6">
                {view === 'landing' && <LandingPage />}
                {view === 'about' && <AboutPage />}
                {view === 'quiz' && <QuizCore />}
                {view === 'checkpoint' && <Checkpoint />}
                {view === 'result' && <ResultPage />}
            </div>

            <AIChat />
        </main>
    );
}
