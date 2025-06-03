"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import {
  Zap,
  Battery,
  Wifi,
  Monitor,
  Gauge,
  HardDrive,
  ContactIcon as Touch,
  Accessibility,
  Settings,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  RotateCcw,
} from "lucide-react"

// 模拟性能数据
const performanceMetrics = {
  appStartTime: 1.2, // 秒
  memoryUsage: 156.8, // MB
  cpuUsage: 23.5, // %
  batteryImpact: "低",
  networkUsage: 45.2, // MB/day
  frameRate: 58.7, // FPS
  crashRate: 0.02, // %
  anrRate: 0.01, // %
}

const optimizationFeatures = [
  {
    id: "lazy-loading",
    name: "懒加载",
    description: "按需加载图片和组件",
    enabled: true,
    impact: "高",
    savings: "35% 内存节省",
    category: "performance",
  },
  {
    id: "image-compression",
    name: "图片压缩",
    description: "自动压缩和优化图片",
    enabled: true,
    impact: "高",
    savings: "60% 流量节省",
    category: "network",
  },
  {
    id: "cache-optimization",
    name: "缓存优化",
    description: "智能缓存策略",
    enabled: true,
    impact: "中",
    savings: "40% 加载时间减少",
    category: "performance",
  },
  {
    id: "background-sync",
    name: "后台同步",
    description: "优化后台数据同步",
    enabled: false,
    impact: "中",
    savings: "20% 电池节省",
    category: "battery",
  },
  {
    id: "adaptive-quality",
    name: "自适应质量",
    description: "根据网络状况调整质量",
    enabled: true,
    impact: "中",
    savings: "30% 流量节省",
    category: "network",
  },
  {
    id: "preloading",
    name: "预加载",
    description: "预加载关键资源",
    enabled: true,
    impact: "高",
    savings: "50% 响应时间减少",
    category: "performance",
  },
]

const responsiveBreakpoints = [
  { name: "手机竖屏", width: 375, height: 812, active: true },
  { name: "手机横屏", width: 812, height: 375, active: true },
  { name: "平板竖屏", width: 768, height: 1024, active: true },
  { name: "平板横屏", width: 1024, height: 768, active: true },
  { name: "小屏手机", width: 320, height: 568, active: false },
  { name: "大屏手机", width: 414, height: 896, active: true },
]

const touchOptimizations = [
  {
    id: "touch-targets",
    name: "触摸目标大小",
    description: "确保触摸目标至少44x44px",
    status: "optimized",
    score: 95,
  },
  {
    id: "gesture-support",
    name: "手势支持",
    description: "支持滑动、捏合等手势",
    status: "optimized",
    score: 88,
  },
  {
    id: "haptic-feedback",
    name: "触觉反馈",
    description: "提供适当的触觉反馈",
    status: "partial",
    score: 72,
  },
  {
    id: "scroll-performance",
    name: "滚动性能",
    description: "优化滚动流畅度",
    status: "optimized",
    score: 91,
  },
]

const accessibilityFeatures = [
  {
    id: "voice-over",
    name: "VoiceOver支持",
    description: "屏幕阅读器支持",
    enabled: true,
    coverage: 92,
  },
  {
    id: "dynamic-type",
    name: "动态字体",
    description: "支持系统字体大小调整",
    enabled: true,
    coverage: 88,
  },
  {
    id: "high-contrast",
    name: "高对比度",
    description: "高对比度模式支持",
    enabled: true,
    coverage: 85,
  },
  {
    id: "reduce-motion",
    name: "减少动画",
    description: "尊重减少动画偏好",
    enabled: false,
    coverage: 0,
  },
]

