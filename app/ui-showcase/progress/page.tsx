"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Heart,
  Activity,
  Cpu,
  HardDrive,
  Battery,
  Wifi,
  RefreshCw,
  TrendingUp,
  AlertCircle,
  CheckCircle,
} from "lucide-react"

export default function ProgressShowcasePage() {
  const [values, setValues] = useState({
    heartRate: 72,
    steps: 85,
    cpu: 45,
    memory: 62,
    disk: 38,
    battery: 78,
    network: 92,
    upload: 0,
  })

  const [isUploading, setIsUploading] = useState(false)

  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setValues((prev) => ({
          ...prev,
          upload: prev.upload >= 100 ? 0 : prev.upload + 2,
        }))
      }, 100)
      return () => clearInterval(interval)
    }
  }, [isUploading])

  const simulateRandomValues = () => {
    setValues({
      heartRate: Math.floor(Math.random() * 40) + 60,
      steps: Math.floor(Math.random() * 50) + 50,
      cpu: Math.floor(Math.random() * 60) + 20,
      memory: Math.floor(Math.random() * 50) + 30,
      disk: Math.floor(Math.random() * 40) + 20,
      battery: Math.floor(Math.random() * 50) + 50,
      network: Math.floor(Math.random() * 30) + 70,
      upload: 0,
    })
  }

  const getVariantByValue = (value: number) => {
    if (value >= 80) return "danger"
    if (value >= 60) return "warning"
    if (value >= 40) return "info"
    return "success"
  }

  return (
    <div className="container mx-auto py-8 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">医疗进度条展示</h1>
          <p className="text-blue-600">医疗机构专用进度条组件，拒绝黑色，采用医疗色彩系统</p>
        </div>
        <div className="flex gap-2">
          <Button variant="medical-blue" onClick={simulateRandomValues} className="btn-3d-medical btn-medical-blue">
            <RefreshCw className="mr-2 h-4 w-4 btn-icon-3d" />
            随机数据
          </Button>
          <Button
            variant={isUploading ? "medical-outline" : "medical-white"}
            onClick={() => setIsUploading(!isUploading)}
            className="btn-3d-medical"
          >
            {isUploading ? "停止上传" : "模拟上传"}
          </Button>
        </div>
      </div>

      {/* 医疗健康指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Heart className="h-5 w-5 text-red-500" />
            健康监测指标
          </CardTitle>
          <CardDescription>患者生命体征和健康数据进度条</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span className="text-sm font-medium">心率</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{values.heartRate} bpm</span>
                  <Badge variant="outline" className="text-xs">
                    正常
                  </Badge>
                </div>
              </div>
              <Progress value={values.heartRate} variant="success" className="h-3" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">步数完成度</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{values.steps}%</span>
                  <Badge variant="outline" className="text-xs">
                    目标10000步
                  </Badge>
                </div>
              </div>
              <Progress value={values.steps} variant="info" className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 系统性能指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-blue-500" />
            系统性能监控
          </CardTitle>
          <CardDescription>服务器资源使用情况，智能色彩提示</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cpu className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">CPU使用率</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{values.cpu}%</span>
                  {values.cpu > 80 ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
              <Progress value={values.cpu} variant={getVariantByValue(values.cpu)} className="h-3" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium">内存使用率</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{values.memory}%</span>
                  {values.memory > 80 ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
              <Progress value={values.memory} variant={getVariantByValue(values.memory)} className="h-3" />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-purple-600" />
                  <span className="text-sm font-medium">磁盘使用率</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{values.disk}%</span>
                  {values.disk > 80 ? (
                    <AlertCircle className="h-4 w-4 text-red-500" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-green-500" />
                  )}
                </div>
              </div>
              <Progress value={values.disk} variant={getVariantByValue(values.disk)} className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 设备状态指标 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <Battery className="h-5 w-5 text-green-500" />
            设备状态监控
          </CardTitle>
          <CardDescription>医疗设备电池和网络状态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium">设备电量</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{values.battery}%</span>
                  <Badge variant={values.battery > 50 ? "default" : "destructive"} className="text-xs">
                    {values.battery > 50 ? "充足" : "低电量"}
                  </Badge>
                </div>
              </div>
              <Progress
                value={values.battery}
                variant={values.battery > 50 ? "success" : values.battery > 20 ? "warning" : "danger"}
                className="h-3"
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium">网络信号</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{values.network}%</span>
                  <Badge variant="default" className="text-xs">
                    优秀
                  </Badge>
                </div>
              </div>
              <Progress value={values.network} variant="success" className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 上传进度演示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-500" />
            文件上传进度
          </CardTitle>
          <CardDescription>医疗文件上传进度条动画演示</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">医疗影像上传</span>
              <span className="text-sm font-medium">{values.upload}%</span>
            </div>
            <Progress value={values.upload} variant="info" className="h-4" />
            <p className="text-xs text-muted-foreground">
              {isUploading ? "正在上传医疗影像文件..." : "点击上方按钮开始模拟上传"}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 色彩变体展示 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">医疗色彩系统</CardTitle>
          <CardDescription>不同状态的进度条色彩变体，拒绝使用黑色</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">成功状态</span>
                <Badge className="bg-green-100 text-green-800">正常</Badge>
              </div>
              <Progress value={75} variant="success" className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">信息状态</span>
                <Badge className="bg-blue-100 text-blue-800">处理中</Badge>
              </div>
              <Progress value={60} variant="info" className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">警告状态</span>
                <Badge className="bg-amber-100 text-amber-800">注意</Badge>
              </div>
              <Progress value={85} variant="warning" className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">危险状态</span>
                <Badge className="bg-red-100 text-red-800">异常</Badge>
              </div>
              <Progress value={95} variant="danger" className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">医疗主题</span>
                <Badge className="bg-blue-100 text-blue-800">医疗</Badge>
              </div>
              <Progress value={70} variant="medical" className="h-3" />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">默认状态</span>
                <Badge variant="outline">标准</Badge>
              </div>
              <Progress value={50} variant="default" className="h-3" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
