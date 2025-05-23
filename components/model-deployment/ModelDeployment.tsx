"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, Square, Settings, Activity, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface DeploymentStatus {
  id: string
  name: string
  status: "running" | "stopped" | "deploying" | "error"
  version: string
  instances: number
  cpu: number
  memory: number
  lastDeployed: string
}

export function ModelDeployment() {
  const [deployments] = useState<DeploymentStatus[]>([
    {
      id: "1",
      name: "医疗影像分析模型",
      status: "running",
      version: "v2.1.0",
      instances: 3,
      cpu: 45,
      memory: 68,
      lastDeployed: "2024-01-15 14:30:00",
    },
    {
      id: "2",
      name: "临床决策支持模型",
      status: "deploying",
      version: "v1.8.2",
      instances: 2,
      cpu: 32,
      memory: 55,
      lastDeployed: "2024-01-15 13:45:00",
    },
    {
      id: "3",
      name: "药物相互作用检测",
      status: "stopped",
      version: "v1.5.1",
      instances: 0,
      cpu: 0,
      memory: 0,
      lastDeployed: "2024-01-14 16:20:00",
    },
  ])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "running":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "deploying":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "stopped":
        return <Square className="h-4 w-4 text-gray-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-blue-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const variants = {
      running: "default",
      deploying: "secondary",
      stopped: "outline",
      error: "destructive",
    } as const

    const labels = {
      running: "运行中",
      deploying: "部署中",
      stopped: "已停止",
      error: "错误",
    }

    return (
      <Badge variant={variants[status as keyof typeof variants] || "outline"}>
        {labels[status as keyof typeof labels] || status}
      </Badge>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">模型部署管理</h2>
          <p className="text-muted-foreground">管理和监控AI模型的部署状态</p>
        </div>
        <Button>
          <Play className="mr-2 h-4 w-4" />
          新建部署
        </Button>
      </div>

      <div className="grid gap-6">
        {deployments.map((deployment) => (
          <Card key={deployment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getStatusIcon(deployment.status)}
                  <div>
                    <CardTitle className="text-lg">{deployment.name}</CardTitle>
                    <CardDescription>
                      版本 {deployment.version} • 最后部署: {deployment.lastDeployed}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {getStatusBadge(deployment.status)}
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">实例数量</span>
                    <span className="font-medium">{deployment.instances}</span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">CPU 使用率</span>
                      <span className="font-medium">{deployment.cpu}%</span>
                    </div>
                    <Progress value={deployment.cpu} className="h-2" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">内存使用率</span>
                      <span className="font-medium">{deployment.memory}%</span>
                    </div>
                    <Progress value={deployment.memory} className="h-2" />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {deployment.status === "running" && (
                    <Button variant="outline" size="sm">
                      <Pause className="mr-1 h-3 w-3" />
                      暂停
                    </Button>
                  )}
                  {deployment.status === "stopped" && (
                    <Button variant="outline" size="sm">
                      <Play className="mr-1 h-3 w-3" />
                      启动
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    <Activity className="mr-1 h-3 w-3" />
                    监控
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
