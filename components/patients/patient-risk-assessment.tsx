"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Heart, Activity, AlertTriangle, TrendingUp, Shield, Brain, Thermometer, Droplets } from "lucide-react"

interface RiskFactor {
  id: string
  name: string
  value: number
  unit: string
  normalRange: string
  riskLevel: "low" | "medium" | "high" | "critical"
  trend: "up" | "down" | "stable"
}

interface RiskAssessment {
  patientId: string
  overallRisk: number
  riskLevel: "low" | "medium" | "high" | "critical"
  factors: RiskFactor[]
  recommendations: string[]
  lastUpdated: Date
}

interface PatientRiskAssessmentProps {
  patientId: string
}

export default function PatientRiskAssessment({ patientId }: PatientRiskAssessmentProps) {
  const [assessment, setAssessment] = useState<RiskAssessment | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")

  // 模拟风险评估数据
  useEffect(() => {
    const mockAssessment: RiskAssessment = {
      patientId,
      overallRisk: 75,
      riskLevel: "high",
      factors: [
        {
          id: "bp",
          name: "血压",
          value: 160,
          unit: "mmHg",
          normalRange: "120-140",
          riskLevel: "high",
          trend: "up",
        },
        {
          id: "glucose",
          name: "血糖",
          value: 8.5,
          unit: "mmol/L",
          normalRange: "3.9-6.1",
          riskLevel: "medium",
          trend: "stable",
        },
        {
          id: "cholesterol",
          name: "胆固醇",
          value: 6.2,
          unit: "mmol/L",
          normalRange: "<5.2",
          riskLevel: "high",
          trend: "up",
        },
        {
          id: "bmi",
          name: "BMI指数",
          value: 28.5,
          unit: "kg/m²",
          normalRange: "18.5-24.9",
          riskLevel: "medium",
          trend: "stable",
        },
      ],
      recommendations: [
        "建议立即调整降压药物剂量",
        "增加心血管监护频率",
        "制定低盐低脂饮食计划",
        "安排心电图检查",
        "考虑转诊心血管专科",
      ],
      lastUpdated: new Date(),
    }

    setTimeout(() => {
      setAssessment(mockAssessment)
      setLoading(false)
    }, 1000)
  }, [patientId])

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50"
      case "medium":
        return "text-yellow-600 bg-yellow-50"
      case "high":
        return "text-orange-600 bg-orange-50"
      case "critical":
        return "text-red-600 bg-red-50"
      default:
        return "text-gray-600 bg-gray-50"
    }
  }

  const getRiskText = (level: string) => {
    switch (level) {
      case "low":
        return "低风险"
      case "medium":
        return "中等风险"
      case "high":
        return "高风险"
      case "critical":
        return "极高风险"
      default:
        return "未知"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "down":
        return <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />
      case "stable":
        return <Activity className="h-4 w-4 text-blue-500" />
      default:
        return null
    }
  }

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            智能风险评估
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!assessment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>风险评估</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500">暂无风险评估数据</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* 总体风险概览 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            智能风险评估
          </CardTitle>
          <CardDescription>基于患者生理指标和病史的综合风险分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">总体风险评分</span>
                  <Badge className={getRiskColor(assessment.riskLevel)}>{getRiskText(assessment.riskLevel)}</Badge>
                </div>
                <Progress value={assessment.overallRisk} className="h-3" />
                <p className="text-sm text-gray-500 mt-1">{assessment.overallRisk}/100 分</p>
              </div>

              <div className="text-sm text-gray-500">最后更新：{assessment.lastUpdated.toLocaleString("zh-CN")}</div>
            </div>

            {assessment.riskLevel === "high" || assessment.riskLevel === "critical" ? (
              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle>高风险预警</AlertTitle>
                <AlertDescription>该患者存在高风险因素，建议立即采取干预措施。</AlertDescription>
              </Alert>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {/* 详细风险分析 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">风险因素</TabsTrigger>
          <TabsTrigger value="recommendations">干预建议</TabsTrigger>
          <TabsTrigger value="trends">趋势分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {assessment.factors.map((factor) => (
              <Card key={factor.id}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {factor.id === "bp" && <Heart className="h-4 w-4" />}
                      {factor.id === "glucose" && <Droplets className="h-4 w-4" />}
                      {factor.id === "cholesterol" && <Activity className="h-4 w-4" />}
                      {factor.id === "bmi" && <Thermometer className="h-4 w-4" />}
                      <span className="font-medium">{factor.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTrendIcon(factor.trend)}
                      <Badge className={getRiskColor(factor.riskLevel)}>{getRiskText(factor.riskLevel)}</Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">当前值</span>
                      <span className="font-medium">
                        {factor.value} {factor.unit}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">正常范围</span>
                      <span className="text-sm">{factor.normalRange}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5" />
                AI智能建议
              </CardTitle>
              <CardDescription>基于当前风险评估的个性化干预建议</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {assessment.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      {index + 1}
                    </div>
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-2">
                <Button size="sm">生成治疗方案</Button>
                <Button variant="outline" size="sm">
                  导出报告
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trends" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>风险趋势分析</CardTitle>
              <CardDescription>过去30天的风险评分变化趋势</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
                <p className="text-gray-500">趋势图表将在此显示</p>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-green-600">-5%</p>
                  <p className="text-sm text-gray-500">较上周</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">75</p>
                  <p className="text-sm text-gray-500">当前评分</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">+12%</p>
                  <p className="text-sm text-gray-500">较上月</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
