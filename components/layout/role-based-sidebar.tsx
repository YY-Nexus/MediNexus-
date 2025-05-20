"use client"

import type React from "react"

import { useState, useEffect } from "react"
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

  // 处理分组的展开/折叠
  const toggleGroup = (title: string) => {
    if (isCollapsed) {
      // 如果侧边栏处于折叠状态，先展开侧边栏
      setIsCollapsed(false)
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
  const handleNavItemClick = (href: string, e: React.MouseEvent) => {
    e.preventDefault() // 阻止默认行为
    router.push(href) // 使用路由器导航
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
              <Link href="/" className="flex items-center">
                <ShieldLogo size="md" showText={true} />
              </Link>
              <MedicalButton variant="ghost" size="icon" onClick={() => setIsCollapsed(true)} aria-label="折叠侧边栏">
                <X className="h-4 w-4" />
              </MedicalButton>
            </>
          ) : (
            <div className="flex w-full justify-center items-center">
              <MedicalButton variant="ghost" size="icon" onClick={() => setIsCollapsed(false)} aria-label="展开侧边栏">
                <Menu className="h-5 w-5" />
              </MedicalButton>
            </div>
          )}
        </div>

        {/* 角色选择器 */}
        {!isCollapsed && (
          <div className="p-4 border-b">
            <Select value={currentRole} onValueChange={setCurrentRole}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="选择角色" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {/* 导航区域 */}
        <ScrollArea className="flex-1">
          <nav className="p-2">
            {navItems.map((group) => (
              <div key={group.title} className="mb-4">
                {!isCollapsed && (
                  <h3 className="px-3 text-xs font-medium text-muted-foreground uppercase tracking-wider mb-1">
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
                              "flex w-full items-center justify-between rounded-md px-3 py-2",
                              "text-sm font-medium transition-colors hover:bg-muted",
                              isItemActive(item.children[0].href) && !isCollapsed
                                ? "bg-medical-50 text-medical-700"
                                : "text-muted-foreground hover:text-foreground",
                            )}
                          >
                            {isCollapsed ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center justify-center w-full py-1 relative">
                                    <item.icon className="h-5 w-5" />
                                    {item.badge && (
                                      <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-medical-500" />
                                    )}
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="right">
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
                                  <item.icon className="h-5 w-5" />
                                  <span>{item.title}</span>
                                  {item.badge && (
                                    <Badge variant="outline" className="ml-auto text-[10px] py-0 h-4">
                                      {item.badge}
                                    </Badge>
                                  )}
                                </div>
                                {isGroupOpen(item.title) ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronRight className="h-4 w-4" />
                                )}
                              </>
                            )}
                          </CollapsibleTrigger>
                          <CollapsibleContent className="pl-8 space-y-1 pt-1">
                            {!isCollapsed &&
                              item.children.map((child) => (
                                <a
                                  key={child.href}
                                  href={child.href}
                                  onClick={(e) => handleNavItemClick(child.href || "", e)}
                                  className={cn(
                                    "flex items-center gap-2 rounded-md px-3 py-1.5",
                                    "text-sm transition-colors hover:bg-muted",
                                    isItemActive(child.href)
                                      ? "font-medium text-foreground bg-muted"
                                      : "text-muted-foreground hover:text-foreground",
                                  )}
                                >
                                  <child.icon className="h-4 w-4" />
                                  <span>{child.title}</span>
                                  {child.badge && (
                                    <Badge variant="outline" className="ml-auto text-[10px] py-0 h-4">
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
                              onClick={(e) => handleNavItemClick(item.href || "", e)}
                              className={cn(
                                "flex items-center justify-center rounded-md p-2",
                                "text-sm font-medium transition-colors hover:bg-muted",
                                isItemActive(item.href)
                                  ? "bg-medical-50 text-medical-700"
                                  : "text-muted-foreground hover:text-foreground",
                              )}
                            >
                              <item.icon className="h-5 w-5" />
                            </a>
                          </TooltipTrigger>
                          <TooltipContent side="right">{item.title}</TooltipContent>
                        </Tooltip>
                      ) : (
                        <a
                          href={item.href}
                          onClick={(e) => handleNavItemClick(item.href || "", e)}
                          className={cn(
                            "flex items-center gap-3 rounded-md px-3 py-2",
                            "text-sm font-medium transition-colors hover:bg-muted",
                            isItemActive(item.href)
                              ? "bg-medical-50 text-medical-700"
                              : "text-muted-foreground hover:text-foreground",
                          )}
                        >
                          <item.icon className="h-5 w-5" />
                          <span>{item.title}</span>
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
              "rounded-md bg-gradient-to-r from-medical-50 to-blue-50 dark:from-blue-950/50 dark:to-medical-950/50",
              "p-3 transition-all duration-300",
            )}
          >
            {isCollapsed ? (
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex justify-center">
                    <Sparkles className="h-5 w-5 text-medical-500" />
                  </div>
                </TooltipTrigger>
                <TooltipContent side="right" className="w-40">
                  <p className="font-medium">升级至专业版</p>
                  <p className="text-xs opacity-70">解锁全部高级功能</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-medical-500" />
                <div>
                  <p className="text-sm font-medium text-medical-700 dark:text-medical-300">升级至专业版</p>
                  <p className="text-xs text-medical-600 dark:text-medical-400">解锁全部高级功能</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 版本信息 */}
        {!isCollapsed && (
          <div className="p-2 text-center">
            <p className="text-xs text-muted-foreground">MediNexus³ v3.5.2</p>
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}
