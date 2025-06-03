"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  Brain,
  Users,
  FileText,
  Award,
  Stethoscope,
  BarChart3,
  Shield,
  Zap,
  Heart,
  Activity,
  Bell,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  Plus,
  Search,
  Settings,
  Download,
  Upload,
  RefreshCw,
} from "lucide-react"
import { ShieldLogo } from "@/components/brand/shield-logo"
import { cn } from "@/lib/utils"

export default function HomePage() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [systemStats, setSystemStats] = useState({
    totalPatients: 1247,
    todayConsultations: 89,
    aiDiagnoses: 156,
    systemHealth: 98.5,
  })

  // 更新时间
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // 快速统计数据
  const quickStats = [
    {
      title: "今日患者",
      value: systemStats.todayConsultations,
      change: "+12%",
      trend: "up",
      icon: Users,
      color: "blue",
    },
    {
      title: "AI诊断",
      value: systemStats.aiDiagnoses,
      change: "+8%",
      trend: "up",
      icon: Brain,
      color: "green",
    },
    {
      title: "系统健康度",
      value: `${systemStats.systemHealth}%`,
      change: "+0.2%",
      trend: "up",
      icon: Activity,
      color: "blue",
    },
    {
      title: "总患者数",
      value: systemStats.totalPatients,
      change: "+5%",
      trend: "up",
      icon: Heart,
      color: "green",
    },
  ]

  // 快速操作
  const quickActions = [
    {
      title: "新建患者档案",
      description: "录入新患者基本信息",
      icon: Plus,
      href: "/patients",
      variant: "medical-blue" as const,
      urgent: false,
    },
    {
      title: "AI智能诊断",
      description: "启动AI辅助诊断流程",
      icon: Brain,
      href: "/ai-diagnosis",
      variant: "medical-gradient" as const,
      urgent: true,
    },
    {
      title: "查看患者列表",
      description: "管理现有患者信息",
      icon: Users,
      href: "/patients",
      variant: "medical-white" as const,
      urgent: false,
    },
    {
      title: "系统设置",
      description: "配置系统参数",
      icon: Settings,
      href: "/settings",
      variant: "medical-outline" as const,
      urgent: false,
    },
  ]

  // 最近活动
  const recentActivities = [
    {
      id: 1,
      type: "diagnosis",
      title: "AI诊断完成",
      description: "患者张某某的胸部CT诊断已完成",
      time: "5分钟前",
      status: "completed",
      priority: "normal",
    },
    {
      id: 2,
      type: "patient",
      title: "新患者注册",
      description: "李某某已成功注册并建立档案",
      time: "12分钟前",
      status: "completed",
      priority: "normal",
    },
    {
      id: 3,
      type: "system",
      title: "系统更新",
      description: "医枢系统已更新至v1.0.1版本",
      time: "1小时前",
      status: "completed",
      priority: "low",
    },
    {
      id: 4,
      type: "alert",
      title: "资质即将到期",
      description: "王医生的执业证书将在30天后到期",
      time: "2小时前",
      status: "pending",
      priority: "urgent",
    },
  ]

  // 功能模块
  const featureModules = [
    {
      title: "患者管理",
      description: "全面的患者信息管理系统，支持档案建立、病历记录、随访管理等功能",
      icon: Users,
      href: "/patients",
      features: ["患者档案", "病历管理", "随访计划", "家属沟通"],
      status: "active",
      usage: 85,
    },
    {
      title: "AI智能诊断",
      description: "基于深度学习的医学影像诊断系统，提供快速准确的辅助诊断",
      icon: Brain,
      href: "/ai-diagnosis",
      features: ["影像分析", "诊断建议", "风险评估", "报告生成"],
      status: "active",
      usage: 92,
    },
    {
      title: "临床决策支持",
      description: "智能化临床决策支持系统，提供循证医学指导和治疗建议",
      icon: Stethoscope,
      href: "/clinical-decision",
      features: ["诊疗指南", "用药建议", "风险预警", "路径优化"],
      status: "active",
      usage: 78,
    },
    {
      title: "医疗记录",
      description: "电子病历系统，支持结构化录入、模板管理、智能检索等功能",
      icon: FileText,
      href: "/medical-records",
      features: ["电子病历", "模板管理", "智能检索", "数据统计"],
      status: "active",
      usage: 88,
    },
    {
      title: "资质认证",
      description: "医护人员资质认证管理系统，确保合规性和专业性",
      icon: Award,
      href: "/certifications",
      features: ["证书管理", "到期提醒", "合规检查", "统计分析"],
      status: "active",
      usage: 95,
    },
    {
      title: "数据分析",
      description: "医疗数据分析平台，提供多维度统计分析和可视化报表",
      icon: BarChart3,
      href: "/analytics",
      features: ["统计分析", "趋势预测", "报表生成", "数据导出"],
      status: "active",
      usage: 73,
    },
  ]

  return (
    <div className="medical-container space-y-8">
      {/* 页面头部 - 符合医疗机构标准 */}
      <div className="medical-fade-in">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* 欢迎信息 */}
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <ShieldLogo size="lg" showText={false} />
              <div>
                <h1 className="text-3xl font-bold text-blue-900 mb-1">欢迎使用言语「医枢」智能诊疗系统</h1>
                <p className="text-lg text-blue-600">
                  {currentTime.toLocaleDateString("zh-CN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    weekday: "long",
                  })}{" "}
                  {currentTime.toLocaleTimeString("zh-CN")}
                </p>
              </div>
            </div>
          </div>

          {/* 快速操作按钮组 */}
          <div className="flex flex-wrap gap-3">
            <Button variant="medical-blue" size="lg" className="btn-3d-medical">
              <Plus className="w-5 h-5 mr-2 btn-icon-3d" />
              新建患者
            </Button>
            <Button variant="medical-white" size="lg" className="btn-3d-medical">
              <Search className="w-5 h-5 mr-2 btn-icon-3d" />
              快速搜索
            </Button>
            <Button variant="medical-outline" size="lg" className="btn-3d-medical">
              <RefreshCw className="w-5 h-5 mr-2 btn-icon-3d" />
              刷新数据
            </Button>
          </div>
        </div>
      </div>

      {/* 系统状态警告 */}
      <div className="medical-slide-up">
        <Alert className="medical-alert-info border-l-4 border-l-blue-500">
          <Info className="h-4 w-4" />
          <AlertTitle className="text-blue-800 font-semibold">系统状态良好</AlertTitle>
          <AlertDescription className="text-blue-700">
            所有核心功能运行正常，系统健康度 {systemStats.systemHealth}%。 上次维护时间：2024年12月20日 02:00
          </AlertDescription>
        </Alert>
      </div>

      {/* 快速统计卡片 */}
      <div className="medical-grid-cols-4 medical-fade-in">
        {quickStats.map((stat, index) => (
          <Card key={index} className="medical-card hover-float">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-600">{stat.title}</p>
                  <p className="text-2xl font-bold text-blue-900">{stat.value}</p>
                  <div className="flex items-center gap-1">
                    <TrendingUp className={cn("w-4 h-4", stat.trend === "up" ? "text-green-600" : "text-red-600")} />
                    <span
                      className={cn("text-sm font-medium", stat.trend === "up" ? "text-green-600" : "text-red-600")}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
                <div className={cn("p-3 rounded-full", stat.color === "blue" ? "bg-blue-100" : "bg-green-100")}>
                  <stat.icon className={cn("w-6 h-6", stat.color === "blue" ? "text-blue-600" : "text-green-600")} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 主要内容区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 左侧：快速操作和功能模块 */}
        <div className="lg:col-span-2 space-y-8">
          {/* 快速操作 */}
          <div className="medical-scale-in">
            <Card className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle className="medical-card-title flex items-center gap-2">
                  <Zap className="w-5 h-5 text-blue-600" />
                  快速操作
                </CardTitle>
                <CardDescription className="medical-card-description">常用功能快速访问入口</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => (
                    <div
                      key={index}
                      className="relative p-4 border border-blue-200 rounded-lg hover:border-blue-300 transition-colors group"
                    >
                      {action.urgent && <Badge className="absolute -top-2 -right-2 bg-red-500 text-white">紧急</Badge>}
                      <div className="flex items-start gap-3">
                        <div className="p-2 bg-blue-50 rounded-md group-hover:bg-blue-100 transition-colors">
                          <action.icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="flex-1 space-y-2">
                          <h4 className="font-medium text-blue-800">{action.title}</h4>
                          <p className="text-sm text-blue-600">{action.description}</p>
                          <Button variant={action.variant} size="sm" className="btn-3d-medical w-full">
                            立即使用
                            <ArrowRight className="w-4 h-4 ml-2 btn-icon-3d" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 功能模块 */}
          <div className="medical-fade-in">
            <Card className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle className="medical-card-title flex items-center gap-2">
                  <Activity className="w-5 h-5 text-blue-600" />
                  核心功能模块
                </CardTitle>
                <CardDescription className="medical-card-description">系统主要功能模块使用情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {featureModules.map((module, index) => (
                    <div
                      key={index}
                      className="p-4 border border-blue-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-50 rounded-md">
                            <module.icon className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-blue-800">{module.title}</h4>
                            <p className="text-sm text-blue-600 mt-1">{module.description}</p>
                          </div>
                        </div>
                        <Badge
                          variant={module.status === "active" ? "default" : "secondary"}
                          className="bg-green-100 text-green-800"
                        >
                          运行中
                        </Badge>
                      </div>

                      <div className="space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {module.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-blue-600 border-blue-300">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-blue-600">使用率</span>
                            <span className="font-medium text-blue-800">{module.usage}%</span>
                          </div>
                          <Progress value={module.usage} className="h-2" />
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="medical-blue" size="sm" className="btn-3d-medical flex-1">
                            进入模块
                          </Button>
                          <Button variant="medical-outline" size="sm" className="btn-3d-medical">
                            查看详情
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 右侧：最近活动和通知 */}
        <div className="space-y-8">
          {/* 最近活动 */}
          <div className="medical-slide-up">
            <Card className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle className="medical-card-title flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-600" />
                  最近活动
                </CardTitle>
                <CardDescription className="medical-card-description">系统最新动态和操作记录</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex gap-3 p-3 rounded-lg hover:bg-blue-25 transition-colors">
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-2 flex-shrink-0",
                          activity.priority === "urgent"
                            ? "bg-red-500"
                            : activity.priority === "normal"
                              ? "bg-blue-500"
                              : "bg-gray-400",
                        )}
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center justify-between">
                          <h5 className="font-medium text-blue-800 text-sm">{activity.title}</h5>
                          <span className="text-xs text-blue-500">{activity.time}</span>
                        </div>
                        <p className="text-sm text-blue-600">{activity.description}</p>
                        <div className="flex items-center gap-2">
                          {activity.status === "completed" ? (
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          ) : (
                            <AlertTriangle className="w-4 h-4 text-yellow-600" />
                          )}
                          <span
                            className={cn(
                              "text-xs font-medium",
                              activity.status === "completed" ? "text-green-600" : "text-yellow-600",
                            )}
                          >
                            {activity.status === "completed" ? "已完成" : "待处理"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pt-4 border-t border-blue-100">
                  <Button variant="medical-outline" size="sm" className="btn-3d-medical w-full">
                    查看全部活动
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 系统通知 */}
          <div className="medical-scale-in">
            <Card className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle className="medical-card-title flex items-center gap-2">
                  <Bell className="w-5 h-5 text-blue-600" />
                  系统通知
                  <Badge className="bg-red-500 text-white">3</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Alert className="medical-alert-warning">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle className="text-sm">资质到期提醒</AlertTitle>
                    <AlertDescription className="text-xs">有2个医护人员资质即将到期，请及时处理</AlertDescription>
                  </Alert>

                  <Alert className="medical-alert-info">
                    <Info className="h-4 w-4" />
                    <AlertTitle className="text-sm">系统更新</AlertTitle>
                    <AlertDescription className="text-xs">新版本v1.0.1已发布，包含性能优化和bug修复</AlertDescription>
                  </Alert>

                  <Alert className="medical-alert-success">
                    <CheckCircle className="h-4 w-4" />
                    <AlertTitle className="text-sm">备份完成</AlertTitle>
                    <AlertDescription className="text-xs">数据库备份已成功完成，备份文件已保存</AlertDescription>
                  </Alert>
                </div>

                <div className="pt-4 space-y-2">
                  <Button variant="medical-blue" size="sm" className="btn-3d-medical w-full">
                    处理通知
                  </Button>
                  <Button variant="medical-outline" size="sm" className="btn-3d-medical w-full">
                    通知设置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* 快速链接 */}
          <div className="medical-fade-in">
            <Card className="medical-card">
              <CardHeader className="medical-card-header">
                <CardTitle className="medical-card-title">快速链接</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button variant="medical-outline" size="sm" className="btn-3d-medical w-full justify-start">
                    <Download className="w-4 h-4 mr-2 btn-icon-3d" />
                    下载用户手册
                  </Button>
                  <Button variant="medical-outline" size="sm" className="btn-3d-medical w-full justify-start">
                    <Upload className="w-4 h-4 mr-2 btn-icon-3d" />
                    数据导入工具
                  </Button>
                  <Button variant="medical-outline" size="sm" className="btn-3d-medical w-full justify-start">
                    <Shield className="w-4 h-4 mr-2 btn-icon-3d" />
                    安全设置
                  </Button>
                  <Button variant="medical-outline" size="sm" className="btn-3d-medical w-full justify-start">
                    <Settings className="w-4 h-4 mr-2 btn-icon-3d" />
                    系统配置
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
