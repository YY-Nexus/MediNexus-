"use client"

import { DropdownMenuShortcut } from "@/components/ui/dropdown-menu"

import { useState } from "react"
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
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { User, Settings, HelpCircle, LogOut, Bell, Shield } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useUserAvatar } from "@/contexts/user-avatar-context"
import { DEFAULT_AVATAR } from "@/types/avatar-presets"
import { useTranslation } from "@/hooks/use-translation"

interface UserAvatarMenuProps {
  user: {
    name: string
    email: string
    role: string
    avatar?: string
  }
  onLogout?: () => void
  isDarkMode?: boolean
}

export function UserAvatarMenu({ user, onLogout, isDarkMode = false }: UserAvatarMenuProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [isOpen, setIsOpen] = useState(false)
  const { avatarUrl } = useUserAvatar()
  const { t } = useTranslation()

  const handleLogout = () => {
    if (onLogout) {
      onLogout()
    } else {
      // 默认登出行为
      toast({
        title: t("auth.loggedOut", "已登出"),
        description: t("auth.logoutSuccess", "您已成功退出系统"),
      })
      router.push("/login")
    }
  }

  const navigateTo = (path: string) => {
    setIsOpen(false)
    router.push(path)
  }

  // 使用上下文中的头像或用户头像或默认头像
  const displayAvatar = avatarUrl || user.avatar || DEFAULT_AVATAR

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={displayAvatar || "/placeholder.svg"} alt={user.name} />
            <AvatarFallback>{user.name?.[0] || "用"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
            <p className="text-xs leading-none text-muted-foreground mt-1">{user.role}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => navigateTo("/profile")}>
            <User className="mr-2 h-4 w-4" />
            <span>{t("menu.profile", "个人资料")}</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/settings")}>
            <Settings className="mr-2 h-4 w-4" />
            <span>{t("menu.settings", "系统设置")}</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/security/account")}>
            <Shield className="mr-2 h-4 w-4" />
            <span>{t("menu.security", "账户安全")}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => navigateTo("/notifications")}>
            <Bell className="mr-2 h-4 w-4" />
            <span>{t("menu.notifications", "通知中心")}</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigateTo("/help")}>
          <HelpCircle className="mr-2 h-4 w-4" />
          <span>{t("menu.help", "帮助中心")}</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>{t("menu.logout", "退出登录")}</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
