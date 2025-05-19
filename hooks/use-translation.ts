"use client"

import { useLanguage } from "@/contexts/language-context"

export function useTranslation() {
  const { t, locale, setLocale, availableLocales, localeName } = useLanguage()

  return {
    t,
    locale,
    setLocale,
    availableLocales,
    localeName,
  }
}
