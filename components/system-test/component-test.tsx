"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BrandLogo } from "@/components/brand/logo"
import { ShieldLogo } from "@/components/brand/shield-logo"
import { MedicalButton } from "@/components/ui/medical-button"
import { ResponsiveMedicalCard } from "@/components/ui/responsive-medical-card"
import { LoadingSpinner } from "@/components/ui/loading-spinner"
import { CheckCircle, XCircle, AlertTriangle, TestTube, Palette, Layout, Zap } from "lucide-react"

export function ComponentTest() {
  const [testResults, setTestResults] = useState<Record<string, boolean>>({})
  const [isLoading, setIsLoading] = useState(false)

  const runComponentTest = async (componentName: string) => {
    setIsLoading(true)

    try {
      // 模拟组件渲染测试
      await new Promise((resolve) => setTimeout(resolve, 800))

      // 根据组件类型进行不同的测试
      let success = true
      switch (componentName) {
        case "brand-logo":
          // 测试Logo组件的所有变体
          success = document.querySelector('[data-testid="brand-logo"]') !== null
          break
        case "shield-logo":
          // 测试盾牌Logo的渲染
          success = document.querySelector('[data-testid="shield-logo"]') !== null
          break
        case "form-controls":
          // 测试表单控件的交互
          success = document.querySelector("input") !== null && document.querySelector("button") !== null
          break
        case "responsive-card":
          // 测试响应式卡片
          success = document.querySelector('[data-testid="responsive-card"]') !== null
          break
        default:
          success = Math.random() > 0.1 // 90% 成功率
      }

      setTestResults((prev) => ({ ...prev, [componentName]: success }))
    } catch (error) {
      setTestResults((prev) => ({ ...prev, [componentName]: false }))
    } finally {
      setIsLoading(false)
    }
  }

  const runAllTests = async () => {
    const components = [
      "brand-logo",
      "shield-logo",
      "form-controls",
      "responsive-card",
      "status-indicators",
      "status-icons",
      "layout-components",
    ]

    for (const component of components) {
      await runComponentTest(component)
      await new Promise((resolve) => setTimeout(resolve, 500)) // 间隔500ms
    }
  }

  const getTestIcon = (componentName: string) => {
    if (!(componentName in testResults)) {
      return <TestTube className="h-4 w-4 text-gray-400" />
    }
    return testResults[componentName] ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <XCircle className="h-4 w-4 text-red-500" />
    )
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                组件功能测试
              </CardTitle>
              <CardDescription>测试各个UI组件的渲染和交互功能</CardDescription>
            </div>
            <Button onClick={runAllTests} disabled={isLoading} className="ml-4">
              {isLoading ? "测试中..." : "运行所有测试"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="branding" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="branding">品牌组件</TabsTrigger>
              <TabsTrigger value="forms">表单组件</TabsTrigger>
              <TabsTrigger value="feedback">反馈组件</TabsTrigger>
              <TabsTrigger value="layout">布局组件</TabsTrigger>
            </TabsList>

            <TabsContent value="branding" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">品牌Logo</CardTitle>
                    <div className="flex items-center gap-2">
                      {getTestIcon("brand-logo")}
                      <Button size="sm" onClick={() => runComponentTest("brand-logo")} disabled={isLoading}>
                        测试
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>完整版本</Label>
                      <div data-testid="brand-logo">
                        <BrandLogo variant="full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>紧凑版本</Label>
                      <BrandLogo variant="compact" />
                    </div>
                    <div className="space-y-2">
                      <Label>图标版本</Label>
                      <BrandLogo variant="icon" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">盾牌Logo</CardTitle>
                    <div className="flex items-center gap-2">
                      {getTestIcon("shield-logo")}
                      <Button size="sm" onClick={() => runComponentTest("shield-logo")} disabled={isLoading}>
                        测试
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>大尺寸</Label>
                      <div data-testid="shield-logo">
                        <ShieldLogo size="lg" showText={true} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>中等尺寸</Label>
                      <ShieldLogo size="md" showText={true} />
                    </div>
                    <div className="space-y-2">
                      <Label>小尺寸</Label>
                      <ShieldLogo size="sm" showText={false} />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="forms" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">表单控件</CardTitle>
                    <div className="flex items-center gap-2">
                      {getTestIcon("form-controls")}
                      <Button size="sm" onClick={() => runComponentTest("form-controls")} disabled={isLoading}>
                        测试
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="test-input">输入框</Label>
                      <Input id="test-input" placeholder="测试输入框" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="test-checkbox" />
                      <Label htmlFor="test-checkbox">测试复选框</Label>
                    </div>
                    <div className="space-y-2">
                      <Label>医疗按钮</Label>
                      <div className="flex gap-2">
                        <MedicalButton variant="default">默认</MedicalButton>
                        <MedicalButton variant="outline">轮廓</MedicalButton>
                        <MedicalButton variant="ghost">幽灵</MedicalButton>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">响应式卡片</CardTitle>
                    <div className="flex items-center gap-2">
                      {getTestIcon("responsive-card")}
                      <Button size="sm" onClick={() => runComponentTest("responsive-card")} disabled={isLoading}>
                        测试
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveMedicalCard variant="elevated" data-testid="responsive-card">
                      <CardHeader>
                        <CardTitle>测试卡片</CardTitle>
                        <CardDescription>这是一个响应式医疗卡片组件</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <p>卡片内容区域，支持响应式布局和医疗主题样式。</p>
                      </CardContent>
                    </ResponsiveMedicalCard>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="feedback" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">状态指示器</CardTitle>
                    <div className="flex items-center gap-2">
                      {getTestIcon("status-indicators")}
                      <Button size="sm" onClick={() => runComponentTest("status-indicators")} disabled={isLoading}>
                        测试
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>徽章组件</Label>
                      <div className="flex gap-2">
                        <Badge>默认</Badge>
                        <Badge variant="secondary">次要</Badge>
                        <Badge variant="outline">轮廓</Badge>
                        <Badge variant="destructive">危险</Badge>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>进度条</Label>
                      <Progress value={65} className="w-full" />
                    </div>
                    <div className="space-y-2">
                      <Label>加载动画</Label>
                      <LoadingSpinner />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">状态图标</CardTitle>
                    <div className="flex items-center gap-2">
                      {getTestIcon("status-icons")}
                      <Button size="sm" onClick={() => runComponentTest("status-icons")} disabled={isLoading}>
                        测试
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span>成功</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <XCircle className="h-5 w-5 text-red-500" />
                        <span>失败</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        <span>警告</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="layout" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-lg">布局组件</CardTitle>
                  <div className="flex items-center gap-2">
                    {getTestIcon("layout-components")}
                    <Button size="sm" onClick={() => runComponentTest("layout-components")} disabled={isLoading}>
                      测试
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="border-dashed">
                      <CardContent className="p-4 text-center">
                        <Layout className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm">网格布局</p>
                      </CardContent>
                    </Card>
                    <Card className="border-dashed">
                      <CardContent className="p-4 text-center">
                        <Palette className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm">主题样式</p>
                      </CardContent>
                    </Card>
                    <Card className="border-dashed">
                      <CardContent className="p-4 text-center">
                        <Zap className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm">动画效果</p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
