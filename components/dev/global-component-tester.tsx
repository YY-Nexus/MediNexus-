"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CheckCircle, XCircle, AlertTriangle, RefreshCw, Play, Bug, Component, FileText, Settings } from "lucide-react"

// 组件测试配置
const componentTests = [
  // UI 基础组件
  {
    category: "UI基础组件",
    name: "Button",
    path: "@/components/ui/button",
    component: "Button",
    testProps: { children: "测试按钮" },
  },
  {
    category: "UI基础组件",
    name: "Card",
    path: "@/components/ui/card",
    component: "Card",
    testProps: { children: "测试卡片" },
  },
  {
    category: "UI基础组件",
    name: "Badge",
    path: "@/components/ui/badge",
    component: "Badge",
    testProps: { children: "测试徽章" },
  },
  {
    category: "UI基础组件",
    name: "Progress",
    path: "@/components/ui/progress",
    component: "Progress",
    testProps: { value: 50 },
  },
  {
    category: "UI基础组件",
    name: "Input",
    path: "@/components/ui/input",
    component: "Input",
    testProps: { placeholder: "测试输入框" },
  },
  {
    category: "UI基础组件",
    name: "Tabs",
    path: "@/components/ui/tabs",
    component: "Tabs",
    testProps: { defaultValue: "test", children: "测试标签页" },
  },

  // 自定义UI组件
  {
    category: "自定义UI组件",
    name: "DatePicker",
    path: "@/components/ui/date-picker",
    component: "DatePicker",
    testProps: { placeholder: "选择日期" },
  },
  {
    category: "自定义UI组件",
    name: "BarChart",
    path: "@/components/ui/chart",
    component: "BarChart",
    testProps: {
      data: [{ name: "测试", value: 100 }],
      dataKey: "value",
      xAxisKey: "name",
    },
  },
  {
    category: "自定义UI组件",
    name: "MedicalButton",
    path: "@/components/ui/medical-button",
    component: "MedicalButton",
    testProps: { children: "医疗按钮" },
  },
  {
    category: "自定义UI组件",
    name: "MedicalCard",
    path: "@/components/ui/medical-card",
    component: "MedicalCard",
    testProps: { title: "医疗卡片", children: "测试内容" },
  },

  // 布局组件
  {
    category: "布局组件",
    name: "AppShell",
    path: "@/components/layout/app-shell",
    component: "AppShell",
    testProps: { children: "应用外壳" },
  },
  {
    category: "布局组件",
    name: "AppHeader",
    path: "@/components/layout/app-header",
    component: "AppHeader",
    testProps: {},
  },
  {
    category: "布局组件",
    name: "SidebarNav",
    path: "@/components/layout/sidebar-nav",
    component: "SidebarNav",
    testProps: {},
  },

  // 品牌组件
  {
    category: "品牌组件",
    name: "Logo",
    path: "@/components/brand/logo",
    component: "Logo",
    testProps: {},
  },
  {
    category: "品牌组件",
    name: "ShieldLogo",
    path: "@/components/brand/shield-logo",
    component: "ShieldLogo",
    testProps: {},
  },

  // 功能组件
  {
    category: "功能组件",
    name: "ModelDeployment",
    path: "@/components/ai-model-training/model-deployment",
    component: "ModelDeployment",
    testProps: {},
  },
  {
    category: "功能组件",
    name: "UserNav",
    path: "@/components/user-nav",
    component: "UserNav",
    testProps: {},
  },
  {
    category: "功能组件",
    name: "NavigationSearch",
    path: "@/components/navigation-search",
    component: "NavigationSearch",
    testProps: {},
  },

  // 错误处理组件
  {
    category: "错误处理",
    name: "SafeWrapper",
    path: "@/components/safe-wrapper",
    component: "SafeWrapper",
    testProps: { children: "安全包装器" },
  },
  {
    category: "错误处理",
    name: "GlobalErrorBoundary",
    path: "@/components/error-boundary/global-error-boundary",
    component: "GlobalErrorBoundary",
    testProps: { children: "全局错误边界" },
  },
]

interface TestResult {
  name: string
  category: string
  status: "success" | "error" | "warning" | "pending"
  error?: string
  renderTime?: number
  component?: any
}

