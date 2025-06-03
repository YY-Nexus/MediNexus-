"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import {
  Database,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Settings,
  Play,
  Pause,
  BarChart3,
  Clock,
  Zap,
} from "lucide-react"

// 模拟系统连接配置
const systemConnections = [
  {
    id: "his-001",
    name: "中心医院HIS系统",
    type: "HIS",
    protocol: "HL7 v2.5",
    endpoint: "https://his.central-hospital.com/api/v2",
    status: "connected",
    lastSync: "2025-01-24 14:30:25",
    syncInterval: 300, // 秒
    autoSync: true,
    totalRecords: 125680,
    syncedRecords: 125680,
    errorCount: 0,
    avgSyncTime: 45, // 秒
  },
  {
    id: "emr-002",
    name: "社区医疗中心EMR",
    type: "EMR",
    protocol: "FHIR R4",
    endpoint: "https://emr.community-health.org/fhir",
    status: "connected",
    lastSync: "2025-01-24 14:28:15",
    syncInterval: 600,
    autoSync: true,
    totalRecords: 89450,
    syncedRecords: 89420,
    errorCount: 2,
    avgSyncTime: 32,
  },
  {
    id: "lis-003",
    name: "专科医院LIS系统",
    type: "LIS",
    protocol: "HL7 v2.3",
    endpoint: "https://lis.specialty-hospital.net/integration",
    status: "warning",
    lastSync: "2025-01-24 13:45:10",
    syncInterval: 900,
    autoSync: false,
    totalRecords: 45320,
    syncedRecords: 44890,
    errorCount: 15,
    avgSyncTime: 78,
  },
  {
    id: "pacs-004",
    name: "医学影像PACS系统",
    type: "PACS",
    protocol: "DICOM",
    endpoint: "https://pacs.medical-imaging.com/dicom",
    status: "error",
    lastSync: "2025-01-24 12:15:30",
    syncInterval: 1800,
    autoSync: false,
    totalRecords: 23450,
    syncedRecords: 22100,
    errorCount: 45,
    avgSyncTime: 120,
  },
  {
    id: "regional-005",
    name: "区域医疗平台",
    type: "Regional",
    protocol: "FHIR R4",
    endpoint: "https://regional-health-platform.org/fhir/r4",
    status: "connected",
    lastSync: "2025-01-24 14:25:45",
    syncInterval: 1200,
    autoSync: true,
    totalRecords: 234560,
    syncedRecords: 234560,
    errorCount: 0,
    avgSyncTime: 95,
  },
]

// 模拟同步任务
const syncTasks = [
  {
    id: "task-001",
    systemId: "his-001",
    systemName: "中心医院HIS系统",
    type: "incremental",
    status: "running",
    progress: 75,
    startTime: "2025-01-24 14:30:00",
    estimatedTime: 60,
    recordsProcessed: 1250,
    totalRecords: 1680,
  },
  {
    id: "task-002",
    systemId: "emr-002",
    systemName: "社区医疗中心EMR",
    type: "full",
    status: "completed",
    progress: 100,
    startTime: "2025-01-24 14:00:00",
    completedTime: "2025-01-24 14:28:15",
    recordsProcessed: 89420,
    totalRecords: 89420,
  },
  {
    id: "task-003",
    systemId: "lis-003",
    systemName: "专科医院LIS系统",
    type: "incremental",
    status: "failed",
    progress: 45,
    startTime: "2025-01-24 13:30:00",
    errorMessage: "连接超时，网络不稳定",
    recordsProcessed: 203,
    totalRecords: 450,
  },
]

