"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Server, Activity, Clock, Database, Upload, Download } from "lucide-react"

export function ModelDeployment() {
  const [activeTab, setActiveTab] = useState("deployed")

  // 模拟部署的模型数据
  const deployedModels = [
    {
      id: "model-001",
      name: "糖尿病风险预测模型",
      version: "v2.3.0",
      status: "运行中",
      statusColor: "bg-green-500",
      deployedAt: "2024-04-15",
      accuracy: 94.2,
      requests: 12450,
      avgResponseTime: 120,
    },
    {
      id: "model-002",
      name: "心脏病预测模型",
      version: "v1.8.5",
      status: "运行中",
      statusColor: "bg-green-500",
      deployedAt: "2024-03-28",
      accuracy: 92.8,
      requests: 8760,
      avgResponseTime: 150,
    },
    {
      id: "model-003",
      name: "肺炎CT图像分析",
      version: "v3.1.2",
      status: "维护中",
      statusColor: "bg-yellow-500",
      deployedAt: "2024-04-02",
      accuracy: 96.5,
      requests: 5230,
      avgResponseTime: 320,
    },
  ]

  // 模拟待部署的模型数据
  const pendingModels = [
    {
      id: "model-004",
      name: "脑卒中风险评估模型",
      version: "v1.0.0",
      status: "待部署",
      statusColor: "bg-blue-500",
      readiness: 95,
      testAccuracy: 93.7,
    },
    {
      id: "model-005",
      name: "糖尿病风险预测模型",
      version: "v3.0.0",
      status: "测试中",
      statusColor: "bg-purple-500",
      readiness: 75,
      testAccuracy: 95.1,
    },
  ]

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-2xl">AI模型部署管理</CardTitle>
              <CardDescription>管理和监控已部署的AI模型</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                导出报告
              </Button>
              <Button size="sm">
                <Upload className="h-4 w-4 mr-2" />
                部署新模型
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="deployed" className="space-y-4" onValueChange={setActiveTab}>
            <TabsList>
              <TabsTrigger value="deployed">已部署模型</TabsTrigger>
              <TabsTrigger value="pending">待部署模型</TabsTrigger>
              <TabsTrigger value="performance">性能监控</TabsTrigger>
            </TabsList>

            <TabsContent value="deployed">
              <div className="rounded-md border">
                <div className="grid grid-cols-7 text-sm font-medium text-muted-foreground bg-muted p-4">
                  <div>模型名称</div>
                  <div>版本</div>
                  <div>状态</div>
                  <div>部署时间</div>
                  <div>准确率</div>
                  <div>请求数</div>
                  <div>操作</div>
                </div>
                {deployedModels.map((model) => (
                  <div key={model.id} className="grid grid-cols-7 items-center p-4 border-t">
                    <div className="font-medium">{model.name}</div>
                    <div>{model.version}</div>
                    <div>
                      <Badge variant="outline" className={`${model.statusColor} bg-opacity-10`}>
                        {model.status}
                      </Badge>
                    </div>
                    <div>{model.deployedAt}</div>
                    <div>{model.accuracy}%</div>
                    <div>{model.requests.toLocaleString()}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        详情
                      </Button>
                      <Button variant="outline" size="sm">
                        管理
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="pending">
              <div className="rounded-md border">
                <div className="grid grid-cols-6 text-sm font-medium text-muted-foreground bg-muted p-4">
                  <div>模型名称</div>
                  <div>版本</div>
                  <div>状态</div>
                  <div>就绪度</div>
                  <div>测试准确率</div>
                  <div>操作</div>
                </div>
                {pendingModels.map((model) => (
                  <div key={model.id} className="grid grid-cols-6 items-center p-4 border-t">
                    <div className="font-medium">{model.name}</div>
                    <div>{model.version}</div>
                    <div>
                      <Badge variant="outline" className={`${model.statusColor} bg-opacity-10`}>
                        {model.status}
                      </Badge>
                    </div>
                    <div className="w-40">
                      <div className="flex items-center gap-2">
                        <Progress value={model.readiness} className="h-2" />
                        <span className="text-sm">{model.readiness}%</span>
                      </div>
                    </div>
                    <div>{model.testAccuracy}%</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        详情
                      </Button>
                      <Button size="sm" disabled={model.readiness < 90}>
                        部署
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="performance">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Server className="h-4 w-4 text-blue-500" />
                      <CardTitle className="text-sm">系统资源使用</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>CPU使用率</span>
                          <span>42%</span>
                        </div>
                        <Progress value={42} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>内存使用率</span>
                          <span>68%</span>
                        </div>
                        <Progress value={68} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>GPU使用率</span>
                          <span>75%</span>
                        </div>
                        <Progress value={75} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <CardTitle className="text-sm">模型性能指标</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">平均响应时间</span>
                        <span className="text-sm font-medium">156ms</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">每分钟请求数</span>
                        <span className="text-sm font-medium">124</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">错误率</span>
                        <span className="text-sm font-medium text-green-500">0.02%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">可用性</span>
                        <span className="text-sm font-medium text-green-500">99.98%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <CardTitle className="text-sm">健康状态</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-500">良好</div>
                    <p className="text-xs text-muted-foreground">所有系统正常运行</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-blue-500" />
                      <CardTitle className="text-sm">运行时间</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">42天</div>
                    <p className="text-xs text-muted-foreground">上次重启: 2024-03-15</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-2">
                      <Database className="h-4 w-4 text-purple-500" />
                      <CardTitle className="text-sm">数据处理</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1.2TB</div>
                    <p className="text-xs text-muted-foreground">本月已处理数据量</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}

export default ModelDeployment
