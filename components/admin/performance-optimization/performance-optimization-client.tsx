"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Database,
  Server,
  Globe,
  Shield,
  Users,
  BarChart3,
  Clock,
  Target,
  Lightbulb,
  Settings,
  Play,
} from "lucide-react"

export function PerformanceOptimizationClient() {
  const [selectedCategory, setSelectedCategory] = useState("overview")

  const performanceScore = {
    overall: 78,
    database: 72,
    frontend: 85,
    backend: 76,
    security: 82,
    ux: 80,
  }

  const optimizationSuggestions = [
    {
      id: 1,
      category: "database",
      priority: "high",
      title: "数据库查询优化",
      description: "发现5个慢查询，建议添加索引优化",
      impact: "预计提升25%查询性能",
      effort: "中等",
      status: "pending",
      estimatedTime: "2-4小时",
    },
    {
      id: 2,
      category: "frontend",
      priority: "medium",
      title: "图片资源优化",
      description: "启用WebP格式和懒加载",
      impact: "减少40%页面加载时间",
      effort: "低",
      status: "pending",
      estimatedTime: "1-2小时",
    },
    {
      id: 3,
      category: "backend",
      priority: "high",
      title: "缓存策略优化",
      description: "实施Redis分布式缓存",
      impact: "提升50%API响应速度",
      effort: "高",
      status: "in-progress",
      estimatedTime: "1-2天",
    },
    {
      id: 4,
      category: "security",
      priority: "medium",
      title: "SSL/TLS配置优化",
      description: "启用HTTP/2和HSTS",
      impact: "提升安全性和性能",
      effort: "低",
      status: "completed",
      estimatedTime: "30分钟",
    },
  ]

  const performanceMetrics = [
    {
      name: "页面加载时间",
      current: "2.8s",
      target: "< 2.0s",
      trend: "improving",
      change: "-15%",
    },
    {
      name: "API响应时间",
      current: "450ms",
      target: "< 300ms",
      trend: "stable",
      change: "+2%",
    },
    {
      name: "数据库查询时间",
      current: "120ms",
      target: "< 100ms",
      trend: "declining",
      change: "+8%",
    },
    {
      name: "内存使用率",
      current: "68%",
      target: "< 70%",
      trend: "improving",
      change: "-5%",
    },
  ]

  const optimizationCategories = [
    {
      id: "database",
      name: "数据库优化",
      icon: <Database className="h-5 w-5" />,
      score: performanceScore.database,
      suggestions: 3,
    },
    {
      id: "frontend",
      name: "前端优化",
      icon: <Globe className="h-5 w-5" />,
      score: performanceScore.frontend,
      suggestions: 2,
    },
    {
      id: "backend",
      name: "后端优化",
      icon: <Server className="h-5 w-5" />,
      score: performanceScore.backend,
      suggestions: 4,
    },
    {
      id: "security",
      name: "安全优化",
      icon: <Shield className="h-5 w-5" />,
      score: performanceScore.security,
      suggestions: 1,
    },
    {
      id: "ux",
      name: "用户体验",
      icon: <Users className="h-5 w-5" />,
      score: performanceScore.ux,
      suggestions: 2,
    },
  ]

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "in-progress":
        return <Clock className="h-4 w-4 text-blue-500" />
      case "pending":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case "declining":
        return <TrendingDown className="h-4 w-4 text-red-500" />
      default:
        return <BarChart3 className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-6">
      {/* 性能总览 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">整体性能评分</p>
                <p className="text-3xl font-bold">{performanceScore.overall}</p>
              </div>
              <div className="text-right">
                <Badge variant={performanceScore.overall >= 80 ? "default" : "secondary"}>
                  {performanceScore.overall >= 80 ? "优秀" : performanceScore.overall >= 60 ? "良好" : "需改进"}
                </Badge>
              </div>
            </div>
            <Progress value={performanceScore.overall} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">待优化项目</p>
                <p className="text-3xl font-bold">
                  {optimizationSuggestions.filter((s) => s.status === "pending").length}
                </p>
              </div>
              <Lightbulb className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              {optimizationSuggestions.filter((s) => s.priority === "high").length} 个高优先级
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">预计性能提升</p>
                <p className="text-3xl font-bold">+32%</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
            <p className="text-sm text-muted-foreground mt-2">完成所有优化后</p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="overview">性能概览</TabsTrigger>
          <TabsTrigger value="suggestions">优化建议</TabsTrigger>
          <TabsTrigger value="metrics">性能指标</TabsTrigger>
          <TabsTrigger value="reports">优化报告</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {optimizationCategories.map((category) => (
              <Card key={category.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {category.icon}
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </div>
                    <Badge variant={category.score >= 80 ? "default" : "secondary"}>{category.score}分</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Progress value={category.score} className="mb-3" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">待优化项目</span>
                    <span className="font-medium">{category.suggestions}个</span>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className="w-full mt-3"
                    onClick={() => setSelectedCategory("suggestions")}
                  >
                    查看建议
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="suggestions" className="space-y-4">
          <div className="space-y-4">
            {optimizationSuggestions.map((suggestion) => (
              <Card key={suggestion.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(suggestion.status)}
                      <div>
                        <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                        <CardDescription>{suggestion.description}</CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={getPriorityColor(suggestion.priority)}>
                        {suggestion.priority === "high"
                          ? "高优先级"
                          : suggestion.priority === "medium"
                            ? "中优先级"
                            : "低优先级"}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">预期影响</p>
                      <p className="text-sm">{suggestion.impact}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">实施难度</p>
                      <p className="text-sm">{suggestion.effort}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">预计时间</p>
                      <p className="text-sm">{suggestion.estimatedTime}</p>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {suggestion.status === "pending" && (
                      <>
                        <Button size="sm">
                          <Play className="h-4 w-4 mr-1" />
                          开始优化
                        </Button>
                        <Button size="sm" variant="outline">
                          <Settings className="h-4 w-4 mr-1" />
                          配置
                        </Button>
                      </>
                    )}
                    {suggestion.status === "in-progress" && (
                      <Button size="sm" variant="outline">
                        <Clock className="h-4 w-4 mr-1" />
                        查看进度
                      </Button>
                    )}
                    {suggestion.status === "completed" && (
                      <Button size="sm" variant="outline">
                        <CheckCircle className="h-4 w-4 mr-1" />
                        查看结果
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>关键性能指标</CardTitle>
              <CardDescription>系统核心性能指标的实时监控和趋势分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getTrendIcon(metric.trend)}
                      <div>
                        <p className="font-medium">{metric.name}</p>
                        <p className="text-sm text-muted-foreground">目标: {metric.target}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">{metric.current}</p>
                      <p
                        className={`text-sm ${
                          metric.trend === "improving"
                            ? "text-green-500"
                            : metric.trend === "declining"
                              ? "text-red-500"
                              : "text-gray-500"
                        }`}
                      >
                        {metric.change}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>性能优化报告</CardTitle>
              <CardDescription>定期生成的性能分析和优化建议报告</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">周度性能报告</h4>
                        <Badge>本周</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">系统整体性能提升3%，数据库查询优化效果显著</p>
                      <Button size="sm" variant="outline">
                        查看详情
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">月度优化总结</h4>
                        <Badge>上月</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">
                        完成8项优化，整体性能提升15%，用户体验显著改善
                      </p>
                      <Button size="sm" variant="outline">
                        查看详情
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">AI性能分析</h4>
                        <Badge>实时</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">基于机器学习的性能预测和优化建议</p>
                      <Button size="sm" variant="outline">
                        查看分析
                      </Button>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">竞品对比分析</h4>
                        <Badge>季度</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">与行业标杆的性能对比和差距分析</p>
                      <Button size="sm" variant="outline">
                        查看对比
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
