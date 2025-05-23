"use client"

import { createContext, useContext, useState, useEffect, useRef, type ReactNode } from "react"
import { i18nConfig, type Locale } from "@/lib/i18n/i18n-config"
import { translations, type TranslationKey } from "@/i18n/translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  formatDate: (date: Date | string | number, format?: "short" | "medium" | "long") => string
  formatNumber: (number: number, format?: "currency" | "percent") => string
  availableLocales: Locale[]
  localeName: (locale: Locale) => string
  dir: "ltr" | "rtl"
  isLoading: boolean
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  defaultLocale?: Locale
}

export function EnhancedLanguageProvider({
  children,
  defaultLocale = i18nConfig.defaultLocale,
}: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  const [isLoading, setIsLoading] = useState(true)
  const initialSetupDone = useRef(false)
  const isInitialMount = useRef(true)

  // 从本地存储加载语言设置 - 只在组件挂载时执行一次
  useEffect(() => {
    // 防止服务器端执行
    if (typeof window === "undefined") return

    setIsLoading(true)
    try {
      const savedLocale = localStorage.getItem("preferred-locale")
      if (savedLocale && i18nConfig.locales.includes(savedLocale as Locale)) {
        setLocale(savedLocale as Locale)
      } else {
        // 尝试从浏览器语言设置中获取
        const browserLocale = navigator.language
        const matchedLocale = i18nConfig.locales.find((locale) => browserLocale.startsWith(locale.split("-")[0]))
        if (matchedLocale) {
          setLocale(matchedLocale)
        }
      }
    } catch (error) {
      console.error("Error loading language preference:", error)
    } finally {
      setIsLoading(false)
      initialSetupDone.current = true
    }
  }, []) // 空依赖数组，确保只在挂载时执行一次

  // 保存语言设置到本地存储 - 只在locale变化且初始化完成后执行
  useEffect(() => {
    // 跳过初始渲染和加载状态
    if (isInitialMount.current) {
      isInitialMount.current = false
      return
    }

    if (isLoading || !initialSetupDone.current) return

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("preferred-locale", locale)

        // 批量更新DOM属性以减少重绘
        requestAnimationFrame(() => {
          document.documentElement.lang = locale
          document.documentElement.dir = getDirection(locale)
          document.documentElement.setAttribute("data-locale", locale)
        })
      }
    } catch (error) {
      console.error("Error saving language preference:", error)
    }
  }, [locale, isLoading]) // 只依赖locale和isLoading

  // 获取文本方向
  const getDirection = (locale: Locale): "ltr" | "rtl" => {
    // 目前所有支持的语言都是从左到右的
    return "ltr"
  }

  // 翻译函数
  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const translation = translations[locale]?.[key] || translations[i18nConfig.defaultLocale][key] || key

    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{${paramKey}}`, "g"), String(paramValue))
      }, translation)
    }

    return translation
  }

  // 日期格式化
  const formatDate = (date: Date | string | number, format: "short" | "medium" | "long" = "medium"): string => {
    const dateObj = date instanceof Date ? date : new Date(date)
    try {
      const formatter = new Intl.DateTimeFormat(locale, i18nConfig.dateTimeFormats[locale][format])
      return formatter.format(dateObj)
    } catch (error) {
      console.error("Error formatting date:", error)
      return String(date)
    }
  }

  // 数字格式化
  const formatNumber = (number: number, format: "currency" | "percent" = "currency"): string => {
    try {
      const formatter = new Intl.NumberFormat(locale, i18nConfig.numberFormats[locale][format])
      return formatter.format(number)
    } catch (error) {
      console.error("Error formatting number:", error)
      return String(number)
    }
  }

  // 获取语言名称
  const localeName = (locale: Locale): string => {
    return i18nConfig.localeNames[locale] || locale
  }

  // 使用useMemo缓存context值，避免不必要的重新渲染
  const contextValue = {
    locale,
    setLocale,
    t,
    formatDate,
    formatNumber,
    availableLocales: i18nConfig.locales,
    localeName,
    dir: getDirection(locale),
    isLoading,
  }

  return <LanguageContext.Provider value={contextValue}>{children}</LanguageContext.Provider>
}

export function useEnhancedLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useEnhancedLanguage must be used within an EnhancedLanguageProvider")
  }
  return context
}
