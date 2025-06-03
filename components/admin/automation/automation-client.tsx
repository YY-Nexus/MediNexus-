"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Play,
  Settings,
  Activity,
  Server,
  Cloud,
  Zap,
  CheckCircle,
  AlertTriangle,
  Clock,
  BarChart3,
  Cpu,
  HardDrive,
  Network,
  Shield,
} from "lucide-react"

export function AutomationClient() {
  const [activeServices, setActiveServices] = useState({
    autoDeployment: true,
    monitoring: true,
    autoScaling: false,
    selfHealing: true,
    backup: true,
    security: true,
  })

  const automationServices = [
    {
      id: "autoDeployment",
      name: "自动化部署",
      description: "CI/CD流水线自动部署",
      icon: <Cloud className="h-5 w-5" />,
      status: "running",
      lastRun: "2分钟前",
      successRate: 98.5,
    },
    {
      id: "monitoring",
      name: "服务监控",
      description: "24/7系统监控和告警",
      icon: <Activity className="h-5 w-5" />,
      status: "running",
      lastRun: "实时",
      successRate: 99.9,
    },
    {
      id: "autoScaling",
      name: "自动扩缩容",
      description: "基于负载的自动扩缩容",
      icon: <BarChart3 className="h-5 w-5" />,
      status: "stopped",
      lastRun: "1小时前",
      successRate: 95.2,
    },
    {
      id: "selfHealing",
      name: "故障自愈",
      description: "自动检测和修复故障",
      icon: <Zap className="h-5 w-5" />,
      status: "running",
      lastRun: "30分钟前",
      successRate: 92.8,
    },
    {
      id: "backup",
      name: "自动备份",
      description: "定时数据备份和恢复",
      icon: <HardDrive className="h-5 w-5" />,
      status: "running",
      lastRun: "6小时前",
      successRate: 100,
    },
    {
      id: "security",
      name: "安全扫描",
      description: "自动安全漏洞扫描",
      icon: <Shield className="h-5 w-5" />,
      status: "running",
      lastRun: "1小时前",
      successRate: 97.3,
    },
  ]

  const recentTasks = [
    {
      id: 1,
      task: "系统健康检查",
      status: "completed",
      startTime: "14:30",
      duration: "2分钟",
      result: "所有服务正常",
    },
    {
      id: 2,
      task: "数据库优化",
      status: "running",
      startTime: "14:25",
      duration: "进行中",
      result: "优化索引中...",
    },
    {
      id: 3,
      task: "缓存清理",
      status: "completed",
      startTime: "14:20",
      duration: "1分钟",
      result: "清理完成，释放2.3GB",
    },
    {
      id: 4,
      task: "日志归档",
      status: "completed",
      startTime: "14:00",
      duration: "15分钟",
      result: "归档30天前日志",
    },
  ]

  const systemMetrics = [
    {
      name: "CPU使用率",
      value: 45,
      status: "normal",
      icon: <Cpu className="h-4 w-4" />,
    },
    {
      name: "内存使用率",
      value: 68,
      status: "normal",
      icon: <Server className="h-4 w-4" />,
    },
    {
      name: "磁盘使用率",
      value: 82,
      status: "warning",
      icon: <HardDrive className="h-4 w-4" />,
    },
    {
      name: "网络流量",
      value: 35,
      status: "normal",
      icon: <Network className="h-4 w-4" />,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "bg-green-500"
      case "stopped":
        return "bg-red-500"
      case "warning":
        return "bg-yellow-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "running":
        return "运行中"
      case "stopped":
        return "已停止"
      case "warning":
        return "警告"
      default:
        return "未知"
    }
  }

  const toggleService = (serviceId: string) => {
    setActiveServices((prev) => ({
      ...prev,
      [serviceId]: !prev[serviceId as keyof typeof prev],
    }))
  }

  return (
    <div className="space-y-6">
      {/* 系统概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {systemMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {metric.icon}
                  <span className="text-sm font-medium">{metric.name}</span>
                </div>
                <Badge variant={metric.status === "warning" ? "destructive" : "secondary"}>{metric.value}%</Badge>
              </div>
              <Progress value={metric.value} className="mt-2" />
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="services">自动化服务</TabsTrigger>
          <TabsTrigger value="tasks">任务管理</TabsTrigger>
          <TabsTrigger value="schedules">定时任务</TabsTrigger>
          <TabsTrigger value="logs">运维日志</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {automationServices.map((service) => (
              <Card key={service.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {service.icon}
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${getStatusColor(service.status)}`} />
                      <Switch
                        checked={activeServices[service.id as keyof typeof activeServices]}
                        onCheckedChange={() => toggleService(service.id)}
                      />
                    </div>
                  </div>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>状态:</span>
                      <Badge variant={service.status === "running" ? "default" : "secondary"}>
                        {getStatusText(service.status)}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>最后运行:</span>
                      <span className="text-muted-foreground">{service.lastRun}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>成功率:</span>
                      <span className="font-medium">{service.successRate}%</span>
                    </div>
                    <Progress value={service.successRate} className="mt-2" />
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Button size="sm" variant="outline">
                      <Settings className="h-4 w-4 mr-1" />
                      配置
                    </Button>
                    <Button size="sm" variant="outline">
                      <Activity className="h-4 w-4 mr-1" />
                      监控
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>最近任务</CardTitle>
              <CardDescription>系统自动化任务执行记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {task.status === "completed" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : task.status === "running" ? (
                        <Clock className="h-5 w-5 text-blue-500 animate-spin" />
                      ) : (
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <div className="font-medium">{task.task}</div>
                        <div className="text-sm text-muted-foreground">{task.result}</div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-muted-foreground">
                      <div>{task.startTime}</div>
                      <div>{task.duration}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="schedules" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>定时任务配置</CardTitle>
              <CardDescription>管理系统定时任务和调度策略</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">数据库备份</h4>
                        <Badge>每日 02:00</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">自动备份所有数据库到云存储</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          编辑
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          立即执行
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">日志清理</h4>
                        <Badge>每周日 01:00</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">清理30天前的系统日志文件</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          编辑
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          立即执行
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">性能报告</h4>
                        <Badge>每月1日 09:00</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">生成月度系统性能分析报告</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          编辑
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          立即执行
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">安全扫描</h4>
                        <Badge>每日 03:00</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">执行系统安全漏洞扫描</p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          编辑
                        </Button>
                        <Button size="sm" variant="outline">
                          <Play className="h-4 w-4 mr-1" />
                          立即执行
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="logs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>运维操作日志</CardTitle>
              <CardDescription>系统自动化运维操作的详细日志记录</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-3 p-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">14:30:15</span>
                  <span>自动备份任务完成，备份文件大小: 2.3GB</span>
                </div>
                <div className="flex items-center space-x-3 p-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">14:25:42</span>
                  <span>数据库索引优化完成，查询性能提升15%</span>
                </div>
                <div className="flex items-center space-x-3 p-2 text-sm">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-muted-foreground">14:20:33</span>
                  <span>检测到磁盘使用率超过80%，已触发清理任务</span>
                </div>
                <div className="flex items-center space-x-3 p-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">14:15:28</span>
                  <span>安全扫描完成，未发现安全漏洞</span>
                </div>
                <div className="flex items-center space-x-3 p-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-muted-foreground">14:10:15</span>
                  <span>服务健康检查完成，所有服务运行正常</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
