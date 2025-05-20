"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RefreshCw, Play, Pause, StopCircle, CheckCircle, Clock, XCircle } from "lucide-react"

export function TaskMonitor() {
  const [activeTab, setActiveTab] = useState("running")

  // 模拟运行中的任务
  const runningTasks = [
    {
      id: "TASK-2023-008",
      name: "大型数据集处理",
      type: "data",
      startTime: "2023-05-20 09:30:00",
      progress: 65,
      estimatedEnd: "2023-05-20 11:30:00",
      status: "running",
    },
    {
      id: "TASK-2023-009",
      name: "AI模型训练",
      type: "ai",
      startTime: "2023-05-20 08:15:00",
      progress: 42,
      estimatedEnd: "2023-05-20 14:00:00",
      status: "running",
    },
    {
      id: "TASK-2023-010",
      name: "系统性能分析",
      type: "system",
      startTime: "2023-05-20 10:00:00",
      progress: 18,
      estimatedEnd: "2023-05-20 10:45:00",
      status: "running",
    },
  ]

  // 模拟等待中的任务
  const pendingTasks = [
    {
      id: "TASK-2023-011",
      name: "数据库索引重建",
      type: "database",
      scheduledStart: "2023-05-20 12:00:00",
      status: "pending",
    },
    {
      id: "TASK-2023-012",
      name: "用户报告生成",
      type: "report",
      scheduledStart: "2023-05-20 13:30:00",
      status: "pending",
    },
  ]

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return (
          <Badge className="bg-blue-500 flex items-center gap-1">
            <RefreshCw className="h-3 w-3 animate-spin" /> 运行中
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-500 flex items-center gap-1">
            <Clock className="h-3 w-3" /> 等待中
          </Badge>
        )
      case "paused":
        return (
          <Badge className="bg-orange-500 flex items-center gap-1">
            <Pause className="h-3 w-3" /> 已暂停
          </Badge>
        )
      case "completed":
        return (
          <Badge className="bg-green-500 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> 已完成
          </Badge>
        )
      case "failed":
        return (
          <Badge className="bg-red-500 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> 失败
          </Badge>
        )
      default:
        return <Badge>未知</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">实时任务监控</h2>
        <Button variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-2" />
          刷新
        </Button>
      </div>

      <Tabs defaultValue="running" value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="running">运行中 ({runningTasks.length})</TabsTrigger>
          <TabsTrigger value="pending">等待中 ({pendingTasks.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="running" className="mt-4 space-y-4">
          {runningTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{task.name}</CardTitle>
                    <CardDescription>
                      任务ID: {task.id} | 开始时间: {task.startTime}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(task.status)}
                    <Button variant="outline" size="sm">
                      <Pause className="h-4 w-4 mr-2" />
                      暂停
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <StopCircle className="h-4 w-4 mr-2" />
                      停止
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span>进度: {task.progress}%</span>
                    <span>预计完成时间: {task.estimatedEnd}</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          ))}

          {runningTasks.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-lg font-medium">当前没有运行中的任务</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="pending" className="mt-4 space-y-4">
          {pendingTasks.map((task) => (
            <Card key={task.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">{task.name}</CardTitle>
                    <CardDescription>
                      任务ID: {task.id} | 计划开始时间: {task.scheduledStart}
                    </CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    {getStatusBadge(task.status)}
                    <Button variant="outline" size="sm">
                      <Play className="h-4 w-4 mr-2" />
                      立即执行
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                      <XCircle className="h-4 w-4 mr-2" />
                      取消
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}

          {pendingTasks.length === 0 && (
            <Card>
              <CardContent className="flex flex-col items-center justify-center py-6">
                <CheckCircle className="h-12 w-12 text-green-500 mb-2" />
                <p className="text-lg font-medium">当前没有等待中的任务</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>系统资源使用情况</CardTitle>
          <CardDescription>任务执行所使用的系统资源</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>CPU 使用率</span>
              <span>42%</span>
            </div>
            <Progress value={42} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>内存使用率</span>
              <span>68%</span>
            </div>
            <Progress value={68} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>磁盘 I/O</span>
              <span>23%</span>
            </div>
            <Progress value={23} className="h-2" />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span>网络带宽</span>
              <span>15%</span>
            </div>
            <Progress value={15} className="h-2" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TaskMonitor
