"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Globe, User, Settings, LogOut, Moon, Sun, HelpCircle } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

// 临时用户头像组件，避免导入错误
function UserAvatar({ user, className = "" }: { user: any; className?: string }) {
  return (
    <div className={`rounded-full bg-medical-100 flex items-center justify-center text-medical-600 ${className}`}>
      {user.avatar ? (
        <img
          src={user.avatar || "/placeholder.svg"}
          alt={user.name}
          className="rounded-full h-full w-full object-cover"
        />
      ) : (
        <User className="h-5 w-5" />
      )}
    </div>
  )
}

export function LanguageSwitcher() {
  const { locale, setLocale, availableLocales, localeName } = useLanguage()
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")
  const router = useRouter()

  // 模拟用户数据
  const user = {
    name: "张医生",
    role: "主治医师",
    avatar: "/doctor-avatar.png",
  }

  // 避免水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  // 处理退出登录
  const handleLogout = () => {
    // 这里可以添加退出登录的逻辑，如清除token等
    console.log("退出登录")
    // 跳转到登录页面
    router.push("/login")
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center gap-2">
      {/* 语言切换器 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 whitespace-nowrap">
            <Globe className="h-4 w-4" />
            <span className="font-normal">简体中文</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {availableLocales.map((lang) => (
            <DropdownMenuItem
              key={lang}
              onClick={() => setLocale(lang)}
              className={`${locale === lang ? "bg-muted" : ""} whitespace-nowrap`}
            >
              {localeName(lang)}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* 个人设置 */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="flex items-center gap-2 whitespace-nowrap p-0">
            <UserAvatar user={user} className="h-8 w-8" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <div className="flex items-center justify-start p-2">
            <UserAvatar user={user} className="h-10 w-10 mr-3" />
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-xs text-muted-foreground">{user.role}</p>
            </div>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuLabel>外观</DropdownMenuLabel>
          <div className="p-2">
            <div className="flex items-center justify-between rounded-md border p-1">
              <Button
                variant={theme === "light" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setTheme("light")}
              >
                <Sun className="h-4 w-4 mr-2" />
                浅色
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "ghost"}
                size="sm"
                className="w-full justify-start"
                onClick={() => setTheme("dark")}
              >
                <Moon className="h-4 w-4 mr-2" />
                深色
              </Button>
            </div>
          </div>
          <DropdownMenuSeparator />
          <Link href="/profile" passHref legacyBehavior>
            <DropdownMenuItem asChild>
              <a className="cursor-pointer">
                <User className="h-4 w-4 mr-2" />
                <span>个人资料</span>
              </a>
            </DropdownMenuItem>
          </Link>
          <Link href="/settings" passHref legacyBehavior>
            <DropdownMenuItem asChild>
              <a className="cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                <span>系统设置</span>
              </a>
            </DropdownMenuItem>
          </Link>
          <Link href="/help" passHref legacyBehavior>
            <DropdownMenuItem asChild>
              <a className="cursor-pointer">
                <HelpCircle className="h-4 w-4 mr-2" />
                <span>帮助与支持</span>
              </a>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
            <LogOut className="h-4 w-4 mr-2" />
            <span>退出登录</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
