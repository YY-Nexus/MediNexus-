export interface ModuleGapAnalysis {
  module: string
  currentCompletion: number
  gaps: Gap[]
  recommendations: Recommendation[]
  priorityImprovements: PriorityImprovement[]
}

export interface Gap {
  id: string
  title: string
  description: string
  impact: "high" | "medium" | "low"
  effort: "high" | "medium" | "low"
}

export interface Recommendation {
  id: string
  title: string
  description: string
  benefits: string[]
  implementation: string
}

export interface PriorityImprovement {
  id: string
  title: string
  description: string
  priority: number
  estimatedTime: string
}

export const moduleGapsAnalysis: ModuleGapAnalysis[] = [
  {
    module: "患者管理 (Patient Management)",
    currentCompletion: 95,
    gaps: [
      {
        id: "pm-gap-1",
        title: "智能风险评估缺失",
        description: "缺少基于AI的患者风险评估和预警系统",
        impact: "high",
        effort: "medium",
      },
      {
        id: "pm-gap-2",
        title: "患者教育材料管理不完善",
        description: "缺少个性化患者教育材料推送和管理功能",
        impact: "medium",
        effort: "low",
      },
      {
        id: "pm-gap-3",
        title: "多语言支持不足",
        description: "患者界面和材料的多语言本地化支持有限",
        impact: "medium",
        effort: "medium",
      },
    ],
    recommendations: [
      {
        id: "pm-rec-1",
        title: "实施智能患者画像系统",
        description: "基于AI算法构建全面的患者健康画像和风险评估模型",
        benefits: ["提高诊疗效率", "降低医疗风险", "个性化治疗方案"],
        implementation: "集成机器学习算法，分析患者历史数据和实时指标",
      },
      {
        id: "pm-rec-2",
        title: "建立家属沟通管理系统",
        description: "创建专门的家属沟通平台，提供及时的病情更新和沟通渠道",
        benefits: ["改善医患关系", "提高透明度", "减少沟通成本"],
        implementation: "开发多渠道通信系统，支持短信、邮件、应用推送",
      },
    ],
    priorityImprovements: [
      {
        id: "pm-pri-1",
        title: "患者画像深度分析",
        description: "基于AI的患者全方位健康画像分析系统",
        priority: 1,
        estimatedTime: "2-3周",
      },
      {
        id: "pm-pri-2",
        title: "家属沟通管理",
        description: "完整的家属沟通和信息管理平台",
        priority: 2,
        estimatedTime: "1-2周",
      },
    ],
  },
  {
    module: "AI诊断系统 (AI Diagnosis)",
    currentCompletion: 90,
    gaps: [
      {
        id: "ai-gap-1",
        title: "多模态数据融合不完善",
        description: "缺少高效的多模态医疗数据融合和分析能力",
        impact: "high",
        effort: "high",
      },
      {
        id: "ai-gap-2",
        title: "诊断解释性不足",
        description: "AI诊断结果缺少详细的解释和推理过程展示",
        impact: "high",
        effort: "medium",
      },
      {
        id: "ai-gap-3",
        title: "边缘计算支持缺失",
        description: "缺少边缘设备部署和离线诊断能力",
        impact: "medium",
        effort: "high",
      },
    ],
    recommendations: [
      {
        id: "ai-rec-1",
        title: "实施多模态融合优化器",
        description: "开发智能的多模态数据融合系统，提高诊断准确性",
        benefits: ["提高诊断精度", "减少误诊率", "支持复杂病例"],
        implementation: "使用深度学习技术融合影像、文本、数值等多种数据",
      },
      {
        id: "ai-rec-2",
        title: "增强诊断解释性系统",
        description: "为不同用户群体提供个性化的AI诊断解释",
        benefits: ["增强医生信任", "提高患者理解", "支持医学教育"],
        implementation: "开发分层解释系统，支持技术和非技术用户",
      },
    ],
    priorityImprovements: [
      {
        id: "ai-pri-1",
        title: "多模态数据融合深度优化",
        description: "智能整合多种医疗数据模态的高级融合系统",
        priority: 1,
        estimatedTime: "3-4周",
      },
      {
        id: "ai-pri-2",
        title: "实时诊断结果解释性增强",
        description: "为不同用户群体提供个性化的AI诊断解释系统",
        priority: 2,
        estimatedTime: "2-3周",
      },
    ],
  },
  {
    module: "临床决策支持 (Clinical Decision Support)",
    currentCompletion: 90,
    gaps: [
      {
        id: "cds-gap-1",
        title: "个性化治疗推荐不足",
        description: "缺少基于患者个体特征的精准治疗方案推荐",
        impact: "high",
        effort: "medium",
      },
      {
        id: "cds-gap-2",
        title: "多学科会诊平台缺失",
        description: "缺少支持多学科专家协作的会诊平台",
        impact: "high",
        effort: "medium",
      },
      {
        id: "cds-gap-3",
        title: "实时决策支持不完善",
        description: "缺少实时的临床决策支持和预警系统",
        impact: "medium",
        effort: "medium",
      },
    ],
    recommendations: [
      {
        id: "cds-rec-1",
        title: "建立个性化治疗推荐引擎",
        description: "基于患者基因型、病史和偏好的个性化治疗方案推荐",
        benefits: ["提高治疗效果", "减少副作用", "优化资源配置"],
        implementation: "集成基因组学数据和机器学习算法",
      },
      {
        id: "cds-rec-2",
        title: "开发多学科会诊平台",
        description: "支持多专科医生实时协作的数字化会诊系统",
        benefits: ["提高诊疗质量", "促进知识共享", "减少转诊时间"],
        implementation: "构建实时通信和协作工具，支持文档共享和视频会议",
      },
    ],
    priorityImprovements: [
      {
        id: "cds-pri-1",
        title: "个性化治疗推荐系统",
        description: "基于AI算法的患者个性化治疗方案推荐引擎",
        priority: 1,
        estimatedTime: "2-3周",
      },
      {
        id: "cds-pri-2",
        title: "多学科会诊协作平台",
        description: "支持多专科医生实时协作的综合会诊系统",
        priority: 2,
        estimatedTime: "3-4周",
      },
    ],
  },
]
