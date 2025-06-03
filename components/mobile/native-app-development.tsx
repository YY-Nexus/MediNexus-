"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Apple,
  SmartphoneIcon as Android,
  Download,
  Upload,
  Settings,
  Code,
  CheckCircle,
  AlertCircle,
  Clock,
  Rocket,
  GitBranch,
} from "lucide-react"

// 模拟原生应用开发数据
const nativeAppProjects = [
  {
    id: "ios-app",
    name: "医枢 iOS 应用",
    platform: "iOS",
    version: "3.2.1",
    status: "production",
    buildNumber: "1247",
    lastBuild: "2025-01-24 14:30",
    size: "45.2 MB",
    downloads: 12580,
    rating: 4.8,
    features: ["生物识别", "HealthKit集成", "Siri快捷指令", "Apple Watch支持"],
  },
  {
    id: "android-app",
    name: "医枢 Android 应用",
    platform: "Android",
    version: "3.2.0",
    status: "testing",
    buildNumber: "1245",
    lastBuild: "2025-01-24 12:15",
    size: "38.7 MB",
    downloads: 8940,
    rating: 4.6,
    features: ["指纹识别", "Google Fit集成", "快捷方式", "Wear OS支持"],
  },
]

const buildPipelines = [
  {
    id: "ios-pipeline",
    name: "iOS 构建流水线",
    platform: "iOS",
    status: "success",
    duration: "8分32秒",
    steps: [
      { name: "代码检查", status: "success", duration: "1分15秒" },
      { name: "单元测试", status: "success", duration: "2分30秒" },
      { name: "UI测试", status: "success", duration: "3分45秒" },
      { name: "构建应用", status: "success", duration: "1分02秒" },
    ],
  },
  {
    id: "android-pipeline",
    name: "Android 构建流水线",
    platform: "Android",
    status: "running",
    duration: "6分18秒",
    steps: [
      { name: "代码检查", status: "success", duration: "45秒" },
      { name: "单元测试", status: "success", duration: "1分50秒" },
      { name: "UI测试", status: "running", duration: "3分43秒" },
      { name: "构建应用", status: "pending", duration: "-" },
    ],
  },
]

const appStoreMetrics = {
  ios: {
    downloads: 12580,
    activeUsers: 8940,
    retention: 78,
    crashRate: 0.02,
    rating: 4.8,
    reviews: 1247,
  },
  android: {
    downloads: 8940,
    activeUsers: 6720,
    retention: 72,
    crashRate: 0.05,
    rating: 4.6,
    reviews: 892,
  },
}

