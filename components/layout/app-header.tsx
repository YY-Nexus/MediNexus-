"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Search, Settings, HelpCircle, LogOut, User, MessageSquare, Keyboard, Sun, Moon } from "lucide-react"
import { MedicalButton } from "@/components/ui/medical-button"
import { Logo } from "@/components/brand/logo"
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
import { useTheme } from "next-themes"
import { NotificationCenter } from "@/components/notifications/notification-center"
import { motion } from "framer-motion"

interface AppHeaderProps {
  onToggleSidebar: () => void
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [showSearch, setShowSearch] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const { theme, setTheme } = useTheme()
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`)
      setShowSearch(false)
    }
  }

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
              <Logo variant="compact" />
            </Link>
          </div>

          {/* 搜索框 */}
          <form onSubmit={handleSearch} className="hidden md:flex relative w-64">
            <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="全局搜索..."
              className="pl-8 h-9 md:w-64 lg:w-80"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden md:inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs text-muted-foreground">
              <span className="text-xs">Ctrl</span>K
            </kbd>
          </form>
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
                <motion.div
                  animate={{ rotate: theme === "dark" ? 180 : 0 }}
                  transition={{ duration: 0.5, type: "spring" }}
                >
                  {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </motion.div>
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
          <NotificationCenter />

          {/* 键盘快捷键 */}
          <MedicalButton variant="ghost" size="icon" aria-label="键盘快捷键">
            <Keyboard className="h-5 w-5" />
          </MedicalButton>

          {/* 用户菜单 */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <motion.button
                className="relative flex h-8 w-8 items-center justify-center rounded-full bg-muted dark:bg-gray-800 hover:bg-muted/80 overflow-hidden border"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/doctor-avatar.png" alt="医生头像" />
                  <AvatarFallback>医生</AvatarFallback>
                </Avatar>
              </motion.button>
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
        <motion.div
          className="p-4 border-b md:hidden"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="全局搜索..."
              className="pl-8"
              autoFocus
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </motion.div>
      )}
    </header>
  )
}