export function MobileOptimization() {
  const [selectedBreakpoint, setSelectedBreakpoint] = useState(responsiveBreakpoints[0])
  const [optimizationScore, setOptimizationScore] = useState(87)

  const getImpactBadge = (impact: string) => {
    switch (impact) {
      case "高":
        return <Badge className="bg-green-500">高影响</Badge>
      case "中":
        return <Badge className="bg-amber-500">中影响</Badge>
      case "低":
        return <Badge variant="outline">低影响</Badge>
      default:
        return <Badge variant="outline">{impact}</Badge>
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "optimized":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "partial":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />
      case "needs-work":
        return <AlertTriangle className="w-4 h-4 text-red-500" />
      default:
        return <CheckCircle className="w-4 h-4 text-gray-400" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "performance":
        return <Zap className="w-4 h-4" />
      case "network":
        return <Wifi className="w-4 h-4" />
      case "battery":
        return <Battery className="w-4 h-4" />
      default:
        return <Settings className="w-4 h-4" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">移动端优化</h2>
          <p className="text-muted-foreground">性能优化、响应式设计和用户体验提升</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{optimizationScore}</div>
            <div className="text-sm text-muted-foreground">优化评分</div>
          </div>
        </div>
      </div>

      {/* 性能概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">启动时间</p>
                <p className="text-2xl font-bold">{performanceMetrics.appStartTime}s</p>
              </div>
              <Zap className="w-8 h-8 text-blue-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">比上周快15%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">内存使用</p>
                <p className="text-2xl font-bold">{performanceMetrics.memoryUsage}MB</p>
              </div>
              <HardDrive className="w-8 h-8 text-green-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">减少8%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">帧率</p>
                <p className="text-2xl font-bold">{performanceMetrics.frameRate}FPS</p>
              </div>
              <Gauge className="w-8 h-8 text-amber-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">提升3%</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">崩溃率</p>
                <p className="text-2xl font-bold">{performanceMetrics.crashRate}%</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-500" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm text-green-600">降低0.01%</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="performance" className="space-y-4">
        <TabsList>
          <TabsTrigger value="performance">性能优化</TabsTrigger>
          <TabsTrigger value="responsive">响应式设计</TabsTrigger>
          <TabsTrigger value="touch">触摸优化</TabsTrigger>
          <TabsTrigger value="accessibility">无障碍访问</TabsTrigger>
          <TabsTrigger value="settings">优化设置</TabsTrigger>
        </TabsList>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {optimizationFeatures.map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(feature.category)}
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      <Switch checked={feature.enabled} onCheckedChange={() => {}} />
                      {getImpactBadge(feature.impact)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">优化效果</span>
                    <span className="text-sm text-green-600">{feature.savings}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="responsive" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>响应式断点</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {responsiveBreakpoints.map((breakpoint, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedBreakpoint === breakpoint ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedBreakpoint(breakpoint)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{breakpoint.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {breakpoint.width} × {breakpoint.height}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={breakpoint.active} onCheckedChange={() => {}} />
                          {selectedBreakpoint === breakpoint && <Monitor className="w-4 h-4 text-blue-500" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>预览 - {selectedBreakpoint.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <div
                    className="border-2 border-gray-300 rounded-lg bg-white shadow-lg relative overflow-hidden"
                    style={{
                      width: Math.min(selectedBreakpoint.width * 0.3, 200),
                      height: Math.min(selectedBreakpoint.height * 0.3, 300),
                    }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 p-2">
                      <div className="bg-white rounded p-2 mb-2 text-xs">
                        <div className="h-2 bg-blue-200 rounded mb-1"></div>
                        <div className="h-1 bg-gray-200 rounded"></div>
                      </div>
                      <div className="grid grid-cols-2 gap-1">
                        <div className="bg-white rounded p-1">
                          <div className="h-1 bg-green-200 rounded"></div>
                        </div>
                        <div className="bg-white rounded p-1">
                          <div className="h-1 bg-amber-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                  {selectedBreakpoint.width} × {selectedBreakpoint.height} 像素
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="touch" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {touchOptimizations.map((optimization) => (
              <Card key={optimization.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Touch className="w-5 h-5" />
                      <CardTitle className="text-lg">{optimization.name}</CardTitle>
                    </div>
                    {getStatusIcon(optimization.status)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{optimization.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>优化评分</span>
                      <span className="font-medium">{optimization.score}/100</span>
                    </div>
                    <Progress value={optimization.score} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {accessibilityFeatures.map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Accessibility className="w-5 h-5" />
                      <CardTitle className="text-lg">{feature.name}</CardTitle>
                    </div>
                    <Switch checked={feature.enabled} onCheckedChange={() => {}} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>覆盖率</span>
                      <span className="font-medium">{feature.coverage}%</span>
                    </div>
                    <Progress value={feature.coverage} className="w-full" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>优化设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image-quality">图片质量</Label>
                  <div className="mt-2">
                    <Slider id="image-quality" min={50} max={100} step={5} defaultValue={[85]} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>低质量</span>
                      <span>高质量</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="cache-size">缓存大小限制</Label>
                  <div className="mt-2">
                    <Slider id="cache-size" min={100} max={1000} step={50} defaultValue={[500]} className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>100MB</span>
                      <span>1GB</span>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="animation-duration">动画持续时间</Label>
                  <div className="mt-2">
                    <Slider
                      id="animation-duration"
                      min={100}
                      max={1000}
                      step={50}
                      defaultValue={[300]}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>100ms</span>
                      <span>1000ms</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-optimize">自动优化</Label>
                    <p className="text-sm text-muted-foreground">根据设备性能自动调整设置</p>
                  </div>
                  <Switch id="auto-optimize" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="battery-saver">省电模式</Label>
                    <p className="text-sm text-muted-foreground">在低电量时减少动画和后台活动</p>
                  </div>
                  <Switch id="battery-saver" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="data-saver">流量节省</Label>
                    <p className="text-sm text-muted-foreground">在移动网络下降低图片质量</p>
                  </div>
                  <Switch id="data-saver" defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    保存设置
                  </Button>
                  <Button variant="outline">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    重置为默认
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
