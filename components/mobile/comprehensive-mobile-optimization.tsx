"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useMediaQuery } from "@/hooks/useMediaQuery"
import {
  Smartphone,
  Tablet,
  Monitor,
  Zap,
  ContactIcon as Touch,
  Accessibility,
  Settings,
  CheckCircle,
  RefreshCw,
  Gauge,
  HardDrive,
  Eye,
  Hand,
  Layers,
} from "lucide-react"

// 移动端设备检测和适配
const useDeviceDetection = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")
  const isTablet = useMediaQuery("(min-width: 769px) and (max-width: 1024px)")
  const isDesktop = useMediaQuery("(min-width: 1025px)")
  const isLandscape = useMediaQuery("(orientation: landscape)")
  const isPortrait = useMediaQuery("(orientation: portrait)")

  const [deviceInfo, setDeviceInfo] = useState({
    userAgent: "",
    platform: "",
    screenWidth: 0,
    screenHeight: 0,
    pixelRatio: 1,
    touchSupport: false,
    batteryLevel: 100,
    networkType: "wifi",
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDeviceInfo({
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        screenWidth: window.screen.width,
        screenHeight: window.screen.height,
        pixelRatio: window.devicePixelRatio || 1,
        touchSupport: "ontouchstart" in window,
        batteryLevel: 85, // 模拟电池电量
        networkType: "wifi", // 模拟网络类型
      })
    }
  }, [])

  return {
    isMobile,
    isTablet,
    isDesktop,
    isLandscape,
    isPortrait,
    deviceInfo,
  }
}

