"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Play,
  Pause,
  RefreshCw,
  AlertCircle,
  Clock,
  CheckCircle,
  XCircle,
  RotateCw,
  Cpu,
  Database,
  Server,
} from "lucide-react"

// 模拟活动任务数据
const activeTasks = [
  {
    id: "TASK-2024-101",
    name: "患者数据同步",
    type: "数据处理",
    status: "进行中",
    progress: 45,
    startTime: "2024-05-05 10:15:23",
    estimatedEndTime: "2024-05-05 10:25:00",
    executor: "系统",
    resource: "CPU: 15%, 内存: 200MB",
  },
  {
    id: "TASK-2024-102",
    name: "AI模型训练 - 肺炎诊断",
    type: "AI处理",
    status: "进行中",
    progress: 78,
    startTime: "2024-05-05 09:30:00",
    estimatedEndTime: "2024-05-05 11:30:00",
    executor: "AI系统",
    resource: "CPU: 85%, GPU: 90%, 内存: 4.2GB",
  },
  {
    id: "TASK-2024-103",
    name: "数据库索引重建",
    type: "系统维护",
    status: "暂停",
    progress: 60,
    startTime: "2024-05-05 08:00:00",
    estimatedEndTime: "未知",
    executor: "系统",
    resource: "CPU: 5%, 内存: 150MB",
  },
]

// 模拟计划任务数据
const scheduledTasks = [
  {
    id: "TASK-2024-201",
    name: "每日数据备份",
    type: "系统维护",
    schedule: "每日 02:00",
    nextRun: "2024-05-06 02:00:00",
    lastRun: "2024-05-05 02:00:00",
    lastStatus: "成功",
    executor: "系统",
  },
  {
    id: "TASK-2024-202",
    name: "系统性能报告",
    type: "报告",
    schedule: "每周一 08:00",
    nextRun: "2024-05-06 08:00:00",
    lastRun: "2024-04-29 08:00:00",
    lastStatus: "成功",
    executor: "系统",
  },
  {
    id: "TASK-2024-203",
    name: "AI模型自动更新",
    type: "AI处理",
    schedule: "每月1日 00:00",
    nextRun: "2024-06-01 00:00:00",
    lastRun: "2024-05-01 00:00:00",
    lastStatus: "警告",
    executor: "AI系统",
  },
]

// 模拟系统资源数据
const systemResources = {
  cpu: 35,
  memory: 42,
  disk: 68,
  network: 25,
}

export function TaskMonitor() {
  const [resources, setResources] = useState(systemResources)

  // 模拟资源使用变化
  useEffect(() => {
    const interval = setInterval(() => {
      setResources({
        cpu: Math.min(100, Math.max(10, resources.cpu + (Math.random() * 10 - 5))),
        memory: Math.min(100, Math.max(20, resources.memory + (Math.random() * 6 - 3))),
        disk: resources.disk,
        network: Math.min(100, Math.max(5, resources.network + (Math.random() * 15 - 7.5))),
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [resources])

  // 获取状态标签样式
  const getStatusBadge = (status) => {
    switch (status) {
      case "进行中":
        return (
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
            <RotateCw className="h-3 w-3 mr-1 animate-spin" />
            进行中
          </Badge>
        )
      case "暂停":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <Pause className="h-3 w-3 mr-1" />
            暂停
          </Badge>
        )
      case "成功":
        return (
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
            <CheckCircle className="h-3 w-3 mr-1" />
            成功
          </Badge>
        )
      case "失败":
        return (
          <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
            <XCircle className="h-3 w-3 mr-1" />
            失败
          </Badge>
        )
      case "警告":
        return (
          <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
            <AlertCircle className="h-3 w-3 mr-1" />
            警告
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
          <div>
            <CardTitle>任务监控中心</CardTitle>
            <CardDescription>监控和管理系统任务</CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              刷新
            </Button>
            <Button size="sm">
              <Play className="h-4 w-4 mr-2" />
              运行任务
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">活动任务</TabsTrigger>
            <TabsTrigger value="scheduled">计划任务</TabsTrigger>
            <TabsTrigger value="resources">系统资源</TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <div className="space-y-4">
              {activeTasks.map((task) => (
                <Card key={task.id}>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                      <div>
                        <div className="font-medium">{task.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {task.id} | {task.type}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(task.status)}
                        {task.status === "进行中" ? (
                          <Button variant="outline" size="sm">
                            <Pause className="h-3 w-3 mr-1" />
                            暂停
                          </Button>
                        ) : (
                          <Button variant="outline" size="sm">
                            <Play className="h-3 w-3 mr-1" />
                            继续
                          </Button>
                        )}
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                          <XCircle className="h-3 w-3 mr-1" />
                          取消
                        </Button>
                      </div>
                    </div>

                    <div className="mb-2">
                      <div className="flex justify-between text-sm mb-1">
                        <span>进度</span>
                        <span>{task.progress}%</span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">开始时间:</span>
                        <span>{task.startTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">预计完成:</span>
                        <span>{task.estimatedEndTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Cpu className="h-3 w-3 text-muted-foreground" />
                        <span className="text-muted-foreground">资源使用:</span>
                        <span>{task.resource}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="scheduled">
            <div className="rounded-md border">
              <div className="grid grid-cols-6 text-sm font-medium text-muted-foreground bg-muted p-4">
                <div>任务名称</div>
                <div>类型</div>
                <div>执行计划</div>
                <div>下次执行</div>
                <div>上次状态</div>
                <div>操作</div>
              </div>

              {scheduledTasks.map((task) => (
                <div key={task.id} className="grid grid-cols-6 items-center p-4 border-t">
                  <div>
                    <div className="font-medium">{task.name}</div>
                    <div className="text-xs text-muted-foreground">{task.id}</div>
                  </div>
                  <div>{task.type}</div>
                  <div>{task.schedule}</div>
                  <div>{task.nextRun}</div>
                  <div>{getStatusBadge(task.lastStatus)}</div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Play className="h-3 w-3 mr-1" />
                      立即执行
                    </Button>
                    <Button variant="outline" size="sm">
                      编辑
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-blue-500" />
                    <CardTitle className="text-sm">CPU使用率</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{Math.round(resources.cpu)}%</div>
                  <Progress value={resources.cpu} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Server className="h-4 w-4 text-purple-500" />
                    <CardTitle className="text-sm">内存使用率</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{Math.round(resources.memory)}%</div>
                  <Progress value={resources.memory} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <Database className="h-4 w-4 text-amber-500" />
                    <CardTitle className="text-sm">磁盘使用率</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{Math.round(resources.disk)}%</div>
                  <Progress value={resources.disk} className="h-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <div className="flex items-center gap-2">
                    <RefreshCw className="h-4 w-4 text-green-500" />
                    <CardTitle className="text-sm">网络使用率</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold mb-2">{Math.round(resources.network)}%</div>
                  <Progress value={resources.network} className="h-2" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default TaskMonitor
