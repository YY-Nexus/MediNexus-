export type Locale = "zh-CN" | "en-US" | "ja-JP" | "ko-KR"

export const i18nConfig = {
  defaultLocale: "zh-CN" as Locale,
  locales: ["zh-CN", "en-US", "ja-JP", "ko-KR"] as Locale[],

  // 语言名称映射
  localeNames: {
    "zh-CN": "简体中文",
    "en-US": "English",
    "ja-JP": "日本語",
    "ko-KR": "한국어",
  },

  // 日期时间格式
  dateTimeFormats: {
    "zh-CN": {
      short: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
      medium: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
    "en-US": {
      short: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
      medium: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      },
    },
    // 其他语言的格式...
    "ja-JP": {
      short: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
      medium: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
    "ko-KR": {
      short: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      },
      medium: {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      },
      long: {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "long",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      },
    },
  },

  // 数字格式
  numberFormats: {
    "zh-CN": {
      currency: {
        style: "currency",
        currency: "CNY",
      },
      percent: {
        style: "percent",
        minimumFractionDigits: 2,
      },
    },
    "en-US": {
      currency: {
        style: "currency",
        currency: "USD",
      },
      percent: {
        style: "percent",
        minimumFractionDigits: 2,
      },
    },
    // 其他语言的格式...
    "ja-JP": {
      currency: {
        style: "currency",
        currency: "JPY",
      },
      percent: {
        style: "percent",
        minimumFractionDigits: 2,
      },
    },
    "ko-KR": {
      currency: {
        style: "currency",
        currency: "KRW",
      },
      percent: {
        style: "percent",
        minimumFractionDigits: 2,
      },
    },
  },
}
