"use client"

import { useState } from "react"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  User,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  Moon,
  Sun,
  Languages,
  Shield,
  UserCog,
  MessageSquare,
} from "lucide-react"

export function UserNav() {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light")

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
    // 实际应用中，这里会调用主题切换函数
  }

  return (
    <div className="flex items-center gap-4">
      {/* 通知按钮 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-blue-600" />
            <span className="sr-only">通知</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <DropdownMenuLabel>通知</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-80 overflow-y-auto">
            {/* 通知列表 */}
            <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-sm">系统更新</p>
                <span className="text-xs text-muted-foreground">10分钟前</span>
              </div>
              <p className="text-sm text-muted-foreground">MediNexus³ 已更新至 3.5.2 版本</p>
            </div>
            <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-sm">资质验证完成</p>
                <span className="text-xs text-muted-foreground">1小时前</span>
              </div>
              <p className="text-sm text-muted-foreground">张医生的《医师资格证》已通过验证</p>
            </div>
            <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
              <div className="flex justify-between items-start mb-1">
                <p className="font-medium text-sm">API使用量警告</p>
                <span className="text-xs text-muted-foreground">昨天</span>
              </div>
              <p className="text-sm text-muted-foreground">医证通API使用量已达到月度配额的85%</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/notifications" className="w-full cursor-pointer justify-center">
              查看全部通知
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 主题切换按钮 */}
      <Button variant="ghost" size="icon" onClick={toggleTheme}>
        {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
        <span className="sr-only">切换主题</span>
      </Button>

      {/* 用户菜单 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-9 w-9 rounded-full">
            <Avatar className="h-9 w-9">
              <AvatarImage src="/doctor-avatar.png" alt="用户头像" />
              <AvatarFallback>医生</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">张医生</p>
              <p className="text-xs leading-none text-muted-foreground">doctor.zhang@medinexus.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                <span>个人资料</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/settings">
                <Settings className="mr-2 h-4 w-4" />
                <span>设置</span>
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/security/account">
                <Shield className="mr-2 h-4 w-4" />
                <span>安全与隐私</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/certifications">
                <UserCog className="mr-2 h-4 w-4" />
                <span>资质管理</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/help">
                <HelpCircle className="mr-2 h-4 w-4" />
                <span>帮助中心</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/feedback">
                <MessageSquare className="mr-2 h-4 w-4" />
                <span>反馈建议</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Languages className="mr-2 h-4 w-4" />
              <span>语言</span>
              <DropdownMenuShortcut>简体中文</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-red-500 focus:text-red-500">
            <LogOut className="mr-2 h-4 w-4" />
            <span>退出登录</span>
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
