"use client"

import { useState } from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Menu, Sun, Moon, Settings, LogOut, Search, HelpCircle } from "lucide-react"
import { NotificationIndicator } from "@/components/layout/notification-indicator"

interface AppHeaderProps {
  onToggleSidebar: () => void
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const { setTheme } = useTheme()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <Button variant="ghost" size="icon" className="md:hidden" onClick={onToggleSidebar}>
        <Menu className="h-5 w-5" />
        <span className="sr-only">切换侧边栏</span>
      </Button>
      <div className="flex-1">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold">YanYu MediNexus³</span>
          <span className="rounded bg-primary px-1.5 py-0.5 text-xs text-primary-foreground">Admin</span>
        </Link>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setSearchOpen(true)}>
          <Search className="h-5 w-5" />
          <span className="sr-only">搜索</span>
        </Button>

        {/* 通知指示器 */}
        <NotificationIndicator />

        <Button variant="ghost" size="icon" asChild>
          <Link href="/help">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">帮助</span>
          </Link>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">切换主题</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>浅色</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>深色</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>系统</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/doctor-avatar.png" alt="医生头像" />
                <AvatarFallback>医生</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile">个人资料</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>设置</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/logout">
                <LogOut className="mr-2 h-4 w-4" />
                <span>退出登录</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
