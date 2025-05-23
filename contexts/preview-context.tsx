"use client"

import React, { createContext, useContext, useState, useEffect, useRef } from "react"

type PreviewMode = "stable" | "interactive" | "minimal" | "disabled"

interface PreviewContextType {
  isPreviewMode: boolean
  previewMode: PreviewMode
  previewData: any
  setPreviewMode: (mode: PreviewMode) => void
  setPreviewData: (data: any) => void
  togglePreviewMode: () => void
  resetPreview: () => void
  isLoading: boolean
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined)

export function PreviewProvider({ children }: { children: React.ReactNode }) {
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [previewMode, setPreviewMode] = useState<PreviewMode>("stable")
  const [previewData, setPreviewData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const initializedRef = useRef(false)

  // 初始化预览模式 - 只在组件挂载时执行一次
  useEffect(() => {
    if (initializedRef.current) return
    initializedRef.current = true

    try {
      // 从本地存储加载预览设置
      if (typeof window !== "undefined") {
        const savedMode = localStorage.getItem("preview-mode")
        if (savedMode && ["stable", "interactive", "minimal", "disabled"].includes(savedMode)) {
          setPreviewMode(savedMode as PreviewMode)
        }

        const isEnabled = localStorage.getItem("preview-enabled") === "true"
        setIsPreviewMode(isEnabled)
      }
    } catch (error) {
      console.error("加载预览设置失败:", error)
    }
  }, [])

  // 保存预览设置到本地存储 - 使用useRef防止循环渲染
  const savedSettings = useRef({ mode: previewMode, enabled: isPreviewMode })

  useEffect(() => {
    // 检查设置是否真的变化了
    if (savedSettings.current.mode === previewMode && savedSettings.current.enabled === isPreviewMode) {
      return
    }

    // 更新引用值
    savedSettings.current = { mode: previewMode, enabled: isPreviewMode }

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("preview-mode", previewMode)
        localStorage.setItem("preview-enabled", isPreviewMode.toString())
      }
    } catch (error) {
      console.error("保存预览设置失败:", error)
    }
  }, [previewMode, isPreviewMode])

  // 切换预览模式
  const togglePreviewMode = () => {
    setIsPreviewMode((prev) => !prev)
  }

  // 重置预览
  const resetPreview = () => {
    setIsLoading(true)
    // 延迟重置，避免状态更新冲突
    setTimeout(() => {
      setPreviewData(null)
      setPreviewMode("stable")
      setIsLoading(false)
    }, 100)
  }

  // 使用useMemo缓存context值，避免不必要的重新渲染
  const contextValue = React.useMemo(
    () => ({
      isPreviewMode,
      previewMode,
      previewData,
      setPreviewMode,
      setPreviewData,
      togglePreviewMode,
      resetPreview,
      isLoading,
    }),
    [isPreviewMode, previewMode, previewData, isLoading],
  )

  return <PreviewContext.Provider value={contextValue}>{children}</PreviewContext.Provider>
}

export function usePreview() {
  const context = useContext(PreviewContext)
  if (context === undefined) {
    throw new Error("usePreview must be used within a PreviewProvider")
  }
  return context
}
