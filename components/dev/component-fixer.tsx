"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Wrench, Download, Copy, CheckCircle, FileText, Package } from "lucide-react"

// 缺失组件的修复模板
const componentTemplates = {
  MedicalButton: `"use client"

import * as React from "react"
import { Button, ButtonProps } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Stethoscope } from 'lucide-react'

interface MedicalButtonProps extends ButtonProps {
  medical?: boolean
  emergency?: boolean
}

export function MedicalButton({ 
  className, 
  medical = false, 
  emergency = false, 
  children, 
  ...props 
}: MedicalButtonProps) {
  return (
    <Button
      className={cn(
        medical && "bg-medical-600 hover:bg-medical-700 text-white",
        emergency && "bg-red-600 hover:bg-red-700 text-white animate-pulse",
        className
      )}
      {...props}
    >
      {medical && <Stethoscope className="h-4 w-4 mr-2" />}
      {children}
    </Button>
  )
}`,

  MedicalCard: `"use client"

import * as React from "react"
import { Card, CardProps } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Heart, AlertTriangle } from 'lucide-react'

interface MedicalCardProps extends CardProps {
  title?: string
  priority?: "low" | "medium" | "high" | "emergency"
  patientId?: string
  medical?: boolean
}

export function MedicalCard({ 
  className, 
  title, 
  priority = "medium", 
  patientId, 
  medical = true,
  children,
  ...props 
}: MedicalCardProps) {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "low": return "bg-green-50 border-green-200"
      case "medium": return "bg-blue-50 border-blue-200"
      case "high": return "bg-yellow-50 border-yellow-200"
      case "emergency": return "bg-red-50 border-red-200"
      default: return ""
    }
  }

  return (
    <Card
      className={cn(
        "relative",
        medical && "border-l-4 border-l-medical-500",
        getPriorityColor(priority),
        className
      )}
      {...props}
    >
      {title && (
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center space-x-2">
            {medical && <Heart className="h-4 w-4 text-medical-600" />}
            <h3 className="font-semibold">{title}</h3>
          </div>
          <div className="flex items-center space-x-2">
            {patientId && (
              <Badge variant="outline" className="text-xs">
                ID: {patientId}
              </Badge>
            )}
            {priority === "emergency" && (
              <Badge variant="destructive" className="animate-pulse">
                <AlertTriangle className="h-3 w-3 mr-1" />
                紧急
              </Badge>
            )}
          </div>
        </div>
      )}
      <div className="p-4">
        {children}
      </div>
    </Card>
  )
}`,

  SafeWrapper: `"use client"

import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface SafeWrapperProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; resetErrorBoundary: () => void }>
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
}

function DefaultErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error
  resetErrorBoundary: () => void 
}) {
  return (
    <Alert variant="destructive" className="m-4">
      <AlertTriangle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-2">
          <p className="font-medium">组件渲染出错</p>
          <p className="text-sm">{error.message}</p>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={resetErrorBoundary}
            className="mt-2"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            重试
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}

export function SafeWrapper({ 
  children, 
  fallback: Fallback = DefaultErrorFallback,
  onError 
}: SafeWrapperProps) {
  return (
    <ErrorBoundary
      FallbackComponent={Fallback}
      onError={onError}
      onReset={() => window.location.reload()}
    >
      {children}
    </ErrorBoundary>
  )
}`,

  GlobalErrorBoundary: `"use client"

import * as React from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, RefreshCw, Home, Bug } from 'lucide-react'

interface GlobalErrorBoundaryProps {
  children: React.ReactNode
}

function GlobalErrorFallback({ 
  error, 
  resetErrorBoundary 
}: { 
  error: Error
  resetErrorBoundary: () => void 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-red-600">
            <AlertTriangle className="h-5 w-5 mr-2" />
            系统错误
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Alert variant="destructive">
            <Bug className="h-4 w-4" />
            <AlertDescription>
              <p className="font-medium">应用程序遇到了一个错误</p>
              <p className="text-sm mt-1">{error.message}</p>
            </AlertDescription>
          </Alert>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              onClick={resetErrorBoundary}
              className="flex-1"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              重新加载
            </Button>
            <Button 
              variant="default"
              onClick={() => window.location.href = '/'}
              className="flex-1"
            >
              <Home className="h-4 w-4 mr-2" />
              返回首页
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-4">
              <summary className="cursor-pointer text-sm text-gray-600">
                错误详情 (开发模式)
              </summary>
              <pre className="mt-2 p-2 bg-gray-100 rounded text-xs overflow-auto">
                {error.stack}
              </pre>
            </details>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function GlobalErrorBoundary({ children }: GlobalErrorBoundaryProps) {
  return (
    <ErrorBoundary
      FallbackComponent={GlobalErrorFallback}
      onError={(error, errorInfo) => {
        console.error('Global Error:', error, errorInfo)
        // 这里可以添加错误报告逻辑
      }}
    >
      {children}
    </ErrorBoundary>
  )
}`,
}

