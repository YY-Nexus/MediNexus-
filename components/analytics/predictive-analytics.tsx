"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { TrendingUp, Brain, Target, AlertTriangle, CheckCircle, Clock } from "lucide-react"

// 预测模型数据
const predictionModels = [
  {
    id: "patient-flow",
    name: "患者流量预测",
    description: "基于历史数据预测未来患者就诊量",
    accuracy: 94.2,
    type: "时间序列",
    status: "active",
    lastTrained: "2024-01-15",
    features: ["历史就诊量", "季节性因素", "节假日影响", "天气数据"],
  },
  {
    id: "resource-demand",
    name: "资源需求预测",
    description: "预测医疗资源的未来需求量",
    accuracy: 91.8,
    type: "回归分析",
    status: "active",
    lastTrained: "2024-01-14",
    features: ["患者数量", "疾病类型", "治疗复杂度", "设备使用率"],
  },
  {
    id: "readmission-risk",
    name: "再入院风险预测",
    description: "评估患者再次入院的风险概率",
    accuracy: 87.5,
    type: "分类模型",
    status: "training",
    lastTrained: "2024-01-13",
    features: ["病史", "治疗效果", "年龄", "并发症"],
  },
  {
    id: "epidemic-forecast",
    name: "疫情趋势预测",
    description: "预测传染病传播趋势和影响范围",
    accuracy: 89.3,
    type: "深度学习",
    status: "active",
    lastTrained: "2024-01-16",
    features: ["感染数据", "人口流动", "防控措施", "环境因素"],
  },
]

// 患者流量预测数据
const patientFlowPrediction = [
  { date: "2024-01-01", actual: 1200, predicted: 1180, confidence: 0.95 },
  { date: "2024-01-02", actual: 1350, predicted: 1320, confidence: 0.93 },
  { date: "2024-01-03", actual: 1480, predicted: 1450, confidence: 0.91 },
  { date: "2024-01-04", actual: 1520, predicted: 1500, confidence: 0.94 },
  { date: "2024-01-05", actual: 1650, predicted: 1630, confidence: 0.92 },
  { date: "2024-01-06", actual: null, predicted: 1720, confidence: 0.88 },
  { date: "2024-01-07", actual: null, predicted: 1680, confidence: 0.85 },
  { date: "2024-01-08", actual: null, predicted: 1750, confidence: 0.87 },
  { date: "2024-01-09", actual: null, predicted: 1820, confidence: 0.84 },
  { date: "2024-01-10", actual: null, predicted: 1780, confidence: 0.86 },
]

// 风险评估数据
const riskAssessmentData = [
  { category: "高风险患者", current: 45, predicted: 52, change: 15.6 },
  { category: "中风险患者", current: 128, predicted: 135, change: 5.5 },
  { category: "低风险患者", current: 267, predicted: 245, change: -8.2 },
  { category: "急诊需求", current: 89, predicted: 102, change: 14.6 },
]

// 预测准确性数据
const accuracyTrends = [
  { month: "10月", accuracy: 89.2 },
  { month: "11月", accuracy: 91.5 },
  { month: "12月", accuracy: 93.1 },
  { month: "1月", accuracy: 94.2 },
]

interface PredictiveAnalyticsProps {
  onBack?: () => void
}

export default function PredictiveAnalytics({ onBack }: PredictiveAnalyticsProps) {
  const [selectedModel, setSelectedModel] = useState("patient-flow")
  const [timeRange, setTimeRange] = useState("7days")
  const [isRunningPrediction, setIsRunningPrediction] = useState(false)

  const currentModel = predictionModels.find((m) => m.id === selectedModel)

  const runPrediction = async () => {
    setIsRunningPrediction(true)
    // 模拟预测计算
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsRunningPrediction(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-medical-800">预测性分析</h2>
          <p className="text-gray-600">基于机器学习的医疗数据预测和风险评估</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue placeholder="选择时间范围" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">未来7天</SelectItem>
              <SelectItem value="30days">未来30天</SelectItem>
              <SelectItem value="90days">未来90天</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={runPrediction} disabled={isRunningPrediction}>
            {isRunningPrediction ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                预测中...
              </>
            ) : (
              <>
                <Brain className="mr-2 h-4 w-4" />
                运行预测
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="models" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="models">预测模型</TabsTrigger>
          <TabsTrigger value="forecasts">预测结果</TabsTrigger>
          <TabsTrigger value="risk-assessment">风险评估</TabsTrigger>
          <TabsTrigger value="accuracy">准确性分析</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {predictionModels.map((model) => (
              <Card
                key={model.id}
                className={`cursor-pointer transition-all ${
                  selectedModel === model.id ? "ring-2 ring-medical-500 bg-medical-50" : "hover:shadow-md"
                }`}
                onClick={() => setSelectedModel(model.id)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{model.name}</CardTitle>
                    <Badge variant={model.status === "active" ? "default" : "secondary"}>
                      {model.status === "active" ? "运行中" : "训练中"}
                    </Badge>
                  </div>
                  <CardDescription>{model.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">准确率</span>
                      <div className="flex items-center gap-2">
                        <Progress value={model.accuracy} className="w-20" />
                        <span className="text-sm font-medium">{model.accuracy}%</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">模型类型</span>
                      <Badge variant="outline">{model.type}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">最后训练</span>
                      <span className="text-sm">{model.lastTrained}</span>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500 block mb-1">特征变量</span>
                      <div className="flex flex-wrap gap-1">
                        {model.features.slice(0, 3).map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                        {model.features.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{model.features.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="forecasts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                {currentModel?.name || "患者流量预测"}
              </CardTitle>
              <CardDescription>
                预测时间范围：{timeRange === "7days" ? "未来7天" : timeRange === "30days" ? "未来30天" : "未来90天"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={patientFlowPrediction}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip
                      formatter={(value, name) => [
                        value,
                        name === "actual" ? "实际值" : name === "predicted" ? "预测值" : "置信度",
                      ]}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="actual"
                      stroke="#2563eb"
                      strokeWidth={2}
                      name="实际值"
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted"
                      stroke="#dc2626"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      name="预测值"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">预测准确率</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-900">{currentModel?.accuracy}%</div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">置信区间</span>
                  </div>
                  <div className="text-2xl font-bold text-green-900">85-95%</div>
                </div>
                <div className="bg-amber-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                    <span className="text-sm font-medium text-amber-800">预测偏差</span>
                  </div>
                  <div className="text-2xl font-bold text-amber-900">±3.2%</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk-assessment" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {riskAssessmentData.map((item, index) => (
              <Card key={index}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{item.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">当前数量</span>
                      <span className="text-2xl font-bold">{item.current}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">预测数量</span>
                      <span className="text-2xl font-bold text-medical-600">{item.predicted}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">变化幅度</span>
                      <div className="flex items-center gap-1">
                        {item.change > 0 ? (
                          <TrendingUp className="h-4 w-4 text-red-500" />
                        ) : (
                          <TrendingUp className="h-4 w-4 text-green-500 rotate-180" />
                        )}
                        <span className={`font-medium ${item.change > 0 ? "text-red-600" : "text-green-600"}`}>
                          {Math.abs(item.change)}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accuracy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>模型准确性趋势</CardTitle>
              <CardDescription>过去4个月的预测准确性变化</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={accuracyTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[85, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, "准确率"]} />
                    <Area type="monotone" dataKey="accuracy" stroke="#2563eb" fill="#3b82f6" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
