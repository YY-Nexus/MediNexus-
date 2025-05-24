"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  RefreshCw,
  Play,
  Pause,
  BarChart3,
  Users,
  Brain,
  Stethoscope,
  HeartPulse,
  Lock,
  Settings,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface TestResult {
  id: string
  name: string
  status: "pending" | "running" | "passed" | "failed" | "warning"
  duration?: number
  error?: string
  details?: string
}

interface TestSuite {
  id: string
  name: string
  icon: any
  description: string
  tests: TestResult[]
}

export function SystemTestClient() {
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const [testSuites, setTestSuites] = useState<TestSuite[]>([
    {
      id: "navigation",
      name: "导航系统",
      icon: Settings,
      description: "测试侧边栏、顶部导航和路由功能",
      tests: [
        { id: "sidebar-toggle", name: "侧边栏折叠/展开", status: "pending" },
        { id: "navigation-links", name: "导航链接跳转", status: "pending" },
        { id: "search-function", name: "搜索功能", status: "pending" },
        { id: "breadcrumb", name: "面包屑导航", status: "pending" },
        { id: "mobile-nav", name: "移动端导航", status: "pending" },
      ],
    },
    {
      id: "auth",
      name: "认证系统",
      icon: Lock,
      description: "测试登录、注册和权限控制",
      tests: [
        { id: "login-form", name: "登录表单验证", status: "pending" },
        { id: "auth-redirect", name: "认证重定向", status: "pending" },
        { id: "session-management", name: "会话管理", status: "pending" },
        { id: "password-reset", name: "密码重置", status: "pending" },
      ],
    },
    {
      id: "ai-diagnosis",
      name: "AI诊断",
      icon: Brain,
      description: "测试智能诊断和模型管理功能",
      tests: [
        { id: "model-loading", name: "模型加载", status: "pending" },
        { id: "diagnosis-process", name: "诊断流程", status: "pending" },
        { id: "result-display", name: "结果展示", status: "pending" },
        { id: "model-performance", name: "模型性能监控", status: "pending" },
      ],
    },
    {
      id: "patient-management",
      name: "患者管理",
      icon: Users,
      description: "测试患者信息管理和病历系统",
      tests: [
        { id: "patient-list", name: "患者列表加载", status: "pending" },
        { id: "patient-search", name: "患者搜索", status: "pending" },
        { id: "medical-records", name: "病历管理", status: "pending" },
        { id: "patient-groups", name: "患者分组", status: "pending" },
      ],
    },
    {
      id: "clinical-decision",
      name: "临床决策",
      icon: Stethoscope,
      description: "测试临床决策支持系统",
      tests: [
        { id: "treatment-recommendations", name: "治疗建议", status: "pending" },
        { id: "drug-interactions", name: "药物相互作用", status: "pending" },
        { id: "clinical-guidelines", name: "临床指南", status: "pending" },
        { id: "decision-tree", name: "决策树", status: "pending" },
      ],
    },
    {
      id: "health-data",
      name: "健康数据",
      icon: HeartPulse,
      description: "测试健康数据分析和可视化",
      tests: [
        { id: "data-import", name: "数据导入", status: "pending" },
        { id: "trend-analysis", name: "趋势分析", status: "pending" },
        { id: "chart-rendering", name: "图表渲染", status: "pending" },
        { id: "real-time-data", name: "实时数据更新", status: "pending" },
      ],
    },
    {
      id: "ui-components",
      name: "UI组件",
      icon: BarChart3,
      description: "测试用户界面组件和交互",
      tests: [
        { id: "form-validation", name: "表单验证", status: "pending" },
        { id: "modal-dialogs", name: "模态对话框", status: "pending" },
        { id: "data-tables", name: "数据表格", status: "pending" },
        { id: "responsive-design", name: "响应式设计", status: "pending" },
      ],
    },
    {
      id: "performance",
      name: "性能测试",
      icon: BarChart3,
      description: "测试系统性能和加载速度",
      tests: [
        { id: "page-load-time", name: "页面加载时间", status: "pending" },
        { id: "api-response-time", name: "API响应时间", status: "pending" },
        { id: "memory-usage", name: "内存使用情况", status: "pending" },
        { id: "bundle-size", name: "打包文件大小", status: "pending" },
      ],
    },
  ])

  // 模拟测试执行
  const runTest = async (suiteId: string, testId: string): Promise<TestResult> => {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          const randomOutcome = Math.random()
          let status: TestResult["status"]
          let error: string | undefined
          let details: string | undefined

          if (randomOutcome > 0.85) {
            status = "failed"
            error = "测试失败：模拟错误"
          } else if (randomOutcome > 0.75) {
            status = "warning"
            details = "测试通过但有警告"
          } else {
            status = "passed"
            details = "测试成功通过"
          }

          resolve({
            id: testId,
            name: "",
            status,
            duration: Math.floor(Math.random() * 2000) + 500,
            error,
            details,
          })
        },
        Math.random() * 1000 + 500,
      )
    })
  }

  const runAllTests = async () => {
    setIsRunning(true)
    setProgress(0)

    const totalTests = testSuites.reduce((acc, suite) => acc + suite.tests.length, 0)
    let completedTests = 0

    for (const suite of testSuites) {
      for (const test of suite.tests) {
        setCurrentTest(`${suite.name} - ${test.name}`)

        // 更新测试状态为运行中
        setTestSuites((prev) =>
          prev.map((s) =>
            s.id === suite.id
              ? {
                  ...s,
                  tests: s.tests.map((t) => (t.id === test.id ? { ...t, status: "running" } : t)),
                }
              : s,
          ),
        )

        const result = await runTest(suite.id, test.id)

        // 更新测试结果
        setTestSuites((prev) =>
          prev.map((s) =>
            s.id === suite.id
              ? {
                  ...s,
                  tests: s.tests.map((t) =>
                    t.id === test.id
                      ? {
                          ...t,
                          status: result.status,
                          duration: result.duration,
                          error: result.error,
                          details: result.details,
                        }
                      : t,
                  ),
                }
              : s,
          ),
        )

        completedTests++
        setProgress((completedTests / totalTests) * 100)
      }
    }

    setIsRunning(false)
    setCurrentTest(null)
  }

  const resetTests = () => {
    setTestSuites((prev) =>
      prev.map((suite) => ({
        ...suite,
        tests: suite.tests.map((test) => ({
          ...test,
          status: "pending",
          duration: undefined,
          error: undefined,
          details: undefined,
        })),
      })),
    )
    setProgress(0)
    setCurrentTest(null)
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "passed":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      case "running":
        return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      default:
        return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    const variants = {
      passed: "bg-green-100 text-green-800",
      failed: "bg-red-100 text-red-800",
      warning: "bg-yellow-100 text-yellow-800",
      running: "bg-blue-100 text-blue-800",
      pending: "bg-gray-100 text-gray-800",
    }

    const labels = {
      passed: "通过",
      failed: "失败",
      warning: "警告",
      running: "运行中",
      pending: "待测试",
    }

    return <Badge className={variants[status]}>{labels[status]}</Badge>
  }

  const getSuiteStats = (suite: TestSuite) => {
    const passed = suite.tests.filter((t) => t.status === "passed").length
    const failed = suite.tests.filter((t) => t.status === "failed").length
    const warning = suite.tests.filter((t) => t.status === "warning").length
    const total = suite.tests.length

    return { passed, failed, warning, total }
  }

  const getOverallStats = () => {
    const allTests = testSuites.flatMap((s) => s.tests)
    const passed = allTests.filter((t) => t.status === "passed").length
    const failed = allTests.filter((t) => t.status === "failed").length
    const warning = allTests.filter((t) => t.status === "warning").length
    const total = allTests.length

    return { passed, failed, warning, total }
  }

  const overallStats = getOverallStats()

  return (
    <div className="space-y-6">
      {/* 控制面板 */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            测试控制面板
          </CardTitle>
          <CardDescription>控制测试执行和查看整体进度</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button onClick={runAllTests} disabled={isRunning} className="flex items-center gap-2">
              {isRunning ? (
                <>
                  <Pause className="h-4 w-4" />
                  测试运行中...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4" />
                  开始全部测试
                </>
              )}
            </Button>
            <Button variant="outline" onClick={resetTests} disabled={isRunning} className="flex items-center gap-2">
              <RefreshCw className="h-4 w-4" />
              重置测试
            </Button>
          </div>

          {isRunning && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>测试进度</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="w-full" />
              {currentTest && <p className="text-sm text-muted-foreground">当前测试: {currentTest}</p>}
            </div>
          )}

          {/* 整体统计 */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{overallStats.passed}</div>
              <div className="text-sm text-muted-foreground">通过</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{overallStats.failed}</div>
              <div className="text-sm text-muted-foreground">失败</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{overallStats.warning}</div>
              <div className="text-sm text-muted-foreground">警告</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{overallStats.total}</div>
              <div className="text-sm text-muted-foreground">总计</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 测试套件 */}
      <Tabs defaultValue="navigation" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8">
          {testSuites.map((suite) => (
            <TabsTrigger key={suite.id} value={suite.id} className="flex items-center gap-1">
              <suite.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{suite.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {testSuites.map((suite) => {
          const stats = getSuiteStats(suite)
          return (
            <TabsContent key={suite.id} value={suite.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <suite.icon className="h-5 w-5" />
                    {suite.name}
                  </CardTitle>
                  <CardDescription>{suite.description}</CardDescription>
                  <div className="flex gap-2">
                    <Badge variant="outline" className="text-green-600">
                      通过: {stats.passed}/{stats.total}
                    </Badge>
                    {stats.failed > 0 && (
                      <Badge variant="outline" className="text-red-600">
                        失败: {stats.failed}
                      </Badge>
                    )}
                    {stats.warning > 0 && (
                      <Badge variant="outline" className="text-yellow-600">
                        警告: {stats.warning}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {suite.tests.map((test) => (
                      <div
                        key={test.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border",
                          test.status === "running" && "bg-blue-50 border-blue-200",
                          test.status === "passed" && "bg-green-50 border-green-200",
                          test.status === "failed" && "bg-red-50 border-red-200",
                          test.status === "warning" && "bg-yellow-50 border-yellow-200",
                        )}
                      >
                        <div className="flex items-center gap-3">
                          {getStatusIcon(test.status)}
                          <div>
                            <div className="font-medium">{test.name}</div>
                            {test.details && <div className="text-sm text-muted-foreground">{test.details}</div>}
                            {test.error && <div className="text-sm text-red-600">{test.error}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {test.duration && <span className="text-sm text-muted-foreground">{test.duration}ms</span>}
                          {getStatusBadge(test.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          )
        })}
      </Tabs>
    </div>
  )
}
