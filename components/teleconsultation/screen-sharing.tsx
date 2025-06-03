"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Monitor,
  MonitorSpeaker,
  Square,
  Maximize,
  Minimize,
  MousePointer,
  Pen,
  Eraser,
  Download,
  Upload,
  Share2,
  StopCircle,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Move,
  TextCursorIcon as Cursor,
} from "lucide-react"
import { Slider } from "@/components/ui/slider"

export default function ScreenSharing() {
  const [isSharing, setIsSharing] = useState(false)
  const [shareType, setShareType] = useState<"screen" | "window" | "tab">("screen")
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [annotationMode, setAnnotationMode] = useState<"pointer" | "pen" | "eraser" | null>(null)
  const [zoom, setZoom] = useState([100])
  const [remoteControl, setRemoteControl] = useState(false)
  const [isRecording, setIsRecording] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)

  // 开始屏幕共享
  const startScreenShare = async (type: "screen" | "window" | "tab") => {
    try {
      setShareType(type)
      setIsSharing(true)
      // 这里会调用实际的屏幕共享API
      console.log(`开始共享${type}`)
    } catch (error) {
      console.error("屏幕共享失败:", error)
    }
  }

  // 停止屏幕共享
  const stopScreenShare = () => {
    setIsSharing(false)
    setAnnotationMode(null)
    console.log("停止屏幕共享")
  }

  // 切换注释模式
  const toggleAnnotation = (mode: "pointer" | "pen" | "eraser") => {
    setAnnotationMode(annotationMode === mode ? null : mode)
  }

  // 切换远程控制
  const toggleRemoteControl = () => {
    setRemoteControl(!remoteControl)
  }

  // 开始/停止录制
  const toggleRecording = () => {
    setIsRecording(!isRecording)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            屏幕共享
            {isSharing && (
              <Badge variant="default" className="ml-2">
                正在共享 - {shareType === "screen" ? "整个屏幕" : shareType === "window" ? "应用窗口" : "浏览器标签"}
              </Badge>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {isSharing && (
              <>
                <Button variant={isRecording ? "destructive" : "outline"} size="sm" onClick={toggleRecording}>
                  {isRecording ? <StopCircle className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  {isRecording ? "停止录制" : "开始录制"}
                </Button>
                <Button variant="destructive" size="sm" onClick={stopScreenShare}>
                  <StopCircle className="w-4 h-4 mr-1" />
                  停止共享
                </Button>
              </>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {!isSharing ? (
          // 屏幕共享选择界面
          <div className="space-y-4">
            <div className="text-center py-8">
              <Monitor className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">选择要共享的内容</h3>
              <p className="text-muted-foreground mb-6">选择您想要与其他参与者共享的屏幕内容</p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                <Card
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => startScreenShare("screen")}
                >
                  <CardContent className="p-6 text-center">
                    <Monitor className="w-12 h-12 mx-auto mb-3 text-blue-500" />
                    <h4 className="font-medium mb-2">整个屏幕</h4>
                    <p className="text-sm text-muted-foreground">共享您的整个桌面屏幕</p>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => startScreenShare("window")}
                >
                  <CardContent className="p-6 text-center">
                    <Square className="w-12 h-12 mx-auto mb-3 text-emerald-500" />
                    <h4 className="font-medium mb-2">应用窗口</h4>
                    <p className="text-sm text-muted-foreground">共享特定的应用程序窗口</p>
                  </CardContent>
                </Card>

                <Card
                  className="cursor-pointer hover:bg-muted/50 transition-colors"
                  onClick={() => startScreenShare("tab")}
                >
                  <CardContent className="p-6 text-center">
                    <MonitorSpeaker className="w-12 h-12 mx-auto mb-3 text-purple-500" />
                    <h4 className="font-medium mb-2">浏览器标签</h4>
                    <p className="text-sm text-muted-foreground">共享特定的浏览器标签页</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        ) : (
          // 屏幕共享控制界面
          <div className="space-y-4">
            {/* 工具栏 */}
            <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex items-center gap-2">
                {/* 注释工具 */}
                <div className="flex items-center gap-1 border-r pr-2">
                  <Button
                    variant={annotationMode === "pointer" ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAnnotation("pointer")}
                  >
                    <MousePointer className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={annotationMode === "pen" ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAnnotation("pen")}
                  >
                    <Pen className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={annotationMode === "eraser" ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleAnnotation("eraser")}
                  >
                    <Eraser className="w-4 h-4" />
                  </Button>
                </div>

                {/* 缩放控制 */}
                <div className="flex items-center gap-2 border-r pr-2">
                  <Button variant="outline" size="sm">
                    <ZoomOut className="w-4 h-4" />
                  </Button>
                  <div className="flex items-center gap-2 min-w-[120px]">
                    <Slider value={zoom} onValueChange={setZoom} min={50} max={200} step={10} className="w-full" />
                    <span className="text-xs w-12">{zoom[0]}%</span>
                  </div>
                  <Button variant="outline" size="sm">
                    <ZoomIn className="w-4 h-4" />
                  </Button>
                </div>

                {/* 其他控制 */}
                <div className="flex items-center gap-1">
                  <Button variant={remoteControl ? "default" : "outline"} size="sm" onClick={toggleRemoteControl}>
                    <Cursor className="w-4 h-4" />
                    远程控制
                  </Button>
                  <Button variant="outline" size="sm">
                    <Move className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-1" />
                  截图
                </Button>
                <Button variant="outline" size="sm">
                  <Upload className="w-4 h-4 mr-1" />
                  上传文件
                </Button>
                <Button variant="outline" size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            {/* 共享内容显示区域 */}
            <div
              className={`relative ${isFullscreen ? "h-[calc(100vh-300px)]" : "h-[500px]"} bg-gray-900 rounded-lg overflow-hidden`}
            >
              {/* 模拟共享屏幕内容 */}
              <div className="w-full h-full flex items-center justify-center relative">
                <div className="text-white text-center">
                  <Monitor className="w-24 h-24 mx-auto mb-4 opacity-20" />
                  <p className="text-lg opacity-50">
                    {shareType === "screen"
                      ? "正在共享整个屏幕"
                      : shareType === "window"
                        ? "正在共享应用窗口"
                        : "正在共享浏览器标签"}
                  </p>
                  <p className="text-sm opacity-30 mt-2">分辨率: 1920×1080 | 帧率: 30fps</p>
                </div>

                {/* 注释画布 */}
                <canvas
                  ref={canvasRef}
                  className="absolute inset-0 w-full h-full"
                  style={{ pointerEvents: annotationMode ? "auto" : "none" }}
                />

                {/* 远程控制指示器 */}
                {remoteControl && (
                  <div className="absolute top-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-lg text-sm">
                    <Cursor className="w-4 h-4 inline mr-1" />
                    远程控制已启用
                  </div>
                )}

                {/* 录制指示器 */}
                {isRecording && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-lg text-sm flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    正在录制
                  </div>
                )}

                {/* 注释模式指示器 */}
                {annotationMode && (
                  <div className="absolute bottom-4 left-4 bg-blue-500 text-white px-3 py-1 rounded-lg text-sm">
                    {annotationMode === "pointer" && <MousePointer className="w-4 h-4 inline mr-1" />}
                    {annotationMode === "pen" && <Pen className="w-4 h-4 inline mr-1" />}
                    {annotationMode === "eraser" && <Eraser className="w-4 h-4 inline mr-1" />}
                    {annotationMode === "pointer" ? "指针模式" : annotationMode === "pen" ? "画笔模式" : "橡皮擦模式"}
                  </div>
                )}
              </div>
            </div>

            {/* 共享统计信息 */}
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="stats">共享统计</TabsTrigger>
                <TabsTrigger value="participants">参与者</TabsTrigger>
                <TabsTrigger value="settings">设置</TabsTrigger>
              </TabsList>

              <TabsContent value="stats" className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-muted rounded-lg p-3">
                    <div className="font-medium">分辨率</div>
                    <div className="text-2xl font-bold text-blue-600">1920×1080</div>
                    <div className="text-xs text-muted-foreground">Full HD</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="font-medium">帧率</div>
                    <div className="text-2xl font-bold text-emerald-600">30fps</div>
                    <div className="text-xs text-muted-foreground">流畅</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="font-medium">带宽</div>
                    <div className="text-2xl font-bold text-amber-600">2.5MB/s</div>
                    <div className="text-xs text-muted-foreground">上传速度</div>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="font-medium">延迟</div>
                    <div className="text-2xl font-bold text-purple-600">35ms</div>
                    <div className="text-xs text-muted-foreground">优秀</div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="participants" className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">王医生</div>
                        <div className="text-sm text-muted-foreground">正在观看</div>
                      </div>
                    </div>
                    <Badge variant="outline">主持人</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">李医生</div>
                        <div className="text-sm text-muted-foreground">正在观看</div>
                      </div>
                    </div>
                    <Badge variant="secondary">远程控制</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                      <div>
                        <div className="font-medium">张医生</div>
                        <div className="text-sm text-muted-foreground">正在观看</div>
                      </div>
                    </div>
                    <Badge variant="outline">观看者</Badge>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">允许远程控制</div>
                      <div className="text-sm text-muted-foreground">允许其他参与者控制您的屏幕</div>
                    </div>
                    <Button variant={remoteControl ? "default" : "outline"} size="sm" onClick={toggleRemoteControl}>
                      {remoteControl ? "已启用" : "已禁用"}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">自动录制</div>
                      <div className="text-sm text-muted-foreground">自动录制屏幕共享内容</div>
                    </div>
                    <Button variant={isRecording ? "default" : "outline"} size="sm" onClick={toggleRecording}>
                      {isRecording ? "正在录制" : "未录制"}
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="font-medium">视频质量</div>
                    <div className="grid grid-cols-3 gap-2">
                      <Button variant="outline" size="sm">
                        高质量
                      </Button>
                      <Button variant="default" size="sm">
                        平衡
                      </Button>
                      <Button variant="outline" size="sm">
                        流畅
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
