"use client"

import { cn } from "@/lib/utils"

interface LogoProps {
  variant?: "full" | "compact" | "icon"
  className?: string
}

export function BrandLogo({ variant = "full", className }: LogoProps) {
  if (variant === "icon") {
    return (
      <div className={cn("h-8 w-8 rounded-full bg-medical-gradient flex items-center justify-center", className)}>
        <span className="text-white font-bold text-xs">医枢</span>
      </div>
    )
  }

  if (variant === "compact") {
    return (
      <div className={cn("flex items-center gap-2", className)}>
        <div className="h-8 w-8 rounded-full bg-medical-gradient flex items-center justify-center">
          <span className="text-white font-bold text-xs">医枢</span>
        </div>
        <span className="font-bold medical-gradient-text">医枢</span>
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col", className)}>
      <div className="flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-medical-gradient flex items-center justify-center">
          <span className="text-white font-bold text-xs">医枢</span>
        </div>
        <span className="text-xl font-bold medical-gradient-text">言语「医枢」</span>
      </div>
      <span className="text-xs text-medical-600 mt-1">YanYu "MediCore" Intelligent Diagnostic System</span>
    </div>
  )
}

// 添加Logo命名导出，指向BrandLogo组件
export const Logo = BrandLogo
