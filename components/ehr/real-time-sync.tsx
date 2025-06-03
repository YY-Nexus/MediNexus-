"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Zap,
  Activity,
  Clock,
  Database,
  Pause,
  Play,
  AlertTriangle,
  CheckCircle,
  XCircle,
  BarChart3,
  Settings,
  TrendingUp,
  TrendingDown,
} from "lucide-react"

// 模拟实时同步状态
const syncStreams = [
  {
    id: "stream-001",
    name: "患者信息流",
    source: "中心医院HIS",
    target: "FHIR R4",
    status: "active",
    throughput: 125, // 记录/分钟
    latency: 45, // 毫秒
    errorRate: 0.2, // 百分比
    lastUpdate: "2025-01-24 14:30:25",
    totalProcessed: 125680,
    totalErrors: 251,
  },
  {
    id: "stream-002",
    name: "检验结果流",
    source: "检验科LIS",
    target: "中央数据库",
    status: "active",
    throughput: 89,
    latency: 78,
    errorRate: 1.2,
    lastUpdate: "2025-01-24 14:30:20",
    totalProcessed: 45320,
    totalErrors: 544,
  },
  {
    id: "stream-003",
    name: "影像数据流",
    source: "影像科PACS",
    target: "DICOM存储",
    status: "warning",
    throughput: 23,
    latency: 156,
    errorRate: 3.5,
    lastUpdate: "2025-01-24 14:28:15",
    totalProcessed: 12450,
    totalErrors: 436,
  },
  {
    id: "stream-004",
    name: "医嘱信息流",
    source: "社区医疗EMR",
    target: "HL7 v2.5",
    status: "error",
    throughput: 0,
    latency: 0,
    errorRate: 100,
    lastUpdate: "2025-01-24 14:15:30",
    totalProcessed: 23450,
    totalErrors: 1250,
  },
]

// 模拟实时性能指标
const performanceMetrics = [
  { time: "14:25", throughput: 245, latency: 52, errors: 3 },
  { time: "14:26", throughput: 267, latency: 48, errors: 2 },
  { time: "14:27", throughput: 234, latency: 55, errors: 4 },
  { time: "14:28", throughput: 289, latency: 43, errors: 1 },
  { time: "14:29", throughput: 256, latency: 49, errors: 2 },
  { time: "14:30", throughput: 278, latency: 46, errors: 3 },
]

// 模拟冲突解决记录
const conflictResolutions = [
  {
    id: "conflict-001",
    timestamp: "2025-01-24 14:29:45",
    type: "data_conflict",
    source: "中心医院HIS",
    target: "FHIR R4",
    field: "Patient.birthDate",
    sourceValue: "1990-01-01",
    targetValue: "1990-01-02",
    resolution: "use_source",
    status: "resolved",
  },
  {
    id: "conflict-002",
    timestamp: "2025-01-24 14:28:30",
    type: "schema_mismatch",
    source: "检验科LIS",
    target: "中央数据库",
    field: "test_result.unit",
    sourceValue: "mg/dL",
    targetValue: "mmol/L",
    resolution: "convert_unit",
    status: "resolved",
  },
  {
    id: "conflict-003",
    timestamp: "2025-01-24 14:27:15",
    type: "duplicate_record",
    source: "社区医疗EMR",
    target: "HL7 v2.5",
    field: "Patient.id",
    sourceValue: "P001234",
    targetValue: "P001234",
    resolution: "merge_records",
    status: "pending",
  },
]

