"use client"

import { useState, useEffect } from "react"
import { useEnhancedLanguage } from "@/contexts/enhanced-language-context"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Globe, Check } from "lucide-react"
import { useA11y } from "@/hooks/use-a11y"

export function EnhancedLanguageSwitcher() {
  const { locale, setLocale, availableLocales, localeName, isLoading } = useEnhancedLanguage()
  const [mounted, setMounted] = useState(false)
  const { announce } = useA11y()

  // 避免水合不匹配
  useEffect(() => {
    setMounted(true)
  }, [])

  // 处理语言切换
  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale as any)
    announce(`语言已切换至${localeName(newLocale as any)}`, { politeness: "assertive" })
  }

  if (!mounted || isLoading) {
    return (
      <Button variant="ghost" size="sm" className="w-9 px-0" disabled>
        <Globe className="h-4 w-4" />
        <span className="sr-only">加载语言选项</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-2 whitespace-nowrap" aria-label="切换语言">
          <Globe className="h-4 w-4" />
          <span className="font-normal hidden md:inline">{localeName(locale)}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[180px]">
        <DropdownMenuLabel>选择语言</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {availableLocales.map((lang) => (
          <DropdownMenuItem
            key={lang}
            onClick={() => handleLanguageChange(lang)}
            className="flex items-center justify-between"
          >
            <span>{localeName(lang)}</span>
            {locale === lang && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
