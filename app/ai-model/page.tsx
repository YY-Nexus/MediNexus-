"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Activity, BarChart3, Settings, Download } from "lucide-react"

export default function AIModelPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        {/* 页面标题 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">AI模型管理中心</h1>
            <p className="text-muted-foreground">管理和监控AI诊断模型的性能与部署状态</p>
          </div>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            导出模型
          </Button>
        </div>

        {/* 模型状态概览 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃模型</CardTitle>
              <Brain className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">运行中</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均准确率</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96.8%</div>
              <p className="text-xs text-muted-foreground">+0.5% 较上月</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">训练任务</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">进行中</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">系统负载</CardTitle>
              <Settings className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">GPU使用率</p>
            </CardContent>
          </Card>
        </div>

        {/* 模型管理功能 */}
        <Tabs defaultValue="models" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="models">模型列表</TabsTrigger>
            <TabsTrigger value="training">训练管理</TabsTrigger>
            <TabsTrigger value="deployment">部署管理</TabsTrigger>
            <TabsTrigger value="monitoring">性能监控</TabsTrigger>
          </TabsList>

          <TabsContent value="models" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>AI模型列表</CardTitle>
                <CardDescription>管理所有AI诊断模型</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "胸部X光诊断模型", version: "v2.1", status: "运行中", accuracy: "97.2%" },
                    { name: "CT影像分析模型", version: "v1.8", status: "运行中", accuracy: "96.5%" },
                    { name: "MRI脑部诊断模型", version: "v3.0", status: "训练中", accuracy: "95.8%" },
                  ].map((model, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{model.name}</h4>
                        <p className="text-sm text-muted-foreground">版本: {model.version}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={model.status === "运行中" ? "default" : "secondary"}>{model.status}</Badge>
                        <span className="text-sm font-medium">{model.accuracy}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>模型训练</CardTitle>
                <CardDescription>管理AI模型训练任务</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">模型训练管理功能...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="deployment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>模型部署</CardTitle>
                <CardDescription>管理模型部署和版本控制</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">模型部署管理功能...</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>性能监控</CardTitle>
                <CardDescription>实时监控模型性能指标</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">性能监控仪表板...</p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
