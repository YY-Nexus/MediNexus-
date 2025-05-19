"use client"

import type React from "react"

import { useState } from "react"
import { Menu, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NotificationIndicator } from "@/components/layout/notification-indicator"
import { UserAvatarMenu } from "@/components/user-avatar-menu"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTranslation } from "@/hooks/use-translation"

interface AppHeaderProps {
  onToggleSidebar?: () => void
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const { theme } = useTheme()
  const { t } = useTranslation()

  const isDarkMode = theme === "dark"

  // 模拟用户数据，实际应用中应从认证系统获取
  const user = {
    name: "张医生",
    email: "doctor.zhang@medinexus.com",
    role: "主治医师",
    avatar: "/doctor-avatar.png",
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("搜索查询:", searchQuery)
    // 实现搜索逻辑
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b bg-background px-4 md:px-6">
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleSidebar}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">{t("header.toggleSidebar", "切换侧边栏")}</span>
        </Button>
        <form onSubmit={handleSearch} className="hidden md:flex md:w-80 lg:w-96">
          <div className="relative w-full">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder={t("header.searchPlaceholder", "搜索...")}
              className="w-full pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </form>
      </div>
      <div className="flex items-center gap-2 md:gap-4">
        <Button variant="ghost" size="icon" className="md:hidden" aria-label={t("header.search", "搜索")}>
          <Search className="h-5 w-5" />
          <span className="sr-only">{t("header.search", "搜索")}</span>
        </Button>

        {/* 主题切换按钮 */}
        <ThemeToggle />

        {/* 通知指示器 */}
        <NotificationIndicator />

        {/* 用户头像菜单 */}
        <UserAvatarMenu user={user} isDarkMode={isDarkMode} />
      </div>
    </header>
  )
}
