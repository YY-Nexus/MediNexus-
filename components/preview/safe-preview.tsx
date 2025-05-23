"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { usePreview } from "@/contexts/preview-context"
import { ComponentErrorBoundary } from "@/components/error-boundary/component-error-boundary"
import { Loader2 } from "lucide-react"

interface SafePreviewProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  previewName: string
  loadingDelay?: number
}

export function SafePreview({ children, fallback, previewName, loadingDelay = 300 }: SafePreviewProps) {
  const { isPreviewMode, previewMode } = usePreview()
  const [isReady, setIsReady] = useState(false)
  const [showLoading, setShowLoading] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // 如果预览模式被禁用，直接显示内容
    if (previewMode === "disabled") {
      setIsReady(true)
      return
    }

    // 延迟显示加载状态，避免闪烁
    timeoutRef.current = setTimeout(() => {
      if (!isReady) {
        setShowLoading(true)
      }
    }, loadingDelay)

    // 延迟渲染预览内容，确保DOM已经准备好
    const renderTimeout = setTimeout(() => {
      setIsReady(true)
    }, 50)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
      clearTimeout(renderTimeout)
    }
  }, [isReady, previewMode, loadingDelay])

  // 如果预览模式被禁用，直接返回null
  if (!isPreviewMode && previewMode === "disabled") {
    return null
  }

  // 显示加载状态
  if (!isReady && showLoading) {
    return (
      <div className="flex items-center justify-center p-4 min-h-[100px] bg-gray-50 rounded-md border border-gray-200">
        <Loader2 className="h-6 w-6 text-gray-400 animate-spin" />
        <span className="ml-2 text-sm text-gray-500">加载预览...</span>
      </div>
    )
  }

  // 使用错误边界包装预览内容
  return (
    <ComponentErrorBoundary
      componentName={`Preview-${previewName}`}
      fallback={
        fallback || (
          <div className="p-4 border border-red-200 rounded-md bg-red-50">
            <p className="text-sm text-red-600">预览加载失败</p>
          </div>
        )
      }
    >
      {isReady ? children : null}
    </ComponentErrorBoundary>
  )
}
