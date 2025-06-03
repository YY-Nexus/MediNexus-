"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  AlertTriangle,
  Bell,
  Heart,
  Activity,
  Droplets,
  CheckCircle,
  XCircle,
  Clock,
  Users,
  Smartphone,
  Mail,
} from "lucide-react"

interface HealthAlert {
  id: string
  type: "critical" | "warning" | "info"
  category: "vital_signs" | "medication" | "appointment" | "lab_results"
  title: string
  message: string
  timestamp: string
  patientId?: string
  patientName?: string
  isRead: boolean
  isAcknowledged: boolean
  priority: "high" | "medium" | "low"
}

interface AlertRule {
  id: string
  name: string
  category: string
  condition: string
  threshold: number
  enabled: boolean
  notificationMethods: string[]
}

export function HealthAlertSystem() {
  const [alerts, setAlerts] = useState<HealthAlert[]>([
    {
      id: "1",
      type: "critical",
      category: "vital_signs",
      title: "血压异常",
      message: "患者张三的血压读数为180/110 mmHg，超出正常范围",
      timestamp: "2024-01-15 14:30:00",
      patientId: "P001",
      patientName: "张三",
      isRead: false,
      isAcknowledged: false,
      priority: "high",
    },
    {
      id: "2",
      type: "warning",
      category: "medication",
      title: "用药提醒",
      message: "患者李四的降压药已连续2天未按时服用",
      timestamp: "2024-01-15 13:15:00",
      patientId: "P002",
      patientName: "李四",
      isRead: true,
      isAcknowledged: false,
      priority: "medium",
    },
    {
      id: "3",
      type: "info",
      category: "appointment",
      title: "预约提醒",
      message: "患者王五明天上午10:00有复诊预约",
      timestamp: "2024-01-15 12:00:00",
      patientId: "P003",
      patientName: "王五",
      isRead: true,
      isAcknowledged: true,
      priority: "low",
    },
  ])

  const [alertRules, setAlertRules] = useState<AlertRule[]>([
    {
      id: "1",
      name: "高血压预警",
      category: "血压",
      condition: "收缩压 > 140 或 舒张压 > 90",
      threshold: 140,
      enabled: true,
      notificationMethods: ["app", "email", "sms"],
    },
    {
      id: "2",
      name: "心率异常",
      category: "心率",
      condition: "心率 < 60 或 心率 > 100",
      threshold: 100,
      enabled: true,
      notificationMethods: ["app", "email"],
    },
    {
      id: "3",
      name: "体温异常",
      category: "体温",
      condition: "体温 > 37.5°C",
      threshold: 37.5,
      enabled: true,
      notificationMethods: ["app", "sms"],
    },
  ])

  const [activeTab, setActiveTab] = useState("alerts")
  const [filterType, setFilterType] = useState<string>("all")
  const [filterPriority, setFilterPriority] = useState<string>("all")

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <XCircle className="h-5 w-5 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />
      case "info":
        return <CheckCircle className="h-5 w-5 text-blue-500" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "vital_signs":
        return <Activity className="h-4 w-4" />
      case "medication":
        return <Droplets className="h-4 w-4" />
      case "appointment":
        return <Clock className="h-4 w-4" />
      case "lab_results":
        return <Heart className="h-4 w-4" />
      default:
        return <Bell className="h-4 w-4" />
    }
  }

  const filteredAlerts = alerts.filter((alert) => {
    if (filterType !== "all" && alert.type !== filterType) return false
    if (filterPriority !== "all" && alert.priority !== filterPriority) return false
    return true
  })

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, isAcknowledged: true } : alert)))
  }

  const markAsRead = (alertId: string) => {
    setAlerts(alerts.map((alert) => (alert.id === alertId ? { ...alert, isRead: true } : alert)))
  }

  const toggleAlertRule = (ruleId: string) => {
    setAlertRules(alertRules.map((rule) => (rule.id === ruleId ? { ...rule, enabled: !rule.enabled } : rule)))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          智能预警系统
        </CardTitle>
        <CardDescription>实时监控健康数据，智能预警异常情况</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="alerts">预警列表</TabsTrigger>
            <TabsTrigger value="rules">预警规则</TabsTrigger>
            <TabsTrigger value="statistics">统计分析</TabsTrigger>
            <TabsTrigger value="settings">系统设置</TabsTrigger>
          </TabsList>

          <TabsContent value="alerts" className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="筛选类型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有类型</SelectItem>
                  <SelectItem value="critical">紧急</SelectItem>
                  <SelectItem value="warning">警告</SelectItem>
                  <SelectItem value="info">信息</SelectItem>
                </SelectContent>
              </Select>

              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="筛选优先级" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有优先级</SelectItem>
                  <SelectItem value="high">高</SelectItem>
                  <SelectItem value="medium">中</SelectItem>
                  <SelectItem value="low">低</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" className="w-full sm:w-auto">
                标记全部已读
              </Button>
            </div>

            <div className="space-y-3">
              {filteredAlerts.map((alert) => (
                <Alert key={alert.id} className={`${!alert.isRead ? "border-l-4 border-l-blue-500" : ""}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium">{alert.title}</h4>
                          <Badge
                            variant={
                              alert.priority === "high"
                                ? "destructive"
                                : alert.priority === "medium"
                                  ? "secondary"
                                  : "outline"
                            }
                          >
                            {alert.priority === "high" ? "高" : alert.priority === "medium" ? "中" : "低"}
                          </Badge>
                          {getCategoryIcon(alert.category)}
                        </div>
                        <AlertDescription className="mb-2">{alert.message}</AlertDescription>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{alert.timestamp}</span>
                          {alert.patientName && (
                            <span className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              {alert.patientName}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {!alert.isRead && (
                        <Button variant="ghost" size="sm" onClick={() => markAsRead(alert.id)}>
                          标记已读
                        </Button>
                      )}
                      {!alert.isAcknowledged && (
                        <Button variant="outline" size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                          确认处理
                        </Button>
                      )}
                    </div>
                  </div>
                </Alert>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="rules" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">预警规则配置</h3>
              <Button>添加新规则</Button>
            </div>

            <div className="space-y-4">
              {alertRules.map((rule) => (
                <Card key={rule.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-medium">{rule.name}</h4>
                        <p className="text-sm text-muted-foreground">{rule.condition}</p>
                      </div>
                      <Switch checked={rule.enabled} onCheckedChange={() => toggleAlertRule(rule.id)} />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <Label className="text-sm">类别</Label>
                        <p className="text-sm font-medium">{rule.category}</p>
                      </div>
                      <div>
                        <Label className="text-sm">阈值</Label>
                        <p className="text-sm font-medium">{rule.threshold}</p>
                      </div>
                      <div>
                        <Label className="text-sm">通知方式</Label>
                        <div className="flex gap-2 mt-1">
                          {rule.notificationMethods.includes("app") && (
                            <Badge variant="outline">
                              <Smartphone className="h-3 w-3 mr-1" />
                              应用
                            </Badge>
                          )}
                          {rule.notificationMethods.includes("email") && (
                            <Badge variant="outline">
                              <Mail className="h-3 w-3 mr-1" />
                              邮件
                            </Badge>
                          )}
                          {rule.notificationMethods.includes("sms") && (
                            <Badge variant="outline">
                              <Smartphone className="h-3 w-3 mr-1" />
                              短信
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2 mt-4">
                      <Button variant="ghost" size="sm">
                        编辑
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-600">
                        删除
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">今日预警</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">12</div>
                  <p className="text-xs text-muted-foreground">较昨日 +3</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">紧急预警</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">3</div>
                  <p className="text-xs text-muted-foreground">需要立即处理</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">处理率</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">95%</div>
                  <p className="text-xs text-muted-foreground">本月平均</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>预警趋势</CardTitle>
                <CardDescription>过去7天的预警统计</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                  <div className="text-center">
                    <Activity className="h-10 w-10 text-medical-600 opacity-50 mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">预警趋势图表</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>通知设置</CardTitle>
                <CardDescription>配置预警通知的方式和频率</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>应用内通知</Label>
                    <p className="text-sm text-muted-foreground">在应用内显示预警通知</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>邮件通知</Label>
                    <p className="text-sm text-muted-foreground">发送预警邮件到注册邮箱</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>短信通知</Label>
                    <p className="text-sm text-muted-foreground">发送预警短信到注册手机</p>
                  </div>
                  <Switch />
                </div>

                <div className="space-y-2">
                  <Label>通知频率限制</Label>
                  <Select defaultValue="5">
                    <SelectTrigger>
                      <SelectValue placeholder="选择频率限制" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">每分钟最多1次</SelectItem>
                      <SelectItem value="5">每5分钟最多1次</SelectItem>
                      <SelectItem value="15">每15分钟最多1次</SelectItem>
                      <SelectItem value="60">每小时最多1次</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>静默时间</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input type="time" defaultValue="22:00" placeholder="开始时间" />
                    <Input type="time" defaultValue="08:00" placeholder="结束时间" />
                  </div>
                  <p className="text-sm text-muted-foreground">在此时间段内不发送非紧急预警</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
