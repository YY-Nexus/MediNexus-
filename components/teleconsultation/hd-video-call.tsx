"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Settings,
  Maximize,
  Minimize,
  Volume2,
  VolumeX,
  Signal,
  Wifi,
  WifiOff,
  Monitor,
  Camera,
  RotateCcw,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

// 模拟参与者数据
const participants = [
  {
    id: 1,
    name: "王医生",
    role: "心脏科主任",
    hospital: "中心医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    videoEnabled: true,
    audioEnabled: true,
    quality: "HD",
  },
  {
    id: 2,
    name: "李医生",
    role: "心脏外科医生",
    hospital: "中心医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    videoEnabled: true,
    audioEnabled: true,
    quality: "4K",
  },
  {
    id: 3,
    name: "张医生",
    role: "放射科医生",
    hospital: "区域医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "online",
    videoEnabled: false,
    audioEnabled: true,
    quality: "HD",
  },
  {
    id: 4,
    name: "赵医生",
    role: "内科医生",
    hospital: "社区医院",
    avatar: "/compassionate-doctor-consultation.png",
    status: "connecting",
    videoEnabled: true,
    audioEnabled: true,
    quality: "SD",
  },
]

export default function HDVideoCall() {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [speakerEnabled, setSpeakerEnabled] = useState(true)
  const [volume, setVolume] = useState([80])
  const [videoQuality, setVideoQuality] = useState("HD")
  const [networkQuality, setNetworkQuality] = useState("excellent")
  const [bandwidth, setBandwidth] = useState(1200)
  const [latency, setLatency] = useState(45)
  const [participantList, setParticipantList] = useState(participants)

  const videoRef = useRef<HTMLVideoElement>(null)

  // 模拟网络质量监控
  useEffect(() => {
    const interval = setInterval(() => {
      const qualities = ["excellent", "good", "fair", "poor"]
      const randomQuality = qualities[Math.floor(Math.random() * qualities.length)]
      setNetworkQuality(randomQuality)
      setBandwidth(Math.floor(Math.random() * 1000) + 500)
      setLatency(Math.floor(Math.random() * 100) + 20)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 获取网络质量颜色
  const getNetworkQualityColor = (quality: string) => {
    switch (quality) {
      case "excellent":
        return "text-emerald-500"
      case "good":
        return "text-blue-500"
      case "fair":
        return "text-amber-500"
      case "poor":
        return "text-red-500"
      default:
        return "text-gray-500"
    }
  }

  // 获取网络质量图标
  const getNetworkIcon = (quality: string) => {
    if (quality === "poor") {
      return <WifiOff className="w-4 h-4" />
    }
    return <Wifi className="w-4 h-4" />
  }

  // 切换全屏
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  // 切换视频质量
  const changeVideoQuality = (quality: string) => {
    setVideoQuality(quality)
    // 这里会调用实际的视频质量切换API
  }

  return (
    <Card className={`shadow-md ${isFullscreen ? "fixed inset-0 z-50" : ""}`}>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Video className="w-5 h-5" />
            高清视频会诊
            <Badge variant="outline" className="ml-2">
              {videoQuality}
            </Badge>
          </CardTitle>
          <div className="flex items-center gap-2">
            {/* 网络状态 */}
            <div className={`flex items-center gap-1 ${getNetworkQualityColor(networkQuality)}`}>
              {getNetworkIcon(networkQuality)}
              <span className="text-xs">{bandwidth}kbps</span>
              <span className="text-xs">{latency}ms</span>
            </div>

            {/* 设置菜单 */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Settings className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>视频设置</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => changeVideoQuality("4K")}>
                  <Monitor className="w-4 h-4 mr-2" />
                  4K 超高清 (2160p)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeVideoQuality("HD")}>
                  <Monitor className="w-4 h-4 mr-2" />
                  高清 (1080p)
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeVideoQuality("SD")}>
                  <Monitor className="w-4 h-4 mr-2" />
                  标清 (720p)
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Camera className="w-4 h-4 mr-2" />
                  摄像头设置
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <RotateCcw className="w-4 h-4 mr-2" />
                  重新连接
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button variant="outline" size="sm" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* 主视频区域 */}
        <div
          className={`relative ${isFullscreen ? "h-[calc(100vh-200px)]" : "h-[400px]"} bg-gray-900 rounded-lg overflow-hidden`}
        >
          {/* 主讲者视频 */}
          <div className="absolute inset-0">
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-center">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src="/compassionate-doctor-consultation.png" alt="王医生" />
                  <AvatarFallback>王</AvatarFallback>
                </Avatar>
                <p className="text-lg font-medium">王医生 - 心脏科主任</p>
                <p className="text-sm opacity-75">中心医院</p>
                <Badge className="mt-2" variant="secondary">
                  主讲者 - {videoQuality}
                </Badge>
              </div>
            </div>
          </div>

          {/* 视频控制栏 */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black bg-opacity-50 rounded-lg px-4 py-2">
            <Button
              variant={videoEnabled ? "default" : "destructive"}
              size="sm"
              onClick={() => setVideoEnabled(!videoEnabled)}
            >
              {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
            </Button>
            <Button
              variant={audioEnabled ? "default" : "destructive"}
              size="sm"
              onClick={() => setAudioEnabled(!audioEnabled)}
            >
              {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
            </Button>
            <Button
              variant={speakerEnabled ? "default" : "secondary"}
              size="sm"
              onClick={() => setSpeakerEnabled(!speakerEnabled)}
            >
              {speakerEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </Button>

            {/* 音量控制 */}
            <div className="flex items-center gap-2 text-white">
              <span className="text-xs">音量</span>
              <div className="w-20">
                <Slider value={volume} onValueChange={setVolume} max={100} step={1} className="w-full" />
              </div>
              <span className="text-xs w-8">{volume[0]}%</span>
            </div>
          </div>

          {/* 网络质量指示器 */}
          <div className="absolute top-4 right-4 bg-black bg-opacity-50 rounded-lg px-3 py-2">
            <div className={`flex items-center gap-2 text-white ${getNetworkQualityColor(networkQuality)}`}>
              <Signal className="w-4 h-4" />
              <div className="text-xs">
                <div>网络: {networkQuality}</div>
                <div>
                  {bandwidth}kbps • {latency}ms
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 参与者视频网格 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {participantList.map((participant) => (
            <div key={participant.id} className="relative">
              <div className="bg-gray-800 rounded-lg aspect-video flex items-center justify-center relative overflow-hidden">
                {participant.videoEnabled ? (
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                    <AvatarFallback>{participant.name.slice(0, 1)}</AvatarFallback>
                  </Avatar>
                ) : (
                  <div className="text-white text-center">
                    <VideoOff className="w-8 h-8 mx-auto mb-2 opacity-50" />
                    <p className="text-xs opacity-75">视频已关闭</p>
                  </div>
                )}

                {/* 参与者状态指示器 */}
                <div className="absolute top-2 left-2 flex gap-1">
                  {!participant.audioEnabled && (
                    <div className="bg-red-500 rounded-full p-1">
                      <MicOff className="w-3 h-3 text-white" />
                    </div>
                  )}
                  {!participant.videoEnabled && (
                    <div className="bg-red-500 rounded-full p-1">
                      <VideoOff className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                {/* 视频质量标识 */}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary" className="text-xs">
                    {participant.quality}
                  </Badge>
                </div>

                {/* 连接状态 */}
                {participant.status === "connecting" && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="text-white text-center">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mx-auto mb-2"></div>
                      <p className="text-xs">连接中...</p>
                    </div>
                  </div>
                )}
              </div>

              {/* 参与者信息 */}
              <div className="absolute bottom-1 left-1 right-1">
                <div className="bg-black bg-opacity-75 text-white text-xs rounded px-2 py-1 truncate">
                  <div className="font-medium">{participant.name}</div>
                  <div className="opacity-75">{participant.role}</div>
                </div>
              </div>

              {/* 在线状态 */}
              <div
                className={`absolute top-1 left-1 w-3 h-3 rounded-full border-2 border-white ${
                  participant.status === "online"
                    ? "bg-emerald-500"
                    : participant.status === "connecting"
                      ? "bg-amber-500"
                      : "bg-gray-400"
                }`}
              ></div>
            </div>
          ))}
        </div>

        {/* 视频统计信息 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="bg-muted rounded-lg p-3">
            <div className="font-medium">视频质量</div>
            <div className="text-2xl font-bold text-blue-600">{videoQuality}</div>
            <div className="text-xs text-muted-foreground">
              {videoQuality === "4K" ? "3840×2160" : videoQuality === "HD" ? "1920×1080" : "1280×720"}
            </div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="font-medium">帧率</div>
            <div className="text-2xl font-bold text-emerald-600">30fps</div>
            <div className="text-xs text-muted-foreground">流畅播放</div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="font-medium">延迟</div>
            <div className="text-2xl font-bold text-amber-600">{latency}ms</div>
            <div className="text-xs text-muted-foreground">
              {latency < 50 ? "优秀" : latency < 100 ? "良好" : "一般"}
            </div>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="font-medium">带宽</div>
            <div className="text-2xl font-bold text-purple-600">{bandwidth}k</div>
            <div className="text-xs text-muted-foreground">上行/下行</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
