"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import {
  Smartphone,
  Watch,
  Activity,
  Heart,
  Footprints,
  Moon,
  Wifi,
  WifiOff,
  Battery,
  Settings,
  FolderSyncIcon as Sync,
  Plus,
  Trash2,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

interface WearableDevice {
  id: string
  name: string
  type: "smartwatch" | "fitness_tracker" | "heart_monitor" | "glucose_monitor" | "blood_pressure"
  brand: string
  model: string
  batteryLevel: number
  connectionStatus: "connected" | "disconnected" | "syncing"
  lastSync: string
  dataTypes: string[]
  isActive: boolean
}

interface DeviceData {
  deviceId: string
  timestamp: string
  heartRate?: number
  steps?: number
  calories?: number
  sleepHours?: number
  bloodPressure?: { systolic: number; diastolic: number }
  bloodGlucose?: number
  oxygenSaturation?: number
}

export function WearableDeviceIntegration() {
  const [devices, setDevices] = useState<WearableDevice[]>([
    {
      id: "1",
      name: "Apple Watch Series 9",
      type: "smartwatch",
      brand: "Apple",
      model: "Series 9",
      batteryLevel: 85,
      connectionStatus: "connected",
      lastSync: "2024-01-15 14:30:00",
      dataTypes: ["heart_rate", "steps", "calories", "sleep", "oxygen_saturation"],
      isActive: true,
    },
    {
      id: "2",
      name: "小米手环8",
      type: "fitness_tracker",
      brand: "小米",
      model: "Mi Band 8",
      batteryLevel: 92,
      connectionStatus: "connected",
      lastSync: "2024-01-15 14:25:00",
      dataTypes: ["heart_rate", "steps", "calories", "sleep"],
      isActive: true,
    },
    {
      id: "3",
      name: "欧姆龙血压计",
      type: "blood_pressure",
      brand: "欧姆龙",
      model: "HEM-7136",
      batteryLevel: 45,
      connectionStatus: "disconnected",
      lastSync: "2024-01-14 08:15:00",
      dataTypes: ["blood_pressure"],
      isActive: false,
    },
  ])

  const [recentData, setRecentData] = useState<DeviceData[]>([
    {
      deviceId: "1",
      timestamp: "2024-01-15 14:30:00",
      heartRate: 72,
      steps: 8543,
      calories: 2156,
      oxygenSaturation: 98,
    },
    {
      deviceId: "2",
      timestamp: "2024-01-15 14:25:00",
      heartRate: 75,
      steps: 8521,
      calories: 2134,
      sleepHours: 7.5,
    },
    {
      deviceId: "3",
      timestamp: "2024-01-14 08:15:00",
      bloodPressure: { systolic: 125, diastolic: 82 },
    },
  ])

  const [activeTab, setActiveTab] = useState("devices")
  const [isSyncing, setIsSyncing] = useState(false)

  const getDeviceIcon = (type: string) => {
    switch (type) {
      case "smartwatch":
        return <Watch className="h-5 w-5" />
      case "fitness_tracker":
        return <Activity className="h-5 w-5" />
      case "heart_monitor":
        return <Heart className="h-5 w-5" />
      case "blood_pressure":
        return <Activity className="h-5 w-5" />
      case "glucose_monitor":
        return <Activity className="h-5 w-5" />
      default:
        return <Smartphone className="h-5 w-5" />
    }
  }

  const getConnectionIcon = (status: string) => {
    switch (status) {
      case "connected":
        return <Wifi className="h-4 w-4 text-green-500" />
      case "disconnected":
        return <WifiOff className="h-4 w-4 text-red-500" />
      case "syncing":
        return <Sync className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <WifiOff className="h-4 w-4 text-gray-500" />
    }
  }

  const getBatteryColor = (level: number) => {
    if (level > 50) return "text-green-500"
    if (level > 20) return "text-amber-500"
    return "text-red-500"
  }

  const syncDevice = async (deviceId: string) => {
    setIsSyncing(true)
    setDevices(devices.map((device) => (device.id === deviceId ? { ...device, connectionStatus: "syncing" } : device)))

    // 模拟同步过程
    setTimeout(() => {
      setDevices(
        devices.map((device) =>
          device.id === deviceId
            ? {
                ...device,
                connectionStatus: "connected",
                lastSync: new Date().toLocaleString(),
              }
            : device,
        ),
      )
      setIsSyncing(false)
    }, 2000)
  }

  const toggleDevice = (deviceId: string) => {
    setDevices(devices.map((device) => (device.id === deviceId ? { ...device, isActive: !device.isActive } : device)))
  }

  const removeDevice = (deviceId: string) => {
    setDevices(devices.filter((device) => device.id !== deviceId))
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Watch className="h-5 w-5" />
          可穿戴设备集成
        </CardTitle>
        <CardDescription>连接和管理各种健康监测设备，实时同步健康数据</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid grid-cols-4">
            <TabsTrigger value="devices">设备管理</TabsTrigger>
            <TabsTrigger value="data">数据同步</TabsTrigger>
            <TabsTrigger value="analytics">数据分析</TabsTrigger>
            <TabsTrigger value="settings">同步设置</TabsTrigger>
          </TabsList>

          <TabsContent value="devices" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">已连接设备</h3>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                添加设备
              </Button>
            </div>

            <div className="grid gap-4">
              {devices.map((device) => (
                <Card key={device.id}>
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        {getDeviceIcon(device.type)}
                        <div>
                          <h4 className="font-medium">{device.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {device.brand} {device.model}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {getConnectionIcon(device.connectionStatus)}
                        <Switch checked={device.isActive} onCheckedChange={() => toggleDevice(device.id)} />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <Label className="text-sm">连接状态</Label>
                        <Badge
                          variant={
                            device.connectionStatus === "connected"
                              ? "default"
                              : device.connectionStatus === "syncing"
                                ? "secondary"
                                : "destructive"
                          }
                        >
                          {device.connectionStatus === "connected"
                            ? "已连接"
                            : device.connectionStatus === "syncing"
                              ? "同步中"
                              : "未连接"}
                        </Badge>
                      </div>
                      <div>
                        <Label className="text-sm">电池电量</Label>
                        <div className="flex items-center gap-2">
                          <Battery className={`h-4 w-4 ${getBatteryColor(device.batteryLevel)}`} />
                          <span className="text-sm font-medium">{device.batteryLevel}%</span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm">最后同步</Label>
                        <p className="text-sm font-medium">{device.lastSync}</p>
                      </div>
                      <div>
                        <Label className="text-sm">数据类型</Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {device.dataTypes.slice(0, 2).map((type) => (
                            <Badge key={type} variant="outline" className="text-xs">
                              {type === "heart_rate"
                                ? "心率"
                                : type === "steps"
                                  ? "步数"
                                  : type === "calories"
                                    ? "卡路里"
                                    : type === "sleep"
                                      ? "睡眠"
                                      : type}
                            </Badge>
                          ))}
                          {device.dataTypes.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{device.dataTypes.length - 2}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => syncDevice(device.id)}
                        disabled={isSyncing || device.connectionStatus === "syncing"}
                      >
                        <Sync className="h-4 w-4 mr-1" />
                        同步数据
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Settings className="h-4 w-4 mr-1" />
                        设置
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDevice(device.id)}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        移除
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="data" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">最新同步数据</h3>
              <Button variant="outline" onClick={() => syncDevice("all")} disabled={isSyncing}>
                <Sync className="h-4 w-4 mr-1" />
                全部同步
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Heart className="h-4 w-4 text-red-500" />
                    心率
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">72 bpm</div>
                  <p className="text-xs text-muted-foreground">2分钟前更新</p>
                  <Progress value={72} variant="success" className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Footprints className="h-4 w-4 text-blue-500" />
                    步数
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">8,543</div>
                  <p className="text-xs text-muted-foreground">今日目标: 10,000</p>
                  <Progress value={85} variant="info" className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Activity className="h-4 w-4 text-orange-500" />
                    卡路里
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">2,156</div>
                  <p className="text-xs text-muted-foreground">今日消耗</p>
                  <Progress value={68} variant="warning" className="h-2 mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <Moon className="h-4 w-4 text-purple-500" />
                    睡眠
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">7.5h</div>
                  <p className="text-xs text-muted-foreground">昨晚睡眠</p>
                  <Progress value={94} variant="success" className="h-2 mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>同步状态</CardTitle>
                <CardDescription>各设备数据同步状态和历史记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {devices.map((device) => {
                    const deviceData = recentData.find((data) => data.deviceId === device.id)
                    return (
                      <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center gap-3">
                          {getDeviceIcon(device.type)}
                          <div>
                            <h4 className="font-medium">{device.name}</h4>
                            <p className="text-sm text-muted-foreground">最后同步: {device.lastSync}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {device.connectionStatus === "connected" ? (
                            <CheckCircle className="h-5 w-5 text-green-500" />
                          ) : (
                            <AlertCircle className="h-5 w-5 text-red-500" />
                          )}
                          <Badge variant={device.connectionStatus === "connected" ? "default" : "destructive"}>
                            {device.connectionStatus === "connected" ? "同步正常" : "同步异常"}
                          </Badge>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>设备数据分析</CardTitle>
                <CardDescription>基于可穿戴设备数据的健康分析</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] flex items-center justify-center bg-slate-50 rounded-md border border-dashed">
                  <div className="text-center">
                    <Activity className="h-16 w-16 text-medical-600 opacity-50 mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">设备数据分析图表</h3>
                    <p className="text-muted-foreground max-w-md">
                      此处将显示基于可穿戴设备数据的健康分析图表，包括心率变异性、活动模式、睡眠质量等分析。
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">健康评分</CardTitle>
                  <CardDescription>基于设备数据的综合健康评分</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 mb-2">85</div>
                    <p className="text-sm text-muted-foreground">健康状况良好</p>
                    <Progress value={85} variant="success" className="mt-4" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">活动建议</CardTitle>
                  <CardDescription>基于数据分析的个性化建议</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">保持当前运动量</div>
                        <div className="text-muted-foreground">您的日常活动量达标</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">改善睡眠质量</div>
                        <div className="text-muted-foreground">建议提前30分钟入睡</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
                      <div className="text-sm">
                        <div className="font-medium">心率变异性正常</div>
                        <div className="text-muted-foreground">心血管健康状况良好</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>同步设置</CardTitle>
                <CardDescription>配置设备数据同步的频率和方式</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>自动同步</Label>
                    <p className="text-sm text-muted-foreground">设备连接时自动同步数据</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>同步频率</Label>
                  <Select defaultValue="15">
                    <SelectTrigger>
                      <SelectValue placeholder="选择同步频率" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">每5分钟</SelectItem>
                      <SelectItem value="15">每15分钟</SelectItem>
                      <SelectItem value="30">每30分钟</SelectItem>
                      <SelectItem value="60">每小时</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>后台同步</Label>
                    <p className="text-sm text-muted-foreground">应用在后台时继续同步数据</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>低电量保护</Label>
                    <p className="text-sm text-muted-foreground">设备电量低于20%时暂停同步</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="space-y-2">
                  <Label>数据保留期限</Label>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue placeholder="选择数据保留期限" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30天</SelectItem>
                      <SelectItem value="90">90天</SelectItem>
                      <SelectItem value="180">180天</SelectItem>
                      <SelectItem value="365">1年</SelectItem>
                      <SelectItem value="forever">永久保留</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>数据压缩</Label>
                    <p className="text-sm text-muted-foreground">压缩历史数据以节省存储空间</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>隐私设置</CardTitle>
                <CardDescription>管理健康数据的隐私和共享设置</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>匿名化数据</Label>
                    <p className="text-sm text-muted-foreground">在分析中使用匿名化的健康数据</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>数据导出</Label>
                    <p className="text-sm text-muted-foreground">允许导出个人健康数据</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>第三方共享</Label>
                    <p className="text-sm text-muted-foreground">与授权的第三方应用共享数据</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
