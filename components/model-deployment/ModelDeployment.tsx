"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Brain,
  Server,
  Activity,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  RotateCcw,
  Settings,
  Monitor,
  Cpu,
  HardDrive,
  Upload,
  Download,
  Zap,
} from "lucide-react"

interface ModelDeploymentProps {
  className?: string
}

export default function ModelDeployment({ className }: ModelDeploymentProps) {
  const [selectedModel, setSelectedModel] = useState<string | null>(null)

  const models = [
    {
      id: "chest-xray-v2",
      name: "胸部X光诊断模型",
      version: "v2.1.3",
      status: "running",
      accuracy: "94.2%",
      requests: 1234,
      deployedAt: "2024-01-15",
    },
    {
      id: "ct-analysis-v1",
      name: "CT影像分析模型",
      version: "v1.8.2",
      status: "running",
      accuracy: "91.8%",
      requests: 856,
      deployedAt: "2024-01-10",
    },
    {
      id: "ecg-analysis-v3",
      name: "心电图分析模型",
      version: "v3.0.1",
      status: "updating",
      accuracy: "96.5%",
      requests: 567,
      deployedAt: "2024-01-12",
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "running":
        return <Badge variant="default">运行中</Badge>
      case "updating":
        return <Badge variant="secondary">更新中</Badge>
      case "stopped":
        return <Badge variant="destructive">已停止</Badge>
      default:
        return <Badge variant="outline">未知</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "updating":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "stopped":
        return <AlertCircle className="h-5 w-5 text-red-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* 系统状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">运行中模型</CardTitle>
            <Brain className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">总计 12 个模型</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">CPU使用率</CardTitle>
            <Cpu className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">67%</div>
            <Progress value={67} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">内存使用</CardTitle>
            <HardDrive className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12.4GB</div>
            <p className="text-xs text-muted-foreground">总计 32GB</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">今日请求</CardTitle>
            <Activity className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">24,567</div>
            <p className="text-xs text-muted-foreground">平均响应 2.3s</p>
          </CardContent>
        </Card>
      </div>

      {/* 主要内容区域 */}
      <Tabs defaultValue="models" className="space-y-4">
        <TabsList>
          <TabsTrigger value="models">模型管理</TabsTrigger>
          <TabsTrigger value="monitoring">性能监控</TabsTrigger>
          <TabsTrigger value="deployment">部署配置</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Server className="h-5 w-5 mr-2" />
                部署的AI模型
              </CardTitle>
              <CardDescription>当前部署的所有AI模型及其运行状态</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {models.map((model) => (
                  <div
                    key={model.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSelectedModel(model.id)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(model.status)}
                        <div>
                          <h3 className="font-semibold">{model.name}</h3>
                          <p className="text-sm text-gray-600">
                            版本 {model.version} • 部署于 {model.deployedAt}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(model.status)}
                      <div className="text-right">
                        <p className="text-sm font-medium">准确率: {model.accuracy}</p>
                        <p className="text-xs text-gray-600">今日请求: {model.requests}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">
                          <Monitor className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          {model.status === "running" ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                        <Button size="sm" variant="outline">
                          <RotateCcw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>实时性能监控</CardTitle>
                <CardDescription>系统资源使用情况</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>CPU使用率</span>
                    <span>67%</span>
                  </div>
                  <Progress value={67} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>内存使用率</span>
                    <span>38%</span>
                  </div>
                  <Progress value={38} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>GPU使用率</span>
                    <span>82%</span>
                  </div>
                  <Progress value={82} />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>网络带宽</span>
                    <span>45%</span>
                  </div>
                  <Progress value={45} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>部署统计</CardTitle>
                <CardDescription>模型部署和使用统计</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm">总部署模型</span>
                  <Badge variant="outline">12</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">运行中模型</span>
                  <Badge variant="default">8</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">暂停模型</span>
                  <Badge variant="secondary">3</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">更新中模型</span>
                  <Badge variant="destructive">1</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">今日总请求</span>
                  <Badge variant="outline">24,567</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">平均响应时间</span>
                  <Badge variant="outline">2.3s</Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="deployment" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-5 w-5 mr-2" />
                部署配置
              </CardTitle>
              <CardDescription>管理模型部署的配置和设置</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Upload className="h-6 w-6 mb-2" />
                  上传新模型
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Download className="h-6 w-6 mb-2" />
                  导出配置
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Zap className="h-6 w-6 mb-2" />
                  性能优化
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
