"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { MedicalButton } from "@/components/ui/medical-button"
import { Heart, Activity, TrendingUp, AlertTriangle, Calendar, Clock, Target, Brain, Shield, Zap } from "lucide-react"

// 患者画像数据类型
interface PatientProfile {
  basicInfo: {
    riskLevel: "low" | "medium" | "high"
    healthScore: number
    complianceRate: number
    satisfactionScore: number
  }
  healthMetrics: {
    vitalSigns: Array<{
      metric: string
      value: number
      unit: string
      status: "normal" | "warning" | "critical"
      trend: "up" | "down" | "stable"
    }>
    labResults: Array<{
      test: string
      value: number
      reference: string
      status: "normal" | "abnormal"
      date: string
    }>
  }
  behaviorAnalysis: {
    visitFrequency: number
    appointmentCompliance: number
    medicationAdherence: number
    lifestyleFactors: Array<{
      factor: string
      score: number
      impact: "positive" | "negative" | "neutral"
    }>
  }
  riskFactors: Array<{
    factor: string
    level: "low" | "medium" | "high"
    description: string
    recommendations: string[]
  }>
  predictions: {
    healthTrend: "improving" | "stable" | "declining"
    riskPrediction: Array<{
      condition: string
      probability: number
      timeframe: string
    }>
    interventionNeeds: Array<{
      intervention: string
      priority: "low" | "medium" | "high"
      timeline: string
    }>
  }
}

// 模拟患者画像数据
const mockPatientProfile: PatientProfile = {
  basicInfo: {
    riskLevel: "medium",
    healthScore: 75,
    complianceRate: 85,
    satisfactionScore: 92,
  },
  healthMetrics: {
    vitalSigns: [
      { metric: "血压", value: 140, unit: "mmHg", status: "warning", trend: "up" },
      { metric: "心率", value: 72, unit: "bpm", status: "normal", trend: "stable" },
      { metric: "血糖", value: 6.8, unit: "mmol/L", status: "warning", trend: "down" },
      { metric: "体重", value: 78, unit: "kg", status: "normal", trend: "stable" },
    ],
    labResults: [
      { test: "总胆固醇", value: 5.2, reference: "<5.2", status: "normal", date: "2024-04-28" },
      { test: "糖化血红蛋白", value: 7.1, reference: "<7.0", status: "abnormal", date: "2024-04-25" },
      { test: "肌酐", value: 85, reference: "60-110", status: "normal", date: "2024-04-20" },
      { test: "白细胞计数", value: 6.5, reference: "4.0-10.0", status: "normal", date: "2024-04-18" },
    ],
  },
  behaviorAnalysis: {
    visitFrequency: 12, // 年访问次数
    appointmentCompliance: 90, // 预约遵守率
    medicationAdherence: 85, // 用药依从性
    lifestyleFactors: [
      { factor: "运动频率", score: 60, impact: "positive" },
      { factor: "饮食控制", score: 75, impact: "positive" },
      { factor: "睡眠质量", score: 45, impact: "negative" },
      { factor: "压力水平", score: 70, impact: "negative" },
      { factor: "吸烟状况", score: 100, impact: "positive" },
    ],
  },
  riskFactors: [
    {
      factor: "高血压",
      level: "medium",
      description: "血压控制不理想，需要调整治疗方案",
      recommendations: ["调整降压药物剂量", "增加运动量", "减少钠盐摄入"],
    },
    {
      factor: "糖尿病",
      level: "medium",
      description: "血糖控制有待改善，糖化血红蛋白略高",
      recommendations: ["优化降糖方案", "加强血糖监测", "营养师咨询"],
    },
    {
      factor: "睡眠障碍",
      level: "low",
      description: "睡眠质量较差，可能影响整体健康",
      recommendations: ["睡眠卫生教育", "考虑睡眠监测", "心理咨询"],
    },
  ],
  predictions: {
    healthTrend: "stable",
    riskPrediction: [
      { condition: "心血管事件", probability: 15, timeframe: "未来5年" },
      { condition: "糖尿病并发症", probability: 25, timeframe: "未来3年" },
      { condition: "肾功能下降", probability: 8, timeframe: "未来10年" },
    ],
    interventionNeeds: [
      { intervention: "血压管理优化", priority: "high", timeline: "1个月内" },
      { intervention: "糖尿病教育", priority: "medium", timeline: "3个月内" },
      { intervention: "生活方式干预", priority: "medium", timeline: "持续进行" },
    ],
  },
}

