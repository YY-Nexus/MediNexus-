"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Cpu,
  Smartphone,
  Monitor,
  Wifi,
  WifiOff,
  Zap,
  HardDrive,
  Activity,
  CheckCircle,
  AlertTriangle,
  Download,
  Upload,
  Settings,
  BarChart3,
  Server,
} from "lucide-react"

interface EdgeDevice {
  id: string
  name: string
  type: "mobile" | "tablet" | "workstation" | "server"
  status: "online" | "offline" | "deploying" | "error"
  cpu: string
  memory: string
  storage: string
  os: string
  modelVersion: string
  lastSync: string
  performance: {
    latency: number
    throughput: number
    accuracy: number
    powerConsumption: number
  }
}

interface DeploymentModel {
  id: string
  name: string
  size: string
  accuracy: number
  latency: number
  supportedDevices: string[]
  compressionRatio: number
  quantization: "int8" | "int16" | "fp16" | "fp32"
}

export function EdgeComputingDeployment() {
  const [selectedDevice, setSelectedDevice] = useState("workstation-01")
  const [selectedModel, setSelectedModel] = useState("lightweight-v2")
  const [deploymentProgress, setDeploymentProgress] = useState(0)
  const [isDeploying, setIsDeploying] = useState(false)
  const [offlineMode, setOfflineMode] = useState(false)

  // 边缘设备列表
  const edgeDevices: EdgeDevice[] = [
    {
      id: "workstation-01",
      name: "医生工作站-01",
      type: "workstation",
      status: "online",
      cpu: "Intel i7-12700K",
      memory: "32GB DDR4",
      storage: "1TB NVMe SSD",
      os: "Windows 11",
      modelVersion: "v2.1.0",
      lastSync: "2024-01-15 14:30",
      performance: {
        latency: 0.8,
        throughput: 45,
        accuracy: 0.94,
        powerConsumption: 150,
      },
    },
    {
      id: "tablet-02",
      name: "移动平板-02",
      type: "tablet",
      status: "online",
      cpu: "Apple M2",
      memory: "16GB",
      storage: "512GB",
      os: "iPadOS 17",
      modelVersion: "v1.8.0",
      lastSync: "2024-01-15 14:25",
      performance: {
        latency: 1.2,
        throughput: 25,
        accuracy: 0.89,
        powerConsumption: 15,
      },
    },
    {
      id: "mobile-03",
      name: "医护手机-03",
      type: "mobile",
      status: "offline",
      cpu: "Snapdragon 8 Gen 2",
      memory: "12GB",
      storage: "256GB",
      os: "Android 14",
      modelVersion: "v1.5.0",
      lastSync: "2024-01-15 12:15",
      performance: {
        latency: 2.1,
        throughput: 12,
        accuracy: 0.85,
        powerConsumption: 8,
      },
    },
    {
      id: "server-04",
      name: "边缘服务器-04",
      type: "server",
      status: "deploying",
      cpu: "NVIDIA A100",
      memory: "128GB",
      storage: "4TB NVMe",
      os: "Ubuntu 22.04",
      modelVersion: "v3.0.0-beta",
      lastSync: "2024-01-15 14:35",
      performance: {
        latency: 0.3,
        throughput: 120,
        accuracy: 0.97,
        powerConsumption: 400,
      },
    },
  ]

  // 部署模型
  const deploymentModels: DeploymentModel[] = [
    {
      id: "full-model",
      name: "完整模型",
      size: "2.8GB",
      accuracy: 0.96,
      latency: 1.2,
      supportedDevices: ["workstation", "server"],
      compressionRatio: 1.0,
      quantization: "fp32",
    },
    {
      id: "lightweight-v2",
      name: "轻量级模型 v2",
      size: "850MB",
      accuracy: 0.91,
      latency: 0.8,
      supportedDevices: ["workstation", "tablet", "server"],
      compressionRatio: 3.3,
      quantization: "fp16",
    },
    {
      id: "mobile-optimized",
      name: "移动优化模型",
      size: "320MB",
      accuracy: 0.87,
      latency: 1.5,
      supportedDevices: ["mobile", "tablet"],
      compressionRatio: 8.8,
      quantization: "int8",
    },
    {
      id: "ultra-lite",
      name: "超轻量模型",
      size: "120MB",
      accuracy: 0.82,
      latency: 0.6,
      supportedDevices: ["mobile", "tablet", "workstation"],
      compressionRatio: 23.3,
      quantization: "int8",
    },
  ]

  // 开始部署
  const startDeployment = () => {
    setIsDeploying(true)
    setDeploymentProgress(0)

    const interval = setInterval(() => {
      setDeploymentProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsDeploying(false)
          return 100
        }
        return prev + 8
      })
    }, 400)
  }

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "mobile":
        return <Smartphone className="h-5 w-5 text-green-500" />
      case "tablet":
        return <Monitor className="h-5 w-5 text-blue-500" />
      case "workstation":
        return <Monitor className="h-5 w-5 text-purple-500" />
      case "server":
        return <Server className="h-5 w-5 text-red-500" />
      default:
        return <Cpu className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "offline":
        return <WifiOff className="h-4 w-4 text-red-500" />
      case "deploying":
        return <Activity className="h-4 w-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertTriangle className="h-4 w-4 text-red-500" />
      default:
        return <Activity className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-100 text-green-800"
      case "offline":
        return "bg-red-100 text-red-800"
      case "deploying":
        return "bg-blue-100 text-blue-800"
      case "error":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-blue-600" />
            边缘计算部署支持
          </CardTitle>
          <CardDescription>在各种边缘设备上部署AI诊断模型，支持离线诊断和实时推理</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="device-management">
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="device-management">设备管理</TabsTrigger>
              <TabsTrigger value="model-deployment">模型部署</TabsTrigger>
              <TabsTrigger value="performance-monitoring">性能监控</TabsTrigger>
              <TabsTrigger value="offline-support">离线支持</TabsTrigger>
            </TabsList>

            <TabsContent value="device-management" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {edgeDevices.map((device) => (
                  <Card key={device.id} className="border-l-4 border-l-blue-500">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getDeviceIcon(device.type)}
                          <h3 className="font-medium">{device.name}</h3>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(device.status)}
                          <Badge className={getStatusColor(device.status)}>
                            {device.status === "online"
                              ? "在线"
                              : device.status === "offline"
                                ? "离线"
                                : device.status === "deploying"
                                  ? "部署中"
                                  : "错误"}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-600">CPU:</span>
                          <div className="font-medium truncate">{device.cpu}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">内存:</span>
                          <div className="font-medium">{device.memory}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">存储:</span>
                          <div className="font-medium">{device.storage}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">系统:</span>
                          <div className="font-medium">{device.os}</div>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">模型版本:</span>
                          <span className="font-medium">{device.modelVersion}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">最后同步:</span>
                          <span className="font-medium">{device.lastSync}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-center">
                        <div className="p-2 bg-blue-50 rounded">
                          <div className="text-lg font-bold text-blue-600">{device.performance.latency}s</div>
                          <div className="text-xs text-gray-600">延迟</div>
                        </div>
                        <div className="p-2 bg-green-50 rounded">
                          <div className="text-lg font-bold text-green-600">
                            {(device.performance.accuracy * 100).toFixed(1)}%
                          </div>
                          <div className="text-xs text-gray-600">准确率</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Settings className="h-4 w-4 mr-1" />
                          配置
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <Activity className="h-4 w-4 mr-1" />
                          监控
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">设备统计概览</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">3</div>
                      <div className="text-sm text-gray-600">在线设备</div>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <div className="text-2xl font-bold text-red-600">1</div>
                      <div className="text-sm text-gray-600">离线设备</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">92.5%</div>
                      <div className="text-sm text-gray-600">平均准确率</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">1.1s</div>
                      <div className="text-sm text-gray-600">平均延迟</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="model-deployment" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">部署配置</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>目标设备</Label>
                      <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择设备" />
                        </SelectTrigger>
                        <SelectContent>
                          {edgeDevices.map((device) => (
                            <SelectItem key={device.id} value={device.id}>
                              {device.name} ({device.type})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>部署模型</Label>
                      <Select value={selectedModel} onValueChange={setSelectedModel}>
                        <SelectTrigger>
                          <SelectValue placeholder="选择模型" />
                        </SelectTrigger>
                        <SelectContent>
                          {deploymentModels.map((model) => (
                            <SelectItem key={model.id} value={model.id}>
                              {model.name} ({model.size})
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {deploymentModels
                      .filter((model) => model.id === selectedModel)
                      .map((model) => (
                        <div key={model.id} className="space-y-3 p-4 bg-gray-50 rounded-lg">
                          <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-gray-600">模型大小:</span>
                              <div className="font-medium">{model.size}</div>
                            </div>
                            <div>
                              <span className="text-gray-600">准确率:</span>
                              <div className="font-medium">{(model.accuracy * 100).toFixed(1)}%</div>
                            </div>
                            <div>
                              <span className="text-gray-600">延迟:</span>
                              <div className="font-medium">{model.latency}s</div>
                            </div>
                            <div>
                              <span className="text-gray-600">量化:</span>
                              <div className="font-medium">{model.quantization}</div>
                            </div>
                          </div>
                          <div>
                            <span className="text-gray-600 text-sm">压缩比:</span>
                            <div className="font-medium">{model.compressionRatio}x</div>
                          </div>
                        </div>
                      ))}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="auto-update">自动更新</Label>
                        <Switch id="auto-update" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="backup-model">保留备份</Label>
                        <Switch id="backup-model" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="rollback-enabled">支持回滚</Label>
                        <Switch id="rollback-enabled" defaultChecked />
                      </div>
                    </div>

                    <Button onClick={startDeployment} disabled={isDeploying} className="w-full flex items-center gap-2">
                      {isDeploying ? (
                        <>
                          <Download className="h-4 w-4 animate-bounce" />
                          部署中...
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4" />
                          开始部署
                        </>
                      )}
                    </Button>

                    {isDeploying && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>部署进度</span>
                          <span>{deploymentProgress}%</span>
                        </div>
                        <Progress value={deploymentProgress} className="h-2" />
                        <div className="text-xs text-gray-600 text-center">
                          {deploymentProgress < 30
                            ? "下载模型文件..."
                            : deploymentProgress < 60
                              ? "优化模型..."
                              : deploymentProgress < 90
                                ? "安装到设备..."
                                : "验证部署..."}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">兼容性检查</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {edgeDevices
                      .filter((device) => device.id === selectedDevice)
                      .map((device) => {
                        const selectedModelData = deploymentModels.find((m) => m.id === selectedModel)
                        const isCompatible = selectedModelData?.supportedDevices.includes(device.type)

                        return (
                          <div key={device.id} className="space-y-3">
                            <Alert
                              className={isCompatible ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}
                            >
                              <div className="flex items-center gap-2">
                                {isCompatible ? (
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                ) : (
                                  <AlertTriangle className="h-4 w-4 text-red-600" />
                                )}
                                <AlertDescription className={isCompatible ? "text-green-800" : "text-red-800"}>
                                  {isCompatible ? "设备与模型兼容" : "设备与模型不兼容"}
                                </AlertDescription>
                              </div>
                            </Alert>

                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">CPU兼容性:</span>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  ✓ 支持
                                </Badge>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">内存需求:</span>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  ✓ 充足
                                </Badge>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">存储空间:</span>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  ✓ 可用
                                </Badge>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">操作系统:</span>
                                <Badge variant="secondary" className="bg-green-100 text-green-800">
                                  ✓ 支持
                                </Badge>
                              </div>
                            </div>

                            <div className="p-3 bg-blue-50 rounded-lg">
                              <h4 className="font-medium text-blue-800 mb-2">预期性能</h4>
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-blue-600">预计延迟:</span>
                                  <div className="font-medium">{selectedModelData?.latency}s</div>
                                </div>
                                <div>
                                  <span className="text-blue-600">预计准确率:</span>
                                  <div className="font-medium">
                                    {(selectedModelData?.accuracy || 0 * 100).toFixed(1)}%
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )
                      })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance-monitoring" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      实时性能指标
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">CPU使用率</span>
                        <span className="text-sm font-medium">65%</span>
                      </div>
                      <Progress value={65} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">内存使用率</span>
                        <span className="text-sm font-medium">42%</span>
                      </div>
                      <Progress value={42} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">GPU使用率</span>
                        <span className="text-sm font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">网络延迟</span>
                        <span className="text-sm font-medium">12ms</span>
                      </div>
                      <Progress value={12} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">156</div>
                        <div className="text-xs text-gray-600">每分钟推理次数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">99.2%</div>
                        <div className="text-xs text-gray-600">系统可用性</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Zap className="h-5 w-5" />
                      能耗监控
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      {edgeDevices
                        .filter((d) => d.status === "online")
                        .map((device) => (
                          <div key={device.id} className="p-3 border rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium">{device.name}</span>
                              <Badge variant="outline">{device.performance.powerConsumption}W</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span className="text-gray-600">功耗效率:</span>
                                <span className="font-medium">
                                  {(device.performance.throughput / device.performance.powerConsumption).toFixed(2)}{" "}
                                  推理/W
                                </span>
                              </div>
                              <Progress value={(device.performance.powerConsumption / 400) * 100} className="h-1" />
                            </div>
                          </div>
                        ))}
                    </div>

                    <div className="p-4 bg-green-50 rounded-lg">
                      <h4 className="font-medium text-green-800 mb-2">节能建议</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• 在低负载时段启用节能模式</li>
                        <li>• 优化模型量化以降低功耗</li>
                        <li>• 使用动态频率调节</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">性能趋势分析</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">0.9s</div>
                      <div className="text-sm text-gray-600">平均推理时间</div>
                      <div className="text-xs text-green-600">↓ 15% 本周</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">94.2%</div>
                      <div className="text-sm text-gray-600">平均准确率</div>
                      <div className="text-xs text-green-600">↑ 2.1% 本周</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">1,247</div>
                      <div className="text-sm text-gray-600">日推理次数</div>
                      <div className="text-xs text-green-600">↑ 8% 本周</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">185W</div>
                      <div className="text-sm text-gray-600">平均功耗</div>
                      <div className="text-xs text-green-600">↓ 5% 本周</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offline-support" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <WifiOff className="h-5 w-5" />
                      离线模式配置
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="offline-mode">启用离线模式</Label>
                      <Switch id="offline-mode" checked={offlineMode} onCheckedChange={setOfflineMode} />
                    </div>

                    {offlineMode && (
                      <Alert className="border-blue-200 bg-blue-50">
                        <Wifi className="h-4 w-4 text-blue-600" />
                        <AlertDescription className="text-blue-800">
                          离线模式已启用。设备将使用本地模型进行推理，无需网络连接。
                        </AlertDescription>
                      </Alert>
                    )}

                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="cache-results">缓存推理结果</Label>
                        <Switch id="cache-results" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="sync-when-online">联网时同步</Label>
                        <Switch id="sync-when-online" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="compress-data">数据压缩</Label>
                        <Switch id="compress-data" defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label htmlFor="priority-sync">优先级同步</Label>
                        <Switch id="priority-sync" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>离线存储策略</Label>
                      <Select defaultValue="intelligent">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="minimal">最小存储</SelectItem>
                          <SelectItem value="standard">标准存储</SelectItem>
                          <SelectItem value="intelligent">智能存储</SelectItem>
                          <SelectItem value="maximum">最大存储</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2">
                      <HardDrive className="h-5 w-5" />
                      本地存储状态
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">模型文件</span>
                        <span className="text-sm font-medium">2.1GB / 4GB</span>
                      </div>
                      <Progress value={52.5} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">缓存数据</span>
                        <span className="text-sm font-medium">850MB / 2GB</span>
                      </div>
                      <Progress value={42.5} className="h-2" />
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">离线结果</span>
                        <span className="text-sm font-medium">320MB / 1GB</span>
                      </div>
                      <Progress value={32} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-2">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-blue-600">156</div>
                        <div className="text-xs text-gray-600">离线推理次数</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-600">98.5%</div>
                        <div className="text-xs text-gray-600">离线准确率</div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Upload className="h-4 w-4 mr-1" />
                        同步数据
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <HardDrive className="h-4 w-4 mr-1" />
                        清理缓存
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">离线诊断记录</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {[
                      { id: 1, time: "14:30", patient: "患者-001", type: "CT扫描", status: "已缓存", confidence: 0.94 },
                      { id: 2, time: "14:25", patient: "患者-002", type: "X光片", status: "已同步", confidence: 0.89 },
                      {
                        id: 3,
                        time: "14:20",
                        patient: "患者-003",
                        type: "MRI扫描",
                        status: "待同步",
                        confidence: 0.92,
                      },
                      { id: 4, time: "14:15", patient: "患者-004", type: "超声波", status: "已缓存", confidence: 0.87 },
                    ].map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="text-sm text-gray-600">{record.time}</div>
                          <div className="font-medium">{record.patient}</div>
                          <Badge variant="outline">{record.type}</Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge
                            className={
                              record.status === "已同步"
                                ? "bg-green-100 text-green-800"
                                : record.status === "待同步"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-blue-100 text-blue-800"
                            }
                          >
                            {record.status}
                          </Badge>
                          <div className="text-sm font-medium">{(record.confidence * 100).toFixed(1)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
