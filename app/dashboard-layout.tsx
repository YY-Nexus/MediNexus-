"use client"

import type React from "react"

interface DashboardLayoutProps {
  children: React.ReactNode
}

function DashboardLayout({ children }: DashboardLayoutProps) {
  // 不再使用AppShell，因为布局已经在RootLayout中定义
  return <>{children}</>
}

export default DashboardLayout
