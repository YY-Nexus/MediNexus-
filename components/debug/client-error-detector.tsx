"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, RefreshCw, Bug, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface ErrorInfo {
  message: string
  stack?: string
  componentStack?: string
  timestamp: number
  url: string
  userAgent: string
}

export function ClientErrorDetector() {
  const [errors, setErrors] = useState<ErrorInfo[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // 捕获全局错误
    const handleError = (event: ErrorEvent) => {
      const errorInfo: ErrorInfo = {
        message: event.message,
        stack: event.error?.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }

      setErrors((prev) => [...prev, errorInfo])
      setIsVisible(true)

      console.error("客户端错误检测:", errorInfo)
    }

    // 捕获未处理的 Promise 拒绝
    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      const errorInfo: ErrorInfo = {
        message: `未处理的 Promise 拒绝: ${event.reason}`,
        stack: event.reason?.stack,
        timestamp: Date.now(),
        url: window.location.href,
        userAgent: navigator.userAgent,
      }

      setErrors((prev) => [...prev, errorInfo])
      setIsVisible(true)

      console.error("未处理的 Promise 拒绝:", errorInfo)
    }

    // 添加事件监听器
    window.addEventListener("error", handleError)
    window.addEventListener("unhandledrejection", handleUnhandledRejection)

    return () => {
      window.removeEventListener("error", handleError)
      window.removeEventListener("unhandledrejection", handleUnhandledRejection)
    }
  }, [])

  if (!isVisible || errors.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <Card className="border-red-200 bg-red-50">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <CardTitle className="text-red-800">客户端错误检测</CardTitle>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsVisible(false)} className="h-6 w-6">
              <X className="h-4 w-4" />
            </Button>
          </div>
          <CardDescription className="text-red-600">检测到 {errors.length} 个客户端错误</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {errors.slice(-3).map((error, index) => (
            <div key={index} className="p-3 bg-white rounded border border-red-200">
              <p className="text-sm font-medium text-red-800 mb-1">{error.message}</p>
              <p className="text-xs text-red-600">时间: {new Date(error.timestamp).toLocaleTimeString()}</p>
              {error.stack && (
                <details className="mt-2">
                  <summary className="text-xs text-red-600 cursor-pointer">查看堆栈跟踪</summary>
                  <pre className="text-xs text-red-700 mt-1 overflow-auto max-h-32 bg-red-100 p-2 rounded">
                    {error.stack}
                  </pre>
                </details>
              )}
            </div>
          ))}

          <div className="flex gap-2 pt-2">
            <Button size="sm" variant="outline" onClick={() => window.location.reload()} className="flex-1">
              <RefreshCw className="mr-1 h-3 w-3" />
              刷新页面
            </Button>
            <Button size="sm" variant="outline" onClick={() => setErrors([])} className="flex-1">
              <Bug className="mr-1 h-3 w-3" />
              清除错误
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// 默认导出
export default ClientErrorDetector
