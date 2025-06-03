"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import {
  Activity,
  Wifi,
  WifiOff,
  Play,
  Pause,
  RotateCcw,
  Settings,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react"

// 实时数据流类型
interface StreamData {
  timestamp: number
  value: number
  label: string
}

interface MetricStream {
  id: string
  name: string
  description: string
  unit: string
  color: string
  isActive: boolean
  currentValue: number
  trend: "up" | "down" | "stable"
  data: StreamData[]
  threshold: { min: number; max: number }
}

// 初始化数据流
const initialStreams: MetricStream[] = [
  {
    id: "patient-flow",
    name: "实时患者流量",
    description: "当前医院内患者数量变化",
    unit: "人",
    color: "#3b82f6",
    isActive: true,
    currentValue: 245,
    trend: "up",
    data: [],
    threshold: { min: 200, max: 300 },
  },
  {
    id: "emergency-queue",
    name: "急诊队列长度",
    description: "急诊科等待患者数量",
    unit: "人",
    color: "#ef4444",
    isActive: true,
    currentValue: 12,
    trend: "stable",
    data: [],
    threshold: { min: 0, max: 20 },
  },
  {
    id: "bed-occupancy",
    name: "床位占用率",
    description: "医院床位实时占用情况",
    unit: "%",
    color: "#10b981",
    isActive: true,
    currentValue: 78,
    trend: "down",
    data: [],
    threshold: { min: 60, max: 90 },
  },
  {
    id: "system-load",
    name: "系统负载",
    description: "医疗信息系统CPU使用率",
    unit: "%",
    color: "#f59e0b",
    isActive: true,
    currentValue: 45,
    trend: "stable",
    data: [],
    threshold: { min: 0, max: 80 },
  },
]

// 实时事件类型
interface RealTimeEvent {
  id: string
  timestamp: number
  type: "info" | "warning" | "error" | "success"
  title: string
  description: string
  source: string
}

interface RealTimeStreamProps {
  onBack?: () => void
}

