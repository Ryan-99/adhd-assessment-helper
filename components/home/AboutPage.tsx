"use client";

import { useAssessmentStore } from "@/store/useAssessmentStore";
import { BookOpen, AlertTriangle, Check, X as XIcon, Brain, Zap, Clock, ArrowLeft } from "lucide-react";

export default function AboutPage() {
    const { reset, language } = useAssessmentStore();

    const isEn = language === 'en';

    const content = {
        title: isEn ? "Understanding Adult ADHD" : "深入了解成人 ADHD",
        subtitle: isEn
            ? "It's not just about 'not paying attention'. It's a complex neurodevelopmental condition."
            : "这不仅仅是'注意力不集中'。它是一种复杂的神经发育状况，影响着数百万成年人。",

        sections: [
            {
                title: isEn ? "What is it?" : "什么是成人 ADHD？",
                icon: <Brain className="h-6 w-6 text-primary" />,
                text: isEn
                    ? "ADHD (Attention-Deficit/Hyperactivity Disorder) is a neurodevelopmental disorder. While often diagnosed in childhood, symptoms can persist into adulthood. In adults, hyperactivity may manifest less as running around and more as inner restlessness or inability to relax."
                    : "ADHD（注意缺陷与多动障碍）是一种神经发育障碍。虽然通常在儿童期确诊，但症状往往持续到成年。在成人中，'多动'可能不再表现为跑来跑去，而是内心的焦躁不安或无法放松。"
            },
            {
                title: isEn ? "Core Symptoms" : "核心症状表现",
                icon: <Zap className="h-6 w-6 text-secondary" />,
                list: isEn ? [
                    "**Inattention**: Difficulty focusing on boring tasks, forgetfulness, losing things.",
                    "**Impulsivity**: Interrupting others, impulse spending, acting without thinking.",
                    "**Hyperactivity**: Inner restlessness, excessive talking, inability to sit through meetings."
                ] : [
                    "**注意力缺陷**: 难以完成枯燥任务、健忘、经常丢东西、粗心大意。",
                    "**冲动控制**: 频繁打断对话、冲动消费、不计后果的决策。",
                    "**多动/躁动**: 坐立不安、内心像有马达在转、说话过多、会议中难以久坐。"
                ]
            },
            {
                title: isEn ? "Myths vs Facts" : "常见误区 vs 事实",
                icon: <AlertTriangle className="h-6 w-6 text-orange-500" />,
                items: isEn ? [
                    { myth: "ADHD isn't real.", fact: "It is a scientifically recognized medical condition with visible brain differences in MRI studies." },
                    { myth: "Adults grow out of it.", fact: "60-80% of children with ADHD continue to experience symptoms in adulthood." },
                    { myth: "It's just laziness.", fact: "ADHD affects executive function. Procrastination is often due to biological regulation issues, not character flaws." }
                ] : [
                    { myth: "ADHD 不是真正的病。", fact: "它是全球医学界公认的生理性疾病，脑成像研究证实了患者大脑结构的差异。" },
                    { myth: "长大就好了。", fact: "60-80% 的 ADHD 儿童在成年后仍有症状，只是表现形式变得更隐蔽。" },
                    { myth: "就是懒/态度问题。", fact: "这与执行功能障碍有关。拖延往往是由于大脑多巴胺调节机制异常，而非性格缺陷。" }
                ]
            }
        ]
    };

    return (
        <section className="w-full animate-slide-in pb-20">
            <div className="bg-white rounded-3xl shadow-lg overflow-hidden">

                {/* Header Image Area */}
                <div className="h-48 bg-blue-100 relative overflow-hidden">
                    <img src="/about_header.png" alt="ADHD Infographic" className="w-full h-full object-cover opacity-90" />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/90 to-transparent flex items-end p-6">
                        <div>
                            <h2 className="text-white text-2xl font-bold mb-1">{content.title}</h2>
                            <p className="text-blue-100 text-sm max-w-md hidden sm:block">{content.subtitle}</p>
                        </div>
                    </div>
                </div>

                <div className="p-6 space-y-8">

                    {/* Section 1: Intro */}
                    <div className="space-y-3">
                        <h3 className="flex items-center text-lg font-bold text-gray-800">
                            <div className="p-2 bg-blue-50 rounded-lg mr-3">
                                {content.sections[0].icon}
                            </div>
                            {content.sections[0].title}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed pl-12">
                            {content.sections[0].text}
                        </p>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Section 2: Symptoms */}
                    <div className="space-y-3">
                        <h3 className="flex items-center text-lg font-bold text-gray-800">
                            <div className="p-2 bg-orange-50 rounded-lg mr-3">
                                {content.sections[1].icon}
                            </div>
                            {content.sections[1].title}
                        </h3>
                        <ul className="pl-12 space-y-2 text-sm text-gray-600">
                            {content.sections[1].list?.map((item, i) => {
                                const [title, desc] = item.split(":");
                                return (
                                    <li key={i} className="flex items-start">
                                        <span className="w-1.5 h-1.5 bg-secondary rounded-full mt-1.5 mr-2 shrink-0"></span>
                                        <span>
                                            <strong className="text-gray-900">{title.replace(/\*\*/g, "")}:</strong> {desc}
                                        </span>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <hr className="border-gray-100" />

                    {/* Section 3: Myths */}
                    <div className="space-y-4">
                        <h3 className="flex items-center text-lg font-bold text-gray-800">
                            <div className="p-2 bg-red-50 rounded-lg mr-3">
                                {content.sections[2].icon}
                            </div>
                            {content.sections[2].title}
                        </h3>
                        <div className="pl-1 space-y-3">
                            {content.sections[2].items?.map((item: any, i: number) => (
                                <div key={i} className="bg-gray-50 p-4 rounded-xl border border-gray-100 relative overflow-hidden">
                                    <div className="flex gap-3 mb-2">
                                        <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded uppercase shrink-0 h-fit mt-0.5">MYTH</span>
                                        <p className="text-gray-500 text-sm line-through">{item.myth}</p>
                                    </div>
                                    <div className="flex gap-3">
                                        <span className="bg-green-100 text-green-600 text-xs font-bold px-2 py-0.5 rounded uppercase shrink-0 h-fit mt-0.5">FACT</span>
                                        <p className="text-gray-800 text-sm font-medium">{item.fact}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <button
                        onClick={reset}
                        className="w-full bg-primary text-white font-semibold py-4 rounded-2xl shadow-lg hover:bg-blue-800 transition-all flex items-center justify-center"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {isEn ? "Back to Home" : "返回首页"}
                    </button>
                </div>
            </div>
        </section>
    );
}
