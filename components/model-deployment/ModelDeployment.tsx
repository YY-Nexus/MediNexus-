"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Server, Globe, Activity, Clock, CheckCircle, AlertCircle, Settings, RefreshCw } from "lucide-react"

export function ModelDeployment() {
  const [activeTab, setActiveTab] = useState("environments")

  // 模拟部署环境数据
  const environments = [
    { id: "env-1", name: "开发环境", status: "active", version: "2.3.0", lastDeployed: "2023-11-10" },
    { id: "env-2", name: "测试环境", status: "active", version: "2.3.0", lastDeployed: "2023-11-12" },
    { id: "env-3", name: "预生产环境", status: "maintenance", version: "2.2.1", lastDeployed: "2023-10-20" },
    { id: "env-4", name: "生产环境", status: "active", version: "2.2.1", lastDeployed: "2023-10-25" },
  ]

  // 模拟部署历史
  const deploymentHistory = [
    { id: "dep-1", environment: "生产环境", version: "2.2.1", date: "2023-10-25", status: "success", user: "张医生" },
    {
      id: "dep-2",
      environment: "预生产环境",
      version: "2.2.1",
      date: "2023-10-20",
      status: "success",
      user: "李工程师",
    },
    { id: "dep-3", environment: "生产环境", version: "2.1.0", date: "2023-09-15", status: "success", user: "张医生" },
    { id: "dep-4", environment: "生产环境", version: "2.0.5", date: "2023-08-10", status: "failed", user: "王管理员" },
  ]

  // 获取状态徽章
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
      case "success":
        return (
          <Badge variant="success" className="flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> {status === "active" ? "活跃" : "成功"}
          </Badge>
        )
      case "maintenance":
        return (
          <Badge variant="warning" className="flex items-center gap-1">
            <Settings className="h-3 w-3" /> 维护中
          </Badge>
        )
      case "failed":
        return (
          <Badge variant="destructive" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" /> 失败
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>模型部署管理</CardTitle>
        <CardDescription>管理AI诊断模型在各环境中的部署</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-4">
            <TabsTrigger value="environments" className="flex items-center gap-1">
              <Server className="h-4 w-4" />
              部署环境
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              部署历史
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="flex items-center gap-1">
              <Activity className="h-4 w-4" />
              部署监控
            </TabsTrigger>
          </TabsList>

          <TabsContent value="environments" className="space-y-4">
            {environments.map((env) => (
              <Card key={env.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-medical-600" />
                      <h3 className="font-medium">{env.name}</h3>
                      {getStatusBadge(env.status)}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-500">当前版本:</span>
                      <Badge variant="outline">{env.version}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-gray-500" />
                      <span className="text-gray-500">上次部署: {env.lastDeployed}</span>
                    </div>
                  </div>
                </CardContent>
                <div className="px-6 pb-4 flex justify-end">
                  <Button variant="outline" size="sm" className="mr-2">
                    <RefreshCw className="h-3.5 w-3.5 mr-1" />
                    重新部署
                  </Button>
                  <Button size="sm" className="bg-medical-600 hover:bg-medical-700">
                    <Globe className="h-3.5 w-3.5 mr-1" />
                    部署新版本
                  </Button>
                </div>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="history">
            <div className="rounded-md border">
              <div className="grid grid-cols-5 bg-slate-50 p-3 text-sm font-medium">
                <div>环境</div>
                <div>版本</div>
                <div>部署日期</div>
                <div>状态</div>
                <div>操作人</div>
              </div>
              <div className="divide-y">
                {deploymentHistory.map((deployment) => (
                  <div key={deployment.id} className="grid grid-cols-5 p-3 text-sm">
                    <div>{deployment.environment}</div>
                    <div>{deployment.version}</div>
                    <div>{deployment.date}</div>
                    <div>{getStatusBadge(deployment.status)}</div>
                    <div>{deployment.user}</div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="monitoring">
            <div className="h-80 bg-gray-100 rounded-md flex items-center justify-center">
              <div className="text-center">
                <Activity className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">部署监控数据将在此处显示</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