export default function RealTimeStream({ onBack }: RealTimeStreamProps) {
  const [streams, setStreams] = useState<MetricStream[]>(initialStreams)
  const [isConnected, setIsConnected] = useState(true)
  const [isStreaming, setIsStreaming] = useState(true)
  const [events, setEvents] = useState<RealTimeEvent[]>([])
  const [selectedStream, setSelectedStream] = useState("patient-flow")
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // 模拟实时数据生成
  const generateRealTimeData = () => {
    const now = Date.now()

    setStreams((prevStreams) =>
      prevStreams.map((stream) => {
        if (!stream.isActive) return stream

        // 生成新的数据点
        const variation = (Math.random() - 0.5) * 10
        let newValue = stream.currentValue + variation

        // 确保值在合理范围内
        if (stream.unit === "%") {
          newValue = Math.max(0, Math.min(100, newValue))
        } else {
          newValue = Math.max(0, newValue)
        }

        // 确定趋势
        let trend: "up" | "down" | "stable" = "stable"
        if (variation > 2) trend = "up"
        else if (variation < -2) trend = "down"

        // 更新数据数组，保持最近50个数据点
        const newDataPoint: StreamData = {
          timestamp: now,
          value: newValue,
          label: new Date(now).toLocaleTimeString(),
        }

        const updatedData = [...stream.data, newDataPoint].slice(-50)

        // 检查阈值并生成事件
        if (newValue > stream.threshold.max || newValue < stream.threshold.min) {
          const event: RealTimeEvent = {
            id: `event-${now}`,
            timestamp: now,
            type: newValue > stream.threshold.max ? "warning" : "error",
            title: `${stream.name}异常`,
            description: `当前值 ${newValue.toFixed(1)}${stream.unit} 超出正常范围`,
            source: stream.name,
          }

          setEvents((prevEvents) => [event, ...prevEvents.slice(0, 19)]) // 保持最近20个事件
        }

        return {
          ...stream,
          currentValue: newValue,
          trend,
          data: updatedData,
        }
      }),
    )
  }

  // 启动/停止数据流
  useEffect(() => {
    if (isStreaming && isConnected) {
      intervalRef.current = setInterval(generateRealTimeData, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isStreaming, isConnected])

  // 模拟连接状态变化
  useEffect(() => {
    const connectionInterval = setInterval(() => {
      // 5% 概率模拟连接中断
      if (Math.random() < 0.05) {
        setIsConnected(false)
        setTimeout(() => setIsConnected(true), 2000 + Math.random() * 3000)
      }
    }, 10000)

    return () => clearInterval(connectionInterval)
  }, [])

  const toggleStreaming = () => {
    setIsStreaming(!isStreaming)
  }

  const resetStreams = () => {
    setStreams((prevStreams) =>
      prevStreams.map((stream) => ({
        ...stream,
        data: [],
        currentValue: Math.random() * 100,
      })),
    )
    setEvents([])
  }

  const toggleStream = (streamId: string) => {
    setStreams((prevStreams) =>
      prevStreams.map((stream) => (stream.id === streamId ? { ...stream, isActive: !stream.isActive } : stream)),
    )
  }

  const currentStream = streams.find((s) => s.id === selectedStream)

  const getEventIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Clock className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-medical-800">实时数据流</h2>
          <p className="text-gray-600">监控医院运营的实时指标和事件</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {isConnected ? <Wifi className="h-4 w-4 text-green-500" /> : <WifiOff className="h-4 w-4 text-red-500" />}
            <span className="text-sm text-gray-500">{isConnected ? "已连接" : "连接中断"}</span>
          </div>
          <Button variant="outline" size="sm" onClick={toggleStreaming} disabled={!isConnected}>
            {isStreaming ? (
              <>
                <Pause className="mr-2 h-4 w-4" />
                暂停
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                开始
              </>
            )}
          </Button>
          <Button variant="outline" size="sm" onClick={resetStreams}>
            <RotateCcw className="mr-2 h-4 w-4" />
            重置
          </Button>
        </div>
      </div>

      {/* 实时指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {streams.map((stream) => (
          <Card
            key={stream.id}
            className={`cursor-pointer transition-all ${
              selectedStream === stream.id ? "ring-2 ring-medical-500 bg-medical-50" : "hover:shadow-md"
            }`}
            onClick={() => setSelectedStream(stream.id)}
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">{stream.name}</CardTitle>
                <div className="flex items-center gap-1">
                  <Badge variant={stream.isActive ? "default" : "secondary"} className="text-xs">
                    {stream.isActive ? "活跃" : "暂停"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleStream(stream.id)
                    }}
                  >
                    <Settings className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold" style={{ color: stream.color }}>
                    {stream.currentValue.toFixed(1)}
                  </span>
                  <div className="flex items-center gap-1">
                    {stream.trend === "up" && <Activity className="h-4 w-4 text-green-500" />}
                    {stream.trend === "down" && <Activity className="h-4 w-4 text-red-500 rotate-180" />}
                    {stream.trend === "stable" && <Activity className="h-4 w-4 text-gray-400" />}
                    <span className="text-sm text-gray-500">{stream.unit}</span>
                  </div>
                </div>
                <Progress value={(stream.currentValue / stream.threshold.max) * 100} className="h-2" />
                <p className="text-xs text-gray-500">{stream.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="charts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="charts">实时图表</TabsTrigger>
          <TabsTrigger value="events">事件日志</TabsTrigger>
          <TabsTrigger value="settings">流配置</TabsTrigger>
        </TabsList>

        <TabsContent value="charts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" style={{ color: currentStream?.color }} />
                {currentStream?.name}
              </CardTitle>
              <CardDescription>实时数据变化趋势 - 更新频率: 1秒</CardDescription>
            </CardHeader>
            <CardContent>
              {currentStream && currentStream.data.length > 0 ? (
                <div className="h-[400px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={currentStream.data}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="label" tick={{ fontSize: 12 }} interval="preserveStartEnd" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} ${currentStream.unit}`, currentStream.name]} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke={currentStream.color}
                        fill={currentStream.color}
                        fillOpacity={0.3}
                        strokeWidth={2}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[400px] flex items-center justify-center bg-gray-50 rounded">
                  <div className="text-center">
                    <Activity className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">等待数据流...</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>实时事件日志</CardTitle>
              <CardDescription>系统异常和重要事件的实时记录</CardDescription>
            </CardHeader>
            <CardContent>
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <p className="text-gray-500">暂无异常事件</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[400px] overflow-y-auto">
                  {events.map((event) => (
                    <div key={event.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      {getEventIcon(event.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-medium">{event.title}</h4>
                          <span className="text-xs text-gray-500">
                            {new Date(event.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                        <Badge variant="outline" className="text-xs mt-2">
                          {event.source}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {streams.map((stream) => (
              <Card key={stream.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{stream.name}</CardTitle>
                  <CardDescription>{stream.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">启用状态</span>
                    <Button
                      size="sm"
                      variant={stream.isActive ? "default" : "outline"}
                      onClick={() => toggleStream(stream.id)}
                    >
                      {stream.isActive ? "已启用" : "已禁用"}
                    </Button>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block mb-2">阈值范围</span>
                    <div className="flex items-center gap-2 text-sm">
                      <span>
                        最小值: {stream.threshold.min}
                        {stream.unit}
                      </span>
                      <span>-</span>
                      <span>
                        最大值: {stream.threshold.max}
                        {stream.unit}
                      </span>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500 block mb-2">当前状态</span>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: stream.color }} />
                      <span className="text-sm">
                        {stream.currentValue.toFixed(1)}
                        {stream.unit}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {stream.trend === "up" ? "上升" : stream.trend === "down" ? "下降" : "稳定"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
