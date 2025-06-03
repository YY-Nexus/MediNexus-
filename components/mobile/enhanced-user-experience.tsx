"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Accessibility,
  HandIcon as Gesture,
  Wifi,
  WifiOff,
  Download,
  Upload,
  CheckCircle,
  AlertTriangle,
} from "lucide-react"

// 移动端手势支持组件
export const MobileGestureSupport = () => {
  const [gestureSettings, setGestureSettings] = useState({
    swipeNavigation: true,
    pinchZoom: true,
    doubleTapZoom: true,
    longPressMenu: true,
    hapticFeedback: true,
  })

  const [gestureStats, setGestureStats] = useState({
    swipeCount: 0,
    pinchCount: 0,
    tapCount: 0,
    longPressCount: 0,
  })

  const handleGestureToggle = useCallback((setting) => {
    setGestureSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }))
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Gesture className="w-5 h-5" />
          手势控制设置
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 gap-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">滑动导航</div>
              <div className="text-sm text-muted-foreground">左右滑动切换页面</div>
            </div>
            <Switch
              checked={gestureSettings.swipeNavigation}
              onCheckedChange={() => handleGestureToggle("swipeNavigation")}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">捏合缩放</div>
              <div className="text-sm text-muted-foreground">双指缩放图片和图表</div>
            </div>
            <Switch checked={gestureSettings.pinchZoom} onCheckedChange={() => handleGestureToggle("pinchZoom")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">双击缩放</div>
              <div className="text-sm text-muted-foreground">双击快速缩放</div>
            </div>
            <Switch
              checked={gestureSettings.doubleTapZoom}
              onCheckedChange={() => handleGestureToggle("doubleTapZoom")}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">长按菜单</div>
              <div className="text-sm text-muted-foreground">长按显示快捷菜单</div>
            </div>
            <Switch
              checked={gestureSettings.longPressMenu}
              onCheckedChange={() => handleGestureToggle("longPressMenu")}
            />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">触觉反馈</div>
              <div className="text-sm text-muted-foreground">操作时的震动反馈</div>
            </div>
            <Switch
              checked={gestureSettings.hapticFeedback}
              onCheckedChange={() => handleGestureToggle("hapticFeedback")}
            />
          </div>
        </div>

        <div className="pt-4 border-t">
          <h4 className="font-medium mb-3">手势使用统计</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-2 bg-blue-50 rounded">
              <div className="text-lg font-bold text-blue-600">{gestureStats.swipeCount}</div>
              <div className="text-xs text-muted-foreground">滑动次数</div>
            </div>
            <div className="text-center p-2 bg-green-50 rounded">
              <div className="text-lg font-bold text-green-600">{gestureStats.pinchCount}</div>
              <div className="text-xs text-muted-foreground">缩放次数</div>
            </div>
            <div className="text-center p-2 bg-purple-50 rounded">
              <div className="text-lg font-bold text-purple-600">{gestureStats.tapCount}</div>
              <div className="text-xs text-muted-foreground">点击次数</div>
            </div>
            <div className="text-center p-2 bg-orange-50 rounded">
              <div className="text-lg font-bold text-orange-600">{gestureStats.longPressCount}</div>
              <div className="text-xs text-muted-foreground">长按次数</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 离线支持和数据同步
export const OfflineSupport = () => {
  const [isOnline, setIsOnline] = useState(true)
  const [syncStatus, setSyncStatus] = useState({
    lastSync: new Date().toLocaleString(),
    pendingUploads: 3,
    cachedData: 156,
    syncInProgress: false,
  })

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleSync = useCallback(async () => {
    setSyncStatus((prev) => ({ ...prev, syncInProgress: true }))

    // 模拟同步过程
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setSyncStatus((prev) => ({
      ...prev,
      syncInProgress: false,
      lastSync: new Date().toLocaleString(),
      pendingUploads: 0,
    }))
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {isOnline ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
          离线支持
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div>
            <div className="font-medium">网络状态</div>
            <div className="text-sm text-muted-foreground">{isOnline ? "已连接" : "离线模式"}</div>
          </div>
          <Badge variant={isOnline ? "default" : "destructive"}>{isOnline ? "在线" : "离线"}</Badge>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm">最后同步时间</span>
            <span className="text-sm text-muted-foreground">{syncStatus.lastSync}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">待上传数据</span>
            <Badge variant={syncStatus.pendingUploads > 0 ? "destructive" : "default"}>
              {syncStatus.pendingUploads} 项
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm">缓存数据</span>
            <span className="text-sm text-muted-foreground">{syncStatus.cachedData} MB</span>
          </div>
        </div>

        <Button onClick={handleSync} disabled={!isOnline || syncStatus.syncInProgress} className="w-full">
          {syncStatus.syncInProgress ? (
            <>
              <Upload className="w-4 h-4 mr-2 animate-spin" />
              同步中...
            </>
          ) : (
            <>
              <Download className="w-4 h-4 mr-2" />
              立即同步
            </>
          )}
        </Button>

        {!isOnline && (
          <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-800">
              <AlertTriangle className="w-4 h-4" />
              <span className="text-sm">离线模式：部分功能受限，数据将在联网后自动同步</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// 无障碍访问优化
export const AccessibilityEnhancements = () => {
  const [a11ySettings, setA11ySettings] = useState({
    highContrast: false,
    largeText: false,
    reduceMotion: false,
    screenReader: true,
    voiceNavigation: false,
  })

  const [a11yScore, setA11yScore] = useState(85)

  const handleA11yToggle = useCallback((setting) => {
    setA11ySettings((prev) => {
      const newSettings = {
        ...prev,
        [setting]: !prev[setting],
      }

      // 计算无障碍评分
      const enabledCount = Object.values(newSettings).filter(Boolean).length
      setA11yScore(Math.round((enabledCount / Object.keys(newSettings).length) * 100))

      return newSettings
    })
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Accessibility className="w-5 h-5" />
          无障碍访问
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

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">高对比度模式</div>
              <div className="text-sm text-muted-foreground">提高文字和背景对比度</div>
            </div>
            <Switch checked={a11ySettings.highContrast} onCheckedChange={() => handleA11yToggle("highContrast")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">大字体模式</div>
              <div className="text-sm text-muted-foreground">增大界面文字大小</div>
            </div>
            <Switch checked={a11ySettings.largeText} onCheckedChange={() => handleA11yToggle("largeText")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">减少动画</div>
              <div className="text-sm text-muted-foreground">减少界面动画效果</div>
            </div>
            <Switch checked={a11ySettings.reduceMotion} onCheckedChange={() => handleA11yToggle("reduceMotion")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">屏幕阅读器</div>
              <div className="text-sm text-muted-foreground">支持VoiceOver等屏幕阅读器</div>
            </div>
            <Switch checked={a11ySettings.screenReader} onCheckedChange={() => handleA11yToggle("screenReader")} />
          </div>

          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <div className="font-medium">语音导航</div>
              <div className="text-sm text-muted-foreground">语音控制界面导航</div>
            </div>
            <Switch
              checked={a11ySettings.voiceNavigation}
              onCheckedChange={() => handleA11yToggle("voiceNavigation")}
            />
          </div>
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
