"use client"

import { useState, useEffect } from "react"

export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // 初始检查
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < breakpoint)
    }

    // 首次运行
    checkIsMobile()

    // 监听窗口大小变化
    window.addEventListener("resize", checkIsMobile)

    // 清理函数
    return () => {
      window.removeEventListener("resize", checkIsMobile)
    }
  }, [breakpoint])

  return isMobile
}
