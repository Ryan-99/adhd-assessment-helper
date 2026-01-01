"use client";

import { useAssessmentStore, Language } from "@/store/useAssessmentStore";
import { Brain, HelpCircle, Globe } from "lucide-react";
import { uiStrings } from "@/lib/data";
import { useState } from "react";

export default function Navbar() {
    const { setView, reset, language, setLanguage } = useAssessmentStore();
    const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

    const t = uiStrings[language];

    const toggleLang = (lang: Language) => {
        setLanguage(lang);
        setIsLangMenuOpen(false);
    };

    return (
        <nav className="w-full bg-white/90 backdrop-blur-md shadow-sm h-14 flex items-center justify-center sticky top-0 z-40 px-4">
            <div className="flex justify-between w-full max-w-2xl items-center h-full">
                <div
                    onClick={reset}
                    className="flex items-center cursor-pointer select-none hover:opacity-80 transition-opacity"
                >
                    <img src="/images/evernow_logo.jpg" alt="EverNow Logo" className="h-8 w-auto object-contain" />
                </div>
                <div className="flex gap-4 font-medium text-primary/80 items-center h-full">

                    {/* Language Switcher */}
                    <div className="relative">
                        <button
                            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                            className="hover:text-primary transition-colors flex items-center p-1"
                        >
                            <Globe className="mr-1 h-3.5 w-3.5" />
                            <span className="uppercase text-xs tracking-wider">{language.split('-')[0]}</span>
                        </button>

                        {isLangMenuOpen && (
                            <>
                                <div className="fixed inset-0 z-10" onClick={() => setIsLangMenuOpen(false)}></div>
                                <div className="absolute right-0 top-8 bg-white shadow-lg rounded-xl overflow-hidden border border-gray-100 min-w-[120px] flex flex-col z-20 text-xs">
                                    <button onClick={() => toggleLang('zh-CN')} className="text-left px-4 py-3 hover:bg-blue-50 text-gray-700">简体中文</button>
                                    <button onClick={() => toggleLang('zh-TW')} className="text-left px-4 py-3 hover:bg-blue-50 text-gray-700">繁體中文</button>
                                    <button onClick={() => toggleLang('en')} className="text-left px-4 py-3 hover:bg-blue-50 text-gray-700">English</button>
                                </div>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setView('about')}
                        className="hover:text-primary transition-colors flex items-center text-xs"
                    >
                        <HelpCircle className="mr-1 h-3.5 w-3.5" />
                        {t.about_nav}
                    </button>
                </div>
            </div>
        </nav>
    );
}