export function NativeAppDevelopment() {
  const [selectedProject, setSelectedProject] = useState(nativeAppProjects[0])
  const [buildProgress, setBuildProgress] = useState(0)
  const [isBuilding, setIsBuilding] = useState(false)

  // 模拟构建进度
  useEffect(() => {
    if (isBuilding) {
      const interval = setInterval(() => {
        setBuildProgress((prev) => {
          if (prev >= 100) {
            setIsBuilding(false)
            return 100
          }
          return prev + Math.random() * 10
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isBuilding])

  const startBuild = () => {
    setIsBuilding(true)
    setBuildProgress(0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "running":
        return <Clock className="w-4 h-4 text-blue-500 animate-spin" />
      case "pending":
        return <Clock className="w-4 h-4 text-gray-400" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "production":
        return <Badge className="bg-green-500">生产环境</Badge>
      case "testing":
        return <Badge className="bg-blue-500">测试环境</Badge>
      case "development":
        return <Badge className="bg-amber-500">开发环境</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">原生移动应用开发</h2>
          <p className="text-muted-foreground">iOS 和 Android 原生应用开发、构建和发布管理</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={startBuild} disabled={isBuilding}>
            <Rocket className="w-4 h-4 mr-2" />
            {isBuilding ? "构建中..." : "开始构建"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="projects" className="space-y-4">
        <TabsList>
          <TabsTrigger value="projects">应用项目</TabsTrigger>
          <TabsTrigger value="build">构建流水线</TabsTrigger>
          <TabsTrigger value="store">应用商店</TabsTrigger>
          <TabsTrigger value="config">配置管理</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nativeAppProjects.map((project) => (
              <Card key={project.id} className="cursor-pointer hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {project.platform === "iOS" ? (
                        <Apple className="w-5 h-5" />
                      ) : (
                        <Android className="w-5 h-5 text-green-500" />
                      )}
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                    </div>
                    {getStatusBadge(project.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">版本</div>
                      <div className="font-medium">{project.version}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">构建号</div>
                      <div className="font-medium">{project.buildNumber}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">应用大小</div>
                      <div className="font-medium">{project.size}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">下载量</div>
                      <div className="font-medium">{project.downloads.toLocaleString()}</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">核心功能</div>
                    <div className="flex flex-wrap gap-1">
                      {project.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Code className="w-4 h-4 mr-1" />
                      查看代码
                    </Button>
                    <Button size="sm" variant="outline">
                      <Download className="w-4 h-4 mr-1" />
                      下载APK
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isBuilding && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Rocket className="w-5 h-5" />
                  构建进度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>正在构建 {selectedProject.name}</span>
                    <span>{Math.round(buildProgress)}%</span>
                  </div>
                  <Progress value={buildProgress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="build" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {buildPipelines.map((pipeline) => (
              <Card key={pipeline.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <GitBranch className="w-5 h-5" />
                      {pipeline.name}
                    </CardTitle>
                    {getStatusIcon(pipeline.status)}
                  </div>
                  <p className="text-sm text-muted-foreground">耗时: {pipeline.duration}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {pipeline.steps.map((step, index) => (
                      <div key={index} className="flex items-center justify-between p-2 border rounded">
                        <div className="flex items-center gap-2">
                          {getStatusIcon(step.status)}
                          <span className="text-sm">{step.name}</span>
                        </div>
                        <span className="text-xs text-muted-foreground">{step.duration}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="store" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Apple className="w-5 h-5" />
                  App Store 数据
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {appStoreMetrics.ios.downloads.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">总下载量</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {appStoreMetrics.ios.activeUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">活跃用户</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">{appStoreMetrics.ios.retention}%</div>
                    <div className="text-sm text-muted-foreground">用户留存</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{appStoreMetrics.ios.crashRate}%</div>
                    <div className="text-sm text-muted-foreground">崩溃率</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">{appStoreMetrics.ios.rating}</span>
                    <span className="text-yellow-500">★★★★★</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{appStoreMetrics.ios.reviews} 条评价</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Android className="w-5 h-5 text-green-500" />
                  Google Play 数据
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600">
                      {appStoreMetrics.android.downloads.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">总下载量</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {appStoreMetrics.android.activeUsers.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">活跃用户</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-amber-600">{appStoreMetrics.android.retention}%</div>
                    <div className="text-sm text-muted-foreground">用户留存</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{appStoreMetrics.android.crashRate}%</div>
                    <div className="text-sm text-muted-foreground">崩溃率</div>
                  </div>
                </div>
                <div className="flex items-center justify-between pt-2 border-t">
                  <div className="flex items-center gap-1">
                    <span className="text-lg font-bold">{appStoreMetrics.android.rating}</span>
                    <span className="text-yellow-500">★★★★☆</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{appStoreMetrics.android.reviews} 条评价</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>应用配置管理</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="app-name">应用名称</Label>
                  <Input id="app-name" placeholder="医枢智能诊疗系统" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bundle-id">Bundle ID</Label>
                  <Input id="bundle-id" placeholder="com.yanyu.medinexus" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="version">版本号</Label>
                  <Input id="version" placeholder="3.2.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="build-number">构建号</Label>
                  <Input id="build-number" placeholder="1247" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="target-sdk">目标SDK版本</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择SDK版本" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ios17">iOS 17</SelectItem>
                      <SelectItem value="ios16">iOS 16</SelectItem>
                      <SelectItem value="android14">Android 14</SelectItem>
                      <SelectItem value="android13">Android 13</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="min-sdk">最低SDK版本</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="选择最低SDK版本" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ios15">iOS 15</SelectItem>
                      <SelectItem value="ios14">iOS 14</SelectItem>
                      <SelectItem value="android11">Android 11</SelectItem>
                      <SelectItem value="android10">Android 10</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button>
                  <Settings className="w-4 h-4 mr-2" />
                  保存配置
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  导入配置
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  导出配置
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
