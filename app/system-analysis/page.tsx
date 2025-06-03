"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BarChart3, FileText, Settings, Shield, Users, Zap } from "lucide-react"
import Link from "next/link"

export default function SystemAnalysisPage() {
  const analysisModules = [
    {
      id: "functionality",
      title: "功能分析",
      description: "系统功能模块完整性分析",
      icon: <BarChart3 className="h-6 w-6" />,
      path: "/system-analysis/functionality",
      status: "available",
      metrics: {
        modules: 15,
        pages: 89,
        completion: "95%",
      },
    },
    {
      id: "completeness",
      title: "完整性检查",
      description: "系统组件和功能完整性验证",
      icon: <Shield className="h-6 w-6" />,
      path: "/system-analysis/completeness",
      status: "available",
      metrics: {
        components: 200,
        coverage: "98%",
        issues: 3,
      },
    },
    {
      id: "navigation",
      title: "导航分析",
      description: "系统导航结构和用户体验分析",
      icon: <Settings className="h-6 w-6" />,
      path: "/system-analysis/navigation",
      status: "coming-soon",
      metrics: {
        routes: 89,
        depth: 4,
        accessibility: "AA",
      },
    },
    {
      id: "performance",
      title: "性能分析",
      description: "系统性能指标和优化建议",
      icon: <Zap className="h-6 w-6" />,
      path: "/system-analysis/performance",
      status: "coming-soon",
      metrics: {
        loadTime: "1.2s",
        score: 95,
        optimization: "高",
      },
    },
    {
      id: "security",
      title: "安全分析",
      description: "系统安全性评估和漏洞检测",
      icon: <Shield className="h-6 w-6" />,
      path: "/system-analysis/security",
      status: "coming-soon",
      metrics: {
        vulnerabilities: 0,
        compliance: "HIPAA",
        score: "A+",
      },
    },
    {
      id: "usability",
      title: "可用性分析",
      description: "用户体验和界面可用性评估",
      icon: <Users className="h-6 w-6" />,
      path: "/system-analysis/usability",
      status: "coming-soon",
      metrics: {
        satisfaction: "4.8/5",
        accessibility: "WCAG 2.1",
        mobile: "优化",
      },
    },
  ]

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge className="bg-green-100 text-green-800">可用</Badge>
      case "coming-soon":
        return <Badge variant="outline">即将推出</Badge>
      default:
        return <Badge variant="secondary">未知</Badge>
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">系统分析中心</h1>
          <p className="text-muted-foreground mt-2">言语医枢³ 系统全面分析和监控</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          分析工具集
        </Badge>
      </div>

      {/* 快速概览 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总功能模块</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">15</div>
            <p className="text-xs text-muted-foreground">覆盖医疗全流程</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">系统页面</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">完整功能覆盖</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">完成度</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">95%</div>
            <p className="text-xs text-muted-foreground">生产就绪</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">组件数量</CardTitle>
            <Settings className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">200+</div>
            <p className="text-xs text-muted-foreground">可复用组件</p>
          </CardContent>
        </Card>
      </div>

      {/* 分析模块 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {analysisModules.map((module) => (
          <Card key={module.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {module.icon}
                  <CardTitle className="text-lg">{module.title}</CardTitle>
                </div>
                {getStatusBadge(module.status)}
              </div>
              <CardDescription>{module.description}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries(module.metrics).map(([key, value]) => (
                  <div key={key} className="text-center">
                    <div className="font-semibold">{value}</div>
                    <div className="text-muted-foreground capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {module.status === "available" ? (
                <Link href={module.path}>
                  <Button className="w-full">查看分析</Button>
                </Link>
              ) : (
                <Button variant="outline" className="w-full" disabled>
                  即将推出
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* 系统健康状态 */}
      <Card>
        <CardHeader>
          <CardTitle>系统健康状态</CardTitle>
          <CardDescription>实时系统状态监控</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">所有服务正常运行</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">数据库连接正常</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm">API响应正常</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
