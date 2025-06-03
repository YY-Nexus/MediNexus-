"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Users,
  Settings,
  Shield,
  Activity,
  Database,
  Server,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  FileText,
  Monitor,
  HardDrive,
  Cpu,
  RefreshCw,
  Download,
  Upload,
  Eye,
  Plus,
  Search,
  Filter,
} from "lucide-react"

export default function AdminDashboard() {
  const [systemStats, setSystemStats] = useState({
    totalUsers: 1247,
    activeUsers: 892,
    systemUptime: 99.8,
    cpuUsage: 45,
    memoryUsage: 62,
    diskUsage: 38,
    networkStatus: "正常",
    lastBackup: "2024-01-24 02:00",
    pendingUpdates: 3,
    securityAlerts: 1,
  })

  const [loading, setLoading] = useState(false)

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="space-y-6 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-800">系统管理中心</h1>
          <p className="text-blue-600">医枢系统运行状态监控与管理</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="medical-white"
            onClick={handleRefresh}
            disabled={loading}
            className="btn-3d-medical btn-medical-white"
          >
            <RefreshCw className={`mr-2 h-4 w-4 btn-icon-3d ${loading ? "animate-spin" : ""}`} />
            刷新数据
          </Button>
          <Button variant="medical-blue" className="btn-3d-medical btn-medical-blue" asChild>
            <Link href="/admin/settings">
              <Settings className="mr-2 h-4 w-4 btn-icon-3d" />
              系统设置
            </Link>
          </Button>
        </div>
      </div>

      {/* 系统状态概览 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">总用户数</p>
                <p className="text-2xl font-bold text-blue-800">{systemStats.totalUsers}</p>
                <p className="text-xs text-green-600">活跃用户：{systemStats.activeUsers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Server className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">系统运行时间</p>
                <p className="text-2xl font-bold text-blue-800">{systemStats.systemUptime}%</p>
                <p className="text-xs text-green-600">运行正常</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">安全警报</p>
                <p className="text-2xl font-bold text-blue-800">{systemStats.securityAlerts}</p>
                <p className="text-xs text-orange-600">需要关注</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Database className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">待处理更新</p>
                <p className="text-2xl font-bold text-blue-800">{systemStats.pendingUpdates}</p>
                <p className="text-xs text-purple-600">系统更新</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 系统性能监控 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">系统性能监控</CardTitle>
          <CardDescription>实时系统资源使用情况</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Cpu className="h-4 w-4 text-blue-600 mr-2" />
                  <span className="text-sm font-medium">CPU使用率</span>
                </div>
                <span className="text-sm font-medium">{systemStats.cpuUsage}%</span>
              </div>
              <Progress
                value={systemStats.cpuUsage}
                variant={systemStats.cpuUsage > 80 ? "danger" : systemStats.cpuUsage > 60 ? "warning" : "success"}
                className="w-full h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Monitor className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-sm font-medium">内存使用率</span>
                </div>
                <span className="text-sm font-medium">{systemStats.memoryUsage}%</span>
              </div>
              <Progress
                value={systemStats.memoryUsage}
                variant={systemStats.memoryUsage > 80 ? "danger" : systemStats.memoryUsage > 60 ? "warning" : "success"}
                className="w-full h-2"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <HardDrive className="h-4 w-4 text-purple-600 mr-2" />
                  <span className="text-sm font-medium">磁盘使用率</span>
                </div>
                <span className="text-sm font-medium">{systemStats.diskUsage}%</span>
              </div>
              <Progress
                value={systemStats.diskUsage}
                variant={systemStats.diskUsage > 80 ? "danger" : systemStats.diskUsage > 60 ? "warning" : "success"}
                className="w-full h-2"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">用户管理</CardTitle>
            <CardDescription>管理系统用户和权限</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="medical-blue" className="w-full btn-3d-medical btn-medical-blue" asChild>
              <Link href="/admin/users">
                <Users className="mr-2 h-4 w-4 btn-icon-3d" />
                用户列表
              </Link>
            </Button>
            <Button variant="medical-white" className="w-full btn-3d-medical btn-medical-white" asChild>
              <Link href="/admin/roles">
                <Shield className="mr-2 h-4 w-4 btn-icon-3d" />
                角色权限
              </Link>
            </Button>
            <Button variant="medical-outline" className="w-full btn-3d-medical btn-medical-outline">
              <Plus className="mr-2 h-4 w-4 btn-icon-3d" />
              添加用户
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">系统监控</CardTitle>
            <CardDescription>监控系统运行状态</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="medical-blue" className="w-full btn-3d-medical btn-medical-blue" asChild>
              <Link href="/admin/system-health">
                <Activity className="mr-2 h-4 w-4 btn-icon-3d" />
                系统健康
              </Link>
            </Button>
            <Button variant="medical-white" className="w-full btn-3d-medical btn-medical-white" asChild>
              <Link href="/admin/logs">
                <FileText className="mr-2 h-4 w-4 btn-icon-3d" />
                系统日志
              </Link>
            </Button>
            <Button variant="medical-outline" className="w-full btn-3d-medical btn-medical-outline" asChild>
              <Link href="/admin/performance-optimization">
                <TrendingUp className="mr-2 h-4 w-4 btn-icon-3d" />
                性能优化
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">数据管理</CardTitle>
            <CardDescription>备份和数据维护</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="medical-blue" className="w-full btn-3d-medical btn-medical-blue">
              <Download className="mr-2 h-4 w-4 btn-icon-3d" />
              数据备份
            </Button>
            <Button variant="medical-white" className="w-full btn-3d-medical btn-medical-white">
              <Upload className="mr-2 h-4 w-4 btn-icon-3d" />
              数据恢复
            </Button>
            <Button variant="medical-outline" className="w-full btn-3d-medical btn-medical-outline" asChild>
              <Link href="/admin/analytics">
                <BarChart3 className="mr-2 h-4 w-4 btn-icon-3d" />
                数据分析
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* 最近活动 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-blue-800">最近活动</CardTitle>
              <CardDescription>系统最新操作记录</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="medical-white" size="sm" className="btn-3d-medical btn-medical-white btn-size-sm">
                <Search className="mr-2 h-3 w-3 btn-icon-3d" />
                搜索
              </Button>
              <Button variant="medical-white" size="sm" className="btn-3d-medical btn-medical-white btn-size-sm">
                <Filter className="mr-2 h-3 w-3 btn-icon-3d" />
                筛选
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">系统备份完成</p>
                <p className="text-xs text-blue-600">2024-01-24 02:00 - 自动备份任务执行成功</p>
              </div>
              <Button variant="medical-outline" size="sm" className="btn-3d-medical btn-medical-outline btn-size-sm">
                <Eye className="h-3 w-3 btn-icon-3d" />
              </Button>
            </div>
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">安全警报</p>
                <p className="text-xs text-blue-600">2024-01-24 01:30 - 检测到异常登录尝试</p>
              </div>
              <Button variant="medical-outline" size="sm" className="btn-3d-medical btn-medical-outline btn-size-sm">
                <Eye className="h-3 w-3 btn-icon-3d" />
              </Button>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="h-5 w-5 text-blue-600 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm font-medium text-blue-800">系统维护</p>
                <p className="text-xs text-blue-600">2024-01-23 23:00 - 定期维护任务开始</p>
              </div>
              <Button variant="medical-outline" size="sm" className="btn-3d-medical btn-medical-outline btn-size-sm">
                <Eye className="h-3 w-3 btn-icon-3d" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
