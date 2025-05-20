"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useIsMobile } from "@/hooks/use-mobile"
import { useLoading } from "@/contexts/loading-context"
import { useOfflineStatus } from "@/hooks/use-offline-status"
import { OfflineNotification } from "@/components/offline-notification"
import { NetworkErrorHandler } from "@/components/error-boundary/network-error-handler"
import { SimplePerformanceMonitor } from "@/components/performance/simple-performance-monitor"

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const isMobile = useIsMobile()
  const { isLoading, setIsLoading } = useLoading()
  const { isOffline } = useOfflineStatus()
  const [serviceWorkerRegistered, setServiceWorkerRegistered] = useState(false)
  const [showPerformanceMonitor, setShowPerformanceMonitor] = useState(false)

  // 注册Service Worker
  useEffect(() => {
    const registerServiceWorker = async () => {
      try {
        // 检查是否在浏览器环境
        if (typeof window === "undefined") return

        // 检查是否在lite环境中
        const isLiteEnvironment = window.location.hostname.includes("lite.vusercontent")

        // 只在非lite环境中注册Service Worker
        if ("serviceWorker" in navigator && !serviceWorkerRegistered && !isLiteEnvironment) {
          const registration = await navigator.serviceWorker.register("/sw.js")
          console.log("Service Worker 注册成功:", registration.scope)
          setServiceWorkerRegistered(true)
        }
      } catch (error) {
        console.error("Service Worker 注册失败:", error)
        // 错误已记录，但不会中断应用运行
      }
    }

    registerServiceWorker()
  }, [serviceWorkerRegistered])

  // 延迟显示性能监控，避免初始渲染问题
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SHOW_PERFORMANCE_MONITOR === "true") {
      const timer = setTimeout(() => {
        setShowPerformanceMonitor(true)
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [])

  if (isLoading) {
    return null // 在实际应用中，这里可以返回加载指示器
  }

  return (
    <NetworkErrorHandler>
      <div className="flex flex-col min-h-screen">
        <OfflineNotification />
        <main className="flex-1">{children}</main>
        {process.env.NEXT_PUBLIC_SHOW_PERFORMANCE_MONITOR === "true" && showPerformanceMonitor && (
          <SimplePerformanceMonitor />
        )}
      </div>
    </NetworkErrorHandler>
  )
}
