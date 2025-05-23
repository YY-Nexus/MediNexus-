"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"
import { cn } from "@/lib/utils"

export function PageBreadcrumb() {
  const pathname = usePathname()

  // 如果是首页，不显示面包屑
  if (pathname === "/") {
    return null
  }

  // 将路径分割成段
  const segments = pathname.split("/").filter(Boolean)

  // 如果没有段，返回null
  if (segments.length === 0) {
    return null
  }

  // 构建面包屑项
  const breadcrumbs = [
    { href: "/", label: "首页", icon: Home },
    ...segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`
      // 将路径段转换为更友好的标签
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")

      return { href, label }
    }),
  ]

  return (
    <nav aria-label="面包屑导航" className="flex items-center text-sm">
      <ol className="flex items-center space-x-1">
        {breadcrumbs.map((crumb, index) => {
          const isLast = index === breadcrumbs.length - 1

          return (
            <li key={crumb.href} className="flex items-center">
              {index > 0 && <ChevronRight className="h-4 w-4 mx-1 text-muted-foreground" />}

              {isLast ? (
                <span className="font-medium text-foreground">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className={cn(
                    "flex items-center text-muted-foreground hover:text-foreground transition-colors",
                    index === 0 && "flex items-center",
                  )}
                >
                  {index === 0 && <Home className="h-4 w-4 mr-1" />}
                  {crumb.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