export function PatientProfileAnalysis({ patientId }: { patientId: string }) {
  const [activeTab, setActiveTab] = useState("overview")
  const profile = mockPatientProfile

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      case "medium":
        return "text-amber-600 bg-amber-50 border-amber-200"
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "normal":
        return "text-green-600"
      case "warning":
        return "text-amber-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-medical-600" />
            患者画像深度分析
          </CardTitle>
          <CardDescription>基于AI算法的患者全方位健康画像分析</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-600 font-medium">健康评分</p>
                    <p className="text-2xl font-bold text-blue-700">{profile.basicInfo.healthScore}</p>
                  </div>
                  <Heart className="h-8 w-8 text-blue-600" />
                </div>
                <Progress value={profile.basicInfo.healthScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-green-600 font-medium">依从性</p>
                    <p className="text-2xl font-bold text-green-700">{profile.basicInfo.complianceRate}%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
                <Progress value={profile.basicInfo.complianceRate} className="mt-2" />
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-purple-600 font-medium">满意度</p>
                    <p className="text-2xl font-bold text-purple-700">{profile.basicInfo.satisfactionScore}%</p>
                  </div>
                  <Zap className="h-8 w-8 text-purple-600" />
                </div>
                <Progress value={profile.basicInfo.satisfactionScore} className="mt-2" />
              </CardContent>
            </Card>

            <Card className={`bg-gradient-to-br ${getRiskColor(profile.basicInfo.riskLevel)}`}>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">风险等级</p>
                    <p className="text-2xl font-bold capitalize">{profile.basicInfo.riskLevel}</p>
                  </div>
                  <Shield className="h-8 w-8" />
                </div>
                <Badge className="mt-2" variant="outline">
                  {profile.basicInfo.riskLevel === "low" && "低风险"}
                  {profile.basicInfo.riskLevel === "medium" && "中等风险"}
                  {profile.basicInfo.riskLevel === "high" && "高风险"}
                </Badge>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">健康概览</TabsTrigger>
          <TabsTrigger value="behavior">行为分析</TabsTrigger>
          <TabsTrigger value="risks">风险评估</TabsTrigger>
          <TabsTrigger value="predictions">预测分析</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">生命体征监测</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.healthMetrics.vitalSigns.map((vital, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Activity className={`h-5 w-5 ${getStatusColor(vital.status)}`} />
                        <div>
                          <p className="font-medium">{vital.metric}</p>
                          <p className="text-sm text-gray-600">
                            {vital.value} {vital.unit}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={vital.status === "normal" ? "default" : "destructive"}>
                          {vital.status === "normal" ? "正常" : vital.status === "warning" ? "警告" : "危险"}
                        </Badge>
                        <TrendingUp
                          className={`h-4 w-4 ${
                            vital.trend === "up"
                              ? "text-red-500"
                              : vital.trend === "down"
                                ? "text-green-500"
                                : "text-gray-500"
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">实验室检查结果</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.healthMetrics.labResults.map((lab, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">{lab.test}</p>
                        <p className="text-sm text-gray-600">参考值: {lab.reference}</p>
                        <p className="text-xs text-gray-500">{lab.date}</p>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${getStatusColor(lab.status)}`}>{lab.value}</p>
                        <Badge variant={lab.status === "normal" ? "default" : "destructive"}>
                          {lab.status === "normal" ? "正常" : "异常"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="behavior">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">就医行为分析</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-5 w-5 text-blue-600" />
                      <span className="font-medium">年访问频率</span>
                    </div>
                    <span className="text-xl font-bold text-blue-600">{profile.behaviorAnalysis.visitFrequency}次</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-green-600" />
                      <span className="font-medium">预约遵守率</span>
                    </div>
                    <span className="text-xl font-bold text-green-600">
                      {profile.behaviorAnalysis.appointmentCompliance}%
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Target className="h-5 w-5 text-purple-600" />
                      <span className="font-medium">用药依从性</span>
                    </div>
                    <span className="text-xl font-bold text-purple-600">
                      {profile.behaviorAnalysis.medicationAdherence}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">生活方式因子</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.behaviorAnalysis.lifestyleFactors.map((factor, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{factor.factor}</span>
                        <Badge
                          variant={
                            factor.impact === "positive"
                              ? "default"
                              : factor.impact === "negative"
                                ? "destructive"
                                : "secondary"
                          }
                        >
                          {factor.impact === "positive" ? "积极" : factor.impact === "negative" ? "消极" : "中性"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={factor.score} className="flex-1" />
                        <span className="text-sm font-medium w-12">{factor.score}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risks">
          <div className="space-y-4">
            {profile.riskFactors.map((risk, index) => (
              <Card key={index}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <AlertTriangle className={`h-5 w-5 ${getRiskColor(risk.level).split(" ")[0]}`} />
                      {risk.factor}
                    </CardTitle>
                    <Badge className={getRiskColor(risk.level)}>
                      {risk.level === "low" ? "低风险" : risk.level === "medium" ? "中等风险" : "高风险"}
                    </Badge>
                  </div>
                  <CardDescription>{risk.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <h4 className="font-medium mb-2">推荐干预措施：</h4>
                    <ul className="space-y-1">
                      {risk.recommendations.map((rec, recIndex) => (
                        <li key={recIndex} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-medical-600 rounded-full"></div>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">疾病风险预测</CardTitle>
                <CardDescription>基于AI模型的疾病风险预测分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.predictions.riskPrediction.map((pred, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium">{pred.condition}</span>
                        <span className="text-sm text-gray-600">{pred.timeframe}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Progress value={pred.probability} className="flex-1" />
                        <span className="text-sm font-medium w-12">{pred.probability}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">干预需求分析</CardTitle>
                <CardDescription>个性化干预措施优先级排序</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {profile.predictions.interventionNeeds.map((intervention, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium">{intervention.intervention}</span>
                        <Badge
                          variant={
                            intervention.priority === "high"
                              ? "destructive"
                              : intervention.priority === "medium"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {intervention.priority === "high"
                            ? "高优先级"
                            : intervention.priority === "medium"
                              ? "中优先级"
                              : "低优先级"}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{intervention.timeline}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-end gap-2">
        <MedicalButton variant="outline">导出报告</MedicalButton>
        <MedicalButton className="bg-medical-gradient text-white">生成干预计划</MedicalButton>
      </div>
    </div>
  )
}
