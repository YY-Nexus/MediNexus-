"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  WifiOff,
  Wifi,
  Database,
  Download,
  Upload,
  FolderSyncIcon as Sync,
  HardDrive,
  CheckCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  FileText,
  ImageIcon,
  Video,
  Archive,
  Trash2,
  Settings,
} from "lucide-react"

// 模拟离线数据
const offlineData = {
  status: "online",
  lastSync: "2025-01-24 15:30:25",
  storageUsed: 245.7, // MB
  storageLimit: 1024, // MB
  pendingSync: 12,
  conflictCount: 2,
  cacheHitRate: 87.5,
}

const offlineModules = [
  {
    id: "patient-records",
    name: "患者记录",
    icon: <FileText className="w-5 h-5" />,
    enabled: true,
    size: 89.2,
    lastUpdate: "2025-01-24 14:20",
    syncStatus: "synced",
    priority: "high",
  },
  {
    id: "medical-images",
    name: "医学影像",
    icon: <ImageIcon className="w-5 h-5" />,
    enabled: true,
    size: 156.8,
    lastUpdate: "2025-01-24 13:45",
    syncStatus: "pending",
    priority: "medium",
  },
  {
    id: "drug-database",
    name: "药物数据库",
    icon: <Database className="w-5 h-5" />,
    enabled: true,
    size: 45.3,
    lastUpdate: "2025-01-24 12:30",
    syncStatus: "synced",
    priority: "high",
  },
  {
    id: "training-videos",
    name: "培训视频",
    icon: <Video className="w-5 h-5" />,
    enabled: false,
    size: 0,
    lastUpdate: "-",
    syncStatus: "disabled",
    priority: "low",
  },
]

const syncQueue = [
  {
    id: "sync-1",
    type: "upload",
    module: "患者记录",
    fileName: "patient_001_diagnosis.json",
    size: "2.3 KB",
    progress: 75,
    status: "uploading",
  },
  {
    id: "sync-2",
    type: "download",
    module: "医学影像",
    fileName: "ct_scan_20250124.dcm",
    size: "45.7 MB",
    progress: 30,
    status: "downloading",
  },
  {
    id: "sync-3",
    type: "upload",
    module: "诊断报告",
    fileName: "diagnosis_report_002.pdf",
    size: "1.8 MB",
    progress: 0,
    status: "queued",
  },
]

const conflictItems = [
  {
    id: "conflict-1",
    type: "patient-record",
    fileName: "patient_005_record.json",
    localModified: "2025-01-24 14:30",
    serverModified: "2025-01-24 14:35",
    conflictType: "data",
  },
  {
    id: "conflict-2",
    type: "diagnosis",
    fileName: "diagnosis_report_003.json",
    localModified: "2025-01-24 13:20",
    serverModified: "2025-01-24 13:25",
    conflictType: "version",
  },
]

