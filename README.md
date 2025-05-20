# YanYu MediNexus³-Admin 医疗管理系统

<p align="center">
  <img src="/public/yanyu-shield-logo.png" alt="YanYu MediNexus³-Admin Logo" width="200" />
</p>

<p align="center">
  <strong>先进的医疗AI管理平台 | 智能诊断 | 数据分析 | 临床决策支持</strong>
</p>

## 📋 项目概述

YanYu MediNexus³-Admin 是一个全面的医疗管理系统，集成了AI诊断、电子病历管理、临床决策支持、健康数据分析等功能。系统采用现代化的技术栈，提供直观的用户界面和强大的后台管理功能，旨在提高医疗机构的工作效率和诊断准确性。

### 🌟 核心功能

- **AI辅助诊断**：利用深度学习模型分析医学影像和临床数据
- **电子病历管理**：全面的患者信息管理和病历记录
- **临床决策支持**：基于证据的治疗方案推荐和药物相互作用检查
- **健康数据分析**：患者数据可视化和趋势分析
- **远程会诊**：支持医生之间的远程协作和患者远程咨询
- **研究项目管理**：临床研究项目跟踪和数据收集
- **移动应用集成**：与患者移动应用无缝对接
- **安全与合规**：符合医疗数据保护标准的安全机制

## 🔧 技术栈

- **前端**：Next.js 14, React 18, TypeScript, Tailwind CSS
- **UI组件**：Shadcn UI, Radix UI, Recharts
- **状态管理**：Zustand
- **认证**：JWT
- **国际化**：自定义多语言支持
- **部署**：Vercel

## 🚀 快速开始

### 系统要求

- Node.js 22.x 或更高版本
- npm 10.x 或更高版本

### 安装步骤

1. 克隆仓库

\`\`\`bash
git clone https://github.com/your-organization/yanyu-medinexus-admin.git
cd yanyu-medinexus-admin
\`\`\`

2. 安装依赖

\`\`\`bash
npm install
\`\`\`

3. 配置环境变量

复制 `.env.local.example` 文件并重命名为 `.env.local`，然后填写必要的环境变量：

\`\`\`
# 翻译服务配置（服务器端）
TRANSLATOR_API_KEY=your_translator_api_key_here
TRANSLATOR_REGION=your_translator_region_here

# JWT 配置
JWT_SECRET=your_jwt_secret_here

# 应用 URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
\`\`\`

4. 启动开发服务器

\`\`\`bash
npm run dev
\`\`\`

5. 访问应用

打开浏览器访问 [http://localhost:3000](http://localhost:3000)

## 📂 项目结构

\`\`\`
yanyu-medinexus-admin/
├── app/                    # Next.js 应用路由
│   ├── (auth)/             # 认证相关页面
│   ├── admin/              # 管理员页面
│   ├── ai-diagnosis/       # AI诊断页面
│   ├── ai-model/           # AI模型管理
│   ├── analytics/          # 数据分析页面
│   ├── api/                # API路由
│   ├── clinical-decision/  # 临床决策支持
│   └── ...
├── components/             # React组件
│   ├── admin/              # 管理员组件
│   ├── ai-diagnosis/       # AI诊断组件
│   ├── analytics/          # 数据分析组件
│   ├── auth/               # 认证组件
│   ├── brand/              # 品牌相关组件
│   ├── clinical-decision/  # 临床决策组件
│   ├── layout/             # 布局组件
│   ├── ui/                 # UI组件
│   └── ...
├── contexts/               # React上下文
├── hooks/                  # 自定义钩子
├── lib/                    # 工具函数和库
├── public/                 # 静态资源
├── services/               # 服务层
├── store/                  # 状态管理
├── types/                  # TypeScript类型定义
└── utils/                  # 实用工具函数
\`\`\`

## 🔍 主要功能模块

### 1. AI诊断模块

AI诊断模块提供基于深度学习的医学影像分析和诊断建议。支持多种医学影像格式，包括X光、CT、MRI等。

**主要功能**：
- 医学影像上传和分析
- 多模态AI诊断
- 诊断结果解释
- 历史诊断记录查询

### 2. 电子病历管理

电子病历管理模块提供全面的患者信息管理和病历记录功能。

**主要功能**：
- 患者基本信息管理
- 病历记录和更新
- 医学影像关联
- 处方管理
- 随访记录

### 3. 临床决策支持

临床决策支持模块提供基于证据的治疗方案推荐和药物相互作用检查。

**主要功能**：
- 治疗方案推荐
- 药物相互作用检查
- 临床指南查询
- 诊断工具

### 4. 健康数据分析

健康数据分析模块提供患者数据可视化和趋势分析功能。

**主要功能**：
- 生命体征趋势分析
- 实验室检查结果分析
- 人口健康统计
- 预测模型

## 🛠️ 开发指南

### 代码规范

项目遵循以下命名规范：

- **组件文件**: 使用 PascalCase (大驼峰命名法)
  - 例如: `Button.tsx`, `PatientList.tsx`, `MedicalRecordViewer.tsx`

- **非组件 TypeScript 文件**: 使用 camelCase (小驼峰命名法)
  - 例如: `apiClient.ts`, `useAuth.ts`, `patientService.ts`

- **常量和配置文件**: 使用 kebab-case (短横线命名法)
  - 例如: `api-endpoints.ts`, `route-constants.ts`

### 添加新功能

1. 创建功能相关的组件和服务
2. 在适当的目录中添加新页面
3. 更新导航菜单
4. 添加必要的测试
5. 更新文档

## 🌐 多语言支持

系统支持多语言界面，默认使用中文。语言文件位于 `i18n` 目录下。

要添加新的语言支持：

1. 在 `i18n/translations.ts` 中添加新语言的翻译
2. 在 `contexts/language-context.tsx` 中添加新语言选项

## 🔒 安全与认证

系统使用 JWT 进行认证，支持角色基础的访问控制。主要安全功能包括：

- 用户认证和授权
- 角色和权限管理
- 审计日志
- 数据加密
- 会话管理

## 📱 移动端支持

系统采用响应式设计，支持在各种设备上使用。此外，还提供了专门的移动应用管理功能，用于管理患者移动应用。

## 🤝 贡献指南

我们欢迎社区贡献！如果您想为项目做出贡献，请遵循以下步骤：

1. Fork 仓库
2. 创建您的功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交您的更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启一个 Pull Request

## 📄 许可证

本项目采用 [MIT 许可证](LICENSE)。

## 📞 联系我们

如有任何问题或建议，请联系：

- 邮箱：support@yanyu-medinexus.com
- 网站：https://www.yanyu-medinexus.com

---

<p align="center">
  © 2025 YanYu MediNexus³-Admin. 保留所有权利。
</p>
