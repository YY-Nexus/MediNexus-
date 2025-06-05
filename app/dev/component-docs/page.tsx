"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MedicalButton } from "@/components/ui/medical-button"
import { MedicalCard, MedicalCardContent, MedicalCardHeader, MedicalCardTitle } from "@/components/ui/medical-card"
import { SafeWrapper } from "@/components/safe-wrapper"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ComponentDocsPage() {
  const [showError, setShowError] = useState(false)

  const ErrorComponent = () => {
    if (showError) {
      throw new Error("这是一个测试错误")
    }
    return <div>正常渲染的组件</div>
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">医疗系统组件文档</h1>

      <Tabs defaultValue="medical-ui">
        <TabsList className="mb-4">
          <TabsTrigger value="medical-ui">医疗UI组件</TabsTrigger>
          <TabsTrigger value="error-handling">错误处理组件</TabsTrigger>
          <TabsTrigger value="usage-examples">使用示例</TabsTrigger>
        </TabsList>

        <TabsContent value="medical-ui">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>MedicalButton 组件</CardTitle>
                <CardDescription>医疗系统专用按钮组件，提供多种样式变体</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-wrap gap-4">
                  <MedicalButton>默认按钮</MedicalButton>
                  <MedicalButton variant="outline">轮廓按钮</MedicalButton>
                  <MedicalButton variant="secondary">次要按钮</MedicalButton>
                  <MedicalButton variant="destructive">危险按钮</MedicalButton>
                  <MedicalButton variant="ghost">幽灵按钮</MedicalButton>
                  <MedicalButton variant="link">链接按钮</MedicalButton>
                </div>

                <div className="flex flex-wrap gap-4">
                  <MedicalButton size="sm">小按钮</MedicalButton>
                  <MedicalButton>默认大小</MedicalButton>
                  <MedicalButton size="lg">大按钮</MedicalButton>
                  <MedicalButton isLoading>加载中</MedicalButton>
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-md">
                  <pre className="text-sm">
                    {`<MedicalButton>默认按钮</MedicalButton>
<MedicalButton variant="outline">轮廓按钮</MedicalButton>
<MedicalButton variant="secondary">次要按钮</MedicalButton>
<MedicalButton isLoading>加载中</MedicalButton>`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>MedicalCard 组件</CardTitle>
                <CardDescription>医疗系统专用卡片组件，提供多种样式变体</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <MedicalCard>
                    <MedicalCardHeader>
                      <MedicalCardTitle>默认卡片</MedicalCardTitle>
                    </MedicalCardHeader>
                    <MedicalCardContent>这是一个默认样式的医疗卡片组件</MedicalCardContent>
                  </MedicalCard>

                  <MedicalCard variant="elevated">
                    <MedicalCardHeader>
                      <MedicalCardTitle>立体卡片</MedicalCardTitle>
                    </MedicalCardHeader>
                    <MedicalCardContent>这是一个立体样式的医疗卡片组件</MedicalCardContent>
                  </MedicalCard>

                  <MedicalCard variant="flat">
                    <MedicalCardHeader>
                      <MedicalCardTitle>扁平卡片</MedicalCardTitle>
                    </MedicalCardHeader>
                    <MedicalCardContent>这是一个扁平样式的医疗卡片组件</MedicalCardContent>
                  </MedicalCard>

                  <MedicalCard variant="gradient">
                    <MedicalCardHeader>
                      <MedicalCardTitle>渐变卡片</MedicalCardTitle>
                    </MedicalCardHeader>
                    <MedicalCardContent>这是一个渐变样式的医疗卡片组件</MedicalCardContent>
                  </MedicalCard>
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-md">
                  <pre className="text-sm">
                    {`<MedicalCard>
  <MedicalCardHeader>
    <MedicalCardTitle>卡片标题</MedicalCardTitle>
  </MedicalCardHeader>
  <MedicalCardContent>
    卡片内容
  </MedicalCardContent>
</MedicalCard>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="error-handling">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>SafeWrapper 组件</CardTitle>
                <CardDescription>安全包装器组件，用于捕获组件渲染错误</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">正常状态</h3>
                    <SafeWrapper componentName="测试组件">
                      <div className="p-4 border rounded">这是一个正常渲染的组件</div>
                    </SafeWrapper>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">错误状态</h3>
                    <SafeWrapper componentName="错误组件">
                      <div className="p-4 border rounded">
                        <Button variant="destructive" onClick={() => setShowError(!showError)}>
                          {showError ? "修复错误" : "触发错误"}
                        </Button>
                        {showError ? <ErrorComponent /> : "点击按钮触发错误"}
                      </div>
                    </SafeWrapper>
                  </div>
                </div>

                <div className="mt-4 p-4 bg-slate-50 rounded-md">
                  <pre className="text-sm">
                    {`<SafeWrapper componentName="组件名称">
  <YourComponent />
</SafeWrapper>`}
                  </pre>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>GlobalErrorBoundary 组件</CardTitle>
                <CardDescription>全局错误边界组件，用于捕获应用级错误</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="mb-4">全局错误边界应该在应用的根组件中使用，用于捕获未被其他错误边界捕获的错误。</p>

                <div className="mt-4 p-4 bg-slate-50 rounded-md">
                  <pre className="text-sm">
                    {`// 在 RootLayoutClient.tsx 中使用
<GlobalErrorBoundary>
  <AppShell>{children}</AppShell>
</GlobalErrorBoundary>`}
                  </pre>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="usage-examples">
          <div className="grid gap-8">
            <Card>
              <CardHeader>
                <CardTitle>表单示例</CardTitle>
                <CardDescription>使用医疗组件构建表单</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">患者姓名</Label>
                    <Input id="name" placeholder="请输入患者姓名" />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="id">患者ID</Label>
                    <Input id="id" placeholder="请输入患者ID" />
                  </div>

                  <div className="flex justify-end gap-2">
                    <MedicalButton variant="outline">取消</MedicalButton>
                    <MedicalButton>提交</MedicalButton>
                  </div>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>卡片布局示例</CardTitle>
                <CardDescription>使用医疗卡片组件构建布局</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <MedicalCard variant="elevated">
                    <MedicalCardHeader>
                      <MedicalCardTitle>患者信息</MedicalCardTitle>
                    </MedicalCardHeader>
                    <MedicalCardContent>
                      <p>患者基本信息展示区域</p>
                    </MedicalCardContent>
                  </MedicalCard>

                  <MedicalCard variant="elevated">
                    <MedicalCardHeader>
                      <MedicalCardTitle>诊断结果</MedicalCardTitle>
                    </MedicalCardHeader>
                    <MedicalCardContent>
                      <p>AI诊断结果展示区域</p>
                    </MedicalCardContent>
                  </MedicalCard>

                  <MedicalCard variant="elevated">
                    <MedicalCardHeader>
                      <MedicalCardTitle>治疗建议</MedicalCardTitle>
                    </MedicalCardHeader>
                    <MedicalCardContent>
                      <p>治疗方案建议展示区域</p>
                    </MedicalCardContent>
                  </MedicalCard>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
