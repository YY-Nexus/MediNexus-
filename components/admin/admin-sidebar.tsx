"use client"
import { useState } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Users,
  Settings,
  CheckCircle,
  BarChart3,
  Shield,
  ChevronLeft,
  ChevronRight,
  Palette,
  Heart,
  Activity,
} from "lucide-react"

interface AdminSidebarProps {
  className?: string
}

const adminNavItems = [
  {
    title: "管理概览",
    href: "/admin",
    icon: LayoutDashboard,
    description: "系统管理总览",
  },
  {
    title: "管理仪表板",
    href: "/admin/dashboard",
    icon: Activity,
    description: "实用管理控制面板",
  },
  {
    title: "系统健康",
    href: "/admin/system-health",
    icon: CheckCircle,
    description: "技术债务清理状态",
  },
  {
    title: "数据分析",
    href: "/admin/analytics",
    icon: BarChart3,
    description: "信息密度优化展示",
  },
  {
    title: "设计系统",
    href: "/admin/design-system",
    icon: Palette,
    description: "视觉设计统一规范",
  },
  {
    title: "医疗标准",
    href: "/admin/medical-standards",
    icon: Heart,
    description: "医疗行业特色功能",
  },
  {
    title: "用户管理",
    href: "/admin/users",
    icon: Users,
    description: "用户账户管理",
  },
  {
    title: "角色权限",
    href: "/admin/roles",
    icon: Shield,
    description: "角色和权限管理",
  },
  {
    title: "系统设置",
    href: "/admin/settings",
    icon: Settings,
    description: "系统配置设置",
  },
]

export function AdminSidebar({ className }: AdminSidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn("flex h-full w-64 flex-col border-r bg-background", isCollapsed && "w-16", className)}>
      {/* 侧边栏头部 */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && <h2 className="text-lg font-semibold text-blue-800">系统管理</h2>}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="rounded-md p-2 hover:bg-gray-100 transition-colors"
          aria-label={isCollapsed ? "展开侧边栏" : "收起侧边栏"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* 导航菜单 */}
      <nav className="flex-1 space-y-1 p-2 overflow-y-auto">
        {adminNavItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                "hover:bg-blue-50 hover:text-blue-700",
                isActive ? "bg-blue-100 text-blue-800" : "text-blue-600",
                isCollapsed && "justify-center px-2",
              )}
              title={isCollapsed ? item.title : undefined}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {!isCollapsed && <span>{item.title}</span>}
            </Link>
          )
        })}
      </nav>

      {/* 侧边栏底部 */}
      {!isCollapsed && (
        <div className="border-t p-4">
          <div className="text-xs text-blue-500">
            <p>言语云³ 管理平台</p>
            <p className="mt-1 text-blue-400">v3.5.2</p>
            <p className="mt-2 text-blue-600 italic text-[10px]">"技术服务医疗，智慧守护健康"</p>
          </div>
        </div>
      )}
    </div>
  )
}

// 默认导出
export { AdminSidebar as default }
