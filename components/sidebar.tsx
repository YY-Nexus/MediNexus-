"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"
import { ChevronDown, ChevronRight, Keyboard, Menu, X } from "lucide-react"
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { isClient } from "@/utils/client-utils"
import { ShieldLogo } from "@/components/brand/shield-logo"
import { MedicalButton } from "@/components/ui/medical-button"
import { NavigationSearch } from "@/components/navigation-search"

// 导入导航配置
import { navItems } from "@/config/navigation"

// 添加测试ID属性
interface SidebarProps {
  className?: string
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  testId?: string
}

export function Sidebar({ className, isCollapsed, setIsCollapsed, testId = "sidebar" }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [openItems, setOpenItems] = useState<string[]>([])
  const isMobile = useIsMobile()
  const [isAnimating, setIsAnimating] = useState(false)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isHoveringCollapseButton, setIsHoveringCollapseButton] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)

  // 自动展开当前活动的菜单项
  useEffect(() => {
    if (!isClient) return

    const activeParent = navItems.find((item) => item.children?.some((child) => pathname.startsWith(child.href)))
    if (activeParent && !openItems.includes(activeParent.title)) {
      setOpenItems((prev) => [...prev, activeParent.title])
    }
  }, [pathname, openItems])

  const toggleItem = (title: string) => {
    setOpenItems((current) =>
      current.includes(title) ? current.filter((item) => item !== title) : [...current, title],
    )
  }

  const isItemOpen = (title: string) => openItems.includes(title)

  // 在移动设备上，默认折叠侧边栏
  useEffect(() => {
    if (!isClient) return

    if (isMobile) {
      setIsCollapsed(true)
    }
  }, [isMobile, setIsCollapsed])

  // 处理侧边栏折叠/展开的动画
  const handleToggleSidebar = () => {
    setIsAnimating(true)
    setIsCollapsed(!isCollapsed)
    // 动画结束后重置状态
    setTimeout(() => {
      setIsAnimating(false)
    }, 300) // 与CSS过渡时间相匹配
  }

  // 处理父菜单项点击
  const handleParentItemClick = (title: string) => {
    if (!isCollapsed) {
      toggleItem(title)
    }
  }

  // 处理导航项点击时的视觉反馈
  const handleItemClick = (href: string, title: string) => {
    setActiveItem(title)
    setTimeout(() => setActiveItem(null), 300)
  }

  return (
    <TooltipProvider delayDuration={300}>
      <div
        ref={sidebarRef}
        data-testid={testId}
        className={cn(
          "h-screen border-r border-blue-100 bg-white",
          "transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64",
          isMobile ? "hidden" : "flex flex-col",
          isAnimating ? "overflow-hidden" : "",
          className,
        )}
      >
        <div className="flex h-16 items-center border-b border-blue-100 px-4 justify-between">
          <div className="flex items-center gap-2">
            {!isCollapsed ? (
              <Link href="/" data-testid="sidebar-logo-expanded" className="transition-transform hover:scale-105">
                <ShieldLogo size="md" showText={true} />
              </Link>
            ) : (
              <Link href="/" data-testid="sidebar-logo-collapsed" className="transition-transform hover:scale-110">
                <ShieldLogo size="sm" showText={false} />
              </Link>
            )}
          </div>

          {/* 折叠/展开按钮 */}
          <MedicalButton
            variant="ghost"
            size="icon"
            onClick={handleToggleSidebar}
            onMouseEnter={() => setIsHoveringCollapseButton(true)}
            onMouseLeave={() => setIsHoveringCollapseButton(false)}
            className={cn(
              "transition-all duration-200 hover:bg-blue-50 hover:text-blue-700",
              "active:scale-95 focus:ring-blue-200",
              isHoveringCollapseButton && "bg-blue-50 text-blue-700",
            )}
            aria-label={isCollapsed ? "展开侧边栏" : "折叠侧边栏"}
          >
            {isCollapsed ? (
              <Menu className="h-4 w-4 transition-transform duration-300 ease-in-out" />
            ) : (
              <X className="h-4 w-4 transition-transform duration-300 ease-in-out" />
            )}
          </MedicalButton>
        </div>

        {/* 搜索框 - 仅在展开状态显示 */}
        {!isCollapsed && (
          <div
            className={cn(
              "px-3 py-2 border-b border-blue-100",
              "transition-all duration-300 ease-in-out",
              isAnimating ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0",
            )}
          >
            <NavigationSearch />
          </div>
        )}

        <nav className="flex-1 overflow-y-auto p-2">
          <ul
            className={cn(
              "space-y-1",
              "transition-opacity duration-300 ease-in-out",
              isAnimating && isCollapsed ? "opacity-0" : "opacity-100",
            )}
          >
            {navItems.map((item) => (
              <li key={item.title} data-testid={`nav-item-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                {item.children ? (
                  <Collapsible open={!isCollapsed && isItemOpen(item.title)} className="w-full">
                    <div
                      onClick={() => handleParentItemClick(item.title)}
                      data-testid={`nav-parent-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                      className={cn(
                        "flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 cursor-pointer",
                        "transition-all duration-200 ease-in-out",
                        "hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 active:scale-[0.98]",
                        pathname.startsWith(item.children[0].href)
                          ? "bg-blue-gradient text-white shadow-md"
                          : "text-blue-700 hover:text-blue-900",
                      )}
                    >
                      <div className="flex items-center gap-3">
                        {isCollapsed ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <item.icon
                                className={cn(
                                  "h-5 w-5 mx-auto",
                                  "transition-all duration-300 ease-in-out",
                                  "group-hover:scale-110",
                                )}
                              />
                            </TooltipTrigger>
                            <TooltipContent side="right" className="animate-in zoom-in-50 duration-200">
                              {item.title}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <>
                            <item.icon
                              className={cn(
                                "h-5 w-5",
                                "transition-all duration-300 ease-in-out",
                                "group-hover:scale-110",
                              )}
                            />
                            <span
                              className={cn(
                                "transition-all duration-300 ease-in-out",
                                isAnimating && isCollapsed ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0",
                              )}
                            >
                              {item.title}
                            </span>
                          </>
                        )}
                      </div>
                      {!isCollapsed && (
                        <div className="transition-transform duration-200">
                          {isItemOpen(item.title) ? (
                            <ChevronDown
                              className="h-4 w-4 transition-transform hover:scale-110 animate-in zoom-in-75 duration-200"
                              data-testid="nav-chevron-down"
                            />
                          ) : (
                            <ChevronRight
                              className="h-4 w-4 transition-transform hover:scale-110 animate-in zoom-in-75 duration-200"
                              data-testid="nav-chevron-right"
                            />
                          )}
                        </div>
                      )}
                    </div>
                    <CollapsibleContent
                      className={cn("pl-10 space-y-1 mt-1", "animate-in slide-in-from-left-5 duration-300 ease-in-out")}
                    >
                      {!isCollapsed &&
                        item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => handleItemClick(child.href, child.title)}
                            data-testid={`nav-child-${child.title.toLowerCase().replace(/\s+/g, "-")}`}
                            className={cn(
                              "flex items-center gap-3 rounded-lg px-3 py-2 group",
                              "transition-all duration-200 ease-in-out",
                              "hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 active:scale-[0.98]",
                              pathname === child.href
                                ? "bg-blue-100 text-blue-800 font-medium shadow-sm"
                                : "text-blue-600 hover:text-blue-900",
                              activeItem === child.title && "animate-pulse bg-blue-50",
                            )}
                          >
                            <child.icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                            <span className="animate-in fade-in duration-300 ease-in-out">{child.title}</span>
                          </Link>
                        ))}
                    </CollapsibleContent>
                  </Collapsible>
                ) : isCollapsed ? (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        onClick={() => handleItemClick(item.href, item.title)}
                        data-testid={`nav-link-collapsed-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                        className={cn(
                          "flex items-center justify-center rounded-lg px-3 py-2 group",
                          "transition-all duration-200 ease-in-out",
                          "hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 active:scale-[0.98]",
                          pathname === item.href
                            ? "bg-blue-gradient text-white shadow-md"
                            : "text-blue-700 hover:text-blue-900",
                          activeItem === item.title && "animate-pulse bg-blue-50",
                        )}
                      >
                        <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" className="animate-in zoom-in-50 duration-200">
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => handleItemClick(item.href, item.title)}
                    data-testid={`nav-link-expanded-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 group",
                      "transition-all duration-200 ease-in-out",
                      "hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 active:scale-[0.98]",
                      pathname === item.href
                        ? "bg-blue-gradient text-white shadow-md"
                        : "text-blue-700 hover:text-blue-900",
                      activeItem === item.title && "animate-pulse bg-blue-50",
                    )}
                  >
                    <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                    <span
                      className={cn(
                        "transition-all duration-300 ease-in-out",
                        isAnimating && isCollapsed ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0",
                      )}
                    >
                      {item.title}
                    </span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="border-t border-blue-100 p-2">
          <div
            className={cn(
              "rounded-lg bg-blue-50 p-3",
              "transition-all duration-300 ease-in-out",
              "hover:bg-blue-100 hover:shadow-sm cursor-pointer",
              isCollapsed ? "text-center" : "flex items-center gap-3",
            )}
          >
            <div
              className={cn(
                "flex h-8 w-8 items-center justify-center rounded-full bg-blue-100",
                "transition-all duration-300 ease-in-out hover:scale-105",
                isCollapsed ? "mx-auto" : "",
              )}
              data-testid="sidebar-pro-badge"
            >
              <span className="text-xs font-medium text-blue-700">PRO</span>
            </div>
            {!isCollapsed && (
              <div
                className={cn(
                  "space-y-1",
                  "transition-all duration-300 ease-in-out",
                  isAnimating ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0",
                )}
              >
                <p className="text-sm font-medium text-blue-800">升级专业版</p>
                <p className="text-xs text-blue-600">解锁全部高级功能</p>
              </div>
            )}
          </div>
        </div>
        {!isCollapsed && (
          <div
            className={cn(
              "border-t border-blue-100 p-2",
              "transition-all duration-300 ease-in-out",
              isAnimating ? "opacity-0" : "opacity-100",
            )}
          >
            <div className="flex items-center justify-between text-xs text-gray-500 px-3 py-2 hover:bg-gray-50 rounded-md transition-colors duration-200">
              <div className="flex items-center gap-1">
                <Keyboard className="h-3 w-3" />
                <span>搜索快捷键:</span>
              </div>
              <div className="flex items-center gap-1 bg-gray-100 px-1.5 py-0.5 rounded transition-transform hover:scale-105">
                <span>⌘</span>
                <span>+</span>
                <span>K</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </TooltipProvider>
  )
}
