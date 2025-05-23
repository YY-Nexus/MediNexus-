"use client"

import { Menu, Bell, Search, Info } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

interface MainNavProps {
  onToggleSidebar: () => void
}

export function MainNav({ onToggleSidebar }: MainNavProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount, setNotificationCount] = useState(3)
  const [showSearch, setShowSearch] = useState(false)
  const [showInfo, setShowInfo] = useState(false)
  const isMobile = useIsMobile()

  return (
    <div className="flex items-center gap-4">
      {/* 保留导航栏中的折叠/展开按钮 */}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <MedicalButton
              variant="ghost"
              size="icon"
              onClick={onToggleSidebar}
              className="mr-2 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">切换侧边栏</span>
            </MedicalButton>
          </TooltipTrigger>
          <TooltipContent className="animate-in zoom-in-50 duration-200">
            <div className="flex items-center gap-2">
              <span>切换侧边栏</span>
              <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded text-xs">
                <span className="text-gray-500">Alt</span>
                <span>+</span>
                <span className="text-gray-500">S</span>
              </div>
            </div>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      {/* 搜索功能 */}
      <div className="relative">
        <DropdownMenu open={showSearch} onOpenChange={setShowSearch}>
          <DropdownMenuTrigger asChild>
            <MedicalButton
              variant="ghost"
              size="icon"
              className={cn(
                "transition-all duration-200 hover:bg-blue-50 active:scale-95",
                showSearch ? "text-blue-600 bg-blue-50" : "hover:text-blue-700",
              )}
            >
              <Search className="h-5 w-5" />
              <span className="sr-only">搜索</span>
            </MedicalButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px] p-4 animate-in zoom-in-90 duration-200">
            <div className="space-y-4">
              <h3 className="text-sm font-medium">全局搜索</h3>
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="搜索患者、资质、记录..."
                  className="flex-1 transition-all duration-200 focus-within:border-blue-300 focus-within:ring-blue-200"
                  autoFocus
                />
                <MedicalButton size="sm" className="transition-all duration-200 hover:bg-blue-600 active:scale-95">
                  <Search className="h-4 w-4 mr-2" />
                  搜索
                </MedicalButton>
              </div>
              <div className="text-xs text-muted-foreground">
                提示: 使用 <kbd className="px-1 py-0.5 bg-muted rounded">Ctrl</kbd> +{" "}
                <kbd className="px-1 py-0.5 bg-muted rounded">K</kbd> 快速打开搜索
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 信息图标 */}
      <div className="relative">
        <DropdownMenu open={showInfo} onOpenChange={setShowInfo}>
          <DropdownMenuTrigger asChild>
            <MedicalButton
              variant="ghost"
              size="icon"
              className={cn(
                "transition-all duration-200 hover:bg-blue-50 active:scale-95",
                showInfo ? "text-blue-600 bg-blue-50" : "hover:text-blue-700",
              )}
            >
              <Info className="h-5 w-5" />
              <span className="sr-only">系统信息</span>
            </MedicalButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[300px] animate-in zoom-in-90 duration-200">
            <div className="p-4">
              <h3 className="font-medium mb-2">MediNexus³ 系统信息</h3>
              <div className="text-sm space-y-2">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">版本:</span>
                  <span>3.5.2</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">更新日期:</span>
                  <span>2025年05月10日</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">许可状态:</span>
                  <span className="text-green-500">已激活</span>
                </p>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700">
              <span>查看更新日志</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700">
              <span>系统诊断</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700">
              <span>帮助中心</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* 通知图标 */}
      <div className="relative">
        <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
          <DropdownMenuTrigger asChild>
            <MedicalButton
              variant="ghost"
              size="icon"
              className={cn(
                "transition-all duration-200 hover:bg-blue-50 active:scale-95",
                showNotifications ? "text-blue-600 bg-blue-50" : "hover:text-blue-700",
              )}
            >
              <Bell className="h-5 w-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-blue-500 text-white text-xs flex items-center justify-center rounded-full animate-pulse">
                  {notificationCount}
                </span>
              )}
              <span className="sr-only">通知</span>
            </MedicalButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[350px] animate-in zoom-in-90 duration-200">
            <div className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium">通知</h3>
                <MedicalButton
                  variant="ghost"
                  size="sm"
                  className="transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  全部标为已读
                </MedicalButton>
              </div>
              <div className="space-y-4">
                <div className="bg-muted/50 p-3 rounded-md transition-all duration-200 hover:bg-blue-50 hover:shadow-sm cursor-pointer">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">资质验证完成</p>
                    <span className="text-xs text-muted-foreground">10分钟前</span>
                  </div>
                  <p className="text-sm mt-1">张医生的《医师资格证》已通过验证</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md transition-all duration-200 hover:bg-blue-50 hover:shadow-sm cursor-pointer">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">系统更新</p>
                    <span className="text-xs text-muted-foreground">1小时前</span>
                  </div>
                  <p className="text-sm mt-1">MediNexus³ 已更新至 3.5.2 版本</p>
                </div>
                <div className="bg-muted/50 p-3 rounded-md transition-all duration-200 hover:bg-blue-50 hover:shadow-sm cursor-pointer">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">API使用量警告</p>
                    <span className="text-xs text-muted-foreground">昨天</span>
                  </div>
                  <p className="text-sm mt-1">医证通API使用量已达到月度配额的85%</p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center transition-colors duration-200 hover:bg-blue-50 hover:text-blue-700 focus:bg-blue-50 focus:text-blue-700">
              <span>查看全部通知</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
