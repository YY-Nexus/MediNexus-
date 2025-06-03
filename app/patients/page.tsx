"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  FileText,
  Calendar,
  Activity,
  Heart,
  AlertCircle,
  Clock,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"

export default function PatientsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  // 模拟患者数据
  const patients = [
    {
      id: "P001",
      name: "张三",
      age: 45,
      gender: "男",
      phone: "138****1234",
      email: "zhang@example.com",
      status: "活跃",
      lastVisit: "2024-01-20",
      condition: "高血压",
      riskLevel: "中",
    },
    {
      id: "P002",
      name: "李四",
      age: 32,
      gender: "女",
      phone: "139****5678",
      email: "li@example.com",
      status: "随访",
      lastVisit: "2024-01-18",
      condition: "糖尿病",
      riskLevel: "高",
    },
    {
      id: "P003",
      name: "王五",
      age: 28,
      gender: "男",
      phone: "137****9012",
      email: "wang@example.com",
      status: "康复",
      lastVisit: "2024-01-15",
      condition: "感冒",
      riskLevel: "低",
    },
  ]

  const handleRefresh = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "活跃":
        return <Badge className="bg-green-100 text-green-800">活跃</Badge>
      case "随访":
        return <Badge className="bg-blue-100 text-blue-800">随访</Badge>
      case "康复":
        return <Badge className="bg-purple-100 text-purple-800">康复</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getRiskBadge = (level: string) => {
    switch (level) {
      case "高":
        return <Badge className="bg-red-100 text-red-800">高风险</Badge>
      case "中":
        return <Badge className="bg-yellow-100 text-yellow-800">中风险</Badge>
      case "低":
        return <Badge className="bg-green-100 text-green-800">低风险</Badge>
      default:
        return <Badge variant="outline">{level}</Badge>
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-800 flex items-center gap-2">
            <Users className="h-8 w-8 text-blue-600" />
            患者管理
          </h1>
          <p className="text-blue-600">全生命周期患者健康数据管理</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="medical-white"
            onClick={handleRefresh}
            disabled={loading}
            className="btn-3d-medical btn-medical-white"
          >
            <RefreshCw className={`mr-2 h-4 w-4 btn-icon-3d ${loading ? "animate-spin" : ""}`} />
            刷新
          </Button>
          <Button variant="medical-blue" className="btn-3d-medical btn-medical-blue">
            <Plus className="mr-2 h-4 w-4 btn-icon-3d" />
            新增患者
          </Button>
        </div>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Users className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">总患者数</p>
                <p className="text-2xl font-bold text-blue-800">1,247</p>
                <p className="text-xs text-green-600">本月新增 +23</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Activity className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">活跃患者</p>
                <p className="text-2xl font-bold text-blue-800">892</p>
                <p className="text-xs text-blue-600">71.5% 活跃率</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">高风险患者</p>
                <p className="text-2xl font-bold text-blue-800">23</p>
                <p className="text-xs text-red-600">需要关注</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-muted-foreground">今日预约</p>
                <p className="text-2xl font-bold text-blue-800">15</p>
                <p className="text-xs text-purple-600">待确认 3</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索和筛选 */}
      <Card>
        <CardHeader>
          <CardTitle className="text-blue-800">患者列表</CardTitle>
          <CardDescription>管理和查看患者信息</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="搜索患者姓名、ID或电话..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="medical-white" className="btn-3d-medical btn-medical-white">
                <Filter className="mr-2 h-4 w-4 btn-icon-3d" />
                筛选
              </Button>
              <Button variant="medical-white" className="btn-3d-medical btn-medical-white">
                <Download className="mr-2 h-4 w-4 btn-icon-3d" />
                导出
              </Button>
              <Button variant="medical-outline" className="btn-3d-medical btn-medical-outline">
                <Upload className="mr-2 h-4 w-4 btn-icon-3d" />
                导入
              </Button>
            </div>
          </div>

          {/* 患者列表 */}
          <div className="space-y-4">
            {patients.map((patient) => (
              <Card key={patient.id} className="hover-float">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-blue-800">{patient.name}</h3>
                        <p className="text-sm text-blue-600">
                          {patient.id} • {patient.age}岁 • {patient.gender}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          {getStatusBadge(patient.status)}
                          {getRiskBadge(patient.riskLevel)}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-sm font-medium text-blue-800">{patient.condition}</p>
                        <p className="text-xs text-blue-600">最后就诊：{patient.lastVisit}</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="medical-outline"
                          size="sm"
                          className="btn-3d-medical btn-medical-outline btn-size-sm"
                        >
                          <Eye className="h-3 w-3 btn-icon-3d" />
                        </Button>
                        <Button
                          variant="medical-white"
                          size="sm"
                          className="btn-3d-medical btn-medical-white btn-size-sm"
                        >
                          <Edit className="h-3 w-3 btn-icon-3d" />
                        </Button>
                        <Button
                          variant="medical-blue"
                          size="sm"
                          className="btn-3d-medical btn-medical-blue btn-size-sm"
                        >
                          <FileText className="h-3 w-3 btn-icon-3d" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 快速操作 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">患者档案</CardTitle>
            <CardDescription>管理患者基本信息</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="medical-blue" className="w-full btn-3d-medical btn-medical-blue">
              <Plus className="mr-2 h-4 w-4 btn-icon-3d" />
              新建档案
            </Button>
            <Button variant="medical-white" className="w-full btn-3d-medical btn-medical-white">
              <Upload className="mr-2 h-4 w-4 btn-icon-3d" />
              批量导入
            </Button>
            <Button variant="medical-outline" className="w-full btn-3d-medical btn-medical-outline">
              <Download className="mr-2 h-4 w-4 btn-icon-3d" />
              导出报告
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">预约管理</CardTitle>
            <CardDescription>管理患者预约和随访</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="medical-blue" className="w-full btn-3d-medical btn-medical-blue">
              <Calendar className="mr-2 h-4 w-4 btn-icon-3d" />
              预约安排
            </Button>
            <Button variant="medical-white" className="w-full btn-3d-medical btn-medical-white">
              <Clock className="mr-2 h-4 w-4 btn-icon-3d" />
              随访计划
            </Button>
            <Button variant="medical-outline" className="w-full btn-3d-medical btn-medical-outline">
              <AlertCircle className="mr-2 h-4 w-4 btn-icon-3d" />
              提醒设置
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-blue-800">健康监测</CardTitle>
            <CardDescription>患者健康数据分析</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="medical-blue" className="w-full btn-3d-medical btn-medical-blue">
              <Activity className="mr-2 h-4 w-4 btn-icon-3d" />
              健康报告
            </Button>
            <Button variant="medical-white" className="w-full btn-3d-medical btn-medical-white">
              <Heart className="mr-2 h-4 w-4 btn-icon-3d" />
              风险评估
            </Button>
            <Button variant="medical-outline" className="w-full btn-3d-medical btn-medical-outline">
              <FileText className="mr-2 h-4 w-4 btn-icon-3d" />
              趋势分析
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