// 修复建议
const fixSuggestions = [
  {
    title: "检查组件导出",
    description: "确保所有组件都正确导出",
    code: `// 在 components/index.ts 中添加
export { ComponentName } from "./path/to/component"`,
  },
  {
    title: "修复导入路径",
    description: "检查组件文件路径是否正确",
    code: `// 检查文件是否存在于指定路径
// 确保路径与实际文件结构匹配`,
  },
  {
    title: "添加缺失依赖",
    description: "安装组件所需的依赖包",
    code: `npm install react-error-boundary
npm install @radix-ui/react-alert-dialog
npm install lucide-react`,
  },
  {
    title: "创建缺失组件",
    description: "为缺失的组件创建基础实现",
    code: `// 使用下方的组件模板创建缺失的组件`,
  },
]

export function ComponentFixer() {
  const [selectedTemplate, setSelectedTemplate] = useState<string>("")
  const [copiedCode, setCopiedCode] = useState<string>("")

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(""), 2000)
  }

  const downloadTemplate = (name: string, code: string) => {
    const blob = new Blob([code], { type: "text/typescript" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${name.toLowerCase()}.tsx`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Wrench className="h-5 w-5 mr-2" />
            组件修复工具
          </CardTitle>
          <CardDescription>提供缺失组件的模板和修复建议</CardDescription>
        </CardHeader>
      </Card>

      <Tabs defaultValue="templates" className="space-y-4">
        <TabsList>
          <TabsTrigger value="templates">组件模板</TabsTrigger>
          <TabsTrigger value="suggestions">修复建议</TabsTrigger>
          <TabsTrigger value="dependencies">依赖检查</TabsTrigger>
        </TabsList>

        <TabsContent value="templates">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">可用模板</CardTitle>
                <CardDescription>选择一个组件模板来创建缺失的组件</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {Object.keys(componentTemplates).map((name) => (
                    <Button
                      key={name}
                      variant={selectedTemplate === name ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedTemplate(name)}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      {name}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {selectedTemplate && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{selectedTemplate} 模板</span>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          copyToClipboard(componentTemplates[selectedTemplate as keyof typeof componentTemplates])
                        }
                      >
                        <Copy className="h-4 w-4 mr-1" />
                        {copiedCode === componentTemplates[selectedTemplate as keyof typeof componentTemplates]
                          ? "已复制"
                          : "复制"}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          downloadTemplate(
                            selectedTemplate,
                            componentTemplates[selectedTemplate as keyof typeof componentTemplates],
                          )
                        }
                      >
                        <Download className="h-4 w-4 mr-1" />
                        下载
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    value={componentTemplates[selectedTemplate as keyof typeof componentTemplates]}
                    readOnly
                    className="font-mono text-sm h-96"
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="suggestions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fixSuggestions.map((suggestion, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{suggestion.title}</CardTitle>
                  <CardDescription>{suggestion.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-3 rounded-md">
                    <code className="text-sm">{suggestion.code}</code>
                  </div>
                  <Button size="sm" variant="outline" className="mt-2" onClick={() => copyToClipboard(suggestion.code)}>
                    <Copy className="h-4 w-4 mr-1" />
                    复制代码
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="dependencies">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="h-5 w-5 mr-2" />
                依赖检查
              </CardTitle>
              <CardDescription>检查和安装必要的依赖包</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>必需依赖包：</strong>
                    <div className="mt-2 space-y-1 text-sm font-mono">
                      <div>• react-error-boundary</div>
                      <div>• @radix-ui/react-*</div>
                      <div>• lucide-react</div>
                      <div>• recharts</div>
                      <div>• date-fns</div>
                    </div>
                  </AlertDescription>
                </Alert>

                <div className="bg-gray-100 p-4 rounded-md">
                  <h4 className="font-medium mb-2">安装命令：</h4>
                  <code className="text-sm">
                    npm install react-error-boundary @radix-ui/react-alert-dialog @radix-ui/react-popover lucide-react
                    recharts date-fns
                  </code>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 ml-2"
                    onClick={() =>
                      copyToClipboard(
                        "npm install react-error-boundary @radix-ui/react-alert-dialog @radix-ui/react-popover lucide-react recharts date-fns",
                      )
                    }
                  >
                    <Copy className="h-4 w-4 mr-1" />
                    复制
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
