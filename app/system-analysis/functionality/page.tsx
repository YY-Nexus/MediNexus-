"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, AlertCircle, XCircle, BarChart3, FileText, Shield } from "lucide-react"
import { systemFunctionalityReport } from "../../../reports/system-functionality-analysis"

export default function SystemFunctionalityAnalysisPage() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
      case "implemented":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "partial":
        return <AlertCircle className="h-4 w-4 text-yellow-500" />
      case "missing":
        return <XCircle className="h-4 w-4 text-red-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "implemented":
        return "bg-green-100 text-green-800"
      case "partial":
        return "bg-yellow-100 text-yellow-800"
      case "missing":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">系统功能分析报告</h1>
          <p className="text-muted-foreground mt-2">言语医枢³ 全功能模块完整性分析</p>
        </div>
        <Badge variant="outline" className="text-lg px-4 py-2">
          {systemFunctionalityReport.completionStatus}
        </Badge>
      </div>

      {/* 总览统计 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总模块数</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemFunctionalityReport.totalModules}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">总页面数</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemFunctionalityReport.totalPages}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">已完成模块</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {systemFunctionalityReport.modules.filter((m) => m.status === "completed").length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">平均完成度</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                systemFunctionalityReport.modules.reduce((acc, m) => acc + m.coverage, 0) /
                  systemFunctionalityReport.modules.length,
              )}
              %
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 详细分析 */}
      <Tabs defaultValue="modules" className="space-y-4">
        <TabsList>
          <TabsTrigger value="modules">功能模块</TabsTrigger>
          <TabsTrigger value="pages">页面详情</TabsTrigger>
          <TabsTrigger value="coverage">覆盖率分析</TabsTrigger>
        </TabsList>

        <TabsContent value="modules" className="space-y-4">
          <div className="grid gap-4">
            {systemFunctionalityReport.modules.map((module) => (
              <Card key={module.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(module.status)}
                      <CardTitle className="text-lg">{module.name}</CardTitle>
                      <Badge variant="outline">{module.nameEn}</Badge>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(module.status)}>{module.status}</Badge>
                      <span className="text-sm text-muted-foreground">{module.pages.length} 页面</span>
                    </div>
                  </div>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>完成度</span>
                      <span>{module.coverage}%</span>
                    </div>
                    <Progress value={module.coverage} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pages" className="space-y-4">
          {systemFunctionalityReport.modules.map((module) => (
            <Card key={module.id}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  {getStatusIcon(module.status)}
                  <span>{module.name}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {module.pages.map((page, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(page.status)}
                        <div>
                          <div className="font-medium">{page.name}</div>
                          <div className="text-sm text-muted-foreground">{page.path}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(page.status)} variant="outline">
                          {page.status}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{page.features.length} 功能</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="coverage" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>模块覆盖率统计</CardTitle>
              <CardDescription>各功能模块的完成度分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemFunctionalityReport.modules
                  .sort((a, b) => b.coverage - a.coverage)
                  .map((module) => (
                    <div key={module.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{module.name}</span>
                        <span className="text-sm text-muted-foreground">{module.coverage}%</span>
                      </div>
                      <Progress value={module.coverage} className="h-2" />
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
