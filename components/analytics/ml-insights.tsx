"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { Brain, Lightbulb, TrendingUp, AlertTriangle, CheckCircle, Zap, Eye, RefreshCw, Download } from "lucide-react"

// ML洞察类型
interface MLInsight {
  id: string
  title: string
  description: string
  type: "pattern" | "anomaly" | "prediction" | "recommendation"
  confidence: number
  impact: "high" | "medium" | "low"
  category: string
  data: any
  actionable: boolean
  timestamp: string
}

// 模式识别结果
const patternInsights: MLInsight[] = [
  {
    id: "pattern-1",
    title: "周期性患者流量模式",
    description: "发现患者就诊量存在明显的周期性规律，周一和周五为高峰期",
    type: "pattern",
    confidence: 94.2,
    impact: "high",
    category: "运营优化",
    data: {
      pattern: "weekly",
      peaks: ["Monday", "Friday"],
      variance: 23.5,
    },
    actionable: true,
    timestamp: "2024-01-16 09:30",
  },
  {
    id: "pattern-2",
    title: "疾病季节性关联",
    description: "呼吸系统疾病与气温变化呈现强相关性，相关系数0.87",
    type: "pattern",
    confidence: 87.3,
    impact: "medium",
    category: "疾病预防",
    data: {
      correlation: 0.87,
      diseases: ["感冒", "肺炎", "哮喘"],
      season: "winter",
    },
    actionable: true,
    timestamp: "2024-01-16 08:45",
  },
  {
    id: "anomaly-1",
    title: "异常药物消耗",
    description: "检测到某类抗生素使用量异常增加，可能存在过度处方",
    type: "anomaly",
    confidence: 91.8,
    impact: "high",
    category: "药物管理",
    data: {
      medication: "阿莫西林",
      increase: 45.2,
      threshold: 20.0,
    },
    actionable: true,
    timestamp: "2024-01-16 07:20",
  },
  {
    id: "prediction-1",
    title: "急诊科负荷预警",
    description: "预测未来3天急诊科将出现高负荷，建议提前调配人员",
    type: "prediction",
    confidence: 89.5,
    impact: "high",
    category: "资源调配",
    data: {
      timeframe: "3 days",
      expectedLoad: 125,
      currentCapacity: 100,
    },
    actionable: true,
    timestamp: "2024-01-16 06:15",
  },
  {
    id: "recommendation-1",
    title: "优化手术排程建议",
    description: "基于历史数据分析，建议调整手术室使用时间分配以提高效率",
    type: "recommendation",
    confidence: 85.7,
    impact: "medium",
    category: "效率提升",
    data: {
      currentEfficiency: 78,
      potentialEfficiency: 92,
      improvement: 14,
    },
    actionable: true,
    timestamp: "2024-01-16 05:30",
  },
]

// 智能建议数据
const smartRecommendations = [
  {
    id: "rec-1",
    title: "优化门诊排班",
    description: "根据患者流量模式，建议在周一和周五增加30%的医护人员",
    priority: "high",
    estimatedImpact: "减少等待时间25%",
    implementationCost: "中等",
    timeToImplement: "1周",
  },
  {
    id: "rec-2",
    title: "预防性药物储备",
    description: "基于季节性疾病预测，建议提前储备呼吸系统药物",
    priority: "medium",
    estimatedImpact: "避免缺药风险",
    implementationCost: "低",
    timeToImplement: "3天",
  },
  {
    id: "rec-3",
    title: "设备维护优化",
    description: "ML模型预测某些设备即将需要维护，建议提前安排",
    priority: "medium",
    estimatedImpact: "减少设备故障50%",
    implementationCost: "低",
    timeToImplement: "1天",
  },
]

// 模型性能数据
const modelPerformance = [
  { name: "患者流量预测", accuracy: 94.2, precision: 91.8, recall: 89.5, f1Score: 90.6 },
  { name: "疾病诊断辅助", accuracy: 87.3, precision: 85.1, recall: 88.9, recall: 87.0 },
  { name: "资源需求预测", accuracy: 91.8, precision: 89.2, recall: 93.1, f1Score: 91.1 },
  { name: "异常检测", accuracy: 89.5, precision: 92.3, recall: 86.7, f1Score: 89.4 },
]

// 特征重要性数据
const featureImportance = [
  { feature: "历史就诊量", importance: 0.35, category: "历史数据" },
  { feature: "季节因素", importance: 0.28, category: "时间特征" },
  { feature: "患者年龄", importance: 0.15, category: "患者特征" },
  { feature: "疾病类型", importance: 0.12, category: "医疗特征" },
  { feature: "天气数据", importance: 0.1, category: "外部因素" },
]

interface MLInsightsProps {
  onBack?: () => void
}

