"use client"

import type React from "react"

import { useEffect, useRef } from "react"

type AnnouncementOptions = {
  politeness?: "polite" | "assertive"
  timeout?: number
}

export function useA11y() {
  const announcerRef = useRef<HTMLDivElement | null>(null)

  // 初始化无障碍性公告元素
  useEffect(() => {
    if (!announcerRef.current && typeof document !== "undefined") {
      const announcer = document.createElement("div")
      announcer.setAttribute("aria-live", "polite")
      announcer.setAttribute("aria-atomic", "true")
      announcer.className = "sr-only" // 屏幕阅读器可见，视觉上隐藏
      document.body.appendChild(announcer)
      announcerRef.current = announcer

      return () => {
        document.body.removeChild(announcer)
        announcerRef.current = null
      }
    }
  }, [])

  // 向屏幕阅读器发送公告
  const announce = (message: string, options: AnnouncementOptions = {}) => {
    const { politeness = "polite", timeout = 50 } = options

    if (announcerRef.current) {
      // 设置公告的礼貌性级别
      announcerRef.current.setAttribute("aria-live", politeness)

      // 清空当前内容
      announcerRef.current.textContent = ""

      // 使用setTimeout确保屏幕阅读器能够捕获变化
      setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message
        }
      }, timeout)
    }
  }

  // 创建可访问的按钮属性
  const createButtonProps = (label: string) => ({
    "aria-label": label,
    role: "button",
    tabIndex: 0,
    onKeyDown: (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        e.currentTarget.click()
      }
    },
  })

  return {
    announce,
    createButtonProps,
  }
}