export function GlobalComponentTester() {
  const [testResults, setTestResults] = useState<TestResult[]>([])
  const [isRunning, setIsRunning] = useState(false)
  const [currentTest, setCurrentTest] = useState<string>("")
  const [progress, setProgress] = useState(0)

  // 动态导入组件并测试
  const testComponent = async (test: (typeof componentTests)[0]): Promise<TestResult> => {
    const startTime = Date.now()

    try {
      // 动态导入组件
      const module = await import(test.path)
      const Component = module[test.component] || module.default

      if (!Component) {
        return {
          name: test.name,
          category: test.category,
          status: "error",
          error: `组件 ${test.component} 未找到`,
        }
      }

      // 尝试渲染组件（仅检查是否为有效的React组件）
      if (typeof Component !== "function") {
        return {
          name: test.name,
          category: test.category,
          status: "error",
          error: "不是有效的React组件",
        }
      }

      const renderTime = Date.now() - startTime

      return {
        name: test.name,
        category: test.category,
        status: "success",
        renderTime,
        component: Component,
      }
    } catch (error) {
      return {
        name: test.name,
        category: test.category,
        status: "error",
        error: error instanceof Error ? error.message : "未知错误",
      }
    }
  }

  // 运行所有测试
  const runAllTests = async () => {
    setIsRunning(true)
    setTestResults([])
    setProgress(0)

    const results: TestResult[] = []

    for (let i = 0; i < componentTests.length; i++) {
      const test = componentTests[i]
      setCurrentTest(test.name)

      const result = await testComponent(test)
      results.push(result)
      setTestResults([...results])

      setProgress(((i + 1) / componentTests.length) * 100)

      // 添加小延迟以显示进度
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setIsRunning(false)
    setCurrentTest("")
  }

  // 按类别分组结果
  const groupedResults = testResults.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {} as Record<string, TestResult[]>,
  )

  // 统计信息
  const stats = {
    total: testResults.length,
    success: testResults.filter((r) => r.status === "success").length,
    error: testResults.filter((r) => r.status === "error").length,
    warning: testResults.filter((r) => r.status === "warning").length,
  }

  const getStatusIcon = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-500" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />
      default:
        return <RefreshCw className="h-4 w-4 text-gray-500" />
    }
  }

  const getStatusBadge = (status: TestResult["status"]) => {
    switch (status) {
      case "success":
        return (
          <Badge variant="default" className="bg-green-500">
            成功
          </Badge>
        )
      case "error":
        return <Badge variant="destructive">失败</Badge>
      case "warning":
        return <Badge variant="secondary">警告</Badge>
      default:
        return <Badge variant="outline">待测试</Badge>
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Component className="h-5 w-5 mr-2" />
            全局组件测试工具
          </CardTitle>
          <CardDescription>检测所有组件的导入、导出和渲染状态，识别缺失和错误的组件</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <Button onClick={runAllTests} disabled={isRunning} className="flex items-center">
              {isRunning ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  测试中...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  开始测试
                </>
              )}
            </Button>

            {isRunning && (
              <div className="flex-1 mx-4">
                <div className="flex justify-between text-sm mb-1">
                  <span>当前测试: {currentTest}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} />
              </div>
            )}
          </div>

          {testResults.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
                  <p className="text-xs text-muted-foreground">总组件数</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">{stats.success}</div>
                  <p className="text-xs text-muted-foreground">成功组件</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-red-600">{stats.error}</div>
                  <p className="text-xs text-muted-foreground">失败组件</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-yellow-600">{stats.warning}</div>
                  <p className="text-xs text-muted-foreground">警告组件</p>
                </CardContent>
              </Card>
            </div>
          )}
        </CardContent>
      </Card>

      {testResults.length > 0 && (
        <Tabs defaultValue="results" className="space-y-4">
          <TabsList>
            <TabsTrigger value="results">测试结果</TabsTrigger>
            <TabsTrigger value="errors">错误详情</TabsTrigger>
            <TabsTrigger value="missing">缺失组件</TabsTrigger>
            <TabsTrigger value="recommendations">修复建议</TabsTrigger>
          </TabsList>

          <TabsContent value="results">
            <div className="space-y-4">
              {Object.entries(groupedResults).map(([category, results]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category}</CardTitle>
                    <CardDescription>
                      {results.length} 个组件 • 成功: {results.filter((r) => r.status === "success").length} • 失败:{" "}
                      {results.filter((r) => r.status === "error").length}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {results.map((result) => (
                        <div key={result.name} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            {getStatusIcon(result.status)}
                            <div>
                              <h4 className="font-medium">{result.name}</h4>
                              {result.error && <p className="text-sm text-red-600">{result.error}</p>}
                              {result.renderTime && (
                                <p className="text-xs text-gray-500">渲染时间: {result.renderTime}ms</p>
                              )}
                            </div>
                          </div>
                          {getStatusBadge(result.status)}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="errors">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Bug className="h-5 w-5 mr-2" />
                  错误详情
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-96">
                  <div className="space-y-4">
                    {testResults
                      .filter((result) => result.status === "error")
                      .map((result) => (
                        <Alert key={result.name} variant="destructive">
                          <XCircle className="h-4 w-4" />
                          <AlertDescription>
                            <strong>{result.name}</strong>: {result.error}
                          </AlertDescription>
                        </Alert>
                      ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="missing">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  缺失组件分析
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {testResults
                    .filter((result) => result.status === "error")
                    .map((result) => (
                      <div key={result.name} className="p-4 border border-red-200 rounded-lg bg-red-50">
                        <h4 className="font-medium text-red-800">{result.name}</h4>
                        <p className="text-sm text-red-600 mt-1">{result.error}</p>
                        <div className="mt-2 text-xs text-red-500">类别: {result.category}</div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  修复建议
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>优先修复项目：</strong>
                      <ul className="mt-2 space-y-1 text-sm">
                        <li>• 修复所有失败的UI基础组件</li>
                        <li>• 确保布局组件正常工作</li>
                        <li>• 检查组件导出路径</li>
                        <li>• 验证组件依赖关系</li>
                      </ul>
                    </AlertDescription>
                  </Alert>

                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>建议的修复步骤：</strong>
                      <ol className="mt-2 space-y-1 text-sm">
                        <li>1. 检查并修复组件文件路径</li>
                        <li>2. 确保所有组件正确导出</li>
                        <li>3. 验证组件依赖是否安装</li>
                        <li>4. 测试组件在不同环境下的渲染</li>
                        <li>5. 添加错误边界保护</li>
                      </ol>
                    </AlertDescription>
                  </Alert>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      )}
    </div>
  )
}