// 移动端性能监控
const useMobilePerformance = () => {
  const [metrics, setMetrics] = useState({
    loadTime: 0,
    renderTime: 0,
    memoryUsage: 0,
    batteryImpact: "low",
    networkUsage: 0,
    frameRate: 60,
    touchLatency: 0,
    scrollPerformance: 95,
  })

  useEffect(() => {
    const updateMetrics = () => {
      setMetrics({
        loadTime: Math.round(Math.random() * 1000 + 500),
        renderTime: Math.round(Math.random() * 50 + 10),
        memoryUsage: Math.round(Math.random() * 100 + 50),
        batteryImpact: ["low", "medium", "high"][Math.floor(Math.random() * 3)],
        networkUsage: Math.round(Math.random() * 50 + 10),
        frameRate: Math.round(Math.random() * 10 + 55),
        touchLatency: Math.round(Math.random() * 20 + 5),
        scrollPerformance: Math.round(Math.random() * 20 + 80),
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  return metrics
}

// 触摸优化配置
const TouchOptimizationPanel = () => {
  const [touchSettings, setTouchSettings] = useState({
    minTouchTarget: 44, // 最小触摸目标尺寸 (px)
    touchSensitivity: 80,
    hapticFeedback: true,
    gestureSupport: true,
    longPressDelay: 500,
    doubleTapDelay: 300,
    swipeThreshold: 50,
    pinchSensitivity: 1.2,
  })

  const [gestureStats, setGestureStats] = useState({
    taps: 0,
    longPresses: 0,
    swipes: 0,
    pinches: 0,
    scrolls: 0,
  })

  const handleSettingChange = useCallback((key: string, value: any) => {
    setTouchSettings((prev) => ({ ...prev, [key]: value }))
  }, [])

  const simulateGesture = useCallback((type: string) => {
    setGestureStats((prev) => ({
      ...prev,
      [type]: prev[type] + 1,
    }))
  }, [])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Touch className="w-5 h-5" />
            触摸交互优化
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>最小触摸目标尺寸: {touchSettings.minTouchTarget}px</Label>
              <Slider
                value={[touchSettings.minTouchTarget]}
                onValueChange={([value]) => handleSettingChange("minTouchTarget", value)}
                min={32}
                max={64}
                step={4}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>触摸灵敏度: {touchSettings.touchSensitivity}%</Label>
              <Slider
                value={[touchSettings.touchSensitivity]}
                onValueChange={([value]) => handleSettingChange("touchSensitivity", value)}
                min={50}
                max={100}
                step={5}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>长按延迟: {touchSettings.longPressDelay}ms</Label>
              <Slider
                value={[touchSettings.longPressDelay]}
                onValueChange={([value]) => handleSettingChange("longPressDelay", value)}
                min={300}
                max={1000}
                step={50}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <Label>滑动阈值: {touchSettings.swipeThreshold}px</Label>
              <Slider
                value={[touchSettings.swipeThreshold]}
                onValueChange={([value]) => handleSettingChange("swipeThreshold", value)}
                min={20}
                max={100}
                step={10}
                className="w-full"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="haptic">触觉反馈</Label>
              <Switch
                id="haptic"
                checked={touchSettings.hapticFeedback}
                onCheckedChange={(checked) => handleSettingChange("hapticFeedback", checked)}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="gesture">手势支持</Label>
              <Switch
                id="gesture"
                checked={touchSettings.gestureSupport}
                onCheckedChange={(checked) => handleSettingChange("gestureSupport", checked)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Hand className="w-5 h-5" />
            手势统计
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
            <div className="text-center">
              <Button variant="outline" size="sm" onClick={() => simulateGesture("taps")} className="w-full mb-2">
                点击测试
              </Button>
              <div className="text-lg font-bold">{gestureStats.taps}</div>
              <div className="text-xs text-muted-foreground">点击次数</div>
            </div>

            <div className="text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => simulateGesture("longPresses")}
                className="w-full mb-2"
              >
                长按测试
              </Button>
              <div className="text-lg font-bold">{gestureStats.longPresses}</div>
              <div className="text-xs text-muted-foreground">长按次数</div>
            </div>

            <div className="text-center">
              <Button variant="outline" size="sm" onClick={() => simulateGesture("swipes")} className="w-full mb-2">
                滑动测试
              </Button>
              <div className="text-lg font-bold">{gestureStats.swipes}</div>
              <div className="text-xs text-muted-foreground">滑动次数</div>
            </div>

            <div className="text-center">
              <Button variant="outline" size="sm" onClick={() => simulateGesture("pinches")} className="w-full mb-2">
                缩放测试
              </Button>
              <div className="text-lg font-bold">{gestureStats.pinches}</div>
              <div className="text-xs text-muted-foreground">缩放次数</div>
            </div>

            <div className="text-center">
              <Button variant="outline" size="sm" onClick={() => simulateGesture("scrolls")} className="w-full mb-2">
                滚动测试
              </Button>
              <div className="text-lg font-bold">{gestureStats.scrolls}</div>
              <div className="text-xs text-muted-foreground">滚动次数</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 响应式布局优化
const ResponsiveLayoutOptimizer = () => {
  const { isMobile, isTablet, isDesktop, isLandscape, deviceInfo } = useDeviceDetection()

  const [layoutSettings, setLayoutSettings] = useState({
    adaptiveLayout: true,
    fluidTypography: true,
    flexibleImages: true,
    collapsibleNavigation: true,
    stackedLayout: true,
    compactMode: false,
  })

  const [breakpoints, setBreakpoints] = useState({
    mobile: 768,
    tablet: 1024,
    desktop: 1280,
  })

  const currentDevice = useMemo(() => {
    if (isMobile) return "mobile"
    if (isTablet) return "tablet"
    return "desktop"
  }, [isMobile, isTablet])

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Monitor className="w-5 h-5" />
            设备信息
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-center mb-2">
                {isMobile && <Smartphone className="w-6 h-6 text-blue-500" />}
                {isTablet && <Tablet className="w-6 h-6 text-green-500" />}
                {isDesktop && <Monitor className="w-6 h-6 text-purple-500" />}
              </div>
              <div className="font-medium">{currentDevice}</div>
              <div className="text-xs text-muted-foreground">设备类型</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold">
                {deviceInfo.screenWidth}×{deviceInfo.screenHeight}
              </div>
              <div className="text-xs text-muted-foreground">屏幕分辨率</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold">{deviceInfo.pixelRatio}x</div>
              <div className="text-xs text-muted-foreground">像素密度</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-lg font-bold">{isLandscape ? "横屏" : "竖屏"}</div>
              <div className="text-xs text-muted-foreground">屏幕方向</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5" />
            布局优化设置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="adaptive">自适应布局</Label>
              <Switch
                id="adaptive"
                checked={layoutSettings.adaptiveLayout}
                onCheckedChange={(checked) => setLayoutSettings((prev) => ({ ...prev, adaptiveLayout: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="typography">流式排版</Label>
              <Switch
                id="typography"
                checked={layoutSettings.fluidTypography}
                onCheckedChange={(checked) => setLayoutSettings((prev) => ({ ...prev, fluidTypography: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="images">弹性图片</Label>
              <Switch
                id="images"
                checked={layoutSettings.flexibleImages}
                onCheckedChange={(checked) => setLayoutSettings((prev) => ({ ...prev, flexibleImages: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="navigation">折叠导航</Label>
              <Switch
                id="navigation"
                checked={layoutSettings.collapsibleNavigation}
                onCheckedChange={(checked) =>
                  setLayoutSettings((prev) => ({ ...prev, collapsibleNavigation: checked }))
                }
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="stacked">堆叠布局</Label>
              <Switch
                id="stacked"
                checked={layoutSettings.stackedLayout}
                onCheckedChange={(checked) => setLayoutSettings((prev) => ({ ...prev, stackedLayout: checked }))}
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="compact">紧凑模式</Label>
              <Switch
                id="compact"
                checked={layoutSettings.compactMode}
                onCheckedChange={(checked) => setLayoutSettings((prev) => ({ ...prev, compactMode: checked }))}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-medium">断点设置</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>移动端断点: {breakpoints.mobile}px</Label>
                <Slider
                  value={[breakpoints.mobile]}
                  onValueChange={([value]) => setBreakpoints((prev) => ({ ...prev, mobile: value }))}
                  min={320}
                  max={1024}
                  step={16}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>平板断点: {breakpoints.tablet}px</Label>
                <Slider
                  value={[breakpoints.tablet]}
                  onValueChange={([value]) => setBreakpoints((prev) => ({ ...prev, tablet: value }))}
                  min={768}
                  max={1440}
                  step={16}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label>桌面断点: {breakpoints.desktop}px</Label>
                <Slider
                  value={[breakpoints.desktop]}
                  onValueChange={([value]) => setBreakpoints((prev) => ({ ...prev, desktop: value }))}
                  min={1024}
                  max={1920}
                  step={16}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 移动端性能优化
const MobilePerformanceOptimizer = () => {
  const metrics = useMobilePerformance()
  const [optimizationSettings, setOptimizationSettings] = useState({
    lazyLoading: true,
    imageOptimization: true,
    codesplitting: true,
    preloading: true,
    caching: true,
    compression: true,
    batteryOptimization: true,
    networkOptimization: true,
  })

  const [optimizationProgress, setOptimizationProgress] = useState(0)
  const [isOptimizing, setIsOptimizing] = useState(false)

  const startOptimization = useCallback(async () => {
    setIsOptimizing(true)
    setOptimizationProgress(0)

    // 模拟优化过程
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setOptimizationProgress(i)
    }

    setIsOptimizing(false)
  }, [])

  const getPerformanceColor = (value: number, thresholds: { good: number; ok: number }) => {
    if (value <= thresholds.good) return "text-green-600"
    if (value <= thresholds.ok) return "text-amber-600"
    return "text-red-600"
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="w-5 h-5" />
            性能指标监控
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Zap className="w-6 h-6 mx-auto mb-2 text-yellow-500" />
              <div className={`text-lg font-bold ${getPerformanceColor(metrics.loadTime, { good: 1000, ok: 2000 })}`}>
                {metrics.loadTime}ms
              </div>
              <div className="text-xs text-muted-foreground">加载时间</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <HardDrive className="w-6 h-6 mx-auto mb-2 text-blue-500" />
              <div className={`text-lg font-bold ${getPerformanceColor(metrics.memoryUsage, { good: 100, ok: 200 })}`}>
                {metrics.memoryUsage}MB
              </div>
              <div className="text-xs text-muted-foreground">内存使用</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Eye className="w-6 h-6 mx-auto mb-2 text-green-500" />
              <div className={`text-lg font-bold ${getPerformanceColor(60 - metrics.frameRate, { good: 5, ok: 10 })}`}>
                {metrics.frameRate}FPS
              </div>
              <div className="text-xs text-muted-foreground">帧率</div>
            </div>

            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <Touch className="w-6 h-6 mx-auto mb-2 text-purple-500" />
              <div className={`text-lg font-bold ${getPerformanceColor(metrics.touchLatency, { good: 10, ok: 20 })}`}>
                {metrics.touchLatency}ms
              </div>
              <div className="text-xs text-muted-foreground">触摸延迟</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            性能优化设置
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(optimizationSettings).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between">
                <Label htmlFor={key} className="capitalize">
                  {key.replace(/([A-Z])/g, " $1").trim()}
                </Label>
                <Switch
                  id={key}
                  checked={value}
                  onCheckedChange={(checked) => setOptimizationSettings((prev) => ({ ...prev, [key]: checked }))}
                />
              </div>
            ))}
          </div>

          <div className="pt-4 border-t">
            <Button onClick={startOptimization} disabled={isOptimizing} className="w-full">
              {isOptimizing ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  优化中... {optimizationProgress}%
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-2" />
                  开始性能优化
                </>
              )}
            </Button>

            {isOptimizing && (
              <div className="mt-4">
                <Progress value={optimizationProgress} className="w-full" />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 无障碍访问优化
const AccessibilityOptimizer = () => {
  const [a11ySettings, setA11ySettings] = useState({
    screenReader: true,
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    voiceControl: false,
    keyboardNavigation: true,
    focusIndicators: true,
    colorBlindSupport: false,
  })

  const [a11yScore, setA11yScore] = useState(85)

  useEffect(() => {
    const enabledCount = Object.values(a11ySettings).filter(Boolean).length
    const totalCount = Object.keys(a11ySettings).length
    setA11yScore(Math.round((enabledCount / totalCount) * 100))
  }, [a11ySettings])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Accessibility className="w-5 h-5" />
          无障碍访问优化
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between mb-4">
          <span className="font-medium">无障碍评分</span>
          <div className="flex items-center gap-2">
            <Progress value={a11yScore} className="w-20" />
            <span className="text-sm font-bold">{a11yScore}%</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(a11ySettings).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <Label htmlFor={key} className="capitalize">
                {key.replace(/([A-Z])/g, " $1").trim()}
              </Label>
              <Switch
                id={key}
                checked={value}
                onCheckedChange={(checked) => setA11ySettings((prev) => ({ ...prev, [key]: checked }))}
              />
            </div>
          ))}
        </div>

        {a11yScore >= 80 && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-center gap-2 text-green-800">
              <CheckCircle className="w-4 h-4" />
              <span className="text-sm">无障碍访问配置良好</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// 主组件
export function ComprehensiveMobileOptimization() {
  const { isMobile, isTablet, deviceInfo } = useDeviceDetection()
  const [activeTab, setActiveTab] = useState("touch")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">移动端全面优化</h2>
          <p className="text-muted-foreground">触摸交互、响应式设计、性能优化和无障碍访问的全方位移动端体验提升</p>
        </div>
        <div className="flex items-center gap-4">
          <Badge variant={isMobile ? "default" : "outline"}>{isMobile ? "移动端" : isTablet ? "平板" : "桌面端"}</Badge>
          <Badge variant="outline">{deviceInfo.touchSupport ? "支持触摸" : "不支持触摸"}</Badge>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="touch">触摸优化</TabsTrigger>
          <TabsTrigger value="responsive">响应式设计</TabsTrigger>
          <TabsTrigger value="performance">性能优化</TabsTrigger>
          <TabsTrigger value="accessibility">无障碍访问</TabsTrigger>
        </TabsList>

        <TabsContent value="touch" className="space-y-4">
          <TouchOptimizationPanel />
        </TabsContent>

        <TabsContent value="responsive" className="space-y-4">
          <ResponsiveLayoutOptimizer />
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <MobilePerformanceOptimizer />
        </TabsContent>

        <TabsContent value="accessibility" className="space-y-4">
          <AccessibilityOptimizer />
        </TabsContent>
      </Tabs>
    </div>
  )
}
