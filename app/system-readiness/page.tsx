"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SystemCompletenessChecker } from "@/components/system-health/system-completeness-checker"
import { ComplianceChecker } from "@/components/compliance/compliance-checker"
import { CodeQualityChecker } from "@/components/quality/code-quality-checker"
import {
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  FileText,
  Shield,
  Code,
  Activity,
  Database,
  Network,
  Users,
} from "lucide-react"

interface ReadinessItem {
  category: string
  name: string
  status: "ready" | "partial" | "not-ready"
  score: number
  description: string
  criticalIssues: number
  recommendations: number
}

const readinessData: ReadinessItem[] = [
  {
    category: "核心功能",
    name: "患者管理系统",
    status: "ready",
    score: 95,
    description: "患者信息管理、病历记录、预约调度等核心功能",
    criticalIssues: 0,
    recommendations: 2,
  },
  {
    category: "核心功能",
    name: "AI诊断引擎",
    status: "ready",
    score: 90,
    description: "智能诊断、影像分析、决策支持等AI功能",
    criticalIssues: 0,
    recommendations: 3,
  },
  {
    category: "核心功能",
    name: "临床决策支持",
    status: "ready",
    score: 88,
    description: "治疗建议、药物相互作用、临床指南等",
    criticalIssues: 0,
    recommendations: 4,
  },
  {
    category: "安全合规",
    name: "数据安全",
    status: "ready",
    score: 92,
    description: "数据加密、访问控制、安全传输等",
    criticalIssues: 0,
    recommendations: 2,
  },
  {
    category: "安全合规",
    name: "HIPAA合规",
    status: "partial",
    score: 75,
    description: "HIPAA法规要求的技术和管理保护措施",
    criticalIssues: 2,
    recommendations: 5,
  },
  {
    category: "安全合规",
    name: "GDPR合规",
    status: "partial",
    score: 70,
    description: "欧盟GDPR数据保护法规合规性",
    criticalIssues: 2,
    recommendations: 6,
  },
  {
    category: "技术架构",
    name: "系统性能",
    status: "ready",
    score: 85,
    description: "响应时间、并发处理、资源利用率等",
    criticalIssues: 0,
    recommendations: 3,
  },
  {
    category: "技术架构",
    name: "可扩展性",
    status: "ready",
    score: 82,
    description: "水平扩展、负载均衡、微服务架构等",
    criticalIssues: 0,
    recommendations: 4,
  },
  {
    category: "技术架构",
    name: "监控告警",
    status: "partial",
    score: 65,
    description: "系统监控、性能指标、故障告警等",
    criticalIssues: 1,
    recommendations: 5,
  },
  {
    category: "运营支持",
    name: "用户培训",
    status: "not-ready",
    score: 40,
    description: "用户手册、培训材料、操作指南等",
    criticalIssues: 3,
    recommendations: 8,
  },
  {
    category: "运营支持",
    name: "技术支持",
    status: "partial",
    score: 60,
    description: "故障处理、技术文档、支持流程等",
    criticalIssues: 1,
    recommendations: 6,
  },
  {
    category: "运营支持",
    name: "备份恢复",
    status: "partial",
    score: 70,
    description: "数据备份、灾难恢复、业务连续性等",
    criticalIssues: 1,
    recommendations: 4,
  },
]

export default function SystemReadinessPage() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />
      case "not-ready":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      ready: "bg-green-100 text-green-800",
      partial: "bg-yellow-100 text-yellow-800",
      "not-ready": "bg-red-100 text-red-800",
    }

    const labels = {
      ready: "就绪",
      partial: "部分就绪",
      "not-ready": "未就绪",
    }

    return <Badge className={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Badge>
  }

  const calculateOverallReadiness = () => {
    const totalScore = readinessData.reduce((sum, item) => sum + item.score, 0)
    return Math.round(totalScore / readinessData.length)
  }

  const getReadyCount = () => readinessData.filter((item) => item.status === "ready").length
  const getCriticalIssuesCount = () => readinessData.reduce((sum, item) => sum + item.criticalIssues, 0)

  const groupedData = readinessData.reduce(
    (acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = []
      }
      acc[item.category].push(item)
      return acc
    },
    {} as Record<string, ReadinessItem[]>,
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">系统运营就绪评估</h1>
          <p className="text-muted-foreground mt-2">全面评估医疗系统的功能完整性、合规性和运营就绪状态</p>
        </div>
        <Button className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          导出报告
        </Button>
      </div>

      {/* 总体状态概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Activity className="h-5 w-5" />
            总体就绪状态
          </CardTitle>
          <CardDescription>系统各模块的整体就绪情况和关键指标</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">{calculateOverallReadiness()}%</div>
              <div className="text-sm text-muted-foreground">总体就绪度</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">
                {getReadyCount()}/{readinessData.length}
              </div>
              <div className="text-sm text-muted-foreground">就绪模块</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600 mb-2">{getCriticalIssuesCount()}</div>
              <div className="text-sm text-muted-foreground">关键问题</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">
                {readinessData.reduce((sum, item) => sum + item.recommendations, 0)}
              </div>
              <div className="text-sm text-muted-foreground">改进建议</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            概览
          </TabsTrigger>
          <TabsTrigger value="completeness" className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            功能完整性
          </TabsTrigger>
          <TabsTrigger value="compliance" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            合规性
          </TabsTrigger>
          <TabsTrigger value="quality" className="flex items-center gap-2">
            <Code className="h-4 w-4" />
            代码质量
          </TabsTrigger>
          <TabsTrigger value="recommendations" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            建议
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="space-y-6">
            {Object.entries(groupedData).map(([category, items]) => (
              <Card key={category}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {category === "核心功能" && <Database className="h-5 w-5" />}
                    {category === "安全合规" && <Shield className="h-5 w-5" />}
                    {category === "技术架构" && <Network className="h-5 w-5" />}
                    {category === "运营支持" && <Users className="h-5 w-5" />}
                    {category}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    {items.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getStatusIcon(item.status)}
                          <div>
                            <h4 className="font-medium">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-lg font-semibold">{item.score}%</div>
                            <div className="text-xs text-muted-foreground">
                              {item.criticalIssues > 0 && (
                                <span className="text-red-600">{item.criticalIssues} 问题</span>
                              )}
                              {item.criticalIssues > 0 && item.recommendations > 0 && " • "}
                              {item.recommendations > 0 && (
                                <span className="text-blue-600">{item.recommendations} 建议</span>
                              )}
                            </div>
                          </div>
                          {getStatusBadge(item.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completeness" className="mt-6">
          <SystemCompletenessChecker />
        </TabsContent>

        <TabsContent value="compliance" className="mt-6">
          <ComplianceChecker />
        </TabsContent>

        <TabsContent value="quality" className="mt-6">
          <CodeQualityChecker />
        </TabsContent>

        <TabsContent value="recommendations" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>运营就绪建议</CardTitle>
              <CardDescription>基于评估结果的具体改进建议和实施计划</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-600 mb-3">高优先级（立即处理）</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      完善HIPAA和GDPR合规性文档和流程
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      建立完整的用户培训体系和操作手册
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-4 w-4 text-red-500 mt-0.5" />
                      实施全面的系统监控和告警机制
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-yellow-600 mb-3">中优先级（近期完成）</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      完善数据备份和灾难恢复计划
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      建立技术支持和故障处理流程
                    </li>
                    <li className="flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                      增加单元测试和集成测试覆盖率
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-3">低优先级（持续改进）</h3>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      优化系统性能和用户体验
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      扩展AI模型的解释性和透明度
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500 mt-0.5" />
                      集成更多第三方医疗系统和标准
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
