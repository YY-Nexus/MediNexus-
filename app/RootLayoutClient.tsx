"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { NavigationSearch } from "@/components/navigation-search"

export default function RootLayoutClient({ children }: { children: React.ReactNode }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  // 监听全局键盘快捷键
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 全局搜索快捷键 (Cmd/Ctrl + K)
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsSearchOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  // 路径变化时关闭搜索
  useEffect(() => {
    setIsSearchOpen(false)
  }, [pathname])

  return (
    <>
      {children}
      {/* 全局搜索对话框 */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl">
            <NavigationSearch />
          </div>
        </div>
      )}
    </>
  )
}
