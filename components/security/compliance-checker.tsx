"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Shield,
  CheckCircle,
  AlertTriangle,
  FileText,
  Download,
  Calendar,
  Clock,
  TrendingUp,
  Eye,
  Zap,
} from "lucide-react"

interface ComplianceStandard {
  id: string
  name: string
  description: string
  status: "compliant" | "partial" | "non_compliant" | "pending"
  score: number
  lastAssessment: string
  nextAssessment: string
  requirements: ComplianceRequirement[]
}

interface ComplianceRequirement {
  id: string
  title: string
  description: string
  status: "met" | "partial" | "not_met" | "not_applicable"
  priority: "high" | "medium" | "low"
  evidence: string[]
  remediation: string[]
}

interface ComplianceReport {
  id: string
  standard: string
  generatedAt: string
  overallScore: number
  status: string
  findings: number
  recommendations: number
}

export function ComplianceChecker() {
  const [activeTab, setActiveTab] = useState("overview")
  const [autoAssessment, setAutoAssessment] = useState(true)

  const [complianceStandards, setComplianceStandards] = useState<ComplianceStandard[]>([
    {
      id: "hipaa",
      name: "HIPAA",
      description: "美国健康保险流通与责任法案",
      status: "compliant",
      score: 94,
      lastAssessment: "2024-12-01",
      nextAssessment: "2025-03-01",
      requirements: [
        {
          id: "hipaa-001",
          title: "数据加密要求",
          description: "所有PHI数据必须进行加密存储和传输",
          status: "met",
          priority: "high",
          evidence: ["AES-256加密配置", "TLS 1.3传输加密"],
          remediation: [],
        },
        {
          id: "hipaa-002",
          title: "访问控制",
          description: "实施基于角色的访问控制",
          status: "met",
          priority: "high",
          evidence: ["RBAC系统配置", "用户权限审计"],
          remediation: [],
        },
        {
          id: "hipaa-003",
          title: "审计日志",
          description: "记录所有对PHI的访问和操作",
          status: "partial",
          priority: "medium",
          evidence: ["访问日志系统"],
          remediation: ["增强日志详细程度", "实施实时监控"],
        },
      ],
    },
    {
      id: "gdpr",
      name: "GDPR",
      description: "欧盟通用数据保护条例",
      status: "partial",
      score: 78,
      lastAssessment: "2024-11-15",
      nextAssessment: "2025-02-15",
      requirements: [
        {
          id: "gdpr-001",
          title: "数据主体权利",
          description: "支持数据主体的访问、更正、删除权利",
          status: "met",
          priority: "high",
          evidence: ["用户数据管理界面", "数据删除功能"],
          remediation: [],
        },
        {
          id: "gdpr-002",
          title: "数据处理合法性",
          description: "确保数据处理的合法基础",
          status: "partial",
          priority: "high",
          evidence: ["用户同意记录"],
          remediation: ["完善同意管理系统", "增加合法基础文档"],
        },
        {
          id: "gdpr-003",
          title: "数据保护影响评估",
          description: "对高风险处理活动进行DPIA",
          status: "not_met",
          priority: "medium",
          evidence: [],
          remediation: ["制定DPIA流程", "进行风险评估"],
        },
      ],
    },
    {
      id: "iso27001",
      name: "ISO 27001",
      description: "信息安全管理体系国际标准",
      status: "pending",
      score: 65,
      lastAssessment: "2024-10-01",
      nextAssessment: "2025-01-01",
      requirements: [
        {
          id: "iso-001",
          title: "信息安全政策",
          description: "建立和维护信息安全政策",
          status: "met",
          priority: "high",
          evidence: ["安全政策文档", "政策培训记录"],
          remediation: [],
        },
        {
          id: "iso-002",
          title: "风险管理",
          description: "实施信息安全风险管理流程",
          status: "partial",
          priority: "high",
          evidence: ["风险评估报告"],
          remediation: ["完善风险管理流程", "定期风险评估"],
        },
        {
          id: "iso-003",
          title: "事件响应",
          description: "建立安全事件响应机制",
          status: "not_met",
          priority: "medium",
          evidence: [],
          remediation: ["制定事件响应计划", "建立响应团队"],
        },
      ],
    },
    {
      id: "cybersecurity-law",
      name: "网络安全法",
      description: "中华人民共和国网络安全法",
      status: "compliant",
      score: 88,
      lastAssessment: "2024-12-10",
      nextAssessment: "2025-06-10",
      requirements: [
        {
          id: "csl-001",
          title: "网络安全等级保护",
          description: "实施网络安全等级保护制度",
          status: "met",
          priority: "high",
          evidence: ["等保测评报告", "安全防护措施"],
          remediation: [],
        },
        {
          id: "csl-002",
          title: "数据本地化",
          description: "关键信息基础设施数据本地存储",
          status: "met",
          priority: "high",
          evidence: ["数据存储位置证明", "本地化部署方案"],
          remediation: [],
        },
        {
          id: "csl-003",
          title: "安全审查",
          description: "配合网络安全审查工作",
          status: "met",
          priority: "medium",
          evidence: ["审查配合记录"],
          remediation: [],
        },
      ],
    },
  ])

  const [complianceReports, setComplianceReports] = useState<ComplianceReport[]>([
    {
      id: "report-001",
      standard: "HIPAA",
      generatedAt: "2024-12-01",
      overallScore: 94,
      status: "合规",
      findings: 2,
      recommendations: 3,
    },
    {
      id: "report-002",
      standard: "GDPR",
      generatedAt: "2024-11-15",
      overallScore: 78,
      status: "部分合规",
      findings: 5,
      recommendations: 8,
    },
    {
      id: "report-003",
      standard: "ISO 27001",
      generatedAt: "2024-10-01",
      overallScore: 65,
      status: "待改进",
      findings: 12,
      recommendations: 15,
    },
  ])

  // 获取合规状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "compliant":
        return "bg-green-500"
      case "partial":
        return "bg-yellow-500"
      case "non_compliant":
        return "bg-red-500"
      case "pending":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  // 获取要求状态颜色
  const getRequirementStatusColor = (status: string) => {
    switch (status) {
      case "met":
        return "text-green-600"
      case "partial":
        return "text-yellow-600"
      case "not_met":
        return "text-red-600"
      case "not_applicable":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  // 获取优先级颜色
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600"
      case "medium":
        return "text-yellow-600"
      case "low":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  // 生成合规报告
  const generateReport = (standardId: string) => {
    console.log(`生成 ${standardId} 合规报告...`)
    // 实际实现中会生成详细的合规报告
  }

  // 开始评估
  const startAssessment = (standardId: string) => {
    setComplianceStandards((standards) =>
      standards.map((standard) =>
        standard.id === standardId ? { ...standard, status: "pending" as const } : standard,
      ),
    )

    // 模拟评估过程
    setTimeout(() => {
      setComplianceStandards((standards) =>
        standards.map((standard) =>
          standard.id === standardId
            ? {
                ...standard,
                status: "compliant" as const,
                lastAssessment: new Date().toISOString().split("T")[0],
              }
            : standard,
        ),
      )
    }, 3000)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">合规性检查</h2>
          <p className="text-muted-foreground">监控和管理法规合规状态</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="auto-assessment" checked={autoAssessment} onCheckedChange={setAutoAssessment} />
            <Label htmlFor="auto-assessment">自动评估</Label>
          </div>
          <Button>
            <Download className="h-4 w-4 mr-2" />
            导出报告
          </Button>
        </div>
      </div>

      {/* 合规概览 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">合规标准</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{complianceStandards.length}</div>
            <p className="text-xs text-muted-foreground">已配置标准</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完全合规</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {complianceStandards.filter((s) => s.status === "compliant").length}
            </div>
            <p className="text-xs text-muted-foreground">
              合规率{" "}
              {(
                (complianceStandards.filter((s) => s.status === "compliant").length / complianceStandards.length) *
                100
              ).toFixed(0)}
              %
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">需要改进</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {complianceStandards.filter((s) => s.status === "partial" || s.status === "non_compliant").length}
            </div>
            <p className="text-xs text-muted-foreground">待处理项目</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均分数</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(complianceStandards.reduce((sum, s) => sum + s.score, 0) / complianceStandards.length)}
            </div>
            <p className="text-xs text-muted-foreground">总体合规分数</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">合规概览</TabsTrigger>
          <TabsTrigger value="standards">合规标准</TabsTrigger>
          <TabsTrigger value="reports">合规报告</TabsTrigger>
          <TabsTrigger value="settings">合规设置</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>合规状态总览</CardTitle>
                <CardDescription>各项合规标准的当前状态</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {complianceStandards.map((standard) => (
                  <div key={standard.id} className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">{standard.name}</span>
                        <Badge className={getStatusColor(standard.status)}>
                          {standard.status === "compliant"
                            ? "合规"
                            : standard.status === "partial"
                              ? "部分合规"
                              : standard.status === "non_compliant"
                                ? "不合规"
                                : "评估中"}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">分数: {standard.score}/100</div>
                    </div>
                    <div className="text-right">
                      <Progress value={standard.score} className="w-20" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>即将到期的评估</CardTitle>
                <CardDescription>需要进行重新评估的合规标准</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {complianceStandards
                  .filter((standard) => {
                    const nextDate = new Date(standard.nextAssessment)
                    const now = new Date()
                    const diffDays = Math.ceil((nextDate.getTime() - now.getTime()) / (1000 * 3600 * 24))
                    return diffDays <= 30
                  })
                  .map((standard) => (
                    <Alert key={standard.id}>
                      <Calendar className="h-4 w-4" />
                      <AlertTitle>{standard.name}</AlertTitle>
                      <AlertDescription>
                        下次评估日期: {standard.nextAssessment}
                        <div className="mt-2">
                          <Button size="sm" onClick={() => startAssessment(standard.id)}>
                            开始评估
                          </Button>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="standards" className="space-y-4">
          <div className="space-y-4">
            {complianceStandards.map((standard) => (
              <Card key={standard.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <span>{standard.name}</span>
                        <Badge className={getStatusColor(standard.status)}>
                          {standard.status === "compliant"
                            ? "合规"
                            : standard.status === "partial"
                              ? "部分合规"
                              : standard.status === "non_compliant"
                                ? "不合规"
                                : "评估中"}
                        </Badge>
                      </CardTitle>
                      <CardDescription>{standard.description}</CardDescription>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold">{standard.score}/100</div>
                      <div className="text-sm text-muted-foreground">合规分数</div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium">最后评估:</span> {standard.lastAssessment}
                      </div>
                      <div>
                        <span className="font-medium">下次评估:</span> {standard.nextAssessment}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-medium">合规要求</h4>
                      {standard.requirements.map((req) => (
                        <div key={req.id} className="border rounded-lg p-3 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{req.title}</span>
                              <Badge variant="outline" className={getPriorityColor(req.priority)}>
                                {req.priority === "high" ? "高" : req.priority === "medium" ? "中" : "低"}
                              </Badge>
                            </div>
                            <span className={`text-sm font-medium ${getRequirementStatusColor(req.status)}`}>
                              {req.status === "met"
                                ? "已满足"
                                : req.status === "partial"
                                  ? "部分满足"
                                  : req.status === "not_met"
                                    ? "未满足"
                                    : "不适用"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{req.description}</p>

                          {req.evidence.length > 0 && (
                            <div className="text-sm">
                              <span className="font-medium">证据:</span>
                              <ul className="list-disc list-inside ml-4 mt-1">
                                {req.evidence.map((evidence, index) => (
                                  <li key={index}>{evidence}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {req.remediation.length > 0 && (
                            <div className="text-sm">
                              <span className="font-medium">改进措施:</span>
                              <ul className="list-disc list-inside ml-4 mt-1">
                                {req.remediation.map((action, index) => (
                                  <li key={index}>{action}</li>
                                ))}
                              </ul>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        onClick={() => startAssessment(standard.id)}
                        disabled={standard.status === "pending"}
                      >
                        {standard.status === "pending" ? (
                          <>
                            <Clock className="h-4 w-4 mr-2 animate-spin" />
                            评估中...
                          </>
                        ) : (
                          <>
                            <Zap className="h-4 w-4 mr-2" />
                            开始评估
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => generateReport(standard.id)}>
                        <FileText className="h-4 w-4 mr-2" />
                        生成报告
                      </Button>
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        查看详情
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>合规报告历史</CardTitle>
              <CardDescription>查看和下载历史合规报告</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceReports.map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{report.standard} 合规报告</h4>
                        <Badge variant="outline">{report.status}</Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        生成时间: {report.generatedAt} | 分数: {report.overallScore}/100 | 发现: {report.findings}项 |
                        建议: {report.recommendations}项
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Eye className="h-4 w-4 mr-2" />
                        查看
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        下载
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>合规设置</CardTitle>
              <CardDescription>配置合规检查参数和通知</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch id="auto-assessment" checked={autoAssessment} onCheckedChange={setAutoAssessment} />
                  <Label htmlFor="auto-assessment">启用自动合规评估</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="notifications" defaultChecked />
                  <Label htmlFor="notifications">合规状态变更通知</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="reports" defaultChecked />
                  <Label htmlFor="reports">自动生成定期报告</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="alerts" defaultChecked />
                  <Label htmlFor="alerts">合规风险预警</Label>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
