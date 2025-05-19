"use client"

import { useState } from "react"
import Link from "next/link"
import {
  Menu,
  Search,
  Bell,
  Settings,
  HelpCircle,
  LogOut,
  User,
  MessageSquare,
  Keyboard,
  Sun,
  Moon,
} from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { ShieldLogo } from "@/components/brand/shield-logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useTheme } from "next-themes"

interface AppHeaderProps {
  onToggleSidebar: () => void
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notificationCount] = useState(3)
  const { theme, setTheme } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b bg-white dark:bg-gray-950">
      <div className="flex h-16 items-center justify-between px-4">
        {/* 左侧区域 */}
        <div className="flex items-center gap-4">
          {/* 菜单按钮 */}
          <MedicalButton
            variant="ghost"
            size="icon"
            onClick={onToggleSidebar}
            aria-label="切换侧边栏"
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </MedicalButton>

          {/* Logo (移动端显示) */}
          <div className="md:hidden">
            <Link href="/">
              <ShieldLogo size="sm" showText={true} />
            </Link>
          </div>

          {/* 搜索框 */}
          <div className="hidden md:block relative w-64">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="全局搜索..." className="pl-8 h-9 md:w-64 lg:w-80" />
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </div>
        </div>

        {/* 右侧区域 */}
        <div className="flex items-center gap-3">
          {/* 搜索图标 (移动端) */}
          <MedicalButton
            variant="ghost"
            size="icon"
            aria-label="搜索"
            className="md:hidden"
            onClick={() => setShowSearch(!showSearch)}
          >
            <Search className="h-5 w-5" />
          </MedicalButton>

          {/* 切换主题 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <MedicalButton variant="ghost" size="icon" aria-label="切换主题">
                {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </MedicalButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>
                <Sun className="mr-2 h-4 w-4" />
                <span>浅色模式</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>
                <Moon className="mr-2 h-4 w-4" />
                <span>深色模式</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>
                <Settings className="mr-2 h-4 w-4" />
                <span>系统默认</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 通知中心 */}
          <DropdownMenu open={showNotifications} onOpenChange={setShowNotifications}>
            <DropdownMenuTrigger asChild>
              <MedicalButton variant="ghost" size="icon" aria-label="通知" className="relative">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge
                    variant="default"
                    className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-medical-500"
                  >
                    {notificationCount}
                  </Badge>
                )}
              </MedicalButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80" align="end">
              <DropdownMenuLabel className="flex items-center justify-between">
                <span>通知</span>
                <MedicalButton variant="ghost" size="sm" className="h-8 text-xs">
                  全部标为已读
                </MedicalButton>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-96 overflow-y-auto">
                {/* 通知项目 */}
                <div className="px-3 py-2 hover:bg-muted/50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">资质验证完成</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">10分钟前</span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">张医生的《医师资格证》已通过验证</p>
                </div>
                <div className="px-3 py-2 hover:bg-muted/50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">系统更新</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">1小时前</span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">MediNexus³ 已更新至 3.5.2 版本</p>
                </div>
                <div className="px-3 py-2 hover:bg-muted/50 cursor-pointer">
                  <div className="flex justify-between items-start">
                    <p className="font-medium text-sm">API使用量警告</p>
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">昨天</span>
                  </div>
                  <p className="text-sm mt-1 text-muted-foreground">医证通API使用量已达到月度配额的85%</p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex justify-center">查看全部通知</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* 键盘快捷键 */}
          <MedicalButton variant="ghost" size="icon" aria-label="键盘快捷键">
            <Keyboard className="h-5 w-5" />
          </MedicalButton>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted dark:bg-gray-800 hover:bg-muted/80 overflow-hidden border">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/doctor-avatar.png" alt="医生头像" />
                  <AvatarFallback>医生</AvatarFallback>
                </Avatar>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium">李医生</p>
                  <p className="text-xs text-muted-foreground">主治医师 · 心胸外科</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>个人资料</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  <span>消息中心</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>系统设置</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>帮助中心</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* 搜索框 (移动端, 展开时显示) */}
      {showSearch && (
        <div className="p-4 border-b md:hidden">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="全局搜索..." className="pl-8" autoFocus />
          </div>
        </div>
      )}
    </header>
  )
}
