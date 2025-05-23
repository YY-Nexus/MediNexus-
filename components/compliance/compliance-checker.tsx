"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertTriangle, XCircle, Shield, FileText, Users } from "lucide-react"

interface ComplianceItem {
  id: string
  title: string
  description: string
  status: "compliant" | "partial" | "non-compliant" | "not-applicable"
  priority: "high" | "medium" | "low"
  evidence?: string[]
  actions?: string[]
}

const hipaaRequirements: ComplianceItem[] = [
  {
    id: "hipaa-1",
    title: "访问控制 (§164.312(a)(1))",
    description: "实施技术保护措施，只允许授权人员访问包含PHI的信息系统",
    status: "compliant",
    priority: "high",
    evidence: ["基于角色的访问控制", "多因素认证", "会话管理"],
    actions: [],
  },
  {
    id: "hipaa-2",
    title: "审计控制 (§164.312(b))",
    description: "实施硬件、软件和程序机制，记录和检查对包含PHI的信息系统的访问",
    status: "compliant",
    priority: "high",
    evidence: ["全面的审计日志", "实时监控", "定期审计报告"],
    actions: [],
  },
  {
    id: "hipaa-3",
    title: "完整性 (§164.312(c)(1))",
    description: "保护PHI不被不当更改或销毁",
    status: "compliant",
    priority: "high",
    evidence: ["数据完整性检查", "版本控制", "数字签名"],
    actions: [],
  },
  {
    id: "hipaa-4",
    title: "传输安全 (§164.312(e)(1))",
    description: "实施技术保护措施，防止通过网络传输的PHI被未授权访问",
    status: "compliant",
    priority: "high",
    evidence: ["TLS 1.3加密", "VPN连接", "端到端加密"],
    actions: [],
  },
  {
    id: "hipaa-5",
    title: "业务伙伴协议 (§164.502(e))",
    description: "与处理PHI的业务伙伴签署BAA协议",
    status: "partial",
    priority: "high",
    evidence: ["部分供应商已签署BAA"],
    actions: ["完善BAA协议模板", "与所有第三方供应商签署BAA"],
  },
]

const gdprRequirements: ComplianceItem[] = [
  {
    id: "gdpr-1",
    title: "合法处理基础 (第6条)",
    description: "确保个人数据处理有合法基础",
    status: "compliant",
    priority: "high",
    evidence: ["明确的法律基础", "同意管理系统", "合法利益评估"],
    actions: [],
  },
  {
    id: "gdpr-2",
    title: "数据主体权利 (第12-23条)",
    description: "实施数据主体权利，包括访问、更正、删除等",
    status: "partial",
    priority: "high",
    evidence: ["基本的数据访问功能"],
    actions: ["实施完整的数据主体权利管理", "添加数据可携带性功能", "实施被遗忘权"],
  },
  {
    id: "gdpr-3",
    title: "数据保护影响评估 (第35条)",
    description: "对高风险处理活动进行DPIA",
    status: "partial",
    priority: "medium",
    evidence: ["初步风险评估"],
    actions: ["完成正式的DPIA", "建立DPIA流程"],
  },
  {
    id: "gdpr-4",
    title: "数据保护官 (第37-39条)",
    description: "指定数据保护官并确保其独立性",
    status: "non-compliant",
    priority: "medium",
    evidence: [],
    actions: ["指定合格的DPO", "建立DPO职责框架"],
  },
]

const medicalRegulations: ComplianceItem[] = [
  {
    id: "med-1",
    title: "医疗器械软件分类",
    description: "根据风险等级对AI诊断软件进行分类",
    status: "partial",
    priority: "high",
    evidence: ["初步风险分析"],
    actions: ["完成正式的医疗器械分类", "准备监管申报材料"],
  },
  {
    id: "med-2",
    title: "临床验证",
    description: "AI算法的临床安全性和有效性验证",
    status: "partial",
    priority: "high",
    evidence: ["算法性能测试", "回顾性研究"],
    actions: ["进行前瞻性临床试验", "获得临床验证报告"],
  },
  {
    id: "med-3",
    title: "质量管理体系",
    description: "建立符合ISO 13485的质量管理体系",
    status: "partial",
    priority: "medium",
    evidence: ["基本的质量流程"],
    actions: ["完善QMS文档", "获得ISO 13485认证"],
  },
]

export function ComplianceChecker() {
  const [selectedTab, setSelectedTab] = useState("hipaa")

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "compliant":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "partial":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "non-compliant":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "not-applicable":
        return <div className="h-4 w-4 rounded-full bg-gray-300" />
      default:
        return null
    }
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      compliant: "bg-green-100 text-green-800",
      partial: "bg-yellow-100 text-yellow-800",
      "non-compliant": "bg-red-100 text-red-800",
      "not-applicable": "bg-gray-100 text-gray-800",
    }

    const labels = {
      compliant: "合规",
      partial: "部分合规",
      "non-compliant": "不合规",
      "not-applicable": "不适用",
    }

    return <Badge className={colors[status as keyof typeof colors]}>{labels[status as keyof typeof labels]}</Badge>
  }

  const calculateComplianceScore = (requirements: ComplianceItem[]) => {
    const applicable = requirements.filter((r) => r.status !== "not-applicable")
    const compliant = applicable.filter((r) => r.status === "compliant")
    const partial = applicable.filter((r) => r.status === "partial")

    return Math.round(((compliant.length + partial.length * 0.5) / applicable.length) * 100)
  }

  const renderRequirements = (requirements: ComplianceItem[]) => (
    <div className="space-y-4">
      {requirements.map((req) => (
        <Card key={req.id}>
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                {getStatusIcon(req.status)}
                <div>
                  <CardTitle className="text-base">{req.title}</CardTitle>
                  <CardDescription className="mt-1">{req.description}</CardDescription>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(req.status)}
                <Badge
                  variant={
                    req.priority === "high" ? "destructive" : req.priority === "medium" ? "default" : "secondary"
                  }
                >
                  {req.priority === "high" ? "高" : req.priority === "medium" ? "中" : "低"}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {req.evidence && req.evidence.length > 0 && (
              <div className="mb-3">
                <h4 className="font-medium text-green-600 mb-2">已实施措施：</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-green-600">
                  {req.evidence.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {req.actions && req.actions.length > 0 && (
              <div>
                <h4 className="font-medium text-orange-600 mb-2">待完成行动：</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-orange-600">
                  {req.actions.map((action, i) => (
                    <li key={i}>{action}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            合规性评估
          </CardTitle>
          <CardDescription>医疗系统的法规合规性检查和评估</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{calculateComplianceScore(hipaaRequirements)}%</div>
              <div className="text-sm text-muted-foreground">HIPAA合规度</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{calculateComplianceScore(gdprRequirements)}%</div>
              <div className="text-sm text-muted-foreground">GDPR合规度</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{calculateComplianceScore(medicalRegulations)}%</div>
              <div className="text-sm text-muted-foreground">医疗法规合规度</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hipaa" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            HIPAA
          </TabsTrigger>
          <TabsTrigger value="gdpr" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            GDPR
          </TabsTrigger>
          <TabsTrigger value="medical" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            医疗法规
          </TabsTrigger>
        </TabsList>

        <TabsContent value="hipaa" className="mt-6">
          {renderRequirements(hipaaRequirements)}
        </TabsContent>

        <TabsContent value="gdpr" className="mt-6">
          {renderRequirements(gdprRequirements)}
        </TabsContent>

        <TabsContent value="medical" className="mt-6">
          {renderRequirements(medicalRegulations)}
        </TabsContent>
      </Tabs>
    </div>
  )
}
