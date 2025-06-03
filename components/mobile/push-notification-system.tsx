"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Send,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Clock,
  Apple,
  SmartphoneIcon as Android,
  Target,
  BarChart3,
  Settings,
  Plus,
  Edit,
  Trash2,
  Play,
  Pause,
  Eye,
  TrendingUp,
} from "lucide-react"

// 模拟推送通知数据
const notificationStats = {
  totalSent: 45280,
  delivered: 42156,
  opened: 18947,
  clicked: 8234,
  deliveryRate: 93.1,
  openRate: 44.9,
  clickRate: 19.5,
}

const notificationTemplates = [
  {
    id: "appointment-reminder",
    name: "预约提醒",
    type: "reminder",
    category: "appointment",
    title: "预约提醒",
    message: "您有一个预约将在{time}开始，请准时到达。",
    icon: "calendar",
    enabled: true,
    sent: 1247,
    openRate: 78.5,
  },
  {
    id: "medication-reminder",
    name: "用药提醒",
    type: "reminder",
    category: "medication",
    title: "用药提醒",
    message: "该服用{medication}了，请按时用药。",
    icon: "pill",
    enabled: true,
    sent: 2156,
    openRate: 85.2,
  },
  {
    id: "test-result",
    name: "检查结果",
    type: "notification",
    category: "result",
    title: "检查结果已出",
    message: "您的{test}检查结果已出，请查看详情。",
    icon: "file-text",
    enabled: true,
    sent: 892,
    openRate: 92.1,
  },
  {
    id: "emergency-alert",
    name: "紧急警报",
    type: "alert",
    category: "emergency",
    title: "紧急警报",
    message: "检测到异常指标，请立即联系医生。",
    icon: "alert-triangle",
    enabled: true,
    sent: 45,
    openRate: 98.7,
  },
]

const recentCampaigns = [
  {
    id: "campaign-1",
    name: "流感疫苗接种提醒",
    status: "completed",
    targetUsers: 5420,
    sent: 5420,
    delivered: 5156,
    opened: 2847,
    clicked: 1234,
    scheduledTime: "2025-01-24 09:00",
    completedTime: "2025-01-24 09:15",
  },
  {
    id: "campaign-2",
    name: "健康体检通知",
    status: "running",
    targetUsers: 3280,
    sent: 2156,
    delivered: 2034,
    opened: 892,
    clicked: 345,
    scheduledTime: "2025-01-24 14:00",
    completedTime: null,
  },
  {
    id: "campaign-3",
    name: "新功能介绍",
    status: "scheduled",
    targetUsers: 8940,
    sent: 0,
    delivered: 0,
    opened: 0,
    clicked: 0,
    scheduledTime: "2025-01-25 10:00",
    completedTime: null,
  },
]

const userSegments = [
  { id: "all-users", name: "所有用户", count: 12580, description: "所有注册用户" },
  { id: "active-users", name: "活跃用户", count: 8940, description: "最近30天内活跃的用户" },
  { id: "ios-users", name: "iOS用户", count: 7234, description: "使用iOS设备的用户" },
  { id: "android-users", name: "Android用户", count: 5346, description: "使用Android设备的用户" },
  { id: "premium-users", name: "高级用户", count: 1247, description: "订阅高级服务的用户" },
  { id: "new-users", name: "新用户", count: 892, description: "最近7天注册的用户" },
]

