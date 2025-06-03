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
import { Shield, AlertTriangle, Zap, TrendingUp, Clock, CheckCircle, XCircle, Brain, Radar } from "lucide-react"

interface ThreatEvent {
  id: string
  type: string
  severity: "low" | "medium" | "high" | "critical"
  title: string
  description: string
  timestamp: string
  source: string
  target: string
  status: "active" | "investigating" | "resolved" | "false_positive"
  confidence: number
  impact: string
  mitigation: string[]
}

interface ThreatStats {
  totalThreats: number
  activeThreats: number
  resolvedThreats: number
  falsePositives: number
  criticalThreats: number
  averageResponseTime: string
}

interface DetectionRule {
  id: string
  name: string
  category: string
  enabled: boolean
  sensitivity: number
  description: string
  lastTriggered: string
}

export function ThreatDetectionSystem() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [realTimeMonitoring, setRealTimeMonitoring] = useState(true)
  const [autoResponse, setAutoResponse] = useState(true)

  const [threatStats, setThreatStats] = useState<ThreatStats>({
    totalThreats: 1247,
    activeThreats: 23,
    resolvedThreats: 1198,
    falsePositives: 26,
    criticalThreats: 5,
    averageResponseTime: "4.2分钟",
  })

  const [threatEvents, setThreatEvents] = useState<ThreatEvent[]>([
    {
      id: "threat-001",
      type: "暴力破解攻击",
      severity: "high",
      title: "检测到暴力破解登录尝试",
      description: "来自IP 203.0.113.45的用户在5分钟内尝试登录15次",
      timestamp: "2024-12-25 14:30:25",
      source: "203.0.113.45",
      target: "登录系统",
      status: "active",
      confidence: 95,
      impact: "可能导致账户被破解",
      mitigation: ["IP封禁", "账户锁定", "增强验证"],
    },
    {
      id: "threat-002",
      type: "权限提升尝试",
      severity: "critical",
      title: "检测到权限提升攻击",
      description: "用户李护士尝试访问管理员功能",
      timestamp: "2024-12-25 14:25:10",
      source: "user-456",
      target: "/admin/users",
      status: "investigating",
      confidence: 88,
      impact: "可能获得系统管理权限",
      mitigation: ["权限审查", "用户调查", "访问限制"],
    },
    {
      id: "threat-003",
      type: "数据泄露风险",
      severity: "medium",
      title: "异常数据导出行为",
      description: "用户王主任在短时间内导出大量患者数据",
      timestamp: "2024-12-25 14:20:45",
      source: "user-789",
      target: "患者数据库",
      status: "resolved",
      confidence: 72,
      impact: "可能存在数据泄露风险",
      mitigation: ["数据审计", "导出限制", "用户培训"],
    },
    {
      id: "threat-004",
      type: "恶意软件检测",
      severity: "high",
      title: "检测到可疑文件上传",
      description: "上传的文件包含可疑代码特征",
      timestamp: "2024-12-25 14:15:30",
      source: "file-upload",
      target: "文件系统",
      status: "active",
      confidence: 91,
      impact: "可能感染系统",
      mitigation: ["文件隔离", "病毒扫描", "系统检查"],
    },
    {
      id: "threat-005",
      type: "异常网络流量",
      severity: "low",
      title: "检测到异常网络连接",
      description: "发现与已知恶意IP的通信",
      timestamp: "2024-12-25 14:10:15",
      source: "192.168.1.120",
      target: "外部网络",
      status: "false_positive",
      confidence: 45,
      impact: "可能的数据外泄",
      mitigation: ["网络监控", "流量分析", "连接阻断"],
    },
  ])

  const [detectionRules, setDetectionRules] = useState<DetectionRule[]>([
    {
      id: "rule-001",
      name: "暴力破解检测",
      category: "认证安全",
      enabled: true,
      sensitivity: 85,
      description: "检测短时间内的多次登录失败",
      lastTriggered: "2024-12-25 14:30:25",
    },
    {
      id: "rule-002",
      name: "权限异常检测",
      category: "访问控制",
      enabled: true,
      sensitivity: 90,
      description: "检测用户尝试访问超出权限的资源",
      lastTriggered: "2024-12-25 14:25:10",
    },
    {
      id: "rule-003",
      name: "数据导出监控",
      category: "数据保护",
      enabled: true,
      sensitivity: 70,
      description: "监控大量数据导出行为",
      lastTriggered: "2024-12-25 14:20:45",
    },
    {
      id: "rule-004",
      name: "恶意文件检测",
      category: "恶意软件",
      enabled: true,
      sensitivity: 95,
      description: "检测上传文件中的恶意代码",
      lastTriggered: "2024-12-25 14:15:30",
    },
    {
      id: "rule-005",
      name: "网络异常监控",
      category: "网络安全",
      enabled: false,
      sensitivity: 60,
      description: "监控异常网络连接和流量",
      lastTriggered: "2024-12-25 14:10:15",
    },
  ])

  // 获取严重程度颜色
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-600"
      case "high":
        return "bg-red-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-blue-500"
      default:
        return "bg-gray-500"
    }
  }

  // 获取状态颜色
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-red-600"
      case "investigating":
        return "text-yellow-600"
      case "resolved":
        return "text-green-600"
      case "false_positive":
        return "text-gray-600"
      default:
        return "text-gray-600"
    }
  }

  // 处理威胁事件
  const handleThreat = (threatId: string, action: string) => {
    setThreatEvents((threats) =>
      threats.map((threat) => (threat.id === threatId ? { ...threat, status: action as any } : threat)),
    )
  }

  // 切换检测规则
  const toggleRule = (ruleId: string) => {
    setDetectionRules((rules) => rules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">威胁检测系统</h2>
          <p className="text-muted-foreground">实时监控和检测安全威胁</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Switch id="real-time" checked={realTimeMonitoring} onCheckedChange={setRealTimeMonitoring} />
            <Label htmlFor="real-time">实时监控</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Switch id="auto-response" checked={autoResponse} onCheckedChange={setAutoResponse} />
            <Label htmlFor="auto-response">自动响应</Label>
          </div>
        </div>
      </div>

      {/* 威胁统计概览 */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总威胁数</CardTitle>
            <Shield className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.totalThreats}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              较上周 +8%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">活跃威胁</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.activeThreats}</div>
            <p className="text-xs text-muted-foreground">需要立即处理</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已解决</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.resolvedThreats}</div>
            <p className="text-xs text-muted-foreground">
              解决率 {((threatStats.resolvedThreats / threatStats.totalThreats) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">误报</CardTitle>
            <XCircle className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.falsePositives}</div>
            <p className="text-xs text-muted-foreground">
              误报率 {((threatStats.falsePositives / threatStats.totalThreats) * 100).toFixed(1)}%
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">严重威胁</CardTitle>
            <Zap className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.criticalThreats}</div>
            <p className="text-xs text-muted-foreground">需紧急处理</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">响应时间</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{threatStats.averageResponseTime}</div>
            <p className="text-xs text-muted-foreground">平均响应时间</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dashboard">威胁面板</TabsTrigger>
          <TabsTrigger value="events">威胁事件</TabsTrigger>
          <TabsTrigger value="rules">检测规则</TabsTrigger>
          <TabsTrigger value="intelligence">威胁情报</TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>实时威胁监控</CardTitle>
                <CardDescription>当前系统威胁状态</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">系统安全状态</span>
                  <Badge className="bg-yellow-500">警戒</Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>威胁检测覆盖率</span>
                    <span>94%</span>
                  </div>
                  <Progress value={94} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>检测引擎状态</span>
                    <span>正常</span>
                  </div>
                  <Progress value={100} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>威胁情报更新</span>
                    <span>最新</span>
                  </div>
                  <Progress value={100} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>最新威胁警报</CardTitle>
                <CardDescription>需要立即关注的威胁事件</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {threatEvents
                  .filter((threat) => threat.status === "active")
                  .slice(0, 3)
                  .map((threat) => (
                    <Alert key={threat.id}>
                      <AlertTriangle className="h-4 w-4" />
                      <AlertTitle>{threat.title}</AlertTitle>
                      <AlertDescription>
                        {threat.description}
                        <div className="mt-2 flex items-center space-x-2">
                          <Badge className={getSeverityColor(threat.severity)}>
                            {threat.severity === "critical"
                              ? "严重"
                              : threat.severity === "high"
                                ? "高"
                                : threat.severity === "medium"
                                  ? "中"
                                  : "低"}
                          </Badge>
                          <span className="text-xs">置信度: {threat.confidence}%</span>
                        </div>
                      </AlertDescription>
                    </Alert>
                  ))}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>威胁事件列表</CardTitle>
              <CardDescription>所有检测到的威胁事件</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatEvents.map((threat) => (
                  <div key={threat.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{threat.title}</h4>
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity === "critical"
                            ? "严重"
                            : threat.severity === "high"
                              ? "高"
                              : threat.severity === "medium"
                                ? "中"
                                : "低"}
                        </Badge>
                        <Badge variant="outline">{threat.type}</Badge>
                      </div>
                      <span className={`text-sm font-medium ${getStatusColor(threat.status)}`}>
                        {threat.status === "active"
                          ? "活跃"
                          : threat.status === "investigating"
                            ? "调查中"
                            : threat.status === "resolved"
                              ? "已解决"
                              : "误报"}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">{threat.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">来源:</span> {threat.source}
                      </div>
                      <div>
                        <span className="font-medium">目标:</span> {threat.target}
                      </div>
                      <div>
                        <span className="font-medium">时间:</span> {threat.timestamp}
                      </div>
                      <div>
                        <span className="font-medium">置信度:</span> {threat.confidence}%
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="font-medium">影响:</span> {threat.impact}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">建议缓解措施:</span>
                        <ul className="list-disc list-inside ml-4 mt-1">
                          {threat.mitigation.map((measure, index) => (
                            <li key={index}>{measure}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {threat.status === "active" && (
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={() => handleThreat(threat.id, "investigating")}>
                          开始调查
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleThreat(threat.id, "resolved")}>
                          标记已解决
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleThreat(threat.id, "false_positive")}>
                          标记误报
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>检测规则管理</CardTitle>
              <CardDescription>配置和管理威胁检测规则</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {detectionRules.map((rule) => (
                  <div key={rule.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{rule.name}</h4>
                        <Badge variant="outline">{rule.category}</Badge>
                        <Badge variant={rule.enabled ? "default" : "secondary"}>{rule.enabled ? "启用" : "禁用"}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{rule.description}</p>
                      <div className="flex items-center space-x-4 text-sm">
                        <span>敏感度: {rule.sensitivity}%</span>
                        <span>最后触发: {rule.lastTriggered}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch checked={rule.enabled} onCheckedChange={() => toggleRule(rule.id)} />
                      <Button variant="outline" size="sm">
                        配置
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>威胁情报源</CardTitle>
                <CardDescription>外部威胁情报集成状态</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">国家网络安全中心</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">已连接</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">医疗行业威胁情报</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">已连接</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">全球恶意IP数据库</span>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm">更新中</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">病毒特征库</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-sm">最新</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>AI威胁分析</CardTitle>
                <CardDescription>机器学习威胁检测状态</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">行为分析模型</span>
                  <div className="flex items-center space-x-2">
                    <Brain className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">运行中</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">异常检测引擎</span>
                  <div className="flex items-center space-x-2">
                    <Radar className="h-4 w-4 text-green-500" />
                    <span className="text-sm">活跃</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">模式识别准确率</span>
                  <span className="text-sm font-medium">94.2%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">模型最后更新</span>
                  <span className="text-sm">2小时前</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
