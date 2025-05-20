"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  Stethoscope,
  Users,
  Lightbulb,
  Pill,
  Activity,
  Microscope,
  Shield,
  Lock,
  Smartphone,
  Database,
  Video,
  BarChart,
  Settings,
  ChevronDown,
  Home,
} from "lucide-react"

// 导航项类型定义
type NavItem = {
  title: string
  href: string
  icon: React.ReactNode
  submenu?: NavItem[]
}

// 导航数据
const navItems: NavItem[] = [
  {
    title: "首页",
    href: "/",
    icon: <Home className="h-5 w-5" />,
  },
  {
    title: "智能诊断",
    href: "/ai-diagnosis",
    icon: <Stethoscope className="h-5 w-5" />,
    submenu: [
      { title: "诊断中心", href: "/ai-diagnosis", icon: <Stethoscope className="h-4 w-4" /> },
      { title: "模型管理", href: "/ai-model", icon: <Settings className="h-4 w-4" /> },
      { title: "诊断记录", href: "/ai-diagnosis/records", icon: <Database className="h-4 w-4" /> },
      { title: "模型训练", href: "/ai-model/training", icon: <Activity className="h-4 w-4" /> },
      { title: "性能分析", href: "/ai-model/performance", icon: <BarChart className="h-4 w-4" /> },
      { title: "模型部署", href: "/ai-model/deployment", icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    title: "患者管理",
    href: "/patients",
    icon: <Users className="h-5 w-5" />,
    submenu: [
      { title: "患者列表", href: "/patients", icon: <Users className="h-4 w-4" /> },
      { title: "病历管理", href: "/patients/records", icon: <Database className="h-4 w-4" /> },
      { title: "随访计划", href: "/patients/followup", icon: <Activity className="h-4 w-4" /> },
      { title: "患者分组", href: "/patients/groups", icon: <Users className="h-4 w-4" /> },
    ],
  },
  {
    title: "临床决策",
    href: "/clinical-decision",
    icon: <Lightbulb className="h-5 w-5" />,
    submenu: [
      { title: "决策支持", href: "/clinical-decision", icon: <Lightbulb className="h-4 w-4" /> },
      { title: "治疗方案", href: "/clinical-decision/treatments", icon: <Activity className="h-4 w-4" /> },
      { title: "临床指南", href: "/clinical-decision/guidelines", icon: <Database className="h-4 w-4" /> },
      { title: "药物参考", href: "/clinical-decision/drug-reference", icon: <Pill className="h-4 w-4" /> },
    ],
  },
  {
    title: "药物管理",
    href: "/medications",
    icon: <Pill className="h-5 w-5" />,
    submenu: [
      { title: "药品目录", href: "/medications", icon: <Pill className="h-4 w-4" /> },
      { title: "处方管理", href: "/medications/prescriptions", icon: <Database className="h-4 w-4" /> },
      { title: "药物互作", href: "/medications/interactions", icon: <Activity className="h-4 w-4" /> },
      { title: "库存管理", href: "/medications/inventory", icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    title: "健康数据",
    href: "/health-data",
    icon: <Activity className="h-5 w-5" />,
    submenu: [
      { title: "数据概览", href: "/health-data", icon: <Activity className="h-4 w-4" /> },
      { title: "生命体征", href: "/health-data/vitals", icon: <Activity className="h-4 w-4" /> },
      { title: "检测结果", href: "/health-data/tests", icon: <Database className="h-4 w-4" /> },
      { title: "趋势分析", href: "/health-data/trends", icon: <BarChart className="h-4 w-4" /> },
      { title: "数据导入", href: "/health-data/import", icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    title: "医学研究",
    href: "/research",
    icon: <Microscope className="h-5 w-5" />,
    submenu: [
      { title: "研究项目", href: "/research", icon: <Microscope className="h-4 w-4" /> },
      { title: "数据分析", href: "/research/analysis", icon: <BarChart className="h-4 w-4" /> },
      { title: "样本管理", href: "/research/samples", icon: <Database className="h-4 w-4" /> },
      { title: "试验设计", href: "/research/trials", icon: <Activity className="h-4 w-4" /> },
    ],
  },
  {
    title: "资质验证",
    href: "/certifications",
    icon: <Shield className="h-5 w-5" />,
    submenu: [
      { title: "资质概览", href: "/certifications", icon: <Shield className="h-4 w-4" /> },
      { title: "资质上传", href: "/certifications/upload", icon: <Database className="h-4 w-4" /> },
      { title: "验证状态", href: "/certifications/status", icon: <Activity className="h-4 w-4" /> },
      { title: "资质管理", href: "/certifications/management", icon: <Settings className="h-4 w-4" /> },
      { title: "验证机构", href: "/certifications/providers", icon: <Shield className="h-4 w-4" /> },
      { title: "API配置", href: "/admin/api-config", icon: <Settings className="h-4 w-4" /> },
    ],
  },
  {
    title: "数据安全",
    href: "/security",
    icon: <Lock className="h-5 w-5" />,
    submenu: [
      { title: "安全概览", href: "/security", icon: <Lock className="h-4 w-4" /> },
      { title: "访问控制", href: "/security/access", icon: <Lock className="h-4 w-4" /> },
      { title: "审计日志", href: "/security/audit", icon: <Database className="h-4 w-4" /> },
      { title: "合规管理", href: "/security/compliance", icon: <Shield className="h-4 w-4" /> },
    ],
  },
  {
    title: "移动应用",
    href: "/mobile-app",
    icon: <Smartphone className="h-5 w-5" />,
    submenu: [
      { title: "应用概览", href: "/mobile-app", icon: <Smartphone className="h-4 w-4" /> },
      { title: "功能管理", href: "/mobile-app/features", icon: <Settings className="h-4 w-4" /> },
      { title: "用户反馈", href: "/mobile-app/feedback", icon: <Users className="h-4 w-4" /> },
      { title: "版本发布", href: "/mobile-app/releases", icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    title: "电子病历",
    href: "/ehr-integration",
    icon: <Database className="h-5 w-5" />,
    submenu: [
      { title: "集成概览", href: "/ehr-integration", icon: <Database className="h-4 w-4" /> },
      { title: "数据映射", href: "/ehr-integration/mapping", icon: <Activity className="h-4 w-4" /> },
      { title: "同步状态", href: "/ehr-integration/sync", icon: <Activity className="h-4 w-4" /> },
      { title: "系统连接", href: "/ehr-integration/connections", icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    title: "远程会诊",
    href: "/teleconsultation",
    icon: <Video className="h-5 w-5" />,
    submenu: [
      { title: "会诊中心", href: "/teleconsultation", icon: <Video className="h-4 w-4" /> },
      { title: "排程管理", href: "/teleconsultation/schedule", icon: <Activity className="h-4 w-4" /> },
      { title: "专家网络", href: "/teleconsultation/experts", icon: <Users className="h-4 w-4" /> },
      { title: "会诊记录", href: "/teleconsultation/records", icon: <Database className="h-4 w-4" /> },
    ],
  },
  {
    title: "统计分析",
    href: "/analytics",
    icon: <BarChart className="h-5 w-5" />,
    submenu: [
      { title: "数据概览", href: "/analytics", icon: <BarChart className="h-4 w-4" /> },
      { title: "趋势报告", href: "/analytics/trends", icon: <Activity className="h-4 w-4" /> },
      { title: "分布分析", href: "/analytics/distribution", icon: <BarChart className="h-4 w-4" /> },
      { title: "预测模型", href: "/analytics/prediction", icon: <Activity className="h-4 w-4" /> },
    ],
  },
  {
    title: "系统管理",
    href: "/admin",
    icon: <Settings className="h-5 w-5" />,
    submenu: [
      { title: "系统设置", href: "/admin/settings", icon: <Settings className="h-4 w-4" /> },
      { title: "角色权限", href: "/admin/roles", icon: <Lock className="h-4 w-4" /> },
      { title: "系统日志", href: "/admin/logs", icon: <Database className="h-4 w-4" /> },
      { title: "数据备份", href: "/admin/backup", icon: <Database className="h-4 w-4" /> },
      { title: "计划任务", href: "/admin/tasks", icon: <Activity className="h-4 w-4" /> },
      { title: "通知管理", href: "/admin/notifications", icon: <Activity className="h-4 w-4" /> },
      { title: "部署检查", href: "/admin/deployment-check", icon: <Shield className="h-4 w-4" /> },
    ],
  },
]

export function GlobalNavigation() {
  const pathname = usePathname()
  const [openMenus, setOpenMenus] = useState<Record<string, boolean>>({})

  // 切换子菜单的开关状态
  const toggleSubmenu = (title: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  // 检查当前路径是否匹配导航项
  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  // 检查导航项是否有活跃的子菜单
  const hasActiveSubmenu = (item: NavItem) => {
    return item.submenu?.some((subItem) => isActive(subItem.href))
  }

  return (
    <nav className="space-y-1 p-3">
      {navItems.map((item) => (
        <div key={item.title} className="space-y-1">
          {item.submenu ? (
            <>
              <button
                onClick={() => toggleSubmenu(item.title)}
                className={cn(
                  "flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-medium",
                  (isActive(item.href) || hasActiveSubmenu(item)) && !openMenus[item.title]
                    ? "bg-blue-100 text-blue-900"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                )}
              >
                <div className="flex items-center">
                  <span className="mr-3 text-gray-500">{item.icon}</span>
                  {item.title}
                </div>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-gray-500 transition-transform",
                    openMenus[item.title] ? "rotate-180" : "",
                  )}
                />
              </button>
              {openMenus[item.title] && (
                <div className="ml-6 space-y-1 border-l-2 border-gray-200 pl-2">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className={cn(
                        "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                        isActive(subItem.href)
                          ? "bg-blue-100 text-blue-900"
                          : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
                      )}
                    >
                      <span className="mr-3 text-gray-500">{subItem.icon}</span>
                      {subItem.title}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Link
              href={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium",
                isActive(item.href)
                  ? "bg-blue-100 text-blue-900"
                  : "text-gray-700 hover:bg-gray-100 hover:text-gray-900",
              )}
            >
              <span className="mr-3 text-gray-500">{item.icon}</span>
              {item.title}
            </Link>
          )}
        </div>
      ))}
    </nav>
  )
}

export default GlobalNavigation