export default function MultiSystemSync() {
  const [activeTab, setActiveTab] = useState("overview")
  const [systems, setSystems] = useState(systemConnections)
  const [tasks, setTasks] = useState(syncTasks)
  const [isGlobalSync, setIsGlobalSync] = useState(false)

  // 获取系统状态统计
  const getSystemStats = () => {
    const connected = systems.filter((s) => s.status === "connected").length
    const warning = systems.filter((s) => s.status === "warning").length
    const error = systems.filter((s) => s.status === "error").length
    const totalRecords = systems.reduce((sum, s) => sum + s.totalRecords, 0)
    const syncedRecords = systems.reduce((sum, s) => sum + s.syncedRecords, 0)
    const totalErrors = systems.reduce((sum, s) => sum + s.errorCount, 0)

    return { connected, warning, error, totalRecords, syncedRecords, totalErrors }
  }

  const stats = getSystemStats()

  // 切换系统自动同步
  const toggleAutoSync = (systemId: string) => {
    setSystems(
      systems.map((system) => {
        if (system.id === systemId) {
          return { ...system, autoSync: !system.autoSync }
        }
        return system
      }),
    )
  }

  // 手动同步系统
  const manualSync = (systemId: string) => {
    // 模拟同步过程
    console.log(`开始同步系统: ${systemId}`)
  }

  // 全局同步
  const globalSync = () => {
    setIsGlobalSync(true)
    // 模拟全局同步
    setTimeout(() => {
      setIsGlobalSync(false)
    }, 3000)
  }

  return (
    <Card className="shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>多系统数据同步</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={globalSync} disabled={isGlobalSync}>
              {isGlobalSync ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Zap className="w-4 h-4 mr-2" />}
              {isGlobalSync ? "同步中..." : "全局同步"}
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="systems">系统管理</TabsTrigger>
            <TabsTrigger value="tasks">同步任务</TabsTrigger>
            <TabsTrigger value="monitoring">监控</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium text-emerald-700">正常连接</span>
                </div>
                <div className="text-2xl font-bold text-emerald-600">{stats.connected}</div>
                <div className="text-sm text-emerald-600">系统运行正常</div>
              </div>

              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  <span className="font-medium text-amber-700">警告状态</span>
                </div>
                <div className="text-2xl font-bold text-amber-600">{stats.warning}</div>
                <div className="text-sm text-amber-600">需要关注</div>
              </div>

              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <XCircle className="w-5 h-5 text-red-500" />
                  <span className="font-medium text-red-700">错误状态</span>
                </div>
                <div className="text-2xl font-bold text-red-600">{stats.error}</div>
                <div className="text-sm text-red-600">需要修复</div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Database className="w-5 h-5 text-blue-500" />
                  <span className="font-medium text-blue-700">数据同步率</span>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  {((stats.syncedRecords / stats.totalRecords) * 100).toFixed(1)}%
                </div>
                <div className="text-sm text-blue-600">
                  {stats.syncedRecords.toLocaleString()}/{stats.totalRecords.toLocaleString()}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">系统连接状态</h3>
                <div className="space-y-3">
                  {systems.slice(0, 3).map((system) => (
                    <div key={system.id} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <Database className="w-5 h-5 text-blue-500" />
                        <div>
                          <div className="font-medium">{system.name}</div>
                          <div className="text-sm text-muted-foreground">{system.type}</div>
                        </div>
                      </div>
                      <Badge
                        variant={system.status === "connected" ? "default" : "outline"}
                        className={
                          system.status === "connected"
                            ? "bg-emerald-500"
                            : system.status === "warning"
                              ? "text-amber-500 border-amber-500"
                              : "text-red-500 border-red-500"
                        }
                      >
                        {system.status === "connected" ? "正常" : system.status === "warning" ? "警告" : "错误"}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">最近同步任务</h3>
                <div className="space-y-3">
                  {tasks.slice(0, 3).map((task) => (
                    <div key={task.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="font-medium">{task.systemName}</div>
                        <Badge
                          variant={task.status === "completed" ? "default" : "outline"}
                          className={
                            task.status === "completed"
                              ? "bg-emerald-500"
                              : task.status === "running"
                                ? "text-blue-500 border-blue-500"
                                : "text-red-500 border-red-500"
                          }
                        >
                          {task.status === "completed" ? "已完成" : task.status === "running" ? "进行中" : "失败"}
                        </Badge>
                      </div>
                      {task.status === "running" && (
                        <div className="space-y-1">
                          <Progress value={task.progress} className="h-2" />
                          <div className="text-sm text-muted-foreground">
                            {task.recordsProcessed}/{task.totalRecords} 记录 ({task.progress}%)
                          </div>
                        </div>
                      )}
                      {task.status === "failed" && <div className="text-sm text-red-600">{task.errorMessage}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="systems" className="pt-4">
            <div className="space-y-4">
              {systems.map((system) => (
                <div key={system.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Database className="w-6 h-6 text-blue-500" />
                      <div>
                        <div className="font-medium text-lg">{system.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {system.type} • {system.protocol}
                        </div>
                      </div>
                    </div>
                    <Badge
                      variant={system.status === "connected" ? "default" : "outline"}
                      className={
                        system.status === "connected"
                          ? "bg-emerald-500"
                          : system.status === "warning"
                            ? "text-amber-500 border-amber-500"
                            : "text-red-500 border-red-500"
                      }
                    >
                      {system.status === "connected" ? "正常" : system.status === "warning" ? "警告" : "错误"}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">总记录数</div>
                      <div className="font-medium">{system.totalRecords.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">已同步</div>
                      <div className="font-medium">{system.syncedRecords.toLocaleString()}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">错误数</div>
                      <div className="font-medium text-red-600">{system.errorCount}</div>
                    </div>
                    <div className="text-center p-3 bg-muted rounded-lg">
                      <div className="text-sm text-muted-foreground">平均同步时间</div>
                      <div className="font-medium">{system.avgSyncTime}秒</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm">自动同步</span>
                        <Switch checked={system.autoSync} onCheckedChange={() => toggleAutoSync(system.id)} />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        间隔: {Math.floor(system.syncInterval / 60)}分钟
                      </div>
                      <div className="text-sm text-muted-foreground">上次同步: {system.lastSync}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={() => manualSync(system.id)}>
                        <RefreshCw className="w-4 h-4 mr-1" />
                        同步
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

          <TabsContent value="tasks" className="pt-4">
            <div className="space-y-4">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-medium">{task.systemName}</div>
                      <div className="text-sm text-muted-foreground">
                        {task.type === "full" ? "全量同步" : "增量同步"} • 任务ID: {task.id}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === "running" && <Play className="w-4 h-4 text-blue-500" />}
                      {task.status === "completed" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
                      {task.status === "failed" && <XCircle className="w-4 h-4 text-red-500" />}
                      <Badge
                        variant={task.status === "completed" ? "default" : "outline"}
                        className={
                          task.status === "completed"
                            ? "bg-emerald-500"
                            : task.status === "running"
                              ? "text-blue-500 border-blue-500"
                              : "text-red-500 border-red-500"
                        }
                      >
                        {task.status === "completed" ? "已完成" : task.status === "running" ? "进行中" : "失败"}
                      </Badge>
                    </div>
                  </div>

                  {task.status === "running" && (
                    <div className="space-y-2 mb-3">
                      <div className="flex justify-between text-sm">
                        <span>进度: {task.progress}%</span>
                        <span>
                          {task.recordsProcessed}/{task.totalRecords} 记录
                        </span>
                      </div>
                      <Progress value={task.progress} className="h-2" />
                      <div className="text-sm text-muted-foreground">
                        预计剩余时间: {task.estimatedTime - Math.floor((task.progress / 100) * task.estimatedTime)}
                        分钟
                      </div>
                    </div>
                  )}

                  {task.status === "failed" && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-3">
                      <div className="text-sm text-red-600">{task.errorMessage}</div>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        开始时间: {task.startTime}
                      </div>
                      {task.completedTime && (
                        <div className="flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" />
                          完成时间: {task.completedTime}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2">
                      {task.status === "running" && (
                        <Button variant="outline" size="sm">
                          <Pause className="w-4 h-4 mr-1" />
                          暂停
                        </Button>
                      )}
                      {task.status === "failed" && (
                        <Button variant="outline" size="sm">
                          <RefreshCw className="w-4 h-4 mr-1" />
                          重试
                        </Button>
                      )}
                      <Button variant="outline" size="sm">
                        <BarChart3 className="w-4 h-4 mr-1" />
                        详情
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="monitoring" className="pt-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-medium mb-3">同步性能监控</h3>
                <div className="space-y-3">
                  {systems.map((system) => (
                    <div key={system.id} className="p-3 bg-muted rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium">{system.name}</span>
                        <span className="text-sm text-muted-foreground">{system.avgSyncTime}秒</span>
                      </div>
                      <Progress value={Math.min((system.avgSyncTime / 120) * 100, 100)} className="h-2" />
                      <div className="text-xs text-muted-foreground mt-1">
                        同步效率: {system.avgSyncTime < 60 ? "优秀" : system.avgSyncTime < 90 ? "良好" : "需优化"}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-3">错误统计</h3>
                <div className="space-y-3">
                  {systems
                    .filter((s) => s.errorCount > 0)
                    .map((system) => (
                      <div key={system.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{system.name}</span>
                          <span className="text-red-600 font-medium">{system.errorCount} 错误</span>
                        </div>
                        <div className="text-sm text-red-600 mt-1">
                          错误率: {((system.errorCount / system.totalRecords) * 100).toFixed(3)}%
                        </div>
                      </div>
                    ))}
                  {systems.filter((s) => s.errorCount > 0).length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <CheckCircle className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                      <div>所有系统运行正常，无错误记录</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
