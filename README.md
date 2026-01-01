# ADHD Assessment Helper (成人 ADHD 自测助手)

这是一个基于 WHO ASRS v1.1 量表的现代化成人 ADHD 筛查工具。采用 Next.js 构建，支持多语言、AI 辅助解读以及本地隐私存储。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRyan-99%2Fadhd-assessment-helper&env=OPENAI_API_KEY,CODE_SECRET,OPENAI_BASE_URL,API_MODEL)

## ✨ 主要功能

*   **科学筛查**: 基于标准的 ASRS v1.1 筛查量表（6 + 12 题模式）。
*   **多语言支持**: 内置 简体中文、繁體中文、English 切换。
*   **AI 智能解读**: 集成 OpenAI 接口，为测试结果提供个性化的分析与建议。
*   **隐私优先**: 所有评估数据通过 Checked IndexedDB 存储在本地浏览器，无需登录。
*   **激活码机制**: 可控制 AI 功能的使用次数。

## 🚀 一键部署 (Vercel)

本项目完美支持 Vercel 部署。

1.  **准备 OpenAI Key**: 你需要一个有效的 OpenAI API Key (`sk-...`)。
2.  **点击部署按钮**: 点击上方的 "Deploy with Vercel" 按钮。
3.  **配置环境变量**: 在 Vercel 部署过程中，填写以下环境变量：

    | 变量名 | 描述 | 示例 |
    | :--- | :--- | :--- |
    | `OPENAI_API_KEY` | 必填。用于 AI 对话和结果总结。 | `sk...` |
    | `OPENAI_BASE_URL` | 选填。自定义 API 地址 (如使用 DMXAPI 等中转服务)。 | `https://www.dmxapi.cn/v1` |
    | `API_MODEL` | 选填。指定使用的模型名称。 | `gpt-4`, `gpt-5-mini` |
    | `CODE_SECRET` | 选填。用于生成和验证激活码的密钥。 | `my-secret-key-2025` |

4.  **完成**: 等待部署构建完成即可访问。

## 🔑 激活码接口使用

为了控制成本，AI 对话功能可以通过激活码机制进行额度管理。

**生成激活码 (管理员)**

向 API 发送 POST 请求即可生成带有签名的激活码。

*   **接口**: `/api/admin/generate`
*   **方法**: `POST`
*   **请求体**:
    ```json
    {
      "count": 5  // 生成数量
    }
    ```
*   **返回**:
    ```json
    {
      "codes": ["3-chats.170678...Signature1", "3-chats.170678...Signature2", ...]
    }
    ```

**验证/使用激活码 (客户端)**

*   **接口**: `/api/redeem`
*   **方法**: `POST`
*   **请求体**:
    ```json
    {
      "code": "激活码字符串"
    }
    ```
*   **返回**: 成功则返回增加的配额数。

## 📂 项目文件架构

```
.
├── app/
│   ├── api/                  # API 路由
│   │   ├── chat/             # AI 对话接口
│   │   ├── summary/          # 结果页 AI 总结接口
│   │   ├── admin/generate/   # 激活码生成
│   │   └── redeem/           # 激活码验证
│   ├── page.tsx              # 主页入口
│   └── layout.tsx            # 全局布局 (包含字体、元数据)
├── components/
│   ├── home/                 # 首页 & 关于页组件
│   ├── assessment/           # 问卷核心组件 (QuizCore, Checkpoint)
│   ├── result/               # 结果页组件
│   ├── layout/               # 导航栏等布局组件
│   └── ai/                   # AI 聊天悬浮窗组件
├── lib/
│   ├── data.ts               # 题库数据 & 多语言文案
│   ├── db.ts                 # Dexie 本地数据库配置
│   ├── openai.ts             # OpenAI 客户端实例
│   └── codes.ts              # 激活码生成与验证逻辑
└── store/
    └── useAssessmentStore.ts # Zustand 全局状态管理
```

## 🛠️ 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 即可预览。
