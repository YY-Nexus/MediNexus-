"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { optimizedNavItems, getNavItemsByRole, type NavGroup } from "@/config/optimized-navigation"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ShieldLogo } from "@/components/brand/shield-logo"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { MedicalButton } from "@/components/ui/medical-button"
import { Badge } from "@/components/ui/badge"
import { ChevronRight, ChevronDown, Sparkles, X, Menu } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface RoleBasedSidebarProps {
  isCollapsed: boolean
  setIsCollapsed: (collapsed: boolean) => void
  className?: string
}

export function RoleBasedSidebar({ isCollapsed, setIsCollapsed, className }: RoleBasedSidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [openGroups, setOpenGroups] = useState<string[]>([])
  const [currentRole, setCurrentRole] = useState<string>("doctor")
  const [navItems, setNavItems] = useState<NavGroup[]>(optimizedNavItems)
  const [activeItem, setActiveItem] = useState<string | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const sidebarRef = useRef<HTMLElement>(null)

  // 角色列表
  const roles = [
    { id: "doctor", name: "医生" },
    { id: "nurse", name: "护士" },
    { id: "researcher", name: "研究人员" },
    { id: "admin", name: "系统管理员" },
    { id: "it", name: "IT人员" },
    { id: "finance", name: "财务人员" },
    { id: "receptionist", name: "前台" },
    { id: "pharmacist", name: "药剂师" },
    { id: "lab", name: "实验室人员" },
  ]

  // 根据角色更新导航项
  useEffect(() => {
    setNavItems(getNavItemsByRole(currentRole))
  }, [currentRole])

  // 根据当前路径自动展开对应的分组
  useEffect(() => {
    // 找到当前活动的路径所属的分组
    navItems.forEach((group) => {
      group.items.forEach((item) => {
        if (item.children) {
          const isActive = item.children.some(
            (child) => pathname === child.href || (child.href && pathname.startsWith(child.href + "/")),
          )

          if (isActive && !openGroups.includes(item.title)) {
            setOpenGroups((prev) => [...prev, item.title])
          }
        }
      })
    })
  }, [pathname, openGroups, navItems])

  // 处理侧边栏折叠/展开的动画
  const handleToggleSidebar = () => {
    setIsAnimating(true)
    setIsCollapsed(!isCollapsed)
    // 动画结束后重置状态
    setTimeout(() => {
      setIsAnimating(false)
    }, 300) // 与CSS过渡时间相匹配
  }

  // 处理分组的展开/折叠
  const toggleGroup = (title: string) => {
    if (isCollapsed) {
      // 如果侧边栏处于折叠状态，先展开侧边栏
      handleToggleSidebar()
      // 然后确保分组被展开
      if (!openGroups.includes(title)) {
        setOpenGroups((prev) => [...prev, title])
      }
    } else {
      // 正常切换分组状态
      setOpenGroups((prev) => (prev.includes(title) ? prev.filter((item) => item !== title) : [...prev, title]))
    }
  }

  // 处理导航项点击
  const handleNavItemClick = (href: string, e: React.MouseEvent, title: string) => {
    e.preventDefault() // 阻止默认行为
    setActiveItem(title)
    setTimeout(() => {
      router.push(href) // 使用路由器导航
      setActiveItem(null)
    }, 200)
  }

  // 检查分组是否展开
  const isGroupOpen = (title: string) => openGroups.includes(title)

  // 检查菜单项是否处于活动状态
  const isItemActive = (href?: string) => {
    if (!href) return false
    return pathname === href || pathname.startsWith(href + "/")
  }

  return (
    <TooltipProvider delayDuration={100}>
      <aside
        ref={sidebarRef}
        className={cn(
          "h-screen border-r bg-white dark:bg-gray-950 flex flex-col",
          isCollapsed ? "w-[70px]" : "w-[280px]",
          "transition-all duration-300 ease-in-out",
          className,
        )}
      >
        {/* 顶部Logo区域 */}
        <div className="h-16 border-b flex items-center px-4 justify-between">
          {!isCollapsed ? (
            <>
              <Link
                href="/"
                className={cn(
                  "flex items-center",
                  "transition-all duration-300 ease-in-out hover:scale-105",
                  isAnimating && isCollapsed ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0",
                )}
              >
                <ShieldLogo size="md" showText={true} />
              </Link>
              <MedicalButton
                variant="ghost"
                size="icon"
                onClick={handleToggleSidebar}
                aria-label="折叠侧边栏"
                className={cn(
                  "transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95",
                  "animate-in fade-in duration-300",
                )}
              >
                <X className="h-4 w-4 transition-transform duration-300 hover:rotate-90" />
              </MedicalButton>
            </>
          ) : (
            <div className="flex w-full justify-center items-center">
              <MedicalButton
                variant="ghost"
                size="icon"
                onClick={handleToggleSidebar}
                aria-label="展开侧边栏"
                className="transition-all duration-200 hover:bg-blue-50 hover:text-blue-700 active:scale-95"
              >
                <Menu className="h-5 w-5 transition-transform duration-300 hover:rotate-180" />
              </MedicalButton>
            </div>
          )}
        </div>

        {/* 角色选择器 */}
        {!isCollapsed && (
          <div
            className={cn(
              "p-4 border-b",
              "transition-all duration-300 ease-in-out",
              isAnimating ? "opacity-0 translate-y-5" : "opacity-100 translate-y-0",
            )}
          >
            <Select value={currentRole} onValueChange={setCurrentRole}>
              <SelectTrigger className="w-full transition-all duration-200 hover:border-blue-300 focus:ring-blue-200">
                <SelectValue placeholder="选择角色" />
              </SelectTrigger>
              <SelectContent className="animate-in zoom-in-90 duration-200">
                {roles.map((role) => (
                  <SelectItem
                    key={role.id}
                    value={role.id}
                    className="transition-colors duration-200 hover:bg-blue-50 focus:bg-blue-50 focus:text-blue-700"
                  >
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 导航区域 */}
        <ScrollArea className="flex-1">
          <nav
            className={cn(
              "p-2",
              "transition-all duration-300 ease-in-out",
              isAnimating && isCollapsed ? "opacity-0" : "opacity-100",
            )}
          >
            {navItems.map((group) => (
              <div key={group.title} className="mb-4">
                {!isCollapsed && (
                  <h3
                    className={cn(
                      "px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1",
                      "transition-all duration-300 ease-in-out",
                      isAnimating ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0",
                    )}
                  >
                    {group.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item.title}>
                      {item.children ? (
                        <Collapsible open={!isCollapsed && isGroupOpen(item.title)} className="w-full">
                          <CollapsibleTrigger
                            onClick={() => toggleGroup(item.title)}
                            className={cn(
                              "flex w-full items-center justify-between rounded-md px-3 py-2 group",
                              "text-sm font-medium transition-all duration-200 ease-in-out",
                              "hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 active:scale-[0.98]",
                              isItemActive(item.children[0].href) && !isCollapsed
                                ? "bg-blue-50 text-blue-700 shadow-sm"
                                : "text-muted-foreground hover:text-blue-700",
                            )}
                          >
                            {isCollapsed ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center justify-center w-full py-1 relative">
                                    <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                    {item.badge && (
                                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="right" className="animate-in zoom-in-50 duration-200">
                                  <div>
                                    {item.title}
                                    {item.badge && (
                                      <Badge variant="outline" className="ml-2 text-[10px] py-0 h-4">
                                        {item.badge}
                                      </Badge>
                                    )}
                                  </div>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <>
                                <div className="flex items-center gap-3">
                                  <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                                  <span
                                    className={cn(
                                      "transition-all duration-300 ease-in-out",
                                      isAnimating && isCollapsed
                                        ? "opacity-0 translate-x-5"
                                        : "opacity-100 translate-x-0",
                                    )}
                                  >
                                    {item.title}
                                  </span>
                                  {item.badge && (
                                    <Badge
                                      variant="outline"
                                      className={cn(
                                        "ml-auto text-[10px] py-0 h-4",
                                        "transition-all duration-300 ease-in-out group-hover:bg-blue-100 group-hover:text-blue-700",
                                        isAnimating && isCollapsed ? "opacity-0" : "opacity-100",
                                      )}
                                    >
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                                <div
                                  className={cn(
                                    "transition-all duration-300 ease-in-out group-hover:scale-110",
                                    isAnimating && isCollapsed ? "opacity-0" : "opacity-100",
                                  )}
                                >
                                  {isGroupOpen(item.title) ? (
                                    <ChevronDown className="h-4 w-4 animate-in zoom-in-75 duration-200" />
                                  ) : (
                                    <ChevronRight className="h-4 w-4 animate-in zoom-in-75 duration-200" />
                                  )}
                                </div>
                              </>
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent
                            className={cn(
                              "pl-8 space-y-1 pt-1",
                              "animate-in slide-in-from-left-5 duration-300 ease-in-out",
                            )}
                          >
                            {!isCollapsed &&
                              item.children.map((child) => (
                                <a
                                  key={child.href}
                                  href={child.href}
                                  onClick={(e) => handleNavItemClick(child.href || "", e, child.title)}
                                  className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-1.5 group",
                                    "text-sm transition-all duration-200 ease-in-out",
                                    "hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 active:scale-[0.98]",
                                    isItemActive(child.href)
                                      ? "font-medium text-blue-700 bg-blue-50 shadow-sm"
                                      : "text-muted-foreground hover:text-blue-700",
                                    activeItem === child.title && "animate-pulse bg-blue-50",
                                  )}
                                >
                                  <child.icon className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                  <span className="animate-in fade-in duration-300">{child.title}</span>
                                  {child.badge && (
                                    <Badge
                                      variant="outline"
                                      className="ml-auto text-[10px] py-0 h-4 transition-all duration-200 group-hover:bg-blue-100 group-hover:text-blue-700"
                                    >
                                      {child.badge}
                                    </Badge>
                                  )}
                                </a>
                              ))}
                          </CollapsibleContent>
                        </Collapsible>
                      ) : isCollapsed ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <a
                              href={item.href}
                              onClick={(e) => handleNavItemClick(item.href || "", e, item.title)}
                              className={cn(
                                "flex items-center justify-center rounded-md p-2 group",
                                "text-sm font-medium transition-all duration-200 ease-in-out",
                                "hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 active:scale-[0.98]",
                                isItemActive(item.href)
                                  ? "bg-blue-50 text-blue-700 shadow-sm"
                                  : "text-muted-foreground hover:text-blue-700",
                                activeItem === item.title && "animate-pulse bg-blue-50",
                              )}
                            >
                              <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent side="right" className="animate-in zoom-in-50 duration-200">
                            {item.title}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => handleNavItemClick(item.href || "", e, item.title)}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2 group",
                            "text-sm font-medium transition-all duration-200 ease-in-out",
                            "hover:bg-blue-50 hover:shadow-sm active:bg-blue-100 active:scale-[0.98]",
                            isItemActive(item.href)
                              ? "bg-blue-50 text-blue-700 shadow-sm"
                              : "text-muted-foreground hover:text-blue-700",
                            activeItem === item.title && "animate-pulse bg-blue-50",
                          )}
                        >
                          <item.icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                          <span
                            className={cn(
                              "transition-all duration-300 ease-in-out",
                              isAnimating && isCollapsed ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0",
                            )}
                          >
                            {item.title}
                          </span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </ScrollArea>

        {/* 升级提示 */}
        <div className="border-t p-2">
          <div
            className={cn(
              "rounded-md bg-gradient-to-r from-blue-50 to-blue-50 dark:from-blue-950/50 dark:to-blue-950/50",
              "p-3 transition-all duration-300 ease-in-out",
              "hover:shadow-md hover:from-blue-100 hover:to-blue-50 cursor-pointer",
            )}
          >
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center">
                    <Sparkles className="h-5 w-5 text-blue-500 transition-all duration-300 hover:scale-110 hover:text-blue-600 animate-pulse" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="w-40 animate-in zoom-in-50 duration-200">
                  <p className="font-medium">升级至专业版</p>
                  <p className="text-xs opacity-70">解锁全部高级功能</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="flex items-center gap-2 group">
                <Sparkles className="h-5 w-5 text-blue-500 transition-transform duration-300 group-hover:scale-110 group-hover:text-blue-600" />
                <div
                  className={cn(
                    "transition-all duration-300 ease-in-out",
                    isAnimating && isCollapsed ? "opacity-0 translate-x-5" : "opacity-100 translate-x-0",
                  )}
                >
                  <p className="text-sm font-medium text-blue-700 dark:text-blue-300 group-hover:text-blue-800">
                    升级至专业版
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400">解锁全部高级功能</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 版本信息 */}
        {!isCollapsed && (
          <div
            className={cn(
              "p-2 text-center",
              "transition-all duration-300 ease-in-out",
              isAnimating ? "opacity-0" : "opacity-100",
            )}
          >
            <p className="text-xs text-muted-foreground hover:text-blue-600 transition-colors duration-200 cursor-default">
              MediNexus³ v3.5.2
            </p>
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}
