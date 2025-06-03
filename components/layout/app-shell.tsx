"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { SidebarNav } from "@/components/layout/sidebar-nav"
import { AppHeader } from "@/components/layout/app-header"
import { useIsMobile } from "@/hooks/use-mobile"
import { cn } from "@/lib/utils"
import { KeyboardShortcutsDialog } from "@/components/layout/keyboard-shortcuts-dialog"

interface AppShellProps {
  children: React.ReactNode
}

export function AppShell({ children }: AppShellProps) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [isKeyboardShortcutsOpen, setIsKeyboardShortcutsOpen] = useState(false)
  const pathname = usePathname()
  const isMobile = useIsMobile()

  // 检查是否是认证页面
  const isAuthPage =
    pathname?.startsWith("/login") ||
    pathname?.startsWith("/register") ||
    pathname?.startsWith("/forgot-password") ||
    pathname?.startsWith("/reset-password")

  // 监听键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.key === "s") {
        e.preventDefault()
        setIsSidebarCollapsed((prev) => !prev)
      }
      if ((e.ctrlKey && e.key === "/") || (e.altKey && e.key === "k")) {
        e.preventDefault()
        setIsKeyboardShortcutsOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // 移动设备上自动折叠侧边栏
  useEffect(() => {
    if (isMobile) {
      setIsSidebarCollapsed(true)
    }
  }, [isMobile])

  // 认证页面使用简单布局，不包含导航
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
        {children}
      </div>
    )
  }

  // 主应用布局 - 只渲染一次导航
  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* 侧边栏导航 */}
        <SidebarNav
          isCollapsed={isSidebarCollapsed}
          setIsCollapsed={setIsSidebarCollapsed}
          className={cn(
            "transition-all duration-300 ease-in-out",
            isMobile && !isSidebarCollapsed ? "absolute z-50 shadow-2xl" : "",
          )}
        />

        {/* 主内容区域 */}
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* 顶部导航栏 - 只渲染一次 */}
          <AppHeader onToggleSidebar={() => setIsSidebarCollapsed((prev) => !prev)} />

          {/* 页面内容区域 */}
          <main
            className={cn(
              "flex-1 overflow-y-auto overflow-x-hidden",
              "p-4 md:p-6 lg:p-8",
              "bg-background transition-all duration-300 ease-in-out",
            )}
            id="main-content"
            role="main"
          >
            <div className="mx-auto max-w-7xl">{children}</div>
          </main>
        </div>
      </div>

      {/* 移动端遮罩层 */}
      {isMobile && !isSidebarCollapsed && (
        <div className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarCollapsed(true)} />
      )}

      {/* 键盘快捷键对话框 */}
      <KeyboardShortcutsDialog open={isKeyboardShortcutsOpen} onOpenChange={setIsKeyboardShortcutsOpen} />
    </>
  )
}