export function OfflineSupport() {
  const [isOnline, setIsOnline] = useState(true)
  const [syncProgress, setSyncProgress] = useState(0)
  const [isSyncing, setIsSyncing] = useState(false)

  // 模拟网络状态变化
  useEffect(() => {
    const interval = setInterval(() => {
      // 随机模拟网络状态变化（5%概率）
      if (Math.random() < 0.05) {
        setIsOnline((prev) => !prev)
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // 模拟同步进度
  useEffect(() => {
    if (isSyncing) {
      const interval = setInterval(() => {
        setSyncProgress((prev) => {
          if (prev >= 100) {
            setIsSyncing(false)
            return 100
          }
          return prev + Math.random() * 15
        })
      }, 500)
      return () => clearInterval(interval)
    }
  }, [isSyncing])

  const startSync = () => {
    setIsSyncing(true)
    setSyncProgress(0)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "synced":
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case "pending":
        return <Clock className="w-4 h-4 text-amber-500" />
      case "uploading":
      case "downloading":
        return <RefreshCw className="w-4 h-4 text-blue-500 animate-spin" />
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-500" />
      case "disabled":
        return <WifiOff className="w-4 h-4 text-gray-400" />
      default:
        return <Clock className="w-4 h-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "synced":
        return <Badge className="bg-green-500">已同步</Badge>
      case "pending":
        return <Badge className="bg-amber-500">待同步</Badge>
      case "uploading":
        return <Badge className="bg-blue-500">上传中</Badge>
      case "downloading":
        return <Badge className="bg-blue-500">下载中</Badge>
      case "queued":
        return <Badge variant="outline">队列中</Badge>
      case "error":
        return <Badge className="bg-red-500">错误</Badge>
      case "disabled":
        return <Badge variant="outline">已禁用</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge className="bg-red-500">高</Badge>
      case "medium":
        return <Badge className="bg-amber-500">中</Badge>
      case "low":
        return <Badge variant="outline">低</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">离线功能支持</h2>
          <p className="text-muted-foreground">本地数据存储、离线访问和智能同步管理</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            {isOnline ? <Wifi className="w-5 h-5 text-green-500" /> : <WifiOff className="w-5 h-5 text-red-500" />}
            <span className="text-sm font-medium">{isOnline ? "在线" : "离线"}</span>
          </div>
          <Button onClick={startSync} disabled={isSyncing || !isOnline}>
            <Sync className="w-4 h-4 mr-2" />
            {isSyncing ? "同步中..." : "立即同步"}
          </Button>
        </div>
      </div>

      {/* 状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">存储使用</p>
                <p className="text-2xl font-bold">{offlineData.storageUsed} MB</p>
              </div>
              <HardDrive className="w-8 h-8 text-blue-500" />
            </div>
            <Progress value={(offlineData.storageUsed / offlineData.storageLimit) * 100} className="mt-2" />
            <p className="text-xs text-muted-foreground mt-1">{offlineData.storageLimit} MB 总容量</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">待同步项目</p>
                <p className="text-2xl font-bold">{offlineData.pendingSync}</p>
              </div>
              <Clock className="w-8 h-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">冲突项目</p>
                <p className="text-2xl font-bold">{offlineData.conflictCount}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">缓存命中率</p>
                <p className="text-2xl font-bold">{offlineData.cacheHitRate}%</p>
              </div>
              <Database className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">离线模块</TabsTrigger>
          <TabsTrigger value="sync">同步队列</TabsTrigger>
          <TabsTrigger value="conflicts">冲突解决</TabsTrigger>
          <TabsTrigger value="settings">离线设置</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {offlineModules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {module.icon}
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(module.syncStatus)}
                      {getStatusBadge(module.syncStatus)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">存储大小</div>
                      <div className="font-medium">{module.size} MB</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">优先级</div>
                      <div>{getPriorityBadge(module.priority)}</div>
                    </div>
                    <div className="col-span-2">
                      <div className="text-muted-foreground">最后更新</div>
                      <div className="font-medium">{module.lastUpdate}</div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Switch id={`offline-${module.id}`} checked={module.enabled} onCheckedChange={() => {}} />
                      <Label htmlFor={`offline-${module.id}`}>启用离线访问</Label>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4 mr-1" />
                        下载
                      </Button>
                      <Button size="sm" variant="outline">
                        <Trash2 className="w-4 h-4 mr-1" />
                        清理
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {isSyncing && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  同步进度
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>正在同步离线数据...</span>
                    <span>{Math.round(syncProgress)}%</span>
                  </div>
                  <Progress value={syncProgress} className="w-full" />
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="sync" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>同步队列</CardTitle>
              <p className="text-sm text-muted-foreground">当前有 {syncQueue.length} 个项目在同步队列中</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {syncQueue.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      {item.type === "upload" ? (
                        <Upload className="w-5 h-5 text-blue-500" />
                      ) : (
                        <Download className="w-5 h-5 text-green-500" />
                      )}
                      <div>
                        <div className="font-medium">{item.fileName}</div>
                        <div className="text-sm text-muted-foreground">
                          {item.module} • {item.size}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {item.status === "uploading" || item.status === "downloading" ? (
                        <div className="flex items-center gap-2">
                          <Progress value={item.progress} className="w-20" />
                          <span className="text-sm">{item.progress}%</span>
                        </div>
                      ) : (
                        getStatusBadge(item.status)
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conflicts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>冲突解决</CardTitle>
              <p className="text-sm text-muted-foreground">发现 {conflictItems.length} 个数据冲突需要处理</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {conflictItems.map((conflict) => (
                  <div key={conflict.id} className="p-4 border rounded-lg bg-amber-50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-amber-500" />
                        <span className="font-medium">{conflict.fileName}</span>
                        <Badge variant="outline">{conflict.conflictType}</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <div className="text-muted-foreground">本地修改时间</div>
                        <div>{conflict.localModified}</div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">服务器修改时间</div>
                        <div>{conflict.serverModified}</div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        使用本地版本
                      </Button>
                      <Button size="sm" variant="outline">
                        使用服务器版本
                      </Button>
                      <Button size="sm">手动合并</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>离线设置</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="auto-sync">自动同步</Label>
                    <p className="text-sm text-muted-foreground">网络可用时自动同步数据</p>
                  </div>
                  <Switch id="auto-sync" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="wifi-only">仅WiFi同步</Label>
                    <p className="text-sm text-muted-foreground">仅在WiFi网络下进行同步</p>
                  </div>
                  <Switch id="wifi-only" defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="background-sync">后台同步</Label>
                    <p className="text-sm text-muted-foreground">应用在后台时继续同步</p>
                  </div>
                  <Switch id="background-sync" />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="compress-data">数据压缩</Label>
                    <p className="text-sm text-muted-foreground">压缩数据以节省存储空间</p>
                  </div>
                  <Switch id="compress-data" defaultChecked />
                </div>
              </div>

              <div className="pt-4 border-t">
                <div className="flex gap-2">
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    保存设置
                  </Button>
                  <Button variant="outline">
                    <Archive className="w-4 h-4 mr-2" />
                    清理缓存
                  </Button>
                  <Button variant="outline">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    重置设置
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
