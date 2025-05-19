"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { useEffect, useState } from "react"
import { useTranslation } from "@/hooks/use-translation"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { t } = useTranslation()

  // 在客户端渲染后再显示组件，避免服务器端渲染不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const isDarkMode = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDarkMode ? "light" : "dark")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="h-9 w-9 rounded-full transition-colors hover:bg-accent"
            aria-label={
              isDarkMode ? t("theme.switchToLight", "切换到浅色模式") : t("theme.switchToDark", "切换到深色模式")
            }
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-400 transition-transform hover:rotate-45" />
            ) : (
              <Moon className="h-5 w-5 text-slate-700 transition-transform hover:-rotate-12" />
            )}
            <span className="sr-only">
              {isDarkMode ? t("theme.switchToLight", "切换到浅色模式") : t("theme.switchToDark", "切换到深色模式")}
            </span>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {isDarkMode ? t("theme.switchToLight", "切换到浅色模式") : t("theme.switchToDark", "切换到深色模式")}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
