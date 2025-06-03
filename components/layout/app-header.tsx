"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { UserNav } from "@/components/user-nav"
import { PageBreadcrumb } from "@/components/layout/page-breadcrumb"
import { NavigationSearch } from "@/components/navigation-search"
import { Menu, Bell, Info } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface AppHeaderProps {
  onToggleSidebar: () => void
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const [notificationCount] = useState(3)
  const pathname = usePathname()

  // 获取当前页面标题
  const getPageTitle = () => {
    const pathSegments = pathname?.split("/").filter(Boolean) || []
    if (pathSegments.length === 0) return "系统主页"

    // 路径映射
    const pathMap: Record<string, string> = {
      "ai-diagnosis": "智能诊断",
      patients: "患者管理",
      "medical-records": "病历管理",
      certifications: "资质管理",
      admin: "系统管理",
      settings: "系统设置",
      analytics: "数据分析",
      research: "科研管理",
      training: "培训管理",
    }

    const lastSegment = pathSegments[pathSegments.length - 1]
    return (
      pathMap[lastSegment] ||
      lastSegment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    )
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:px-6">
      {/* 左侧：菜单按钮 + 面包屑 */}
      <div className="flex items-center gap-4 flex-1">
        {/* 侧边栏切换按钮 */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="h-9 w-9 transition-colors hover:bg-accent hover:text-accent-foreground"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">切换侧边栏</span>
        </Button>

        {/* 面包屑导航 - 桌面端显示 */}
        <div className="hidden md:flex">
          <PageBreadcrumb />
        </div>

        {/* 页面标题 - 移动端显示 */}
        <div className="md:hidden">
          <h1 className="text-lg font-semibold">{getPageTitle()}</h1>
        </div>
      </div>

      {/* 中间：搜索框 */}
      <div className="hidden md:flex md:w-full md:max-w-sm">
        <NavigationSearch />
      </div>

      {/* 右侧：功能按钮 + 用户菜单 */}
      <div className="flex items-center gap-2">
        {/* 系统信息按钮 */}
        <DropdownMenu open={showInfo} onOpenChange={setShowInfo}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 transition-colors",
                showInfo ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Info className="h-5 w-5" />
              <span className="sr-only">系统信息</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[280px]">
            <div className="p-4">
              <h3 className="font-medium mb-3">医枢系统信息</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">系统名称:</span>
                  <span className="font-medium">言语「医枢」</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">英文名称:</span>
                  <span className="font-mono text-xs">YanYu MediCore</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">版本:</span>
                  <span className="font-mono">v1.0.0</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">更新时间:</span>
                  <span>2025年05月24日</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">许可状态:</span>
                  <span className="text-green-600 font-medium">已激活</span>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem>查看更新日志</DropdownMenuItem>
            <DropdownMenuItem>系统诊断</DropdownMenuItem>
            <DropdownMenuItem>帮助文档</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 通知按钮 */}
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "h-9 w-9 relative transition-colors",
                showNotifications ? "bg-accent text-accent-foreground" : "hover:bg-accent hover:text-accent-foreground",
              )}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-destructive text-destructive-foreground text-xs flex items-center justify-center rounded-full font-medium">
                  {notificationCount}
                </span>
              )}
              <span className="sr-only">通知中心</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px]">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">通知中心</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  全部已读
                </Button>
              </div>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">资质验证完成</p>
                    <span className="text-xs text-muted-foreground">10分钟前</span>
                  </div>
                  <p className="text-sm text-muted-foreground">张医生的《医师资格证》已通过验证</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">系统更新提醒</p>
                    <span className="text-xs text-muted-foreground">1小时前</span>
                  </div>
                  <p className="text-sm text-muted-foreground">医枢系统已更新至 v1.0.0</p>
                </div>
                <div className="p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-medium text-sm">API使用警告</p>
                    <span className="text-xs text-muted-foreground">昨天</span>
                  </div>
                  <p className="text-sm text-muted-foreground">医证通API使用量已达85%</p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center">查看全部通知</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* 用户菜单 */}
        <UserNav />
      </div>
    </header>
  )
}