export function PushNotificationSystem() {
  const [selectedTemplate, setSelectedTemplate] = useState(notificationTemplates[0])
  const [isCreatingCampaign, setIsCreatingCampaign] = useState(false)
  const [campaignProgress, setCampaignProgress] = useState(0)

  // 模拟推送进度
  useEffect(() => {
    if (isCreatingCampaign) {
      const interval = setInterval(() => {
        setCampaignProgress((prev) => {
          if (prev >= 100) {
            setIsCreatingCampaign(false)
            return 100
          }
          return prev + Math.random() * 10
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isCreatingCampaign])

  const startCampaign = () => {
    setIsCreatingCampaign(true)
    setCampaignProgress(0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "running":
        return <Play className="w-4 h-4 text-blue-500" />
      case "scheduled":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "paused":
        return <Pause className="w-4 h-4 text-gray-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500">已完成</Badge>
      case "running":
        return <Badge className="bg-blue-500">进行中</Badge>
      case "scheduled":
        return <Badge className="bg-amber-500">已安排</Badge>
      case "paused":
        return <Badge variant="outline">已暂停</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "appointment":
        return <Calendar className="w-4 h-4" />
      case "medication":
        return <Bell className="w-4 h-4" />
      case "result":
        return <CheckCircle className="w-4 h-4" />
      case "emergency":
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Bell className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">推送通知系统</h2>
          <p className="text-muted-foreground">多平台推送通知管理、模板配置和效果分析</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={startCampaign} disabled={isCreatingCampaign}>
            <Send className="w-4 h-4 mr-2" />
            {isCreatingCampaign ? "发送中..." : "创建推送"}
          </Button>
        </div>
      </div>

      {/* 统计概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">总发送量</p>
                <p className="text-2xl font-bold">{notificationStats.totalSent.toLocaleString()}</p>
              </div>
              <Send className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">送达率</p>
                <p className="text-2xl font-bold">{notificationStats.deliveryRate}%</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">打开率</p>
                <p className="text-2xl font-bold">{notificationStats.openRate}%</p>
              </div>
              <Eye className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">点击率</p>
                <p className="text-2xl font-bold">{notificationStats.clickRate}%</p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">通知模板</TabsTrigger>
          <TabsTrigger value="campaigns">推送活动</TabsTrigger>
          <TabsTrigger value="segments">用户分群</TabsTrigger>
          <TabsTrigger value="analytics">数据分析</TabsTrigger>
          <TabsTrigger value="settings">推送设置</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">通知模板管理</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              新建模板
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {notificationTemplates.map((template) => (
              <Card key={template.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(template.category)}
                      <CardTitle className="text-lg">{template.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={template.enabled} onCheckedChange={() => {}} />
                      <Badge variant="outline">{template.type}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="font-medium text-sm mb-1">标题</div>
                    <div className="text-sm text-muted-foreground">{template.title}</div>
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">内容</div>
                    <div className="text-sm text-muted-foreground">{template.message}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">发送次数</div>
                      <div className="font-medium">{template.sent.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">打开率</div>
                      <div className="font-medium">{template.openRate}%</div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </Button>
                    <Button size="sm" variant="outline">
                      <Send className="w-4 h-4 mr-1" />
                      测试发送
                    </Button>
                    <Button size="sm" variant="outline">
                      <Trash2 className="w-4 h-4 mr-1" />
                      删除
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="campaigns" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">推送活动</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              创建活动
            </Button>
          </div>

          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(campaign.status)}
                      <CardTitle className="text-lg">{campaign.name}</CardTitle>
                    </div>
                    {getStatusBadge(campaign.status)}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">目标用户</div>
                      <div className="font-medium">{campaign.targetUsers.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">已发送</div>
                      <div className="font-medium">{campaign.sent.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">已送达</div>
                      <div className="font-medium">{campaign.delivered.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">已打开</div>
                      <div className="font-medium">{campaign.opened.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">已点击</div>
                      <div className="font-medium">{campaign.clicked.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">计划时间</div>
                      <div className="font-medium">{campaign.scheduledTime}</div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      查看详情
                    </Button>
                    {campaign.status === "running" && (
                      <Button size="sm" variant="outline">
                        <Pause className="w-4 h-4 mr-1" />
                        暂停
                      </Button>
                    )}
                    {campaign.status === "scheduled" && (
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4 mr-1" />
                        编辑
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isCreatingCampaign && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Send className="w-5 h-5" />
                  推送进度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>正在发送推送通知...</span>
                    <span>{Math.round(campaignProgress)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${campaignProgress}%` }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="segments" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">用户分群管理</h3>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              创建分群
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {userSegments.map((segment) => (
              <Card key={segment.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{segment.name}</CardTitle>
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <div className="text-2xl font-bold">{segment.count.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">用户数量</div>
                  </div>
                  <div className="text-sm text-muted-foreground">{segment.description}</div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Target className="w-4 h-4 mr-1" />
                      选择
                    </Button>
                    <Button size="sm" variant="outline">
                      <Edit className="w-4 h-4 mr-1" />
                      编辑
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  平台分布
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Apple className="w-4 h-4" />
                      <span>iOS</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: "65%" }}></div>
                      </div>
                      <span className="text-sm">65%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Android className="w-4 h-4 text-green-500" />
                      <span>Android</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-200 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: "35%" }}></div>
                      </div>
                      <span className="text-sm">35%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  效果趋势
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">送达率</span>
                    <span className="text-sm font-medium">93.1% ↑2.3%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">打开率</span>
                    <span className="text-sm font-medium">44.9% ↑1.8%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">点击率</span>
                    <span className="text-sm font-medium">19.5% ↓0.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">转化率</span>
                    <span className="text-sm font-medium">8.2% ↑0.9%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>推送设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fcm-key">Firebase Cloud Messaging 密钥</Label>
                  <Input id="fcm-key" type="password" placeholder="输入FCM服务器密钥" />
                </div>
                <div>
                  <Label htmlFor="apns-cert">Apple Push Notification 证书</Label>
                  <Input id="apns-cert" type="file" accept=".p12,.pem" />
                </div>
                <div>
                  <Label htmlFor="sender-name">发送者名称</Label>
                  <Input id="sender-name" placeholder="医枢智能诊疗系统" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="batch-sending">批量发送</Label>
                    <p className="text-sm text-muted-foreground">启用批量发送以提高性能</p>
                  </div>
                  <Switch id="batch-sending" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="retry-failed">重试失败推送</Label>
                    <p className="text-sm text-muted-foreground">自动重试发送失败的通知</p>
                  </div>
                  <Switch id="retry-failed" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="analytics-tracking">分析跟踪</Label>
                    <p className="text-sm text-muted-foreground">启用详细的推送分析</p>
                  </div>
                  <Switch id="analytics-tracking" defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    保存设置
                  </Button>
                  <Button variant="outline">
                    <Send className="w-4 h-4 mr-2" />
                    测试推送
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
