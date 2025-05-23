"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { MedicalButton } from "@/components/ui/medical-button"
import { MainNav } from "@/components/main-nav"
import { MobileNav } from "@/components/mobile-nav"
import { UserNav } from "@/components/user-nav"
import { PageBreadcrumb } from "@/components/layout/page-breadcrumb"
import { NavigationSearch } from "@/components/navigation-search"
import { Menu } from "lucide-react"

interface AppHeaderProps {
  onToggleSidebar: () => void
}

export function AppHeader({ onToggleSidebar }: AppHeaderProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const pathname = usePathname()

  // 获取当前页面标题
  const getPageTitle = () => {
    const path = pathname.split("/").filter(Boolean)
    if (path.length === 0) return "仪表盘"

    // 将路径转换为标题格式
    const lastSegment = path[path.length - 1]
    return lastSegment
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="md:hidden">
        <MedicalButton
          variant="ghost"
          size="icon"
          onClick={onToggleSidebar}
          className="mr-2 transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">切换侧边栏</span>
        </MedicalButton>
      </div>

      <div className="flex-1">
        <div className="hidden md:flex">
          <PageBreadcrumb />
        </div>
        <div className="md:hidden">
          <h1 className="text-lg font-medium">{getPageTitle()}</h1>
        </div>
      </div>

      <div className="hidden md:flex md:flex-1 md:items-center md:justify-end md:gap-4">
        <div className="w-full max-w-sm">
          <NavigationSearch />
        </div>
        <MainNav onToggleSidebar={onToggleSidebar} />
        <UserNav />
      </div>

      <div className="md:hidden">
        <MobileNav />
      </div>
    </header>
  )
}
