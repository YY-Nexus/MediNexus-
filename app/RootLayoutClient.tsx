"use client"

import type React from "react"

import { useEffect } from "react"
import { GlobalErrorBoundary } from "@/components/error-boundary/global-error-boundary"

interface RootLayoutClientProps {
  children: React.ReactNode
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  useEffect(() => {
    // 确保只有一个导航实例
    const existingNavs = document.querySelectorAll('[data-navigation="true"]')
    if (existingNavs.length > 1) {
      console.warn("检测到多个导航组件，正在清理...")
      // 移除多余的导航组件
      for (let i = 1; i < existingNavs.length; i++) {
        existingNavs[i].remove()
      }
    }
  }, [])

  return <GlobalErrorBoundary>{children}</GlobalErrorBoundary>
}
