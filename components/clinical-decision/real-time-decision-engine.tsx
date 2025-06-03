"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Zap,
  AlertTriangle,
  TrendingUp,
  Clock,
  Brain,
  Activity,
  Shield,
  Target,
  Bell,
  CheckCircle2,
  XCircle,
  Pause,
  Play,
  Settings,
  Eye,
  BarChart3,
  Plus,
} from "lucide-react"

// 实时决策事件类型
interface RealTimeEvent {
  id: string
  timestamp: string
  type: "vital_change" | "lab_result" | "medication_interaction" | "risk_alert" | "treatment_response"
  severity: "低" | "中" | "高" | "紧急"
  source: string
  data: any
  processed: boolean
  actionRequired: boolean
}

// 实时决策规则
interface DecisionRule {
  id: string
  name: string
  description: string
  condition: string
  action: string
  priority: number
  enabled: boolean
  triggerCount: number
  lastTriggered?: string
}

// 实时监控指标
interface MonitoringMetric {
  id: string
  name: string
  value: number
  unit: string
  normalRange: { min: number; max: number }
  trend: "上升" | "下降" | "稳定"
  alertThreshold: { warning: number; critical: number }
  lastUpdated: string
}

// 决策建议
interface RealTimeRecommendation {
  id: string
  type: "immediate" | "urgent" | "routine" | "preventive"
  title: string
  description: string
  rationale: string
  confidence: number
  timeWindow: string
  actions: {
    primary: string
    secondary?: string[]
  }
  contraindications?: string[]
  monitoring?: string[]
}

interface RealTimeDecisionEngineProps {
  patientId: string
  isActive: boolean
  onRecommendationGenerated?: (recommendation: RealTimeRecommendation) => void
  onAlertTriggered?: (alert: RealTimeEvent) => void
}

