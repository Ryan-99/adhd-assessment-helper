export type Language = 'zh-CN' | 'zh-TW' | 'en';

export interface Question {
    id: number;
    threshold: number;
    text: Record<Language, string>;
}

export const questions: Question[] = [
    // Part A (1-6)
    {
        id: 1,
        threshold: 2,
        text: {
            "zh-CN": "一旦完成任何项目中最具挑战性的部分之后，您经常会觉得完成项目的收尾细节很困难吗？",
            "zh-TW": "一旦完成任何計劃中最具挑戰的部分之後，你多常有完成計劃最後細節的困難？",
            "en": "How often do you have trouble wrapping up the final details of a project, once the challenging parts have been done?"
        }
    },
    {
        id: 2,
        threshold: 2,
        text: {
            "zh-CN": "当必须从事需要有组织规划性的任务时，您经常会觉得井然有序地去做很困难吗？",
            "zh-TW": "當必須從事需要有組織規劃性的任務時，你會多常有困難井然有序地去做？",
            "en": "How often do you have difficulty getting things in order when you have to do a task that requires organization?"
        }
    },
    {
        id: 3,
        threshold: 2,
        text: {
            "zh-CN": "您经常会忘记约会或是应该做的事吗？",
            "zh-TW": "你會多常有問題去記得約會或是應該做的事？",
            "en": "How often do you have problems remembering appointments or obligations?"
        }
    },
    {
        id: 4,
        threshold: 3,
        text: {
            "zh-CN": "当有一件需要多费心思考的工作时，您经常会逃避或是延后开始去做吗？",
            "zh-TW": "當有一件需要多費心思考的工作時，你會多常逃避或是延後開始去做？",
            "en": "When you have a task that requires a lot of thought, how often do you avoid or delay getting started?"
        }
    },
    {
        id: 5,
        threshold: 3,
        text: {
            "zh-CN": "当您必须长时间坐着时，您经常会坐不安稳或扭动手脚吗？",
            "zh-TW": "當你必須長時間坐著時，你會多常坐不安穩或扭動手腳？",
            "en": "How often do you fidget or squirm with your hands or feet when you have to sit down for a long time?"
        }
    },
    {
        id: 6,
        threshold: 3,
        text: {
            "zh-CN": "您经常会像被马达驱动一样，觉得自己过度活跃，不得不做事情吗？",
            "zh-TW": "你會多常像被馬達所驅動一樣，覺得自己過度地活躍，不得不做事情？",
            "en": "How often do you feel overly active and compelled to do things, like you were driven by a motor?"
        }
    },
    // Part B (7-18)
    {
        id: 7,
        threshold: 3,
        text: {
            "zh-CN": "当必须进行一件枯燥或困难的项目时，您经常会粗心犯错吗？",
            "zh-TW": "當必須進行一件枯燥或困難的計劃時，你會多常粗心犯錯？",
            "en": "How often do you make careless mistakes when you have to work on a boring or difficult project?"
        }
    },
    {
        id: 8,
        threshold: 3,
        text: {
            "zh-CN": "当正在做枯燥或重复性的工作时，您经常由于难以保持专注而感到困扰吗？",
            "zh-TW": "當正在做枯燥或重複性的工作時，你多常有持續專注的困難？",
            "en": "How often do you have difficulty keeping your attention when you are doing boring or repetitive work?"
        }
    },
    {
        id: 9,
        threshold: 2,
        text: {
            "zh-CN": "即使有人直接对您说话，您经常会难以专注于别人跟您讲的内容吗？",
            "zh-TW": "即使有人直接對你說話，你會多常有困難專注於別人跟你講話的內容？",
            "en": "How often do you have difficulty concentrating on what people are saying to you, even when they are speaking to you directly?"
        }
    },
    {
        id: 10,
        threshold: 3,
        text: {
            "zh-CN": "您经常遗失或难以找到家中或工作上需要用的东西吗？",
            "zh-TW": "你會多常遺失或難以找到家中或工作上需要用的東西？",
            "en": "How often do you misplace or have difficulty finding things at home or at work?"
        }
    },
    {
        id: 11,
        threshold: 3,
        text: {
            "zh-CN": "您经常被周围的活动或噪音分散注意力吗？",
            "zh-TW": "你會多常被周圍的活動或噪音分散注意力？",
            "en": "How often are you distracted by activity or noise around you?"
        }
    },
    {
        id: 12,
        threshold: 2,
        text: {
            "zh-CN": "您经常在会议或其他需要坐着的场合中离开座位吗？",
            "zh-TW": "你會多常在會議或其他需要坐著的場合中離開座位？",
            "en": "How often do you leave your seat in meetings or other situations in which you are expected to remain seated?"
        }
    },
    {
        id: 13,
        threshold: 3,
        text: {
            "zh-CN": "您经常感到坐立不安或烦躁不安吗？",
            "zh-TW": "你會多常感到坐立不安或煩躁不安？",
            "en": "How often do you feel restless or fidgety?"
        }
    },
    {
        id: 14,
        threshold: 3,
        text: {
            "zh-CN": "当您有空闲时间时，您经常难以放松和休息吗？",
            "zh-TW": "當你有空閒時間時，你會多常難以放鬆和休息？",
            "en": "How often do you have difficulty unwinding and relaxing when you have time to yourself?"
        }
    },
    {
        id: 15,
        threshold: 3,
        text: {
            "zh-CN": "在社交场合中，您经常发现自己话说得太多吗？",
            "zh-TW": "在社交場合中，你會多常發現自己話講得太多？",
            "en": "How often do you find yourself talking too much when you are in social situations?"
        }
    },
    {
        id: 16,
        threshold: 2,
        text: {
            "zh-CN": "当与他人交谈时，您经常在别人还没把话讲完前就插嘴或接话吗？",
            "zh-TW": "當與他人交談時，你會多常在別人還沒把話講完前就插嘴或接話替對方把話講完？",
            "en": "When you’re in a conversation, how often do you find yourself finishing the sentences of the people you are talking to, before they can finish them themselves?"
        }
    },
    {
        id: 17,
        threshold: 3,
        text: {
            "zh-CN": "在需要轮流等待的场合时，您经常难以耐心等待吗？",
            "zh-TW": "在需要輪流等待的場合時，你會多常有困難輪流等待？",
            "en": "How often do you have difficulty waiting your turn in situations when turn taking is required?"
        }
    },
    {
        id: 18,
        threshold: 2,
        text: {
            "zh-CN": "您经常在别人忙碌时打断别人吗？",
            "zh-TW": "你會多常在別人忙碌時打斷別人？",
            "en": "How often do you interrupt others when they are busy?"
        }
    }
];

