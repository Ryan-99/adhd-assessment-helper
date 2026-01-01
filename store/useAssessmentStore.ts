import { create } from 'zustand';

export type AssessmentView = 'landing' | 'about' | 'quiz' | 'checkpoint' | 'result';
export type AssessmentMode = 'screening' | 'full';
export type Language = 'zh-CN' | 'zh-TW' | 'en'; // Added Language type


interface AssessmentState {
    view: AssessmentView;
    mode: AssessmentMode;
    currentStep: number;
    totalSteps: number;
    answers: Record<number, number>;
    language: Language; // Added language state
    chatQuota: number; // New quota state
    isChatOpen: boolean;

    setView: (view: AssessmentView) => void;
    setMode: (mode: AssessmentMode) => void;
    setLanguage: (lang: Language) => void; // Added setter
    addQuota: (amount: number) => void; // New action
    decrementQuota: () => void; // New action
    setAnswer: (questionId: number, value: number) => void;
    nextStep: () => void;
    prevStep: () => void;
    reset: () => void;
    toggleChat: (isOpen: boolean) => void;
    startAssessment: () => void;
    continueAssessment: () => void;
}

export const useAssessmentStore = create<AssessmentState>((set, get) => ({
    view: 'landing',
    mode: 'screening',
    currentStep: 0,
    totalSteps: 6,
    answers: {},
    language: 'zh-CN', // Default to SC
    chatQuota: 3, // Default free quota
    isChatOpen: false,

    setView: (view) => set({ view }),
    setMode: (mode) => set({ mode }),
    setLanguage: (language) => set({ language }), // Implement setter
    addQuota: (n) => set(s => ({ chatQuota: s.chatQuota + n })),
    decrementQuota: () => set(s => ({ chatQuota: Math.max(0, s.chatQuota - 1) })),
    setAnswer: (qId, val) => set((state) => ({ answers: { ...state.answers, [qId]: val } })),

    nextStep: () => {
        const { currentStep, totalSteps, mode } = get();
        // Logic: 
        // If screening mode and step is 5 (6th question, 0-indexed), go to checkpoint.
        // Else if not last step, increment.
        // If last step, go to result.

        // Note: Question IDs are 0-indexed in logic for simplicity, but displayed as +1.
        // PRD: Part A is 1-6 (idx 0-5). Part B is 7-18 (idx 6-17).

        if (mode === 'screening' && currentStep === 5) {
            set({ view: 'checkpoint' });
        } else if (currentStep < totalSteps - 1) {
            set({ currentStep: currentStep + 1 });
        } else {
            set({ view: 'result' });
        }
    },

    prevStep: () => set((state) => ({ currentStep: Math.max(0, state.currentStep - 1) })),

    reset: () => set({
        view: 'landing',
        currentStep: 0,
        answers: {},
        mode: 'screening',
        totalSteps: 6
    }),

    toggleChat: (isOpen) => set({ isChatOpen: isOpen }),

    startAssessment: () => set({
        view: 'quiz',
        mode: 'screening',
        currentStep: 0,
        totalSteps: 6,
        answers: {} // Clear answers on start
    }),

    continueAssessment: () => set((state) => ({
        view: 'quiz',
        mode: 'full',
        totalSteps: 18, // Total 18 questions
        currentStep: 6  // Start from 7th question (index 6)
    }))
}));
