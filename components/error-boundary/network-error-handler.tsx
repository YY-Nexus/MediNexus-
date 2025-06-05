"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { AlertCircle, WifiOff, RefreshCw } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface NetworkErrorHandlerProps {
  children: React.ReactNode
  onRetry?: () => void
}

export function NetworkErrorHandler({ children, onRetry }: NetworkErrorHandlerProps) {
  const [isOnline, setIsOnline] = useState(true)
  const [hasNetworkError, setHasNetworkError] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    // 初始化检查
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleRetry = () => {
    if (onRetry) {
      onRetry()
    }
    setHasNetworkError(false)
  }

  // 模拟网络错误检测
  useEffect(() => {
    const checkNetworkErrors = () => {
      // 这里可以添加更复杂的网络错误检测逻辑
      if (!isOnline) {
        setHasNetworkError(true)
      }
    }

    checkNetworkErrors()
  }, [isOnline])

  if (hasNetworkError) {
    return (
      <Card className="w-full border-warning-200 bg-warning-50">
        <CardHeader className="pb-2">
          <div className="flex items-center gap-2">
            {isOnline ? (
              <AlertCircle className="h-5 w-5 text-warning-500" />
            ) : (
              <WifiOff className="h-5 w-5 text-warning-500" />
            )}
            <CardTitle className="text-sm font-medium text-warning-700">
              {isOnline ? "网络请求失败" : "网络连接断开"}
            </CardTitle>
          </div>
          <CardDescription className="text-warning-600">
            {isOnline ? "无法连接到服务器，请检查您的网络连接或稍后再试" : "您当前处于离线状态，请检查网络连接"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            onClick={handleRetry}
            variant="outline"
            size="sm"
            className="border-warning-200 text-warning-700 hover:bg-warning-100"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            重试连接
          </Button>
        </CardContent>
      </Card>
    )
  }

  return <>{children}</>
}