export const options = {
    "zh-CN": [
        { val: 0, label: "从不" },
        { val: 1, label: "很少" },
        { val: 2, label: "有时" },
        { val: 3, label: "经常" },
        { val: 4, label: "非常频繁" }
    ],
    "zh-TW": [
        { val: 0, label: "從不" },
        { val: 1, label: "很少" },
        { val: 2, label: "有時" },
        { val: 3, label: "常常" },
        { val: 4, label: "非常頻繁" }
    ],
    "en": [
        { val: 0, label: "Never" },
        { val: 1, label: "Rarely" },
        { val: 2, label: "Sometimes" },
        { val: 3, label: "Often" },
        { val: 4, label: "Very Often" }
    ]
};

export const bgColors = ['bg-blue-50', 'bg-purple-50', 'bg-green-50', 'bg-orange-50'];

export const uiStrings: Record<Language, Record<string, string>> = {
    "zh-CN": {
        "title": "ADHD 自我评估助手",
        "home_title": "成人ADHD\n自我筛查工具",
        "home_subtitle": "通过WHO ASRS v1.1量表，仅需3分钟，\n科学了解您的注意力状态。",
        "start_btn": "开始筛查",
        "about_btn": "什么是ADHD?",
        "about_nav": "关于ADHD",
        "part_a": "核心筛查 (Part A)",
        "assessment": "完整评估",
        "prev_btn": "上一题",
        "result_title_pos": "筛查阳性",
        "result_title_neg": "筛查阴性",
        "result_positive_desc": "您的筛查结果显示，在注意力维度存在较高频率的困扰。建议咨询AI助手获取更个性化的行为建议。",
        "result_negative_desc": "您的症状频率处于常模范围内。若仍感觉效率低下，可咨询AI助手关于时间管理的技巧。",
        "checkpoint_title": "核心筛查完成",
        "checkpoint_desc": "核心6题已完成。继续回答剩余12题可获得更完整的症状分析报告。",
        "continue_btn": "继续完整评估 (+12题)",
        "report_btn": "直接查看报告",
        "ai_guide_title": "对结果有疑问？",
        "ai_guide_desc": "点击咨询 AI 助手，进一步分析您的具体困扰。",
        "restart_btn": "重新测试"
    },
    "zh-TW": {
        "title": "ADHD 自我評估助手",
        "home_title": "成人ADHD\n自我篩查工具",
        "home_subtitle": "通過WHO ASRS v1.1量表，僅需3分鐘，\n科學瞭解您的注意力狀態。",
        "start_btn": "開始篩查",
        "about_btn": "什麼是ADHD?",
        "about_nav": "關於ADHD",
        "part_a": "核心篩查 (Part A)",
        "assessment": "完整評估",
        "prev_btn": "上一題",
        "result_title_pos": "篩查陽性",
        "result_title_neg": "篩查陰性",
        "result_positive_desc": "您的篩查結果顯示，在注意力維度存在較高頻率的困擾。建議諮詢AI助手獲取更個性化的行為建議。",
        "result_negative_desc": "您的症狀頻率處於常模範圍內。若仍感覺效率低下，可諮詢AI助手關於時間管理的技巧。",
        "checkpoint_title": "核心篩查完成",
        "checkpoint_desc": "核心6題已完成。繼續回答剩餘12題可獲得更完整的症狀分析報告。",
        "continue_btn": "繼續完整評估 (+12題)",
        "report_btn": "直接查看報告",
        "ai_guide_title": "對結果有疑問？",
        "ai_guide_desc": "點擊諮詢 AI 助手，進一步分析您的具體困擾。",
        "restart_btn": "重新測試"
    },
    "en": {
        "title": "ADHD Assessment",
        "home_title": "Adult ADHD\nSelf-Screener",
        "home_subtitle": "Based on WHO ASRS v1.1. Takes 3 mins.\nUnderstand your attention profile scientifically.",
        "start_btn": "Start Screening",
        "about_btn": "What is ADHD?",
        "about_nav": "About ADHD",
        "part_a": "Core Screening (Part A)",
        "assessment": "Full Assessment",
        "prev_btn": "Previous",
        "result_title_pos": "Likely ADHD",
        "result_title_neg": "Unlikely ADHD",
        "result_positive_desc": "Your results suggest high frequency of symptoms consistent with ADHD. Chat with AI for behavioral tips.",
        "result_negative_desc": "Your symptoms are within normal range. If you still feel inefficient, ask AI for time management tips.",
        "checkpoint_title": "Core Screening Done",
        "checkpoint_desc": "You've finished the core 6 questions. Continue for full symptom analysis.",
        "continue_btn": "Continue (+12 Qs)",
        "report_btn": "View Report",
        "ai_guide_title": "Questions?",
        "ai_guide_desc": "Chat with our AI assistant to analyze your specific struggles.",
        "restart_btn": "Restart"
    }
};
