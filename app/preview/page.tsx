"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import {
  Eye,
  Download,
  Share,
  RefreshCw,
  CheckCircle,
  Info,
  Clock,
  Users,
  FileText,
  Activity,
  TrendingUp,
  Heart,
  Brain,
  Stethoscope,
} from "lucide-react"

interface PreviewData {
  patients: {
    total: number
    active: number
    critical: number
    newToday: number
  }
  diagnoses: {
    total: number
    aiAssisted: number
    accuracy: number
    pending: number
  }
  system: {
    uptime: string
    performance: number
    errors: number
    lastUpdate: string
  }
}

export default function PreviewPage() {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  // 模拟数据加载
  useEffect(() => {
    const loadPreviewData = () => {
      setTimeout(() => {
        setPreviewData({
          patients: {
            total: 1247,
            active: 892,
            critical: 23,
            newToday: 15,
          },
          diagnoses: {
            total: 3456,
            aiAssisted: 2890,
            accuracy: 94.2,
            pending: 12,
          },
          system: {
            uptime: "99.8%",
            performance: 87,
            errors: 3,
            lastUpdate: "2024-01-24 14:30:00",
          },
        })
        setLoading(false)
        setRefreshing(false)
      }, 1000)
    }

    loadPreviewData()
  }, [])

  const handleRefresh = () => {
    setRefreshing(true)
    // 重新加载数据
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const handleExport = () => {
    // 导出预览数据
    console.log("导出预览数据")
  }

  const handleShare = () => {
    // 分享预览链接
    console.log("分享预览")
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">正在加载预览数据...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center gap-2">
            <Eye className="h-8 w-8 text-blue-600" />
            系统预览
          </h1>
          <p className="text-muted-foreground">医枢系统实时状态和数据概览</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="medical-white"
            onClick={handleRefresh}
            disabled={refreshing}
            className="btn-3d-medical btn-medical-white"
          >
            <RefreshCw className={`mr-2 h-4 w-4 btn-icon-3d ${refreshing ? "animate-spin" : ""}`} />
            刷新
          </Button>
          <Button variant="medical-white" onClick={handleExport} className="btn-3d-medical btn-medical-white">
            <Download className="mr-2 h-4 w-4 btn-icon-3d" />
            导出
          </Button>
          <Button variant="medical-white" onClick={handleShare} className="btn-3d-medical btn-medical-white">
            <Share className="mr-2 h-4 w-4 btn-icon-3d" />
            分享
          </Button>
        </div>
      </div>

      {/* 系统状态警告 */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>系统状态</AlertTitle>
        <AlertDescription>
          系统运行正常，所有核心功能可用。最后更新时间：{previewData?.system.lastUpdate}
        </AlertDescription>
      </Alert>

      {/* 核心指标卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">总患者数</p>
                <p className="text-2xl font-bold">{previewData?.patients.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">活跃患者：{previewData?.patients.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Brain className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">AI诊断</p>
                <p className="text-2xl font-bold">{previewData?.diagnoses.total.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">准确率：{previewData?.diagnoses.accuracy}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">紧急患者</p>
                <p className="text-2xl font-bold">{previewData?.patients.critical}</p>
                <p className="text-xs text-muted-foreground">需要立即关注</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">系统性能</p>
                <p className="text-2xl font-bold">{previewData?.system.performance}%</p>
                <p className="text-xs text-muted-foreground">运行时间：{previewData?.system.uptime}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细数据标签页 */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">概览</TabsTrigger>
          <TabsTrigger value="patients">患者</TabsTrigger>
          <TabsTrigger value="diagnoses">诊断</TabsTrigger>
          <TabsTrigger value="system">系统</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>今日概况</CardTitle>
                <CardDescription>今日系统使用情况统计</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">新增患者</span>
                  <Badge>{previewData?.patients.newToday}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">待处理诊断</span>
                  <Badge variant="secondary">{previewData?.diagnoses.pending}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">系统错误</span>
                  <Badge variant={previewData?.system.errors === 0 ? "default" : "destructive"}>
                    {previewData?.system.errors}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>性能指标</CardTitle>
                <CardDescription>系统性能实时监控</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">CPU使用率</span>
                    <span className="text-sm font-medium">45%</span>
                  </div>
                  <Progress value={45} className="w-full" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">内存使用率</span>
                    <span className="text-sm font-medium">62%</span>
                  </div>
                  <Progress value={62} className="w-full" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">磁盘使用率</span>
                    <span className="text-sm font-medium">38%</span>
                  </div>
                  <Progress value={38} className="w-full" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="patients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>患者统计</CardTitle>
              <CardDescription>患者数据详细分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{previewData?.patients.total}</p>
                  <p className="text-sm text-muted-foreground">总患者数</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{previewData?.patients.active}</p>
                  <p className="text-sm text-muted-foreground">活跃患者</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-600">{previewData?.patients.critical}</p>
                  <p className="text-sm text-muted-foreground">紧急患者</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{previewData?.patients.newToday}</p>
                  <p className="text-sm text-muted-foreground">今日新增</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="diagnoses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>诊断统计</CardTitle>
              <CardDescription>AI诊断系统使用情况</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-600">{previewData?.diagnoses.total}</p>
                  <p className="text-sm text-muted-foreground">总诊断数</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{previewData?.diagnoses.aiAssisted}</p>
                  <p className="text-sm text-muted-foreground">AI辅助诊断</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-600">{previewData?.diagnoses.accuracy}%</p>
                  <p className="text-sm text-muted-foreground">诊断准确率</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-orange-600">{previewData?.diagnoses.pending}</p>
                  <p className="text-sm text-muted-foreground">待处理</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>系统状态</CardTitle>
                <CardDescription>系统运行状态监控</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">系统运行时间</span>
                  <Badge className="bg-green-100 text-green-800">{previewData?.system.uptime}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">系统性能</span>
                  <div className="flex items-center gap-2">
                    <Progress value={previewData?.system.performance} className="w-20" />
                    <span className="text-sm font-medium">{previewData?.system.performance}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">错误数量</span>
                  <Badge variant={previewData?.system.errors === 0 ? "default" : "destructive"}>
                    {previewData?.system.errors}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>最近更新</CardTitle>
                <CardDescription>系统更新和维护记录</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">系统更新完成</p>
                      <p className="text-xs text-muted-foreground">2024-01-24 14:30</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">定期维护</p>
                      <p className="text-xs text-muted-foreground">2024-01-24 02:00</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-4 w-4 text-purple-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">性能优化</p>
                      <p className="text-xs text-muted-foreground">2024-01-23 16:45</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* 快速操作 */}
      <Card>
        <CardHeader>
          <CardTitle>快速操作</CardTitle>
          <CardDescription>常用功能快速访问</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="medical-blue" className="h-20 flex-col btn-3d-medical btn-medical-blue">
              <Users className="h-6 w-6 mb-2 btn-icon-3d" />
              <span>患者管理</span>
            </Button>
            <Button variant="medical-blue" className="h-20 flex-col btn-3d-medical btn-medical-blue">
              <Brain className="h-6 w-6 mb-2 btn-icon-3d" />
              <span>AI诊断</span>
            </Button>
            <Button variant="medical-blue" className="h-20 flex-col btn-3d-medical btn-medical-blue">
              <FileText className="h-6 w-6 mb-2 btn-icon-3d" />
              <span>病历管理</span>
            </Button>
            <Button variant="medical-blue" className="h-20 flex-col btn-3d-medical btn-medical-blue">
              <Stethoscope className="h-6 w-6 mb-2 btn-icon-3d" />
              <span>临床决策</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