export default function MLInsights({ onBack }: MLInsightsProps) {
  const [selectedInsight, setSelectedInsight] = useState<MLInsight | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("insights")

  const runAnalysis = async () => {
    setIsAnalyzing(true)
    // 模拟ML分析过程
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsAnalyzing(false)
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case "pattern":
        return <Eye className="h-4 w-4" />
      case "anomaly":
        return <AlertTriangle className="h-4 w-4" />
      case "prediction":
        return <TrendingUp className="h-4 w-4" />
      case "recommendation":
        return <Lightbulb className="h-4 w-4" />
      default:
        return <Brain className="h-4 w-4" />
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "text-red-600 bg-red-50 border-red-200"
      case "medium":
        return "text-yellow-600 bg-yellow-50 border-yellow-200"
      case "low":
        return "text-green-600 bg-green-50 border-green-200"
      default:
        return "text-gray-600 bg-gray-50 border-gray-200"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-medical-800">机器学习洞察</h2>
          <p className="text-gray-600">AI驱动的数据洞察和智能建议</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={runAnalysis} disabled={isAnalyzing}>
            {isAnalyzing ? (
              <>
                <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                分析中...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                运行分析
              </>
            )}
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            导出报告
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">智能洞察</TabsTrigger>
          <TabsTrigger value="recommendations">智能建议</TabsTrigger>
          <TabsTrigger value="performance">模型性能</TabsTrigger>
          <TabsTrigger value="features">特征分析</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 左侧：洞察列表 */}
            <div className="lg:col-span-2 space-y-4">
              {patternInsights.map((insight) => (
                <Card
                  key={insight.id}
                  className={`cursor-pointer transition-all ${
                    selectedInsight?.id === insight.id ? "ring-2 ring-medical-500 bg-medical-50" : "hover:shadow-md"
                  }`}
                  onClick={() => setSelectedInsight(insight)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getInsightIcon(insight.type)}
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className={getImpactColor(insight.impact)}>
                          {insight.impact === "high" ? "高影响" : insight.impact === "medium" ? "中影响" : "低影响"}
                        </Badge>
                        {insight.actionable && (
                          <Badge variant="default" className="bg-green-500">
                            可执行
                          </Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription>{insight.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <span className="text-sm text-gray-500">置信度</span>
                          <div className="flex items-center gap-2">
                            <Progress value={insight.confidence} className="w-20" />
                            <span className="text-sm font-medium">{insight.confidence}%</span>
                          </div>
                        </div>
                        <Badge variant="secondary">{insight.category}</Badge>
                      </div>
                      <span className="text-sm text-gray-500">{insight.timestamp}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* 右侧：详细信息 */}
            <div>
              {selectedInsight ? (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {getInsightIcon(selectedInsight.type)}
                      洞察详情
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">{selectedInsight.title}</h4>
                      <p className="text-sm text-gray-600">{selectedInsight.description}</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">类型</span>
                        <Badge variant="outline">
                          {selectedInsight.type === "pattern"
                            ? "模式识别"
                            : selectedInsight.type === "anomaly"
                              ? "异常检测"
                              : selectedInsight.type === "prediction"
                                ? "预测分析"
                                : "智能建议"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">置信度</span>
                        <span className="text-sm font-medium">{selectedInsight.confidence}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">影响程度</span>
                        <Badge className={getImpactColor(selectedInsight.impact)}>
                          {selectedInsight.impact === "high" ? "高" : selectedInsight.impact === "medium" ? "中" : "低"}
                        </Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-500">分类</span>
                        <span className="text-sm">{selectedInsight.category}</span>
                      </div>
                    </div>

                    {selectedInsight.actionable && (
                      <div className="pt-4 border-t">
                        <Button className="w-full">
                          <Zap className="mr-2 h-4 w-4" />
                          执行建议
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex items-center justify-center h-[300px]">
                    <div className="text-center">
                      <Brain className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-gray-500">选择一个洞察查看详情</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {smartRecommendations.map((rec) => (
              <Card key={rec.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{rec.title}</CardTitle>
                    <div className={`w-3 h-3 rounded-full ${getPriorityColor(rec.priority)}`} />
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">优先级</span>
                      <Badge
                        variant={
                          rec.priority === "high" ? "destructive" : rec.priority === "medium" ? "default" : "secondary"
                        }
                      >
                        {rec.priority === "high" ? "高" : rec.priority === "medium" ? "中" : "低"}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">预期影响</span>
                      <span className="text-sm font-medium">{rec.estimatedImpact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">实施成本</span>
                      <span className="text-sm">{rec.implementationCost}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-500">实施时间</span>
                      <span className="text-sm">{rec.timeToImplement}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" className="flex-1">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      采纳
                    </Button>
                    <Button size="sm" variant="outline" className="flex-1">
                      <Eye className="mr-1 h-3 w-3" />
                      详情
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>模型性能评估</CardTitle>
              <CardDescription>各ML模型的准确率、精确率、召回率和F1分数</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={modelPerformance}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="name" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar name="准确率" dataKey="accuracy" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.3} />
                    <Radar name="精确率" dataKey="precision" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
                    <Radar name="召回率" dataKey="recall" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.3} />
                    <Radar name="F1分数" dataKey="f1Score" stroke="#ef4444" fill="#ef4444" fillOpacity={0.3} />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {modelPerformance.map((model, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">{model.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">准确率</span>
                    <span className="text-sm font-medium">{model.accuracy}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">精确率</span>
                    <span className="text-sm font-medium">{model.precision}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">召回率</span>
                    <span className="text-sm font-medium">{model.recall}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-500">F1分数</span>
                    <span className="text-sm font-medium">{model.f1Score}%</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>特征重要性分析</CardTitle>
              <CardDescription>影响模型预测结果的关键特征及其重要程度</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={featureImportance} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" domain={[0, 0.4]} />
                    <YAxis dataKey="feature" type="category" width={100} />
                    <Tooltip formatter={(value) => [`${(value * 100).toFixed(1)}%`, "重要性"]} />
                    <Bar dataKey="importance" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-6 space-y-3">
                {featureImportance.map((feature, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{feature.feature}</span>
                      <Badge variant="outline" className="ml-2 text-xs">
                        {feature.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Progress value={feature.importance * 100} className="w-20" />
                      <span className="text-sm font-medium w-12">{(feature.importance * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
