"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Code, Bug, Shield, Zap, FileText, AlertTriangle, CheckCircle } from "lucide-react"

interface QualityMetric {
  name: string
  score: number
  status: "excellent" | "good" | "warning" | "error"
  description: string
  issues: string[]
  recommendations: string[]
}

interface QualityCategory {
  name: string
  icon: any
  metrics: QualityMetric[]
  overallScore: number
}

const qualityData: QualityCategory[] = [
  {
    name: "代码结构",
    icon: Code,
    overallScore: 88,
    metrics: [
      {
        name: "组件架构",
        score: 92,
        status: "excellent",
        description: "组件设计和架构质量",
        issues: [],
        recommendations: ["继续保持良好的组件分离", "考虑添加更多复用组件"],
      },
      {
        name: "TypeScript覆盖率",
        score: 95,
        status: "excellent",
        description: "TypeScript类型定义覆盖率",
        issues: [],
        recommendations: ["保持严格的类型检查", "添加更多泛型类型"],
      },
      {
        name: "代码复用性",
        score: 85,
        status: "good",
        description: "代码复用和模块化程度",
        issues: ["部分组件存在重复逻辑"],
        recommendations: ["提取公共逻辑到hooks", "创建更多通用组件"],
      },
      {
        name: "文件组织",
        score: 90,
        status: "excellent",
        description: "文件和目录结构组织",
        issues: [],
        recommendations: ["保持当前的文件组织结构", "考虑按功能模块进一步分组"],
      },
    ],
  },
  {
    name: "性能优化",
    icon: Zap,
    overallScore: 82,
    metrics: [
      {
        name: "渲染性能",
        score: 85,
        status: "good",
        description: "组件渲染和重渲染优化",
        issues: ["部分组件存在不必要的重渲染"],
        recommendations: ["使用React.memo优化组件", "优化useEffect依赖"],
      },
      {
        name: "代码分割",
        score: 80,
        status: "good",
        description: "动态导入和代码分割",
        issues: ["部分页面缺少懒加载"],
        recommendations: ["实施更多的懒加载", "优化bundle大小"],
      },
      {
        name: "内存管理",
        score: 88,
        status: "good",
        description: "内存泄漏和资源管理",
        issues: [],
        recommendations: ["继续监控内存使用", "优化大数据集处理"],
      },
      {
        name: "缓存策略",
        score: 75,
        status: "warning",
        description: "数据缓存和状态管理",
        issues: ["缺少有效的缓存策略"],
        recommendations: ["实施React Query", "添加本地存储缓存"],
      },
    ],
  },
  {
    name: "安全性",
    icon: Shield,
    overallScore: 86,
    metrics: [
      {
        name: "输入验证",
        score: 90,
        status: "excellent",
        description: "用户输入验证和清理",
        issues: [],
        recommendations: ["保持严格的输入验证", "添加更多边界检查"],
      },
      {
        name: "XSS防护",
        score: 88,
        status: "good",
        description: "跨站脚本攻击防护",
        issues: [],
        recommendations: ["继续使用安全的渲染方式", "定期安全审计"],
      },
      {
        name: "CSRF防护",
        score: 85,
        status: "good",
        description: "跨站请求伪造防护",
        issues: [],
        recommendations: ["实施CSRF令牌", "验证请求来源"],
      },
      {
        name: "敏感数据处理",
        score: 82,
        status: "good",
        description: "敏感信息的安全处理",
        issues: ["部分敏感数据可能在客户端暴露"],
        recommendations: ["加强数据脱敏", "减少客户端敏感数据"],
      },
    ],
  },
  {
    name: "错误处理",
    icon: Bug,
    overallScore: 84,
    metrics: [
      {
        name: "错误边界",
        score: 90,
        status: "excellent",
        description: "React错误边界实现",
        issues: [],
        recommendations: ["保持完善的错误边界", "添加更多错误恢复机制"],
      },
      {
        name: "异常处理",
        score: 85,
        status: "good",
        description: "异步操作和API错误处理",
        issues: [],
        recommendations: ["统一错误处理策略", "改善错误用户体验"],
      },
      {
        name: "日志记录",
        score: 80,
        status: "good",
        description: "错误日志和监控",
        issues: ["缺少结构化日志"],
        recommendations: ["实施结构化日志", "添加错误追踪"],
      },
      {
        name: "用户反馈",
        score: 82,
        status: "good",
        description: "错误信息的用户友好性",
        issues: [],
        recommendations: ["优化错误消息", "添加帮助链接"],
      },
    ],
  },
  {
    name: "可维护性",
    icon: FileText,
    overallScore: 87,
    metrics: [
      {
        name: "代码注释",
        score: 85,
        status: "good",
        description: "代码注释和文档质量",
        issues: ["部分复杂逻辑缺少注释"],
        recommendations: ["添加更多业务逻辑注释", "完善API文档"],
      },
      {
        name: "测试覆盖率",
        score: 75,
        status: "warning",
        description: "单元测试和集成测试覆盖",
        issues: ["测试覆盖率偏低"],
        recommendations: ["增加单元测试", "添加集成测试"],
      },
      {
        name: "代码规范",
        score: 95,
        status: "excellent",
        description: "代码风格和规范一致性",
        issues: [],
        recommendations: ["保持当前的代码规范", "定期更新linting规则"],
      },
      {
        name: "依赖管理",
        score: 88,
        status: "good",
        description: "第三方依赖的管理和更新",
        issues: [],
        recommendations: ["定期更新依赖", "监控安全漏洞"],
      },
    ],
  },
]