export function RealTimeDecisionEngine({
  patientId,
  isActive,
  onRecommendationGenerated,
  onAlertTriggered,
}: RealTimeDecisionEngineProps) {
  const [events, setEvents] = useState<RealTimeEvent[]>([])
  const [rules, setRules] = useState<DecisionRule[]>([])
  const [metrics, setMetrics] = useState<MonitoringMetric[]>([])
  const [recommendations, setRecommendations] = useState<RealTimeRecommendation[]>([])
  const [isMonitoring, setIsMonitoring] = useState(isActive)
  const [processingLoad, setProcessingLoad] = useState(0)
  const [activeTab, setActiveTab] = useState("dashboard")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 初始化监控数据
  useEffect(() => {
    initializeMonitoring()
    if (isMonitoring) {
      startRealTimeMonitoring()
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isMonitoring])

  // 初始化监控系统
  const initializeMonitoring = () => {
    // 初始化决策规则
    const initialRules: DecisionRule[] = [
      {
        id: "rule-1",
        name: "血压异常预警",
        description: "收缩压>180或舒张压>110时触发紧急预警",
        condition: "systolic_bp > 180 OR diastolic_bp > 110",
        action: "立即通知医生，考虑降压治疗",
        priority: 1,
        enabled: true,
        triggerCount: 0,
      },
      {
        id: "rule-2",
        name: "药物相互作用检测",
        description: "检测新开药物与现有药物的相互作用",
        condition: "new_medication AND existing_medications",
        action: "检查药物相互作用，调整剂量或更换药物",
        priority: 2,
        enabled: true,
        triggerCount: 0,
      },
      {
        id: "rule-3",
        name: "血糖波动监控",
        description: "血糖值超出目标范围时的处理建议",
        condition: "glucose < 4.0 OR glucose > 10.0",
        action: "调整胰岛素剂量，监测血糖变化",
        priority: 2,
        enabled: true,
        triggerCount: 0,
      },
      {
        id: "rule-4",
        name: "心律异常检测",
        description: "心率过快、过慢或不规律时的预警",
        condition: "heart_rate < 50 OR heart_rate > 120 OR irregular_rhythm",
        action: "心电图检查，评估心律失常风险",
        priority: 1,
        enabled: true,
        triggerCount: 0,
      },
      {
        id: "rule-5",
        name: "肾功能恶化预警",
        description: "肌酐值快速上升时的预警",
        condition: "creatinine_increase > 50% FROM baseline",
        action: "停用肾毒性药物，评估肾功能",
        priority: 1,
        enabled: true,
        triggerCount: 0,
      },
    ]

    // 初始化监控指标
    const initialMetrics: MonitoringMetric[] = [
      {
        id: "metric-1",
        name: "收缩压",
        value: 135,
        unit: "mmHg",
        normalRange: { min: 90, max: 140 },
        trend: "稳定",
        alertThreshold: { warning: 160, critical: 180 },
        lastUpdated: new Date().toLocaleString(),
      },
      {
        id: "metric-2",
        name: "舒张压",
        value: 85,
        unit: "mmHg",
        normalRange: { min: 60, max: 90 },
        trend: "稳定",
        alertThreshold: { warning: 100, critical: 110 },
        lastUpdated: new Date().toLocaleString(),
      },
      {
        id: "metric-3",
        name: "心率",
        value: 78,
        unit: "次/分",
        normalRange: { min: 60, max: 100 },
        trend: "稳定",
        alertThreshold: { warning: 110, critical: 120 },
        lastUpdated: new Date().toLocaleString(),
      },
      {
        id: "metric-4",
        name: "血糖",
        value: 7.2,
        unit: "mmol/L",
        normalRange: { min: 4.0, max: 8.0 },
        trend: "下降",
        alertThreshold: { warning: 10.0, critical: 15.0 },
        lastUpdated: new Date().toLocaleString(),
      },
      {
        id: "metric-5",
        name: "血氧饱和度",
        value: 98,
        unit: "%",
        normalRange: { min: 95, max: 100 },
        trend: "稳定",
        alertThreshold: { warning: 92, critical: 88 },
        lastUpdated: new Date().toLocaleString(),
      },
    ]

    setRules(initialRules)
    setMetrics(initialMetrics)
  }

  // 开始实时监控
  const startRealTimeMonitoring = () => {
    intervalRef.current = setInterval(() => {
      // 模拟实时数据更新
      updateMetrics()
      processDecisionRules()
      setProcessingLoad(Math.random() * 100)
    }, 3000) // 每3秒更新一次
  }

  // 停止实时监控
  const stopRealTimeMonitoring = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsMonitoring(false)
  }

  // 更新监控指标
  const updateMetrics = () => {
    setMetrics((prevMetrics) =>
      prevMetrics.map((metric) => {
        // 模拟数据变化
        const change = (Math.random() - 0.5) * 0.1 * metric.value
        const newValue = Math.max(0, metric.value + change)

        // 确定趋势
        let trend: "上升" | "下降" | "稳定" = "稳定"
        if (change > metric.value * 0.02) trend = "上升"
        else if (change < -metric.value * 0.02) trend = "下降"

        return {
          ...metric,
          value: Math.round(newValue * 10) / 10,
          trend,
          lastUpdated: new Date().toLocaleString(),
        }
      }),
    )
  }

  // 处理决策规则
  const processDecisionRules = () => {
    rules.forEach((rule) => {
      if (!rule.enabled) return

      // 模拟规则触发逻辑
      const shouldTrigger = Math.random() < 0.05 // 5% 概率触发

      if (shouldTrigger) {
        const event: RealTimeEvent = {
          id: `event-${Date.now()}-${Math.random()}`,
          timestamp: new Date().toLocaleString(),
          type: "risk_alert",
          severity: rule.priority === 1 ? "高" : "中",
          source: rule.name,
          data: { ruleId: rule.id, condition: rule.condition },
          processed: false,
          actionRequired: true,
        }

        setEvents((prev) => [event, ...prev.slice(0, 49)]) // 保留最近50个事件

        // 更新规则触发计数
        setRules((prev) =>
          prev.map((r) =>
            r.id === rule.id
              ? { ...r, triggerCount: r.triggerCount + 1, lastTriggered: new Date().toLocaleString() }
              : r,
          ),
        )

        // 生成实时建议
        generateRealTimeRecommendation(rule, event)

        // 触发回调
        if (onAlertTriggered) {
          onAlertTriggered(event)
        }
      }
    })
  }

  // 生成实时建议
  const generateRealTimeRecommendation = (rule: DecisionRule, event: RealTimeEvent) => {
    const recommendation: RealTimeRecommendation = {
      id: `rec-${Date.now()}`,
      type: rule.priority === 1 ? "immediate" : "urgent",
      title: `${rule.name}触发`,
      description: rule.action,
      rationale: `基于规则"${rule.description}"的自动触发`,
      confidence: 85 + Math.random() * 10,
      timeWindow: rule.priority === 1 ? "立即" : "30分钟内",
      actions: {
        primary: rule.action,
        secondary: ["记录事件", "通知相关医护人员", "更新患者状态"],
      },
      monitoring: ["持续监控相关指标", "评估治疗反应", "记录副作用"],
    }

    setRecommendations((prev) => [recommendation, ...prev.slice(0, 9)]) // 保留最近10个建议

    if (onRecommendationGenerated) {
      onRecommendationGenerated(recommendation)
    }
  }

  // 获取指标状态颜色
  const getMetricStatusColor = (metric: MonitoringMetric) => {
    if (metric.value >= metric.alertThreshold.critical) return "text-red-600 bg-red-50"
    if (metric.value >= metric.alertThreshold.warning) return "text-orange-600 bg-orange-50"
    if (metric.value < metric.normalRange.min || metric.value > metric.normalRange.max)
      return "text-yellow-600 bg-yellow-50"
    return "text-green-600 bg-green-50"
  }

  // 获取趋势图标
  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "上升":
        return <TrendingUp className="h-4 w-4 text-red-500" />
      case "下降":
        return <TrendingUp className="h-4 w-4 text-blue-500 rotate-180" />
      default:
        return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  // 获取事件严重程度颜色
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "紧急":
        return "bg-red-100 text-red-800"
      case "高":
        return "bg-orange-100 text-orange-800"
      case "中":
        return "bg-yellow-100 text-yellow-800"
      case "低":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center">
            <Zap className="h-5 w-5 mr-2 text-blue-600" />
            实时决策支持引擎
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={isMonitoring ? "default" : "secondary"} className="flex items-center gap-1">
              {isMonitoring ? <Activity className="h-3 w-3" /> : <Pause className="h-3 w-3" />}
              {isMonitoring ? "监控中" : "已暂停"}
            </Badge>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                if (isMonitoring) {
                  stopRealTimeMonitoring()
                } else {
                  setIsMonitoring(true)
                  startRealTimeMonitoring()
                }
              }}
            >
              {isMonitoring ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </CardTitle>
        <CardDescription>智能实时监控患者状态，自动触发决策规则，提供即时临床建议</CardDescription>
      </CardHeader>

      <CardContent className="p-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="dashboard">监控面板</TabsTrigger>
              <TabsTrigger value="events">实时事件</TabsTrigger>
              <TabsTrigger value="recommendations">智能建议</TabsTrigger>
              <TabsTrigger value="rules">决策规则</TabsTrigger>
              <TabsTrigger value="analytics">分析报告</TabsTrigger>
            </TabsList>
          </div>

          {/* 监控面板选项卡 */}
          <TabsContent value="dashboard" className="mt-4 px-6">
            <div className="space-y-4">
              {/* 系统状态 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Brain className="h-4 w-4 mr-2" />
                      处理负载
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-2xl font-bold">{Math.round(processingLoad)}%</span>
                      <Badge
                        variant={processingLoad > 80 ? "destructive" : processingLoad > 60 ? "secondary" : "default"}
                      >
                        {processingLoad > 80 ? "高负载" : processingLoad > 60 ? "中负载" : "正常"}
                      </Badge>
                    </div>
                    <Progress value={processingLoad} className="h-2" />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <Bell className="h-4 w-4 mr-2" />
                      活跃规则
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{rules.filter((r) => r.enabled).length}</div>
                    <div className="text-sm text-gray-500">共 {rules.length} 条规则</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-base flex items-center">
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      今日事件
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{events.length}</div>
                    <div className="text-sm text-gray-500">
                      {events.filter((e) => e.severity === "高" || e.severity === "紧急").length} 条高优先级
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* 实时监控指标 */}
              <div>
                <h3 className="text-lg font-medium mb-3">实时监控指标</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {metrics.map((metric) => (
                    <Card key={metric.id} className={getMetricStatusColor(metric)}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center justify-between">
                          <span>{metric.name}</span>
                          {getTrendIcon(metric.trend)}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-2xl font-bold">
                            {metric.value} {metric.unit}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {metric.trend}
                          </Badge>
                        </div>
                        <div className="text-xs text-gray-600">
                          正常范围: {metric.normalRange.min}-{metric.normalRange.max} {metric.unit}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">更新时间: {metric.lastUpdated}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* 最新建议 */}
              {recommendations.length > 0 && (
                <div>
                  <h3 className="text-lg font-medium mb-3">最新智能建议</h3>
                  <div className="space-y-3">
                    {recommendations.slice(0, 3).map((rec) => (
                      <Alert
                        key={rec.id}
                        className={
                          rec.type === "immediate" ? "border-red-200 bg-red-50" : "border-orange-200 bg-orange-50"
                        }
                      >
                        <Target className="h-4 w-4" />
                        <AlertTitle className="flex items-center justify-between">
                          <span>{rec.title}</span>
                          <Badge variant="outline">{rec.confidence.toFixed(0)}% 置信度</Badge>
                        </AlertTitle>
                        <AlertDescription>
                          <p className="mb-2">{rec.description}</p>
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-3 w-3" />
                            <span>时间窗口: {rec.timeWindow}</span>
                          </div>
                        </AlertDescription>
                      </Alert>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          {/* 实时事件选项卡 */}
          <TabsContent value="events" className="mt-4 px-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">实时事件流</h3>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  筛选
                </Button>
              </div>

              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-3">
                  {events.map((event) => (
                    <div key={event.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(event.severity)}>{event.severity}</Badge>
                          <span className="font-medium">{event.source}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500">{event.timestamp}</span>
                          {event.processed ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </div>
                      </div>

                      <div className="text-sm text-gray-600 mb-2">
                        类型: {event.type} | 来源: {event.source}
                      </div>

                      {event.actionRequired && (
                        <div className="flex gap-2 mt-3">
                          <Button size="sm" variant="outline">
                            查看详情
                          </Button>
                          <Button size="sm">处理事件</Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* 智能建议选项卡 */}
          <TabsContent value="recommendations" className="mt-4 px-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">智能决策建议</h3>

              <ScrollArea className="h-[500px] pr-4">
                <div className="space-y-4">
                  {recommendations.map((rec) => (
                    <Card key={rec.id} className="border-l-4 border-l-blue-500">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">{rec.title}</CardTitle>
                          <div className="flex items-center gap-2">
                            <Badge
                              variant={
                                rec.type === "immediate"
                                  ? "destructive"
                                  : rec.type === "urgent"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {rec.type === "immediate" && "立即"}
                              {rec.type === "urgent" && "紧急"}
                              {rec.type === "routine" && "常规"}
                              {rec.type === "preventive" && "预防"}
                            </Badge>
                            <Badge variant="outline">{rec.confidence.toFixed(0)}%</Badge>
                          </div>
                        </div>
                        <CardDescription>{rec.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div>
                            <h4 className="text-sm font-medium mb-1">理由分析</h4>
                            <p className="text-sm text-gray-600">{rec.rationale}</p>
                          </div>

                          <div>
                            <h4 className="text-sm font-medium mb-1">主要行动</h4>
                            <p className="text-sm text-gray-700">{rec.actions.primary}</p>
                          </div>

                          {rec.actions.secondary && rec.actions.secondary.length > 0 && (
                            <div>
                              <h4 className="text-sm font-medium mb-1">次要行动</h4>
                              <ul className="text-sm text-gray-600 list-disc list-inside">
                                {rec.actions.secondary.map((action, idx) => (
                                  <li key={idx}>{action}</li>
                                ))}
                              </ul>
                            </div>
                          )}

                          <div className="flex items-center gap-2 pt-2 border-t">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm text-gray-600">时间窗口: {rec.timeWindow}</span>
                          </div>

                          <div className="flex gap-2">
                            <Button size="sm">采纳建议</Button>
                            <Button size="sm" variant="outline">
                              查看详情
                            </Button>
                            <Button size="sm" variant="outline">
                              忽略
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          {/* 决策规则选项卡 */}
          <TabsContent value="rules" className="mt-4 px-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">决策规则管理</h3>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  添加规则
                </Button>
              </div>

              <div className="space-y-3">
                {rules.map((rule) => (
                  <Card key={rule.id}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base flex items-center gap-2">
                            {rule.name}
                            <Badge variant={rule.enabled ? "default" : "secondary"}>
                              {rule.enabled ? "启用" : "禁用"}
                            </Badge>
                          </CardTitle>
                          <CardDescription>{rule.description}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">优先级: {rule.priority}</div>
                          <div className="text-xs text-gray-500">触发 {rule.triggerCount} 次</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div>
                          <span className="text-sm font-medium">触发条件: </span>
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">{rule.condition}</code>
                        </div>
                        <div>
                          <span className="text-sm font-medium">执行动作: </span>
                          <span className="text-sm text-gray-600">{rule.action}</span>
                        </div>
                        {rule.lastTriggered && (
                          <div>
                            <span className="text-sm font-medium">最后触发: </span>
                            <span className="text-sm text-gray-500">{rule.lastTriggered}</span>
                          </div>
                        )}
                        <div className="flex gap-2 pt-2">
                          <Button size="sm" variant="outline">
                            编辑
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setRules((prev) =>
                                prev.map((r) => (r.id === rule.id ? { ...r, enabled: !r.enabled } : r)),
                              )
                            }}
                          >
                            {rule.enabled ? "禁用" : "启用"}
                          </Button>
                          <Button size="sm" variant="outline">
                            测试
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* 分析报告选项卡 */}
          <TabsContent value="analytics" className="mt-4 px-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">决策分析报告</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      规则触发统计
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {rules.slice(0, 5).map((rule) => (
                        <div key={rule.id} className="flex justify-between items-center">
                          <span className="text-sm">{rule.name}</span>
                          <div className="flex items-center gap-2">
                            <Progress
                              value={(rule.triggerCount / Math.max(...rules.map((r) => r.triggerCount), 1)) * 100}
                              className="w-20 h-2"
                            />
                            <span className="text-sm font-medium">{rule.triggerCount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base flex items-center">
                      <Shield className="h-4 w-4 mr-2" />
                      系统性能指标
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm">平均响应时间</span>
                        <span className="text-sm font-medium">2.3秒</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">规则准确率</span>
                        <span className="text-sm font-medium">94.2%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">误报率</span>
                        <span className="text-sm font-medium">3.1%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">系统可用性</span>
                        <span className="text-sm font-medium">99.8%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base">决策质量评估</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-600">87%</div>
                      <div className="text-sm text-gray-500">建议采纳率</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">92%</div>
                      <div className="text-sm text-gray-500">预测准确率</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-600">1.8分钟</div>
                      <div className="text-sm text-gray-500">平均决策时间</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-600">4.6/5</div>
                      <div className="text-sm text-gray-500">医生满意度</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
