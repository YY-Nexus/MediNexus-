"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, AlertCircle, XCircle, Clock, Shield, Database, Network, Code } from "lucide-react"

interface SystemModule {
  name: string
  category: "core" | "security" | "compliance" | "integration"
  status: "complete" | "partial" | "missing" | "error"
  completeness: number
  criticalIssues: string[]
  recommendations: string[]
}

const systemModules: SystemModule[] = [
  // 核心功能模块
  {
    name: "患者管理系统",
    category: "core",
    status: "complete",
    completeness: 95,
    criticalIssues: [],
    recommendations: ["添加患者隐私设置", "完善患者分组功能"],
  },
  {
    name: "AI诊断引擎",
    category: "core",
    status: "complete",
    completeness: 90,
    criticalIssues: [],
    recommendations: ["增加模型解释性", "添加诊断置信度评估"],
  },
  {
    name: "临床决策支持",
    category: "core",
    status: "complete",
    completeness: 88,
    criticalIssues: [],
    recommendations: ["集成更多临床指南", "添加药物相互作用检查"],
  },
  {
    name: "电子病历集成",
    category: "integration",
    status: "complete",
    completeness: 85,
    criticalIssues: [],
    recommendations: ["支持更多EHR标准", "优化数据同步性能"],
  },
  {
    name: "远程会诊系统",
    category: "core",
    status: "complete",
    completeness: 82,
    criticalIssues: [],
    recommendations: ["添加多方会诊支持", "优化视频质量"],
  },

  // 安全与合规模块
  {
    name: "数据加密与安全",
    category: "security",
    status: "complete",
    completeness: 92,
    criticalIssues: [],
    recommendations: ["实施零信任架构", "添加端到端加密"],
  },
  {
    name: "访问控制系统",
    category: "security",
    status: "complete",
    completeness: 90,
    criticalIssues: [],
    recommendations: ["添加生物识别认证", "完善权限细粒度控制"],
  },
  {
    name: "审计日志系统",
    category: "compliance",
    status: "complete",
    completeness: 88,
    criticalIssues: [],
    recommendations: ["增加实时监控", "完善日志分析功能"],
  },
  {
    name: "HIPAA合规性",
    category: "compliance",
    status: "partial",
    completeness: 75,
    criticalIssues: ["缺少BAA协议模板", "需要完善数据处理记录"],
    recommendations: ["添加HIPAA合规检查清单", "实施数据最小化原则"],
  },
  {
    name: "GDPR合规性",
    category: "compliance",
    status: "partial",
    completeness: 70,
    criticalIssues: ["缺少数据主体权利管理", "需要完善同意管理"],
    recommendations: ["添加数据可携带性功能", "实施被遗忘权"],
  },

  // 技术基础设施
  {
    name: "数据库架构",
    category: "core",
    status: "complete",
    completeness: 85,
    criticalIssues: [],
    recommendations: ["优化查询性能", "添加数据备份策略"],
  },
  {
    name: "API网关",
    category: "integration",
    status: "complete",
    completeness: 80,
    criticalIssues: [],
    recommendations: ["添加API版本管理", "完善限流策略"],
  },
  {
    name: "监控与告警",
    category: "core",
    status: "partial",
    completeness: 65,
    criticalIssues: ["缺少业务指标监控"],
    recommendations: ["添加APM工具", "完善告警规则"],
  },
]

export function SystemCompletenessChecker() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [overallScore, setOverallScore] = useState(0)

  useEffect(() => {
    const filteredModules =
      selectedCategory === "all" ? systemModules : systemModules.filter((m) => m.category === selectedCategory)

    const avgScore = filteredModules.reduce((sum, module) => sum + module.completeness, 0) / filteredModules.length
    setOverallScore(Math.round(avgScore))
  }, [selectedCategory])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <Clock className="h-5 w-5 text-yellow-500" />
      case "missing":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "error":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "complete":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "missing":
        return "bg-red-100 text-red-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const categories = [
    { value: "all", label: "全部模块", icon: Database },
    { value: "core", label: "核心功能", icon: Code },
    { value: "security", label: "安全模块", icon: Shield },
    { value: "compliance", label: "合规模块", icon: CheckCircle },
    { value: "integration", label: "集成模块", icon: Network },
  ]

  const filteredModules =
    selectedCategory === "all" ? systemModules : systemModules.filter((m) => m.category === selectedCategory)

  const criticalIssuesCount = filteredModules.reduce((sum, module) => sum + module.criticalIssues.length, 0)

  return (
    <div className="space-y-6">
      {/* 总体评分 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            系统完整性评估
          </CardTitle>
          <CardDescription>医疗系统各模块的完整性和合规性评估</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{overallScore}%</div>
              <div className="text-sm text-muted-foreground">总体完整度</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">
                {filteredModules.filter((m) => m.status === "complete").length}
              </div>
              <div className="text-sm text-muted-foreground">完整模块</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600">{criticalIssuesCount}</div>
              <div className="text-sm text-muted-foreground">关键问题</div>
            </div>
          </div>

          <Progress value={overallScore} className="h-3" />
        </CardContent>
      </Card>

      {/* 分类筛选 */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.value}
              onClick={() => setSelectedCategory(category.value)}
              className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                selectedCategory === category.value
                  ? "bg-blue-100 text-blue-700"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              {category.label}
            </button>
          )
        })}
      </div>

      {/* 模块详情 */}
      <div className="grid gap-4">
        {filteredModules.map((module, index) => (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(module.status)}
                  <CardTitle className="text-lg">{module.name}</CardTitle>
                  <Badge className={getStatusColor(module.status)}>
                    {module.status === "complete"
                      ? "完整"
                      : module.status === "partial"
                        ? "部分完成"
                        : module.status === "missing"
                          ? "缺失"
                          : "错误"}
                  </Badge>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">{module.completeness}%</div>
                  <Progress value={module.completeness} className="w-20 h-2" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {module.criticalIssues.length > 0 && (
                <div className="mb-4">
                  <h4 className="font-medium text-red-600 mb-2">关键问题：</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                    {module.criticalIssues.map((issue, i) => (
                      <li key={i}>{issue}</li>
                    ))}
                  </ul>
                </div>
              )}

              {module.recommendations.length > 0 && (
                <div>
                  <h4 className="font-medium text-blue-600 mb-2">改进建议：</h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-blue-600">
                    {module.recommendations.map((rec, i) => (
                      <li key={i}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