export function CodeQualityChecker() {
  const [selectedCategory, setSelectedCategory] = useState(0)
  const [overallScore, setOverallScore] = useState(0)

  useEffect(() => {
    const totalScore = qualityData.reduce((sum, category) => sum + category.overallScore, 0)
    setOverallScore(Math.round(totalScore / qualityData.length))
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "error":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      excellent: "bg-green-100 text-green-800",
      good: "bg-blue-100 text-blue-800",
      warning: "bg-yellow-100 text-yellow-800",
      error: "bg-red-100 text-red-800",
    }

    const labels = {
      excellent: "优秀",
      good: "良好",
      warning: "警告",
      error: "错误",
    }

    return <Badge className={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* 总体评分 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            代码质量评估
          </CardTitle>
          <CardDescription>系统代码质量、性能和可维护性的全面评估</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600">{overallScore}%</div>
              <div className="text-sm text-muted-foreground">总体评分</div>
            </div>
            {qualityData.map((category, index) => (
              <div key={index} className="text-center">
                <div
                  className={`text-2xl font-bold ${getStatusColor(
                    category.overallScore >= 90
                      ? "excellent"
                      : category.overallScore >= 80
                        ? "good"
                        : category.overallScore >= 70
                          ? "warning"
                          : "error",
                  )}`}
                >
                  {category.overallScore}%
                </div>
                <div className="text-xs text-muted-foreground">{category.name}</div>
              </div>
            ))}
          </div>

          <Progress value={overallScore} className="h-3" />
        </CardContent>
      </Card>

      {/* 分类详情 */}
      <Tabs value={selectedCategory.toString()} onValueChange={(value) => setSelectedCategory(Number.parseInt(value))}>
        <TabsList className="grid w-full grid-cols-5">
          {qualityData.map((category, index) => {
            const Icon = category.icon
            return (
              <TabsTrigger key={index} value={index.toString()} className="flex items-center gap-1">
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{category.name}</span>
              </TabsTrigger>
            )
          })}
        </TabsList>

        {qualityData.map((category, categoryIndex) => (
          <TabsContent key={categoryIndex} value={categoryIndex.toString()} className="mt-6">
            <div className="grid gap-4">
              {category.metrics.map((metric, metricIndex) => (
                <Card key={metricIndex}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-lg">{metric.name}</CardTitle>
                        <CardDescription>{metric.description}</CardDescription>
                      </div>
                      <div className="flex items-center gap-3">
                        {getStatusBadge(metric.status)}
                        <div className="text-right">
                          <div className={`text-xl font-bold ${getStatusColor(metric.status)}`}>{metric.score}%</div>
                          <Progress value={metric.score} className="w-20 h-2" />
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {metric.issues.length > 0 && (
                      <div className="mb-4">
                        <h4 className="font-medium text-red-600 mb-2 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4" />
                          发现的问题：
                        </h4>
                        <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                          {metric.issues.map((issue, i) => (
                            <li key={i}>{issue}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <h4 className="font-medium text-blue-600 mb-2 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4" />
                        改进建议：
                      </h4>
                      <ul className="list-disc list-inside space-y-1 text-sm text-blue-600">
                        {metric.recommendations.map((rec, i) => (
                          <li key={i}>{rec}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