export default function RealTimeSync() {
  const [activeTab, setActiveTab] = useState("overview")
  const [streams, setStreams] = useState(syncStreams)
  const [isGlobalSync, setIsGlobalSync] = useState(true)
  const [metrics, setMetrics] = useState(performanceMetrics)
  const [conflicts, setConflicts] = useState(conflictResolutions)

  // 模拟实时数据更新
  useEffect(() => {
    const interval = setInterval(() => {
      // 更新性能指标
      const newMetric = {
        time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
        throughput: Math.floor(Math.random() * 100) + 200,
        latency: Math.floor(Math.random() * 30) + 40,
        errors: Math.floor(Math.random() * 5),
      }
      setMetrics((prev) => [...prev.slice(-5), newMetric])

      // 更新流状态
      setStreams((prev) =>
        prev.map((stream) => ({
          ...stream,
          throughput: stream.status === "active" ? Math.floor(Math.random() * 50) + stream.throughput * 0.8 : 0,
          latency: stream.status === "active" ? Math.floor(Math.random() * 20) + 40 : 0,
          lastUpdate: new Date().toLocaleString("zh-CN"),
        })),
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 切换流状态
  const toggleStream = (streamId: string) => {
    setStreams(
      streams.map((stream) => {
        if (stream.id === streamId) {
          const newStatus = stream.status === "active" ? "paused" : "active"
          return { ...stream, status: newStatus }
        }
        return stream
      }),
    )
  }

  // 解决冲突
  const resolveConflict = (conflictId: string, resolution: string) => {
    setConflicts(
      conflicts.map((conflict) => {
        if (conflict.id === conflictId) {
          return { ...conflict, resolution, status: "resolved" }
        }
        return conflict
      }),
    )
  }

  // 获取总体统计
  const getTotalStats = () => {
    const totalThroughput = streams.reduce((sum, s) => sum + s.throughput, 0)
    const avgLatency = streams.reduce((sum, s) => sum + s.latency, 0) / streams.length
    const totalErrors = streams.reduce((sum, s) => sum + s.totalErrors, 0)
    const activeStreams = streams.filter((s) => s.status === "active").length

    return { totalThroughput, avgLatency, totalErrors, activeStreams }
  }

  const stats = getTotalStats()

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>实时同步功能</CardTitle>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">全局同步</span>
              <Switch checked={isGlobalSync} onCheckedChange={setIsGlobalSync} />
            </div>
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              配置
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">实时概览</TabsTrigger>
            <TabsTrigger value="streams">数据流管理</TabsTrigger>
            <TabsTrigger value="performance">性能监控</TabsTrigger>
            <TabsTrigger value="conflicts">冲突解决</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-blue-700">活跃流</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">{stats.activeStreams}</div>
                <div className="text-sm text-blue-600">/{streams.length} 总数</div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-emerald-700">总吞吐量</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">{Math.round(stats.totalThroughput)}</div>
                <div className="text-sm text-emerald-600">记录/分钟</div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-amber-500" />
                  <span className="font-medium text-amber-700">平均延迟</span>
                </div>
                <div className="text-2xl font-bold text-amber-600">{Math.round(stats.avgLatency)}</div>
                <div className="text-sm text-amber-600">毫秒</div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-red-700">总错误数</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{stats.totalErrors}</div>
                <div className="text-sm text-red-600">累计错误</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">实时性能趋势</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>吞吐量趋势</span>
                      <span className="flex items-center gap-1">
                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                        +12%
                      </span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>延迟趋势</span>
                      <span className="flex items-center gap-1">
                        <TrendingDown className="w-4 h-4 text-emerald-500" />
                        -8%
                      </span>
                    </div>
                    <Progress value={45} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span>错误率趋势</span>
                      <span className="flex items-center gap-1">
                        <TrendingDown className="w-4 h-4 text-emerald-500" />
                        -15%
                      </span>
                    </div>
                    <Progress value={25} className="h-2" />
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">最近活动</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <CheckCircle className="w-5 h-5 text-emerald-500" />
                    <div>
                      <div className="text-sm font-medium">患者信息流同步成功</div>
                      <div className="text-xs text-muted-foreground">2分钟前</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-amber-500" />
                    <div>
                      <div className="text-sm font-medium">检验结果流延迟增加</div>
                      <div className="text-xs text-muted-foreground">5分钟前</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <div>
                      <div className="text-sm font-medium">医嘱信息流连接中断</div>
                      <div className="text-xs text-muted-foreground">15分钟前</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="streams" className="pt-4">
            <div className="space-y-4">
              {streams.map((stream) => (
                <div key={stream.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Database className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="font-medium text-lg">{stream.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {stream.source} → {stream.target}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={stream.status === "active" ? "default" : "outline"}
                        className={
                          stream.status === "active"
                            ? "bg-emerald-500"
                            : stream.status === "warning"
                              ? "text-amber-500 border-amber-500"
                              : stream.status === "paused"
                                ? "text-gray-500 border-gray-500"
                                : "text-red-500 border-red-500"
                        }
                      >
                        {stream.status === "active"
                          ? "活跃"
                          : stream.status === "warning"
                            ? "警告"
                            : stream.status === "paused"
                              ? "暂停"
                              : "错误"}
                      </Badge>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleStream(stream.id)}
                        disabled={stream.status === "error"}
                      >
                        {stream.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">吞吐量</div>
                      <div className="font-medium">{stream.throughput} 记录/分钟</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">延迟</div>
                      <div className="font-medium">{stream.latency} 毫秒</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">错误率</div>
                      <div className="font-medium text-red-600">{stream.errorRate}%</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">已处理</div>
                      <div className="font-medium">{stream.totalProcessed.toLocaleString()}</div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-3 border-t">
                    <div className="text-sm text-muted-foreground">最后更新: {stream.lastUpdate}</div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="w-4 h-4 mr-1" />
                        配置
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">实时性能指标</h3>
                <div className="space-y-4">
                  {metrics.slice(-6).map((metric, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="text-sm font-medium">{metric.time}</div>
                      <div className="flex gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">吞吐量: </span>
                          <span className="font-medium">{metric.throughput}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">延迟: </span>
                          <span className="font-medium">{metric.latency}ms</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">错误: </span>
                          <span className="font-medium text-red-600">{metric.errors}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">性能优化建议</h3>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-blue-700">吞吐量优化</span>
                    </div>
                    <div className="text-sm text-blue-600">建议增加并发处理线程数，当前吞吐量可提升约20%</div>
                  </div>

                  <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span className="font-medium text-amber-700">延迟优化</span>
                    </div>
                    <div className="text-sm text-amber-600">检测到网络延迟波动，建议启用本地缓存机制</div>
                  </div>

                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <AlertTriangle className="w-4 h-4 text-red-500" />
                      <span className="font-medium text-red-700">错误处理</span>
                    </div>
                    <div className="text-sm text-red-600">影像数据流错误率偏高，建议检查数据格式映射</div>
                  </div>

                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium text-emerald-700">系统健康</span>
                    </div>
                    <div className="text-sm text-emerald-600">患者信息流运行稳定，性能表现优秀</div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="conflicts" className="pt-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">数据冲突解决</h3>
                <div className="text-sm text-muted-foreground">
                  待处理: {conflicts.filter((c) => c.status === "pending").length} 个冲突
                </div>
              </div>

              {conflicts.map((conflict) => (
                <div key={conflict.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium">{conflict.type.replace("_", " ")}</div>
                      <div className="text-sm text-muted-foreground">
                        {conflict.source} → {conflict.target}
                      </div>
                    </div>
                    <Badge
                      variant={conflict.status === "resolved" ? "default" : "outline"}
                      className={conflict.status === "resolved" ? "bg-emerald-500" : "text-amber-500 border-amber-500"}
                    >
                      {conflict.status === "resolved" ? "已解决" : "待处理"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">源值</div>
                      <code className="text-sm">{conflict.sourceValue}</code>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">目标值</div>
                      <code className="text-sm">{conflict.targetValue}</code>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground">字段</div>
                    <code className="text-sm">{conflict.field}</code>
                  </div>

                  {conflict.status === "pending" ? (
                    <div className="flex gap-2 pt-3 border-t">
                      <Button variant="outline" size="sm" onClick={() => resolveConflict(conflict.id, "use_source")}>
                        使用源值
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => resolveConflict(conflict.id, "use_target")}>
                        使用目标值
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => resolveConflict(conflict.id, "merge")}>
                        合并数据
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => resolveConflict(conflict.id, "skip")}>
                        跳过
                      </Button>
                    </div>
                  ) : (
                    <div className="pt-3 border-t">
                      <div className="text-sm text-muted-foreground">
                        解决方案: <span className="font-medium">{conflict.resolution}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">时间: {conflict.timestamp}</div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
