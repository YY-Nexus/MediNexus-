"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { translations, type Locale, type TranslationKey } from "../i18n/translations"

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, params?: Record<string, string | number>) => string
  availableLocales: Locale[]
  localeName: (locale: Locale) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

interface LanguageProviderProps {
  children: ReactNode
  defaultLocale?: Locale
}

export function LanguageProvider({ children, defaultLocale = "zh-CN" }: LanguageProviderProps) {
  const [locale, setLocale] = useState<Locale>(defaultLocale)

  // 从本地存储加载语言设置
  useEffect(() => {
    const savedLocale = localStorage.getItem("preferred-locale")
    if (savedLocale && Object.keys(translations).includes(savedLocale)) {
      setLocale(savedLocale as Locale)
    } else {
      // 尝试从浏览器语言设置中获取
      const browserLocale = navigator.language
      if (browserLocale.startsWith("zh")) {
        setLocale("zh-CN")
      } else if (browserLocale.startsWith("en")) {
        setLocale("en-US")
      }
      // 其他语言保持默认值
    }
  }, [])

  // 保存语言设置到本地存储
  useEffect(() => {
    localStorage.setItem("preferred-locale", locale)
    // 更新文档语言
    document.documentElement.lang = locale
    // 更新日期格式等
    if (locale === "zh-CN") {
      document.documentElement.setAttribute("data-locale", "zh-CN")
    } else {
      document.documentElement.setAttribute("data-locale", locale)
    }
  }, [locale])

  // 翻译函数
  const t = (key: TranslationKey, params?: Record<string, string | number>): string => {
    const translation = translations[locale]?.[key] || translations["zh-CN"][key] || key

    if (params) {
      return Object.entries(params).reduce((acc, [paramKey, paramValue]) => {
        return acc.replace(new RegExp(`{${paramKey}}`, "g"), String(paramValue))
      }, translation)
    }

    return translation
  }

  // 可用语言列表
  const availableLocales: Locale[] = ["zh-CN", "en-US", "ja-JP", "ko-KR"]

  // 获取语言名称
  const localeName = (locale: string): string => {
    const names: Record<string, string> = {
      "zh-CN": "简体中文",
      "en-US": "English",
      "ja-JP": "日本語",
      "ko-KR": "한국어",
      "zh-TW": "繁體中文",
    }
    return names[locale] || locale
  }

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t, availableLocales, localeName }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
