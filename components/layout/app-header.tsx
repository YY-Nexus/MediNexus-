"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageSwitcher } from "@/components/language-switcher"
import { EnhancedNotificationIndicator } from "@/components/layout/enhanced-notification-indicator"
import { UserAvatarMenu } from "@/components/user-avatar-menu"
import { Search, HelpCircle, Menu } from "lucide-react"
import { PageBreadcrumb } from "@/components/layout/page-breadcrumb"
import { ShieldLogo } from "@/components/brand/shield-logo"
import { useState } from "react"

export function AppHeader() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 模拟用户数据，实际应用中应从认证系统获取
  const user = {
    name: "张医生",
    email: "doctor.zhang@medinexus.com",
    role: "主治医师",
    avatar: "/doctor-avatar.png",
  }

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-white">
      <div className="container flex h-16 items-center">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-5 w-5" />
            <span className="sr-only">菜单</span>
          </Button>

          <Link href="/" className="flex items-center gap-2">
            <ShieldLogo size="sm" showText={true} />
          </Link>
        </div>

        <div className="ml-4 hidden md:block">
          <PageBreadcrumb />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              type="search"
              placeholder="搜索..."
              className="w-64 rounded-full bg-gray-50 pl-8 focus-visible:ring-blue-500"
            />
          </div>

          <Button variant="ghost" size="icon" className="text-gray-700">
            <HelpCircle className="h-5 w-5" />
            <span className="sr-only">帮助</span>
          </Button>

          <EnhancedNotificationIndicator />

          <LanguageSwitcher />

          <ThemeToggle />

          {/* 传递用户数据给UserAvatarMenu组件 */}
          <UserAvatarMenu user={user} />
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* 这里可以添加移动端导航菜单项 */}
            <Link
              href="/"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              首页
            </Link>
            <Link
              href="/ai-diagnosis"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              智能诊断
            </Link>
            <Link
              href="/patients"
              className="block rounded-md px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900"
            >
              患者管理
            </Link>
            {/* 更多菜单项... */}
          </div>
        </div>
      )}
    </header>
  )
}

export default AppHeader
